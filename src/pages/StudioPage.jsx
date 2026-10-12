import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import "./StudioPage.css";

const studioPhotos = {
  recordingRoom: "/studio-gallery/studio-image-02.jpg",
  audioWorkstation: "/studio-gallery/studio-image-03.jpg",
  musicProduction: "/studio-gallery/studio-image-04.jpg",
};

const choreographyImage = "/costume-gallery/costume-wedding-sangeet-performance.jpg";
const costumeImage = "/costume-gallery/costume-blue-stage-gown.jpg";

const expertise = [
  {
    title: "Music Editing & Audio Production",
    description:
      "From precision song editing and seamless DJ mashups to custom soundtracks, professional mixing and mastering, we create polished audio experiences for weddings, performances, films, brands and digital content.",
    image: studioPhotos.musicProduction,
    alt: "Professional music editing workstation for audio production in Jaipur",
    href: "/music-editing",
    cta: "Explore Music Services",
    items: [
      "Professional Music Editing",
      "Song Cutting & Joining",
      "Wedding Dance Mashups",
      "Bollywood Song Mashups",
      "DJ Remix & Music Re-Creation",
      "Custom Music Production",
      "Mixing & Mastering",
      "Dance Performance Tracks",
      "Background Music & Sound Design",
      "Advertisement & Promotional Audio",
      "YouTube & Short Film Audio Editing",
    ],
  },
  {
    title: "Choreography & Performance Direction",
    description:
      "Transform celebrations and creative concepts into expressive performances with personalized choreography, coordinated movement and performance-focused music planning.",
    image: choreographyImage,
    alt: "Wedding, sangeet and stage choreography scenes featured on the MR MUSIC MACK choreographer page",
    href: "/choreographer",
    cta: "Explore Choreography",
    items: [
      "Wedding Choreography",
      "Sangeet Dance Choreography",
      "Bride & Groom Dance",
      "Family Dance Performances",
      "Bollywood Dance Choreography",
      "Stage Performance Choreography",
      "School & College Performances",
      "Corporate Event Performances",
      "Creative Performance Concepts",
    ],
  },
  {
    title: "Creative Costume Design",
    description:
      "Explore costumes designed to complement the personality, theme and movement of every performance, from traditional celebrations to contemporary stage presentations.",
    image: costumeImage,
    alt: "Blue stage gown from the MR MUSIC MACK costume design collection",
    href: "/costume-design",
    cta: "Explore Costume Design",
    items: [
      "Traditional Costume Design",
      "Western Costume Design",
      "Party Wear Concepts",
      "Dance Performance Costumes",
      "Stage & Theme-Based Costumes",
      "Wedding Performance Outfits",
      "Creative Fashion Styling Concepts",
    ],
  },
];

const philosophy = [
  ["01", "Original Thinking", "Every project starts with understanding your ideas, audience and creative direction."],
  ["02", "Personalized Creation", "We shape music, movement and design around the individual requirements of each project."],
  ["03", "Attention to Detail", "From audio transitions and timing to performance flow and visual coordination, details matter."],
  ["04", "Collaborative Experience", "We keep the creative process focused, transparent and aligned with your vision."],
];

const process = [
  ["01", "Discover", "We understand your project requirements, references, audience, creative goals and expectations."],
  ["02", "Conceptualize", "We develop the creative direction, music structure, performance concept or design approach."],
  ["03", "Create & Refine", "We bring the concept to life through production, editing, creative development and collaborative feedback."],
  ["04", "Deliver", "We finalize the agreed creative deliverables and prepare them for their intended use."],
];

const reach = [
  ["Jaipur, Rajasthan", "Our Studio Location"],
  ["Pan India", "Creative Project Services"],
  ["Worldwide", "Remote Creative Collaborations"],
];

const differences = [
  ["Music, Choreography & Costume Expertise", "One creative identity connects sound, movement and visual styling."],
  ["Customized Creative Solutions", "Every project is shaped around the occasion, audience, format and final use."],
  ["Detail-Oriented Production", "Timing, transitions, stage flow, sound quality and presentation are handled with care."],
  ["Remote-Friendly Project Collaboration", "Audio, references and planning details can be coordinated online across India and beyond."],
  ["Creativity Designed Around Your Vision", "Your ideas stay at the center while we refine them into a complete creative direction."],
];

const gallery = [
  [
    "MR MUSIC MACK recording room with sound treatment, microphone and creative workspace",
    studioPhotos.recordingRoom,
  ],
  [
    "Audio workstation at MR MUSIC MACK with keyboard, monitor and studio equipment",
    studioPhotos.audioWorkstation,
  ],
  [
    "Music production workstation with a DAW session open on the studio monitor",
    studioPhotos.musicProduction,
  ],
  [
    "MR MUSIC MACK studio control desk and recording equipment",
    "/studio-gallery/studio-image-01.jpg",
  ],
];

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "", delay = 0, reduceMotion }) {
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : 0.68,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function StudioPage({ onStart }) {
  const reduceMotion = useReducedMotion();
  const whatsappMessage = encodeURIComponent(
    "Hello MR MUSIC MACK, I would like to discuss a creative project. Please share the next steps.",
  );

  return (
    <main className="studio-page">
      <section className="studio-page-hero" aria-labelledby="studio-page-title">
        <div className="studio-page-hero-backdrop" aria-hidden="true" />
        <div className="studio-page-wrap studio-page-hero-grid">
          <motion.div
            className="studio-page-hero-copy"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="studio-page-eyebrow">THE STUDIO - MR MUSIC MACK</p>
            <p className="studio-page-overline">Music. Movement. Costume. One Creative Vision.</p>
            <h1 id="studio-page-title">
              Where Ideas Become <em>Extraordinary Performances.</em>
            </h1>
            <p className="studio-page-lead">
              Welcome to MR MUSIC MACK, a creative music editing and production studio based in Jaipur, India. From professional audio editing and custom music production to wedding choreography and creative costume design, we bring sound, movement and visual storytelling together. Collaborating with clients across India and worldwide, we transform unique ideas into memorable creative experiences.
            </p>
            <p className="studio-page-trust">Based in Jaipur, India | Serving Clients Across India & Worldwide</p>
            <div className="studio-page-actions">
              <a className="studio-page-primary" href="#studio-expertise">Explore Our Expertise</a>
              <button className="studio-page-secondary" type="button" onClick={() => onStart("Creative Project", "", "Studio Enquiry")}>
                Start Your Project
              </button>
            </div>
          </motion.div>

          <motion.figure
            className="studio-page-hero-visual"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.12 }}
          >
            <img
              src={studioPhotos.recordingRoom}
              alt="MR MUSIC MACK recording room with sound treatment, microphone and creative workspace"
            />
            <figcaption>Based in Jaipur. Creating for India & Beyond.</figcaption>
          </motion.figure>
        </div>
      </section>

      <section className="studio-page-story studio-page-wrap" aria-labelledby="studio-story-title">
        <Reveal className="studio-page-story-copy" reduceMotion={reduceMotion}>
          <p className="studio-page-eyebrow">WHO WE ARE</p>
          <h2 id="studio-story-title">A Creative Studio Built Around Your Vision.</h2>
          <div className="studio-page-story-panel">
            <p className="studio-page-story-lead">At MR MUSIC MACK, every memorable performance begins with the right creative vision.</p>
            <p>Based in Shyam Nagar, Jaipur, our studio brings together professional music editing, audio production, choreography and costume design under one creative identity.</p>
            <p>Whether it is a custom wedding dance mashup, a professionally produced soundtrack, an expressive stage performance or a distinctive costume concept, our approach is shaped by creativity, precision and attention to detail.</p>
            <p>Our location is Jaipur, but our creative collaborations extend across India and internationally. Through digital communication, remote project coordination and personalized creative planning, we make it easier for clients to bring their ideas to life, wherever they are.</p>
            <div className="studio-page-story-proof" aria-label="Studio collaboration summary">
              <span>Jaipur Based</span>
              <span>Pan India</span>
              <span>Worldwide Remote</span>
            </div>
          </div>
        </Reveal>
        <Reveal className="studio-page-story-image" delay={0.12} reduceMotion={reduceMotion}>
          <img
            src={studioPhotos.audioWorkstation}
            alt="Audio workstation at MR MUSIC MACK with keyboard, monitor and studio equipment"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section className="studio-page-expertise" id="studio-expertise" aria-labelledby="studio-expertise-title">
        <div className="studio-page-wrap">
          <Reveal className="studio-page-section-head" reduceMotion={reduceMotion}>
            <p className="studio-page-eyebrow">WHAT WE CREATE</p>
            <h2 id="studio-expertise-title">Three Creative Disciplines. One Complete Vision.</h2>
            <p>Discover how music, movement and design come together to create meaningful and unforgettable experiences.</p>
          </Reveal>
          <div className="studio-page-expertise-grid">
            {expertise.map((item, index) => (
              <Reveal className="studio-page-expertise-card" key={item.title} delay={index * 0.08} reduceMotion={reduceMotion}>
                <img src={item.image} alt={item.alt} loading="lazy" />
                <div className="studio-page-card-body">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.items.map((specialization) => (
                      <li key={specialization}>{specialization}</li>
                    ))}
                  </ul>
                  <Link to={item.href}>{item.cta}</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-page-philosophy studio-page-wrap" aria-labelledby="studio-philosophy-title">
        <Reveal className="studio-page-section-head" reduceMotion={reduceMotion}>
          <p className="studio-page-eyebrow">OUR APPROACH</p>
          <h2 id="studio-philosophy-title">Creativity With Purpose. Every Detail With Precision.</h2>
          <p>We believe outstanding creative work is not only about how it looks or sounds. It is about the emotions it creates, the story it communicates and the impression it leaves behind.</p>
        </Reveal>
        <div className="studio-page-philosophy-grid">
          {philosophy.map(([number, title, copy], index) => (
            <Reveal className="studio-page-feature" key={title} delay={index * 0.07} reduceMotion={reduceMotion}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="studio-page-process studio-page-wrap" aria-labelledby="studio-process-title">
        <Reveal className="studio-page-section-head" reduceMotion={reduceMotion}>
          <p className="studio-page-eyebrow">HOW WE WORK</p>
          <h2 id="studio-process-title">From Your First Idea to the Final Experience.</h2>
        </Reveal>
        <div className="studio-page-timeline">
          {process.map(([number, title, copy], index) => (
            <Reveal className="studio-page-timeline-step" key={title} delay={index * 0.08} reduceMotion={reduceMotion}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="studio-page-reach" aria-labelledby="studio-reach-title">
        <div className="studio-page-wrap studio-page-reach-grid">
          <Reveal reduceMotion={reduceMotion}>
            <p className="studio-page-eyebrow">OUR CREATIVE REACH</p>
            <h2 id="studio-reach-title">Rooted in Jaipur. Connected to the World.</h2>
            <p>MR MUSIC MACK operates from Jaipur, Rajasthan, India, while welcoming creative collaborations from across the country and around the world.</p>
            <p>Whether you are planning a wedding performance, producing digital content, preparing music for a live event or developing a custom creative project, our remote-friendly workflow makes professional collaboration convenient.</p>
            <p>Share your ideas, audio references, project details and creative requirements online. Our team can coordinate suitable services digitally, regardless of geographical distance.</p>
          </Reveal>
          <Reveal className="studio-page-reach-map" delay={0.12} reduceMotion={reduceMotion}>
            <div className="studio-page-globe" aria-hidden="true">
              <span />
              <i />
            </div>
            {reach.map(([place, label]) => (
              <article key={place}>
                <strong>{place}</strong>
                <p>{label}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="studio-page-difference studio-page-wrap" aria-labelledby="studio-difference-title">
        <Reveal className="studio-page-section-head" reduceMotion={reduceMotion}>
          <p className="studio-page-eyebrow">THE CREATIVE DIFFERENCE</p>
          <h2 id="studio-difference-title">More Than a Service. A Creative Partnership.</h2>
        </Reveal>
        <div className="studio-page-difference-grid">
          {differences.map(([title, copy], index) => (
            <Reveal className="studio-page-difference-item" key={title} delay={index * 0.06} reduceMotion={reduceMotion}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="studio-page-gallery" aria-label="Creative studio visuals">
        <div className="studio-page-wrap studio-page-gallery-grid">
          {gallery.map(([alt, image], index) => (
            <Reveal className="studio-page-gallery-card" key={alt} delay={index * 0.06} reduceMotion={reduceMotion}>
              <img src={image} alt={alt} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="studio-page-final" aria-labelledby="studio-final-title">
        <div className="studio-page-wrap studio-page-final-inner">
          <Reveal reduceMotion={reduceMotion}>
            <p className="studio-page-eyebrow">LET'S CREATE TOGETHER</p>
            <h2 id="studio-final-title">Your Vision Deserves Something Extraordinary.</h2>
            <p>Have a song to transform, a performance to create or a costume concept to bring to life? Share your ideas with MR MUSIC MACK and let's explore the possibilities together.</p>
            <div className="studio-page-actions">
              <button className="studio-page-primary" type="button" onClick={() => onStart("Creative Project", "", "Studio Enquiry")}>
                Start Your Project
              </button>
              <a className="studio-page-secondary" href={`https://wa.me/919887563201?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                Connect on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
