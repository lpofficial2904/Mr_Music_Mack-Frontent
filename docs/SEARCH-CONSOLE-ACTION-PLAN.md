# Search Console action plan

This plan distinguishes confirmed public HTTP observations from unverified historical Search Console counts. No account access or indexing requests were performed.

| Priority | URLs or evidence | Action |
| --- | --- | --- |
| P1 | HTTP contact URL remains HTTP; www contact remains www | Deploy the reviewed host/HTTPS rules, test representative public URLs and preserve API preflight handling. Do not alter server config based only on an old exclusion count. |
| P1 | Live canonical service URLs redirect to slash alternatives | Align nginx public routing with the no-slash canonical policy and test a single-hop redirect from slash to no-slash. Inspect both variants in URL Inspection after release. |
| P1 | `/about`, `/contact`, `/our-work` | Keep 301 redirects to `/the-studio`, `/lets-connect`, `/the-collection`. Do not request indexing for the aliases or add them to the sitemap. |
| P1 | Updated `/sitemap.xml` | After deployment verify it returns XML/200 and contains only the 21 indexable canonical URLs, then submit it in the verified canonical-domain property. |
| P2 | `/`, `/music-editing`, `/wedding-music-editing`, `/choreographer`, `/costume-design`, `/background-music` | Inspect the live rendered HTML and Google-selected canonical. Request indexing after deployment if not indexed or materially changed. Prioritize actual lead-generating pages, not every variant. |
| P2 | The remaining canonical services and `/lets-connect` | Confirm sitemap discovery, useful visible content, exact canonical and functional enquiry path. Request indexing selectively if needed; do not repeatedly resubmit daily. |
| P2 | Historical two redirect errors | Export the exact affected URLs and current last-crawl evidence. Check every hop, final status, host, scheme and slash variant; fix loops/invalid targets only when reproduced. The two specific URLs are unknown in this task. |
| Preserve | 33 historical alternate canonical exclusions and 22 historical redirects | Exclusion is often correct. Compare with intentional aliases/host/slash variants before making changes. Do not remove valid canonical tags to force indexing. |
| Preserve | `/terms-and-conditions`, `/refund-policy` | Keep noindex while marked pending. Remove it and add to sitemap only after their real policy content is completed and approved. Do not remove all ten historical noindex exclusions indiscriminately. |
| Preserve | Genuine missing pages, admin and API endpoints | Do not request indexing or add to sitemap. Missing public pages should return 404, not homepage HTTP 200. |
| P3 | Low-impression or low-lead service pages | Compare Search Console query intent with the page's service, title, heading, examples and CTA. Improve content with real project evidence; do not create near-duplicate locality pages. |

Recheck performance, indexing and canonical reports after Google recrawls; record dates rather than promising a fixed ranking timeline. Track qualified enquiries alongside impressions and clicks. Review genuine Business Profile visibility separately using the owner's verified profile. Submission and correct markup do not guarantee indexing or ranking.
