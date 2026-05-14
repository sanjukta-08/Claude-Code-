from __future__ import annotations

import os

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError


def _client() -> WebClient:
    return WebClient(token=os.environ["SLACK_BOT_TOKEN"])


def tier1_alert(profile: dict) -> None:
    """4-hour SLA Slack DM to Abhijeet for LCS ≥ 70."""
    user_id = os.environ["SLACK_TIER1_ABHIJEET_USER_ID"]
    c = (profile.get("contacts") or [{}])[0]
    text = (
        f":zap: *TIER 1 LEAD — 4hr SLA*\n"
        f"*{profile['school_name']}* ({profile.get('region','?')}) · LCS *{profile['lcs_score']}*\n"
        f"Contact: {c.get('name','?')} · {c.get('title','?')}\n"
        f"Email: `{c.get('email','—')}` · LinkedIn: {c.get('linkedin','—')}\n"
        f"Best fit: *{profile.get('best_lwl_programme','—')}* · Tuition: ${profile.get('tuition_usd_per_year','—')}\n"
        f"Urgency: {', '.join(profile.get('urgency_signals') or []) or '—'}"
    )
    try:
        _client().chat_postMessage(channel=user_id, text=text)
    except SlackApiError as e:
        print(f"Slack alert failed: {e.response['error']}")


def sales_win(payment: dict) -> None:
    try:
        _client().chat_postMessage(
            channel="#sales-wins",
            text=(
                f":moneybag: *PAID* — {payment.get('programme')} — "
                f"${payment.get('amount_usd')} from {payment.get('customer_email')}\n"
                f"Code: {payment.get('discount_code','—')}"
            ),
        )
    except SlackApiError as e:
        print(f"Slack win post failed: {e.response['error']}")
