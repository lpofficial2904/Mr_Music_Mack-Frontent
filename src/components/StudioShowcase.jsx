import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import MainServiceCards from "./MainServiceCards";
import voiceImage from "../assets/premium-voice-recording.png";
import masteringImage from "../assets/premium-track-mastering.png";
import liveImage from "../assets/premium-live-recording.png";
import mobileImage from "../assets/premium-mobile-studio.png";
import mixingImage from "../assets/premium-sound-mixing.png";

const defaultServices = [
  ["Voice Recording", voiceImage],
  ["Track Mastering", masteringImage],
  ["Live Recording", liveImage],
  ["Mobile Studio", mobileImage],
  ["Sound Mixing", mixingImage],
];

export default function StudioShowcase({ siteContent }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const services = siteContent?.home?.studioCards?.length
    ? siteContent.home.studioCards.map((card, index) => [
        card.title,
        card.image || defaultServices[index % defaultServices.length][1],
      ])
    : defaultServices;

  return (
    <>
    <m.section
      className="studio-showcase"
      aria-label="Featured studio services"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.65 }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setActive(0);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(0);
      }}
    >
      <div className="showcase-images" aria-hidden="true">
        {services.map(([title, image], index) => (
          <img
            key={title}
            className={`showcase-image${active === index ? " is-active" : ""}`}
            src={image}
            alt=""
            decoding="async"
          />
        ))}
      </div>
      {services.map(([title], index) => (
        <m.button
          className={`showcase-panel${active === index ? " is-active" : ""}`}
          type="button"
          aria-pressed={active === index}
          key={title}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setActive(index);
          }}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
        >
          <span className="showcase-title">{title}</span>
        </m.button>
      ))}
    </m.section>
    <MainServiceCards siteContent={siteContent} />
    </>
  );
}
