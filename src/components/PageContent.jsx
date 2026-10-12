import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  choreographerSeo,
  createChoreographerSchema,
  landingPages,
  serviceSeoContent,
} from "../siteData";
import ProjectCTA from "./ProjectCTA";
import ServiceGallery from "./ServiceGallery";

const choreographerHeroImage = "/costume-gallery/costume-wedding-sangeet-performance.jpg";

const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));

const seoByPath = {
  "/": {
    title: "Music Editing, Choreographer, Costume Design & Background Music Services in India | MR MUSIC MACK",
    description:
      "MR MUSIC MACK Jaipur provides professional music editing, wedding mashups, DJ remix, background music, choreographer, dance performance music and costume design services online across India.",
    keywords:
      "music editing services India, music editing studio Jaipur, wedding mashup editing India, DJ remix service India, background music production India, choreographer services India, costume design services India",
  },
  "/music-editing": {
    title: "Professional Music Editing, Song Mixing, Mashup & DJ Remix Services in India",
    description:
      "Professional music editing services for song cutting, audio arrangement, mashup editing, DJ remix, mix mastering, dance performance tracks and wedding music across India.",
    keywords:
      "professional music editing India, song editing service, audio editing service India, song cutting and joining, mashup editing India, DJ remix service India, mix mastering India, dance performance music editing",
  },
  "/background-music": {
    title: "Custom Background Music Production for Films, YouTube, Ads & Launches in India",
    description:
      "Custom background music production for short films, YouTube videos, advertisements, brand videos, product launches, presentations and creative projects across India.",
    keywords:
      "background music production India, custom background score India, short film background music, YouTube background music India, advertisement music India, project launch music, brand video music",
  },
  "/choreographer": {
    ...choreographerSeo,
  },
  "/costume-design": {
    title: "Costume Designer in Jaipur | Dance & Stage Costumes | MR MUSIC MACK",
    description:
      "Explore creative costume design in Jaipur by MR MUSIC MACK. Traditional, western, party wear, dance and stage costume concepts for India and beyond.",
    keywords:
      "Costume Designer in Jaipur, custom costume design, dance costume designer, stage costume designer, performance costume design, traditional costume design, western costume design, theme based costume design, wedding performance costume design",
  },
  "/the-collection": {
    title: "The Collection | Music, Choreography & Costume Portfolio | MR MUSIC MACK",
    description:
      "Explore completed music editing, audio production, choreography and costume design projects by MR MUSIC MACK, a Jaipur-based creative studio serving India and worldwide.",
    keywords:
      "MR MUSIC MACK portfolio, music editing portfolio, choreography portfolio, costume design portfolio, Jaipur creative studio, wedding performance projects, audio production India",
  },
  "/the-studio": {
    title: "The Studio | Music Editing & Creative Production | MR MUSIC MACK",
    description:
      "Discover MR MUSIC MACK, a Jaipur-based creative studio offering professional music editing, audio production, choreography and costume design for clients across India and worldwide.",
    keywords:
      "Professional Music Editing Services, Online Music Editing Services, Music Production Studio in Jaipur, Audio Editing Services in India, Custom Music Production, Music Mixing and Mastering Services, Wedding Dance Mashup Editing, Professional Wedding Choreography, Costume Designer in Jaipur, Audio Production Studio Jaipur, Online Audio Editing Worldwide",
  },
  "/wedding-music-editing": {
    title: "Wedding Music Editing & Sangeet Mashup Services in India",
    description:
      "Wedding music editing, bride groom entry songs, sangeet mashups, couple dance tracks and family performance music preparation across India.",
    keywords:
      "wedding music editing India, sangeet mashup service, bride entry music editing, groom entry song editing, couple dance track India",
  },
  "/dance-performance-music-editing": {
    title: "Dance Performance Music Editing Services in India",
    description:
      "Dance performance music editing for choreographers, schools, colleges, weddings and stage events with clean cuts, counts and cues.",
    keywords:
      "dance performance music editing, choreography track editing, school function music editing, college dance music editing, performance track editing India",
  },
  "/song-mixing-mashup": {
    title: "Song Mixing & Mashup Editing Services in India",
    description:
      "Song mixing, mashup editing, multi-song joining, beat matching and clean transition services for weddings, dance and events across India.",
    keywords:
      "song mixing India, mashup editing service, song mashup maker India, beat matching service, music transition editing",
  },
  "/dj-remix": {
    title: "DJ Remix & Song Re-Creation Services in India",
    description:
      "Custom DJ remix, song re-creation, performance remix and creative audio arrangement services for events and dance performances across India.",
    keywords:
      "DJ remix service India, song recreation India, custom remix service, dance remix editing, event remix track",
  },
  "/mix-mastering": {
    title: "Mixing & Mastering Services in India | MR MUSIC MACK",
    description:
      "Mixing and mastering services for songs, performance tracks, remixes and custom audio with balanced loudness and polished final output.",
    keywords:
      "mixing mastering India, audio mastering service, music mixing service India, song mastering, final audio mastering",
  },
  "/custom-music-production": {
    title: "Custom Music Production Services in India | MR MUSIC MACK",
    description:
      "Custom music production for performances, brand videos, content, events and creative projects across India.",
    keywords:
      "custom music production India, original music production, custom audio production, brand music production, event music production",
  },
  "/background-music-for-short-films": {
    title: "Background Music for Short Films in India",
    description:
      "Original background music and custom scores for short films, short movies and cinematic projects across India.",
    keywords:
      "short film background music India, film score service, custom film score, cinematic background music India",
  },
  "/background-music-for-advertisements": {
    title: "Advertisement Background Music Services in India",
    description:
      "Custom music for advertisements, promotional videos, brand campaigns and commercial content across India.",
    keywords:
      "advertisement music India, ad background music, promotional video music, brand campaign music India",
  },
  "/background-music-for-youtube": {
    title: "YouTube Background Music Services in India",
    description:
      "Custom YouTube background music for intros, storytelling, educational videos, narration and branded channels across India.",
    keywords:
      "YouTube background music India, intro music service, storytelling background music, narration music India",
  },
  "/background-music-for-project-launches": {
    title: "Project Launch Music Services in India",
    description:
      "Impactful project launch music for product reveals, business presentations, launch videos and corporate events across India.",
    keywords:
      "project launch music India, product reveal music, corporate launch music, presentation background music",
  },
};

export default function PageContent({ path, query, onStart: startProject, siteContent }) {
  const contentPage = siteContent?.pages?.[path];
  const service = contentPage
    ? { ...landingPages[path], ...contentPage }
    : landingPages[path];
  const pagePublished = contentPage?.published !== false && !siteContent?.hiddenPages?.includes(path);
  const isHome = path === "/";
  const isStudio = path === "/the-studio";
  const isCollection = path === "/the-collection" || path === "/our-work";
  const isContact = path === "/lets-connect" || path === "/contact";
  const isCostumeDesign = path === "/costume-design";
  const isChoreographer = path === "/choreographer";
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
  const pageName = service?.name || pageNames[path] || "Page Not Found";
  const seo = seoByPath[path];
  const serviceSeo = serviceSeoContent[path];
  const pageDescription = isHome
    ? service?.description || seo?.description || "Jaipur-based music editing studio serving clients across India. Wedding and sangeet mashups, dance performance tracks, DJ remixes, background music and mix & mastering."
    : service?.description ||
      seo?.description ||
      "MR MUSIC MACK: music audio editing, mashups, DJ remixes, mix & mastering and custom performance tracks for weddings, events, schools and colleges in Jaipur.";

  const found =
    pagePublished && (Object.hasOwn(pageNames, path) || Object.hasOwn(landingPages, path) || Boolean(contentPage));
  const siteUrl = (import.meta.env.VITE_SITE_URL || "https://mrmusicmack.com").replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}${path === "/" ? "" : path}`;
  const socialImage = `${siteUrl}${choreographerHeroImage}`;
  const metaTitle = found
    ? (service?.seoTitle || seo?.title || `${pageName} | MR MUSIC MACK`)
    : "Page Not Found | MR MUSIC MACK";
  const metaDescription = found
    ? (service?.seoDescription || seo?.description || pageDescription)
    : "This page is not available.";
  const schema = found && isChoreographer
    ? createChoreographerSchema(siteUrl, metaDescription)
    : found
    ? {
        "@context": "https://schema.org",
        "@type": isHome || isStudio ? "LocalBusiness" : isCollection ? "CollectionPage" : "Service",
        name: isHome || isStudio ? "MR MUSIC MACK" : pageName,
        description: metaDescription,
        url: canonicalUrl,
        areaServed: ["Jaipur", "India", "Worldwide"],
        provider: {
          "@type": "LocalBusiness",
          name: "MR MUSIC MACK",
          telephone: "+91 98875 63201",
          email: "mrmusicmack@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
        },
        serviceType: isHome || isStudio
          ? [
              "Music Editing",
              "Wedding Mashup Editing",
              "DJ Remix",
              "Background Music Production",
              "Choreographer Services",
              "Costume Design",
            ]
          : pageName,
      }
    : null;
  const schemaJson = JSON.stringify(schema);

  useEffect(() => {
    if (!found || !isChoreographer) return undefined;

    document.head
      .querySelectorAll('[data-page-seo="choreographer"]')
      .forEach((element) => element.remove());
    const tags = [
      ["link", { rel: "canonical", href: canonicalUrl }],
      ["meta", { name: "robots", content: "index, follow, max-image-preview:large" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: metaTitle }],
      ["meta", { property: "og:description", content: metaDescription }],
      ["meta", { property: "og:url", content: canonicalUrl }],
      ["meta", { property: "og:image", content: socialImage }],
      ["meta", { property: "og:image:alt", content: "Wedding and sangeet choreography from the MR MUSIC MACK collection" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: metaTitle }],
      ["meta", { name: "twitter:description", content: metaDescription }],
      ["meta", { name: "twitter:image", content: socialImage }],
      ["meta", { name: "keywords", content: seo?.keywords || "" }],
    ].map(([tagName, attributes]) => {
      const element = document.createElement(tagName);
      Object.entries(attributes).forEach(([name, value]) => {
        element.setAttribute(name, value);
      });
      element.dataset.pageSeo = "choreographer";
      return element;
    });
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.dataset.pageSeo = "choreographer";
    schemaScript.textContent = schemaJson;
    tags.push(schemaScript);
    tags.forEach((element) => document.head.append(element));

    return () => tags.forEach((element) => element.remove());
  }, [
    canonicalUrl,
    found,
    isChoreographer,
    metaDescription,
    metaTitle,
    schemaJson,
    seo?.keywords,
    socialImage,
  ]);

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {found && !isChoreographer && <link rel="canonical" href={canonicalUrl} />}
      {found && !isChoreographer && <meta name="robots" content="index, follow, max-image-preview:large" />}
      {found && !isChoreographer && <meta property="og:type" content={isHome ? "website" : "article"} />}
      {found && !isChoreographer && <meta property="og:title" content={metaTitle} />}
      {found && !isChoreographer && <meta property="og:description" content={metaDescription} />}
      {found && !isChoreographer && <meta property="og:url" content={canonicalUrl} />}
      {found && !isChoreographer && <meta name="twitter:card" content="summary_large_image" />}
      {found && !isChoreographer && <meta name="twitter:title" content={metaTitle} />}
      {found && !isChoreographer && <meta name="twitter:description" content={metaDescription} />}
      {found && !isChoreographer && (serviceSeo?.keywords?.length || seo?.keywords) && (
        <meta
          name="keywords"
          content={serviceSeo?.keywords?.join(", ") || seo.keywords}
        />
      )}
      {schema && !isChoreographer && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
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
            <Link className="button primary" to="/">Back to home ↗</Link>
          </section>
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

      {found && !isStudio && !isCollection && (
        <ProjectCTA
          onStart={startProject}
          type={isCostumeDesign ? "Costume Design" : isChoreographer ? "Choreographer" : "Music Editing"}
          need={isCostumeDesign ? "Costume Design" : isChoreographer ? "Choreography" : ""}
        />
      )}
      {found && isHome && siteContent?.home?.sections?.serviceGallery !== false && <ServiceGallery />}
    </>
  );
}
