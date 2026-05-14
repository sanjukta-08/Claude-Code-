"""Tavus "Priya" AI video — 60-90s personalised for Tier 1 non-responders.

Trigger: Day 7 of Apollo sequence with zero reply. CTA: book OR register masterclass.
"""
from __future__ import annotations

import os

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

BASE = "https://tavusapi.com/v2"


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=10))
def generate_video(contact_name: str, school_name: str, programme: str, calendly_url: str) -> dict:
    script = (
        f"Hi {contact_name.split()[0]}, this is Priya from LWL. "
        f"I noticed {school_name} would be a great fit for our {programme} programme — "
        "we help students publish research papers with Harvard student mentors and "
        "get into top US universities. "
        f"I'd love a quick 15-minute call. Book a time here: {calendly_url}. "
        "Looking forward to it."
    )
    r = httpx.post(
        f"{BASE}/videos",
        headers={"x-api-key": os.environ["TAVUS_API_KEY"]},
        json={
            "replica_id": os.environ["TAVUS_REPLICA_ID"],
            "script": script,
            "video_name": f"LWL-Priya-{school_name[:30]}",
        },
        timeout=60,
    )
    r.raise_for_status()
    return r.json()
