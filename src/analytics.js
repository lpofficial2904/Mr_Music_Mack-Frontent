import { projectTypes } from "./siteData.js";
import { seoPages, canonicalPath } from "./seo.js";

const deliveredLeads = new Set();
const serviceName = (value) =>
  projectTypes.includes(value) ? value : "Music Editing";

// No tag, cookies or network requests are created here. An existing consent
// manager must grant analytics consent and configure gtag or GTM separately.
export function trackEvent(name, parameters = {}) {
  if (
    typeof window === "undefined" ||
    window.__MMM_ANALYTICS_CONSENT__ !== true
  )
    return false;
  if (
    ![
      "generate_lead",
      "contact",
      "click_to_call",
      "whatsapp_click",
      "service_enquiry",
    ].includes(name)
  )
    return false;
  const path = canonicalPath(
    window.location.pathname.replace(/\/$/, "") || "/",
  );
  const data = {
    service: serviceName(parameters.service),
    page_path: seoPages[path] ? path : "/other",
  };
  if (["phone", "whatsapp", "email"].includes(parameters.method))
    data.contact_method = parameters.method;
  try {
    if (typeof window.gtag === "function") window.gtag("event", name, data);
    else if (Array.isArray(window.dataLayer))
      window.dataLayer.push({ event: name, ...data });
    else return false;
    return true;
  } catch {
    // A measurement integration must never interrupt an enquiry.
    return false;
  }
}

export function trackLead(reference, service) {
  if (!reference || deliveredLeads.has(reference)) return false;
  if (!trackEvent("generate_lead", { service })) return false;
  deliveredLeads.add(reference);
  return true;
}

export function trackContact(method, service) {
  const event =
    method === "whatsapp"
      ? "whatsapp_click"
      : method === "phone"
        ? "click_to_call"
        : "contact";
  return trackEvent(event, { method, service });
}

export function installContactTracking(getService) {
  const clicked = (event) => {
    const anchor = event.target.closest?.("a[href]");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    const method = href.startsWith("tel:")
      ? "phone"
      : href.startsWith("mailto:")
        ? "email"
        : /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)
          ? "whatsapp"
          : null;
    if (method) trackContact(method, getService());
  };
  document.addEventListener("click", clicked);
  return () => document.removeEventListener("click", clicked);
}
