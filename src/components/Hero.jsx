import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { StudioIcon, WhatsAppIcon } from "./Icons";
import premiumStudioHero from "../assets/hero-studio-background-branded.jpg";
import mobileCardBackground from "../assets/showcase-card-background.png";
import musicEditingImage from "../assets/music-editing-studio.png";
import choreographerImage from "../assets/choreographer-feature-background.jpg";
import collectionImage from "../assets/showcase-voice-recording.jpg";

import "./Hero.css";

const MotionLink = motion.create(Link);

const defaultServiceTiles = [
  { label: "Music Editing", icon: "wave", to: "/music-editing" },
  { label: "Mashups & DJ Remix", icon: "headphones", to: "/services" },
  { label: "Background Music", icon: "music", to: "/background-music" },
  { label: "Mix & Master", icon: "sliders", to: "/services" },
  { label: "Costume Design", icon: "shirt", to: "/costume-design" },
];

const defaultVideoCards = [
  {
    title: "Music Editing",
    image: musicEditingImage,
    video: "/videos/music-editing-showcase.mp4",
    to: "/music-editing",
  },
  { title: "Choreographer", image: choreographerImage, to: "/choreographer" },
  { title: "Costume Design", image: "/costume-gallery/costume-blue-stage-gown.jpg", to: "/costume-design" },
  { title: "The Collection", image: collectionImage, to: "/the-collection" },
];

const defaultFeatureCards = [
  { title: "Professional\nQuality Sound", icon: "diamond" },
  { title: "Fast\nDelivery", icon: "bolt" },
  { title: "Customized\nas per your Need", icon: "headphones" },
  { title: "For All Event Types\n(Wedding, Dance, Brand, YouTube etc.)", icon: "users" },
];

export default function Hero({ onStart, siteContent }) {
  const reduceMotion = useReducedMotion();
  const home = siteContent?.home;
  const serviceTiles = home?.serviceTiles?.length ? home.serviceTiles : defaultServiceTiles;
  const videoCards = home?.videoCards?.length
    ? home.videoCards.map((card, index) => ({
        ...card,
        image: card.image || defaultVideoCards[index % defaultVideoCards.length].image,
        video: card.video || defaultVideoCards[index % defaultVideoCards.length].video,
        to: card.to || card.path || defaultVideoCards[index % defaultVideoCards.length].to,
      }))
    : defaultVideoCards;
  const featureCards = home?.featureCards?.length ? home.featureCards : defaultFeatureCards;
  const descriptionWords = (home?.heroDescription || "Luxury wedding mashups, sangeet dance edits, DJ remixes, cinematic background music, choreography and costume styling, crafted in Jaipur for premium events across India.").split(" ");
  const highlightLines = (home?.heroHighlight || "Crafted for grand moments.\nMixed to move hearts.").split("\n");
  const cardStackVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.28,
      },
    },
  };
  const videoCardVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : -28,
      y: reduceMotion ? 0 : 28,
      rotateX: reduceMotion ? 0 : 16,
      scale: reduceMotion ? 1 : 0.9,
      filter: reduceMotion ? "blur(0px)" : "blur(14px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 0.86,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  const kickerVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const titleGroupVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.13,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };
  const titleLineVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 34,
      rotateX: reduceMotion ? 0 : 18,
      filter: reduceMotion ? "blur(0px)" : "blur(14px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 0.88,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  const accentVariants = {
    hidden: { scaleX: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const serviceGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.72,
      },
    },
  };
  const serviceTileVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 24,
      scale: reduceMotion ? 1 : 0.92,
      filter: reduceMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 0.62,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="reference-hero frequency-hero" id="home">
      <div className="reference-hero-media" aria-hidden="true">
        <img src={home?.heroBackground || premiumStudioHero} alt="" />
      </div>
      <div className="reference-hero-scrim" aria-hidden="true" />
      <div className="reference-soundwaves" aria-hidden="true">
        <svg viewBox="0 0 280 150" preserveAspectRatio="none">
          <g>
            <path d="M-10 92 C28 92 37 48 72 54 S111 126 151 98 S214 56 290 88" />
            <path d="M-10 102 C28 102 39 59 73 64 S112 134 153 108 S215 67 290 98" />
            <path d="M-10 112 C30 112 39 70 75 75 S113 143 155 118 S216 78 290 108" />
            <path d="M-10 82 C26 82 36 38 70 44 S109 117 149 88 S212 46 290 78" />
            <path d="M-10 122 C31 122 42 82 77 86 S116 149 158 128 S219 89 290 118" />
          </g>
        </svg>
        <svg className="reference-soundwaves-right" viewBox="0 0 280 150" preserveAspectRatio="none">
          <g>
            <path d="M-10 92 C28 92 37 48 72 54 S111 126 151 98 S214 56 290 88" />
            <path d="M-10 102 C28 102 39 59 73 64 S112 134 153 108 S215 67 290 98" />
            <path d="M-10 112 C30 112 39 70 75 75 S113 143 155 118 S216 78 290 108" />
            <path d="M-10 82 C26 82 36 38 70 44 S109 117 149 88 S212 46 290 78" />
            <path d="M-10 122 C31 122 42 82 77 86 S116 149 158 128 S219 89 290 118" />
          </g>
        </svg>
      </div>

      <div className="reference-hero-inner">
        <div className="reference-hero-layout">
          <div className="reference-copy">
            <motion.p
              className="reference-kicker"
              initial="hidden"
              animate="visible"
              variants={kickerVariants}
            >
              <span>{home?.heroKicker || "JAIPUR'S PREMIER MUSIC STUDIO"}</span>
            </motion.p>
            <motion.h1
              className="reference-title"
              initial="hidden"
              animate="visible"
              variants={titleGroupVariants}
              style={{ perspective: 900 }}
            >
              <motion.span
                className="reference-main-title"
                variants={titleLineVariants}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        textShadow: [
                          "0 14px 34px rgba(0, 0, 0, 0.36)",
                          "0 14px 34px rgba(216, 180, 95, 0.22)",
                          "0 14px 34px rgba(0, 0, 0, 0.36)",
                        ],
                      }
                }
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {home?.heroTitle || "Premium Music Editing"}
              </motion.span>
              <motion.span
                className="reference-script-title"
                variants={titleLineVariants}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {highlightLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </motion.span>
              <motion.span
                className="reference-title-accent"
                aria-hidden="true"
                variants={accentVariants}
              />
            </motion.h1>
            <motion.p
              className="reference-description"
              aria-label={descriptionWords.join(" ")}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.035, delayChildren: reduceMotion ? 0 : 0.48 } },
              }}
            >
              {descriptionWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  aria-hidden="true"
                  style={{ display: "inline-block", marginRight: "0.26em" }}
                  variants={{
                    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10, filter: reduceMotion ? "blur(0px)" : "blur(5px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              className="reference-service-grid"
              aria-label="Music services"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={serviceGridVariants}
            >
              {serviceTiles.map(({ label, icon, to }) => (
                <MotionLink
                  key={`${label}-${to}`}
                  to={to}
                  className="reference-service-item"
                  variants={serviceTileVariants}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -7,
                          scale: 1.035,
                          transition: { duration: 0.22, ease: "easeOut" },
                        }
                  }
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="reference-service-icon" aria-hidden="true">
                    <StudioIcon name={icon} size={22} />
                  </span>
                  <span>{label}</span>
                </MotionLink>
              ))}
            </motion.div>

            <div className="reference-cta-row">
              <button type="button" className="reference-primary" onClick={() => onStart("Music Editing")}>
                Start Your Project <span aria-hidden="true">→</span>
              </button>

              <a
                className="reference-whatsapp"
                href="https://wa.me/919887563201"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={22} />
                WhatsApp Now
              </a>

              <div className="reference-clients">
                <div className="reference-avatar-stack" aria-hidden="true">
                  <span className="reference-avatar avatar-one" />
                  <span className="reference-avatar avatar-two" />
                  <span className="reference-avatar avatar-three" />
                </div>
                <span className="reference-client-count">
                  500+<small>Happy Clients</small>
                </span>
              </div>
            </div>
          </div>

          <div className="reference-showcase" aria-label="Preview gallery">
            <div className="reference-showcase-photo">
              <img className="reference-mobile-showcase-image" src={home?.showcaseBackground || mobileCardBackground} alt="" />
            </div>

            <motion.div
              className="reference-video-stack"
              variants={cardStackVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              style={{ perspective: 900 }}
            >
              {videoCards.map(({ title, image, video, to }, index) => (
                <MotionLink
                  key={title}
                  to={to}
                  className="reference-video-card"
                  variants={videoCardVariants}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 15px 30px rgba(0, 0, 0, 0.52), 0 0 0 rgba(216, 180, 95, 0)",
                            "0 18px 38px rgba(0, 0, 0, 0.56), 0 0 28px rgba(216, 180, 95, 0.22)",
                            "0 15px 30px rgba(0, 0, 0, 0.52), 0 0 0 rgba(216, 180, 95, 0)",
                          ],
                        }
                  }
                  transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    delay: index * 0.22,
                    ease: "easeInOut",
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -10,
                          scale: 1.045,
                          rotate: index % 2 === 0 ? -0.7 : 0.7,
                          transition: { duration: 0.24, ease: "easeOut" },
                        }
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="reference-video-thumb">
                    {video ? (
                      <video
                        src={video}
                        poster={image}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                      />
                    ) : (
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    )}
                  </div>
                  <motion.span
                    className="reference-video-play"
                    aria-hidden="true"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            boxShadow: [
                              "0 0 0 0 rgba(237, 196, 86, 0.18)",
                              "0 0 0 9px rgba(237, 196, 86, 0)",
                              "0 0 0 0 rgba(237, 196, 86, 0)",
                            ],
                          }
                    }
                    transition={{
                      duration: 2.3,
                      repeat: Infinity,
                      delay: index * 0.25,
                      ease: "easeOut",
                    }}
                  >
                    ▶
                  </motion.span>
                  <span className="reference-video-title">{title}</span>
                </MotionLink>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {home?.sections?.featureStrip !== false && (
        <div className="reference-bottom-strip" aria-label="Value highlights">
          {featureCards.map(({ title, icon }) => (
            <div key={title} className="reference-feature-card">
              <span className="reference-feature-icon" aria-hidden="true">
                {icon === "bolt" ? "⚡" : <StudioIcon name={icon} size={32} />}
              </span>
              <span className="reference-feature-text">{title}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
