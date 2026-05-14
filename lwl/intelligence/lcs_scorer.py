"""Lead Conversion Score — 0 to 100.

Apollo org confirmed     +20
Verified email found     +25
IB status YES            +20
Fees > $15k USD/yr       +20
Multiple contacts found  +15

Tier 1: ≥70  → Abhijeet · Slack · 4hr SLA
Tier 2: 40-69 → Apollo auto sequence
Tier 3: <40   → parking · re-score monthly
"""
from __future__ import annotations

import csv
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import typer

app = typer.Typer(add_completion=False)

TIER1 = int(os.environ.get("TIER1_THRESHOLD", 70))
TIER2 = int(os.environ.get("TIER2_THRESHOLD", 40))


@dataclass
class ScoreBreakdown:
    apollo_org: int
    verified_email: int
    ib_yes: int
    high_fees: int
    multi_contacts: int

    @property
    def total(self) -> int:
        return self.apollo_org + self.verified_email + self.ib_yes + self.high_fees + self.multi_contacts

    @property
    def tier(self) -> int:
        if self.total >= TIER1:
            return 1
        if self.total >= TIER2:
            return 2
        return 3


def score(profile: dict[str, Any]) -> ScoreBreakdown:
    apollo_org = 20 if profile.get("apollo_org_id") else 0

    emails = profile.get("hunter_emails", []) or []
    verified_email = 25 if any(
        (e.get("verification", {}).get("status") == "valid") or (e.get("confidence", 0) >= 80)
        for e in emails
    ) else 0
    if not verified_email and profile.get("contacts"):
        if any(c.get("email") for c in profile["contacts"]):
            verified_email = 25

    ib_yes = 20 if profile.get("ib_status") == "YES" else 0
    high_fees = 20 if (profile.get("tuition_usd_per_year") or 0) > 15000 else 0
    multi_contacts = 15 if len(profile.get("contacts", []) or []) >= 2 else 0

    return ScoreBreakdown(apollo_org, verified_email, ib_yes, high_fees, multi_contacts)


@app.command()
def run(
    inp: Path = typer.Option(..., "--in"),
    out: Path = typer.Option(Path("data/scored.csv"), "--out"),
):
    """Re-score enriched CSV (e.g. monthly re-score for Tier 3 parking)."""
    out.parent.mkdir(parents=True, exist_ok=True)
    rows_out = []
    with inp.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            profile = {
                "apollo_org_id": row.get("apollo_org_id") or row.get("apollo_employees"),
                "hunter_emails": [{"value": row.get("contact_email"), "confidence": 90}] if row.get("contact_email") else [],
                "contacts": [{"email": row.get("contact_email")}] if row.get("contact_email") else [],
                "ib_status": row.get("ib_status", "NO"),
                "tuition_usd_per_year": int(row.get("tuition_usd", 0) or 0),
            }
            s = score(profile)
            row["lcs_score"] = s.total
            row["tier"] = s.tier
            rows_out.append(row)
    if not rows_out:
        print("No rows to score.")
        return
    fields = list(rows_out[0].keys())
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows_out)
    t1 = sum(1 for r in rows_out if r["tier"] == 1)
    t2 = sum(1 for r in rows_out if r["tier"] == 2)
    t3 = sum(1 for r in rows_out if r["tier"] == 3)
    print(f"Scored {len(rows_out)} → Tier 1: {t1} · Tier 2: {t2} · Tier 3: {t3}")
    print(f"Out: {out}")


if __name__ == "__main__":
    app()
