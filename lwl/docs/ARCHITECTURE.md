# Architecture

```
                                       ┌──────────────┐
                          ┌────────────►│  Slack #t1   │ (4hr SLA — Abhijeet)
                          │ Tier 1      └──────────────┘
┌─────┐  ┌────────┐  ┌────┴───┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Src │─►│ Scrape │─►│ Enrich │─►│ Intel    │─►│ Routing  │─►│ Outreach │─►│ Convert  │
└─────┘  └────────┘  └────────┘  │ + LCS    │  │  Switch  │  │  fan-out │  │ funnel   │
   IB     n8n WF1     Clay       │ Claude   │  │          │  │ Apollo · │  │ MC · 48hr│
   NAIS   nais.py     waterfall  │ + Score  │  │ Tier 2:  │  │ WA · Bld │  │ Stripe · │
   Apollo Apify       Apollo→    │          │  │ Apollo   │  │ Tavus ·  │  │ Razorpay │
   GMaps  Browse AI   Hunter→    │          │  │ seq      │  │ ManyChat │  │ Brevo    │
   KHDA               Clearbit   │          │  │ Tier 3:  │  │          │  │          │
                                 │          │  │ Park     │  │          │  │          │
                                 └────┬─────┘  └──────────┘  └─────┬────┘  └────┬─────┘
                                      │                            │            │
                                      └──────────► Anjali (Supabase Registry) ◄─┘
                                                   ↑ programme lock + dedup
                                                   ↑ Yale Camp = US only
                                                   ↑ Day 30/60/90 cross-sell
```

## Trust boundaries

| Boundary | Validated by |
|---|---|
| n8n → Hub | `x-internal-secret` header |
| Stripe → Hub | `stripe.Webhook.construct_event` HMAC |
| Razorpay → Hub | HMAC SHA-256 of body with `RAZORPAY_WEBHOOK_SECRET` |
| User → JotForm | JotForm CAPTCHA + masterclass_date validation |
| Anjali (DB) → caller | RLS — only `service_role` writes |

## Critical invariants

1. **Yale Camp = US only.** Enforced in Claude prompt, in `lcs_scorer`, AND as a Postgres trigger (`enforce_yale_us_only`). Three layers because losing this rule loses the brand.
2. **One school, one active programme.** Unique partial index `programme_locks_one_active` on `(school_id) where status = 'active'`.
3. **48hr is hard.** `discount_codes.expires_at` is `not null` and `validate()` short-circuits. Bland.ai calls within 24hrs but does not extend.
4. **Apollo daily reveal cap.** `ApolloClient` raises after 50 reveals/day. Don't override silently — batch tomorrow.
5. **Honest copy.** Only "Harvard student mentors". Weekly `anjali audit-copy` flags violations.

## Cost per school profiled

| Source | Cost |
|---|---|
| Claude research | ~$0.003 |
| Apollo org+people | ~$0.02 |
| Hunter domain search | ~$0.01 |
| Apify scrape | ~$0.005 |
| n8n compute | ~$0.005 |
| Sheets append + Slack | ~$0 |
| **Total** | **~$0.07** |

## Honest funnel math (per cycle)

| Stage | Count |
|---|---|
| Available pool | 7,000+ |
| Scraped | 1,500 |
| Verified | 800 |
| Tier 1+2 outreach | 200 |
| Masterclass registered | 40 |
| Masterclass attended | ~20 |
| Paid (~1%) | ~3 |

To hit 5,000 paid students → roughly **~1,500–2,000 cycles**, supported by lookalike multiplication (each paid → 10 lookalikes back into top of funnel).
