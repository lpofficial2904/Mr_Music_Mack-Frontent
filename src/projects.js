import liveRecording from "./assets/showcase-live-recording.jpg";
import mobileStudio from "./assets/showcase-mobile-studio.jpg";
import soundMixing from "./assets/showcase-sound-mixing.jpg";
import trackMastering from "./assets/showcase-track-mastering.jpg";
import voiceRecording from "./assets/showcase-voice-recording.jpg";
import premiumStudio from "./assets/premium-studio-hero.png";

export const projectCategories = [
  "All",
  "Weddings",
  "Choreography",
  "Music Editing",
  "Costume Design",
  "Background Music",
  "Events",
];

export const portfolioProjects = [
  {
    title: "Royal Wedding Sangeet",
    slug: "royal-wedding-sangeet",
    location: "Jaipur, Rajasthan",
    year: "2026",
    category: "Weddings",
    services: ["Music Editing", "Choreography", "Costume Styling"],
    description:
      "A complete sangeet performance package with family acts, couple choreography, custom song transitions and stage-focused styling direction.",
    coverImage: premiumStudio,
    gallery: [premiumStudio, liveRecording, voiceRecording],
    audio: [
      { id: "wedding", title: "Original track direction", duration: 18 },
      { id: "dance", title: "Final performance edit", duration: 16 },
    ],
    highlights: [
      "5 family performances",
      "Couple performance with emotional entry",
      "Custom song mashup and performance cues",
      "Costume palette planned around the stage look",
    ],
    featured: true,
  },
  {
    title: "Destination Wedding Performance",
    slug: "destination-wedding-performance",
    location: "Udaipur, Rajasthan",
    year: "2026",
    category: "Choreography",
    services: ["Choreography", "Music Editing", "Costume Design"],
    description:
      "A destination wedding performance planned around guest comfort, camera-friendly formations and a polished final music track.",
    coverImage: liveRecording,
    gallery: [liveRecording, mobileStudio, soundMixing],
    highlights: [
      "Bride and groom duet",
      "Family group choreography",
      "Rehearsal-to-final performance mapping",
    ],
  },
  {
    title: "Stage Costume Direction",
    slug: "stage-costume-direction",
    location: "Delhi NCR",
    year: "2025",
    category: "Costume Design",
    services: ["Costume Design", "Creative Direction"],
    description:
      "Performance costume concepts shaped around choreography, lighting, movement and final stage presence.",
    coverImage: voiceRecording,
    gallery: [voiceRecording, premiumStudio, trackMastering],
    highlights: [
      "Concept to final stage look",
      "Movement-friendly costume planning",
      "Color and accessory direction",
    ],
  },
  {
    title: "Brand Launch Background Score",
    slug: "brand-launch-background-score",
    location: "Mumbai, Maharashtra",
    year: "2025",
    category: "Background Music",
    services: ["Background Music", "Custom Music Production"],
    description:
      "A cinematic launch score with a controlled build, reveal cue and polished final mix for a premium event film.",
    coverImage: soundMixing,
    gallery: [soundMixing, trackMastering, mobileStudio],
    audio: [{ id: "launch", title: "Final launch score", duration: 16 }],
    highlights: [
      "Reveal-focused build",
      "Brand film timing",
      "Mix prepared for event playback",
    ],
  },
  {
    title: "School Annual Day Act",
    slug: "school-annual-day-act",
    location: "Jaipur, Rajasthan",
    year: "2025",
    category: "Events",
    services: ["Music Editing", "Choreography"],
    description:
      "A group performance track and choreography structure built for clear counts, clean entries and confident stage timing.",
    coverImage: mobileStudio,
    gallery: [mobileStudio, liveRecording, soundMixing],
    audio: [{ id: "remix", title: "Performance edit study", duration: 16 }],
    highlights: [
      "Group formations",
      "Cue-based music edits",
      "Stage-ready final track",
    ],
  },
];
