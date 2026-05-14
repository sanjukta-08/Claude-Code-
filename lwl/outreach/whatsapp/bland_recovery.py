"""Bland.ai AI voice call — recovery for masterclass no-shows.

Triggered within 2hrs of event end. Goal: book a 1:1 OR re-offer the 48hr code.
"""
from __future__ import annotations

import os
from typing import Any

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

BASE = "https://api.bland.ai"


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=10))
def call(phone: str, name: str, programme: str, discount_code: str | None = None) -> dict[str, Any]:
    task = (
        f"You are calling {name}, a parent who registered for the {programme} masterclass but didn't attend. "
        "Be warm, brief, and helpful. Ask if they're still interested. "
        "If yes, offer to book a 1:1 with our team. "
    )
    if discount_code:
        task += (
            f"If they're hesitating on price, remind them code {discount_code} is still valid for 48hrs and "
            "gives them a significant discount. Do NOT extend the deadline — urgency IS the mechanic."
        )
    task += " End the call within 3 minutes. Do not be pushy."

    r = httpx.post(
        f"{BASE}/v1/calls",
        headers={"Authorization": os.environ["BLAND_AI_API_KEY"]},
        json={
            "phone_number": phone,
            "task": task,
            "voice": "alexa",
            "first_sentence": f"Hi, is this {name.split()[0] if name else 'there'}?",
            "wait_for_greeting": True,
            "max_duration": 5,
        },
        timeout=30,
    )
    r.raise_for_status()
    return r.json()
