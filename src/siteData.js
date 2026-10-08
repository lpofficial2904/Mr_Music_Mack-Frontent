export const businessDescription = "MR MUSIC MACK EDITING STUDIO is a professional music editing, audio production, choreography and costume design studio based in Shyam Nagar, Sodala, Jaipur, serving clients online across India and worldwide. We specialize in music editing services, song cutting and joining, wedding mashups, sangeet mashup editing, DJ remix, background music production, mix & mastering, custom music production, dance performance track editing, choreographer services, wedding choreography and costume design for weddings, events, schools, colleges, stage shows, reels, YouTube videos, advertisements, short films, brands and creative projects.";

// Shared service information keeps page links and project choices consistent.
export const editingServices = [
  ["Music Audio Editing", "/music-editing"],
  ["Background Music", "/background-music"],
  ["Song Mixing & Mashup", "/song-mixing-mashup"],
  ["DJ Remix / Re-Creation", "/dj-remix"],
  ["Audio Editing & Arrangement", "/music-editing"],
  ["Mix & Mastering", "/mix-mastering"],
  ["Dance Performance Music Editing", "/dance-performance-music-editing"],
  ["Wedding & Event Music Preparation", "/wedding-music-editing"],
  ["School & College Function Music Editing", "/dance-performance-music-editing"],
  ["Choreography/Performance Track Preparation", "/dance-performance-music-editing"],
  ["Custom Music Production", "/custom-music-production"],
];

export const backgroundServices = [
  {
    label: "SHORT FILMS & SHORT MOVIES",
    title: "Background Music for Short Films",
    description:
      "Custom background scores designed around scenes, emotions, pacing and storytelling.",
    path: "/background-music-for-short-films",
    type: "Short Film",
  },
  {
    label: "ADVERTISEMENTS",
    title: "Music for Advertisements",
    description:
      "Attention-grabbing custom background music for promotional videos, advertisements and campaigns.",
    path: "/background-music-for-advertisements",
    type: "Advertisement",
  },
  {
    label: "PROJECT LAUNCHES",
    title: "Project Launch Music",
    description:
      "Professional background music that makes product, business and project launch presentations feel impactful.",
    path: "/background-music-for-project-launches",
    type: "Project Launch",
  },
  {
    label: "YOUTUBE",
    title: "YouTube Background Music",
    description:
      "Custom background music for intros, storytelling, educational content and branded channels.",
    path: "/background-music-for-youtube",
    type: "YouTube",
  },
  {
    label: "BRAND & PROMOTIONAL CONTENT",
    title: "Brand Content Music",
    description:
      "Custom sound designed around your brand identity and promotional storytelling.",
    path: "/background-music?project=Brand%20Content",
    type: "Background Music",
  },
  {
    label: "CUSTOM BACKGROUND SCORE",
    title: "Custom Background Score",
    description:
      "Something unique in mind? Share your concept, mood and reference. We will create music around your project.",
    path: "/lets-connect?type=Background%20Music&need=Background%20Score",
    type: "Background Music",
  },
];

export const landingPages = {
  "/background-music-for-short-films": {
    title: "A score that feels like part of your story.",
    name: "Background Music for Short Films",
    type: "Short Film",
    background: true,
    description:
      "Original background music, custom film score and cinematic background score services for Short Films & Short Movies across India, shaped around character, emotion, dialogue space and the rhythm of every scene.",
    details: [
      "Scene-by-scene mood, pacing and emotional music direction",
      "Original themes, transitions, cinematic textures and background score cues",
      "Music synchronized to video edits, dialogue and story beats",
      "Dialogue-conscious mixing, clean levels and a polished final score",
    ],
    preparation:
      "Share your current video cut, scene notes, reference music and any dialogue or sound effects. Tell us which moments need to feel quiet, tense or powerful.",
  },
  "/background-music-for-advertisements": {
    title: "Make your message sound unmistakable.",
    name: "Music for Advertisements",
    type: "Advertisement",
    background: true,
    description:
      "Custom advertisement music, promotional video music and brand campaign background music across India. Built around your message, brand identity, hook, voiceover and the moment you want people to remember.",
    details: [
      "Brand-led musical direction for ads, reels and commercial videos",
      "Music timed to edits, voiceover, product shots and campaign hooks",
      "Clear builds, reveals, endings and memorable brand moments",
      "Cut-down planning for social media ads and multiple campaign lengths",
    ],
    preparation:
      "Send your video or storyboard, brand references, voiceover and intended duration. Include any alternate formats or versions you need.",
  },
  "/background-music-for-youtube": {
    title: "Give your content its own sound.",
    name: "YouTube Background Music",
    type: "YouTube",
    background: true,
    description:
      "YouTube background music, intro music and narration-friendly soundtrack production for storytelling, educational videos, vlogs, explainers and branded channels across India, with room for your voice to lead.",
    details: [
      "YouTube intro music, outro music and recurring channel themes",
      "Underscores for spoken content, tutorials, explainers and vlogs",
      "Mood changes, chapter transitions and loop-friendly sections",
      "Balanced background music that supports narration without covering speech",
    ],
    preparation:
      "Share a video or script, channel direction, reference links and the desired feel. Confirm usage and licensing requirements before production.",
  },
  "/background-music-for-project-launches": {
    title: "Build anticipation. Make an entrance.",
    name: "Project Launch Music",
    type: "Project Launch",
    background: true,
    description:
      "Impactful project launch music, product reveal music and corporate presentation background music across India. Every build, reveal and announcement cue is designed with purpose.",
    details: [
      "Anticipation builds, launch stings and reveal sequences",
      "Presentation, video and stage cue synchronization",
      "Brand-aligned sound, musical themes and corporate launch energy",
      "Polished audio for event screens, social videos and launch presentations",
    ],
    preparation:
      "Send the launch video, presentation timings, reveal cues and venue or platform details. Tell us the emotional high point of your launch.",
  },
  "/wedding-music-editing": {
    title: "Your big moment. Your kind of music.",
    name: "Wedding Music Editing",
    type: "Wedding Music",
    description:
      "Wedding music editing, sangeet mashup editing, bride entry song editing, groom entry music editing, couple dance track editing and family performance music preparation across India.",
    details: [
      "Bride entry music, groom entry songs and emotional wedding moments",
      "Couple dance tracks, family performances and sangeet choreography music",
      "Sangeet mashups with smooth song transitions and beat matching",
      "Timing adjustments, clean cuts and performance cues for choreography",
    ],
    preparation:
      "Share your song list, preferred start and end timestamps, performance order and target duration. Choreography videos help us place every transition.",
  },
  "/dance-performance-music-editing": {
    title: "Every step. Every cue. Every beat.",
    name: "Dance Performance Music Editing",
    type: "Dance Performance",
    description:
      "Dance performance music editing, choreography track editing and stage performance track preparation across India for choreographers, schools, colleges, weddings, competitions and stage events.",
    details: [
      "Choreography counts, cue points and performance track preparation",
      "School function, college dance and annual day music editing",
      "Song cuts, joins, beat matching, transitions and custom effects",
      "Clear starts, pauses, drops, endings and stage-ready final audio",
    ],
    preparation:
      "Send your songs, choreography notes or a rehearsal video, and the exact duration. Mark the cues, counts and transitions that matter to your routine.",
  },
  "/song-mixing-mashup": {
    title: "Different songs. One effortless flow.",
    name: "Song Mixing & Mashup",
    type: "Music Editing",
    need: "Mashup",
    description:
      "Song mixing, song mashup editing, multi-song joining and beat matching services across India, bringing your favourite songs together with matched energy, clean transitions and polished volume balance.",
    details: [
      "Multi-song sequencing, song joining and custom mashup structure",
      "Beat matching, tempo planning and energy flow",
      "Smooth transitions, creative drops, effects and crowd moments",
      "Volume balancing, EQ cleanup and a polished final mix",
    ],
    preparation:
      "Share your selected songs, preferred order, timestamps and reference mashups. Include the event or use case so we can shape the energy correctly.",
  },
  "/dj-remix": {
    title: "Premium DJ remix energy for unforgettable performances.",
    name: "DJ Remix / Re-Creation",
    type: "Music Editing",
    need: "Remix",
    description:
      "Premium DJ remix, Bollywood remix, song re-creation and custom remix services across India, crafted for wedding entries, sangeet performances, dance acts, reels and event-ready playback.",
    details: [
      "Custom remix arrangements, song remake structure and edit planning",
      "Rhythmic changes, tempo shifts and creative transitions",
      "Performance-focused builds, drops, dance breaks and hooks",
      "Mixing, mastering and final audio preparation for playback",
    ],
    preparation:
      "Send the source track or stems you are authorized to use, style references, target duration and intended use. We will discuss the creative direction before editing.",
  },
  "/mix-mastering": {
    title: "The final details make the difference.",
    name: "Mix & Mastering",
    type: "Music Editing",
    need: "Mix & Master",
    description:
      "Mixing and mastering services across India for songs, vocals, remixes, performance tracks, mashups and custom audio that need clean levels, clarity, loudness and polished final output.",
    details: [
      "Level balance, vocal clarity and tonal correction",
      "Dynamics, loudness, punch and clean frequency control",
      "Coherent stereo image and playback-ready polish",
      "WAV/MP3 delivery format discussed around your platform",
    ],
    preparation:
      "Share your audio or stems, a reference mix and the intended playback platform. Let us know your preferred file format and any technical requirements.",
  },
  "/custom-music-production": {
    title: "A sound that could only belong to you",
    name: "Custom Music Production",
    type: "Custom Audio",
    need: "Custom Production",
    background: true,
    description:
      "Custom music production, original music production and custom audio production services across India, shaped around your idea, audience, brand, video, event or performance from creative direction to polished final track.",
    details: [
      "Original themes, hooks and musical ideas shaped around your brief",
      "Mood, instrumentation, rhythm and pacing tailored to your project",
      "Music designed for video, performance, brand, reels or event use",
      "A polished mix and master prepared for your delivery format",
    ],
    preparation:
      "Share your concept, where the music will be used, the mood you want to create and any references. Include target duration, delivery format and key dates.",
  },
  "/costume-design": {
    title: "Costume Designer in Jaipur — Creative & Performance Costumes",
    name: "Costume Design & Styling",
    type: "Costume Design",
    need: "Costume Design",
    description:
      "Creative costume design in Jaipur for traditional, western, party wear, dance and stage looks. Each concept is shaped around your occasion, performance style and visual identity.",
    details: [
      "Traditional and contemporary costume direction for performances and celebrations",
      "Dance costume styling planned around movement, character and stage impact",
      "Theme-based concepts developed around the event, mood and references",
      "Performance styling for weddings, sangeet, stage shows and creative shoots",
      "Collaborative design planning for a confident final presentation",
    ],
    preparation:
      "Share the occasion, performer details, theme, references, preferred color mood and the kind of performance or celebration you want to style for. We can then discuss the concept direction and next steps.",
  },
  "/choreographer": {
    title: "Wedding & Sangeet Choreographer in Jaipur",
    name: "Choreographer",
    type: "Dance Performance",
    need: "Performance Track",
    description:
      "Discover personalized wedding choreography, sangeet dance performances, bride and groom choreography, Bollywood dance and creative stage performances with MR MUSIC MACK. Based in Jaipur, we welcome choreography projects across India and international creative collaborations based on availability.",
    details: [
      "Personalized wedding dance choreography for couples, families and group celebrations",
      "Sangeet performance planning with music counts, formations and clear transitions",
      "Bride, groom, couple, solo and family dance routines planned around participant comfort",
      "Bollywood-inspired choreography and creative direction for stage performances",
      "Rehearsal guidance shaped around the event, performers and agreed project scope",
    ],
    preparation:
      "Share the occasion, selected songs, performance duration, dancer count, age group, rehearsal time, location and preferred dance style. On-location or remote arrangements are discussed according to project availability.",
  },
};

export const serviceSeoContent = {
  "/music-editing": {
    heading: "Music editing services available across India and worldwide",
    intro:
      "MR MUSIC MACK provides professional music editing services for clients in Jaipur, Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Ahmedabad, Surat, Lucknow, Chandigarh, Kolkata, Chennai, Indore, Bhopal, all over India and worldwide.",
    keywords: [
      "music editing services",
      "music editor near me",
      "song editing services",
      "professional music editing",
      "music editing services India",
      "professional song editing",
      "audio editing service online",
      "song cutting and joining",
      "music editing studio Jaipur",
      "performance track editing",
      "dance performance song editing",
      "dance performance music editing",
      "event music editing",
      "audio arrangement service",
      "song transition editing",
      "custom music editing online",
    ],
    locations: [
      "Jaipur",
      "Delhi NCR",
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Kolkata",
      "Chennai",
      "Lucknow",
    ],
  },
  "/background-music": {
    heading: "Background music production for creators, brands and films worldwide",
    intro:
      "Custom background music production for short films, YouTube videos, advertisements, launch films, brand videos, presentations and creative content, delivered across India and worldwide.",
    keywords: [
      "background music production India",
      "custom background score",
      "cinematic background music",
      "brand video music",
      "corporate video background music",
      "short film score",
      "YouTube background music",
      "advertisement music production",
      "project launch music",
      "original background music online",
    ],
    locations: [
      "Jaipur",
      "Delhi",
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Gurugram",
      "Noida",
      "Chennai",
      "Kolkata",
    ],
  },
  "/wedding-music-editing": {
    heading: "Wedding music editing and sangeet mashups across India and worldwide",
    intro:
      "Wedding music editing for bride entry, groom entry, couple dance, family performance, haldi, mehendi, engagement, reception and sangeet events across India and worldwide.",
    keywords: [
      "wedding song editing",
      "sangeet song editing",
      "wedding music editing",
      "sangeet music editing",
      "wedding music editing India",
      "sangeet mashup service",
      "wedding mashup maker",
      "sangeet mashup maker",
      "bride entry song editing",
      "groom entry music editing",
      "couple dance track editing",
      "family performance mashup",
      "wedding dance music editing",
      "wedding dance song editing",
      "haldi mehendi song mashup",
      "wedding performance track",
      "wedding song mashup",
      "sangeet song mashup",
      "wedding dance mashup",
      "sangeet choreography track",
    ],
    locations: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Delhi NCR",
      "Mumbai",
      "Ahmedabad",
      "Surat",
      "Indore",
      "Pune",
      "Bengaluru",
    ],
  },
  "/dance-performance-music-editing": {
    heading: "Dance performance music editing for schools, colleges and events",
    intro:
      "Performance tracks are edited around choreography counts, formations, cues and stage timings for schools, colleges, wedding groups, dance teams and choreographers across India and worldwide.",
    keywords: [
      "dance performance music editing",
      "dance performance song editing",
      "choreography track editing",
      "school function music editing",
      "college dance music editing",
      "annual function song editing",
      "stage performance track",
      "performance track editing",
      "group dance music editing",
      "dance competition music edit",
      "music edit for choreography",
      "dance mashup maker",
      "performance cue track",
    ],
    locations: [
      "Jaipur",
      "Delhi",
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Chandigarh",
      "Lucknow",
      "Bhopal",
      "Indore",
    ],
  },
  "/song-mixing-mashup": {
    heading: "Song mixing and mashup editing service across India and worldwide",
    intro:
      "Multi-song mashups are planned with beat matching, smooth transitions, energy flow, clean joins and polished volume balance for weddings, dance performances, reels and events.",
    keywords: [
      "song mixing India",
      "mashup editing service",
      "song mashup maker",
      "song mashup services",
      "custom song mashup",
      "wedding mashup maker",
      "sangeet mashup maker",
      "dance mashup maker",
      "music mashup service online",
      "beat matching service",
      "song joining service",
      "multi song mashup",
      "Bollywood mashup editing",
      "dance mashup editing",
      "wedding song mashup",
      "sangeet song mashup",
      "wedding dance mashup",
    ],
    locations: [
      "Jaipur",
      "Delhi NCR",
      "Mumbai",
      "Pune",
      "Ahmedabad",
      "Surat",
      "Bengaluru",
      "Hyderabad",
      "Kolkata",
      "Chennai",
    ],
  },
  "/dj-remix": {
    heading: "DJ remix and song re-creation services across India and worldwide",
    intro:
      "Custom DJ remixes and song re-creations are shaped for events, stage shows, dance acts, wedding entries, reels and performance moments.",
    keywords: [
      "DJ remix service India",
      "custom remix service",
      "song recreation India",
      "dance remix editing",
      "event remix track",
      "Bollywood DJ remix",
      "performance remix",
      "song remake service",
      "music remix online",
      "wedding remix track",
    ],
    locations: [
      "Jaipur",
      "Delhi",
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Chandigarh",
      "Lucknow",
      "Indore",
    ],
  },
  "/mix-mastering": {
    heading: "Mixing and mastering services for polished final audio",
    intro:
      "Mixing and mastering services for songs, remixes, performance tracks, custom audio and event music that need clean levels, clarity and playback-ready output.",
    keywords: [
      "mixing mastering India",
      "music mixing service",
      "audio mastering service",
      "song mastering online",
      "vocal mixing service",
      "final audio mastering",
      "track mastering service",
      "music polish service",
      "online mixing mastering",
      "stereo mix mastering",
    ],
    locations: [
      "Jaipur",
      "Delhi",
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Chennai",
      "Kolkata",
      "Indore",
    ],
  },
  "/custom-music-production": {
    heading: "Custom music production for brands, content and events",
    intro:
      "Original music and custom audio production for videos, events, brand films, performances, launches, reels, presentations and creative campaigns across India and worldwide.",
    keywords: [
      "custom music production India",
      "original music production",
      "custom audio production",
      "brand music production",
      "event music production",
      "music production online",
      "theme music creation",
      "custom track production",
      "music for video content",
      "creative audio production",
    ],
    locations: [
      "Jaipur",
      "Delhi NCR",
      "Mumbai",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Kolkata",
      "Chennai",
      "Gurugram",
    ],
  },
  "/background-music-for-short-films": {
    heading: "Short film background music and cinematic score services",
    intro:
      "Original short film background scores are composed around scenes, dialogue space, emotion, pacing, character moments and final video edits.",
    keywords: [
      "short film background music India",
      "film score service",
      "custom film score",
      "cinematic background score",
      "short movie music",
      "independent film music",
      "scene background music",
      "film music composer online",
      "movie background score",
      "storytelling music production",
    ],
    locations: ["Jaipur", "Mumbai", "Delhi", "Pune", "Bengaluru", "Hyderabad", "Chennai", "Kolkata"],
  },
  "/background-music-for-advertisements": {
    heading: "Advertisement music for promos, campaigns and brand videos",
    intro:
      "Advertisement music is created for brand campaigns, promotional videos, commercials, product ads, social media ads and launch creatives across India and worldwide.",
    keywords: [
      "advertisement music India",
      "ad background music",
      "promotional video music",
      "commercial music production",
      "brand campaign music",
      "product ad music",
      "social media ad music",
      "jingle style music",
      "promo video soundtrack",
      "marketing video music",
    ],
    locations: ["Jaipur", "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Gurugram", "Noida"],
  },
  "/background-music-for-youtube": {
    heading: "YouTube background music for channels and videos",
    intro:
      "YouTube background music is made for intros, storytelling videos, explainers, educational content, travel videos, vlogs, brand channels and narration-led content.",
    keywords: [
      "YouTube background music India",
      "YouTube intro music",
      "vlog background music",
      "explainer video music",
      "educational video music",
      "channel theme music",
      "narration background music",
      "creator music production",
      "YouTube soundtrack service",
      "custom intro outro music",
    ],
    locations: ["Jaipur", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata"],
  },
  "/background-music-for-project-launches": {
    heading: "Project launch music for product reveals and presentations",
    intro:
      "Launch music is created for product reveals, corporate presentations, business events, real estate launches, startup videos and brand announcement films.",
    keywords: [
      "project launch music India",
      "product reveal music",
      "corporate launch music",
      "presentation background music",
      "business launch soundtrack",
      "startup launch video music",
      "real estate launch music",
      "event reveal music",
      "brand launch audio",
      "launch film music",
    ],
    locations: ["Jaipur", "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Ahmedabad", "Gurugram"],
  },
  "/costume-design": {
    heading: "Costume design and styling services for performances worldwide",
    intro:
      "Costume design and styling services for dance performances, weddings, stage shows, shoots, reels, theme acts and creative projects across India and worldwide.",
    keywords: [
      "costume designer near me",
      "costume design services India",
      "dance costume designer",
      "dance costumes near me",
      "dance costume on rent",
      "costume rental near me",
      "costume on rent",
      "stage costume on rent",
      "bollywood costume on rent",
      "theme costume on rent",
      "group dance costumes",
      "dance costume rental",
      "dance costume rental near me",
      "costume rental for dance",
      "stage costume design",
      "wedding costume styling",
      "performance costume design",
      "performance costume designer",
      "sangeet costume design",
      "group dance costume",
      "theme costume styling",
      "shoot costume styling",
      "event costume designer",
    ],
    locations: ["Jaipur", "Delhi NCR", "Mumbai", "Ahmedabad", "Surat", "Indore", "Pune", "Bengaluru"],
  },
  "/choreographer": {
    heading: "Wedding & sangeet choreography in Jaipur and beyond",
    intro:
      "Personalized wedding and sangeet choreography from MR MUSIC MACK, a creative studio based in Shyam Nagar, Sodala, Jaipur, Rajasthan.",
    keywords: [
      "Wedding Choreographer in Jaipur",
      "Sangeet Choreographer in Jaipur",
      "Wedding Dance Choreography",
      "Sangeet Dance Choreography",
      "Professional Wedding Choreographer",
      "Bride and Groom Dance Choreography",
      "Wedding Choreography Services India",
      "Bollywood Dance Choreographer",
    ],
    locations: ["Jaipur, Rajasthan"],
  },
};

export const choreographerFaqItems = [
  {
    question: "How do I book a wedding choreographer in Jaipur?",
    answer:
      "Send your event date, venue or location, performance ideas, songs, participant count and rehearsal needs through the enquiry page. MR MUSIC MACK will review the brief and discuss scope and availability.",
  },
  {
    question: "Do you offer sangeet choreography for families?",
    answer:
      "Yes. Family sangeet and group routines can be planned around the participants, selected music, comfort levels and time available for rehearsals.",
  },
  {
    question: "Can beginners learn wedding dance choreography?",
    answer:
      "Yes. Routines can be adapted to participants' experience and comfort. Share who will be performing and their rehearsal time so the choreography can be discussed accordingly.",
  },
  {
    question: "Can you create bride and groom dance performances?",
    answer:
      "Bride, groom and couple dance choreography can be discussed, including romantic couple dance ideas, solo moments and performance transitions.",
  },
  {
    question: "Do you provide custom wedding dance mashups?",
    answer:
      "Custom wedding and sangeet music edits can be discussed alongside a choreography brief. Explore the wedding music editing service to share song choices and performance cues.",
  },
  {
    question: "Do you accept destination wedding choreography enquiries?",
    answer:
      "Destination wedding enquiries are welcome. On-location planning, travel and rehearsal arrangements depend on the project brief and availability.",
  },
  {
    question: "Is online wedding choreography available?",
    answer:
      "Remote rehearsals or choreography guidance may be discussed for suitable projects. The format depends on the event, participants, timing and project availability.",
  },
  {
    question: "How much does wedding choreography cost in Jaipur?",
    answer:
      "There is no fixed price listed. The scope depends on the number and type of performances, participants, rehearsal requirements, location and project brief; share these details for a discussion.",
  },
  {
    question: "Do you choreograph school annual functions?",
    answer:
      "Yes. School and college choreography is part of the studio's performance work. Share the age group, event format, music, participant count and rehearsal schedule.",
  },
  {
    question: "Do you provide corporate event choreography?",
    answer:
      "Corporate and other stage-event choreography can be discussed as a custom performance enquiry. Share the event format, location, date and creative brief so the scope and availability can be reviewed.",
  },
];

export const choreographerSeo = {
  title: "Wedding & Sangeet Choreographer Jaipur | MR MUSIC MACK",
  description:
    "Wedding & sangeet choreography in Jaipur by MR MUSIC MACK. Explore couple dance, Bollywood, family performances and custom choreography across India.",
  keywords:
    "wedding choreographer Jaipur, sangeet choreographer Jaipur, wedding dance choreography, bride and groom dance choreography, Bollywood dance choreographer, wedding choreography India",
};

export function createChoreographerSchema(siteUrl, description) {
  const canonicalUrl = `${siteUrl}/choreographer`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Wedding & Sangeet Choreography",
        description,
        url: canonicalUrl,
        areaServed: ["Jaipur, Rajasthan", "India", "Worldwide"],
        provider: {
          "@type": "ProfessionalService",
          name: "MR MUSIC MACK",
          telephone: "+91 98875 63201",
          email: "mrmusicmack@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shyam Nagar, Sodala",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Wedding & Sangeet Choreographer in Jaipur",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: choreographerFaqItems.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };
}

export const projectTypes = [
  "Music Editing",
  "Wedding Music",
  "Dance Performance",
  "Background Music",
  "Short Film",
  "Advertisement",
  "Project Launch",
  "YouTube",
  "Custom Audio",
  "Costume Design",
  "Choreographer",
];
export const requirements = [
  "Music Editing",
  "Background Score",
  "Mashup",
  "Remix",
  "Mix & Master",
  "Performance Track",
  "Custom Production",
  "Costume Design",
  "Choreography",
];
export const moods = [
  "Emotional",
  "Cinematic",
  "Energetic",
  "Inspirational",
  "Luxury",
  "Corporate",
  "Romantic",
  "Dramatic",
  "Modern",
  "Calm",
  "Powerful",
  "Playful",
];

export const faqs = [
  [
    "What type of music editing do you provide?",
    "We provide music editing services for song cutting and joining, mashup editing, DJ remix, wedding music editing, dance performance tracks, mix & mastering and custom audio production.",
  ],
  [
    "Can you combine multiple songs into one track?",
    "Yes. Share your songs, preferred order and target duration. We plan the transitions and balance the final track so it flows naturally.",
  ],
  [
    "Do you edit music according to choreography?",
    "Yes. Share rehearsal footage, counts, timestamps or a cue sheet so the track can follow your choreography.",
  ],
  [
    "Do you create wedding and sangeet mashups?",
    "Yes. We prepare bride entry music, groom entry songs, couple dance tracks, family performance music and sangeet mashups with clean transitions and performance-ready timing.",
  ],
  [
    "Do you provide choreographer services for weddings and stage shows?",
    "Yes. We provide choreographer services for wedding sangeet, bride groom dance, couple dance, family group dance, school functions, college performances, reels and stage shows.",
  ],
  [
    "Do you provide costume design and styling for dance performances?",
    "Yes. We provide costume design, dance costume styling, stage costume direction and performance outfit planning for weddings, sangeet, group dance, shoots and creative events.",
  ],
  [
    "Do you create original background music?",
    "Yes. Custom background music is developed around the mood, pace and purpose of your video, short film, advertisement, YouTube content, project launch or brand campaign.",
  ],
  [
    "Can you make background music for a short film?",
    "Yes. We create scores for Short Films & Short Movies, with music synchronized to scenes and storytelling.",
  ],
  [
    "Do you create music for advertisements?",
    "Yes. We create custom background music for advertisements, promotional videos and branded campaigns.",
  ],
  [
    "Can you create background music for YouTube videos?",
    "Yes. We can create music for intros, storytelling, educational content and branded channels. Discuss usage and licensing with us before production.",
  ],
  [
    "Can you create music for project launches?",
    "Yes. We shape music around product reveals, business presentations and project launch videos.",
  ],
  [
    "Can background music be created according to a specific mood?",
    "Yes. Share a mood, a few references and the feeling you want your audience to take away.",
  ],
  [
    "How do I send my video or songs?",
    "Upload an audio or video reference up to 10 MB with the project brief, or share a Google Drive or YouTube link. For larger source files, use a Drive link with access enabled.",
  ],
  [
    "Can I discuss my requirement through WhatsApp?",
    "Yes. Message +91 98875 63201 with your project type, timeline and references.",
  ],
  [
    "Do you work with clients outside Jaipur?",
    "Yes. Requirements, references and project discussions can be shared online through the brief form and WhatsApp.",
  ],
  [
    "Which audio formats do you provide?",
    "Tell us your required format, such as WAV or MP3, and intended playback platform. We will confirm the delivery format and technical specifications before starting.",
  ],
];
