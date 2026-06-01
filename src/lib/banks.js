// Fetches the static question data from /public/data, with in-memory caching.
// BASE points at the deploy root ("/" in dev, "/kavk-kedvtelesi/" on Pages).
const BASE = import.meta.env.BASE_URL;
const cache = new Map();

export async function loadIndex() {
  if (cache.has("__index")) return cache.get("__index");
  const res = await fetch(`${BASE}data/index.json`);
  if (!res.ok) throw new Error("Nem sikerült betölteni a kérdésbankokat");
  const data = await res.json();
  cache.set("__index", data);
  return data;
}

export async function loadBank(bankId) {
  if (cache.has(bankId)) return cache.get(bankId);
  const res = await fetch(`${BASE}data/${bankId}.json`);
  if (!res.ok) throw new Error(`Nem sikerült betölteni: ${bankId}`);
  const data = await res.json();
  cache.set(bankId, data);
  return data;
}

export function imageUrl(path) {
  if (!path) return null;
  // path is stored as "<bankId>/<filename>"
  return `${BASE}data/img/${encodeURI(path)}`;
}
