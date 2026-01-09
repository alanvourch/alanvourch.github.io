"""
Generate HTML dashboard with enhanced visualizations
"""
from typing import Dict
import json


class HTMLGenerator:
    """Generate interactive HTML dashboard"""

    def __init__(self, stats: Dict, charts: Dict):
        self.stats = stats
        self.charts = charts

    def generate(self) -> str:
        """Generate complete HTML page"""
        return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letterboxd Stats - Enhanced Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    {self._generate_styles()}
</head>
<body>
    <div class="container">
        {self._generate_header()}
        {self._generate_stats_grid()}
        {self._generate_charts_section()}
        {self._generate_lists_section()}
        {self._generate_footer()}
    </div>
    {self._generate_scripts()}
</body>
</html>'''

    def _generate_styles(self) -> str:
        """Generate CSS styles"""
        return '''<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            color: #e4e4e7;
            padding: 2rem;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        h1 {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #00d4ff, #7c3aed, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            color: #a1a1aa;
            font-size: 1.1rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .stat-card:nth-child(1) .stat-number { color: #00d4ff; }
        .stat-card:nth-child(2) .stat-number { color: #f472b6; }
        .stat-card:nth-child(3) .stat-number { color: #fbbf24; }
        .stat-card:nth-child(4) .stat-number { color: #34d399; }
        .stat-card:nth-child(5) .stat-number { color: #a78bfa; }
        .stat-card:nth-child(6) .stat-number { color: #fb923c; }

        .stat-label {
            color: #a1a1aa;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .chart-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chart-card h2 {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
            color: #fff;
        }

        .chart-container {
            position: relative;
            height: 300px;
        }

        .lists-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .list-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .list-card h2 {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
            color: #fff;
        }

        .movie-list {
            list-style: none;
        }

        .movie-list li {
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: space-between;
        }

        .movie-name {
            font-weight: 500;
        }

        .movie-count {
            color: #a1a1aa;
        }

        footer {
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            color: #71717a;
        }

        footer a {
            color: #00d4ff;
            text-decoration: none;
        }
    </style>'''

    def _generate_header(self) -> str:
        """Generate header"""
        return '''
        <header>
            <h1>Letterboxd Stats</h1>
            <p class="subtitle">Enhanced Dashboard with TMDB Data</p>
        </header>'''

    def _generate_stats_grid(self) -> str:
        """Generate statistics grid"""
        basic = self.stats.get('basic', {})

        return f'''
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">{basic.get('total_watched', 0)}</div>
                <div class="stat-label">Films Watched</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{basic.get('total_rated', 0)}</div>
                <div class="stat-label">Films Rated</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{basic.get('avg_rating', 0)}</div>
                <div class="stat-label">Average Rating</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{basic.get('total_liked', 0)}</div>
                <div class="stat-label">Films Liked</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{basic.get('rewatches', 0)}</div>
                <div class="stat-label">Rewatches</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{basic.get('total_watchlist', 0)}</div>
                <div class="stat-label">In Watchlist</div>
            </div>
        </div>'''

    def _generate_charts_section(self) -> str:
        """Generate charts section"""
        return f'''
        <div class="charts-grid">
            <div class="chart-card">
                <h2>Top Genres</h2>
                <div class="chart-container">
                    <canvas id="genresChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Films Watched Per Year</h2>
                <div class="chart-container">
                    <canvas id="yearlyChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Top Actors</h2>
                <div class="chart-container">
                    <canvas id="actorsChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Top Directors</h2>
                <div class="chart-container">
                    <canvas id="directorsChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Runtime Distribution</h2>
                <div class="chart-container">
                    <canvas id="runtimeChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Monthly Activity</h2>
                <div class="chart-container">
                    <canvas id="monthlyChart"></canvas>
                </div>
            </div>
        </div>'''

    def _generate_lists_section(self) -> str:
        """Generate lists section"""
        actors = self.stats.get('actors', {}).get('top_by_count', [])[:10]
        directors = self.stats.get('directors', {}).get('top_by_count', [])[:10]
        genres = self.stats.get('genres', {}).get('distribution', [])[:10]

        actors_html = ''.join([
            f'<li><span class="movie-name">{a["name"]}</span><span class="movie-count">{a["count"]} films</span></li>'
            for a in actors
        ])

        directors_html = ''.join([
            f'<li><span class="movie-name">{d["name"]}</span><span class="movie-count">{d["count"]} films</span></li>'
            for d in directors
        ])

        genres_html = ''.join([
            f'<li><span class="movie-name">{g["genre"]}</span><span class="movie-count">{g["count"]} films</span></li>'
            for g in genres
        ])

        return f'''
        <div class="lists-grid">
            <div class="list-card">
                <h2>Top Actors</h2>
                <ul class="movie-list">{actors_html}</ul>
            </div>
            <div class="list-card">
                <h2>Top Directors</h2>
                <ul class="movie-list">{directors_html}</ul>
            </div>
            <div class="list-card">
                <h2>Favorite Genres</h2>
                <ul class="movie-list">{genres_html}</ul>
            </div>
        </div>'''

    def _generate_footer(self) -> str:
        """Generate footer"""
        return '''
        <footer>
            <p>Enhanced with data from <a href="https://www.themoviedb.org" target="_blank">The Movie Database (TMDB)</a></p>
            <p>Built with Letterboxd Stats v2.0</p>
        </footer>'''

    def _generate_scripts(self) -> str:
        """Generate JavaScript for charts"""
        return f'''
    <script>
        Chart.defaults.color = '#a1a1aa';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

        // Genres Chart
        new Chart(document.getElementById('genresChart'), {self.charts.get('genres', '{}')});

        // Yearly Chart
        new Chart(document.getElementById('yearlyChart'), {self.charts.get('yearly', '{}')});

        // Actors Chart
        new Chart(document.getElementById('actorsChart'), {self.charts.get('top_actors', '{}')});

        // Directors Chart
        new Chart(document.getElementById('directorsChart'), {self.charts.get('top_directors', '{}')});

        // Runtime Chart
        new Chart(document.getElementById('runtimeChart'), {self.charts.get('runtime', '{}')});

        // Monthly Chart
        new Chart(document.getElementById('monthlyChart'), {self.charts.get('monthly', '{}')});
    </script>'''
