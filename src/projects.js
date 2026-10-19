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
    coverImage: "/costume-gallery/costume-wedding-sangeet-performance.jpg",
    gallery: ["/costume-gallery/costume-wedding-sangeet-performance.jpg", "/main-service-cards/choreography.jpg", "/costume-gallery/costume-purple-stage-look.jpg"],
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
    coverImage: "/main-service-cards/choreography.jpg",
    gallery: ["/main-service-cards/choreography.jpg", "/costume-gallery/costume-futuristic-stage-ensemble.jpg", "/main-service-cards/background-music.jpg"],
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
    coverImage: "/costume-gallery/costume-purple-stage-look.jpg",
    gallery: ["/costume-gallery/costume-purple-stage-look.jpg", "/costume-gallery/costume-wedding-sangeet-performance.jpg", "/main-service-cards/music-editing.jpg"],
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
    coverImage: "/main-service-cards/background-music.jpg",
    gallery: ["/main-service-cards/background-music.jpg", "/main-service-cards/music-editing.jpg", "/costume-gallery/costume-futuristic-stage-ensemble.jpg"],
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
    coverImage: "/costume-gallery/costume-futuristic-stage-ensemble.jpg",
    gallery: ["/costume-gallery/costume-futuristic-stage-ensemble.jpg", "/main-service-cards/choreography.jpg", "/main-service-cards/background-music.jpg"],
    audio: [{ id: "remix", title: "Performance edit study", duration: 16 }],
    highlights: [
      "Group formations",
      "Cue-based music edits",
      "Stage-ready final track",
    ],
  },
];
