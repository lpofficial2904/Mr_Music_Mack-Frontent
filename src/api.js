const configuredApiBase = (import.meta.env.VITE_API_BASE_URL?.trim() || "https://mrmusicmack.com/api")
  .replace(/\/+$/, "").replace(/\/api$/, "");

export function hasApiBackend() {
  return true;
}

export function apiUrl(path) {
  // The dev proxy keeps login cookies and streaming requests on the local origin.
  if (import.meta.env.DEV) return path;
  return `${configuredApiBase}${path}`;
}

export function mediaUrl(path) {
  return path?.startsWith("/media/") ? apiUrl(path) : path;
}
