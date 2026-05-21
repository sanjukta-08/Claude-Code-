import { generatePost } from "./lib/claude.js";
import { createDesignFromTemplate } from "./lib/canva.js";
import { postToInstagram } from "./lib/instagram.js";
import { postToLinkedIn } from "./lib/linkedin.js";
import { uploadImage } from "./lib/imagehost.js";
import { validateTokens } from "./lib/validate.js";
import {
  saveImage,
  loadHistory,
  appendHistory,
  commitAndPush,
  rawGitHubUrl,
  POSTS_REL_DIR,
} from "./lib/storage.js";

const DRY_RUN = process.env.DRY_RUN === "true";
const PREVIEW = process.env.PREVIEW === "true";

function log(stage, msg) {
  console.log(`[${new Date().toISOString()}] [${stage}] ${msg}`);
}

async function main() {
  log("start", `DRY_RUN=${DRY_RUN} PREVIEW=${PREVIEW}`);

  log("validate", "Checking tokens");
  await validateTokens();

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
  log("canva", `Design ready: ${design.editUrl}`);

  log("storage", "Saving image locally");
  const { filepath, filename } = await saveImage(design.buffer, "png");

  const entry = {
    date: new Date().toISOString(),
    topic: post.topic,
    headline: post.headline,
    subheadline: post.subheadline,
    file: filename,
    designId: design.designId,
    editUrl: design.editUrl,
    captions: { instagram: post.instagram_caption, linkedin: post.linkedin_post },
  };

  if (PREVIEW) {
    await appendHistory({ ...entry, preview: true });
    log("preview", `Image:  ${filepath}`);
    log("preview", `Canva:  ${design.editUrl}`);
    log("preview", `Gallery: automation/posts/gallery.html`);
    log("preview", "Open gallery.html in a browser to see all designs.");
    console.log("\n--- Instagram caption ---\n" + post.instagram_caption);
    console.log("\n--- LinkedIn post ---\n" + post.linkedin_post);
    return;
  }

  if (DRY_RUN) {
    log("dry-run", "Skipping publish. Generated:");
    console.log(JSON.stringify({ post, entry }, null, 2));
    return;
  }

  let imageUrl = await uploadImage(design.buffer);
  if (imageUrl) {
    log("host", `Image uploaded: ${imageUrl}`);
  } else {
    log("git", "No image host configured — using GitHub raw (repo must be public)");
    await appendHistory(entry);
    commitAndPush(
      [filepath, `${POSTS_REL_DIR}/history.json`, `${POSTS_REL_DIR}/gallery.html`],
      `post: ${post.topic}`,
    );
    log("wait", "Waiting 15s for GitHub raw CDN to propagate");
    await new Promise((r) => setTimeout(r, 15000));
    imageUrl = rawGitHubUrl(filename);
  }

  log("instagram", `Posting (image: ${imageUrl})`);
  const ig = await postToInstagram({ imageUrl, caption: post.instagram_caption });
  entry.instagramId = ig.id;
  log("instagram", `Posted: ${ig.id}`);

  log("linkedin", "Posting");
  const li = await postToLinkedIn({ imageBuffer: design.buffer, text: post.linkedin_post });
  entry.linkedinId = li.id;
  log("linkedin", `Posted: ${li.id}`);

  if (imageUrl && !imageUrl.includes("raw.githubusercontent.com")) {
    await appendHistory(entry);
    commitAndPush(
      [filepath, `${POSTS_REL_DIR}/history.json`, `${POSTS_REL_DIR}/gallery.html`],
      `post: ${post.topic}`,
    );
  }

  log("done", "All platforms posted successfully");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
