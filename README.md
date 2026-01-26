# Letterboxd Stats Visualizer v4.2

Transform your Letterboxd data into a beautiful, interactive dashboard with insights about your favorite actors, directors, genres, and viewing habits.

![Version](https://img.shields.io/badge/version-4.2-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## What's New in v4.2

- **Aligned Chart Layouts** - Directors and Runtime charts now in 2-column grid matching Activity section
- **More Movies in Year Wrap** - 8 movies (2 rows of 4) for highest/lowest rated instead of 5
- **Rating Distribution Chart** - New chart showing how many films you rated at each star level
- **Better Insights Tab** - Rating trends and distribution side-by-side in consistent layout

## Features

- **Rich Statistics**: Films watched, liked, rated, with like ratio percentage
- **TMDB Integration**: Automatically enriches data with actors, directors, genres, posters
- **Year Comparisons**: Previous year wrap-up vs current year in progress
- **Interactive Charts**: Watched vs liked comparisons for genres, actors, directors
- **Film Modals**: Click actors/directors to see their complete filmography with posters
- **Smart Caching**: First run fetches data, subsequent runs are instant

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get Your TMDB API Key

1. Sign up at [themoviedb.org](https://www.themoviedb.org)
2. Go to Settings → API → Create
3. Choose "Developer" and fill out the form
4. Copy your API key

### 3. Configure

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your TMDB API key
# TMDB_API_KEY=your_key_here
# DATA_DIR=your-letterboxd-export-folder
```

### 4. Export Letterboxd Data

1. Go to [Letterboxd Settings](https://letterboxd.com/settings/data/)
2. Click "Export Your Data"
3. Download and extract the ZIP to this project folder

### 5. Run

```bash
python run.py
```

Open `letterboxd_stats.html` in your browser to see your dashboard!

## Dashboard Sections

### Overview
- Key stats at a glance (watched, liked, like ratio, avg rating)
- Watched vs Liked comparison charts for genres, actors, directors
- Activity trends (yearly, monthly)
- Runtime distribution chart

### Year Wrap-up (e.g., 2025)
- Total films logged and liked that year (with ❤️ icons)
- Average rating for the year
- Most active month (full name like "January")
- Top actor and director of the year (with larger poster filmstrip)
- Adaptive grid of highest and lowest rated films (with posters)

### Current Year (e.g., 2026)
- Same as wrap-up, but updates each time you run
- Track your viewing progress throughout the year

### People
- Top actors and directors with watch/like counts
- Like ratio bar showing how much you love vs just watch
- Click any card to see all their films with posters and ❤️ badges

### Insights
- Viewing time statistics (average runtime, total hours, shortest/longest)
- Genre distribution (doughnut chart with single-column legend)
- Top production countries
- Rating evolution over time

## Advanced Usage

See [CLAUDE.md](CLAUDE.md) for detailed documentation including:
- Configuration options
- Caching behavior
- TMDB matching logic
- Architecture details
- Troubleshooting

## Tech Stack

- **Python**: Data processing and orchestration
- **pandas**: Data analysis
- **TMDB API**: Film metadata and poster images
- **Chart.js**: Interactive visualizations
- **HTML/CSS**: Modern, responsive dark-themed UI

## Changelog

### v4.2
- Directors and Runtime charts now in aligned 2-column grid
- Year wrap sections show 8 movies (2 rows of 4) instead of 5
- Added Rating Distribution chart to Insights tab
- Rating Analysis section with side-by-side charts

### v4.1
- Enhanced year wrap sections with larger posters (90x135px)
- Red heart emojis for liked films throughout
- Full month names (e.g., "January" not "Jan")
- Adaptive poster grids that fill available space
- Improved highlight cards with less empty space
- Fixed genres pie chart legend to single column
- Emoji icons added to section headers
- Better visual design with gradients and shadows

### v4.0
- Complete dashboard redesign with tabbed navigation
- Year wrap-up sections with movie posters
- Watched vs liked comparison analysis
- Click-to-expand film modals
- Like ratio metrics

### v2.0
- TMDB integration for metadata enrichment
- Basic statistics and charts

### v1.0
- Initial release

## Credits

- Film data from [Letterboxd](https://letterboxd.com)
- Metadata and posters from [The Movie Database (TMDB)](https://www.themoviedb.org)

---

**Note**: This project is not affiliated with Letterboxd or TMDB. Make sure to comply with their respective terms of service.
