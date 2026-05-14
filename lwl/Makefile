.PHONY: install dev migrate test scrape-nais scrape-ib enrich score route

install:
	python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt

dev:
	uvicorn api.server:app --reload --port $${HUB_PORT:-8000}

migrate:
	psql $${SUPABASE_DB_URL} -f registry/supabase_schema.sql

test:
	pytest -q

scrape-nais:
	python -m scrapers.nais_scraper --states all --out data/raw/nais.csv

scrape-ib:
	python -m scrapers.ib_scraper --regions UAE,IN,KR,SG,LATAM

enrich:
	python -m enrichment.waterfall --in data/raw/nais.csv --out data/enriched.csv

score:
	python -m intelligence.lcs_scorer --in data/enriched.csv

route:
	python -m routing.tier_router --in data/enriched.csv

dedup:
	python -m registry.anjali --check-batch data/enriched.csv

diagram:
	python -m http.server 8080 --directory .
