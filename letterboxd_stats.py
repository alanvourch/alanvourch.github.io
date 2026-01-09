import pandas as pd
import json
from collections import Counter
from datetime import datetime
import os

# Data directory
DATA_DIR = "letterboxd-nashkel-2026-01-08-19-29-utc"

# Load data
watched = pd.read_csv(f"{DATA_DIR}/watched.csv")
diary = pd.read_csv(f"{DATA_DIR}/diary.csv")
ratings = pd.read_csv(f"{DATA_DIR}/ratings.csv")
watchlist = pd.read_csv(f"{DATA_DIR}/watchlist.csv")
liked_films = pd.read_csv(f"{DATA_DIR}/likes/films.csv")

# Process stats
total_watched = len(watched)
total_rated = len(ratings)
total_liked = len(liked_films)
total_watchlist = len(watchlist)
total_diary_entries = len(diary)

# Rating distribution
rating_counts = ratings['Rating'].value_counts().sort_index()
rating_labels = [str(r) for r in rating_counts.index.tolist()]
rating_values = rating_counts.values.tolist()

# Average rating
avg_rating = round(ratings['Rating'].mean(), 2)

# Movies by release year (decades)
decade_counts = Counter((y // 10) * 10 for y in watched['Year'].dropna().astype(int))
decade_labels = sorted(decade_counts.keys())
decade_values = [decade_counts[d] for d in decade_labels]
decade_labels = [f"{d}s" for d in decade_labels]

# Movies watched per year (by watch date from diary)
diary['Watched Date'] = pd.to_datetime(diary['Watched Date'], errors='coerce')
diary['Watch Year'] = diary['Watched Date'].dt.year
watch_year_counts = diary['Watch Year'].dropna().astype(int).value_counts().sort_index()
watch_year_labels = [str(y) for y in watch_year_counts.index.tolist()]
watch_year_values = watch_year_counts.values.tolist()

# Monthly activity (current year / all time)
diary['Watch Month'] = diary['Watched Date'].dt.to_period('M')
monthly_counts = diary.groupby('Watch Month').size()
recent_months = monthly_counts.tail(24)
monthly_labels = [str(m) for m in recent_months.index.tolist()]
monthly_values = recent_months.values.tolist()

# Top rated movies (5 stars)
top_rated = ratings[ratings['Rating'] == 5.0][['Name', 'Year']].head(20).to_dict('records')

# Recent diary entries
recent_diary = diary.sort_values('Watched Date', ascending=False).head(10)[['Name', 'Year', 'Rating', 'Watched Date', 'Rewatch']].copy()
recent_diary['Watched Date'] = recent_diary['Watched Date'].dt.strftime('%Y-%m-%d')
recent_diary = recent_diary.to_dict('records')

# Rewatches count
rewatches = diary['Rewatch'].notna().sum()

# Movies by release year (top years)
year_counts = watched['Year'].value_counts().head(15).sort_index()
top_years_labels = [str(int(y)) for y in year_counts.index.tolist()]
top_years_values = year_counts.values.tolist()

# Watchlist preview
watchlist_preview = watchlist.head(10)[['Name', 'Year']].to_dict('records')

# Generate HTML
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letterboxd Stats</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            color: #e4e4e7;
            padding: 2rem;
        }}

        .container {{
            max-width: 1400px;
            margin: 0 auto;
        }}

        header {{
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }}

        h1 {{
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #00d4ff, #7c3aed, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }}

        .subtitle {{
            color: #a1a1aa;
            font-size: 1.1rem;
        }}

        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }}

        .stat-card {{
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }}

        .stat-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }}

        .stat-number {{
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }}

        .stat-card:nth-child(1) .stat-number {{ color: #00d4ff; }}
        .stat-card:nth-child(2) .stat-number {{ color: #f472b6; }}
        .stat-card:nth-child(3) .stat-number {{ color: #fbbf24; }}
        .stat-card:nth-child(4) .stat-number {{ color: #34d399; }}
        .stat-card:nth-child(5) .stat-number {{ color: #a78bfa; }}
        .stat-card:nth-child(6) .stat-number {{ color: #fb923c; }}

        .stat-label {{
            color: #a1a1aa;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}

        .charts-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }}

        @media (max-width: 600px) {{
            .charts-grid {{
                grid-template-columns: 1fr;
            }}
        }}

        .chart-card {{
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }}

        .chart-card h2 {{
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}

        .chart-container {{
            position: relative;
            height: 300px;
        }}

        .lists-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }}

        .list-card {{
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }}

        .list-card h2 {{
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
            color: #fff;
        }}

        .movie-list {{
            list-style: none;
        }}

        .movie-list li {{
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .movie-list li:last-child {{
            border-bottom: none;
        }}

        .movie-name {{
            font-weight: 500;
        }}

        .movie-year {{
            color: #71717a;
            font-size: 0.9rem;
        }}

        .movie-rating {{
            color: #fbbf24;
            font-weight: 600;
        }}

        .rewatch-badge {{
            background: rgba(124, 58, 237, 0.3);
            color: #a78bfa;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }}

        footer {{
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            color: #71717a;
            font-size: 0.9rem;
        }}

        footer a {{
            color: #00d4ff;
            text-decoration: none;
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Letterboxd Stats</h1>
            <p class="subtitle">A visual journey through your film collection</p>
        </header>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">{total_watched}</div>
                <div class="stat-label">Films Watched</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{total_rated}</div>
                <div class="stat-label">Films Rated</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{avg_rating}</div>
                <div class="stat-label">Average Rating</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{total_liked}</div>
                <div class="stat-label">Films Liked</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{int(rewatches)}</div>
                <div class="stat-label">Rewatches</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{total_watchlist}</div>
                <div class="stat-label">In Watchlist</div>
            </div>
        </div>

        <div class="charts-grid">
            <div class="chart-card">
                <h2>Rating Distribution</h2>
                <div class="chart-container">
                    <canvas id="ratingsChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Films by Decade</h2>
                <div class="chart-container">
                    <canvas id="decadesChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Films Watched Per Year</h2>
                <div class="chart-container">
                    <canvas id="yearlyChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h2>Monthly Activity (Last 2 Years)</h2>
                <div class="chart-container">
                    <canvas id="monthlyChart"></canvas>
                </div>
            </div>
        </div>

        <div class="lists-grid">
            <div class="list-card">
                <h2>5-Star Films</h2>
                <ul class="movie-list">
                    {"".join(f'<li><span class="movie-name">{m["Name"]}</span><span class="movie-year">{int(m["Year"])}</span></li>' for m in top_rated)}
                </ul>
            </div>
            <div class="list-card">
                <h2>Recent Diary</h2>
                <ul class="movie-list">
                    {"".join(f'<li><div><span class="movie-name">{m["Name"]}</span>{"<span class=\\'rewatch-badge\\'>Rewatch</span>" if pd.notna(m.get("Rewatch")) else ""}</div><div><span class="movie-rating">{m["Rating"] if pd.notna(m.get("Rating")) else "-"}</span></div></li>' for m in recent_diary)}
                </ul>
            </div>
            <div class="list-card">
                <h2>Watchlist Preview</h2>
                <ul class="movie-list">
                    {"".join(f'<li><span class="movie-name">{m["Name"]}</span><span class="movie-year">{int(m["Year"])}</span></li>' for m in watchlist_preview)}
                </ul>
            </div>
        </div>

        <footer>
            <p>Generated from <a href="https://letterboxd.com" target="_blank">Letterboxd</a> data</p>
        </footer>
    </div>

    <script>
        // Chart.js global config
        Chart.defaults.color = '#a1a1aa';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

        // Rating Distribution Chart
        new Chart(document.getElementById('ratingsChart'), {{
            type: 'bar',
            data: {{
                labels: {json.dumps(rating_labels)},
                datasets: [{{
                    label: 'Films',
                    data: {json.dumps(rating_values)},
                    backgroundColor: 'rgba(251, 191, 36, 0.8)',
                    borderColor: 'rgba(251, 191, 36, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{ display: false }}
                }},
                scales: {{
                    y: {{
                        beginAtZero: true,
                        grid: {{ color: 'rgba(255, 255, 255, 0.05)' }}
                    }},
                    x: {{
                        grid: {{ display: false }}
                    }}
                }}
            }}
        }});

        // Decades Chart
        new Chart(document.getElementById('decadesChart'), {{
            type: 'doughnut',
            data: {{
                labels: {json.dumps(decade_labels)},
                datasets: [{{
                    data: {json.dumps(decade_values)},
                    backgroundColor: [
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
                    ],
                    borderWidth: 0
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{
                        position: 'right',
                        labels: {{ padding: 15, usePointStyle: true }}
                    }}
                }}
            }}
        }});

        // Yearly Watch Chart
        new Chart(document.getElementById('yearlyChart'), {{
            type: 'bar',
            data: {{
                labels: {json.dumps(watch_year_labels)},
                datasets: [{{
                    label: 'Films',
                    data: {json.dumps(watch_year_values)},
                    backgroundColor: 'rgba(0, 212, 255, 0.8)',
                    borderColor: 'rgba(0, 212, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{ display: false }}
                }},
                scales: {{
                    y: {{
                        beginAtZero: true,
                        grid: {{ color: 'rgba(255, 255, 255, 0.05)' }}
                    }},
                    x: {{
                        grid: {{ display: false }}
                    }}
                }}
            }}
        }});

        // Monthly Activity Chart
        new Chart(document.getElementById('monthlyChart'), {{
            type: 'line',
            data: {{
                labels: {json.dumps(monthly_labels)},
                datasets: [{{
                    label: 'Films',
                    data: {json.dumps(monthly_values)},
                    borderColor: 'rgba(244, 114, 182, 1)',
                    backgroundColor: 'rgba(244, 114, 182, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(244, 114, 182, 1)',
                    pointRadius: 3
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{ display: false }}
                }},
                scales: {{
                    y: {{
                        beginAtZero: true,
                        grid: {{ color: 'rgba(255, 255, 255, 0.05)' }}
                    }},
                    x: {{
                        grid: {{ display: false }},
                        ticks: {{
                            maxRotation: 45,
                            minRotation: 45
                        }}
                    }}
                }}
            }}
        }});
    </script>
</body>
</html>
'''

# Write the HTML file
with open('letterboxd_stats.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated letterboxd_stats.html successfully!")
print(f"\nStats Summary:")
print(f"  - Total films watched: {total_watched}")
print(f"  - Total films rated: {total_rated}")
print(f"  - Average rating: {avg_rating}")
print(f"  - Total liked: {total_liked}")
print(f"  - Rewatches: {int(rewatches)}")
print(f"  - Watchlist: {total_watchlist}")
