"""Claude research agent — ~$0.003 per school (max_tokens=1024)."""
from __future__ import annotations

import json
import os
import re
from typing import Any

from anthropic import Anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

from .prompts import RESEARCH_SYSTEM, RESEARCH_USER_TEMPLATE

MODEL = os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-20250514")
_FENCE = re.compile(r"```(?:json)?\s*|\s*```")


class ClaudeResearchAgent:
    def __init__(self, api_key: str | None = None):
        self.client = Anthropic(api_key=api_key or os.environ["ANTHROPIC_API_KEY"])

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=16))
    def research(self, school_name: str, domain: str, country: str = "unknown") -> dict[str, Any]:
        msg = self.client.messages.create(
            model=MODEL,
            max_tokens=1024,
            system=RESEARCH_SYSTEM,
            messages=[{
                "role": "user",
                "content": RESEARCH_USER_TEMPLATE.format(
                    school_name=school_name, domain=domain, country=country
                ),
            }],
        )
        raw = msg.content[0].text
        cleaned = _FENCE.sub("", raw).strip()
        try:
            profile = json.loads(cleaned)
        except json.JSONDecodeError as e:
            raise ValueError(f"Claude returned non-JSON: {raw[:200]}…") from e

        # Enforce Yale Camp regional rule server-side regardless of model output
        if profile.get("country_iso2") != "US":
            profile["is_yale_camp_eligible"] = False
        return profile
