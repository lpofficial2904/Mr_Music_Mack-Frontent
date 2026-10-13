import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";
import { landingPages } from "../src/siteData.js";

const routes = [...new Set([
  "/",
  "/music-editing",
  "/background-music",
  "/services",
  "/wedding-performance-music",
  "/the-collection",
  "/the-studio",
  "/lets-connect",
  "/our-work",
  "/about",
  "/contact",
  ...Object.keys(landingPages),
])];
const dist = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", dist), "utf8");
const siteUrl = (process.env.VITE_SITE_URL || "https://mrmusicmack.com").replace(
  /\/$/,
  "",
);
const defaultHeadPattern =
  /<title>[\s\S]*?<\/title>\s*<meta\s+name="description"[^>]*\/>/;

for (const route of routes) {
  const rendered = await render(route);
  const markup = typeof rendered === "string" ? rendered : rendered.html;
  const helmet = typeof rendered === "string" ? null : rendered.helmet;
  const fallbackTitle = markup.match(/<title>[\s\S]*?<\/title>/)?.[0] || "";
  const fallbackDescription =
    markup.match(/<meta\s+name="description"[^>]*\/>/)?.[0] || "";
  let cleanMarkup = markup.replace(fallbackTitle, "").replace(fallbackDescription, "");
  const bodyHeadTags = [];
  cleanMarkup = cleanMarkup
    .replace(/<meta\b[^>]*\/>/g, (tag) => {
      bodyHeadTags.push(tag);
      return "";
    })
    .replace(/<link\s+rel="canonical"[^>]*\/>/g, (tag) => {
      bodyHeadTags.push(tag);
      return "";
    })
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, (tag) => {
      bodyHeadTags.push(tag);
      return "";
    });
  const helmetHead = helmet
    ? [
        helmet.title.toString(),
        helmet.priority.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : [fallbackTitle, fallbackDescription].filter(Boolean).join("\n    ");
  const headTags = [...new Set([helmetHead, ...bodyHeadTags].filter(Boolean))]
    .join("\n    ");
  const html = template
    .replace(defaultHeadPattern, headTags)
    .replace('<div id="root"></div>', `<div id="root">${cleanMarkup}</div>`);
  const folder = new URL(route === "/" ? "./" : `.${route}/`, dist);
  await mkdir(folder, { recursive: true });
  await writeFile(new URL("index.html", folder), html);
}

const sitemapEntries = routes
  .map((route) => {
    const location = `${siteUrl}${route === "/" ? "" : route}`;
    return `  <url><loc>${location.replaceAll("&", "&amp;")}</loc></url>`;
  })
  .join("\n");
await writeFile(
  new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);
await writeFile(
  new URL("robots.txt", dist),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
console.log(
  `Pre-rendered ${routes.length} pages with page-specific content and metadata; generated sitemap and robots.txt.`,
);

// Remove the temporary render bundle after HTML generation.
await rm(new URL("../.prerender/", import.meta.url), {
  recursive: true,
  force: true,
});
