"""
Calculate enhanced statistics from Letterboxd and TMDB data
"""
import pandas as pd
from collections import Counter
from typing import Dict, List, Tuple
from . import config


class StatsCalculator:
    """Calculate comprehensive statistics from enriched film data"""

    def __init__(self, letterboxd_data: Dict[str, pd.DataFrame], tmdb_data: Dict[Tuple, Dict]):
        self.lb_data = letterboxd_data
        self.tmdb_data = tmdb_data
        self.stats = {}

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

        print("✓ Statistics calculated")
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
        """Calculate actor-related statistics"""
        actor_counts = Counter()
        actor_ratings = {}

        for (title, year), metadata in self.tmdb_data.items():
            actors = metadata.get('actors', [])
            rating = self._get_film_rating(title, year)

            for actor_info in actors:
                actor_name = actor_info['name']
                actor_counts[actor_name] += 1

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

        self.stats['actors'] = {
            'top_by_count': [{'name': a, 'count': c} for a, c in top_actors],
            'favorites': favorite_actors[:15],
            'total_unique': len(actor_counts)
        }

    def _calculate_director_stats(self):
        """Calculate director-related statistics"""
        director_counts = Counter()
        director_ratings = {}

        for (title, year), metadata in self.tmdb_data.items():
            directors = metadata.get('directors', [])
            rating = self._get_film_rating(title, year)

            for director in directors:
                director_counts[director] += 1

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

        self.stats['directors'] = {
            'top_by_count': [{'name': d, 'count': c} for d, c in top_directors],
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
