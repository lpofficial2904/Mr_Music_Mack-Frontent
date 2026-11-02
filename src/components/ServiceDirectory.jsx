import { Link } from "react-router-dom";
import { seoPages } from "../seo";
import { seoStrategy } from "../seoStrategy";

export default function ServiceDirectory({ path }) {
  if (!["/services", "/music-editing", "/background-music"].includes(path))
    return null;
  const excluded = [
    "/",
    "/services",
    "/the-studio",
    "/the-collection",
    "/lets-connect",
    path,
  ];
  const pages = Object.entries(seoStrategy).filter(
    ([href]) =>
      !excluded.includes(href) &&
      (path === "/services" ||
        (path === "/background-music"
          ? href.startsWith("/background-music-")
          : ![
              "/background-music",
              "/choreographer",
              "/costume-design",
            ].includes(href) && !href.startsWith("/background-music-"))),
  );
  return (
    <section className="section wrap" aria-label="Explore service options">
      <p className="eyebrow">FIND THE RIGHT SERVICE</p>
      <h2>
        {path === "/background-music"
          ? "Music for your film, channel or campaign"
          : "Explore services for your project"}
      </h2>
      <div className="journey-grid">
        {pages.map(([href, item]) => (
          <Link className="journey-card" to={href} key={href}>
            <h3>{item.h1}</h3>
            <p>{seoPages[href].description}</p>
            <span>Explore this service &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
