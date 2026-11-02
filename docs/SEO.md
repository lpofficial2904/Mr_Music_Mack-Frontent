# SEO implementation and launch guide

Implemented for MR MUSIC MACK on 2 November 2026. Target location: Jaipur, Rajasthan. Online audio enquiries: India. Choreography and costume logistics must be confirmed with the studio.

## Search intent and metadata

These are editorial keyword targets based on the services actually described on the site; no search-volume or ranking claims are made. Keep each page focused on its own service. The keywords meta tag is included as requested, but Google does not use it for indexing or ranking. Titles, descriptions, useful visible content, internal links and crawlable HTML matter more.

| Page | Search title | Target phrases |
| --- | --- | --- |
| / | Music Editing & Creative Studio Jaipur  /  MR MUSIC MACK | music editing Jaipur, online music editing India, creative studio Jaipur |
| /music-editing | Online Music Editing Services India  /  MR MUSIC MACK | online music editing, song cutting and joining, audio editing Jaipur, performance track editing |
| /background-music | Custom Background Music Production  /  MR MUSIC MACK | background music production, custom background score, music composer Jaipur |
| /choreographer | Wedding & Sangeet Choreographer Jaipur  /  MR MUSIC MACK | wedding choreographer Jaipur, sangeet choreographer Jaipur, couple dance choreography, family dance choreography |
| /costume-design | Costume Designer in Jaipur  /  MR MUSIC MACK | costume designer Jaipur, dance costume design, stage costume designer, wedding costume styling |
| /services | Music & Creative Services Jaipur  /  MR MUSIC MACK | music production services Jaipur, audio editing services, choreography and costume design |
| /wedding-performance-music | Wedding & Performance Music Services  /  MR MUSIC MACK | wedding performance music, sangeet music editing, wedding entry songs editing |
| /wedding-music-editing | Wedding Music Editing & Sangeet Mashups  /  MR MUSIC MACK | wedding music editing, sangeet mashup editing, bride entry song editing, couple dance mashup |
| /dance-performance-music-editing | Dance Performance Music Editing  /  MR MUSIC MACK | dance performance music editing, choreography track editing, school function music editing |
| /song-mixing-mashup | Song Mixing & Mashup Editing Services  /  MR MUSIC MACK | song mashup editing, song mixing service, beat matching, custom mashup India |
| /dj-remix | Custom DJ Remix & Song Re-Creation  /  MR MUSIC MACK | DJ remix service, custom song remix, Bollywood remix editing, song re-creation |
| /mix-mastering | Online Mixing & Mastering Services  /  MR MUSIC MACK | mixing and mastering services India, audio mastering, song mixing Jaipur |
| /custom-music-production | Custom Music Production India  /  MR MUSIC MACK | custom music production, original music production India, brand music production |
| /background-music-for-short-films | Short Film Background Music & Scoring  /  MR MUSIC MACK | short film background music, custom film score, cinematic scoring India |
| /background-music-for-advertisements | Custom Music for Ads & Brand Videos  /  MR MUSIC MACK | advertisement music production, custom ad music, brand video soundtrack |
| /background-music-for-youtube | Custom YouTube Background Music  /  MR MUSIC MACK | custom YouTube background music, channel intro music, narration background music |
| /background-music-for-project-launches | Product Launch & Reveal Music  /  MR MUSIC MACK | product reveal music, project launch music, corporate presentation soundtrack |
| /the-collection | Music & Creative Work Portfolio  /  MR MUSIC MACK | music editing samples, wedding mashup demo, creative studio portfolio |
| /the-studio | About Our Creative Studio in Jaipur  /  MR MUSIC MACK | music editing studio Jaipur, MR MUSIC MACK studio, audio production Sodala |
| /lets-connect | Contact & Project Enquiries Jaipur  /  MR MUSIC MACK | contact MR MUSIC MACK, music editing quote, choreography enquiry Jaipur |

## What is implemented

- Unique service titles, descriptions, keywords and social sharing metadata in pre-rendered HTML.
- Canonical URLs consolidate /about, /contact and /our-work onto their main pages; aliases and unfinished policy pages are excluded from the sitemap.
- Consistent ProfessionalService and WebSite entities, service-specific Service nodes, ContactPage, AboutPage and breadcrumbs. No invented reviews, prices, awards, hours or map coordinates.
- Inline JSON-LD remains where React renders it to preserve hydration. Choreography FAQ markup matches existing visible questions; FAQ rich-result eligibility is not promised.
- Useful service navigation replaces keyword and city lists. Landing page H1 headings identify the service.
- A generated noindex 404 page, real HTTP 404 handling and legacy-page redirects. Netlify rules are included; other hosting must use equivalent routes.
- Backend default metadata is synchronized. Only saved metadata matching the old generated defaults is upgraded; explicit CMS edits are preserved.
- Homepage hero image receives high fetch priority. Large images/videos still need field performance measurement before claiming Core Web Vitals improvements.

## Deployment and validation

1. Build frontend with npm run build and upload all dist contents together. Deploy backend config/seo.js, Models/siteContent.js, services/siteContentStore.js and Routes/staticRoutes.js, then restart Node.
2. Pick https://mrmusicmack.com as the preferred host (or set VITE_SITE_URL consistently at build time). Configure the www host to redirect public pages to the preferred host. Keep /api and /media reverse proxy rules working; do not redirect API preflights between hostnames.
3. Upload dist/404.html and configure unknown URLs to return it with HTTP 404. For nginx, use try_files for actual static pages and an error_page 404; never turn all unknown URLs into homepage HTTP 200 responses. Existing CMS routes must continue to reach the Node backend.
4. Verify /sitemap.xml, /robots.txt, main service canonical tags and one unknown path. Confirm pending policy pages remain noindex. Purge stale HTML/CDN caches.
5. Verify site ownership in Google Search Console. Submit /sitemap.xml and request indexing for the homepage and main services. Inspect rendered HTML and canonical selection. No verification token has been invented or added.
6. Test representative URLs in Google's Rich Results Test. Check Search Console indexing and structured data reports after recrawling.
7. Measure mobile Core Web Vitals with PageSpeed Insights and real field data. Compress oversized below-the-fold media and use responsive assets where measurements show an issue; preserve the visual design.

## Lead measurement and ongoing work

- Configure GA4 (with the appropriate consent/privacy setup) and mark a confirmed successful form submission as generate_lead. WhatsApp or phone clicks measure contact intent, not completed enquiries. No analytics account or live customer event was created during this task.
- Link a verified Google Business Profile to the canonical website. Keep the business name, Jaipur address and phone consistent. Confirm actual hours, service areas and booking arrangements before publishing them.
- Add real, permissioned case studies with project context and outcomes. Label demonstrations and illustrative assets honestly. Request authentic reviews from customers; do not manufacture ratings.
- Track Search Console impressions, clicks and enquiries by landing page. Compare lead quality over time and improve pages that attract mismatched searches. Search volume, backlinks, Business Profile management and Search Console access require separate account/data access.
- Rankings and enquiry counts cannot be guaranteed. Changes must be deployed and recrawled before search results can change.

## Official references

- https://developers.google.com/search/docs/crawling-indexing/special-tags
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/essentials/spam-policies
