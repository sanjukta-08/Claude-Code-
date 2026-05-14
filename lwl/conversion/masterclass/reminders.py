"""Send drip reminders + drop 48hr code at masterclass end."""
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from outreach.whatsapp.bsp_client import WhatsAppBSP
from outreach.whatsapp.bland_recovery import call as bland_call

from .registration import list_no_shows
from ..discount_codes.generator import issue_code


def drop_48hr_codes(masterclass_date: str, programme: str) -> list[dict]:
    """Run within 1hr of masterclass end. Issue + WhatsApp + email."""
    wa = WhatsAppBSP()
    issued = []
    from registry.client import supabase
    sb = supabase()
    regs = sb.table("masterclass_registrations") \
        .select("*") \
        .eq("masterclass_date", masterclass_date) \
        .eq("attended", True) \
        .execute().data
    for r in regs:
        code = issue_code(programme=programme, tier="CORE", email=r["contact_email"])
        if r.get("contact_phone"):
            wa.send_template(r["contact_phone"], "discount_48hr_drop",
                             body_params=[r["contact_email"].split("@")[0], code["code"], "17", code["pay_url"]])
        sb.table("masterclass_registrations").update(
            {"discount_code_issued": code["code"]}
        ).eq("id", r["id"]).execute()
        issued.append(code)
    return issued


def kick_bland_recovery(masterclass_date: str, programme: str) -> int:
    """Within 2hrs of event end — Bland calls no-shows."""
    n = 0
    for r in list_no_shows(masterclass_date):
        if not r.get("contact_phone"):
            continue
        bland_call(r["contact_phone"], r.get("contact_email", "").split("@")[0], programme)
        n += 1
    return n
