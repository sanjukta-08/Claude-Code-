const GRAPH = "https://graph.facebook.com/v21.0";

export async function postToInstagram({ imageUrl, caption }) {
  const igId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!igId || !token) throw new Error("INSTAGRAM_BUSINESS_ACCOUNT_ID or INSTAGRAM_ACCESS_TOKEN missing");

  const createUrl = new URL(`${GRAPH}/${igId}/media`);
  createUrl.searchParams.set("image_url", imageUrl);
  createUrl.searchParams.set("caption", caption);
  createUrl.searchParams.set("access_token", token);

  const createRes = await fetch(createUrl, { method: "POST" });
  const createData = await createRes.json();
  if (!createRes.ok) throw new Error(`IG create media failed: ${JSON.stringify(createData)}`);
  const creationId = createData.id;

  for (let i = 0; i < 20; i++) {
    const statusUrl = new URL(`${GRAPH}/${creationId}`);
    statusUrl.searchParams.set("fields", "status_code");
    statusUrl.searchParams.set("access_token", token);
    const s = await (await fetch(statusUrl)).json();
    if (s.status_code === "FINISHED") break;
    if (s.status_code === "ERROR") throw new Error(`IG container error: ${JSON.stringify(s)}`);
    await new Promise((r) => setTimeout(r, 2000));
  }

  const publishUrl = new URL(`${GRAPH}/${igId}/media_publish`);
  publishUrl.searchParams.set("creation_id", creationId);
  publishUrl.searchParams.set("access_token", token);
  const publishRes = await fetch(publishUrl, { method: "POST" });
  const publishData = await publishRes.json();
  if (!publishRes.ok) throw new Error(`IG publish failed: ${JSON.stringify(publishData)}`);

  return { id: publishData.id };
}
