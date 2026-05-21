import { config } from "../config.js";

const API = "https://api.canva.com/rest/v1";

function authHeader() {
  const token = process.env.CANVA_ACCESS_TOKEN;
  if (!token) throw new Error("CANVA_ACCESS_TOKEN is not set");
  return { Authorization: `Bearer ${token}` };
}

async function canvaFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Canva ${options.method || "GET"} ${path} failed: ${res.status} ${body}`);
  }
  return res.json();
}

async function poll(jobUrl, getStatus) {
  for (let i = 0; i < 60; i++) {
    const data = await canvaFetch(jobUrl);
    const status = getStatus(data);
    if (status === "success") return data;
    if (status === "failed") throw new Error(`Canva job failed: ${JSON.stringify(data)}`);
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Canva job timed out");
}

export async function createDesignFromTemplate({ headline, subheadline, footer }) {
  const templateId = config.canva.brandTemplateId;
  if (!templateId) throw new Error("CANVA_BRAND_TEMPLATE_ID is not set");

  const data = {};
  data[config.canva.fields.headline] = { type: "text", text: headline };
  data[config.canva.fields.subheadline] = { type: "text", text: subheadline };
  data[config.canva.fields.footer] = { type: "text", text: footer };

  const create = await canvaFetch("/autofills", {
    method: "POST",
    body: JSON.stringify({ brand_template_id: templateId, data }),
  });

  const jobId = create.job.id;
  const done = await poll(`/autofills/${jobId}`, (d) => d.job.status);
  const designId = done.job.result.design.id;
  const editUrl = done.job.result.design.urls?.edit_url || `https://www.canva.com/design/${designId}/edit`;

  const exportJob = await canvaFetch("/exports", {
    method: "POST",
    body: JSON.stringify({
      design_id: designId,
      format: { type: config.canva.exportFormat },
    }),
  });

  const exportDone = await poll(`/exports/${exportJob.job.id}`, (d) => d.job.status);
  const url = exportDone.job.urls[0];

  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Failed to download Canva export: ${imgRes.status}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());

  return { designId, editUrl, imageUrl: url, buffer };
}
