from __future__ import annotations

import os
from typing import Any

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential


class HunterClient:
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or os.environ["HUNTER_API_KEY"]
        self._client = httpx.Client(timeout=30)

    @retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
    def domain_search(self, domain: str, limit: int = 10) -> list[dict[str, Any]]:
        r = self._client.get(
            "https://api.hunter.io/v2/domain-search",
            params={"domain": domain, "api_key": self.api_key, "limit": limit},
        )
        r.raise_for_status()
        return r.json().get("data", {}).get("emails", [])

    @retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
    def email_verify(self, email: str) -> dict[str, Any]:
        r = self._client.get(
            "https://api.hunter.io/v2/email-verifier",
            params={"email": email, "api_key": self.api_key},
        )
        r.raise_for_status()
        return r.json().get("data", {})
