"""LWL Hub — FastAPI orchestrator.

Routes:
  POST /intel              — run the school intelligence agent (single school)
  POST /registry/upsert    — Anjali · upsert profile + contacts
  POST /registry/lock      — Anjali · programme lock (called by payment webhook)
  GET  /registry/due-for-crosssell — n8n daily cron reads this
  POST /tier/route         — Tier router for a single profile
  POST /codes/issue        — Issue 48hr discount code
  GET  /codes/validate/{code} — Validate code
  POST /webhook/stripe     — Stripe payment webhook
  POST /webhook/razorpay   — Razorpay payment webhook
  POST /masterclass/register — JotForm relay
  POST /masterclass/drop-codes — Post-event 48hr code drop
"""
from __future__ import annotations

import os
from typing import Any

from fastapi import Depends, FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

from conversion.brevo.cross_sell import due_for_crosssell, queue_lookalikes
from conversion.discount_codes.generator import issue_code, validate
from conversion.masterclass.registration import register
from conversion.masterclass.reminders import drop_48hr_codes, kick_bland_recovery
from conversion.payments.razorpay_webhook import router as razorpay_router
from conversion.payments.stripe_webhook import router as stripe_router
from intelligence.claude_research_agent import ClaudeResearchAgent
from intelligence.lcs_scorer import score
from registry.anjali import lock_programme, upsert_school
from routing.tier_router import route as route_profile

from .config import settings

app = FastAPI(title="LWL Hub", version="1.0.0")
app.include_router(stripe_router)
app.include_router(razorpay_router)


def require_internal(x_internal_secret: str = Header(...)):
    if x_internal_secret != settings.hub_internal_secret:
        raise HTTPException(401, "bad internal secret")


@app.get("/health")
def health():
    return {"ok": True}


# ─── Intelligence ─────────────────────────────────────────
class IntelReq(BaseModel):
    school_name: str
    domain: str
    country: str | None = None


@app.post("/intel")
def run_intel(req: IntelReq, _=Depends(require_internal)) -> dict[str, Any]:
    agent = ClaudeResearchAgent()
    claude_profile = agent.research(req.school_name, req.domain, req.country or "unknown")
    profile = {
        "school_name": req.school_name,
        "domain": req.domain,
        **claude_profile,
    }
    s = score(profile)
    profile["lcs_score"] = s.total
    profile["tier"] = s.tier
    profile["cost_estimate_usd"] = 0.07
    return profile


# ─── Registry / Anjali ────────────────────────────────────
@app.post("/registry/upsert")
def registry_upsert(profile: dict[str, Any], _=Depends(require_internal)):
    return upsert_school(profile)


class LockReq(BaseModel):
    school_id: str
    programme: str
    amount_usd: float
    discount_code: str | None = None


@app.post("/registry/lock")
def registry_lock(req: LockReq, _=Depends(require_internal)):
    return lock_programme(req.school_id, req.programme, req.model_dump())


@app.get("/registry/due-for-crosssell")
def registry_crosssell(_=Depends(require_internal)):
    return due_for_crosssell()


@app.post("/registry/queue-lookalikes/{school_id}")
def registry_lookalikes(school_id: str, n: int = 10, _=Depends(require_internal)):
    return {"queued": queue_lookalikes(school_id, n)}


# ─── Routing ──────────────────────────────────────────────
@app.post("/tier/route")
def tier(profile: dict[str, Any], _=Depends(require_internal)):
    return {"decision": route_profile(profile)}


# ─── Discount Codes ───────────────────────────────────────
class IssueCodeReq(BaseModel):
    programme: str
    tier: str = Field(pattern="^(CORE|PUBLISH_PLUS|ELITE)$")
    email: str
    hours: int = 48


@app.post("/codes/issue")
def codes_issue(req: IssueCodeReq, _=Depends(require_internal)):
    return issue_code(req.programme, req.tier, req.email, req.hours)


@app.get("/codes/validate/{code}")
def codes_validate(code: str):
    return validate(code) or {"valid": False, "reason": "not_found"}


# ─── Masterclass ──────────────────────────────────────────
class RegReq(BaseModel):
    email: str
    phone: str | None = None
    programme: str
    masterclass_date: str
    school_id: str | None = None


@app.post("/masterclass/register")
def masterclass_register(req: RegReq):
    return register(req.model_dump())


class DropCodesReq(BaseModel):
    masterclass_date: str
    programme: str


@app.post("/masterclass/drop-codes")
def masterclass_drop(req: DropCodesReq, _=Depends(require_internal)):
    issued = drop_48hr_codes(req.masterclass_date, req.programme)
    return {"issued": len(issued), "codes": [i["code"] for i in issued]}


@app.post("/masterclass/bland-recover")
def masterclass_bland(req: DropCodesReq, _=Depends(require_internal)):
    return {"called": kick_bland_recovery(req.masterclass_date, req.programme)}
