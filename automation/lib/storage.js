import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const POSTS_DIR = path.resolve("automation/posts");
const LOG_PATH = path.resolve("automation/posts/history.json");

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
  return `https://raw.githubusercontent.com/${repo}/${branch}/automation/posts/${filename}`;
}
