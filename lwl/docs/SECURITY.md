# Security

## Secrets

- `.env` is gitignored. Never commit it. Use the secret manager of your choice (Doppler, Vault, AWS Secrets) in production.
- Rotate `HUB_INTERNAL_SECRET` and webhook signing keys at least quarterly.

## Webhooks

| Endpoint | Signature scheme |
|---|---|
| `/webhook/stripe` | `stripe.Webhook.construct_event` HMAC |
| `/webhook/razorpay` | HMAC-SHA256 of body, header `X-Razorpay-Signature` |
| Hub internal | `x-internal-secret` static header |

The Stripe & Razorpay verification is **inside the handler**, before any DB writes — a malformed body returns 400 with no side effect.

## Supabase RLS

All tables have `service_role_all` policies. App-level service uses the service key — never expose `SUPABASE_SERVICE_KEY` to a browser.

## PII

- Stored fields: contact name, title, email, phone, LinkedIn URL.
- Retention: 24 months unless paid → permanent.
- Deletion: `DELETE FROM schools WHERE domain = '…'` cascades to contacts, locks, outreach_events.
- Right-to-erasure requests go to `privacy@lwl` and Anjali processes within 30 days.

## Apollo & WhatsApp ToS

- Apollo: respect daily reveal cap (50/day). Never resell contacts.
- WhatsApp BSP: only use approved templates for outbound, only message users who registered through JotForm (opt-in trail in `masterclass_registrations`).
- Instantly.ai warmup: ALWAYS on secondary domains. Burning the main domain reputation costs 6+ weeks to recover.
