import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import servicesImage from "../assets/studio-services.png";

const MotionLink = motion.create(Link);

const services = [
  [
    "Sound Mixing",
    "Bring every instrument and vocal together with depth, balance and a mix that lets your music shine.",
    "/mix-mastering",
  ],
  [
    "Song Mixing & Mashup",
    "Your favourite songs, creatively blended with seamless transitions into one cohesive track.",
    "/song-mixing-mashup",
  ],
  [
    "Track Mastering",
    "Give your finished track a clear, balanced final polish, ready for your audience and your next release.",
    "/mix-mastering",
  ],
  [
    "Audio Editing",
    "Precise cuts, seamless transitions and thoughtful arrangements. Your music, shaped around your moment.",
    "/music-editing",
  ],
  [
    "DJ Remix / Re-Creation",
    "Reimagine your music with fresh arrangements, creative edits and energy tailored to your performance.",
    "/dj-remix",
  ],
];

export default function ServiceGallery() {
  const [active, setActive] = useState(null);
  const [slide, setSlide] = useState(0);
  const [compact, setCompact] = useState(false);
  const [perPage, setPerPage] = useState(1);
  const reduceMotion = useReducedMotion();
  const track = useRef(null);
  const panelVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 34,
      scale: reduceMotion ? 1 : 0.96,
      filter: reduceMotion ? "blur(0px)" : "blur(12px)",
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 0.72,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 600px)");
    const tablet = window.matchMedia("(max-width: 1000px)");
    const update = () => {
      setCompact(tablet.matches);
      setPerPage(mobile.matches ? 1 : 2);
      setSlide(0);
      track.current?.scrollTo({ left: 0, behavior: "instant" });
    };
    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);
  const lastSlide = services.length - perPage;
  function goTo(index) {
    const next = Math.max(0, Math.min(index, lastSlide));
    if (!track.current) return;
    const width = track.current.clientWidth / perPage;
    track.current.scrollTo({
      left: next * width,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  useEffect(() => {
    if (!compact || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = window.setInterval(() => {
      const next = slide >= lastSlide ? 0 : slide + 1;
      const width = track.current.clientWidth / perPage;
      track.current.scrollTo({ left: next * width, behavior: "smooth" });
      setSlide(next);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [compact, lastSlide, perPage, slide]);
  return (
    <div className="service-gallery-shell">
      <section
        ref={track}
        className="service-gallery"
        id="service-gallery-track"
        aria-roledescription={compact ? "carousel" : undefined}
        aria-label="Explore our studio services"
        onScroll={() => {
          if (compact && track.current)
            setSlide(
              Math.min(
                lastSlide,
                Math.round(
                  track.current.scrollLeft /
                    (track.current.clientWidth / perPage),
                ),
              ),
            );
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setActive(null);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setActive(null);
        }}
      >
        {services.map(([title, description, href], index) => (
          <motion.article
            key={title}
            className={`gallery-panel ${(compact ? index >= slide && index < slide + perPage : active === index) ? "is-active" : ""}`}
            custom={index}
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: compact ? 0 : -8,
                    transition: { duration: 0.24, ease: "easeOut" },
                  }
            }
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={(event) => {
              if (event.target.matches(":focus-visible")) setActive(index);
            }}
          >
            <h2>
              <button
                className="gallery-trigger"
                aria-expanded={
                  compact
                    ? index >= slide && index < slide + perPage
                    : active === index
                }
                aria-controls={`gallery-description-${index}`}
                onClick={() => (compact ? goTo(index) : setActive(index))}
              >
                {title}
                <span className="gallery-tap-hint" aria-hidden="true">
                  +
                </span>
              </button>
            </h2>
            <div className="gallery-photo">
              <img
                src={servicesImage}
                alt=""
                loading="lazy"
                decoding="async"
                width="1536"
                height="1024"
                style={{ left: `${index * -100}%` }}
              />
              <div className="gallery-tint" />
              <div
                className="gallery-description"
                id={`gallery-description-${index}`}
                aria-hidden={
                  compact
                    ? index < slide || index >= slide + perPage
                    : active !== index
                }
                inert={
                  compact
                    ? index < slide || index >= slide + perPage
                    : active !== index
                }
              >
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  {description}
                </motion.p>
                <MotionLink
                  to={href}
                  aria-label={`Explore ${title}`}
                  className="gallery-arrow"
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -8 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span aria-hidden="true">→</span>
                </MotionLink>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
      <div className="gallery-controls" aria-label="Service slider controls">
        <button
          type="button"
          onClick={() => goTo(slide - 1)}
          disabled={slide === 0}
          aria-label="Previous service"
          aria-controls="service-gallery-track"
        >
          ←
        </button>
        <div className="gallery-dots">
          {services.slice(0, lastSlide + 1).map(([title], index) => (
            <button
              type="button"
              key={title}
              aria-label={`Show ${title}`}
              aria-current={slide === index ? "true" : undefined}
              onClick={() => goTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(slide + 1)}
          disabled={slide === lastSlide}
          aria-label="Next service"
          aria-controls="service-gallery-track"
        >
          →
        </button>
        <p className="gallery-slide-status" aria-live="polite">
          {slide + 1} / {lastSlide + 1}
        </p>
      </div>
    </div>
  );
}
