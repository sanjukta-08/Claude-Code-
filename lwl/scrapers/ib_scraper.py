"""IB World — 5,000+ schools across 159 countries via Apify."""
from __future__ import annotations

import os
import time
import csv
from pathlib import Path

import httpx
import typer
from tenacity import retry, stop_after_attempt, wait_exponential

app = typer.Typer(add_completion=False)

APIFY_RUN = "https://api.apify.com/v2/acts/apify~web-scraper/runs"

PRIORITY_REGIONS = {
    "UAE": ["United Arab Emirates"],
    "IN":  ["India"],
    "KR":  ["Korea, South", "South Korea"],
    "SG":  ["Singapore"],
    "LATAM": ["Brazil", "Mexico", "Argentina", "Colombia", "Chile", "Peru"],
}


@retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
def _start_run(token: str) -> str:
    body = {
        "startUrls": [{"url": "https://www.ibo.org/programmes/find-an-ib-school/"}],
        "pageFunction": (
            "async function pageFunction({ request, $ }) {"
            " const out = [];"
            " $('.school-result').each((i, el) => {"
            "   out.push({"
            "     name: $(el).find('.name').text().trim(),"
            "     country: $(el).find('.country').text().trim(),"
            "     programmes: $(el).find('.programmes').text().trim(),"
            "     url: $(el).find('a').attr('href')"
            "   });"
            " });"
            " return out;"
            "}"
        ),
        "maxRequestsPerCrawl": 5000,
        "maxConcurrency": 5,
    }
    r = httpx.post(f"{APIFY_RUN}?token={token}", json=body, timeout=60)
    r.raise_for_status()
    return r.json()["data"]["defaultDatasetId"]


@retry(stop=stop_after_attempt(8), wait=wait_exponential(multiplier=2, min=2, max=16))
def _fetch_dataset(dataset_id: str, token: str) -> list[dict]:
    r = httpx.get(
        f"https://api.apify.com/v2/datasets/{dataset_id}/items",
        params={"token": token, "format": "json"},
        timeout=120,
    )
    r.raise_for_status()
    return r.json()


@app.command()
def run(
    regions: str = typer.Option("UAE,IN,KR,SG,LATAM"),
    out: Path = typer.Option(Path("data/raw/ib.csv")),
    wait_s: int = typer.Option(90, help="Seconds to wait for Apify run before fetch"),
):
    token = os.environ["APIFY_TOKEN"]
    target = set()
    for code in (r.strip().upper() for r in regions.split(",")):
        target.update(PRIORITY_REGIONS.get(code, []))

    print(f"Starting Apify run for IB World…")
    dataset = _start_run(token)
    print(f"Dataset {dataset}. Waiting {wait_s}s…")
    time.sleep(wait_s)

    items = _fetch_dataset(dataset, token)
    print(f"Fetched {len(items)} raw items")

    out.parent.mkdir(parents=True, exist_ok=True)
    kept = 0
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["name", "country", "programmes", "url", "priority"])
        w.writeheader()
        for s in items:
            if not s.get("name"):
                continue
            priority = s.get("country") in target if target else False
            w.writerow({**s, "priority": priority})
            kept += 1
    print(f"Done. {kept} schools → {out}")


if __name__ == "__main__":
    app()
