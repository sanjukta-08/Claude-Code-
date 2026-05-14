"""Brevo cross-sell engine. Day 30/60/90 post-payment.

Day 30: complementary programme suggestion
Day 60: tier upgrade (CORE → PUBLISH_PLUS + $450)
Day 90: referral ask + ELITE upgrade offer

Plus: lookalike. Each paying school → 10 similar schools queued for outreach.
"""
from __future__ import annotations

import os

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from registry.client import supabase

BREVO_BASE = "https://api.brevo.com/v3"

# Template IDs created in Brevo UI — set yours here or read from settings table
TEMPLATE_D30 = 31
TEMPLATE_D60 = 32
TEMPLATE_D90 = 33

CROSSSELL_SUGGESTIONS = {
    "FDSP":     "Research Fellowship",
    "Edge":     "Onward Portfolio",
    "Research": "FDSP (Future Doctors)",
    "Onward":   "Yale Camp (US-eligible students only)",
    "Yale":     "Research Fellowship",
    "Harvard":  "Research Fellowship",
}


def _client():
    return httpx.Client(
        base_url=BREVO_BASE,
        headers={"api-key": os.environ["BREVO_API_KEY"], "content-type": "application/json"},
        timeout=30,
    )


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=10))
def send_template(template_id: int, email: str, params: dict) -> dict:
    with _client() as c:
        r = c.post("/smtp/email", json={"templateId": template_id, "to": [{"email": email}], "params": params})
        r.raise_for_status()
        return r.json()


def due_for_crosssell() -> list[dict]:
    return supabase().from_("v_crosssell_due").select("*").execute().data


def run_daily() -> dict[str, int]:
    counts = {"d30": 0, "d60": 0, "d90": 0}
    for row in due_for_crosssell():
        m = row["milestone"]
        params = {
            "PROGRAMME": row["programme"],
            "NEXT_SUGGESTION": CROSSSELL_SUGGESTIONS.get(row["programme"], "another LWL programme"),
        }
        tid = {"d30": TEMPLATE_D30, "d60": TEMPLATE_D60, "d90": TEMPLATE_D90}[m]
        send_template(tid, row["email"], params)
        counts[m] += 1
    return counts


def queue_lookalikes(school_id: str, n: int = 10) -> list[str]:
    """Each paying school → 10 lookalikes queued in low-priority parking for next batch."""
    sb = supabase()
    seed = sb.table("schools").select("*").eq("id", school_id).execute().data[0]
    similar = sb.table("schools") \
        .select("id,school_name,domain") \
        .eq("region", seed.get("region")) \
        .eq("curriculum", seed.get("curriculum")) \
        .neq("id", school_id) \
        .limit(n).execute().data
    return [s["id"] for s in similar]
