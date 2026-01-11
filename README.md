# Letterboxd Stats Visualizer v3.0

Transform your Letterboxd data into a beautiful, interactive dashboard with insights about your favorite actors, directors, genres, and viewing habits.

![Version](https://img.shields.io/badge/version-3.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## What's New in v3.0

- **Tabbed Dashboard** - Navigate between Overview, Year Wrap-ups, People, and Discovery
- **Year Wrap-ups** - Spotify Wrapped-style summaries for last year and current year
- **Watched vs Liked** - See which actors/directors you truly love, not just watch often
- **Movie Posters** - Visual filmographies with TMDB poster images
- **Click-to-Explore** - Click any actor or director to see all their films you've watched

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

### Year Wrap-up (e.g., 2025)
- Total films logged and liked that year
- Average rating for the year
- Most active month
- Top actor and director of the year (with poster filmstrip)
- Top 5 highest and lowest rated films (with posters)

### Current Year (e.g., 2026)
- Same as wrap-up, but updates each time you run
- Track your viewing progress throughout the year

### People
- Top actors and directors with watch/like counts
- Like ratio bar showing how much you love vs just watch
- Click any card to see all their films with posters

### Discovery
- Genre distribution (doughnut chart)
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

### v3.0
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
