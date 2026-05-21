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

### 4. Repo visibility

Instagram fetches the image from `raw.githubusercontent.com`, which requires the repo to be **public**. If your repo is private, swap `lib/storage.js`'s `rawGitHubUrl` for a Cloudinary / imgbb / S3 upload.

## Local testing

```bash
cd automation
npm install
cp .env.example .env  # fill in real values
DRY_RUN=true npm run post   # generates content + design, does not publish
npm run post                # full run (will publish!)
```

## Tokens that expire

- **Instagram long-lived Page tokens** last ~60 days. Refresh before they die, or add a refresh step to the workflow.
- **LinkedIn access tokens** last 60 days. Same deal.
- **Canva** OAuth tokens refresh — store the refresh token and exchange it on each run (not yet implemented; add when you wire up your Canva app).
