const configuredApiBase = (import.meta.env.VITE_API_BASE_URL?.trim() || "https://mrmusicmack.com/api")
  .replace(/\/+$/, "").replace(/\/api$/, "");
const configuredMediaBase = (import.meta.env.VITE_MEDIA_BASE_URL?.trim() ||
  (configuredApiBase === "https://mrmusicmack.com" ? "https://admin.mrmusicmack.com" : configuredApiBase))
  .replace(/\/+$/, "");

export function hasApiBackend() {
  return true;
}

export function apiUrl(path) {
  // The dev proxy keeps login cookies and streaming requests on the local origin.
  if (import.meta.env.DEV) return path;
  return `${configuredApiBase}${path}`;
}

export function mediaUrl(path) {
  if (!path?.startsWith("/media/")) return path;
  return import.meta.env.DEV ? path : `${configuredMediaBase}${path}`;
}
