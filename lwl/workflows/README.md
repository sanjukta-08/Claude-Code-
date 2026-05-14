# n8n Workflows

| File | What |
|---|---|
| `01-ib-schools-scraper.json` | Weekly Mon 06:00 → Apify → Apollo → Hunter → LCS → Sheets |
| `02-school-intelligence-agent.json` | Webhook `/lwl-school-intel` → 4 parallel sources → 30-field profile → tier route |
| `03-payment-webhook.json` | Stripe/Razorpay → Anjali lock → Brevo enrol → Slack |
| `04-whatsapp-nurture.json` | JotForm reg → Day 1/3/5 WhatsApp drip |
| `05-brevo-cross-sell.json` | Daily 09:00 → fetch due → Day 30/60/90 emails |

## Import

1. n8n → Settings → Import from File
2. Set credentials (Slack OAuth, Google Sheets OAuth) inside each node — the rest read from env
3. Set env vars on n8n container (see `lwl/.env.example`)
4. Activate

## Webhook URLs

| Workflow | URL |
|---|---|
| Intel agent | `{N8N_WEBHOOK_BASE}/webhook/lwl-school-intel` |
| Payment | `{N8N_WEBHOOK_BASE}/webhook/lwl-payment` |
| Masterclass register | `{N8N_WEBHOOK_BASE}/webhook/lwl-masterclass-register` |
