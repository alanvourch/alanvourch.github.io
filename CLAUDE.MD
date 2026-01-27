# Letterboxd Stats Visualizer v5.4

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

### Dashboard Navigation (v5.0)
The dashboard uses a tabbed interface with 7 main sections:
1. **Overview** - Key stats, watched vs liked comparisons, activity charts, directors comparison, and runtime distribution
2. **Journey** - Film milestones, personal records, fun facts, rewatches, and 5-star wall
3. **[Year] Wrap** - Previous year wrap-up (Spotify Wrapped style) with 8 movies in rated sections
4. **[Year] Live** - Current year stats, updated on each run
5. **Decades** - Era analysis with films by decade and top-rated films from each decade
6. **People** - Interactive actor/director cards with click-to-expand film lists
7. **Insights** - Viewing time stats, genre distribution, countries, rating trends, and rating distribution

### Basic Statistics
- Total films watched
- Total films rated
- Average rating
- Total liked films (with like ratio %)
- Rewatch count
- Watchlist size

### TMDB-Enhanced Statistics
- **Actor Analysis**: Top actors by watch count AND like count, with full filmography
- **Director Analysis**: Top directors by watch count AND like count, with full filmography
- **Genre Analysis**: Genre distribution, watched vs liked comparison
- **Runtime Analysis**: Average runtime, distribution by length categories
- **Geography**: Top production countries, original language distribution
- **Temporal Patterns**: Viewing activity by year, month, and weekday

### Year Wrap-up Features (Enhanced in v4.1)
Each year section includes:
- Total films logged that year
- Total films liked that year (with red heart icon)
- Average rating for the year
- Most active month (full month names like "January")
- Top actor of the year (with larger poster filmstrip, 90x135px)
- Top director of the year (with larger poster filmstrip)
- Adaptive poster grid for highest/lowest rated films (fills available space)

### Watched vs Liked Analysis (NEW in v3.0)
- Dual-bar charts comparing watched count vs liked count
- Available for: Genres, Actors, Directors
- Like ratio visualization on person cards
- Helps identify which actors/directors you truly love vs just watch often

### Visualizations
1. **Genres: Watched vs Liked** - Dual horizontal bar chart
2. **Actors: Watched vs Liked** - Dual horizontal bar chart
3. **Directors: Watched vs Liked** - Dual horizontal bar chart
4. **Films Watched Per Year** - Bar chart
5. **Monthly Activity** - Line chart (last 24 months)
6. **Runtime Distribution** - Histogram
7. **Top Genres** - Doughnut chart
8. **Top Countries** - Horizontal bar chart
9. **Rating Evolution** - Line chart over time

### Interactive Features
- **Click on Actor/Director cards** - Opens modal with all their films
- **Film modals show**: Poster with red heart for liked films, title, year, star rating
- **Poster images** - Loaded from TMDB (w185 size for performance)
- **Tab navigation** - Switch between dashboard sections with smooth animations
- **Keyboard support** - ESC to close modals
- **Hover effects** - Poster scale, shadows, and card highlighting

### Movie Posters
- Poster size: `w185` (185px wide, ~10-15KB each)
- Mini posters in filmstrips: 90x135px with shadow effects
- Adaptive grid posters: 130-140px minimum width
- Lazy loading for performance
- SVG placeholder for missing posters
- Used in: Year wrap-ups, film modals, top/bottom rated sections
- Hover effects with scale transform and enhanced shadows

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
2. Enrich films with TMDB metadata (actors, directors, genres, posters, etc.)
3. Cache TMDB data for faster subsequent runs
4. Calculate comprehensive statistics including yearly breakdowns
5. Generate `letterboxd_stats.html` (interactive dashboard)
6. Generate `letterboxd_stats_data.json` (raw data for web apps)

Open `letterboxd_stats.html` in your browser to view the dashboard.

## Configuration Options

All settings can be configured via environment variables or the `.env` file:

- `TMDB_API_KEY` - Your TMDB API key (required)
- `DATA_DIR` - Letterboxd export directory
- `CACHE_FILE` - TMDB cache file location (default: `tmdb_cache.json`)
- `CACHE_EXPIRY_DAYS` - How long to cache TMDB data (default: 30 days)
- `POSTER_SIZE` - TMDB poster size (default: `w185`, options: w92, w154, w185, w342, w500, w780)
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
- Includes poster_path - no extra API calls needed for images

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
- Modern dark theme (cinematic feel)
- Tabbed navigation interface
- CSS custom properties for easy theming
- Responsive grid layouts
- Interactive Chart.js visualizations
- Modal dialogs for film lists
- Hover effects and smooth transitions
- Mobile-friendly responsive design

Color scheme:
- Background: Deep dark (#0d0d14, #14141f)
- Accent colors: Cyan, Purple, Pink, Yellow, Green, Orange
- Liked indicator: Red (#ef4444)
- Typography: Inter font family

## Technical Notes

- **Modular architecture**: Separated concerns for easy maintenance
- **Web-app ready**: Data layer can be imported as library in Flask/FastAPI
- **JSON export**: Stats exported to JSON for frontend consumption
- **Rate limiting**: Respects TMDB API limits
- **Error handling**: Graceful degradation if API fails
- **Progress tracking**: Real-time progress bars for long operations
- **Windows compatible**: ASCII-safe console output

## TMDB Matching

Films are matched using title + year:
- **Primary search**: TMDB `/search/movie` endpoint with title and year
- **Fallback**: Searches without year if no match found
- **Validation**: Client-side validation of match quality
- **Success rate**: Typically 95%+ match rate
- **Unmatched films**: Logged to `unmatched_films.log` for review

## Dynamic Year Detection

The dashboard automatically determines:
- **Last full year**: `current_year - 1` (e.g., 2025)
- **Current year**: `current_year` (e.g., 2026)

This means:
- Year tabs automatically update each January
- No code changes needed for yearly rollover
- Current year stats update with each run

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
GET  /api/stats/year/:year
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

### Posters not loading
- Check your internet connection
- TMDB image CDN may be temporarily unavailable
- Placeholder SVG will show for missing posters

## Dependencies

- pandas >= 2.0.0 - Data processing
- requests >= 2.31.0 - HTTP requests to TMDB API
- python-dotenv >= 1.0.0 - Environment variable management
- tqdm >= 4.66.0 - Progress bars

External (CDN):
- Chart.js - Interactive charts
- Google Fonts (Inter) - Typography
- TMDB Image CDN - Movie posters

## License

This project uses data from TMDB. Make sure to comply with TMDB's terms of service and display proper attribution when using their data.

## Credits

- Data sourced from [Letterboxd](https://letterboxd.com)
- Film metadata from [The Movie Database (TMDB)](https://www.themoviedb.org)
- Built with Python, pandas, and Chart.js

## Changelog

### v5.4 (2026-01)
- PERF: 10-20x faster TMDB fetching using `append_to_response` (1 API call instead of 2 per film)
- PERF: Concurrent fetching with ThreadPoolExecutor (8 workers) and connection pooling
- PERF: Separate cached vs uncached films upfront to skip unnecessary processing
- ENHANCED: People tab renamed to People/Studios with sub-tab navigation (pill buttons)
- ENHANCED: Larger person cards — 100px profile photos, 48x72px mini posters (5 shown)
- ENHANCED: Crew cards (composers, cinematographers, writers) now match actor/director card size with poster strips
- ENHANCED: Studio cards now show TMDB logos with white background
- FIX: Film names no longer truncated in Insights tab (shortest/longest film)
- FIX: Poster strip no longer clips 5th poster on person cards

### v5.0 (2026-01)
- NEW: Journey tab with film milestones (100th, 250th, 500th, 1000th films)
- NEW: First film and most recent film cards with posters and dates
- NEW: Personal records (most films in a day, longest streak, busiest month)
- NEW: Fun facts with personalized insights (time with favorite actor, decade preferences, etc.)
- NEW: Decades tab with era analysis and top-rated films per decade
- NEW: Decades distribution chart showing films watched by decade
- NEW: 5-star poster wall showcasing all perfect-rated films
- NEW: Rewatch tracking with most rewatched films grid
- ENHANCED: People tab completely redesigned with profile photos from TMDB
- ENHANCED: Actor/Director cards now show rank, photo, avg rating, mini poster strip, and like ratio bar
- NEW: Behind the Camera section with top composers, cinematographers, and writers
- NEW: Top Studios section showing most-watched production companies
- NEW: All crew and studio cards are clickable to see their film catalogs
- Improved visual design with new milestone cards, journey hero section, and decade cards
- Enhanced CSS with gradient effects, hover animations, and better card layouts
- Dashboard now has 7 tabs: Overview, Journey, [Year] Wrap, [Year] Live, Decades, People, Insights

### v4.2 (2026-01)
- Directors and Runtime charts now displayed in aligned 2-column grid (matching Activity section)
- Year wrap sections now show 8 movies (2 rows of 4) instead of 5 for highest/lowest rated
- Added Rating Distribution chart to Insights tab showing films per star level
- Rating Analysis section with side-by-side Rating Trends and Rating Distribution charts
- Fixed poster grid layout for year wrap sections

### v4.1 (2026-01)
- Enhanced year wrap sections with better visual design
- Red heart emojis for liked films throughout the dashboard
- Full month names instead of abbreviations (e.g., "January" not "Jan")
- Adaptive poster grids that fill available space responsively
- Larger, more visually appealing posters (90x135px in filmstrips)
- Improved highlight cards with less empty space
- Removed duplicate runtime distribution from Insights tab
- Fixed genres pie chart legend to single column
- Added emoji icons to section headers
- Improved top person cards with gradient text effect
- Better poster shadows and hover effects
- Year wrap sections now have gradient top border accent

### v4.0 (2026-01)
- Complete dashboard redesign with tabbed navigation
- Added year wrap-up sections (previous year + current year)
- Added watched vs liked comparison charts
- Added movie posters throughout the dashboard
- Added click-to-expand film modals for actors/directors
- Added like ratio metric and visualization
- Removed redundant duplicate lists
- Improved mobile responsiveness
- Fixed Windows console encoding issues

### v3.0
- Initial tabbed dashboard design

### v2.0
- Initial TMDB integration
- Basic statistics and charts
- Glassmorphism design

### v1.0
- Basic Letterboxd data visualization
