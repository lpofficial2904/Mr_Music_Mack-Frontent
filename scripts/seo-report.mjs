import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { publicRoutes } from "../src/publicRoutes.js";
import { seoStrategy } from "../src/seoStrategy.js";
import { canonicalPath, routeAliases } from "../src/seo.js";
import { policyPages } from "../src/policyPages.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const decode = (text) =>
  text
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const rows = publicRoutes.map((path) => {
  const html = readFileSync(join(dist, path, "index.html"), "utf8");
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const schema = JSON.parse(
    html.match(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
    )?.[1] || "null",
  );
  const strategy = seoStrategy[canonicalPath(path)];
  const links = [...html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)]
    .map((match) => match[1].replace(/\/$/, "") || "/")
    .filter((path) => publicRoutes.includes(path));
  const assets = [
    ...html.matchAll(/(?:src|poster)="(\/[^"?#]*)(?:[?#][^"]*)?"/g),
  ].map((match) => match[1]);
  return {
    path,
    canonical,
    redirectTo: routeAliases[path] || null,
    indexable: !routeAliases[path] && !policyPages[path]?.pending,
    primaryKeyword: strategy?.primary || policyPages[path]?.title || "",
    secondaryKeywords: strategy?.secondary || [],
    longTail: strategy?.longTail || "Not targeted: legal information",
    intent: strategy?.intent || "Informational / legal",
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""),
    description: decode(
      html.match(/name="description" content="([^"]*)"/)?.[1] || "",
    ),
    h1: decode(html.match(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/)?.[1] || ""),
    robots: html.match(/name="robots" content="([^"]*)"/)?.[1],
    schemaTypes: [
      ...new Set((schema?.["@graph"] || []).map((node) => node["@type"])),
    ],
    inSitemap:
      sitemap.includes(`<loc>${canonical}</loc>`) && !routeAliases[path],
    links,
    brokenLocalAssets: assets.filter(
      (asset) => !existsSync(resolve(dist, `.${decodeURIComponent(asset)}`)),
    ),
    imagesMissingAlt: [...html.matchAll(/<img\b[^>]*>/g)].filter(
      ([tag]) => !/\balt=/.test(tag),
    ).length,
  };
});
const reachable = new Set(["/"]);
const queue = ["/"];
while (queue.length) {
  const path = queue.shift();
  const row = rows.find((row) => row.path === path);
  for (const link of row?.links || [])
    if (!reachable.has(link)) {
      reachable.add(link);
      queue.push(link);
    }
}
const orphanPages = rows
  .filter((row) => row.indexable && !reachable.has(row.path))
  .map((row) => row.path);
const duplicates = (key) =>
  rows
    .filter((row) => row.indexable)
    .filter(
      (row, index, all) =>
        all.findIndex((other) => other[key] === row[key]) !== index,
    )
    .map((row) => row.path);
const duplicateTitles = duplicates("title");
const duplicateDescriptions = duplicates("description");
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else
      files.push({
        file: path.slice(dist.length + 1).replaceAll("\\", "/"),
        bytes: statSync(path).size,
      });
  }
}
walk(dist);
const result = {
  publicPages: rows.length,
  indexablePages: rows.filter((row) => row.indexable).length,
  aliasPages: Object.keys(routeAliases).length,
  noindexPolicyPages: rows.filter((row) => policyPages[row.path]?.pending)
    .length,
  orphanPages,
  duplicateTitles,
  duplicateDescriptions,
  brokenAssets: rows.flatMap((row) => row.brokenLocalAssets),
  imagesMissingAlt: rows.reduce((sum, row) => sum + row.imagesMissingAlt, 0),
  performance: {
    note: "Static transfer-size inventory only. This is not measured LCP, INP, CLS or a Lighthouse score.",
    largestFiles: [...files].sort((a, b) => b.bytes - a.bytes).slice(0, 15),
    javascriptBytes: files
      .filter((f) => f.file.endsWith(".js"))
      .reduce((s, f) => s + f.bytes, 0),
  },
  pages: rows,
};
mkdirSync(join(root, "docs"), { recursive: true });
writeFileSync(
  join(root, "docs/seo-validation.json"),
  JSON.stringify(result, null, 2),
);
writeFileSync(
  join(root, "docs/SEO-KEYWORD-MAP.md"),
  `# Page-to-keyword and metadata map\n\nGenerated from the actual build. Targets are editorial opportunities; search volume, difficulty and rankings have not been fabricated. Alias URLs share their destination's search intent rather than competing separately. Legal pages are informational, not sales keyword landing pages.\n\n${rows.map((row) => `## ${row.path}\n\n- Primary: ${row.primaryKeyword}\n- Secondary: ${row.secondaryKeywords.join("; ") || "Not targeted: legal information"}\n- Long-tail: ${row.longTail}\n- Intent: ${row.intent}${row.redirectTo ? " (redirect alias; no independent keyword campaign)" : ""}\n- Title: ${row.title}\n- Description: ${row.description}\n- Rendered H1: ${row.h1}\n- Canonical: ${row.canonical}\n- Schema: ${row.schemaTypes.join(", ")}\n- Indexing: ${row.redirectTo ? "301 to " + row.redirectTo : row.robots}\n`).join("\n")}`,
);
if (
  result.brokenAssets.length ||
  result.imagesMissingAlt ||
  orphanPages.length ||
  duplicateTitles.length ||
  duplicateDescriptions.length
) {
  console.error(
    JSON.stringify({
      brokenAssets: result.brokenAssets,
      imagesMissingAlt: result.imagesMissingAlt,
      orphanPages,
    }),
  );
  process.exitCode = 1;
} else
  console.log(
    `PASS: report generated for ${rows.length} routes; ${result.indexablePages} indexable, no local asset errors, missing alt attributes or indexable orphan pages.`,
  );
