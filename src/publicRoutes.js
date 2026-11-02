import { landingPages } from "./siteData.js";
import { policyPages } from "./policyPages.js";
import { seoPages, routeAliases } from "./seo.js";

export const publicRoutes = [
  ...new Set([
    ...Object.keys(seoPages),
    ...Object.keys(routeAliases),
    ...Object.keys(landingPages),
    ...Object.keys(policyPages),
  ]),
];
