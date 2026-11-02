import { seoPages } from "./seo.js";

export function createPageSchema({
  siteUrl,
  path,
  pageName,
  description,
  settings,
  policy,
  choreographer,
}) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const businessId = `${siteUrl}/#business`;
  const websiteId = `${siteUrl}/#website`;
  const name = settings?.brandName || "MR MUSIC MACK";
  const business = {
    "@type": "ProfessionalService",
    "@id": businessId,
    name,
    url: siteUrl,
    description:
      "Music editing, audio production, wedding choreography and costume design from Jaipur, with online project enquiries.",
    telephone: settings?.phone || "+919887563201",
    email: settings?.email || "mrmusicmack@gmail.com",
    logo: new URL(settings?.logo || "/brand-logo.svg", siteUrl).href,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "Shyam Nagar, Sodala",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Project enquiries",
      telephone: settings?.phone || "+919887563201",
      url: `${siteUrl}/lets-connect`,
    },
  };
  const type = policy
    ? "WebPage"
    : path === "/lets-connect"
      ? "ContactPage"
      : path === "/the-studio"
        ? "AboutPage"
        : ["/services", "/the-collection"].includes(path)
          ? "CollectionPage"
          : "WebPage";
  const graph = [
    business,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name,
      publisher: { "@id": businessId },
      inLanguage: "en-IN",
    },
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name: pageName,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      inLanguage: "en-IN",
    },
  ];
  if (path !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: pageName, item: url },
      ],
    });
  const servicePaths = Object.keys(seoPages).filter(
    (p) =>
      ![
        "/",
        "/services",
        "/the-studio",
        "/the-collection",
        "/lets-connect",
        "/wedding-performance-music",
      ].includes(p),
  );
  if (servicePaths.includes(path))
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: pageName,
      description,
      url,
      provider: { "@id": businessId },
      areaServed: business.areaServed,
      mainEntityOfPage: { "@id": `${url}#webpage` },
    });
  if (path === "/services" || path === "/")
    graph.push({
      "@type": "OfferCatalog",
      "@id": `${siteUrl}/#services`,
      name: "Music and creative services",
      itemListElement: servicePaths.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: seoPages[p].title.split(" | ")[0],
          url: `${siteUrl}${p}`,
          provider: { "@id": businessId },
        },
      })),
    });
  // FAQ content is the same visible content used on the choreography page.
  if (choreographer)
    graph.push(
      ...choreographer["@graph"].filter((node) => node["@type"] === "FAQPage"),
    );
  return { "@context": "https://schema.org", "@graph": graph };
}
