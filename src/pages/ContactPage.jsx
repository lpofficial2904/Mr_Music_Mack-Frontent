import ProjectBriefModal from "../components/ProjectBriefModal";
import { FAQ } from "../components/StudioSections";
import { m } from "framer-motion";

export function ContactSection({
  standalone = false,
  query = new URLSearchParams(),
  pageContent,
  settings,
}) {
  const heading = pageContent?.title || "Tell Us What\nYou Want to Create.";
  const phone = settings?.phone || "+91 98875 63201";
  const email = settings?.email || "mrmusicmack@gmail.com";
  const address = settings?.address || "Shyam Nagar, Sodala, Jaipur, Rajasthan";
  return (
    <section className="contact-section premium-contact-section" id="contact">
      <div className="section wrap contact-layout">
        <m.div
          className="contact-info premium-contact-info"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">LET'S MAKE IT HAPPEN</p>
          {standalone ? (
            <h1
              style={{
                fontSize: "clamp(38px, 4vw, 54px)",
                lineHeight: 1.15,
                letterSpacing: "-2px",
              }}
            >
              {heading.split("\n").map((line, index) => (
                <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>
              ))}
            </h1>
          ) : (
            <h2>
              {heading.split("\n").map((line, index) => (
                <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>
              ))}
            </h2>
          )}
          <p>
            {pageContent?.description || "Already have songs? Have a video or an idea? Tell us where you are starting. We'll help shape what comes next."}
          </p>
          <div className="contact-proof-grid" aria-label="Project process highlights">
            {[
              ["01", "Share songs, video or visual references"],
              ["02", "Get direction for timing, mood and delivery"],
              ["03", "Continue the project discussion on WhatsApp"],
            ].map(([number, text]) => (
              <m.div
                key={number}
                className="contact-proof-card"
                whileHover={{ y: -5 }}
              >
                <span>{number}</span>
                <p>{text}</p>
              </m.div>
            ))}
          </div>
          <div className="contact-details">
            <m.div whileHover={{ y: -4 }}>
              <small>CALL OR WHATSAPP</small>
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
            </m.div>
            <m.div whileHover={{ y: -4 }}>
              <small>WRITE TO US</small>
              <a href={`mailto:${email}`}>{email}</a>
            </m.div>
            <m.div whileHover={{ y: -4 }}>
              <small>FIND OUR STUDIO</small>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
              >
                {address} -&gt;
              </a>
            </m.div>
          </div>
        </m.div>
        <m.div
          className="premium-contact-form"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectBriefModal
            inline
            initialType={query.get("type") || "Music Editing"}
            initialMood={query.get("mood") || ""}
            initialNeed={query.get("need") || ""}
          />
        </m.div>
      </div>
    </section>
  );
}

export default function ContactPage({ query, siteContent, path }) {
  return (
    <>
      <ContactSection standalone query={query} pageContent={siteContent?.pages?.[path]} settings={siteContent?.settings} />
      <FAQ />
    </>
  );
}
