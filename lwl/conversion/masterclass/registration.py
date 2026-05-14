"""Masterclass registration → Brevo + WhatsApp drip + 48hr code on event end."""
from __future__ import annotations

from datetime import datetime
from typing import Any

from registry.client import supabase


def register(payload: dict[str, Any]) -> dict[str, Any]:
    """Called from JotForm → n8n webhook → here."""
    sb = supabase()
    row = {
        "school_id": payload.get("school_id"),
        "contact_email": payload["email"],
        "contact_phone": payload.get("phone"),
        "programme": payload.get("programme"),
        "masterclass_date": payload.get("masterclass_date"),
    }
    return sb.table("masterclass_registrations").insert(row).execute().data[0]


def mark_attendance(email: str, attended: bool, masterclass_date: str) -> None:
    sb = supabase()
    sb.table("masterclass_registrations") \
        .update({"attended": attended}) \
        .eq("contact_email", email) \
        .eq("masterclass_date", masterclass_date) \
        .execute()


def list_no_shows(masterclass_date: str) -> list[dict]:
    sb = supabase()
    r = sb.table("masterclass_registrations") \
        .select("*") \
        .eq("masterclass_date", masterclass_date) \
        .eq("attended", False) \
        .execute()
    return r.data
