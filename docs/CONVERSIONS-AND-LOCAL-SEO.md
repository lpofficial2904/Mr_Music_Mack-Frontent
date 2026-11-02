# Conversion measurement and local SEO

## What exists and what changed

The contact page, shared project dialog, WhatsApp draft, phone/email links and mobile CTA already exist. They retain the same API payload and backend contract. Service, background-score and mobile quote actions now preselect the relevant project type and requirement. Service planning sections explain inputs, scope, pricing discussions and genuine FAQs. Successful feedback now says the brief was received rather than claiming email/WhatsApp delivery that the API does not guarantee.

No GA4, GTM or Ads tag was found in the reviewed source. No tracking ID, account, Google Business Profile URL or verification token has been invented. No live enquiry was submitted.

## Consent-gated hooks

`src/analytics.js` uses an already configured `window.gtag` or existing `window.dataLayer`, never both for one event. It adds no third-party script, network transport or cookie. By default it sends nothing. Integrate the owner's consent manager first; only after analytics consent is granted set:

```js
window.__MMM_ANALYTICS_CONSENT__ = true;
// On revocation, immediately set it back to false.
```

This flag is a hook, not a replacement for a consent manager, Google consent configuration or privacy review. There is no persisted tracking queue. Events include only an allowlisted service, a known canonical page path and, where relevant, a contact method. Names, phone numbers, emails, reference IDs, notes, attachments, full URLs and query strings are excluded. An analytics adapter failure must not interrupt a booking.

| Event | Trigger | Interpretation |
| --- | --- | --- |
| generate_lead | API reports success with a confirmed reference | Received enquiry; deduplicated per reference in the current page session |
| service_enquiry | Service-specific dialog opens | Intent only |
| click_to_call | Phone link click | Intent only, not a completed call |
| whatsapp_click | WhatsApp link click or validated form draft opens | Intent only, not a sent WhatsApp message |
| contact | Email link click | Intent only |

Configure the GA4/GTM mapping with the owner's real ID after consent. If GTM is already installed externally through hosting, reconcile it before adding any loader. Do not create an extra click trigger for the same events. Mark `generate_lead` as the lead key event. Avoid treating both it and a duplicate Ads import/direct tag as independent conversions for the same enquiry. Validate in DebugView/Tag Assistant using an approved test submission, checking one failure and one success. Test hooks were exercised locally with simulated responses; no live GA4/Ads event was sent.

`npm test` covers consent, private-data exclusion and deduplication. `npm run test:hydration` additionally exercises the actual built contact form against simulated failure/success responses in a DOM test environment. Install a temporary jsdom tool and set `JSDOM_MODULE` to its `lib/api.js` file URL; no production dependency is needed. This is not a substitute for testing real browser playback, layout and provider integrations.

For example, in a disposable Linux test environment after building:

```bash
npm install --prefix /tmp/mrmusicmack-seo-tools --no-package-lock --ignore-scripts jsdom
JSDOM_MODULE=file:///tmp/mrmusicmack-seo-tools/node_modules/jsdom/lib/api.js npm run test:hydration
```

## Local business checklist

- Verify the actual Google Business Profile URL before inserting it into the site or schema. Record confirmed business hours and genuine social profiles in `business-data-verification.json`.
- Keep MR MUSIC MACK, the Jaipur address and the phone number consistent with real signage and customer-facing documents. Do not append search keywords to the business name.
- Review the available GBP category picker for **Music producer** as a candidate based on custom music production. Use **Recording studio** only if actual recording facilities/services are confirmed. Add a choreography-related category only if it accurately describes a real core service and is available in the local picker. These are candidates for owner review, not categories changed in this task.
- Keep the number of categories small, based on the business rather than target keywords. Confirm whether customers can visit or the business travels to them; service-area settings must match how the business actually operates.
- Add genuine service descriptions, current opening hours, current studio photos and contact details. Keep temporary closures accurate.
- Ask actual customers for honest reviews without fabricated content or incentives tied to positive ratings. Reply helpfully without publishing private project information.
- Publish useful business updates and permissioned project examples. Do not claim branches in other cities or guaranteed turnaround, rankings or copyright outcomes.

## Useful content opportunities

Write a small set of original, experience-based resources: preparing song timestamps for an edit; planning sangeet performance order; mashup versus remix; sending stems for mixing; preparing stage playback files; and briefing an advertisement score. Each should show a genuine example, link to one relevant service and explain how to enquire. These are editorial topics, not automatically published articles or verified search-volume estimates.

References: [GBP guidelines](https://support.google.com/business/answer/3038177), [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
