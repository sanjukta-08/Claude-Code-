import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const AUTOMATION_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(AUTOMATION_DIR, "posts");
const LOG_PATH = path.join(POSTS_DIR, "history.json");
const REPO_ROOT = path.resolve(AUTOMATION_DIR, "..");
const REL_POSTS = path.relative(REPO_ROOT, POSTS_DIR);

export async function saveImage(buffer, ext = "png") {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${date}.${ext}`;
  const filepath = path.join(POSTS_DIR, filename);
  await fs.writeFile(filepath, buffer);
  return { filepath, filename };
}

export async function loadHistory() {
  try {
    return JSON.parse(await fs.readFile(LOG_PATH, "utf8"));
  } catch {
    return [];
  }
}

export async function appendHistory(entry) {
  const history = await loadHistory();
  history.unshift(entry);
  await fs.writeFile(LOG_PATH, JSON.stringify(history.slice(0, 100), null, 2));
  await writeGallery(history);
}

const GALLERY_PATH = path.join(POSTS_DIR, "gallery.html");

export async function writeGallery(history) {
  const cards = history
    .map((h) => {
      const date = (h.date || "").slice(0, 10);
      const canvaLink = h.editUrl
        ? `<a href="${h.editUrl}" target="_blank">Edit in Canva</a>`
        : "";
      const ig = h.instagramId ? "IG" : "";
      const li = h.linkedinId ? "LI" : "";
      const status = [ig, li].filter(Boolean).join(" + ") || "preview";
      return `
        <article>
          <img src="${h.file}" alt="${h.headline || ""}" loading="lazy" />
          <header>
            <h3>${escapeHtml(h.headline || h.topic || "")}</h3>
            <p class="meta">${date} &middot; ${status}</p>
          </header>
          <p class="topic">${escapeHtml(h.topic || "")}</p>
          <p class="links">${canvaLink}</p>
        </article>`;
    })
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Daily Posts Gallery</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { font-family: -apple-system, system-ui, sans-serif; background: #0a0a0a; color: #eaeaea; margin: 0; padding: 32px; }
  h1 { margin: 0 0 24px; font-size: 28px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  article { background: #161616; border: 1px solid #262626; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
  article img { width: 100%; aspect-ratio: 1; object-fit: cover; background: #222; }
  article header { padding: 14px 16px 4px; }
  article h3 { margin: 0; font-size: 16px; line-height: 1.3; }
  .meta { margin: 4px 0 0; font-size: 12px; color: #888; }
  .topic { padding: 0 16px; margin: 8px 0; font-size: 13px; color: #bbb; }
  .links { padding: 0 16px 14px; margin: auto 0 0; font-size: 13px; }
  a { color: #6ea8ff; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .empty { color: #888; }
</style>
</head>
<body>
  <h1>Daily Posts Gallery <span style="color:#666;font-weight:400;font-size:16px;">(${history.length})</span></h1>
  ${history.length ? `<div class="grid">${cards}</div>` : `<p class="empty">No posts yet. Run <code>npm run preview</code> to generate your first one.</p>`}
</body>
</html>`;
  await fs.writeFile(GALLERY_PATH, html);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function commitAndPush(files, message) {
  try {
    execSync("git config user.email 'automation@avsarr.com'");
    execSync("git config user.name 'Social Automation Bot'");
    execSync(`git add ${files.map((f) => `"${f}"`).join(" ")}`);
    execSync(`git commit -m "${message}"`);
    execSync("git push origin HEAD");
  } catch (e) {
    throw new Error(`git commit/push failed: ${e.message}`);
  }
}

export function rawGitHubUrl(filename) {
  const repo = process.env.GITHUB_REPOSITORY;
  const branch = process.env.GITHUB_REF_NAME || "main";
  if (!repo) throw new Error("GITHUB_REPOSITORY not set");
  return `https://raw.githubusercontent.com/${repo}/${branch}/${REL_POSTS}/${filename}`;
}

export function postsRelPath(filename) {
  return path.join(REL_POSTS, filename);
}

export const POSTS_REL_DIR = REL_POSTS;
