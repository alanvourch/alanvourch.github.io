"""
TMDB API integration for enriching Letterboxd data with metadata
"""
import requests
import json
import time
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
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
        self.request_times = []
        self.stats = {
            'total': 0,
            'matched': 0,
            'cached': 0,
            'failed': 0,
            'unmatched_films': []
        }

        if not self.api_key:
            raise ValueError("TMDB API key is required")

        self._load_cache()

    def _load_cache(self):
        """Load cached TMDB data from JSON file"""
        if config.ENABLE_CACHE and os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'r', encoding='utf-8') as f:
                    self.cache = json.load(f)
                print(f"✓ Loaded {len(self.cache)} cached films")
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
        now = time.time()

        # Remove requests older than the rate window
        self.request_times = [
            t for t in self.request_times
            if now - t < config.TMDB_RATE_WINDOW
        ]

        # If we're at the limit, wait
        if len(self.request_times) >= config.TMDB_RATE_LIMIT:
            sleep_time = config.TMDB_RATE_WINDOW - (now - self.request_times[0])
            if sleep_time > 0:
                time.sleep(sleep_time)
            self.request_times = []

        self.request_times.append(now)

    def _make_request(self, endpoint: str, params: Dict = None) -> Optional[Dict]:
        """Make a rate-limited request to TMDB API"""
        self._rate_limit()

        url = f"{self.base_url}/{endpoint}"
        params = params or {}
        params['api_key'] = self.api_key

        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            return None

    def _normalize_cache_key(self, title: str, year: int) -> str:
        """Create normalized cache key from title and year"""
        # Normalize title: lowercase, remove special chars
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
        # Check cache first
        cache_key = self._normalize_cache_key(title, year)

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
            # Get first (best) match
            movie = result['results'][0]

            # Validate it's a reasonable match
            if self._validate_match(title, year, movie):
                # Get full details
                full_details = self.get_movie_details(movie['id'])
                if full_details:
                    # Cache the result
                    full_details['cached_at'] = datetime.now().isoformat()
                    self.cache[cache_key] = full_details
                    self.stats['matched'] += 1
                    return full_details

        # No match found
        self.stats['failed'] += 1
        self.stats['unmatched_films'].append({'title': title, 'year': year})
        return None

    def _validate_match(self, search_title: str, search_year: int, tmdb_result: Dict) -> bool:
        """Validate that TMDB result is a good match"""
        result_title = tmdb_result.get('title', '').lower()
        search_title_lower = search_title.lower()

        # Check if titles are similar (simple check)
        if search_title_lower not in result_title and result_title not in search_title_lower:
            # Check original title as well
            original_title = tmdb_result.get('original_title', '').lower()
            if search_title_lower not in original_title and original_title not in search_title_lower:
                return False

        # Check year is within reasonable range (±1 year for release date differences)
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
        """Get full movie details including credits"""
        # Get movie details
        movie = self._make_request(f'movie/{tmdb_id}')
        if not movie:
            return None

        # Get credits (cast and crew)
        credits = self._make_request(f'movie/{tmdb_id}/credits')

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

        if credits:
            # Get top actors (up to 10)
            cast = credits.get('cast', [])[:10]
            details['actors'] = [
                {'name': actor['name'], 'character': actor.get('character')}
                for actor in cast
            ]

            # Get directors
            crew = credits.get('crew', [])
            directors = [person['name'] for person in crew if person.get('job') == 'Director']
            details['directors'] = directors[:3]  # Top 3 directors

        return details

    def enrich_films(self, films_df) -> Dict[str, Dict]:
        """
        Enrich a dataframe of films with TMDB metadata

        Args:
            films_df: DataFrame with 'Name' and 'Year' columns

        Returns:
            Dictionary mapping (title, year) to TMDB metadata
        """
        enriched = {}
        self.stats['total'] = len(films_df)

        print(f"\nEnriching {len(films_df)} films with TMDB data...")

        for _, row in tqdm(films_df.iterrows(), total=len(films_df), desc="Fetching metadata"):
            title = row['Name']
            year = int(row['Year']) if row['Year'] else 0

            if year == 0:
                continue

            metadata = self.search_movie(title, year)
            if metadata:
                enriched[(title, year)] = metadata

        # Save cache after enrichment
        self._save_cache()

        # Print summary
        self._print_summary()

        # Log unmatched films
        if config.LOG_UNMATCHED_FILMS and self.stats['unmatched_films']:
            self._log_unmatched_films()

        return enriched

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
            print(f"✓ Unmatched films logged to {config.UNMATCHED_LOG_FILE}")
        except Exception as e:
            print(f"Warning: Could not write unmatched films log: {e}")
