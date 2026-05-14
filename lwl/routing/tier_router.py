"""Tier router — fan out to Slack/Apollo/Park based on LCS."""
from __future__ import annotations

import csv
import os
from pathlib import Path

import typer

from .slack_alert import tier1_alert

app = typer.Typer(add_completion=False)

TIER1 = int(os.environ.get("TIER1_THRESHOLD", 70))
TIER2 = int(os.environ.get("TIER2_THRESHOLD", 40))


def route(profile: dict) -> str:
    score = profile.get("lcs_score", 0)
    if score >= TIER1:
        tier1_alert(profile)
        return "tier1_slack_abhijeet"
    if score >= TIER2:
        # In production, hit POST /apollo/add-to-sequence on the hub
        return "tier2_apollo_sequence"
    return "tier3_parking"


@app.command()
def run(inp: Path = typer.Option(..., "--in")):
    counts = {"tier1_slack_abhijeet": 0, "tier2_apollo_sequence": 0, "tier3_parking": 0}
    with inp.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            row["lcs_score"] = int(row.get("lcs_score") or 0)
            row["contacts"] = [{
                "name": row.get("contact_name"), "title": row.get("contact_title"),
                "email": row.get("contact_email"), "linkedin": row.get("contact_linkedin"),
            }]
            counts[route(row)] += 1
    for k, v in counts.items():
        print(f"  {k:30} {v}")


if __name__ == "__main__":
    app()
