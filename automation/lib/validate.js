export async function validateTokens() {
  const errors = [];

  if (!process.env.ANTHROPIC_API_KEY) errors.push("ANTHROPIC_API_KEY missing");
  if (!process.env.CANVA_ACCESS_TOKEN) errors.push("CANVA_ACCESS_TOKEN missing");
  if (!process.env.CANVA_BRAND_TEMPLATE_ID) errors.push("CANVA_BRAND_TEMPLATE_ID missing");

  if (process.env.DRY_RUN !== "true" && process.env.PREVIEW !== "true") {
    if (!process.env.INSTAGRAM_ACCESS_TOKEN) errors.push("INSTAGRAM_ACCESS_TOKEN missing");
    if (!process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) errors.push("INSTAGRAM_BUSINESS_ACCOUNT_ID missing");
    if (!process.env.LINKEDIN_ACCESS_TOKEN) errors.push("LINKEDIN_ACCESS_TOKEN missing");
    if (!process.env.LINKEDIN_PERSON_URN) errors.push("LINKEDIN_PERSON_URN missing");

    const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const igId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    if (igToken && igId) {
      const url = new URL(`https://graph.facebook.com/v21.0/${igId}`);
      url.searchParams.set("fields", "id,username");
      url.searchParams.set("access_token", igToken);
      const r = await fetch(url);
      if (!r.ok) errors.push(`Instagram token check failed: ${r.status} ${await r.text()}`);
    }

    const liToken = process.env.LINKEDIN_ACCESS_TOKEN;
    if (liToken) {
      const r = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${liToken}` },
      });
      if (!r.ok) errors.push(`LinkedIn token check failed: ${r.status} ${await r.text()}`);
    }
  }

  if (errors.length) {
    throw new Error("Pre-flight validation failed:\n  - " + errors.join("\n  - "));
  }
}
