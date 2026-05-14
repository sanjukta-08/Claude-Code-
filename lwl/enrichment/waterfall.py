"""Clay-style waterfall: Apollo → LinkedIn → Hunter → Clearbit.

First non-null email wins. `source` column tracks which provider hit.
"""
from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator

import typer

from .apollo_client import ApolloClient
from .clearbit_client import ClearbitClient
from .hunter_client import HunterClient

app = typer.Typer(add_completion=False)

TITLES = ["Principal", "Head of School", "Admissions Director", "MUN Coordinator", "Director of Studies"]


@dataclass
class Enriched:
    school_name: str
    domain: str
    contact_name: str
    contact_title: str
    contact_email: str
    contact_linkedin: str
    org_size: int | None
    revenue_estimate: str
    source: str  # apollo | hunter | clearbit


def _domain_of(url: str) -> str:
    return url.replace("https://", "").replace("http://", "").split("/")[0].strip()


def enrich_one(name: str, url: str, apollo: ApolloClient, hunter: HunterClient, clearbit: ClearbitClient) -> Enriched:
    domain = _domain_of(url)
    org = apollo.org_enrich(domain)
    people = apollo.people_search(domain, TITLES)

    contact = people[0] if people else {}
    email = contact.get("email")
    source = "apollo" if email else None

    if not email:
        hunter_emails = hunter.domain_search(domain)
        if hunter_emails:
            top = hunter_emails[0]
            email = top.get("value")
            contact = {"name": f"{top.get('first_name','')} {top.get('last_name','')}".strip(),
                       "title": top.get("position", ""), "linkedin_url": top.get("linkedin", "")}
            source = "hunter"

    cb = {}
    if not org:
        cb = clearbit.company(domain)
        source = source or "clearbit"

    return Enriched(
        school_name=name,
        domain=domain,
        contact_name=contact.get("name", ""),
        contact_title=contact.get("title", ""),
        contact_email=email or "",
        contact_linkedin=contact.get("linkedin_url", ""),
        org_size=org.get("estimated_num_employees") or cb.get("metrics", {}).get("employees"),
        revenue_estimate=str(org.get("annual_revenue") or cb.get("metrics", {}).get("estimatedAnnualRevenue") or ""),
        source=source or "none",
    )


def _read(path: Path) -> Iterator[tuple[str, str]]:
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            name = row.get("name") or row.get("school_name") or row.get("title")
            url = row.get("url") or row.get("website") or ""
            if name and url:
                yield name, url


@app.command()
def run(
    inp: Path = typer.Option(..., "--in"),
    out: Path = typer.Option(..., "--out"),
):
    apollo = ApolloClient()
    hunter = HunterClient()
    clearbit = ClearbitClient()
    out.parent.mkdir(parents=True, exist_ok=True)

    fields = list(Enriched.__dataclass_fields__.keys())
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for name, url in _read(inp):
            try:
                e = enrich_one(name, url, apollo, hunter, clearbit)
                w.writerow(e.__dict__)
                print(f"  ✓ {name} ({e.source})")
            except Exception as exc:
                print(f"  ✗ {name}: {exc}")
    print(f"Done → {out}")


if __name__ == "__main__":
    app()
