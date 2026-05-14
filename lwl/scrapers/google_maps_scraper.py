"""Google Maps + LinkedIn discovery via Apify — ~$0.50 per 1,000 results."""
from __future__ import annotations

import csv
import os
import time
from pathlib import Path

import httpx
import typer
from tenacity import retry, stop_after_attempt, wait_exponential

app = typer.Typer(add_completion=False)
ACTOR = "compass~crawler-google-places"


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=16))
def _run(query: str, max_results: int, token: str) -> str:
    r = httpx.post(
        f"https://api.apify.com/v2/acts/{ACTOR}/runs?token={token}",
        json={"searchStringsArray": [query], "maxCrawledPlacesPerSearch": max_results, "language": "en"},
        timeout=60,
    )
    r.raise_for_status()
    return r.json()["data"]["defaultDatasetId"]


@app.command()
def search(
    query: str = typer.Argument(..., help='e.g. "international schools Dubai"'),
    max_results: int = typer.Option(500),
    out: Path = typer.Option(Path("data/raw/gmaps.csv")),
    wait_s: int = typer.Option(60),
):
    token = os.environ["APIFY_TOKEN"]
    dataset = _run(query, max_results, token)
    print(f"Apify run started: {dataset}. Waiting {wait_s}s…")
    time.sleep(wait_s)

    items = httpx.get(
        f"https://api.apify.com/v2/datasets/{dataset}/items",
        params={"token": token, "format": "json"},
        timeout=120,
    ).json()

    out.parent.mkdir(parents=True, exist_ok=True)
    cols = ["title", "phone", "website", "address", "totalScore", "categoryName"]
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        for p in items:
            w.writerow({k: p.get(k, "") for k in cols})
    print(f"GMaps: {len(items)} → {out}")


if __name__ == "__main__":
    app()
