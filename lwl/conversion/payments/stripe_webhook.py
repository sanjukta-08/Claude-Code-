"""Stripe webhook → Anjali lock → Brevo enrol → Slack win."""
from __future__ import annotations

import os
from typing import Any

import stripe
from fastapi import APIRouter, Header, HTTPException, Request

from registry.anjali import lock_programme, upsert_school
from registry.client import supabase
from routing.slack_alert import sales_win

from ..discount_codes.generator import redeem, validate

router = APIRouter(prefix="/webhook/stripe", tags=["payments"])
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")


@router.post("")
async def stripe_webhook(request: Request, stripe_signature: str = Header(...)):
    payload = await request.body()
    secret = os.environ["STRIPE_WEBHOOK_SECRET"]
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, secret)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        raise HTTPException(400, f"bad signature: {e}")

    if event["type"] != "checkout.session.completed":
        return {"ignored": event["type"]}

    obj = event["data"]["object"]
    metadata = obj.get("metadata") or {}
    code = metadata.get("discount_code")
    if code:
        v = validate(code)
        if not v or not v.get("valid"):
            raise HTTPException(400, f"invalid code: {code} ({v and v.get('reason')})")

    payment = {
        "provider": "stripe",
        "provider_event_id": event["id"],
        "customer_email": (obj.get("customer_details") or {}).get("email"),
        "amount_usd": (obj.get("amount_total") or 0) / 100,
        "currency": (obj.get("currency") or "usd").upper(),
        "programme": metadata.get("programme"),
        "tier_purchased": metadata.get("tier"),
        "discount_code": code,
        "school_id": metadata.get("school_id"),
    }
    res = supabase().table("payments").insert(payment).execute()
    payment_id = res.data[0]["id"]

    if code:
        redeem(code, payment_id)

    if payment["school_id"] and payment["programme"]:
        try:
            lock_programme(payment["school_id"], payment["programme"], payment)
        except ValueError as e:
            print(f"[Anjali] {e}")

    sales_win(payment)
    return {"ok": True, "payment_id": payment_id}
