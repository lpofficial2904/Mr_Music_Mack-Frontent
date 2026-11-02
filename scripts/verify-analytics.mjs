import assert from "node:assert/strict";
import {
  trackEvent,
  trackLead,
  trackContact,
  installContactTracking,
} from "../src/analytics.js";

const sent = [];
globalThis.window = {
  location: {
    pathname: "/lets-connect/",
    search: "?email=private@example.com",
  },
  gtag: (...args) => sent.push(args),
};
assert.equal(trackLead("confirmed-1", "Wedding Music"), false);
assert.equal(sent.length, 0, "No measurement without consent");
window.__MMM_ANALYTICS_CONSENT__ = true;
assert.equal(trackLead("confirmed-1", "Wedding Music"), true);
assert.equal(trackLead("confirmed-1", "Wedding Music"), false);
assert.equal(trackLead("", "Wedding Music"), false);
assert.equal(sent.length, 1, "Only one event per confirmed reference");
trackEvent("service_enquiry", {
  service: "private@example.com",
  name: "Private name",
  email: "private@example.com",
});
assert.equal(sent[1][2].service, "Music Editing");
assert.equal(JSON.stringify(sent).includes("private@example.com"), false);
assert.equal(JSON.stringify(sent).includes("confirmed-1"), false);
trackContact("whatsapp", "Wedding Music");
assert.equal(sent.at(-1)[1], "whatsapp_click");
assert.equal(sent.filter((event) => event[1] === "generate_lead").length, 1);
const count = sent.length;
window.__MMM_ANALYTICS_CONSENT__ = false;
trackContact("phone", "Music Editing");
assert.equal(sent.length, count, "Revoking consent stops events");
let listener;
globalThis.document = {
  addEventListener: (_, callback) => {
    listener = callback;
  },
  removeEventListener: (_, callback) => assert.equal(callback, listener),
};
window.__MMM_ANALYTICS_CONSENT__ = true;
const cleanup = installContactTracking(() => "Music Editing");
listener({
  target: { closest: () => ({ getAttribute: () => "tel:+919887563201" }) },
});
assert.equal(sent.at(-1)[1], "click_to_call");
cleanup();
delete globalThis.window;
delete globalThis.document;
console.log(
  "PASS: consent gating, confirmed-lead deduplication, contact intent, cleanup and private-data exclusion.",
);
