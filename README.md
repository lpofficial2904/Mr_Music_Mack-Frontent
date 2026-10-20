# Frontend

Public website built with React, Vite and Framer Motion. Keep website source, assets, dependencies and build configuration here.

- `src/App.jsx`: App layout, motion setup and shared project dialog state.
- `src/components/PageContent.jsx`: Page selection, metadata and lazy page loading.
- `src/components/Navbar.jsx`: Complete responsive navbar.
- `src/components/Hero.jsx`: Complete hero and production timeline visual.
- `src/components/Footer.jsx`: Website footer.
- `src/components/ProjectCTA.jsx`: Final project section and mobile contact actions.
- `src/components/StudioSections.jsx`: Shared service page sections.
- `src/components/OurWork.jsx` and `AudioPlayer.jsx`: Audio portfolio and playback.
- `src/components/ProjectBriefModal.jsx`: Contact form and project dialog UI.
- `src/siteData.js`: Website content and form options.
- `src/index.css`: Website styles and responsive layouts.
- `scripts/`: Website build verification, HTML prerendering and sample audio generation.

Run `npm install`, then `npm run dev`. Website content, live events, project brief
submissions and uploaded media use `https://mrmusicmack.com/api/` by default.
Vite proxies `/api` and `/media` to this backend during development; no local
Backend is required. Form submissions go to the live website.

Set `VITE_API_BASE_URL` in `Frontend/.env` to override the backend, then restart
Vite or rebuild. A backend origin or its `/api/` URL is accepted. For a local
backend, use `VITE_API_BASE_URL=http://127.0.0.1:3001/api`.

Validation: `npm run build`, `npm run lint`, then `npm test`.
The build generates 17 static pages in `dist/` and removes its temporary `.prerender/` bundle. `src/entry-server.jsx` renders website HTML at build time; it is not the booking API.

Booking APIs, uploads and private customer data belong in `Backend/`. Admin dashboard code belongs in `Admin/`, which is reserved until that feature is implemented.

Audio samples are synthesized demonstrations, not client recordings. `npm run generate:demos` recreates them. Studio illustrations are AI-generated; service pages also use illustrative stock images. `public/logo.jpg` is the original brand artwork embedded in the website and favicon SVGs.

Uploaded website media uses `VITE_MEDIA_BASE_URL` (default:
`https://admin.mrmusicmack.com`). The public website serves static files while the
admin backend owns `/media`. `VITE_API_BASE_URL` continues to select the content API.
For a custom backend, uploaded media defaults to that API origin unless overridden.
