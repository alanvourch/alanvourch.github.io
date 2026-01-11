"""
Generate Chart.js configuration objects for visualizations
"""
import json
from typing import Dict, List
from . import config


class ChartGenerator:
    """Generate Chart.js configurations for various chart types"""

    # Modern color palette
    COLORS = {
        'cyan': 'rgba(0, 212, 255, 0.85)',
        'purple': 'rgba(124, 58, 237, 0.85)',
        'pink': 'rgba(244, 114, 182, 0.85)',
        'yellow': 'rgba(251, 191, 36, 0.85)',
        'green': 'rgba(52, 211, 153, 0.85)',
        'orange': 'rgba(251, 146, 60, 0.85)',
        'violet': 'rgba(167, 139, 250, 0.85)',
        'red': 'rgba(248, 113, 113, 0.85)',
        'blue': 'rgba(96, 165, 250, 0.85)',
        'emerald': 'rgba(74, 222, 128, 0.85)',
        # Liked-specific (heart red)
        'liked': 'rgba(239, 68, 68, 0.85)',
        'liked_light': 'rgba(239, 68, 68, 0.4)',
    }

    def __init__(self, stats: Dict):
        self.stats = stats
        self.colors = config.CHART_COLORS

    def generate_all_charts(self) -> Dict[str, str]:
        """Generate all chart configurations"""
        charts = {}

        # Basic charts
        charts['ratings'] = self._rating_distribution_chart()
        charts['decades'] = self._decades_chart()
        charts['yearly'] = self._yearly_watch_chart()
        charts['monthly'] = self._monthly_activity_chart()

        # TMDB-enriched charts
        charts['genres'] = self._genre_distribution_chart()
        charts['top_actors'] = self._top_actors_chart()
        charts['top_directors'] = self._top_directors_chart()
        charts['runtime'] = self._runtime_distribution_chart()
        charts['countries'] = self._countries_chart()
        charts['rating_evolution'] = self._rating_evolution_chart()

        # NEW: Watched vs Liked comparison charts
        charts['genres_watched_vs_liked'] = self._genres_watched_vs_liked_chart()
        charts['actors_watched_vs_liked'] = self._actors_watched_vs_liked_chart()
        charts['directors_watched_vs_liked'] = self._directors_watched_vs_liked_chart()

        return charts

    def _rating_distribution_chart(self) -> str:
        """Rating distribution bar chart"""
        # This would use the ratings data from basic stats
        # For now, returning a placeholder structure
        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': [],
                'datasets': [{
                    'label': 'Films',
                    'data': [],
                    'backgroundColor': self.colors[3],
                    'borderRadius': 6
                }]
            },
            'options': {
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'y': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'x': {'grid': {'display': False}}
                }
            }
        })

    def _genres_chart(self) -> str:
        """Genre distribution chart"""
        genre_data = self.stats.get('genres', {}).get('distribution', [])

        labels = [item['genre'] for item in genre_data]
        data = [item['count'] for item in genre_data]

        return json.dumps({
            'type': 'doughnut',
            'data': {
                'labels': labels,
                'datasets': [{
                    'data': data,
                    'backgroundColor': self.colors[:len(labels)],
                    'borderWidth': 0
                }]
            },
            'options': {
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {
                    'legend': {'position': 'right', 'labels': {'padding': 15, 'usePointStyle': True}}
                }
            }
        })

    def _decades_chart(self) -> str:
        """Decades distribution chart"""
        return "{}"  # Placeholder

    def _yearly_watch_chart(self) -> str:
        """Yearly watch activity chart"""
        temporal = self.stats.get('temporal', {}).get('yearly', [])

        labels = [str(item['year']) for item in temporal]
        data = [item['count'] for item in temporal]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Films Watched',
                    'data': data,
                    'backgroundColor': self.colors[0],
                    'borderRadius': 6
                }]
            },
            'options': {
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'y': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'x': {'grid': {'display': False}}
                }
            }
        })

    def _monthly_activity_chart(self) -> str:
        """Monthly activity chart"""
        temporal = self.stats.get('temporal', {}).get('monthly', [])

        labels = [item['month'] for item in temporal]
        data = [item['count'] for item in temporal]

        return json.dumps({
            'type': 'line',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Films',
                    'data': data,
                    'borderColor': self.colors[2],
                    'backgroundColor': self.colors[2].replace('0.8)', '0.1)'),
                    'fill': True,
                    'tension': 0.4
                }]
            },
            'options': {
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'y': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'x': {'grid': {'display': False}}
                }
            }
        })

    def _genre_distribution_chart(self) -> str:
        """Genre distribution chart"""
        return self._genres_chart()

    def _top_actors_chart(self) -> str:
        """Top actors horizontal bar chart"""
        actor_data = self.stats.get('actors', {}).get('top_by_count', [])[:15]

        labels = [item['name'] for item in actor_data]
        data = [item['count'] for item in actor_data]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Films',
                    'data': data,
                    'backgroundColor': self.colors[1],
                    'borderRadius': 6
                }]
            },
            'options': {
                'indexAxis': 'y',
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'x': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'y': {'grid': {'display': False}}
                }
            }
        })

    def _top_directors_chart(self) -> str:
        """Top directors horizontal bar chart"""
        director_data = self.stats.get('directors', {}).get('top_by_count', [])[:15]

        labels = [item['name'] for item in director_data]
        data = [item['count'] for item in director_data]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Films',
                    'data': data,
                    'backgroundColor': self.colors[5],
                    'borderRadius': 6
                }]
            },
            'options': {
                'indexAxis': 'y',
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'x': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'y': {'grid': {'display': False}}
                }
            }
        })

    def _runtime_distribution_chart(self) -> str:
        """Runtime distribution histogram"""
        runtime_data = self.stats.get('runtime', {}).get('distribution', {})

        labels = list(runtime_data.keys())
        data = list(runtime_data.values())

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Films',
                    'data': data,
                    'backgroundColor': self.colors[4],
                    'borderRadius': 6
                }]
            },
            'options': {
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'y': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'x': {'grid': {'display': False}, 'title': {'display': True, 'text': 'Runtime (minutes)'}}
                }
            }
        })

    def _countries_chart(self) -> str:
        """Top countries chart"""
        country_data = self.stats.get('geography', {}).get('top_countries', [])

        labels = [item['country'] for item in country_data]
        data = [item['count'] for item in country_data]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Films',
                    'data': data,
                    'backgroundColor': self.colors[6],
                    'borderRadius': 6
                }]
            },
            'options': {
                'indexAxis': 'y',
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'x': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'y': {'grid': {'display': False}}
                }
            }
        })

    def _rating_evolution_chart(self) -> str:
        """Rating evolution over time"""
        trends = self.stats.get('rating_trends', {}).get('yearly', [])

        labels = [str(item['year']) for item in trends]
        data = [item['avg_rating'] for item in trends]

        return json.dumps({
            'type': 'line',
            'data': {
                'labels': labels,
                'datasets': [{
                    'label': 'Average Rating',
                    'data': data,
                    'borderColor': self.colors[3],
                    'backgroundColor': self.colors[3].replace('0.8)', '0.1)'),
                    'fill': True,
                    'tension': 0.3
                }]
            },
            'options': {
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {'legend': {'display': False}},
                'scales': {
                    'y': {'min': 0, 'max': 5, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'x': {'grid': {'display': False}}
                }
            }
        })

    def _genres_watched_vs_liked_chart(self) -> str:
        """Genres comparison: watched vs liked - horizontal grouped bar chart"""
        # Get watched genres
        watched_genres = self.stats.get('genres', {}).get('distribution', [])[:8]
        # Get liked genres
        liked_genres = self.stats.get('liked', {}).get('top_genres', [])

        # Create lookup for liked counts
        liked_lookup = {g['genre']: g['count'] for g in liked_genres}

        labels = [g['genre'] for g in watched_genres]
        watched_data = [g['count'] for g in watched_genres]
        liked_data = [liked_lookup.get(genre, 0) for genre in labels]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [
                    {
                        'label': 'Watched',
                        'data': watched_data,
                        'backgroundColor': self.COLORS['cyan'],
                        'borderRadius': 4
                    },
                    {
                        'label': 'Liked',
                        'data': liked_data,
                        'backgroundColor': self.COLORS['liked'],
                        'borderRadius': 4
                    }
                ]
            },
            'options': {
                'indexAxis': 'y',
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {
                    'legend': {
                        'display': True,
                        'position': 'top',
                        'labels': {'padding': 15, 'usePointStyle': True}
                    }
                },
                'scales': {
                    'x': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'y': {'grid': {'display': False}}
                }
            }
        })

    def _actors_watched_vs_liked_chart(self) -> str:
        """Top actors: watched count vs liked count"""
        actors = self.stats.get('actors', {}).get('top_by_count', [])[:10]

        labels = [a['name'] for a in actors]
        watched_data = [a['count'] for a in actors]
        liked_data = [a.get('liked_count', 0) for a in actors]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [
                    {
                        'label': 'Watched',
                        'data': watched_data,
                        'backgroundColor': self.COLORS['purple'],
                        'borderRadius': 4
                    },
                    {
                        'label': 'Liked',
                        'data': liked_data,
                        'backgroundColor': self.COLORS['liked'],
                        'borderRadius': 4
                    }
                ]
            },
            'options': {
                'indexAxis': 'y',
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {
                    'legend': {
                        'display': True,
                        'position': 'top',
                        'labels': {'padding': 15, 'usePointStyle': True}
                    }
                },
                'scales': {
                    'x': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'y': {'grid': {'display': False}}
                }
            }
        })

    def _directors_watched_vs_liked_chart(self) -> str:
        """Top directors: watched count vs liked count"""
        directors = self.stats.get('directors', {}).get('top_by_count', [])[:10]

        labels = [d['name'] for d in directors]
        watched_data = [d['count'] for d in directors]
        liked_data = [d.get('liked_count', 0) for d in directors]

        return json.dumps({
            'type': 'bar',
            'data': {
                'labels': labels,
                'datasets': [
                    {
                        'label': 'Watched',
                        'data': watched_data,
                        'backgroundColor': self.COLORS['orange'],
                        'borderRadius': 4
                    },
                    {
                        'label': 'Liked',
                        'data': liked_data,
                        'backgroundColor': self.COLORS['liked'],
                        'borderRadius': 4
                    }
                ]
            },
            'options': {
                'indexAxis': 'y',
                'responsive': True,
                'maintainAspectRatio': False,
                'plugins': {
                    'legend': {
                        'display': True,
                        'position': 'top',
                        'labels': {'padding': 15, 'usePointStyle': True}
                    }
                },
                'scales': {
                    'x': {'beginAtZero': True, 'grid': {'color': 'rgba(255,255,255,0.05)'}},
                    'y': {'grid': {'display': False}}
                }
            }
        })
