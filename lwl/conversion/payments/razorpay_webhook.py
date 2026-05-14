"""Razorpay webhook → same path as Stripe."""
from __future__ import annotations

import hmac
import hashlib
import json
import os

from fastapi import APIRouter, Header, HTTPException, Request

from registry.anjali import lock_programme
from registry.client import supabase
from routing.slack_alert import sales_win

from ..discount_codes.generator import redeem, validate

router = APIRouter(prefix="/webhook/razorpay", tags=["payments"])


def _verify(payload: bytes, signature: str) -> bool:
    secret = os.environ["RAZORPAY_WEBHOOK_SECRET"].encode()
    expected = hmac.new(secret, payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


@router.post("")
async def razorpay_webhook(request: Request, x_razorpay_signature: str = Header(...)):
    payload = await request.body()
    if not _verify(payload, x_razorpay_signature):
        raise HTTPException(400, "bad signature")

    event = json.loads(payload)
    if event.get("event") != "payment.captured":
        return {"ignored": event.get("event")}

    p = event["payload"]["payment"]["entity"]
    notes = p.get("notes") or {}
    code = notes.get("discount_code")
    if code:
        v = validate(code)
        if not v or not v.get("valid"):
            raise HTTPException(400, f"invalid code: {code}")

    payment = {
        "provider": "razorpay",
        "provider_event_id": p["id"],
        "customer_email": p.get("email"),
        "amount_usd": p["amount"] / 100,  # paise → INR; convert externally for true USD
        "currency": p.get("currency", "INR"),
        "programme": notes.get("programme"),
        "tier_purchased": notes.get("tier"),
        "discount_code": code,
        "school_id": notes.get("school_id"),
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
