"""48-hour discount codes. Hard expiry. No extensions. Urgency IS the mechanic.

Codes:
  LUTHER48 — Research Fellowship
  EDGE48   — Edge Club
  ONWARD48 — Onward
  JOJO48   — Future Doctors (FDSP)

Pricing tiers:
  Research Fellowship — CORE $1,800→$1,500 · PUBLISH+ $2,400→$1,950 · ELITE $3,500→$2,800
"""
from __future__ import annotations

import os
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

from registry.client import supabase

PROGRAMME_TO_PREFIX = {
    "Research": "LUTHER48",
    "Edge":     "EDGE48",
    "Onward":   "ONWARD48",
    "FDSP":     "JOJO48",
    "Yale":     "YALE48",
    "Harvard":  "HARVARD48",
}

PRICING = {
    "Research": {"CORE": (1800, 1500), "PUBLISH_PLUS": (2400, 1950), "ELITE": (3500, 2800)},
    "Edge":     {"CORE": (1500, 1200), "PUBLISH_PLUS": (2000, 1700), "ELITE": (3000, 2500)},
    "Onward":   {"CORE": (1500, 1200), "PUBLISH_PLUS": (2000, 1700), "ELITE": (3000, 2500)},
    "FDSP":     {"CORE": (1800, 1500), "PUBLISH_PLUS": (2400, 1950), "ELITE": (3500, 2800)},
    "Yale":     {"CORE": (2500, 2100), "PUBLISH_PLUS": (3200, 2700), "ELITE": (4500, 3800)},
    "Harvard":  {"CORE": (2500, 2100), "PUBLISH_PLUS": (3200, 2700), "ELITE": (4500, 3800)},
}


def issue_code(programme: str, tier: str, email: str, hours: int = 48) -> dict[str, Any]:
    if programme not in PROGRAMME_TO_PREFIX:
        raise ValueError(f"Unknown programme: {programme}")
    if tier not in PRICING[programme]:
        raise ValueError(f"Unknown tier: {tier}")

    prefix = PROGRAMME_TO_PREFIX[programme]
    code = f"{prefix}-{secrets.token_hex(3).upper()}"
    list_price, discounted = PRICING[programme][tier]
    discount_pct = round((1 - discounted / list_price) * 100, 2)
    expires = datetime.now(timezone.utc) + timedelta(hours=hours)

    sb = supabase()
    sb.table("discount_codes").insert({
        "code": code,
        "programme": programme,
        "tier": tier,
        "discount_pct": discount_pct,
        "issued_to_email": email,
        "expires_at": expires.isoformat(),
    }).execute()

    return {
        "code": code,
        "programme": programme,
        "tier": tier,
        "list_price": list_price,
        "discounted_price": discounted,
        "discount_pct": discount_pct,
        "expires_at": expires.isoformat(),
        "pay_url": f"{os.environ.get('HUB_BASE_URL','')}/pay/{code}",
    }


def validate(code: str) -> dict[str, Any] | None:
    sb = supabase()
    r = sb.table("discount_codes").select("*").eq("code", code).execute()
    if not r.data:
        return None
    c = r.data[0]
    if c["redeemed_at"]:
        return {"valid": False, "reason": "already_redeemed"}
    if datetime.fromisoformat(c["expires_at"].replace("Z","+00:00")) < datetime.now(timezone.utc):
        return {"valid": False, "reason": "expired"}
    return {"valid": True, **c}


def redeem(code: str, payment_id: str) -> None:
    sb = supabase()
    sb.table("discount_codes").update({
        "redeemed_at": datetime.now(timezone.utc).isoformat(),
        "payment_id": payment_id,
    }).eq("code", code).execute()
