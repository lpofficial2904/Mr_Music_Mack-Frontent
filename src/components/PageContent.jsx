import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { createChoreographerSchema, landingPages } from "../siteData";
import ProjectCTA from "./ProjectCTA";
import ServiceGallery from "./ServiceGallery";
import ManagedPageMedia from "./ManagedPageMedia";
import { policyPages } from "../policyPages";
import { seoPages as seoByPath, canonicalPath } from "../seo";
import { createPageSchema } from "../seoSchema";

const choreographerHeroImage =
  "/costume-gallery/costume-wedding-sangeet-performance.jpg";

const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PolicyPage = lazy(() => import("../pages/PolicyPage"));

export default function PageContent({
  path,
  query,
  onStart: startProject,
  siteContent,
}) {
  const policy = policyPages[path];
  const contentPage = siteContent?.pages?.[path];
  const service = contentPage
    ? { ...landingPages[path], ...contentPage }
    : landingPages[path];
  const pagePublished =
    contentPage?.published !== false &&
    !siteContent?.hiddenPages?.includes(path);
  const isHome = path === "/";
  const isStudio = path === "/the-studio";
  const isCollection = path === "/the-collection" || path === "/our-work";
  const isContact = path === "/lets-connect" || path === "/contact";
  const isCostumeDesign = path === "/costume-design";
  const isChoreographer = path === "/choreographer";
  const isMusicEditing = path === "/music-editing";
  const pageNames = {
    "/": "Music Editing Studio in Jaipur",
    "/music-editing": "Professional Music Editing",
    "/background-music": "Custom Background Music Production",
    "/choreographer": "Choreographer",
    "/services": "Music Editing & Audio Production Services",
    "/wedding-performance-music": "Wedding & Performance Music",
    "/the-collection": "The Collection",
    "/our-work": "Our Work & Audio Demonstrations",
    "/the-studio": "The Studio",
    "/about": "About Our Jaipur Studio",
    "/lets-connect": "Let’s Connect",
    "/contact": "Start Your Project",
  };
  const pageName =
    policy?.title || service?.name || pageNames[path] || "Page Not Found";
  const seo = policy
    ? {
        title: `${policy.title} | MR MUSIC MACK`,
        description: policy.description,
      }
    : seoByPath[canonicalPath(path)];
  const pageDescription = isHome
    ? service?.description ||
      seo?.description ||
      "Jaipur-based music editing studio serving clients across India. Wedding and sangeet mashups, dance performance tracks, DJ remixes, background music and mix & mastering."
    : service?.description ||
      seo?.description ||
      "MR MUSIC MACK: music audio editing, mashups, DJ remixes, mix & mastering and custom performance tracks for weddings, events, schools and colleges in Jaipur.";

  const found =
    pagePublished &&
    (Boolean(policy) ||
      Object.hasOwn(pageNames, path) ||
      Object.hasOwn(landingPages, path) ||
      Boolean(contentPage));
  const siteUrl = (
    import.meta.env.VITE_SITE_URL || "https://mrmusicmack.com"
  ).replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}${canonicalPath(path) === "/" ? "" : canonicalPath(path)}`;
  const socialImage = isChoreographer
    ? `${siteUrl}${choreographerHeroImage}`
    : isMusicEditing
      ? `${siteUrl}/main-service-cards/music-editing.jpg`
      : `${siteUrl}/logo.jpg`;
  const metaTitle = found
    ? service?.seoTitle || seo?.title || `${pageName} | MR MUSIC MACK`
    : "Page Not Found | MR MUSIC MACK";
  const metaDescription = found
    ? service?.seoDescription || seo?.description || pageDescription
    : "This page is not available.";
  const schema = found
    ? createPageSchema({
        siteUrl,
        path: canonicalPath(path),
        pageName,
        description: metaDescription,
        settings: siteContent?.settings,
        policy: Boolean(policy),
        choreographer: isChoreographer
          ? createChoreographerSchema(siteUrl, metaDescription)
          : null,
      })
    : null;
  const schemaJson = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {found && <link rel="canonical" href={canonicalUrl} />}
        <meta
          name="robots"
          content={
            !found || policy?.pending
              ? "noindex, follow"
              : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          }
        />
        {found && <meta property="og:type" content="website" />}
        {found && (
          <meta
            property="og:site_name"
            content={siteContent?.settings?.brandName || "MR MUSIC MACK"}
          />
        )}
        {found && <meta property="og:locale" content="en_IN" />}
        {found && <meta property="og:title" content={metaTitle} />}
        {found && <meta property="og:description" content={metaDescription} />}
        {found && <meta property="og:url" content={canonicalUrl} />}
        {found && <meta property="og:image" content={socialImage} />}
        {found && (
          <meta
            property="og:image:alt"
            content={
              isChoreographer
                ? "Wedding and sangeet choreography from the MR MUSIC MACK collection"
                : `${pageName} at MR MUSIC MACK`
            }
          />
        )}
        {found && <meta name="twitter:card" content="summary_large_image" />}
        {found && <meta name="twitter:title" content={metaTitle} />}
        {found && <meta name="twitter:description" content={metaDescription} />}
        {found && <meta name="twitter:image" content={socialImage} />}
        {found && seo?.keywords && (
          <meta name="keywords" content={seo.keywords} />
        )}
        {schema && (
          <script
            type="application/ld+json"
            data-page-seo={isChoreographer ? "choreographer" : undefined}
          >
            {schemaJson}
          </script>
        )}
      </Helmet>
      <Suspense
        fallback={
          <div className="page-loading wrap" role="status">
            Loading your next sound...
          </div>
        }
      >
        {!found ? (
          <section className="wrap not-found">
            <p className="eyebrow">404 / A LITTLE OFFBEAT</p>
            <h1>This page is not available.</h1>
            <p>Let's get you back to the music.</p>
            <Link className="button primary" to="/">
              Back to home ↗
            </Link>
          </section>
        ) : policy ? (
          <PolicyPage path={path} />
        ) : isHome ? (
          <HomePage onStart={startProject} siteContent={siteContent} />
        ) : isContact ? (
          <ContactPage query={query} siteContent={siteContent} path={path} />
        ) : (
          <ServicePage
            path={path}
            query={query}
            pageName={pageName}
            onStart={startProject}
            siteContent={siteContent}
          />
        )}
      </Suspense>

      {found && !policy && !isHome && !isCollection && (
        <ManagedPageMedia
          page={contentPage}
          excludeAudio={
            isMusicEditing ||
            path === "/background-music" ||
            Boolean(
              landingPages[path] &&
                path !== "/choreographer" &&
                path !== "/costume-design",
            )
          }
        />
      )}

      {found && !policy && !isStudio && !isCollection && (
        <ProjectCTA
          onStart={startProject}
          type={
            isCostumeDesign
              ? "Costume Design"
              : isChoreographer
                ? "Choreographer"
                : "Music Editing"
          }
          need={
            isCostumeDesign
              ? "Costume Design"
              : isChoreographer
                ? "Choreography"
                : ""
          }
        />
      )}
      {found &&
        isHome &&
        siteContent?.home?.sections?.serviceGallery !== false && (
          <ServiceGallery siteContent={siteContent} />
        )}
    </>
  );
}
