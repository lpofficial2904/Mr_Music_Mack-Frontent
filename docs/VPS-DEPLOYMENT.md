# VPS release and rollback guide

This is a reviewed procedure, not an executed deployment. The existing nginx configuration, installation paths, process manager, TLS paths and upstream ports were not provided. Do not replace them with guesses. The application uses native Node HTTP, not Express. Node 22+ is declared by the backend; use the version already verified for this Vite build.

## Prepare without touching production

Reviewed application revisions for this handoff:

- Frontend: `3fd4a1d93066618e6ea09ba0fbc7dd6b19e5cc55`
- Backend: `395ce69eb3a1699342b30280e066058d547e7ed6`

Use these exact application revisions or the later documentation-only frontend commit. On the VPS, identify the actual repo, release, data, environment and nginx configuration paths and the existing backend process manager. Keep `.env`, uploads, sessions and customer data outside disposable release directories.

Use separate release checkouts rather than running `git pull` over a live working directory:

```bash
# Set these to reviewed, absolute VPS paths and the exact handoff commit hashes.
: "${RELEASE_ROOT:?Set a new, unused release directory}"
: "${FRONTEND_COMMIT:?Set frontend commit hash}"
: "${BACKEND_COMMIT:?Set backend commit hash}"
test ! -e "$RELEASE_ROOT" || exit 1
mkdir -p "$RELEASE_ROOT"
git clone https://github.com/lpofficial2904/Mr_Music_Mack-Frontent.git "$RELEASE_ROOT/frontend"
git clone https://github.com/lpofficial2904/Mr_Music_Mack-Backend.git "$RELEASE_ROOT/backend"
git -C "$RELEASE_ROOT/frontend" checkout --detach "$FRONTEND_COMMIT"
git -C "$RELEASE_ROOT/backend" checkout --detach "$BACKEND_COMMIT"
cd "$RELEASE_ROOT/frontend"
npm ci
npm run build
npm test
cd "$RELEASE_ROOT/backend"
npm ci
npm test
cd "$RELEASE_ROOT/frontend"
BACKEND_ROOT="$RELEASE_ROOT/backend" npm run test:http
```

Preserve reviewed frontend build-time environment settings before building. `VITE_SITE_URL` must be the HTTPS origin `https://mrmusicmack.com`; do not place SMTP or private credentials in any `VITE_*` variable. No tracking ID is needed for the build. The report task is `npm run seo:report` after the build.

## Backup before an approved release

Use the VPS provider's snapshot/backup facility where available. Record the running commit hashes, actual process working directory, service configuration and nginx config. Make a private backup of the current frontend build and backend release, plus the backend data and environment files. Restrict backups containing customer data or credentials to the operator; do not commit or upload them to GitHub. Verify that the backup can be read before switching releases.

## Application paths

The backend defaults to `../Frontend/dist` and `../Admin/dist`. If your release uses `frontend/` instead, explicitly configure the existing process wrapper to call `createServer({ frontendDir: '<absolute release frontend/dist>', dataDir: '<existing persistent data directory>', adminDir: '<existing admin build>' })`, or retain the currently deployed folder layout. Do not silently move customer data or create a fresh empty data directory. The repository's `server.js` supports `FRONTEND_DIR`, `ADMIN_DIR` and `DATA_DIR` for the CLI; set these to the reviewed absolute paths in the existing service environment.

## Nginx review and cutover

`deploy/nginx.example.conf` is a reference to merge into the existing public-host config. It is not an auto-install script. Keep the separate admin host, ACME renewal rules, certificates and security settings. Public HTML is proxied to Node so aliases, slash canonicalization and CMS metadata remain consistent. `/api` must continue working on both HTTPS hostnames without cross-host preflight redirects. `/media` must keep range/seek support. The live audit found that HTTP currently remains HTTP and public no-slash URLs redirect to trailing-slash alternatives; these are confirmed priorities, not guessed Search Console issues.

After explicit production approval, point the existing process manager at the reviewed release, preserve its environment/data paths and restart that backend process using its actual systemd unit or PM2 name. Run `sudo nginx -t` on the merged config. Reload nginx only after it passes. No process-manager name or server path is invented here.

## Acceptance checks

```bash
curl -I http://mrmusicmack.com/lets-connect
curl -I https://www.mrmusicmack.com/lets-connect
curl -I https://mrmusicmack.com/lets-connect/
curl -I https://mrmusicmack.com/lets-connect
curl -I https://mrmusicmack.com/does-not-exist
curl -I https://mrmusicmack.com/sitemap.xml
curl -I https://mrmusicmack.com/robots.txt
curl -i -X OPTIONS https://mrmusicmack.com/api/briefs \
  -H 'Origin: https://www.mrmusicmack.com' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'
```

Expected: HTTP and www public URLs redirect to canonical HTTPS; trailing slash redirects to the no-slash URL; canonical page returns 200; missing page returns 404/noindex; sitemap XML and robots text return 200; API preflight returns 204 with the allowed origin. Confirm title, description, schema and one canonical in View Source. Test media playback and the enquiry form with an approved test submission, including failure feedback; no live form was submitted during this audit. Clear only stale HTML caches; ship matching HTML and assets together. A public PageSpeed run and Search Console field metrics are still needed before claiming good CWV.

## Rollback

Keep the previous release and build. If acceptance checks fail, point the existing process manager back to that release, restore its previous environment/path configuration, and restart it. Restore the previous nginx config, run `sudo nginx -t`, then reload nginx. Do not restore an old customer-data backup over new enquiries unless an operator has separately approved a data recovery plan. No destructive cleanup is required for rollback.
