from __future__ import annotations

import os
import time
from typing import Any

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

BASE = "https://api.apollo.io/v1"


class ApolloClient:
    def __init__(self, api_key: str | None = None, daily_reveal_limit: int = 50):
        self.api_key = api_key or os.environ["APOLLO_API_KEY"]
        self.daily_reveal_limit = daily_reveal_limit
        self._reveals_today = 0
        self._client = httpx.Client(
            headers={"x-api-key": self.api_key, "content-type": "application/json"},
            timeout=30,
        )

    @retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
    def org_enrich(self, domain: str) -> dict[str, Any]:
        r = self._client.post(f"{BASE}/organizations/enrich", json={"domain": domain})
        r.raise_for_status()
        return r.json().get("organization") or {}

    @retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=2, min=2, max=16))
    def people_search(self, domain: str, titles: list[str], per_page: int = 5) -> list[dict]:
        r = self._client.post(
            f"{BASE}/mixed_people/search",
            json={
                "q_organization_domains": domain,
                "person_titles": titles,
                "per_page": per_page,
                "page": 1,
            },
        )
        r.raise_for_status()
        return r.json().get("people", [])

    def reveal_email(self, person_id: str) -> str | None:
        if self._reveals_today >= self.daily_reveal_limit:
            raise RuntimeError(
                f"Apollo daily reveal limit ({self.daily_reveal_limit}) hit. "
                "Batch carefully — set APOLLO_DAILY_REVEAL_LIMIT or run tomorrow."
            )
        r = self._client.post(f"{BASE}/people/match", json={"id": person_id, "reveal_personal_emails": True})
        r.raise_for_status()
        self._reveals_today += 1
        time.sleep(1.2)
        return (r.json().get("person") or {}).get("email")

    def add_to_sequence(self, person_id: str, sequence_id: str, user_id: str) -> dict:
        r = self._client.post(
            f"{BASE}/contacts/{person_id}/add_to_sequence",
            json={"sequence_id": sequence_id, "send_email_from_user_id": user_id},
        )
        r.raise_for_status()
        return r.json()
