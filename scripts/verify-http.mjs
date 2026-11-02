import assert from "node:assert/strict";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { publicRoutes } from "../src/publicRoutes.js";
import { routeAliases } from "../src/seo.js";
import { policyPages } from "../src/policyPages.js";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const backend =
  process.env.BACKEND_ROOT ||
  resolve(frontend, "../Mr_Music_Mack-Backend-main");
const { createServer } = await import(
  pathToFileURL(join(backend, "server.js")).href
);
const dataDir = await mkdtemp(join(tmpdir(), "mmm-seo-http-"));
const server = createServer({ dataDir, frontendDir: join(frontend, "dist") });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
try {
  for (const route of publicRoutes) {
    const response = await fetch(`${base}${route}`, { redirect: "manual" });
    if (routeAliases[route]) {
      assert.equal(response.status, 301, route);
      assert.equal(response.headers.get("location"), routeAliases[route]);
      continue;
    }
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type"), /text\/html/);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
    assert.equal((html.match(/<title>/g) || []).length, 1, route);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
    assert.equal((html.match(/name="robots"/g) || []).length, 1, route);
    if (policyPages[route]?.pending)
      assert.match(html, /name="robots" content="noindex, follow"/);
    else assert.ok(!html.includes('name="robots" content="noindex'), route);
    if (route !== "/") {
      const trailing = await fetch(`${base}${route}/`, { redirect: "manual" });
      assert.equal(trailing.status, 301, route);
      assert.equal(trailing.headers.get("location"), route);
    }
  }
  const missing = await fetch(`${base}/not-a-real-public-page`);
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get("x-robots-tag"), "noindex, follow");
  const index = await readFile(join(frontend, "dist/index.html"), "utf8");
  const script = index.match(/<script[^>]+src="([^"]+)"/)[1];
  const asset = await fetch(`${base}${script}`, { method: "HEAD" });
  assert.equal(asset.status, 200);
  assert.equal(asset.headers.get("cache-control"), "public, max-age=31536000, immutable");
  for (const [path, type] of [
    ["/robots.txt", "text/plain"],
    ["/sitemap.xml", "application/xml"],
    ["/videos/music-editing-showcase.mp4", "video/mp4"],
  ]) {
    const response = await fetch(`${base}${path}`, { method: "HEAD" });
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("content-type").startsWith(type), path);
  }
  console.log(
    `PASS: ${publicRoutes.length} real backend HTTP routes, aliases, trailing slashes, noindex, 404 and critical content types.`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(dataDir, { recursive: true, force: true });
}
