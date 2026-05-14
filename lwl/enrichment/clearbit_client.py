from __future__ import annotations

import os
from typing import Any

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential


class ClearbitClient:
    """Fallback for org size + revenue when Apollo misses."""

    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or os.environ.get("CLEARBIT_API_KEY", "")
        self._client = httpx.Client(
            auth=(self.api_key, ""),
            timeout=30,
        )

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=10))
    def company(self, domain: str) -> dict[str, Any]:
        if not self.api_key:
            return {}
        r = self._client.get(
            "https://company.clearbit.com/v2/companies/find",
            params={"domain": domain},
        )
        if r.status_code in (404, 422):
            return {}
        r.raise_for_status()
        return r.json()
