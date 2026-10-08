import { useState } from "react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { businessDescription, backgroundServices, editingServices, faqs, moods } from "../siteData";
import fallbackImage from "../assets/music-editing-studio.png";
import musicEditingImage from "../assets/music-editing-studio.png";
import soundMixingImage from "../assets/showcase-sound-mixing.jpg";
import liveRecordingImage from "../assets/showcase-live-recording.jpg";
import voiceRecordingImage from "../assets/showcase-voice-recording.jpg";
import trackMasteringImage from "../assets/showcase-track-mastering.jpg";
import mobileStudioImage from "../assets/showcase-mobile-studio.jpg";
import cardBackgroundImage from "../assets/showcase-card-background.png";
import studioServicesImage from "../assets/studio-services.png";
import requestedHeroImage from "../assets/requested-hero-background.png";
import premiumStudioImage from "../assets/premium-studio-hero.png";

// Sections shared by service, contact and about pages.
const reveal = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.6 },
};

export function MusicEditing({ onStart }) {
  return (
    <m.section
      {...reveal}
      className="section wrap split-section"
      id="music-editing"
    >
      <div className="section-copy">
        <p className="eyebrow">01 / OUR CORE SERVICE</p>
        <h2>
          Music Editing,
          <br />
          Made Around You.
        </h2>
        <p>
          Your songs. Your timing. Your performance. We professionally cut,
          combine, arrange and polish your music to create one seamless final
          track.
        </p>
        <ul className="capability-list">
          {[
            "Song Cutting",
            "Song Joining",
            "Smooth Transitions",
            "Beat Matching",
            "Timing Adjustment",
            "Audio Arrangement",
            "Volume Balancing",
            "Custom Effects",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button
          className="button primary"
          onClick={() => onStart("Music Editing")}
        >
          Discuss your music edit ↗
        </button>
      </div>
      <div>
        <div className="editing-console">
          <div className="console-top">
            <span>THE ART OF A SEAMLESS EDIT</span>
            <span className="console-dots">● ● ●</span>
          </div>
          <div className="editing-ruler">
            <span>00:00</span>
            <span>00:30</span>
            <span>01:00</span>
            <span>01:30</span>
            <span>02:00</span>
          </div>
          {["SONG 01", "SONG 02", "TRANSITION", "EFFECTS", "FINAL TRACK"].map(
            (label, index) => (
              <div className="edit-row" key={label}>
                <span>{label}</span>
                <div className="edit-clip">
                  {Array.from({ length: 38 }, (_, bar) => (
                    <i
                      key={bar}
                      style={{
                        height: `${20 + ((bar * 19 + index * 7) % 80)}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
          <div className="edit-markers">
            <span>CUT</span>
            <span>BEAT MATCH</span>
            <span>TRANSITION</span>
            <span>FADE</span>
            <span>FINAL MIX</span>
          </div>
        </div>
        <div className="console-caption">
          <span>Different tracks. One seamless experience.</span>
          <strong>That's the craft. ↗</strong>
        </div>
      </div>
    </m.section>
  );
}

export function BackgroundMusic({ onStart }) {
  return (
    <section className="dark-section" id="background-music">
      <m.div {...reveal} className="section wrap split-section">
        <div className="section-copy">
          <p className="eyebrow light">02 / ORIGINAL BACKGROUND MUSIC</p>
          <h2>
            Every Story Needs
            <br />
            the <em>Right Sound.</em>
          </h2>
          <p>
            From emotional storytelling to energetic advertisements, MR MUSIC
            MACK creates custom background music designed around the mood, pace
            and purpose of your content.
          </p>
          <div className="button-row">
            <button
              className="button primary"
              onClick={() => onStart("Background Music")}
            >
              Create my background music ↗
            </button>
            <Link className="text-link" to="/the-collection?category=background">
              ▶ Hear background music samples
            </Link>
          </div>
        </div>
        <div className="score-console">
          <div className="video-preview">
            <img
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
              alt="Cinematic landscape used to illustrate a film scoring project"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackImage;
              }}
            />
            <span>EVERY FRAME HAS A FEELING.</span>
            <b>VIDEO PREVIEW / CONCEPT</b>
          </div>
          <div className="console-top">
            <span>STORY_TO_SOUND / TIMELINE</span>
            <span>01:24</span>
          </div>
          {["VIDEO", "DIALOGUE", "BACKGROUND SCORE", "SFX", "FINAL MIX"].map(
            (label, index) => (
              <div className="score-layer" key={label}>
                <span>{label}</span>
                <div className="wave-bars">
                  {Array.from({ length: 35 }, (_, bar) => (
                    <i
                      key={bar}
                      style={{
                        height: `${25 + ((bar * 13 + index * 21) % 70)}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </m.div>
    </section>
  );
}

export function BackgroundUses({ services = backgroundServices }) {
  return (
    <section className="section wrap">
      <div className="section-intro">
        <div>
          <p className="eyebrow">MADE FOR YOUR MEDIUM</p>
          <h2>
            Sound Designed
            <br />
            for Every Story.
          </h2>
        </div>
        <p>
          From the first frame to the final impression. Original music with a
          role to play.
        </p>
      </div>
      <div className="sound-grid">
        {services.map((service, index) => (
          <m.article {...reveal} className="sound-card" key={service.id || service.path || service.title}>
            <p className="eyebrow">
              0{index + 1} — {service.label || service.name.toUpperCase()}
            </p>
            <h3>{service.title || service.name}</h3>
            <p>{service.description}</p>
            <Link className="text-link" to={service.path}>
              {index === services.length - 1 ? "Discuss your project" : "Explore"} ↗
            </Link>
            <div className="card-wave" aria-hidden="true">
              {Array.from({ length: 18 }, (_, bar) => (
                <i
                  key={bar}
                  style={{ height: `${15 + ((bar * 17 + index * 11) % 80)}%` }}
                />
              ))}
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    [
      "UNDERSTAND",
      "You share your video, concept, story, references and required mood.",
    ],
    [
      "DEFINE THE MOOD",
      "We understand the emotion, pace and purpose of your content.",
    ],
    ["CREATE", "We develop music around your scenes and project requirements."],
    [
      "SYNC & POLISH",
      "Music is synchronized and professionally mixed with your content.",
    ],
    ["DELIVER", "Receive your final professionally prepared audio."],
  ];
  return (
    <section className="process-section">
      <div className="section wrap">
        <div className="section-intro">
          <div>
            <p className="eyebrow">FROM STORY TO SOUND</p>
            <h2>
              How We Create
              <br />
              Your Background Music.
            </h2>
          </div>
          <p>A collaborative process. A considered result.</p>
        </div>
        <div className="process-grid">
          {steps.map(([title, text], index) => (
            <m.div {...reveal} className="process-step" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MoodSelector({ onStart }) {
  const [selected, setSelected] = useState("Cinematic");
  const [hovered, setHovered] = useState("");
  const activeMood = hovered || selected;
  const moodIndex = moods.indexOf(activeMood);
  return (
    <section className="section wrap mood-layout">
      <div>
        <p className="eyebrow">WHAT SHOULD IT FEEL LIKE?</p>
        <h2>
          Tell Us the Feeling.
          <br />
          We'll Shape the Sound.
        </h2>
        <div className="mood-wave" aria-hidden="true">
          {Array.from({ length: 42 }, (_, index) => (
            <i
              key={index}
              style={{
                transform: `scaleY(${(12 + ((index * (moodIndex + 9) * 7) % 85)) / 100})`,
              }}
            />
          ))}
        </div>
        <div className="mood-caption">
          <span>MOOD STUDY / {activeMood.toUpperCase()}</span>
          <span>YOUR FEELING, TRANSLATED.</span>
        </div>
      </div>
      <div>
        <div className="mood-pills">
          {moods.map((mood) => (
            <button
              key={mood}
              className="mood-pill"
              aria-pressed={selected === mood}
              onMouseEnter={() => setHovered(mood)}
              onMouseLeave={() => setHovered("")}
              onFocus={() => setHovered(mood)}
              onBlur={() => setHovered("")}
              onClick={() => setSelected(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        <button
          className="button primary"
          style={{ marginTop: 25 }}
          onClick={() => onStart("Background Music", selected)}
        >
          Create a {selected.toLowerCase()} score ↗
        </button>
      </div>
    </section>
  );
}

export function EditingServices({ services = editingServices }) {
  const serviceCopy = {
    "Music Audio Editing": {
      label: "PRO MUSIC EDIT",
      text: "Professional music editing, song cutting and joining with clean timing, smooth fades and a polished final track.",
      image: musicEditingImage,
    },
    "Background Music": {
      label: "CINEMATIC BGM",
      text: "Custom background music and cinematic score production for films, YouTube videos, ads, reels and brand stories.",
      image: premiumStudioImage,
    },
    "Song Mixing & Mashup": {
      label: "WEDDING MASHUP",
      text: "Song mixing, Bollywood mashup and sangeet mashup editing shaped into one seamless high-energy flow.",
      image: soundMixingImage,
    },
    "DJ Remix / Re-Creation": {
      label: "DJ REMIX",
      text: "Custom DJ remix, song re-creation and Bollywood remix edits with punchy drops, hooks and stage-ready energy.",
      image: liveRecordingImage,
    },
    "Audio Editing & Arrangement": {
      label: "AUDIO ARRANGE",
      text: "Audio editing and arrangement for entries, reels, events and performances with exact cue points and clean structure.",
      image: voiceRecordingImage,
    },
    "Mix & Mastering": {
      label: "MIX MASTER",
      text: "Online mixing and mastering services for loud, clear, balanced audio ready for stage, video and streaming playback.",
      image: trackMasteringImage,
    },
    "Dance Performance Music Editing": {
      label: "DANCE TRACK",
      text: "Dance performance music editing and choreography track editing with count-perfect cues, drops, pauses and endings.",
      image: mobileStudioImage,
    },
    "Wedding & Event Music Preparation": {
      label: "WEDDING EDIT",
      text: "Wedding music editing for bride entry, groom entry, couple dance, family performance and sangeet mashup moments.",
      image: cardBackgroundImage,
    },
    "School & College Function Music Editing": {
      label: "ANNUAL FUNCTION",
      text: "School function and college dance music editing for annual day, competitions, group acts and cultural stage shows.",
      image: studioServicesImage,
    },
    "Choreography/Performance Track Preparation": {
      label: "COUNT PERFECT",
      text: "Performance track preparation for choreographers with transitions, pauses and endings aligned to movement and formations.",
      image: requestedHeroImage,
    },
    "Custom Music Production": {
      label: "CUSTOM MUSIC",
      text: "Custom music production and original audio production built around your brand, event, video or creative concept.",
      image: premiumStudioImage,
    },
  };

  return (
    <section className="services-section" id="services">
      <div className="section wrap">
        <div className="section-intro">
          <div>
            <p className="eyebrow">PRECISION MEETS POSSIBILITY</p>
            <h2>
              Editing Every Beat
              <br />
              Around Your Requirement.
            </h2>
          </div>
          <p>
            Premium audio edits for performances, weddings, events and content,
            built with clean timing, tasteful transitions and a polished final
            sound.
          </p>
        </div>
        <div className="service-grid">
          {services.map(([name, href], index) => {
            const copy = serviceCopy[name] || {
              label: "MUSIC EDITING",
              text: "A tailored audio edit shaped around your requirement, timing and intended moment.",
            };

            return (
              <Link
                className="service-card"
                to={href}
                key={name}
                style={{ "--row-image": `url(${copy.image || musicEditingImage})` }}
              >
                <span>
                  0{index + 1} / {copy.label}
                </span>
                <div className="service-card-content">
                  <h3>{name}</h3>
                  <p>{copy.text}</p>
                </div>
                <span className="service-card-meta">Premium audio craft</span>
                <span className="service-arrow">↗</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Wedding({ onStart }) {
  return (
    <section className="wedding-section">
      <div className="section wrap split-section">
        <div className="wedding-photo">
          <img
            loading="lazy"
            decoding="async"
            width="900"
            height="1200"
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85"
            alt="An Indian wedding celebration with warm, elegant details"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }}
          />
          <p>Some moments deserve their own soundtrack.</p>
        </div>
        <div className="section-copy">
          <p className="eyebrow">FOR THE MOMENTS THAT STAY</p>
          <h2>
            Your Big Moment
            <br />
            Deserves the Right Sound.
          </h2>
          <p>
            The anticipation of an entrance. The joy of a family performance. We
            bring your favourite songs together, so you can be fully in the
            moment.
          </p>
          <ul className="capability-list">
            {[
              "Bride Entry",
              "Groom Entry",
              "Couple Dance",
              "Family Performance",
              "Sangeet Mashup",
              "Dance Performance",
              "Choreography Track",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            className="button primary"
            onClick={() => onStart("Wedding Music", "", "Performance Track")}
          >
            Create my performance track ↗
          </button>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const values = [
    ["PRECISION EDITING", "Every cut and transition is carefully placed."],
    ["CUSTOM APPROACH", "Every project is created around your requirement."],
    [
      "STORY-DRIVEN SOUND",
      "Background music designed around emotion and purpose.",
    ],
    ["PERFORMANCE READY", "Music prepared for real performances and events."],
    ["PROFESSIONAL OUTPUT", "Clean, balanced and polished final audio."],
    [
      "EASY COLLABORATION",
      "Share your requirements online and communicate easily through WhatsApp.",
    ],
  ];
  return (
    <section className="section wrap">
      <div className="section-intro">
        <div>
          <p className="eyebrow">THE DETAILS MAKE THE DIFFERENCE</p>
          <h2>
            Sound Built
            <br />
            with Purpose.
          </h2>
        </div>
        <p>Creative instinct, backed by a careful ear.</p>
      </div>
      <div className="values-grid">
        {values.map(([title, text], index) => (
          <div className="value-item" key={title}>
            <span>0{index + 1} ↗</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="about-section" id="about">
      <div className="section wrap split-section">
        <div>
          <p className="eyebrow">ABOUT MR MUSIC MACK</p>
          <h2>
            Where Music Editing
            <br />
            Meets Creative Sound.
          </h2>
          <blockquote className="about-quote">
            “Every visual has a feeling.
            <br />
            We give that feeling a sound.”
          </blockquote>
        </div>
        <div className="about-copy">
          <p>{businessDescription}</p>
          <Link to="/lets-connect" className="text-link">
            Let's talk about your project ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProjectJourneys() {
  return (
    <section className="section wrap">
      <div className="section-intro">
        <div>
          <p className="eyebrow">FIND YOUR STARTING POINT</p>
          <h2>
            One Studio.
            <br />
            Different Stories.
          </h2>
        </div>
      </div>
      <div className="journey-grid">
        <Link to="/music-editing" className="journey-card">
          <p className="eyebrow">01 / I HAVE SONGS</p>
          <h3>Make them work together.</h3>
          <p>Need songs cut, mixed, combined or arranged?</p>
          <span className="text-link">MUSIC EDITING ↗</span>
        </Link>
        <Link to="/background-music" className="journey-card">
          <p className="eyebrow light">02 / I HAVE A VIDEO OR IDEA</p>
          <h3>Give it a sound of its own.</h3>
          <p>Need original background music for your content?</p>
          <span className="text-link">BACKGROUND MUSIC ↗</span>
        </Link>
      </div>
      <div className="review-placeholder">
        <div>
          <p className="eyebrow">CLIENT STORIES</p>
          <h3>Real stories belong here.</h3>
          <div className="review-tags">
            Wedding clients · Choreographers · Creators · Brands · Event
            organizers
          </div>
        </div>
        <p>
          Verified customer experiences will be shared here as they become
          available. Until then, tell us about your project and get to know our
          approach.
        </p>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section wrap faq-layout">
      <div>
        <p className="eyebrow">A LITTLE CLARITY</p>
        <h2>
          Before We
          <br />
          Press Play.
        </h2>
        <a
          className="text-link"
          href="https://wa.me/919887563201"
          target="_blank"
          rel="noreferrer"
        >
          Ask us on WhatsApp ↗
        </a>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
