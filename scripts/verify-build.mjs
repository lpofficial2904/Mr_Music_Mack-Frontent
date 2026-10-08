import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const pages = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === "index.html") pages.push(file);
  }
}
walk(root);
const titles = new Set();
let links = 0;
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1: ${file}`);
  assert.equal((html.match(/<title>/g) || []).length, 1, `One title: ${file}`);
  assert.equal(
    (html.match(/name="description"/g) || []).length,
    1,
    `One description: ${file}`,
  );
  const title = html.match(/<title>(.*?)<\/title>/s)[1];
  assert.ok(!titles.has(title), `Unique title: ${file}`);
  titles.add(title);
  assert.ok(html.includes("+91 98875 63201"));
  assert.ok(html.includes("mrmusicmack@gmail.com"));
  assert.ok(!html.includes("919876543210"));
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g,
  )) {
    const target = join(root, decodeURIComponent(match[1]));
    assert.ok(
      existsSync(target) || existsSync(join(target, "index.html")),
      `Missing internal target: ${match[1]}`,
    );
    links++;
  }
}
const choreographerHtml = readFileSync(
  join(root, "choreographer", "index.html"),
  "utf8",
);
const choreographerHead = choreographerHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] || "";
assert.ok(
  choreographerHead.includes(
    "Wedding &amp; Sangeet Choreographer Jaipur | MR MUSIC MACK",
  ),
  "Choreographer page title is search-focused",
);
assert.ok(
  choreographerHead.includes(
    "Wedding &amp; sangeet choreography in Jaipur by MR MUSIC MACK.",
  ),
  "Choreographer page description is present",
);
assert.equal(
  (choreographerHead.match(/rel="canonical"/g) || []).length,
  1,
  "Choreographer page has one canonical URL in the head",
);
assert.ok(choreographerHead.includes('property="og:image"'));
assert.ok(choreographerHead.includes('name="twitter:image"'));
const choreographerSchemaText = choreographerHead.match(
  /<script type="application\/ld\+json" data-page-seo="choreographer">([\s\S]*?)<\/script>/,
)?.[1];
assert.ok(choreographerSchemaText, "Choreographer structured data is in the head");
const choreographerSchema = JSON.parse(choreographerSchemaText);
assert.ok(choreographerSchema["@graph"].some((item) => item["@type"] === "Service"));
assert.ok(
  choreographerSchema["@graph"].some(
    (item) => item["@type"] === "BreadcrumbList",
  ),
);
const faqSchema = choreographerSchema["@graph"].find(
  (item) => item["@type"] === "FAQPage",
);
assert.equal(faqSchema?.mainEntity?.length, 10, "FAQ schema matches visible FAQs");
assert.ok(
  choreographerHtml.includes(
    "<h1>Wedding &amp; Sangeet Choreographer in Jaipur</h1>",
  ),
  "Choreographer page has the requested semantic H1 in prerendered HTML",
);
assert.ok(
  choreographerHtml.includes(
    "Every Beat Has a Story. Every Move Creates a Memory.",
  ),
);
assert.ok(choreographerHtml.includes("Explore Our Wedding &amp; Dance Performance Projects."));
assert.ok(choreographerHtml.includes("Illustrative thumbnail for Bride Expressions"));
for (const filename of [
  "bride-expressions.mp4",
  "couple-chemistry.mp4",
  "sangeet-squad-practice.mp4",
  "varmala-execution.mp4",
]) {
  assert.ok(
    choreographerHtml.includes(`/collection-videos/${filename}`),
    `Featured choreography video is prerendered: ${filename}`,
  );
  assert.ok(
    existsSync(join(root, "collection-videos", filename)),
    `Featured choreography video asset exists: ${filename}`,
  );
}
assert.ok(choreographerHtml.includes("How much does wedding choreography cost in Jaipur?"));
const canonicalUrl = choreographerHead.match(
  /<link rel="canonical" href="([^"]+)"/,
)?.[1];
assert.ok(canonicalUrl, "Choreographer canonical URL is present");
const siteUrl = canonicalUrl.replace(/\/choreographer$/, "");
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const robots = readFileSync(join(root, "robots.txt"), "utf8");
assert.ok(sitemap.includes(`${siteUrl}/choreographer`));
assert.ok(robots.includes(`${siteUrl}/sitemap.xml`));
for (const name of readdirSync(join(root, "samples"))) {
  const audio = readFileSync(join(root, "samples", name));
  assert.equal(audio.toString("ascii", 0, 4), "RIFF");
  assert.equal(audio.readUInt32LE(4), audio.length - 8);
  assert.ok(audio.readUInt32LE(40) > 0);
}
console.log(
  `PASS: ${pages.length} pages, unique titles, descriptions, one H1 each, ${links} internal links/assets and valid WAV files.`,
);
