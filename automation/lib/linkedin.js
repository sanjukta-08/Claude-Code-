const API = "https://api.linkedin.com";

export async function postToLinkedIn({ imageBuffer, text }) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;
  if (!token || !personUrn) throw new Error("LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN missing");

  const registerRes = await fetch(`${API}/v2/assets?action=registerUpload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: personUrn,
        serviceRelationships: [
          { relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" },
        ],
      },
    }),
  });
  const registerData = await registerRes.json();
  if (!registerRes.ok) throw new Error(`LinkedIn register upload failed: ${JSON.stringify(registerData)}`);

  const uploadUrl =
    registerData.value.uploadMechanism[
      "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ].uploadUrl;
  const asset = registerData.value.asset;

  const uploadRes = await fetch(uploadUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: imageBuffer,
  });
  if (!uploadRes.ok) throw new Error(`LinkedIn image upload failed: ${uploadRes.status}`);

  const ugcRes = await fetch(`${API}/v2/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: personUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "IMAGE",
          media: [
            {
              status: "READY",
              description: { text: "" },
              media: asset,
              title: { text: "" },
            },
          ],
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });
  const ugcData = await ugcRes.json();
  if (!ugcRes.ok) throw new Error(`LinkedIn post failed: ${JSON.stringify(ugcData)}`);

  return { id: ugcData.id };
}
