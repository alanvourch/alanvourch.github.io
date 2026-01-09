"""
Data loading and preprocessing for Letterboxd CSV files
"""
import pandas as pd
import os
from typing import Dict
from . import config


class LetterboxdDataLoader:
    """Loads and preprocesses Letterboxd CSV export data"""

    def __init__(self, data_dir: str = None):
        self.data_dir = data_dir or config.DATA_DIR
        self.data = {}

    def load_all(self) -> Dict[str, pd.DataFrame]:
        """Load all Letterboxd CSV files"""
        print(f"Loading Letterboxd data from {self.data_dir}...")

        # Load main CSV files
        self.data['watched'] = self._load_csv('watched.csv')
        self.data['diary'] = self._load_csv('diary.csv')
        self.data['ratings'] = self._load_csv('ratings.csv')
        self.data['watchlist'] = self._load_csv('watchlist.csv')

        # Load likes
        self.data['liked_films'] = self._load_csv('likes/films.csv')
        self.data['liked_lists'] = self._load_csv('likes/lists.csv', required=False)
        self.data['liked_reviews'] = self._load_csv('likes/reviews.csv', required=False)

        # Preprocess data
        self._preprocess_data()

        print(f"✓ Loaded {len(self.data['watched'])} watched films")
        print(f"✓ Loaded {len(self.data['diary'])} diary entries")
        print(f"✓ Loaded {len(self.data['ratings'])} ratings")

        return self.data

    def _load_csv(self, filename: str, required: bool = True) -> pd.DataFrame:
        """Load a single CSV file"""
        filepath = os.path.join(self.data_dir, filename)

        if not os.path.exists(filepath):
            if required:
                raise FileNotFoundError(f"Required file not found: {filepath}")
            return pd.DataFrame()

        try:
            return pd.read_csv(filepath)
        except Exception as e:
            if required:
                raise Exception(f"Error loading {filename}: {e}")
            return pd.DataFrame()

    def _preprocess_data(self):
        """Preprocess and clean data"""
        # Convert dates
        if not self.data['diary'].empty:
            self.data['diary']['Watched Date'] = pd.to_datetime(
                self.data['diary']['Watched Date'],
                errors='coerce'
            )

        # Clean up year columns (convert to int)
        for key in ['watched', 'diary', 'ratings', 'watchlist']:
            if key in self.data and not self.data[key].empty and 'Year' in self.data[key].columns:
                self.data[key]['Year'] = pd.to_numeric(
                    self.data[key]['Year'],
                    errors='coerce'
                ).fillna(0).astype(int)

        # Create combined dataset for enrichment (unique films)
        self._create_unique_films()

    def _create_unique_films(self):
        """Create a deduplicated list of all unique films"""
        # Combine all film sources
        all_films = []

        for key in ['watched', 'diary', 'ratings', 'watchlist', 'liked_films']:
            if key in self.data and not self.data[key].empty:
                df = self.data[key][['Name', 'Year']].copy()
                all_films.append(df)

        if all_films:
            combined = pd.concat(all_films, ignore_index=True)
            # Remove duplicates based on Name + Year
            unique = combined.drop_duplicates(subset=['Name', 'Year'])
            # Remove films with no year
            unique = unique[unique['Year'] > 0]
            self.data['unique_films'] = unique.reset_index(drop=True)
            print(f"✓ Found {len(unique)} unique films to enrich")
        else:
            self.data['unique_films'] = pd.DataFrame(columns=['Name', 'Year'])

    def get_unique_films(self) -> pd.DataFrame:
        """Get list of unique films for enrichment"""
        return self.data.get('unique_films', pd.DataFrame())

    def get_watched_films(self) -> pd.DataFrame:
        """Get watched films"""
        return self.data.get('watched', pd.DataFrame())

    def get_diary(self) -> pd.DataFrame:
        """Get diary entries"""
        return self.data.get('diary', pd.DataFrame())

    def get_ratings(self) -> pd.DataFrame:
        """Get ratings"""
        return self.data.get('ratings', pd.DataFrame())

    def get_watchlist(self) -> pd.DataFrame:
        """Get watchlist"""
        return self.data.get('watchlist', pd.DataFrame())

    def get_liked_films(self) -> pd.DataFrame:
        """Get liked films"""
        return self.data.get('liked_films', pd.DataFrame())
