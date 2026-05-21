import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config.js";

const client = new Anthropic();

const SYSTEM_PROMPT = `You write daily social posts for ${config.brand.name}.

Niche: ${config.brand.niche}
Audience: ${config.brand.audience}
Voice: ${config.brand.voice}

Output STRICT JSON only — no preamble, no markdown fences. Schema:
{
  "topic": "short topic label",
  "headline": "max 8 words, hook for the design",
  "subheadline": "max 18 words, supporting line for the design",
  "footer": "1-3 words tagline for the design",
  "instagram_caption": "120-220 words. Hook first line. Short paragraphs. Ends with CTA. No hashtags inline.",
  "linkedin_post": "150-300 words. Professional but human. Insight + 3 takeaways + CTA. No hashtags inline."
}`;

export async function generatePost({ recentTopics = [] } = {}) {
  const avoid = recentTopics.length
    ? `\n\nAvoid repeating these recent topics: ${recentTopics.join(", ")}.`
    : "";

  const userPrompt = `Generate today's post for ${config.brand.name}.${avoid}

Pick ONE concrete, useful idea the audience can act on today. No generic motivation.
CTA to weave in: "${config.brand.cta}"

Return JSON only.`;

  const response = await client.messages.create({
    model: config.claude.model,
    max_tokens: config.claude.maxTokens,
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Claude did not return JSON:\n${text}`);

  const post = JSON.parse(jsonMatch[0]);

  const igTags = config.brand.hashtags.instagram.join(" ");
  const liTags = config.brand.hashtags.linkedin.join(" ");
  post.instagram_caption = `${post.instagram_caption}\n\n${igTags}`;
  post.linkedin_post = `${post.linkedin_post}\n\n${liTags}`;

  return post;
}
