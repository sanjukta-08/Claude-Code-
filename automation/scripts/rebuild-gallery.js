import { loadHistory, writeGallery } from "../lib/storage.js";

const history = await loadHistory();
await writeGallery(history);
console.log(`Rebuilt gallery from ${history.length} entries → automation/posts/gallery.html`);
