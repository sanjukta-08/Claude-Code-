"""Anjali — the central registry administrator.

Rules she enforces (sole administrator — all teams clear with her first):
1. One school, one active programme at a time.
2. No outreach to schools with an active programme lock.
3. Yale Camp eligibility: US ONLY. Triggered server-side too.
4. Cross-sell unlocks at Day 30 / 60 / 90 post-payment.
5. Weekly copy audit: only "Harvard student mentors" — never faculty/endorsement.
"""
from __future__ import annotations

import csv
from pathlib import Path
from typing import Any

import typer

from .client import supabase

app = typer.Typer(add_completion=False)


def upsert_school(profile: dict[str, Any]) -> dict[str, Any]:
    sb = supabase()
    row = {
        "school_name": profile["school_name"],
        "domain": profile["domain"],
        "country": profile.get("country"),
        "country_iso2": profile.get("country_iso2"),
        "region": profile.get("region"),
        "curriculum": profile.get("curriculum"),
        "ib_status": profile.get("ib_status"),
        "grades_served": profile.get("grades_served"),
        "est_enrollment": profile.get("est_enrollment"),
        "tuition_usd_per_year": profile.get("tuition_usd_per_year"),
        "is_yale_camp_eligible": profile.get("is_yale_camp_eligible", False),
        "apollo_org_id": profile.get("apollo_org_id"),
        "org_size": profile.get("org_size"),
        "owner": profile.get("owner"),
        "lcs_score": profile.get("lcs_score"),
        "tier": profile.get("tier"),
        "profile_json": profile,
    }
    res = sb.table("schools").upsert(row, on_conflict="domain").execute()
    school_id = res.data[0]["id"]

    for c in profile.get("contacts", []) or []:
        if not c.get("email"):
            continue
        sb.table("contacts").upsert({
            "school_id": school_id,
            "name": c.get("name"),
            "title": c.get("title"),
            "email": c["email"],
            "linkedin": c.get("linkedin"),
            "phone": c.get("phone"),
        }, on_conflict="email").execute()

    return res.data[0]


def has_active_lock(school_id: str) -> bool:
    sb = supabase()
    r = sb.table("programme_locks").select("id").eq("school_id", school_id).eq("status", "active").execute()
    return len(r.data) > 0


def lock_programme(school_id: str, programme: str, payment: dict[str, Any]) -> dict[str, Any]:
    sb = supabase()
    if has_active_lock(school_id):
        raise ValueError(f"School {school_id} already has an active programme lock — Anjali rejects.")
    return sb.table("programme_locks").insert({
        "school_id": school_id,
        "programme": programme,
        "status": "active",
        "paid_amount_usd": payment.get("amount_usd"),
        "discount_code": payment.get("discount_code"),
    }).execute().data[0]


def dedupe_batch(csv_path: Path) -> tuple[list[dict], list[dict]]:
    """Run before every outreach batch. Returns (clear_to_outreach, skip_locked)."""
    sb = supabase()
    clear, locked = [], []
    with csv_path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            domain = (row.get("domain") or "").lower()
            if not domain:
                continue
            res = sb.table("schools").select("id").eq("domain", domain).execute()
            if not res.data:
                clear.append(row)
                continue
            school_id = res.data[0]["id"]
            if has_active_lock(school_id):
                locked.append(row)
            else:
                clear.append(row)
    return clear, locked


@app.command("upsert")
def cli_upsert(json_file: Path):
    import json
    profile = json.loads(json_file.read_text())
    out = upsert_school(profile)
    print(f"Upserted school {out['id']} ({out['school_name']})")


@app.command("check-batch")
def cli_dedupe(csv_path: Path):
    clear, locked = dedupe_batch(csv_path)
    print(f"Clear to outreach: {len(clear)}")
    print(f"Locked (skipped):  {len(locked)}")
    if locked:
        print("First 5 locked:", [r.get("school_name") or r.get("domain") for r in locked[:5]])


@app.command("audit-copy")
def cli_audit(file_or_dir: Path):
    """Weekly copy audit — flag anything mentioning Harvard faculty/endorsement."""
    sb = supabase()
    forbidden = ["harvard faculty", "harvard endorses", "endorsed by harvard", "harvard professor"]
    allowed = "harvard student mentors"
    targets = [file_or_dir] if file_or_dir.is_file() else list(file_or_dir.rglob("*.md")) + list(file_or_dir.rglob("*.html")) + list(file_or_dir.rglob("*.txt"))
    flagged = 0
    for p in targets:
        text = p.read_text(errors="ignore").lower()
        for needle in forbidden:
            if needle in text:
                sb.table("copy_audit").insert({
                    "artifact_path": str(p), "snippet": needle, "contains_violation": True
                }).execute()
                print(f"  ✗ {p}: {needle!r}")
                flagged += 1
        if "harvard" in text and allowed not in text:
            print(f"  ? {p}: mentions 'Harvard' without {allowed!r} — manual review")
    print(f"\nDone. {flagged} violations logged. Anjali reviews weekly.")


if __name__ == "__main__":
    app()
