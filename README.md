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

Run `npm install`, then `npm run dev`. Start `../Backend` for project brief submissions; Vite proxies `/api` to port 3001.

Validation: `npm run build`, `npm run lint`, then `npm test`.
The build generates 17 static pages in `dist/` and removes its temporary `.prerender/` bundle. `src/entry-server.jsx` renders website HTML at build time; it is not the booking API.

Booking APIs, uploads and private customer data belong in `Backend/`. Admin dashboard code belongs in `Admin/`, which is reserved until that feature is implemented.

Audio samples are synthesized demonstrations, not client recordings. `npm run generate:demos` recreates them. Studio illustrations are AI-generated; service pages also use illustrative stock images. `public/logo.jpg` is the original brand artwork embedded in the website and favicon SVGs.