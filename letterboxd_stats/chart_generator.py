"""
Generate Chart.js configuration objects for visualizations
"""
import json
from typing import Dict, List
from . import config


class ChartGenerator:
    """Generate Chart.js configurations for various chart types"""

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
