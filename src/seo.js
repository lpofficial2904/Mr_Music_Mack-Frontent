// Keep this metadata synchronized with the other repository's SEO config.
export const seoPages = {
  "/": {
    title: "Music Editing & Creative Studio Jaipur | MR MUSIC MACK",
    description:
      "Get custom music editing, wedding mashups, background scores, choreography and costume design from our Jaipur studio. Share your brief for a tailored quote.",
    keywords:
      "music editing Jaipur, online music editing India, creative studio Jaipur",
  },
  "/music-editing": {
    title: "Online Music Editing Services India | MR MUSIC MACK",
    description:
      "Need songs cut, joined or arranged? Get custom music editing, clean transitions and performance-ready tracks from Jaipur. Send your songs for a project quote.",
    keywords:
      "online music editing, song cutting and joining, audio editing Jaipur, performance track editing",
  },
  "/background-music": {
    title: "Custom Background Music Production | MR MUSIC MACK",
    description:
      "Commission background music for films, ads, YouTube videos and launches. Share your video, mood and timings with our Jaipur studio for a tailored score.",
    keywords:
      "background music production, custom background score, music composer Jaipur",
  },
  "/choreographer": {
    title: "Wedding & Sangeet Choreographer Jaipur | MR MUSIC MACK",
    description:
      "Wedding & sangeet choreography in Jaipur by MR MUSIC MACK. Explore couple dance, Bollywood, family performances and custom choreography across India.",
    keywords:
      "wedding choreographer Jaipur, sangeet choreographer Jaipur, couple dance choreography, family dance choreography",
  },
  "/costume-design": {
    title: "Costume Designer in Jaipur | MR MUSIC MACK",
    description:
      "Discuss custom dance, stage and wedding costume design in Jaipur. Share your theme, movement needs, measurements and event date for a tailored design plan.",
    keywords:
      "costume designer Jaipur, dance costume design, stage costume designer, wedding costume styling",
  },
  "/services": {
    title: "Music & Creative Services Jaipur | MR MUSIC MACK",
    description:
      "Compare music editing, background scores, wedding choreography and costume design. Explore the services and send your project brief to our Jaipur studio.",
    keywords:
      "music production services Jaipur, audio editing services, choreography and costume design",
  },
  "/wedding-performance-music": {
    title: "Wedding & Performance Music Services | MR MUSIC MACK",
    description:
      "Plan wedding entries, couple dances and family performances with custom music. Explore sangeet mashups, choreography tracks and song editing for your event.",
    keywords:
      "wedding performance music, sangeet music editing, wedding entry songs editing",
  },
  "/wedding-music-editing": {
    title: "Wedding Music Editing & Sangeet Mashups | MR MUSIC MACK",
    description:
      "Create a wedding mashup for bride or groom entries, couple dances and family sangeet performances. Send song choices and timings for a custom editing quote.",
    keywords:
      "wedding music editing, sangeet mashup editing, bride entry song editing, couple dance mashup",
  },
  "/dance-performance-music-editing": {
    title: "Dance Performance Music Editing | MR MUSIC MACK",
    description:
      "Get dance tracks edited to your counts, cues and stage duration. Music editing for school functions, college events and choreography. Share a rehearsal brief.",
    keywords:
      "dance performance music editing, choreography track editing, school function music editing",
  },
  "/song-mixing-mashup": {
    title: "Song Mixing & Mashup Editing Services | MR MUSIC MACK",
    description:
      "Bring your chosen songs into one flowing mashup with beat matching, balanced levels and clean transitions. Share your song list, order and performance duration.",
    keywords:
      "song mashup editing, song mixing service, beat matching, custom mashup India",
  },
  "/dj-remix": {
    title: "Custom DJ Remix & Song Re-Creation | MR MUSIC MACK",
    description:
      "Discuss a custom remix for wedding entries, dance acts and event playback. Share your track, reference style and timings for arrangement and remix planning.",
    keywords:
      "DJ remix service, custom song remix, Bollywood remix editing, song re-creation",
  },
  "/mix-mastering": {
    title: "Online Mixing & Mastering Services | MR MUSIC MACK",
    description:
      "Polish your song, remix or performance track with balanced mixing and mastering. Share your audio, reference sound and delivery needs for a project quote.",
    keywords:
      "mixing and mastering services India, audio mastering, song mixing Jaipur",
  },
  "/custom-music-production": {
    title: "Custom Music Production India | MR MUSIC MACK",
    description:
      "Turn a creative brief into music for your brand, video, performance or event. Discuss style, references, duration and delivery with our Jaipur production studio.",
    keywords:
      "custom music production, original music production India, brand music production",
  },
  "/background-music-for-short-films": {
    title: "Short Film Background Music & Scoring | MR MUSIC MACK",
    description:
      "Commission a short film score shaped around scenes, dialogue and emotion. Send your video cut, cue notes and reference sound for custom background music.",
    keywords:
      "short film background music, custom film score, cinematic scoring India",
  },
  "/background-music-for-advertisements": {
    title: "Custom Music for Ads & Brand Videos | MR MUSIC MACK",
    description:
      "Get music shaped to your advert, voiceover and brand message. Discuss hooks, cut-downs and campaign timings for commercials, promos and social video ads.",
    keywords:
      "advertisement music production, custom ad music, brand video soundtrack",
  },
  "/background-music-for-youtube": {
    title: "Custom YouTube Background Music | MR MUSIC MACK",
    description:
      "Build a sound for your YouTube channel with custom intro, outro and narration-friendly music. Share your video style, references and soundtrack requirements.",
    keywords:
      "custom YouTube background music, channel intro music, narration background music",
  },
  "/background-music-for-project-launches": {
    title: "Product Launch & Reveal Music | MR MUSIC MACK",
    description:
      "Commission music for product reveals, business launches and presentations. Share your reveal cues and video timing for a tailored launch soundtrack.",
    keywords:
      "product reveal music, project launch music, corporate presentation soundtrack",
  },
  "/the-collection": {
    title: "Music & Creative Work Portfolio | MR MUSIC MACK",
    description:
      "Listen to audio demonstrations and explore music, choreography and costume visuals. Find a direction for your project and share your brief with our studio.",
    keywords:
      "music editing samples, wedding mashup demo, creative studio portfolio",
  },
  "/the-studio": {
    title: "About Our Creative Studio in Jaipur | MR MUSIC MACK",
    description:
      "Meet MR MUSIC MACK in Shyam Nagar, Sodala, Jaipur. Discover our approach to music editing, production, choreography and costume design, then discuss your idea.",
    keywords:
      "music editing studio Jaipur, MR MUSIC MACK studio, audio production Sodala",
  },
  "/lets-connect": {
    title: "Contact & Project Enquiries Jaipur | MR MUSIC MACK",
    description:
      "Request a quote for music editing, wedding choreography, background music or costume design. Send your brief, references and deadline or contact us on WhatsApp.",
    keywords:
      "contact MR MUSIC MACK, music editing quote, choreography enquiry Jaipur",
  },
};
export const routeAliases = {
  "/about": "/the-studio",
  "/contact": "/lets-connect",
  "/our-work": "/the-collection",
};
export function canonicalPath(path) {
  return routeAliases[path] || path;
}
