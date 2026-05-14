"""NAIS — 1,688 US private schools, state-by-state.

Yale Camp eligibility rule: US ONLY. Middle East fully excluded — never enrol
a non-US school in Yale Camp regardless of how good the LCS score is.
"""
from __future__ import annotations

import csv
import sys
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable

import httpx
import typer
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential

app = typer.Typer(add_completion=False)

NAIS_SEARCH_URL = "https://www.nais.org/learn/find-schools/"
US_STATES = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
    "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
    "VA","WA","WV","WI","WY","DC",
]

# Region buckets per project ownership (Ayush vs Aditya)
EAST_NE = {"NY","NJ","CT","MA","RI","NH","VT","ME","PA","MD","DE","DC","VA"}


@dataclass
class NAISchool:
    name: str
    city: str
    state: str
    url: str
    phone: str | None
    grades: str | None
    enrollment: int | None
    region_bucket: str  # "EAST_NE" or "SOUTH_WEST"
    owner: str          # "Ayush" or "Aditya"
    yale_camp_eligible: bool = True  # all NAIS = US = eligible


def bucket(state: str) -> tuple[str, str]:
    if state in EAST_NE:
        return "EAST_NE", "Ayush"
    return "SOUTH_WEST", "Aditya"


@retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
def _fetch(client: httpx.Client, state: str, page: int) -> str:
    r = client.get(NAIS_SEARCH_URL, params={"state": state, "page": page}, timeout=30)
    r.raise_for_status()
    return r.text


def parse(html: str, state: str) -> Iterable[NAISchool]:
    soup = BeautifulSoup(html, "lxml")
    for card in soup.select("li.school-result, .school-card, article.school"):
        name_el = card.select_one(".school-name, h3, a")
        url_el = card.select_one("a[href]")
        city_el = card.select_one(".city, .location")
        phone_el = card.select_one(".phone")
        grades_el = card.select_one(".grades")
        enroll_el = card.select_one(".enrollment")
        if not name_el:
            continue
        b, owner = bucket(state)
        try:
            enrollment = int((enroll_el.get_text(strip=True) if enroll_el else "0").replace(",", ""))
        except ValueError:
            enrollment = None
        yield NAISchool(
            name=name_el.get_text(strip=True),
            city=city_el.get_text(strip=True) if city_el else "",
            state=state,
            url=url_el["href"] if url_el else "",
            phone=phone_el.get_text(strip=True) if phone_el else None,
            grades=grades_el.get_text(strip=True) if grades_el else None,
            enrollment=enrollment,
            region_bucket=b,
            owner=owner,
        )


@app.command()
def run(
    states: str = typer.Option("all", help="Comma list e.g. NY,NJ,CA — or 'all'"),
    out: Path = typer.Option(Path("data/raw/nais.csv")),
    delay: float = typer.Option(1.5, help="Polite delay between requests (s)"),
    max_pages: int = typer.Option(10),
):
    """Scrape NAIS member directory. CSV → feed Clay waterfall next."""
    target_states = US_STATES if states == "all" else [s.strip().upper() for s in states.split(",")]
    out.parent.mkdir(parents=True, exist_ok=True)

    fields = list(NAISchool.__dataclass_fields__.keys())
    total = 0
    with out.open("w", newline="", encoding="utf-8") as f, httpx.Client(
        headers={"User-Agent": "LWL-Research/1.0 (contact: research@lwl.org)"}
    ) as client:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for state in target_states:
            for page in range(1, max_pages + 1):
                try:
                    html = _fetch(client, state, page)
                except httpx.HTTPError as e:
                    print(f"[{state} p{page}] failed: {e}", file=sys.stderr)
                    break
                rows = list(parse(html, state))
                if not rows:
                    break
                for r in rows:
                    w.writerow(asdict(r))
                    total += 1
                print(f"[{state} p{page}] +{len(rows)} (total {total})")
                time.sleep(delay)

    print(f"\nDone. {total} schools → {out}")


if __name__ == "__main__":
    app()
