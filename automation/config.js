export const config = {
  brand: {
    name: "Avsarr",
    niche: "AI automation, productivity, and modern business growth",
    audience: "founders, marketers, and operators who want to ship faster with AI",
    voice: "punchy, confident, practical, no fluff. one strong insight per post.",
    hashtags: {
      instagram: ["#AI", "#Automation", "#Productivity", "#StartupLife", "#BuildInPublic"],
      linkedin: ["#AI", "#Automation", "#Productivity", "#FutureOfWork"],
    },
    cta: "DM 'AUTOMATE' to learn how we build this for you.",
  },

  canva: {
    // The brand template ID from your Canva account.
    // Find it in the URL: https://www.canva.com/design/<TEMPLATE_ID>/...
    brandTemplateId: process.env.CANVA_BRAND_TEMPLATE_ID,
    // Map Canva template field names -> values we'll fill in.
    // Adjust these keys to match the data fields you defined in your Canva template.
    fields: {
      headline: "headline",
      subheadline: "subheadline",
      footer: "footer",
    },
    exportFormat: "png",
  },

  claude: {
    model: "claude-sonnet-4-6",
    maxTokens: 1500,
  },

  schedule: {
    // Used only for the human-readable "posted on" footer.
    timezone: "Asia/Kolkata",
  },
};
