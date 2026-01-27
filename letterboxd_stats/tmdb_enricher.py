"""
TMDB API integration for enriching Letterboxd data with metadata.
v5.4: Optimized with append_to_response, connection pooling, and concurrent fetching.
"""
import requests
import json
import time
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading
import os
from tqdm import tqdm
from . import config


class TMDBEnricher:
    """Enriches film data using The Movie Database (TMDB) API"""

    def __init__(self, api_key: str = None, cache_file: str = None):
        self.api_key = api_key or config.TMDB_API_KEY
        self.cache_file = cache_file or config.CACHE_FILE
        self.base_url = config.TMDB_BASE_URL
        self.cache = {}
        self._lock = threading.Lock()
        self._rate_lock = threading.Lock()
        self._request_times: List[float] = []
        self.stats = {
            'total': 0,
            'matched': 0,
            'cached': 0,
            'failed': 0,
            'unmatched_films': []
        }

        # Connection-pooled session
        self.session = requests.Session()
        adapter = requests.adapters.HTTPAdapter(
            pool_connections=20,
            pool_maxsize=20,
            max_retries=requests.adapters.Retry(
                total=2,
                backoff_factor=0.3,
                status_forcelist=[429, 500, 502, 503, 504]
            )
        )
        self.session.mount('https://', adapter)
        self.session.params = {'api_key': self.api_key}

        if not self.api_key:
            raise ValueError("TMDB API key is required")

        self._load_cache()

    def _load_cache(self):
        """Load cached TMDB data from JSON file"""
        if config.ENABLE_CACHE and os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'r', encoding='utf-8') as f:
                    self.cache = json.load(f)
                print(f"[OK] Loaded {len(self.cache)} cached films")
            except Exception as e:
                print(f"Warning: Could not load cache: {e}")
                self.cache = {}

    def _save_cache(self):
        """Save cache to JSON file"""
        if config.ENABLE_CACHE:
            try:
                with open(self.cache_file, 'w', encoding='utf-8') as f:
                    json.dump(self.cache, f, indent=2, ensure_ascii=False)
            except Exception as e:
                print(f"Warning: Could not save cache: {e}")

    def _rate_limit(self):
        """Enforce TMDB rate limiting (40 requests per 10 seconds)"""
        with self._rate_lock:
            now = time.time()
            self._request_times = [
                t for t in self._request_times
                if now - t < config.TMDB_RATE_WINDOW
            ]
            if len(self._request_times) >= config.TMDB_RATE_LIMIT:
                sleep_time = config.TMDB_RATE_WINDOW - (now - self._request_times[0])
                if sleep_time > 0:
                    time.sleep(sleep_time)
                self._request_times = []
            self._request_times.append(time.time())

    def _make_request(self, endpoint: str, params: Dict = None) -> Optional[Dict]:
        """Make a rate-limited request to TMDB API using pooled session"""
        self._rate_limit()

        url = f"{self.base_url}/{endpoint}"

        try:
            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException:
            return None

    def _normalize_cache_key(self, title: str, year: int) -> str:
        """Create normalized cache key from title and year"""
        normalized = title.lower().strip()
        return f"{normalized}_{year}"

    def _is_cache_valid(self, cached_data: Dict) -> bool:
        """Check if cached data is still valid"""
        if not config.CACHE_EXPIRY_DAYS:
            return True

        cached_date = cached_data.get('cached_at')
        if not cached_date:
            return True

        try:
            cached_dt = datetime.fromisoformat(cached_date)
            expiry = timedelta(days=config.CACHE_EXPIRY_DAYS)
            return datetime.now() - cached_dt < expiry
        except:
            return True

    def search_movie(self, title: str, year: int) -> Optional[Dict]:
        """Search for a movie by title and year"""
        cache_key = self._normalize_cache_key(title, year)

        with self._lock:
            if cache_key in self.cache:
                cached = self.cache[cache_key]
                if self._is_cache_valid(cached):
                    self.stats['cached'] += 1
                    return cached

        # Search TMDB
        params = {
            'query': title,
            'year': year,
            'include_adult': False
        }

        result = self._make_request('search/movie', params)

        if not result or not result.get('results'):
            # Try without year as fallback
            params.pop('year')
            result = self._make_request('search/movie', params)

        if result and result.get('results'):
            movie = result['results'][0]

            if self._validate_match(title, year, movie):
                # Get full details + credits in ONE call
                full_details = self.get_movie_details(movie['id'])
                if full_details:
                    full_details['cached_at'] = datetime.now().isoformat()
                    with self._lock:
                        self.cache[cache_key] = full_details
                        self.stats['matched'] += 1
                    return full_details

        # No match found
        with self._lock:
            self.stats['failed'] += 1
            self.stats['unmatched_films'].append({'title': title, 'year': year})
        return None

    def _validate_match(self, search_title: str, search_year: int, tmdb_result: Dict) -> bool:
        """Validate that TMDB result is a good match"""
        result_title = tmdb_result.get('title', '').lower()
        search_title_lower = search_title.lower()

        if search_title_lower not in result_title and result_title not in search_title_lower:
            original_title = tmdb_result.get('original_title', '').lower()
            if search_title_lower not in original_title and original_title not in search_title_lower:
                return False

        release_date = tmdb_result.get('release_date', '')
        if release_date:
            try:
                result_year = int(release_date[:4])
                if abs(result_year - search_year) > 1:
                    return False
            except:
                pass

        return True

    def get_movie_details(self, tmdb_id: int) -> Optional[Dict]:
        """Get full movie details including credits in a single API call"""
        # Use append_to_response to get movie + credits in ONE request
        movie = self._make_request(f'movie/{tmdb_id}', params={
            'append_to_response': 'credits'
        })
        if not movie:
            return None

        credits = movie.get('credits')

        # Extract relevant metadata
        details = {
            'tmdb_id': tmdb_id,
            'title': movie.get('title'),
            'original_title': movie.get('original_title'),
            'release_date': movie.get('release_date'),
            'runtime': movie.get('runtime'),
            'genres': [g['name'] for g in movie.get('genres', [])],
            'overview': movie.get('overview'),
            'popularity': movie.get('popularity'),
            'vote_average': movie.get('vote_average'),
            'vote_count': movie.get('vote_count'),
            'poster_path': movie.get('poster_path'),
            'backdrop_path': movie.get('backdrop_path'),
            'original_language': movie.get('original_language'),
            'production_countries': [c['name'] for c in movie.get('production_countries', [])],
            'budget': movie.get('budget'),
            'revenue': movie.get('revenue'),
        }

        # Production companies (with logo)
        details['production_companies'] = [
            {'name': c['name'], 'logo_path': c.get('logo_path')}
            for c in movie.get('production_companies', [])
        ][:3]

        if credits:
            # Get top actors (up to 10) with profile photos
            cast = credits.get('cast', [])[:10]
            details['actors'] = [
                {
                    'name': actor['name'],
                    'character': actor.get('character'),
                    'profile_path': actor.get('profile_path')
                }
                for actor in cast
            ]

            # Get crew by role
            crew = credits.get('crew', [])
            directors = [{'name': p['name'], 'profile_path': p.get('profile_path')}
                         for p in crew if p.get('job') == 'Director']
            details['directors'] = [d['name'] for d in directors[:3]]
            details['director_profiles'] = {d['name']: d['profile_path'] for d in directors[:3]}

            # Cinematographers
            details['cinematographers'] = [
                {'name': p['name'], 'profile_path': p.get('profile_path')}
                for p in crew if p.get('job') == 'Director of Photography'
            ][:2]

            # Composers
            details['composers'] = [
                {'name': p['name'], 'profile_path': p.get('profile_path')}
                for p in crew if p.get('job') == 'Original Music Composer'
            ][:2]

            # Writers (Screenplay or Writer)
            details['writers'] = [
                {'name': p['name'], 'profile_path': p.get('profile_path')}
                for p in crew if p.get('job') in ('Screenplay', 'Writer')
            ][:3]

        return details

    def _fetch_single_film(self, title: str, year: int) -> Tuple[Optional[str], Optional[str], Optional[Dict]]:
        """Fetch a single film - returns (title, year, metadata) for thread pool"""
        if year == 0:
            return (title, year, None)
        metadata = self.search_movie(title, year)
        return (title, year, metadata)

    def enrich_films(self, films_df) -> Dict[str, Dict]:
        """
        Enrich a dataframe of films with TMDB metadata using concurrent requests.

        Args:
            films_df: DataFrame with 'Name' and 'Year' columns

        Returns:
            Dictionary mapping (title, year) to TMDB metadata
        """
        enriched = {}
        self.stats['total'] = len(films_df)

        print(f"\nEnriching {len(films_df)} films with TMDB data...")

        # Separate cached vs uncached films
        to_fetch = []
        for _, row in films_df.iterrows():
            title = row['Name']
            year = int(row['Year']) if row['Year'] else 0
            if year == 0:
                continue

            cache_key = self._normalize_cache_key(title, year)
            if cache_key in self.cache and self._is_cache_valid(self.cache[cache_key]):
                enriched[(title, year)] = self.cache[cache_key]
                self.stats['cached'] += 1
            else:
                to_fetch.append((title, year))

        # Show cached progress immediately
        cached_count = len(enriched)
        total = len(films_df)

        if to_fetch:
            print(f"[OK] {cached_count} films from cache, fetching {len(to_fetch)} from TMDB...")

            # Use thread pool for concurrent API requests
            max_workers = min(8, len(to_fetch))
            with tqdm(total=len(to_fetch), desc="Fetching metadata") as pbar:
                with ThreadPoolExecutor(max_workers=max_workers) as executor:
                    futures = {
                        executor.submit(self._fetch_single_film, title, year): (title, year)
                        for title, year in to_fetch
                    }

                    for future in as_completed(futures):
                        title, year, metadata = future.result()
                        if metadata:
                            enriched[(title, year)] = metadata
                        pbar.update(1)
        else:
            print(f"[OK] All {cached_count} films loaded from cache")

        # Backfill studio logos for old cache entries
        self._backfill_studio_logos(enriched)

        # Save cache after enrichment
        self._save_cache()

        # Print summary
        self._print_summary()

        # Log unmatched films
        if config.LOG_UNMATCHED_FILMS and self.stats['unmatched_films']:
            self._log_unmatched_films()

        return enriched

    def _backfill_studio_logos(self, enriched: Dict):
        """Backfill logo_path for production_companies stored in old string format"""
        # Collect studio names missing logos
        needs_logo = set()
        for data in enriched.values():
            for comp in data.get('production_companies', []):
                if isinstance(comp, str):
                    needs_logo.add(comp)
                elif isinstance(comp, dict) and not comp.get('logo_path'):
                    needs_logo.add(comp['name'])

        if not needs_logo:
            return

        print(f"Backfilling logos for {len(needs_logo)} studios...")

        # Fetch logos via TMDB company search
        logo_map = {}
        for name in needs_logo:
            result = self._make_request('search/company', {'query': name})
            if result and result.get('results'):
                for r in result['results']:
                    if r['name'].lower() == name.lower() and r.get('logo_path'):
                        logo_map[name] = r['logo_path']
                        break

        if not logo_map:
            return

        # Patch enriched data and cache
        updated = 0
        for data in list(enriched.values()) + list(self.cache.values()):
            companies = data.get('production_companies', [])
            new_companies = []
            changed = False
            for comp in companies:
                if isinstance(comp, str):
                    new_companies.append({'name': comp, 'logo_path': logo_map.get(comp)})
                    changed = True
                elif isinstance(comp, dict) and not comp.get('logo_path') and comp['name'] in logo_map:
                    comp['logo_path'] = logo_map[comp['name']]
                    new_companies.append(comp)
                    changed = True
                else:
                    new_companies.append(comp)
            if changed:
                data['production_companies'] = new_companies
                updated += 1

        print(f"[OK] Updated logos for {len(logo_map)} studios across {updated} films")

    def _print_summary(self):
        """Print enrichment summary"""
        print("\n" + "="*60)
        print("ENRICHMENT SUMMARY")
        print("="*60)
        print(f"Total films:        {self.stats['total']}")
        print(f"Successfully matched: {self.stats['matched']} ({self.stats['matched']/self.stats['total']*100:.1f}%)")
        print(f"From cache:         {self.stats['cached']} ({self.stats['cached']/self.stats['total']*100:.1f}%)")
        print(f"Failed to match:    {self.stats['failed']} ({self.stats['failed']/self.stats['total']*100:.1f}%)")
        print("="*60)

    def _log_unmatched_films(self):
        """Log unmatched films to a file"""
        try:
            with open(config.UNMATCHED_LOG_FILE, 'w', encoding='utf-8') as f:
                f.write("Unmatched Films\n")
                f.write("="*60 + "\n\n")
                for film in self.stats['unmatched_films']:
                    f.write(f"{film['title']} ({film['year']})\n")
            print(f"[OK] Unmatched films logged to {config.UNMATCHED_LOG_FILE}")
        except Exception as e:
            print(f"Warning: Could not write unmatched films log: {e}")
