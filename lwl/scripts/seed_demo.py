"""Seed demo school for end-to-end smoke test (after schema is migrated)."""
from __future__ import annotations

from registry.anjali import upsert_school

DEMO = {
    "school_name": "Dubai International Academy",
    "domain": "dia.ae",
    "country": "United Arab Emirates",
    "country_iso2": "AE",
    "region": "UAE",
    "curriculum": "IB",
    "ib_status": "YES",
    "grades_served": "PreK-12",
    "est_enrollment": 1800,
    "tuition_usd_per_year": 22000,
    "is_yale_camp_eligible": False,
    "owner": "Nishant",
    "lcs_score": 85,
    "tier": 1,
    "contacts": [
        {"name": "Aisha Demo", "title": "Head of School", "email": "aisha.demo@dia.ae",
         "linkedin": "https://linkedin.com/in/demo", "phone": "+97150...."},
    ],
}

if __name__ == "__main__":
    out = upsert_school(DEMO)
    print(f"Seeded: {out}")
