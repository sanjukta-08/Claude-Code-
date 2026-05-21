export async function uploadImage(buffer) {
  const provider = process.env.IMAGE_HOST || (process.env.IMGBB_API_KEY ? "imgbb" : "github");

  if (provider === "imgbb") return uploadToImgbb(buffer);
  if (provider === "github") return null; // signal: caller should use rawGitHubUrl path
  throw new Error(`Unknown IMAGE_HOST provider: ${provider}`);
}

async function uploadToImgbb(buffer) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) throw new Error("IMGBB_API_KEY missing");

  const form = new FormData();
  form.append("image", buffer.toString("base64"));

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(`imgbb upload failed: ${JSON.stringify(data)}`);
  }
  return data.data.url;
}
