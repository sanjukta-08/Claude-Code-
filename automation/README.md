# Daily Social Automation

Generates a daily post with Claude, designs it in Canva, and publishes to Instagram + LinkedIn.

## Flow

1. **Claude** writes today's topic, headline, subheadline, IG caption, LinkedIn post.
2. **Canva Connect API** autofills your brand template with the headline/subheadline/footer and exports a PNG.
3. The image is committed to `automation/posts/<date>.png` so it has a public URL.
4. **Instagram Graph API** publishes the image + caption.
5. **LinkedIn UGC API** publishes the image + post text.
6. A log is appended to `automation/posts/history.json` so Claude avoids repeat topics.

Scheduled daily at 09:30 IST via `.github/workflows/daily-post.yml`. Manual run available via the workflow's "Run workflow" button (with a `dry_run` option).

## One-time setup

### 1. GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
| --- | --- |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com/ |
| `CANVA_ACCESS_TOKEN` | Canva Developer Portal → Connect API → OAuth token |
| `CANVA_BRAND_TEMPLATE_ID` | URL of your Canva brand template |
| `INSTAGRAM_ACCESS_TOKEN` | Meta Graph API Explorer → long-lived Page token |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | `GET /me/accounts` → `instagram_business_account.id` |
| `LINKEDIN_ACCESS_TOKEN` | LinkedIn OAuth with `w_member_social` scope |
| `LINKEDIN_PERSON_URN` | `urn:li:person:<id>` for you, or `urn:li:organization:<id>` for a Page |

### 2. Canva brand template

Create a Canva brand template with three text fields. The field **names** must match what's in `config.js`:

- `headline`
- `subheadline`
- `footer`

(Rename them in `config.js > canva.fields` if you prefer different names.)

### 3. Brand voice

Edit `automation/config.js` — set `brand.name`, `niche`, `audience`, `voice`, `hashtags`, `cta`.

### 4. Image hosting

Instagram requires a public URL for the image. Two options:

- **imgbb (recommended)** — free, instant. Get a key at https://api.imgbb.com/ → add `IMGBB_API_KEY` to secrets. Works with private repos.
- **GitHub raw (fallback)** — if `IMGBB_API_KEY` is not set, the script commits the image to the repo and uses `raw.githubusercontent.com`. **Requires the repo to be public.**

### 5. Long-lived Instagram token (do this once)

Default Page tokens expire in 1-2 hours. Get a long-lived one (60 days, or **non-expiring** if derived from a long-lived User token):

1. Generate a short-lived User token in Graph API Explorer with `instagram_basic` + `instagram_content_publish` + `pages_manage_posts` + `pages_read_engagement`.
2. Exchange for a long-lived User token:
   `GET /oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_TOKEN`
3. Use that token to get a Page token: `GET /me/accounts?access_token=LONG_USER_TOKEN` — copy the page's `access_token`. **This Page token does not expire.**

## Local testing & previewing designs

```bash
cd automation
npm install
cp .env.example .env  # fill in real values

npm run preview   # generates design + saves to posts/, NO publishing.
                  # Open automation/posts/gallery.html in a browser to see it.
npm run dry-run   # generates everything, dumps JSON, no publish.
npm run post      # full run (will publish to Instagram + LinkedIn!)
npm run gallery   # rebuild gallery.html from history.json
```

## How to see all generated posters

Every run (preview or real) saves the design to `automation/posts/<date>.png` and updates `automation/posts/gallery.html`. To browse them:

- **Locally**: open `automation/posts/gallery.html` in a browser — visual grid of every poster with date, topic, and a "Edit in Canva" link.
- **On GitHub**: the `automation/posts/` folder shows all PNGs (just click any one to view).
- **In Canva**: every entry in `history.json` has an `editUrl` — open it to edit the original design.

Each preview is also kept in `history.json` (marked `"preview": true`) and shown in the gallery, so you can review the AI's output before turning on the daily cron.

## Tokens that expire

- **Instagram long-lived Page tokens** last ~60 days. Refresh before they die, or add a refresh step to the workflow.
- **LinkedIn access tokens** last 60 days. Same deal.
- **Canva** OAuth tokens refresh — store the refresh token and exchange it on each run (not yet implemented; add when you wire up your Canva app).
