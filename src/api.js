const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim() || "";

export function hasApiBackend() {
  return configuredApiBase || import.meta.env.DEV;
}

export function apiUrl(path) {
  if (!configuredApiBase) return path;
  return `${configuredApiBase.replace(/\/$/, "")}${path}`;
}
