# Letterboxd Stats Visualizer v2.0

A Python-based tool that generates beautiful, interactive HTML visualizations of your Letterboxd movie watching data, enhanced with metadata from The Movie Database (TMDB).

## Project Overview

This project processes exported Letterboxd data and enriches it with comprehensive film metadata from TMDB to create an enhanced dashboard with detailed statistics, charts, and insights about your film watching habits including actors, directors, genres, and more.

## Architecture

The project uses a modular architecture designed for easy maintenance and future web app conversion:

```
letterboxd_stats/
├── __init__.py           # Package initialization
├── config.py             # Configuration and settings
├── data_loader.py        # Letterboxd CSV loading
├── tmdb_enricher.py      # TMDB API integration with caching
├── stats_calculator.py   # Statistics calculations
├── chart_generator.py    # Chart.js configurations
├── html_generator.py     # HTML dashboard generation
└── main.py               # Main orchestration script

run.py                    # Simple runner script
requirements.txt          # Python dependencies
.env.example              # Environment variable template
.gitignore                # Git ignore rules
```

## Features

### Basic Statistics
- Total films watched
- Total films rated
- Average rating
- Total liked films
- Rewatch count
- Watchlist size

### TMDB-Enhanced Statistics
- **Actor Analysis**: Top 20 actors by appearance count, favorite actors by rating
- **Director Analysis**: Top 15 directors by film count, favorite directors by rating
- **Genre Analysis**: Genre distribution, favorite genres, genre-rating correlations
- **Runtime Analysis**: Average runtime, distribution by length categories
- **Geography**: Top production countries, original language distribution
- **Temporal Patterns**: Viewing activity by year, month, and weekday

### Visualizations
1. **Top Genres** - Doughnut chart
2. **Films Watched Per Year** - Bar chart
3. **Top Actors** - Horizontal bar chart
4. **Top Directors** - Horizontal bar chart
5. **Runtime Distribution** - Histogram
6. **Monthly Activity** - Line chart showing last 24 months
7. **Rating Evolution** - How your ratings change over time
8. **Top Countries** - Production country distribution

### Lists & Tables
- Top actors by film count
- Top directors by film count
- Favorite genres by average rating
- Recent diary entries

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get TMDB API Key

1. Create a free account at [https://www.themoviedb.org](https://www.themoviedb.org)
2. Go to Settings → API → Request an API Key
3. Choose "Developer" option
4. Fill out the form (use personal/educational purpose)
5. Copy your API key

### 3. Configure Environment

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your TMDB API key:

```
TMDB_API_KEY=your_actual_api_key_here
DATA_DIR=your-letterboxd-export-folder-name
```

### 4. Export Letterboxd Data

1. Go to Letterboxd Settings → Import & Export
2. Click "Export Your Data"
3. Download and extract the ZIP file to this project directory

## Usage

Run the dashboard generator:

```bash
python run.py
```

Or directly:

```bash
python -m letterboxd_stats.main
```

The script will:
1. Load your Letterboxd CSV data
2. Enrich films with TMDB metadata (actors, directors, genres, etc.)
3. Cache TMDB data for faster subsequent runs
4. Calculate comprehensive statistics
5. Generate `letterboxd_stats.html` (interactive dashboard)
6. Generate `letterboxd_stats_data.json` (raw data for web apps)

Open `letterboxd_stats.html` in your browser to view the dashboard.

## Configuration Options

All settings can be configured via environment variables or the `.env` file:

- `TMDB_API_KEY` - Your TMDB API key (required)
- `DATA_DIR` - Letterboxd export directory
- `CACHE_FILE` - TMDB cache file location (default: `tmdb_cache.json`)
- `CACHE_EXPIRY_DAYS` - How long to cache TMDB data (default: 30 days)
- `TOP_ACTORS_COUNT` - Number of top actors to show (default: 20)
- `TOP_DIRECTORS_COUNT` - Number of top directors to show (default: 15)
- `TOP_GENRES_COUNT` - Number of top genres to show (default: 10)

See `.env.example` for all available options.

## Caching

The TMDB enricher caches all API responses in `tmdb_cache.json`:

- **First run**: Fetches metadata for all unique films (~2-5 minutes for 2000 films)
- **Subsequent runs**: Instant (uses cached data)
- **Cache expiry**: Configurable (default 30 days)
- **Manual refresh**: Delete `tmdb_cache.json` to re-fetch all data

The caching system:
- Respects TMDB rate limits (40 requests/10 seconds)
- Shows progress bar during enrichment
- Logs unmatched films to `unmatched_films.log`
- Provides detailed summary of match success rate

## Data Sources

### Letterboxd Export Files
- `watched.csv` - All watched films
- `diary.csv` - Diary entries with watch dates and ratings
- `ratings.csv` - Film ratings
- `watchlist.csv` - Films in watchlist
- `likes/films.csv` - Liked films

### TMDB Metadata
For each film, the TMDB API provides:
- Genres
- Cast (top 10 actors)
- Crew (directors)
- Runtime
- Production countries
- Original language
- Budget and revenue
- Overview/plot summary
- Popularity and vote metrics
- Poster and backdrop images

## Design

The HTML output features:
- Modern gradient background (dark blue to purple)
- Glassmorphism UI elements with backdrop blur
- Responsive grid layouts
- Interactive Chart.js visualizations
- Hover effects and smooth transitions
- Mobile-friendly responsive design

Color scheme:
- Primary gradient: Blues and purples (#1a1a2e, #16213e, #0f3460)
- Accent colors: Cyan, Pink, Yellow, Green, Purple, Orange
- Typography: Inter font family

## Technical Notes

- **Modular architecture**: Separated concerns for easy maintenance
- **Web-app ready**: Data layer can be imported as library in Flask/FastAPI
- **JSON export**: Stats exported to JSON for frontend consumption
- **Rate limiting**: Respects TMDB API limits
- **Error handling**: Graceful degradation if API fails
- **Progress tracking**: Real-time progress bars for long operations

## TMDB Matching

Films are matched using title + year:
- **Primary search**: TMDB `/search/movie` endpoint with title and year
- **Fallback**: Searches without year if no match found
- **Validation**: Client-side validation of match quality
- **Success rate**: Typically 95%+ match rate
- **Unmatched films**: Logged to `unmatched_films.log` for review

## Future Web App Features

The modular architecture is designed for easy conversion to a web application:

### Planned Features
- User uploads Letterboxd ZIP file
- Server-side processing with progress updates
- Interactive filtering and drill-downs
- User accounts and saved dashboards
- Comparison with other users
- Social sharing
- Export to various formats

### Potential API Endpoints
```
GET  /api/stats/overview
GET  /api/stats/genres
GET  /api/stats/actors
GET  /api/stats/directors
GET  /api/films?genre=Action&year=2020
POST /api/enrich (upload & process)
```

## Troubleshooting

### "TMDB_API_KEY is not set"
- Create a `.env` file and add your API key
- Or set environment variable: `export TMDB_API_KEY='your_key'`

### "Data directory not found"
- Update `DATA_DIR` in `.env` to match your Letterboxd export folder name
- Ensure the export folder is in the project directory

### Films not matching
- Check `unmatched_films.log` for list of unmatched films
- Some obscure/foreign films may not be in TMDB
- Consider manual matching or alternative titles

### Slow first run
- Normal! Fetching 2000 films takes 2-5 minutes
- Progress bar shows current status
- Subsequent runs use cache and are instant

## Dependencies

- pandas >= 2.0.0 - Data processing
- requests >= 2.31.0 - HTTP requests to TMDB API
- python-dotenv >= 1.0.0 - Environment variable management
- tqdm >= 4.66.0 - Progress bars

External (CDN):
- Chart.js - Interactive charts
- Google Fonts (Inter) - Typography

## License

This project uses data from TMDB. Make sure to comply with TMDB's terms of service and display proper attribution when using their data.

## Credits

- Data sourced from [Letterboxd](https://letterboxd.com)
- Film metadata from [The Movie Database (TMDB)](https://www.themoviedb.org)
- Built with Python, pandas, and Chart.js
