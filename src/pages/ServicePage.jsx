import { useState } from "react";
import OurWork from "../components/OurWork";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import {
  MusicEditing,
  BackgroundMusic,
  BackgroundUses,
  Process,
  MoodSelector,
  EditingServices,
  Wedding,
  WhyUs,
  About,
  ProjectJourneys,
  FAQ,
} from "../components/StudioSections";
import {
  choreographerFaqItems,
  landingPages,
  serviceSeoContent,
} from "../siteData";
import StudioPage from "./StudioPage";

const choreographerHeroImage = "/costume-gallery/costume-wedding-sangeet-performance.jpg";
const choreographerFeatureImage = "/costume-gallery/costume-family-wedding-look.jpg";

const featureSets = {
  "/music-editing": {
    label: "PRECISION MUSIC EDITING",
    title: "A premium edit suite for songs, mashups and performances.",
    copy:
      "Every transition, cue and final bounce is shaped with clean timing, musical taste and stage-ready clarity.",
    cards: [
      ["CUT", "Tight song cuts, clean starts, smooth endings and exact durations."],
      ["MIX", "Balanced loudness, controlled energy and polished playback."],
      ["FLOW", "Mashups and performance tracks arranged like one continuous moment."],
    ],
  },
  "/background-music": {
    label: "CINEMATIC BACKGROUND SCORE",
    title: "Music that supports the story without stealing the scene.",
    copy:
      "From short films to ads and launches, each score is built around emotion, pacing and the final visual edit.",
    cards: [
      ["MOOD", "Scene-by-scene musical direction matched to your brief."],
      ["SYNC", "Builds, pauses and reveals timed around the picture."],
      ["BRAND", "A sound palette that feels intentional for your project."],
    ],
  },
  "/costume-design": {
    label: "CUSTOM PERFORMANCE STYLING",
    title: "Costumes designed to look powerful on stage, camera and entry.",
    copy:
      "Concept, color, movement and finishing are brought together so the final look feels premium and performance-ready.",
    cards: [
      ["CONCEPT", "Visual direction shaped around occasion, role and mood."],
      ["DETAIL", "Fabrics, accessories and color combinations planned together."],
      ["FIT", "Styling guidance for comfort, movement and final presentation."],
    ],
  },
  "/choreographer": {
    label: "CHOREOGRAPHY & PERFORMANCE DIRECTION",
    title: "Wedding and sangeet choreography shaped around your celebration.",
    copy:
      "Personalized movement, music cues and formations for couples, families and stage performances.",
    cards: [
      {
        title: "Wedding & Sangeet Choreography",
        label: "WEDDING SANGEET",
        copy: "Premium wedding dance choreography for sangeet nights, bride-groom entries, family performances and unforgettable celebration moments.",
        image: "/costume-gallery/costume-wedding-sangeet-performance.jpg",
        imageAlt: "Wedding sangeet performers in coordinated celebration styling",
        href: "/lets-connect",
        cta: "Enquire about wedding choreography",
      },
      {
        title: "Couple & Family Dance",
        label: "COUPLE & FAMILY",
        copy: "Romantic couple dance, bride and groom choreography and family routines planned around comfort, chemistry and stage confidence.",
        image: "/costume-gallery/costume-blue-bridal-look.jpg",
        imageAlt: "Bride and groom with blue-costumed dancers during a choreographed wedding moment",
        href: "/lets-connect",
        cta: "Discuss a couple or family performance",
      },
      {
        title: "Stage & Event Choreography",
        label: "STAGE READY",
        copy: "Clean counts, formations, transitions and performance flow for stage shows, school functions, college events and cultural programs.",
        image: "/costume-gallery/costume-purple-stage-look.jpg",
        imageAlt: "Stage performer in a purple costume with supporting dancers and event lighting",
        href: "/lets-connect",
        cta: "Enquire about stage choreography",
      },
    ],
  },
};

function PremiumShowcase({ path, service, pageName, onStart }) {
  const data = featureSets[path] || (service && {
    label: service.background ? "CUSTOM BACKGROUND MUSIC" : service.type || "PREMIUM SERVICE",
    title: service.title || pageName,
    copy: service.description,
    cards: service.details?.slice(0, 3).map((detail, index) => [
      String(index + 1).padStart(2, "0"),
      detail,
    ]),
  });

  if (!data) return null;

  return (
    <section className={`premium-service-strip${path === "/choreographer" ? " choreographer-showcase" : ""}${path === "/costume-design" ? " costume-showcase" : ""}`}>
      <div className="wrap premium-service-layout">
        <m.div
          className="premium-service-copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">{data.label}</p>
          <h2>{data.title}</h2>
          <p>{data.copy}</p>
          <button
            className="button primary premium-gold-button"
            onClick={() => onStart(service?.type || "Music Editing", "", service?.need)}
          >
            {service?.name === "Choreographer"
              ? "Start choreography ->"
              : service?.type === "Costume Design"
                ? "Start costume design ->"
                : "Start premium project ->"}
          </button>
        </m.div>
        <div className="premium-signal-board" aria-hidden="true">
          <m.div
            className="premium-disc"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <div className="premium-wave-stack">
            {Array.from({ length: 24 }).map((_, index) => (
              <m.i
                key={index}
                animate={{ scaleY: [0.45, 1, 0.62] }}
                transition={{
                  duration: 1.5 + (index % 5) * 0.16,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: index * 0.035,
                }}
              />
            ))}
          </div>
        </div>
        <div className="premium-feature-grid">
          {data.cards?.map((card, index) => {
            const [title, copy] = Array.isArray(card)
              ? card
              : [card.title, card.copy];
            return (
              <m.article
                className="premium-feature-card"
                key={`${title}-${copy}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.015 }}
              >
                {path === "/choreographer" && (
                  <img
                    className="premium-feature-image"
                    src={card.image || choreographerFeatureImage}
                    alt={card.imageAlt}
                    loading="lazy"
                  />
                )}
                {path === "/choreographer" && card.label && (
                  <span className="premium-feature-label">{card.label}</span>
                )}
                {path === "/choreographer" ? (
                  <h3 className="premium-feature-title">{title}</h3>
                ) : (
                  <span>{title}</span>
                )}
                <p>{copy}</p>
                {card.href && (
                  <Link className="premium-feature-link" to={card.href}>
                    {card.cta} →
                  </Link>
                )}
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChoreographerPremium({ onStart }) {
  const choreographySteps = [
    ["01", "Song & style", "We understand your song, event, dancer count, age group and comfort level before planning the routine."],
    ["02", "Counts & formations", "Clear counts, entries, spacing, group formations and transition points are mapped for easy rehearsals."],
    ["03", "Performance polish", "Expressions, stage presence, endings and confidence cues are refined so the final act feels complete."],
  ];
  const choreographyTypes = [
    "Wedding sangeet choreography",
    "Bride, groom and couple dance",
    "Family and group performance",
    "School and college function",
    "Corporate and cultural stage choreography",
  ];

  return (
    <section className="section choreographer-premium wrap">
      <div className="choreo-premium-intro">
        <p className="eyebrow">CHOREOGRAPHER SERVICES</p>
        <h2>
          Choreography that looks clean,
          <br />
          confident and stage-ready.
        </h2>
        <p>
          Every routine is planned around the people performing it. Simple where
          it should be simple, impressive where the moment needs impact.
        </p>
      </div>
      <div className="choreo-premium-grid">
        {choreographySteps.map(([number, title, copy], index) => (
          <m.article
            className="choreo-premium-card"
            key={title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </m.article>
        ))}
      </div>
      <div className="choreo-type-panel">
        <div>
          <p className="eyebrow">PERFORMANCE TYPES</p>
          <h3>Built for real rehearsals and real stages.</h3>
        </div>
        <ul>
          {choreographyTypes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button
          className="button primary premium-gold-button"
          onClick={() => onStart("Choreographer", "", "Choreography")}
        >
          Plan choreography ↗
        </button>
      </div>
    </section>
  );
}

const choreographyProjects = [
  {
    id: "bride-expressions",
    title: "Bride Expressions",
    category: "Wedding solo",
    description:
      "A bride solo performance from the MR MUSIC MACK choreography video collection.",
    filename: "bride-expressions.mp4",
    poster: "/costume-gallery/costume-blue-stage-gown.jpg",
  },
  {
    id: "couple-chemistry",
    title: "Couple Chemistry",
    category: "Couple performance",
    description:
      "A couple dance performance featured in the wedding choreography video collection.",
    filename: "couple-chemistry.mp4",
    poster: "/costume-gallery/costume-blue-bridal-look.jpg",
  },
  {
    id: "sangeet-squad-practice",
    title: "Sangeet Squad",
    category: "Group choreography",
    description:
      "A group choreography video featuring a sangeet performance routine.",
    filename: "sangeet-squad-practice.mp4",
    poster: "/costume-gallery/costume-family-wedding-look.jpg",
  },
  {
    id: "varmala-execution",
    title: "Breathtaking Varmala",
    category: "Ceremony concept",
    description:
      "A ceremony-led choreography moment from the MR MUSIC MACK video collection.",
    filename: "varmala-execution.mp4",
    poster: "/costume-gallery/costume-wedding-sangeet-performance.jpg",
  },
];

function ChoreographerSeoSections() {
  const [playingVideo, setPlayingVideo] = useState(null);

  return (
    <>
      <section className="choreo-editorial-section">
        <div className="wrap choreo-editorial">
          <p className="eyebrow">CHOREOGRAPHY IN JAIPUR &amp; BEYOND</p>
          <h2>Creative Wedding &amp; Sangeet Choreography for Every Celebration.</h2>
          <p>
            MR MUSIC MACK is a Jaipur-based creative studio offering
            personalized choreography concepts for weddings, sangeet
            celebrations, couple performances, Bollywood dance and stage events.
          </p>
          <p>
            Our choreography approach combines expressive movement, carefully
            selected music, performance planning and creative direction.
          </p>
          <p>
            From intimate family celebrations to larger performance concepts,
            we develop choreography around the event, participants and creative
            requirements.
          </p>
          <p>
            We welcome enquiries from Jaipur, across India and internationally,
            with remote or on-location arrangements discussed according to
            project availability.
          </p>
          <nav className="choreo-context-links" aria-label="Related MR MUSIC MACK services">
            <Link to="/wedding-music-editing">Explore custom wedding dance mashup editing</Link>
            <Link to="/music-editing">Explore music editing services</Link>
            <Link to="/costume-design">Explore performance costume design</Link>
            <Link to="/the-studio">Discover The Studio</Link>
            <Link to="/the-collection">Browse The Collection</Link>
            <Link to="/lets-connect">Send a choreography enquiry</Link>
          </nav>
        </div>
      </section>

      <section className="choreo-video-section wrap" aria-labelledby="choreo-video-title">
        <div className="section-heading">
          <p className="eyebrow">SELECTED CHOREOGRAPHY VIDEOS</p>
          <h2 id="choreo-video-title">Explore Our Wedding &amp; Dance Performance Projects.</h2>
          <p>Watch selected videos from the existing MR MUSIC MACK choreography collection.</p>
        </div>
        <div className="choreo-video-grid">
          {choreographyProjects.map((project) => {
            const isPlaying = playingVideo === project.id;
            return (
              <article
                className={`choreo-video-card${isPlaying ? " is-playing" : ""}`}
                key={project.id}
              >
                <div className="choreo-video-frame">
                  <img
                    src={project.poster || choreographerFeatureImage}
                    alt={`Illustrative thumbnail for ${project.title}, a ${project.category.toLowerCase()} video`}
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="choreo-video-play"
                    aria-label={`Play ${project.title} choreography video`}
                    hidden={isPlaying}
                    onClick={() => setPlayingVideo(project.id)}
                  >
                    <span aria-hidden="true">▶</span>
                    Play video
                  </button>
                  <video
                    className={isPlaying ? "is-playing" : ""}
                    controls={isPlaying}
                    autoPlay={isPlaying}
                    playsInline
                    preload="none"
                    poster={project.poster || choreographerFeatureImage}
                    aria-label={`${project.title} — ${project.category} choreography video`}
                    tabIndex={isPlaying ? 0 : -1}
                  >
                    <source
                      src={`/collection-videos/${project.filename}`}
                      type="video/mp4"
                    />
                    Your browser does not support embedded video.
                  </video>
                </div>
                <div className="choreo-video-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="choreo-video-links">
                    <Link to="/the-collection">Explore The Collection</Link>
                    <Link to="/lets-connect">Enquire about choreography</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="choreo-faq-section wrap">
        <div className="section-heading">
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Wedding &amp; Sangeet Choreography Questions.</h2>
        </div>
        <div className="choreo-faq-list">
          {choreographerFaqItems.map(({ question, answer }) => (
            <details className="choreo-faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

const costumeDesignCards = [
  {
    eyebrow: "WEDDING & CELEBRATION",
    title: "Wedding & Bridal Looks",
    description:
      "Explore expressive bridal and family looks created for wedding celebrations and sangeet performances.",
    image: "/costume-gallery/costume-blue-bridal-look.jpg",
    cta: "View bridal collection",
    category: "Wedding & Bridal",
  },
  {
    eyebrow: "ROOTED IN CULTURE",
    title: "Traditional & Folk",
    description:
      "Discover colorful folk, peacock-inspired and character-led looks drawn from Indian performance traditions.",
    image: "/costume-gallery/costume-green-folk-look.jpg",
    cta: "Explore cultural looks",
    category: "Traditional & Folk",
  },
  {
    eyebrow: "MADE FOR MOVEMENT",
    title: "Stage & Dance",
    description:
      "Browse vivid performance outfits and stage looks designed to make a striking visual impression.",
    image: "/costume-gallery/costume-purple-stage-look.jpg",
    cta: "Explore stage looks",
    category: "Stage & Dance",
  },
  {
    eyebrow: "A WORLD OF IMAGINATION",
    title: "Fantasy & Character",
    description:
      "Explore imaginative winged, floral and character costumes with distinctive silhouettes and detail.",
    image: "/costume-gallery/costume-white-wing-stage-1.jpg",
    cta: "View fantasy designs",
    category: "Fantasy & Character",
  },
  {
    eyebrow: "DETAIL MAKES THE DESIGN",
    title: "Costume Details & Concepts",
    description:
      "Take a closer look at selected costume concepts, embellishment and sculptural design details.",
    image: "/costume-gallery/costume-silver-mannequin-design.jpg",
    cta: "View design details",
    category: "Costume Details",
  },
];

const costumeGalleryItems = [
  {
    title: "Blue Bridal Performance Look",
    category: "Wedding & Bridal",
    image: "/costume-gallery/costume-blue-bridal-look.jpg",
    alt: "Bride in a blue feathered performance costume beside a groom",
  },
  {
    title: "Family Wedding Celebration",
    category: "Wedding & Bridal",
    image: "/costume-gallery/costume-family-wedding-look.jpg",
    alt: "Family dressed for a coordinated wedding celebration",
  },
  {
    title: "Wedding Sangeet Performance",
    category: "Wedding & Bridal",
    image: "/costume-gallery/costume-wedding-sangeet-performance.jpg",
    alt: "Wedding couple and dancers in coordinated performance costumes",
  },
  {
    title: "Green Folk-Inspired Look",
    category: "Traditional & Folk",
    image: "/costume-gallery/costume-green-folk-look.jpg",
    alt: "Green folk-inspired costume with colorful traditional detailing",
  },
  {
    title: "Peacock-Inspired Costume",
    category: "Traditional & Folk",
    image: "/costume-gallery/costume-peacock-folk-costume.jpg",
    alt: "Peacock-inspired costume with colorful feather detailing",
  },
  {
    title: "Krishna Character Costume",
    category: "Traditional & Folk",
    image: "/costume-gallery/costume-krishna-character-look.jpg",
    alt: "Blue and gold Krishna character costume with traditional accessories",
  },
  {
    title: "Silver Men's Stage Look",
    category: "Stage & Dance",
    image: "/costume-gallery/costume-silver-mens-stage-look.jpg",
    alt: "Silver embellished men's costume styled for a stage performance",
  },
  {
    title: "Purple Performance Costume",
    category: "Stage & Dance",
    image: "/costume-gallery/costume-purple-stage-look.jpg",
    alt: "Purple embellished costume for a dance performance",
  },
  {
    title: "Blue Stage Gown",
    category: "Stage & Dance",
    image: "/costume-gallery/costume-blue-stage-gown.jpg",
    alt: "Blue stage gown with a flowing performance silhouette",
  },
  {
    title: "Red Feathered Stage Look",
    category: "Stage & Dance",
    image: "/costume-gallery/costume-red-feather-stage-look.jpg",
    alt: "Red and white feathered costume worn for a stage performance",
  },
  {
    title: "White Winged Stage Look",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-white-wing-stage-1.jpg",
    alt: "White winged character costume with feather detailing",
  },
  {
    title: "Winged Costume in a Stage Setting",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-white-wing-stage-2.jpg",
    alt: "White feathered wing costume presented in a stage setting",
  },
  {
    title: "Futuristic Costume Ensemble",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-futuristic-stage-ensemble.jpg",
    alt: "Group wearing futuristic character costumes for a themed performance",
  },
  {
    title: "Feathered Wing Portrait",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-feathered-wing-portrait.jpg",
    alt: "Performer in a white feathered wing costume",
  },
  {
    title: "Floral Character Look",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-floral-stage-look.jpg",
    alt: "Floral headpiece and costume styled for a character performance",
  },
  {
    title: "Red Character Costume",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-red-character-look.jpg",
    alt: "Red character costume with dramatic stage styling",
  },
  {
    title: "White Winged Character Look",
    category: "Fantasy & Character",
    image: "/costume-gallery/costume-white-wing-character-look.jpg",
    alt: "White winged character costume with a full feathered silhouette",
  },
  {
    title: "Feather Costume Detail",
    category: "Costume Details",
    image: "/costume-gallery/costume-feather-detail.jpg",
    alt: "Close-up of layered feather detail on a performance costume",
  },
  {
    title: "Silver Mannequin Costume Concept",
    category: "Costume Details",
    image: "/costume-gallery/costume-silver-mannequin-design.jpg",
    alt: "Silver embellished costume displayed on a mannequin",
  },
];

const costumeFeatures = [
  "Personalized Creative Concepts",
  "Traditional & Contemporary Design Inspiration",
  "Performance-Focused Styling",
  "Attention to Visual Details",
  "Collaborative Creative Planning",
];

const costumeFaqItems = [
  {
    question: "Do you provide costume design services in Jaipur?",
    answer:
      "Yes. MR MUSIC MACK is based in Jaipur and welcomes suitable costume design and creative styling enquiries from clients across India and internationally.",
  },
  {
    question: "Can I enquire about custom costume design?",
    answer:
      "Yes. Share your event, theme, references, performance brief and styling preferences so we can discuss the direction, look and next steps.",
  },
  {
    question: "Do you design costumes for dance performances?",
    answer:
      "Yes. We create dance costume concepts for stage, wedding, sangeet and performance projects with movement, comfort and visual impact in mind.",
  },
  {
    question: "Can you help with traditional and western costume concepts?",
    answer:
      "Yes. We work across traditional, western, party wear, wedding and performance-focused costume directions depending on the brief.",
  },
  {
    question: "Do you provide wedding and sangeet costume design?",
    answer:
      "Yes. We can discuss wedding performance outfits, sangeet looks, family event styling and celebration costume concepts based on your event needs.",
  },
  {
    question: "Do you accept costume design projects outside Jaipur?",
    answer:
      "Yes. We welcome suitable enquiries from across India and internationally for custom creative costume design discussions and project planning.",
  },
  {
    question: "Can you develop theme-based costume concepts?",
    answer:
      "Yes. We can explore theme-based, character-driven and concept-led costume directions for creative performances and special occasions.",
  },
  {
    question: "How much does custom costume design cost?",
    answer:
      "Every costume design enquiry is planned around the concept, scope, event, references and project requirements. We can discuss the brief before planning next steps.",
  },
  {
    question: "Can costume styling be coordinated with choreography?",
    answer:
      "Yes. Costume design and choreography can be discussed together to create a more refined performance look and movement flow.",
  },
  {
    question: "How can I share my costume design references?",
    answer:
      "You can send your ideas, moodboard, event details, references, colors, preferred silhouettes and any performance context through the enquiry form or WhatsApp.",
  },
];

function CostumeDesignPage({ onStart }) {
  const [activeFilter, setActiveFilter] = useState("All Designs");
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryFilters = [
    "All Designs",
    ...costumeDesignCards.map((card) => card.category),
  ];

  const visibleGallery =
    activeFilter === "All Designs"
      ? costumeGalleryItems
      : costumeGalleryItems.filter((item) => item.category === activeFilter);
  const currentGalleryItem = visibleGallery[activeSlide] || visibleGallery[0];

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setActiveSlide(0);
  };

  const moveSlide = (direction) => {
    setActiveSlide((current) =>
      (current + direction + visibleGallery.length) % visibleGallery.length,
    );
  };

  return (
    <div className="costume-design-page">
      <section className="costume-hero" aria-labelledby="costume-design-title">
        <div className="costume-hero-backdrop" aria-hidden="true" />
        <div className="wrap costume-hero-grid">
          <div className="costume-hero-copy">
            <p className="eyebrow">COSTUME DESIGN • CREATIVE FASHION • PERFORMANCE STYLE</p>
            <h1 id="costume-design-title">
              Costume Designer in Jaipur — <span>Creative &amp; Performance Costumes</span>
            </h1>
            <p className="highlight-line">
              <span>Created to Perform.</span>
            </p>
            <p className="costume-lead">
              Discover creative costume design by MR MUSIC MACK, where traditional elegance,
              contemporary fashion and performance-focused styling come together. From custom dance
              costumes and stage outfits to wedding, party and theme-based designs, we bring artistic
              ideas to life.
            </p>
            <p className="costume-location">Based in Jaipur | Creative Enquiries Across India &amp; Worldwide</p>
            <div className="button-row costume-cta-row">
              <a href="#costume-categories" className="button primary">Explore Our Designs</a>
              <button
                type="button"
                className="button text-button"
                onClick={() => onStart("Costume Design", "", "Costume Design")}
              >
                Discuss Your Costume
              </button>
            </div>
          </div>
          <div className="costume-hero-visual" aria-label="Premium costume design portrait">
            <img
              src="/costume-gallery/costume-blue-stage-gown.jpg"
              alt="Blue stage gown from the MR MUSIC MACK costume collection"
            />
            <div className="costume-hero-badge">
              <span>STYLED</span>
              <strong>Stage ready</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="costume-story wrap">
        <div className="costume-story-image">
          <img
            src="/costume-gallery/costume-peacock-folk-costume.jpg"
            alt="Peacock-inspired costume with colorful feather detailing"
          />
        </div>
        <div className="costume-story-copy">
          <p className="eyebrow">THE ART OF COSTUME DESIGN</p>
          <h2>Every Costume Tells a Story.</h2>
          <p>
            At MR MUSIC MACK, costume design is more than selecting an outfit. It is about creating a
            visual identity that complements personality, movement, occasion and artistic expression.
          </p>
          <p>
            From traditional Indian aesthetics to modern western fashion and expressive stage costumes,
            our creative approach focuses on design concepts that bring ideas and performances together.
          </p>
          <p>
            Whether the requirement is a wedding celebration, a themed performance, a dance production or
            a distinctive creative outfit, we explore designs that reflect the intended mood, character
            and visual story.
          </p>
        </div>
      </section>

      <section id="costume-categories" className="costume-categories wrap">
        <div className="section-heading">
          <p className="eyebrow">OUR DESIGN EXPERTISE</p>
          <h2>Distinctive Designs for Every Expression.</h2>
          <p>Explore costume concepts shaped by creativity, detail and individual style.</p>
        </div>
        <div className="costume-card-grid">
          {costumeDesignCards.map((card) => (
            <article key={card.title} className="costume-card">
              <img
                src={card.image}
                alt={`${card.title} from the costume collection`}
                loading="lazy"
              />
              <div className="costume-card-overlay" />
              <div className="costume-card-content">
                <p className="eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a href="#costume-gallery" onClick={() => selectFilter(card.category)}>
                  {card.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="costume-gallery" className="costume-gallery wrap">
        <div className="section-heading">
          <p className="eyebrow">SELECTED DESIGNS</p>
          <h2>Costume Designs, Curated by Category.</h2>
          <p>Browse selected costume designs by style, then move through each image in the gallery.</p>
        </div>
        <div className="costume-gallery-filters" aria-label="Costume gallery category filters">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={filter === activeFilter}
              className={filter === activeFilter ? "is-active" : ""}
              onClick={() => selectFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div
          className="costume-gallery-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={`${activeFilter} costume images`}
        >
          <article className="costume-gallery-feature" aria-live="polite">
            <img src={currentGalleryItem.image} alt={currentGalleryItem.alt} />
            <div className="costume-gallery-feature-overlay">
              <span>{currentGalleryItem.category}</span>
              <h3>{currentGalleryItem.title}</h3>
              <button
                type="button"
                onClick={() => onStart("Costume Design", "", "Costume Design")}
              >
                Enquire about a costume
              </button>
            </div>
            <div className="costume-gallery-controls">
              <button
                type="button"
                aria-label="Previous costume image"
                onClick={() => moveSlide(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Next costume image"
                onClick={() => moveSlide(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
          <div className="costume-gallery-thumbnails" aria-label="Choose a costume image">
            {visibleGallery.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === activeSlide ? "is-active" : ""}
                aria-label={`Show ${item.title}`}
                aria-pressed={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              >
                <img src={item.image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <p className="costume-gallery-count" aria-live="polite">
            {activeSlide + 1} / {visibleGallery.length} designs
          </p>
        </div>
        <div className="costume-gallery-cta">
          <Link className="button primary" to="/the-collection">View Complete Collection</Link>
        </div>
      </section>

      <section className="costume-process wrap">
        <div className="section-heading narrow">
          <p className="eyebrow">OUR CREATIVE PROCESS</p>
          <h2>From Inspiration to Expression.</h2>
        </div>
        <div className="costume-process-timeline">
          {[
            ["01", "Discover", "Understanding the occasion, theme, performance requirements and creative vision."],
            ["02", "Concept", "Exploring design directions, visual references, silhouettes and styling ideas."],
            ["03", "Develop", "Refining the selected concept, design details and overall creative presentation."],
            ["04", "Finalize", "Preparing the agreed design concept and coordinating the next steps according to project scope."],
          ].map(([step, title, copy]) => (
            <article key={step} className="costume-process-step">
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="costume-harmony wrap">
        <div className="section-heading narrow">
          <p className="eyebrow">CREATIVITY IN HARMONY</p>
          <h2>Where Costume Meets Performance.</h2>
        </div>
        <div className="costume-harmony-grid">
          <article className="costume-harmony-tile costume-harmony-main">
            <p className="eyebrow">COSTUME DESIGN</p>
            <h3>Creative styling for expressive performances.</h3>
            <Link to="/costume-design">Explore costume design</Link>
          </article>
          <article className="costume-harmony-tile">
            <p className="eyebrow">CHOREOGRAPHY</p>
            <h3>Movement-shaped performance planning.</h3>
            <Link to="/choreographer">Explore choreography</Link>
          </article>
          <article className="costume-harmony-tile">
            <p className="eyebrow">MUSIC EDITING</p>
            <h3>Sound direction for stage and storytelling.</h3>
            <Link to="/music-editing">Explore music editing</Link>
          </article>
        </div>
      </section>

      <section className="costume-reach wrap">
        <div className="section-heading narrow">
          <p className="eyebrow">OUR CREATIVE REACH</p>
          <h2>Designed in Jaipur. Inspired Without Borders.</h2>
        </div>
        <p className="costume-reach-copy">
          MR MUSIC MACK is based in Jaipur, Rajasthan, and welcomes suitable costume design and
          creative styling enquiries from across India and internationally. Whether you are planning a
          stage performance, wedding celebration or custom creative project, we can discuss design
          requirements, references and project coordination online.
        </p>
        <div className="costume-reach-grid">
          <div><strong>Jaipur-Based Creative Studio</strong></div>
          <div><strong>Pan-India Design Enquiries</strong></div>
          <div><strong>International Creative Collaboration</strong></div>
          <div><strong>Online Design Consultation</strong></div>
        </div>
      </section>

      <section className="costume-features wrap">
        <div className="section-heading narrow">
          <p className="eyebrow">THE CREATIVE DIFFERENCE</p>
          <h2>Thoughtful Design. Distinctive Expression.</h2>
        </div>
        <div className="costume-feature-list">
          {costumeFeatures.map((feature) => (
            <div key={feature} className="costume-feature-item">
              <span>✦</span>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="costume-faq wrap">
        <div className="section-heading narrow">
          <p className="eyebrow">FREQUENTLY ASKED</p>
          <h2>Creative Costume Design Questions.</h2>
        </div>
        <div className="costume-faq-list">
          {costumeFaqItems.map((item) => (
            <details key={item.question} className="costume-faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="costume-final-cta" id="costume-final-cta">
        <div className="wrap costume-final-inner">
          <div>
            <p className="eyebrow">LET'S CREATE YOUR LOOK</p>
            <h2>Your Vision. Our Creative Expression.</h2>
            <p>
              Have a costume concept, performance theme or special occasion in mind? Share your ideas
              with MR MUSIC MACK and explore a creative design direction that reflects your vision.
            </p>
          </div>
          <div className="costume-final-actions">
            <button type="button" className="button primary" onClick={() => onStart("Costume Design", "", "Costume Design")}>
              Discuss Your Costume Design
            </button>
            <a className="button secondary" href="https://wa.me/919887563201?text=Hello%20MR%20MUSIC%20MACK%2C%20I%20am%20interested%20in%20costume%20design%20services.%20I%20would%20like%20to%20discuss%20my%20requirements." target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceSeoSection({ path, service }) {
  const seo = serviceSeoContent[path];

  if (!seo) return null;
  const serviceName = service?.name || seo.heading.split(" services")[0];
  const primaryKeywords = seo.keywords.slice(0, 5).join(", ");
  const featuredKeywords = seo.keywords.slice(0, 8);
  const supportingKeywords = seo.keywords.slice(8);
  const processItems = [
    ["01", "Brief", "Share your event, songs, video, references, dates and the exact result you want."],
    ["02", "Plan", "We shape the concept, structure, cues, styling or sound direction around your requirement."],
    ["03", "Deliver", "Final files, guidance or service support are prepared for your stage, shoot or release."],
  ];

  return (
    <section className="section service-seo-section service-design-section">
      <div className="service-design-shell">
        <div className="service-design-intro">
          <div className="service-seo-kicker">
            <p className="eyebrow">INDIA & WORLDWIDE SERVICE COVERAGE</p>
            <span>{seo.locations.length}+ cities</span>
          </div>
          <h2>{seo.heading}</h2>
          <p>{seo.intro}</p>
          <p>
            Popular requirements include {primaryKeywords}. Each enquiry is
            handled as a custom service for clients all over India and worldwide,
            so the final plan matches the event, performance, video or creative
            use case.
          </p>
          {service?.name && (
            <p>
              For {service.name.toLowerCase()}, share your songs, video, event
              brief or references online. We plan the final audio, choreography
              or styling around your exact requirement and delivery timeline.
            </p>
          )}
          <div className="service-seo-proof" aria-label={`${serviceName} SEO service summary`}>
            <span>Online brief</span>
            <span>Custom planning</span>
            <span>India delivery</span>
          </div>
        </div>

        <div className="service-design-board">
          <div className="service-design-topline">
            <div>
              <p className="eyebrow">POPULAR SEARCHES</p>
              <strong>{serviceName}</strong>
            </div>
            <span>Custom service planning</span>
          </div>
          <ul className="seo-keyword-list seo-keyword-list-featured">
            {featuredKeywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
          {supportingKeywords.length > 0 && (
            <ul className="seo-support-list" aria-label="More popular service searches">
              {supportingKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="service-area-card">
          <div className="service-seo-panel-title">
            <p className="eyebrow">SERVICE AREAS</p>
            <strong>All Over India & Worldwide</strong>
          </div>
          <p className="seo-location-copy">
            Available all over India and worldwide:
          </p>
          <ul className="seo-location-list">
            {seo.locations.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
        </div>

        <div className="service-process-card">
          {processItems.map(([number, title, copy]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicePage({
  path,
  query,
  pageName,
  onStart: startProject,
  siteContent,
}) {
  const managedPage = siteContent?.pages?.[path];
  const isHome = path === "/";
  const isEditing = path === "/music-editing";
  const isBackground = path === "/background-music";
  const isServices = path === "/services";
  const isWedding = path === "/wedding-performance-music";
  const isWork = path === "/the-collection" || path === "/our-work";
  const isAbout = path === "/the-studio" || path === "/about";
  const isContact = path === "/lets-connect" || path === "/contact";
  const isCostumeDesign = path === "/costume-design";
  const isChoreographer = path === "/choreographer";
  const isCustomPage = Boolean(managedPage) && !(
    isHome || isEditing || isBackground || isServices || isWedding || isWork ||
    isAbout || isContact || isCostumeDesign || isChoreographer || landingPages[path]
  );
  const service = landingPages[path]
    ? { ...landingPages[path], ...(managedPage || {}) }
    : isCustomPage ? managedPage : undefined;
  const found =
    isHome ||
    isEditing ||
    isBackground ||
    isServices ||
    isWedding ||
    isWork ||
    isAbout ||
    isContact ||
    service;
  const editingServiceLinks = siteContent?.services
    ?.filter((item) => item.category === "editing" && item.enabled)
    .map((item) => [item.name, item.path]);
  const backgroundServiceCards = siteContent?.services
    ?.filter((item) => item.category === "background" && item.enabled)
    .map((item) => ({ ...item, title: item.name, label: item.name.toUpperCase() }));
  const premiumHeroClass = [
    "page-hero wrap premium-page-hero",
    isBackground || service?.background ? "premium-page-hero-background" : "",
    isCostumeDesign || isChoreographer ? "premium-page-hero-costume" : "",
    isChoreographer ? "premium-page-hero-choreographer" : "",
    isWork ? "premium-page-hero-collection" : "",
  ].filter(Boolean).join(" ");
  const premiumHeroStyle = isChoreographer
    ? {
        backgroundImage: `linear-gradient(105deg, rgba(5, 7, 12, 0.9) 0%, rgba(12, 8, 13, 0.66) 43%, rgba(8, 10, 12, 0.24) 100%), radial-gradient(circle at 80% 22%, rgba(40, 109, 255, 0.18), transparent 28%), radial-gradient(circle at 22% 78%, rgba(247, 154, 33, 0.24), transparent 34%), url(${choreographerHeroImage})`,
        backgroundPosition: "center 42%",
        backgroundSize: "cover",
      }
    : undefined;

  if (path === "/the-studio")
    return (
      <StudioPage
        pageName={pageName}
        page={managedPage}
        onStart={startProject}
      />
    );

  if (isCostumeDesign) {
    return <CostumeDesignPage onStart={startProject} />;
  }

  return (
    <>
      {" "}
      {found && !isWork && (
        <m.section
          className={premiumHeroClass}
          style={premiumHeroStyle}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <m.div
            className="premium-hero-orbit"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          />
          <div className="premium-hero-wave" aria-hidden="true">
            {Array.from({ length: 42 }).map((_, index) => (
              <m.i
                key={index}
                style={{ height: `${18 + ((index * 17) % 74)}%` }}
                animate={{ scaleY: [0.58, 1.14, 0.72] }}
                transition={{
                  duration: 1.5 + (index % 6) * 0.14,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.025,
                }}
              />
            ))}
          </div>
          <m.div
            className="premium-hero-badge"
            aria-hidden="true"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
          >
            <span>{isWork ? "CURATED" : isChoreographer ? "CHOREO" : isCostumeDesign ? "STYLED" : "SCORED"}</span>
            <b>{isWork ? "Collection" : isChoreographer ? "Performance ready" : isCostumeDesign ? "Stage ready" : "Picture ready"}</b>
          </m.div>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / {pageName}
          </p>
          <p className="eyebrow">MR MUSIC MACK / JAIPUR</p>
          <h1>
            {service?.title || managedPage?.title || pageName}
            {!isChoreographer && <span className="coral">.</span>}
          </h1>
          {isChoreographer && (
            <p className="choreo-hero-tagline">
              Every Beat Has a Story. Every Move Creates a Memory.
            </p>
          )}
          <p>
            {service?.description || managedPage?.description ||
              (isEditing
                ? "Your songs, professionally cut, combined, arranged and polished. Music editing is the heart of what we do."
                : isBackground
                  ? "Custom background music for your films, advertisements, YouTube videos, project launches and brand content. Your story leads. The sound follows."
                  : "Your music. Your story. Your sound. Discover a considered approach to music editing and audio production.")}
          </p>
          <div className="button-row">
            <button
              className="button primary"
              onClick={() =>
                startProject(
                  service?.type ||
                    (isBackground ? "Background Music" : "Music Editing"),
                  "",
                  service?.need,
                )
              }
            >
              Start your project ↗
            </button>
            {!isWork && !isCostumeDesign && !isChoreographer && (
              <Link
                className="button text-button"
                to={`/the-collection${isBackground || service?.background ? "?category=background" : ""}`}
              >
                ▶ Listen to samples
              </Link>
            )}
          </div>
        </m.section>
      )}
      {(isEditing || isBackground || isCostumeDesign || service) && (
        <PremiumShowcase
          path={path}
          service={service}
          pageName={pageName}
          onStart={startProject}
        />
      )}
      {isEditing && <MusicEditing onStart={startProject} />}
      {isBackground && <BackgroundMusic onStart={startProject} />}
      {(isBackground || isServices) && <BackgroundUses services={backgroundServiceCards} />}
      {(isBackground || service?.background) && <Process />}
      {(isBackground || service?.background) && (
        <MoodSelector onStart={startProject} />
      )}
      {(isEditing || isServices) && <EditingServices services={editingServiceLinks} />}
      {(isWedding || path === "/wedding-music-editing") && (
        <Wedding onStart={startProject} />
      )}
      {isChoreographer && <ChoreographerPremium onStart={startProject} />}
      {service && (
        <section className={`section wrap landing-details${isChoreographer ? " choreographer-details" : ""}`}>
          <div>
            <p className="eyebrow">
              {isChoreographer
                ? "CHOREOGRAPHY DETAILS"
                : isCostumeDesign
                  ? "COSTUME DETAILS"
                  : "BUILT AROUND YOUR REQUIREMENT"}
            </p>
            <h2>
              {isChoreographer ? (
                <>
                  Your song.
                  <br />
                  Your steps.
                </>
              ) : isCostumeDesign ? (
                <>
                  Your concept.
                  <br />
                  Your final look.
                </>
              ) : (
                <>
                  Every detail.
                  <br />
                  Working together.
                </>
              )}
            </h2>
            <ul>
              {service.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">LET'S GET STARTED</p>
            <h3>
              {isChoreographer
                ? "What to share for choreography"
                : isCostumeDesign
                  ? "What to share for costume design"
                  : "What to share with us"}
            </h3>
            <p>{service.preparation}</p>
            <p>
              {isChoreographer
                ? "Routine style, counts, formations, rehearsal plan and music cues are discussed before choreography begins."
                : isCostumeDesign
                  ? "Design direction, fabric choices, fitting needs, timeline and budget are discussed before work begins."
                  : "Scope, rehearsal plan, turnaround, revisions and delivery formats are discussed for your specific project before work begins."}
            </p>
            <button
              className="button primary"
              style={{ marginTop: 25 }}
              onClick={() => startProject(service.type, "", service.need)}
            >
              Discuss {service.name.toLowerCase()} ↗
            </button>
          </div>
        </section>
      )}
      {isChoreographer && <ChoreographerSeoSections />}
      {(isEditing || isBackground || (service && !isChoreographer)) && (
        <ServiceSeoSection path={path} service={service} />
      )}
      {(isWork || isEditing || isBackground || (service && !isCostumeDesign && !isChoreographer)) && (
        <OurWork
          collectionPage={isWork}
          onStart={startProject}
          initialCategory={
            isBackground ||
            service?.background ||
            query.get("category") === "background"
              ? "background"
              : "editing"
          }
        />
      )}
      {(isAbout || isEditing) && <WhyUs />}
      {isAbout && <About />}
      {(isServices || isAbout) && <ProjectJourneys />}
      {(isEditing || isBackground || (service && !isCostumeDesign && !isChoreographer)) && <FAQ />}
      {!found && (
        <section className="wrap not-found">
          <p className="eyebrow">404 / A LITTLE OFFBEAT</p>
          <h1>This page is missing.</h1>
          <p>Let's get you back to the music.</p>
          <Link className="button primary" to="/">
            Back to home ↗
          </Link>
        </section>
      )}
    </>
  );
}
