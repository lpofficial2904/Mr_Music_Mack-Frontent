import { Link } from "react-router-dom";
import { mediaUrl } from "../api";
import { m, useReducedMotion } from "framer-motion";
import fallbackImage from "../assets/studio-services.png";

const MotionLink = m.create(Link);

const curatedServiceImages = {
  "/music-editing": {
    image: "/main-service-cards/music-editing.jpg",
    imageAlt: "Audio editing workspace with music production software at MR MUSIC MACK",
  },
  "/background-music": {
    image: "/main-service-cards/background-music.jpg",
    imageAlt: "Piano and instruments in a professional recording studio",
  },
  "/costume-design": {
    image: "/costume-gallery/costume-family-wedding-look.jpg",
    imageAlt: "Coordinated group costume look from the MR MUSIC MACK costume collection",
  },
  "/choreographer": {
    image: "/costume-gallery/costume-wedding-sangeet-performance.jpg",
    imageAlt: "Wedding couple and dancers performing a choreographed sangeet routine",
  },
};

const defaultServices = [
  { title: "Music Editing", label: "Cut. Mix. Perfect.", description: "Precision edits, seamless mashups and polished tracks made around your exact moment.", href: "/music-editing", ...curatedServiceImages["/music-editing"] },
  { title: "Costume Design", label: "Designed to perform", description: "Distinctive costume concepts and styling created for your character, stage and occasion.", href: "/costume-design", ...curatedServiceImages["/costume-design"] },
  { title: "Choreographer", label: "Wedding & sangeet ready", description: "Professional choreography for wedding dances, sangeet performances, couple dance and family group routines.", href: "/choreographer", ...curatedServiceImages["/choreographer"] },
  { title: "Background Music", label: "Stories in sound", description: "Original scores shaped around the emotion, pace and purpose of your visual story.", href: "/background-music", ...curatedServiceImages["/background-music"] },
];

export default function MainServiceCards({ siteContent }) {
  const reduceMotion = useReducedMotion();
  const services = siteContent?.home?.mainServiceCards?.length
    ? siteContent.home.mainServiceCards.map((service, index) => ({
        ...service,
        href: service.path,
        ...(curatedServiceImages[service.path] || {}),
        image: service.image || curatedServiceImages[service.path]?.image || defaultServices[index % defaultServices.length].image,
        imageAlt: service.imageAlt || curatedServiceImages[service.path]?.imageAlt || defaultServices[index % defaultServices.length].imageAlt,
      }))
    : defaultServices;
  return (
    <m.section className="main-services" aria-labelledby="main-services-title">
      <m.div className="main-services-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } } }}>
        <m.div variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.55 } } }}>
          <p className="main-services-eyebrow"><span /> Our expertise</p>
          <h2 id="main-services-title">{siteContent?.home?.serviceSectionTitle || "Four ways to make your idea unforgettable."}</h2>
        </m.div>
        <m.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5 } } }}>{siteContent?.home?.serviceSectionDescription || "Choose your starting point. Every service is shaped around your vision and finished with the same attention to detail."}</m.p>
      </m.div>
      <div className="main-services-grid">
        {services.map((service, index) => (
          <MotionLink
            className="main-service-card"
            to={service.href}
            key={service.title}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 32, scale: reduceMotion ? 1 : 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={mediaUrl(service.image)}
              alt={service.imageAlt}
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackImage;
              }}
            />
            <span className="main-service-overlay" aria-hidden="true" />
            <span className="main-service-number" aria-hidden="true">0{index + 1}</span>
            <span className="main-service-content">
              <span className="main-service-label">{service.label}</span>
              <strong>{service.title}</strong>
              <span className="main-service-description">{service.description}</span>
              <span className="main-service-link">Explore service <b aria-hidden="true">&#8599;</b></span>
            </span>
          </MotionLink>
        ))}
      </div>
    </m.section>
  );
}
