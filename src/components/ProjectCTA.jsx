import { WhatsAppIcon } from "./Icons";
import { m } from "framer-motion";

const ctaSequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const ctaReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectCTA({
  onStart: startProject,
  type = "Music Editing",
  need = "",
}) {
  const costumeDesign = type === "Costume Design";
  return (
    <section className={`final-cta${costumeDesign ? " costume-final-cta" : ""}`}>
      <div className="final-wave" aria-hidden="true">
        {Array.from({ length: 70 }, (_, index) => (
          <i key={index} style={{ height: `${15 + ((index * 17) % 85)}%` }} />
        ))}
      </div>
      <m.div
        className="wrap"
        variants={ctaSequence}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <m.p variants={ctaReveal} className="eyebrow final-cta-eyebrow">
          {costumeDesign ? "COSTUME DESIGN & STYLING" : "YOUR NEXT GREAT SOUND STARTS HERE"}
        </m.p>
        <m.h2 variants={ctaReveal} className="final-cta-title">
          {costumeDesign ? (
            <><span>A look that speaks.</span><span>A moment that stays.</span></>
          ) : (
            <><span>Have the Idea?</span><span>Let's Give It</span><span className="final-cta-gold">the Right Sound.</span></>
          )}
        </m.h2>
        <m.p variants={ctaReveal} className="final-cta-description">
          {costumeDesign
            ? "Share your concept, event or performance brief. We will shape a costume direction around the person, story and occasion."
            : "Whether you need your songs professionally edited or custom background music created for your content — tell us your requirement and let's build the right audio experience."}
        </m.p>
        <m.div variants={ctaReveal} className="button-row">
          <button className="button primary" onClick={() => startProject(type, "", need)}>
            {costumeDesign ? "Discuss costume design ↗" : "Start your project ↗"}
          </button>
          <a
            className="button text-button"
            href="https://wa.me/919887563201"
            target="_blank"
            rel="noreferrer"
          >
            {costumeDesign ? "WhatsApp your idea ↗" : "WhatsApp your requirement ↗"}
          </a>
        </m.div>
      </m.div>
    </section>
  );
}

export function MobileProjectCTA({ onStart: startProject }) {
  return (
    <div className="mobile-cta">
      <button className="button primary" onClick={() => startProject()}>
        Start your project ↗
      </button>
      <a
        href="https://wa.me/919887563201"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={23} />
      </a>
    </div>
  );
}
