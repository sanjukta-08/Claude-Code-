from __future__ import annotations

import os
from typing import Any

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

GRAPH = "https://graph.facebook.com/v18.0"


class WhatsAppBSP:
    def __init__(self, token: str | None = None, phone_id: str | None = None):
        self.token = token or os.environ["WHATSAPP_BSP_TOKEN"]
        self.phone_id = phone_id or os.environ["WHATSAPP_BSP_PHONE_ID"]
        self._client = httpx.Client(
            headers={"Authorization": f"Bearer {self.token}", "Content-Type": "application/json"},
            timeout=30,
        )

    @retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
    def send_template(self, to: str, template: str, lang: str = "en", body_params: list[str] | None = None) -> dict[str, Any]:
        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "template",
            "template": {"name": template, "language": {"code": lang}},
        }
        if body_params:
            payload["template"]["components"] = [{
                "type": "body",
                "parameters": [{"type": "text", "text": p} for p in body_params],
            }]
        r = self._client.post(f"{GRAPH}/{self.phone_id}/messages", json=payload)
        r.raise_for_status()
        return r.json()

    def send_text(self, to: str, text: str) -> dict[str, Any]:
        r = self._client.post(
            f"{GRAPH}/{self.phone_id}/messages",
            json={"messaging_product": "whatsapp", "to": to, "text": {"body": text}},
        )
        r.raise_for_status()
        return r.json()
