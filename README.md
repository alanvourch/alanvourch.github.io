# Letterboxd Stats Visualizer v2.0

Transform your Letterboxd data into a beautiful, interactive dashboard with insights about your favorite actors, directors, genres, and viewing habits.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## Features

- **Rich Statistics**: Comprehensive analysis of your film watching habits
- **TMDB Integration**: Automatically enriches your data with actors, directors, genres, and more
- **Beautiful Dashboard**: Modern, responsive HTML interface with interactive charts
- **Smart Caching**: First run takes a few minutes, subsequent runs are instant
- **Web-App Ready**: Modular architecture for easy conversion to a full web application

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

## What You Get

### Statistics
- Top actors and directors you watch most
- Genre preferences and distribution
- Runtime analysis
- Country/language breakdown
- Viewing patterns by year, month, weekday
- Rating evolution over time

### Visualizations
- Interactive Chart.js charts
- Genre distribution pie chart
- Actor/director bar charts
- Runtime histograms
- Monthly activity trends
- And more...

## Advanced Usage

See [CLAUDE.MD](CLAUDE.MD) for detailed documentation including:
- Configuration options
- Caching behavior
- TMDB matching logic
- Web app conversion guide
- Troubleshooting

## Tech Stack

- **Python**: Data processing and orchestration
- **pandas**: Data analysis
- **TMDB API**: Film metadata enrichment
- **Chart.js**: Interactive visualizations
- **HTML/CSS**: Modern, responsive UI

## Credits

- Film data from [Letterboxd](https://letterboxd.com)
- Metadata from [The Movie Database (TMDB)](https://www.themoviedb.org)

---

**Note**: This project is not affiliated with Letterboxd or TMDB. Make sure to comply with their respective terms of service.
