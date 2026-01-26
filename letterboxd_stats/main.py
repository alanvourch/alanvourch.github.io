"""
Main orchestration script for Letterboxd Stats
"""
import json
import sys
from . import config
from .data_loader import LetterboxdDataLoader
from .tmdb_enricher import TMDBEnricher
from .stats_calculator import StatsCalculator
from .chart_generator import ChartGenerator
from .html_generator import HTMLGenerator


def main():
    """Main execution function"""
    print("="*60)
    print("LETTERBOXD STATS v4.0 - Dashboard Generator")
    print("="*60)
    print()

    try:
        # Validate configuration
        config.validate_config()

        # Step 1: Load Letterboxd data
        print("STEP 1: Loading Letterboxd Data")
        print("-"*60)
        loader = LetterboxdDataLoader()
        lb_data = loader.load_all()
        print()

        # Step 2: Enrich with TMDB data
        print("STEP 2: Enriching with TMDB Metadata")
        print("-"*60)
        enricher = TMDBEnricher()
        unique_films = loader.get_unique_films()
        tmdb_data = enricher.enrich_films(unique_films)
        print()

        # Step 3: Calculate statistics
        print("STEP 3: Calculating Statistics")
        print("-"*60)
        calculator = StatsCalculator(lb_data, tmdb_data)
        stats = calculator.calculate_all()
        print()

        # Step 4: Generate charts
        print("STEP 4: Generating Charts")
        print("-"*60)
        chart_gen = ChartGenerator(stats)
        charts = chart_gen.generate_all_charts()
        print("[OK] Chart configurations generated")
        print()

        # Step 5: Generate HTML
        print("STEP 5: Generating HTML Dashboard")
        print("-"*60)
        html_gen = HTMLGenerator(stats, charts)
        html = html_gen.generate()

        # Write HTML file
        with open(config.OUTPUT_HTML, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"[OK] HTML dashboard saved to: {config.OUTPUT_HTML}")

        # Step 6: Export JSON data (for web app use)
        print("STEP 6: Exporting JSON Data")
        print("-"*60)
        with open(config.OUTPUT_JSON, 'w', encoding='utf-8') as f:
            json.dump(stats, f, indent=2, ensure_ascii=False)
        print(f"[OK] JSON data saved to: {config.OUTPUT_JSON}")
        print()

        # Summary
        print("="*60)
        print("DASHBOARD GENERATION COMPLETE!")
        print("="*60)
        print(f"\n Open {config.OUTPUT_HTML} in your browser to view the dashboard.\n")

        return 0

    except ValueError as e:
        print(f"\n[ERROR] Configuration Error:")
        print(str(e))
        print()
        return 1

    except FileNotFoundError as e:
        print(f"\n[ERROR] File Not Found:")
        print(str(e))
        print()
        return 1

    except Exception as e:
        print(f"\n[ERROR] Unexpected Error:")
        print(str(e))
        import traceback
        traceback.print_exc()
        print()
        return 1


if __name__ == '__main__':
    sys.exit(main())
