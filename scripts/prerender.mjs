import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";
import {
  choreographerSeo,
  createChoreographerSchema,
  landingPages,
} from "../src/siteData.js";

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
for (const route of routes) {
  let markup = await render(route);
  const title = markup.match(/<title>[\s\S]*?<\/title>/)?.[0] || "";
  const description =
    markup.match(/<meta\s+name="description"[^>]*\/>/)?.[0] || "";
  markup = markup.replace(title, "").replace(description, "");
  const headTags = [];
  if (route === "/choreographer") {
    const canonicalUrl = `${siteUrl}/choreographer`;
    const socialImage = `${siteUrl}/costume-gallery/costume-wedding-sangeet-performance.jpg`;
    const attributes = (values) =>
      Object.entries({ ...values, "data-page-seo": "choreographer" })
        .map(([name, value]) => `${name}="${String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`)
        .join(" ");
    const meta = (values) => `<meta ${attributes(values)} />`;
    headTags.push(
      `<link ${attributes({ rel: "canonical", href: canonicalUrl })} />`,
      meta({
        name: "robots",
        content: "index, follow, max-image-preview:large",
      }),
      meta({ property: "og:type", content: "website" }),
      meta({ property: "og:title", content: choreographerSeo.title }),
      meta({ property: "og:description", content: choreographerSeo.description }),
      meta({ property: "og:url", content: canonicalUrl }),
      meta({ property: "og:image", content: socialImage }),
      meta({
        property: "og:image:alt",
        content: "Wedding and sangeet choreography from the MR MUSIC MACK collection",
      }),
      meta({ name: "twitter:card", content: "summary_large_image" }),
      meta({ name: "twitter:title", content: choreographerSeo.title }),
      meta({ name: "twitter:description", content: choreographerSeo.description }),
      meta({ name: "twitter:image", content: socialImage }),
      meta({ name: "keywords", content: choreographerSeo.keywords }),
      `<script type="application/ld+json" data-page-seo="choreographer">${JSON.stringify(
        createChoreographerSchema(siteUrl, choreographerSeo.description),
      ).replaceAll("<", "\\u003c")}</script>`,
    );
  }
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, title)
    .replace(/<meta\s+name="description"[^>]*\/>/, description)
    .replace("</head>", `${headTags.join("\n    ")}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
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
