import { generatePost } from "./lib/claude.js";
import { createDesignFromTemplate } from "./lib/canva.js";
import { postToInstagram } from "./lib/instagram.js";
import { postToLinkedIn } from "./lib/linkedin.js";
import {
  saveImage,
  loadHistory,
  appendHistory,
  commitAndPush,
  rawGitHubUrl,
} from "./lib/storage.js";

const DRY_RUN = process.env.DRY_RUN === "true";

function log(stage, msg) {
  console.log(`[${new Date().toISOString()}] [${stage}] ${msg}`);
}

async function main() {
  log("start", `DRY_RUN=${DRY_RUN}`);

  const history = await loadHistory();
  const recentTopics = history.slice(0, 14).map((h) => h.topic);

  log("claude", "Generating post content");
  const post = await generatePost({ recentTopics });
  log("claude", `Topic: ${post.topic}`);

  log("canva", "Creating design from brand template");
  const design = await createDesignFromTemplate({
    headline: post.headline,
    subheadline: post.subheadline,
    footer: post.footer,
  });

  log("storage", "Saving image to repo");
  const { filepath, filename } = await saveImage(design.buffer, "png");

  const entry = {
    date: new Date().toISOString(),
    topic: post.topic,
    headline: post.headline,
    file: filename,
    designId: design.designId,
  };

  if (DRY_RUN) {
    log("dry-run", "Skipping publish. Generated:");
    console.log(JSON.stringify({ post, entry }, null, 2));
    return;
  }

  log("git", "Committing image so Instagram can fetch it");
  await appendHistory(entry);
  commitAndPush([filepath, "automation/posts/history.json"], `post: ${post.topic}`);

  log("wait", "Waiting 15s for GitHub raw CDN to propagate");
  await new Promise((r) => setTimeout(r, 15000));

  const imageUrl = rawGitHubUrl(filename);
  log("instagram", `Posting (image: ${imageUrl})`);
  const ig = await postToInstagram({ imageUrl, caption: post.instagram_caption });
  log("instagram", `Posted: ${ig.id}`);

  log("linkedin", "Posting");
  const li = await postToLinkedIn({ imageBuffer: design.buffer, text: post.linkedin_post });
  log("linkedin", `Posted: ${li.id}`);

  log("done", "All platforms posted successfully");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
