"""
Calculate enhanced statistics from Letterboxd and TMDB data
"""
import pandas as pd
from collections import Counter, defaultdict
from typing import Dict, List, Tuple, Optional
from datetime import datetime
from . import config


class StatsCalculator:
    """Calculate comprehensive statistics from enriched film data"""

    def __init__(self, letterboxd_data: Dict[str, pd.DataFrame], tmdb_data: Dict[Tuple, Dict]):
        self.lb_data = letterboxd_data
        self.tmdb_data = tmdb_data
        self.stats = {}
        # Build liked films lookup set for fast checking
        self._build_liked_lookup()

    def _build_liked_lookup(self):
        """Build a set of liked films for fast lookup"""
        liked = self.lb_data.get('liked_films', pd.DataFrame())
        self.liked_set = set()
        if not liked.empty:
            for _, row in liked.iterrows():
                self.liked_set.add((row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0))

    def is_film_liked(self, title: str, year: int) -> bool:
        """Check if a film is liked"""
        return (title, year) in self.liked_set

    def calculate_all(self) -> Dict:
        """Calculate all statistics"""
        print("\nCalculating statistics...")

        # Basic stats
        self._calculate_basic_stats()

        # TMDB-enriched stats
        self._calculate_genre_stats()
        self._calculate_actor_stats()
        self._calculate_director_stats()
        self._calculate_runtime_stats()
        self._calculate_country_language_stats()

        # Advanced correlations
        self._calculate_rating_trends()
        self._calculate_genre_rating_correlation()
        self._calculate_tag_stats()

        # Temporal stats
        self._calculate_temporal_stats()

        # NEW: Yearly breakdown (last full year vs current year)
        self._calculate_yearly_breakdown()

        # NEW: Liked-specific stats
        self._calculate_liked_stats()

        print("[OK] Statistics calculated")
        return self.stats

    def _calculate_basic_stats(self):
        """Calculate basic Letterboxd statistics"""
        watched = self.lb_data.get('watched', pd.DataFrame())
        diary = self.lb_data.get('diary', pd.DataFrame())
        ratings = self.lb_data.get('ratings', pd.DataFrame())
        watchlist = self.lb_data.get('watchlist', pd.DataFrame())
        liked = self.lb_data.get('liked_films', pd.DataFrame())

        self.stats['basic'] = {
            'total_watched': len(watched),
            'total_rated': len(ratings),
            'total_liked': len(liked),
            'total_watchlist': len(watchlist),
            'total_diary_entries': len(diary),
            'avg_rating': round(ratings['Rating'].mean(), 2) if not ratings.empty else 0,
            'rewatches': int(diary['Rewatch'].notna().sum()) if not diary.empty else 0
        }

    def _calculate_genre_stats(self):
        """Calculate genre-related statistics"""
        genre_counts = Counter()
        genre_ratings = {}

        for (title, year), metadata in self.tmdb_data.items():
            genres = metadata.get('genres', [])

            # Get user rating for this film
            rating = self._get_film_rating(title, year)

            for genre in genres:
                genre_counts[genre] += 1

                if rating and rating > 0:
                    if genre not in genre_ratings:
                        genre_ratings[genre] = []
                    genre_ratings[genre].append(rating)

        # Top genres
        top_genres = genre_counts.most_common(config.TOP_GENRES_COUNT)

        # Favorite genres (by average rating)
        favorite_genres = []
        for genre, ratings_list in genre_ratings.items():
            if len(ratings_list) >= 3:  # Minimum 3 films
                avg_rating = sum(ratings_list) / len(ratings_list)
                favorite_genres.append({
                    'genre': genre,
                    'avg_rating': round(avg_rating, 2),
                    'count': len(ratings_list)
                })

        favorite_genres.sort(key=lambda x: x['avg_rating'], reverse=True)

        self.stats['genres'] = {
            'distribution': [{'genre': g, 'count': c} for g, c in top_genres],
            'favorites': favorite_genres[:10],
            'total_unique': len(genre_counts)
        }

    def _calculate_actor_stats(self):
        """Calculate actor-related statistics with film lists"""
        actor_counts = Counter()
        actor_ratings = {}
        actor_films = defaultdict(list)  # NEW: Track films per actor
        actor_liked_counts = Counter()  # NEW: Track liked films per actor

        for (title, year), metadata in self.tmdb_data.items():
            actors = metadata.get('actors', [])
            rating = self._get_film_rating(title, year)
            is_liked = self.is_film_liked(title, year)

            for actor_info in actors:
                actor_name = actor_info['name']
                actor_counts[actor_name] += 1

                if is_liked:
                    actor_liked_counts[actor_name] += 1

                # Store film info for this actor
                actor_films[actor_name].append({
                    'title': title,
                    'year': year,
                    'rating': rating if rating else None,
                    'liked': is_liked,
                    'poster_path': metadata.get('poster_path'),
                    'character': actor_info.get('character', '')
                })

                if rating and rating > 0:
                    if actor_name not in actor_ratings:
                        actor_ratings[actor_name] = []
                    actor_ratings[actor_name].append(rating)

        # Top actors by appearance
        top_actors = actor_counts.most_common(config.TOP_ACTORS_COUNT)

        # Favorite actors (by average rating, min 3 films)
        favorite_actors = []
        for actor, ratings_list in actor_ratings.items():
            if len(ratings_list) >= 3:
                avg_rating = sum(ratings_list) / len(ratings_list)
                favorite_actors.append({
                    'name': actor,
                    'avg_rating': round(avg_rating, 2),
                    'count': len(ratings_list)
                })

        favorite_actors.sort(key=lambda x: x['avg_rating'], reverse=True)

        # Build top actors with their film lists
        top_actors_with_films = []
        for actor_name, count in top_actors:
            films = sorted(actor_films[actor_name], key=lambda x: x['year'], reverse=True)
            liked_count = actor_liked_counts[actor_name]
            top_actors_with_films.append({
                'name': actor_name,
                'count': count,
                'liked_count': liked_count,
                'like_ratio': round(liked_count / count * 100, 1) if count > 0 else 0,
                'films': films
            })

        self.stats['actors'] = {
            'top_by_count': top_actors_with_films,
            'favorites': favorite_actors[:15],
            'total_unique': len(actor_counts)
        }

    def _calculate_director_stats(self):
        """Calculate director-related statistics with film lists"""
        director_counts = Counter()
        director_ratings = {}
        director_films = defaultdict(list)  # NEW: Track films per director
        director_liked_counts = Counter()  # NEW: Track liked films per director

        for (title, year), metadata in self.tmdb_data.items():
            directors = metadata.get('directors', [])
            rating = self._get_film_rating(title, year)
            is_liked = self.is_film_liked(title, year)

            for director in directors:
                director_counts[director] += 1

                if is_liked:
                    director_liked_counts[director] += 1

                # Store film info for this director
                director_films[director].append({
                    'title': title,
                    'year': year,
                    'rating': rating if rating else None,
                    'liked': is_liked,
                    'poster_path': metadata.get('poster_path')
                })

                if rating and rating > 0:
                    if director not in director_ratings:
                        director_ratings[director] = []
                    director_ratings[director].append(rating)

        # Top directors by film count
        top_directors = director_counts.most_common(config.TOP_DIRECTORS_COUNT)

        # Favorite directors (by average rating, min 2 films)
        favorite_directors = []
        for director, ratings_list in director_ratings.items():
            if len(ratings_list) >= 2:
                avg_rating = sum(ratings_list) / len(ratings_list)
                favorite_directors.append({
                    'name': director,
                    'avg_rating': round(avg_rating, 2),
                    'count': len(ratings_list)
                })

        favorite_directors.sort(key=lambda x: x['avg_rating'], reverse=True)

        # Build top directors with their film lists
        top_directors_with_films = []
        for director_name, count in top_directors:
            films = sorted(director_films[director_name], key=lambda x: x['year'], reverse=True)
            liked_count = director_liked_counts[director_name]
            top_directors_with_films.append({
                'name': director_name,
                'count': count,
                'liked_count': liked_count,
                'like_ratio': round(liked_count / count * 100, 1) if count > 0 else 0,
                'films': films
            })

        self.stats['directors'] = {
            'top_by_count': top_directors_with_films,
            'favorites': favorite_directors[:10],
            'total_unique': len(director_counts)
        }

    def _calculate_runtime_stats(self):
        """Calculate runtime-related statistics"""
        runtimes = []
        runtime_distribution = {'<90': 0, '90-120': 0, '120-150': 0, '150-180': 0, '180+': 0}

        for (title, year), metadata in self.tmdb_data.items():
            runtime = metadata.get('runtime')
            if runtime and runtime > 0:
                runtimes.append(runtime)

                # Categorize
                if runtime < 90:
                    runtime_distribution['<90'] += 1
                elif runtime < 120:
                    runtime_distribution['90-120'] += 1
                elif runtime < 150:
                    runtime_distribution['120-150'] += 1
                elif runtime < 180:
                    runtime_distribution['150-180'] += 1
                else:
                    runtime_distribution['180+'] += 1

        self.stats['runtime'] = {
            'avg_runtime': round(sum(runtimes) / len(runtimes), 1) if runtimes else 0,
            'min_runtime': min(runtimes) if runtimes else 0,
            'max_runtime': max(runtimes) if runtimes else 0,
            'distribution': runtime_distribution
        }

    def _calculate_country_language_stats(self):
        """Calculate country and language statistics"""
        country_counts = Counter()
        language_counts = Counter()

        for (title, year), metadata in self.tmdb_data.items():
            countries = metadata.get('production_countries', [])
            for country in countries:
                country_counts[country] += 1

            language = metadata.get('original_language')
            if language:
                language_counts[language] += 1

        top_countries = country_counts.most_common(config.TOP_COUNTRIES_COUNT)
        top_languages = language_counts.most_common(config.TOP_LANGUAGES_COUNT)

        self.stats['geography'] = {
            'top_countries': [{'country': c, 'count': count} for c, count in top_countries],
            'top_languages': [{'language': l, 'count': count} for l, count in top_languages],
            'total_countries': len(country_counts),
            'total_languages': len(language_counts)
        }

    def _calculate_rating_trends(self):
        """Calculate how ratings evolve over time"""
        diary = self.lb_data.get('diary', pd.DataFrame())

        if diary.empty or 'Rating' not in diary.columns:
            self.stats['rating_trends'] = {'monthly': [], 'yearly': []}
            return

        # Filter out entries without ratings
        rated_diary = diary[diary['Rating'].notna()].copy()

        if rated_diary.empty:
            self.stats['rating_trends'] = {'monthly': [], 'yearly': []}
            return

        # Monthly average ratings
        rated_diary['month'] = rated_diary['Watched Date'].dt.to_period('M')
        monthly = rated_diary.groupby('month')['Rating'].mean()

        # Yearly average ratings
        rated_diary['year'] = rated_diary['Watched Date'].dt.year
        yearly = rated_diary.groupby('year')['Rating'].mean()

        self.stats['rating_trends'] = {
            'monthly': [{'month': str(m), 'avg_rating': round(r, 2)} for m, r in monthly.items()],
            'yearly': [{'year': int(y), 'avg_rating': round(r, 2)} for y, r in yearly.items()]
        }

    def _calculate_genre_rating_correlation(self):
        """Calculate correlation between genres and ratings"""
        genre_rating_matrix = {}

        for (title, year), metadata in self.tmdb_data.items():
            genres = metadata.get('genres', [])
            rating = self._get_film_rating(title, year)

            if rating and rating > 0:
                # Round rating to nearest 0.5
                rating_bucket = round(rating * 2) / 2

                for genre in genres:
                    if genre not in genre_rating_matrix:
                        genre_rating_matrix[genre] = Counter()
                    genre_rating_matrix[genre][rating_bucket] += 1

        self.stats['genre_rating_correlation'] = genre_rating_matrix

    def _calculate_tag_stats(self):
        """Calculate statistics from user tags"""
        diary = self.lb_data.get('diary', pd.DataFrame())

        if diary.empty or 'Tags' not in diary.columns:
            self.stats['tags'] = {'top_tags': [], 'total': 0}
            return

        tag_counts = Counter()

        for tags in diary['Tags'].dropna():
            if isinstance(tags, str):
                # Split by comma
                tag_list = [t.strip() for t in tags.split(',')]
                tag_counts.update(tag_list)

        top_tags = tag_counts.most_common(20)

        self.stats['tags'] = {
            'top_tags': [{'tag': t, 'count': c} for t, c in top_tags],
            'total': len(tag_counts)
        }

    def _calculate_temporal_stats(self):
        """Calculate temporal viewing patterns"""
        diary = self.lb_data.get('diary', pd.DataFrame())

        if diary.empty:
            self.stats['temporal'] = {}
            return

        # Watch activity by year
        diary['watch_year'] = diary['Watched Date'].dt.year
        yearly_counts = diary['watch_year'].value_counts().sort_index()

        # Watch activity by month (last 24 months)
        diary['watch_month'] = diary['Watched Date'].dt.to_period('M')
        monthly_counts = diary.groupby('watch_month').size().tail(24)

        # Watch activity by weekday
        diary['weekday'] = diary['Watched Date'].dt.day_name()
        weekday_counts = diary['weekday'].value_counts()

        self.stats['temporal'] = {
            'yearly': [{'year': int(y), 'count': int(c)} for y, c in yearly_counts.items()],
            'monthly': [{'month': str(m), 'count': int(c)} for m, c in monthly_counts.items()],
            'by_weekday': [{'day': d, 'count': int(c)} for d, c in weekday_counts.items()]
        }

    def _get_film_rating(self, title: str, year: int) -> float:
        """Get user rating for a specific film"""
        ratings = self.lb_data.get('ratings', pd.DataFrame())

        if ratings.empty:
            return 0

        match = ratings[(ratings['Name'] == title) & (ratings['Year'] == year)]

        if not match.empty:
            return float(match.iloc[0]['Rating'])

        return 0

    def get_top_rated_films(self, count: int = 20) -> List[Dict]:
        """Get top rated films (5 stars)"""
        ratings = self.lb_data.get('ratings', pd.DataFrame())

        if ratings.empty:
            return []

        top = ratings[ratings['Rating'] == 5.0][['Name', 'Year']].head(count)
        return top.to_dict('records')

    def get_recent_diary(self, count: int = 10) -> List[Dict]:
        """Get recent diary entries"""
        diary = self.lb_data.get('diary', pd.DataFrame())

        if diary.empty:
            return []

        recent = diary.sort_values('Watched Date', ascending=False).head(count)
        recent = recent[['Name', 'Year', 'Rating', 'Watched Date', 'Rewatch']].copy()
        recent['Watched Date'] = recent['Watched Date'].dt.strftime('%Y-%m-%d')

        return recent.to_dict('records')

    def _calculate_yearly_breakdown(self):
        """Calculate detailed stats for last full year and current year"""
        diary = self.lb_data.get('diary', pd.DataFrame())

        if diary.empty:
            self.stats['yearly_breakdown'] = {}
            return

        current_year = datetime.now().year
        last_full_year = current_year - 1

        self.stats['yearly_breakdown'] = {
            'last_full_year': self._get_year_stats(last_full_year),
            'current_year': self._get_year_stats(current_year),
            'last_full_year_value': last_full_year,
            'current_year_value': current_year
        }

    def _get_year_stats(self, year: int) -> Dict:
        """Get comprehensive stats for a specific year"""
        diary = self.lb_data.get('diary', pd.DataFrame())
        ratings = self.lb_data.get('ratings', pd.DataFrame())

        if diary.empty:
            return self._empty_year_stats()

        # Filter diary entries for this year
        year_diary = diary[diary['Watched Date'].dt.year == year].copy()

        if year_diary.empty:
            return self._empty_year_stats()

        # Basic counts
        total_films = len(year_diary)

        # Count liked films for this year
        liked_count = 0
        for _, row in year_diary.iterrows():
            if self.is_film_liked(row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0):
                liked_count += 1

        # Get films with ratings
        year_diary_rated = year_diary[year_diary['Rating'].notna()].copy()

        # Top 5 highest rated
        top_rated = []
        if not year_diary_rated.empty:
            top_sorted = year_diary_rated.nlargest(5, 'Rating')
            for _, row in top_sorted.iterrows():
                title, yr = row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0
                metadata = self.tmdb_data.get((title, yr), {})
                top_rated.append({
                    'title': title,
                    'year': yr,
                    'rating': float(row['Rating']),
                    'poster_path': metadata.get('poster_path'),
                    'liked': self.is_film_liked(title, yr)
                })

        # Bottom 5 lowest rated (minimum 5 entries)
        bottom_rated = []
        if len(year_diary_rated) >= 5:
            bottom_sorted = year_diary_rated.nsmallest(5, 'Rating')
            for _, row in bottom_sorted.iterrows():
                title, yr = row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0
                metadata = self.tmdb_data.get((title, yr), {})
                bottom_rated.append({
                    'title': title,
                    'year': yr,
                    'rating': float(row['Rating']),
                    'poster_path': metadata.get('poster_path'),
                    'liked': self.is_film_liked(title, yr)
                })

        # Most active month
        year_diary['month'] = year_diary['Watched Date'].dt.month
        month_counts = year_diary['month'].value_counts()
        most_active_month = int(month_counts.idxmax()) if not month_counts.empty else 0
        most_active_month_count = int(month_counts.max()) if not month_counts.empty else 0

        # Top actor and director for this year
        actor_counts = Counter()
        director_counts = Counter()
        genre_counts = Counter()

        for _, row in year_diary.iterrows():
            title, yr = row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0
            metadata = self.tmdb_data.get((title, yr), {})

            for actor_info in metadata.get('actors', []):
                actor_counts[actor_info['name']] += 1

            for director in metadata.get('directors', []):
                director_counts[director] += 1

            for genre in metadata.get('genres', []):
                genre_counts[genre] += 1

        # Get top actor with films
        top_actor = None
        if actor_counts:
            top_actor_name, top_actor_count = actor_counts.most_common(1)[0]
            # Get films for this actor in this year
            actor_year_films = []
            for _, row in year_diary.iterrows():
                title, yr = row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0
                metadata = self.tmdb_data.get((title, yr), {})
                actor_names = [a['name'] for a in metadata.get('actors', [])]
                if top_actor_name in actor_names:
                    actor_year_films.append({
                        'title': title,
                        'year': yr,
                        'poster_path': metadata.get('poster_path'),
                        'rating': float(row['Rating']) if pd.notna(row['Rating']) else None
                    })
            top_actor = {
                'name': top_actor_name,
                'count': top_actor_count,
                'films': actor_year_films[:10]  # Limit to 10 for display
            }

        # Get top director with films
        top_director = None
        if director_counts:
            top_director_name, top_director_count = director_counts.most_common(1)[0]
            director_year_films = []
            for _, row in year_diary.iterrows():
                title, yr = row['Name'], int(row['Year']) if pd.notna(row['Year']) else 0
                metadata = self.tmdb_data.get((title, yr), {})
                if top_director_name in metadata.get('directors', []):
                    director_year_films.append({
                        'title': title,
                        'year': yr,
                        'poster_path': metadata.get('poster_path'),
                        'rating': float(row['Rating']) if pd.notna(row['Rating']) else None
                    })
            top_director = {
                'name': top_director_name,
                'count': top_director_count,
                'films': director_year_films
            }

        # Genre distribution for this year
        genre_distribution = [{'genre': g, 'count': c} for g, c in genre_counts.most_common(10)]

        # Average rating for the year
        avg_rating = round(year_diary_rated['Rating'].mean(), 2) if not year_diary_rated.empty else 0

        # Monthly breakdown
        monthly_counts = year_diary.groupby(year_diary['Watched Date'].dt.month).size()
        monthly_breakdown = [{'month': int(m), 'count': int(c)} for m, c in monthly_counts.items()]

        return {
            'total_films': total_films,
            'total_liked': liked_count,
            'total_rated': len(year_diary_rated),
            'avg_rating': avg_rating,
            'top_5_rated': top_rated,
            'bottom_5_rated': bottom_rated,
            'top_actor': top_actor,
            'top_director': top_director,
            'genre_distribution': genre_distribution,
            'most_active_month': most_active_month,
            'most_active_month_count': most_active_month_count,
            'monthly_breakdown': monthly_breakdown
        }

    def _empty_year_stats(self) -> Dict:
        """Return empty year stats structure"""
        return {
            'total_films': 0,
            'total_liked': 0,
            'total_rated': 0,
            'avg_rating': 0,
            'top_5_rated': [],
            'bottom_5_rated': [],
            'top_actor': None,
            'top_director': None,
            'genre_distribution': [],
            'most_active_month': 0,
            'most_active_month_count': 0,
            'monthly_breakdown': []
        }

    def _calculate_liked_stats(self):
        """Calculate statistics specifically for liked films"""
        liked_films = self.lb_data.get('liked_films', pd.DataFrame())

        if liked_films.empty:
            self.stats['liked'] = {
                'top_actors': [],
                'top_directors': [],
                'top_genres': [],
                'total': 0
            }
            return

        # Count actors, directors, genres in liked films only
        actor_counts = Counter()
        director_counts = Counter()
        genre_counts = Counter()

        for _, row in liked_films.iterrows():
            title = row['Name']
            year = int(row['Year']) if pd.notna(row['Year']) else 0
            metadata = self.tmdb_data.get((title, year), {})

            for actor_info in metadata.get('actors', []):
                actor_counts[actor_info['name']] += 1

            for director in metadata.get('directors', []):
                director_counts[director] += 1

            for genre in metadata.get('genres', []):
                genre_counts[genre] += 1

        # Top actors by liked films
        top_liked_actors = []
        for actor_name, count in actor_counts.most_common(15):
            # Get films for this actor that are liked
            liked_actor_films = []
            for _, row in liked_films.iterrows():
                title = row['Name']
                year = int(row['Year']) if pd.notna(row['Year']) else 0
                metadata = self.tmdb_data.get((title, year), {})
                actor_names = [a['name'] for a in metadata.get('actors', [])]
                if actor_name in actor_names:
                    rating = self._get_film_rating(title, year)
                    liked_actor_films.append({
                        'title': title,
                        'year': year,
                        'poster_path': metadata.get('poster_path'),
                        'rating': rating if rating else None
                    })

            top_liked_actors.append({
                'name': actor_name,
                'count': count,
                'films': sorted(liked_actor_films, key=lambda x: x['year'], reverse=True)
            })

        # Top directors by liked films
        top_liked_directors = []
        for director_name, count in director_counts.most_common(15):
            liked_director_films = []
            for _, row in liked_films.iterrows():
                title = row['Name']
                year = int(row['Year']) if pd.notna(row['Year']) else 0
                metadata = self.tmdb_data.get((title, year), {})
                if director_name in metadata.get('directors', []):
                    rating = self._get_film_rating(title, year)
                    liked_director_films.append({
                        'title': title,
                        'year': year,
                        'poster_path': metadata.get('poster_path'),
                        'rating': rating if rating else None
                    })

            top_liked_directors.append({
                'name': director_name,
                'count': count,
                'films': sorted(liked_director_films, key=lambda x: x['year'], reverse=True)
            })

        # Top genres in liked films
        top_liked_genres = [{'genre': g, 'count': c} for g, c in genre_counts.most_common(10)]

        self.stats['liked'] = {
            'top_actors': top_liked_actors,
            'top_directors': top_liked_directors,
            'top_genres': top_liked_genres,
            'total': len(liked_films)
        }
