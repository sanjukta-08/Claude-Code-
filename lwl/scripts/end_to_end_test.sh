#!/usr/bin/env bash
# Smoke test: scrape → enrich → score → route → register → drop code → pay → lock
set -euo pipefail
HUB="${HUB_BASE_URL:-http://localhost:8000}"
SEC="${HUB_INTERNAL_SECRET:?set HUB_INTERNAL_SECRET}"

echo "→ Health"
curl -fsS "$HUB/health" | jq .

echo "→ Intel"
curl -fsS -X POST "$HUB/intel" \
  -H "x-internal-secret: $SEC" -H "content-type: application/json" \
  -d '{"school_name":"Demo Intl School","domain":"demo-school.test","country":"UAE"}' | jq .

echo "→ Issue 48hr code"
curl -fsS -X POST "$HUB/codes/issue" \
  -H "x-internal-secret: $SEC" -H "content-type: application/json" \
  -d '{"programme":"Research","tier":"CORE","email":"parent@demo.test"}' | jq .

echo "→ Done."
