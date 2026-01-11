"""
Configuration settings for Letterboxd Stats
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# TMDB API Configuration
TMDB_API_KEY = os.getenv('TMDB_API_KEY', '')
TMDB_BASE_URL = 'https://api.themoviedb.org/3'
TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
TMDB_RATE_LIMIT = 40  # requests per 10 seconds
TMDB_RATE_WINDOW = 10  # seconds

# Poster Configuration
# Available sizes: w92, w154, w185, w342, w500, w780, original
# w185 is a good balance between quality and size (~10-15KB per image)
POSTER_SIZE = os.getenv('POSTER_SIZE', 'w185')

# Data Paths
DATA_DIR = os.getenv('DATA_DIR', 'letterboxd-nashkel-2026-01-08-19-29-utc')
CACHE_FILE = os.getenv('CACHE_FILE', 'tmdb_cache.json')
OUTPUT_HTML = os.getenv('OUTPUT_HTML', 'letterboxd_stats.html')
OUTPUT_JSON = os.getenv('OUTPUT_JSON', 'letterboxd_stats_data.json')

# Cache Settings
CACHE_EXPIRY_DAYS = int(os.getenv('CACHE_EXPIRY_DAYS', '30'))
ENABLE_CACHE = os.getenv('ENABLE_CACHE', 'true').lower() == 'true'

# Statistics Settings
TOP_ACTORS_COUNT = int(os.getenv('TOP_ACTORS_COUNT', '20'))
TOP_DIRECTORS_COUNT = int(os.getenv('TOP_DIRECTORS_COUNT', '15'))
TOP_GENRES_COUNT = int(os.getenv('TOP_GENRES_COUNT', '10'))
TOP_COUNTRIES_COUNT = int(os.getenv('TOP_COUNTRIES_COUNT', '10'))
TOP_LANGUAGES_COUNT = int(os.getenv('TOP_LANGUAGES_COUNT', '10'))

# Chart Settings
CHART_HEIGHT = 300
CHART_COLORS = [
    'rgba(0, 212, 255, 0.8)',
    'rgba(124, 58, 237, 0.8)',
    'rgba(244, 114, 182, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(52, 211, 153, 0.8)',
    'rgba(251, 146, 60, 0.8)',
    'rgba(167, 139, 250, 0.8)',
    'rgba(248, 113, 113, 0.8)',
    'rgba(96, 165, 250, 0.8)',
    'rgba(74, 222, 128, 0.8)'
]

# Logging Settings
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_UNMATCHED_FILMS = os.getenv('LOG_UNMATCHED_FILMS', 'true').lower() == 'true'
UNMATCHED_LOG_FILE = 'unmatched_films.log'


def validate_config():
    """Validate required configuration settings"""
    errors = []

    if not TMDB_API_KEY:
        errors.append(
            "TMDB_API_KEY is not set. Please:\n"
            "  1. Get a free API key from https://www.themoviedb.org/settings/api\n"
            "  2. Set it as an environment variable: export TMDB_API_KEY='your_key'\n"
            "  3. Or create a .env file with: TMDB_API_KEY=your_key"
        )

    if not os.path.exists(DATA_DIR):
        errors.append(
            f"Data directory not found: {DATA_DIR}\n"
            "  Please set DATA_DIR to your Letterboxd export folder"
        )

    if errors:
        raise ValueError("\n\n".join(errors))

    return True
