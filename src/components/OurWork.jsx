import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import AudioPlayer from "./AudioPlayer";
import CollectionMediaGroup from "./CollectionMediaGroup";
import { mediaUrl } from "../api";
import { portfolioProjects as defaultPortfolioProjects } from "../projects";
import liveRecordingImage from "../assets/showcase-live-recording.jpg";
import mobileStudioImage from "../assets/showcase-mobile-studio.jpg";
import premiumStudioImage from "../assets/premium-studio-hero.png";
import soundMixingImage from "../assets/showcase-sound-mixing.jpg";
import trackMasteringImage from "../assets/showcase-track-mastering.jpg";
import voiceRecordingImage from "../assets/showcase-voice-recording.jpg";

const demos = [
  {
    id: "wedding",
    title: "Wedding Performance Mashup",
    group: "editing",
    tags: ["Wedding", "Mashup"],
    description:
      "A warm, melodic demonstration of a flowing performance arrangement.",
    duration: 18,
  },
  {
    id: "dance",
    title: "Dance Performance Edit",
    group: "editing",
    tags: ["Dance"],
    description:
      "Rhythmic cues and a steady pulse for a performance-track concept.",
    duration: 16,
  },
  {
    id: "remix",
    title: "DJ Re-Creation Study",
    group: "editing",
    tags: ["DJ Remix", "Mashup"],
    description:
      "An electronic arrangement study with a defined build and finish.",
    duration: 16,
  },
  {
    id: "film",
    title: "Short Film Background Score",
    group: "background",
    tags: ["Short Film", "Custom Score"],
    description:
      "A restrained cinematic mood study with an evolving musical theme.",
    duration: 20,
  },
  {
    id: "advertisement",
    title: "Advertisement Background Music",
    group: "background",
    tags: ["Advertisement"],
    description:
      "A bright, concise musical concept for a brand-led visual story.",
    duration: 14,
  },
  {
    id: "youtube",
    title: "YouTube Storytelling Score",
    group: "background",
    tags: ["YouTube"],
    description: "A gentle underscore concept that leaves space for narration.",
    duration: 18,
  },
  {
    id: "launch",
    title: "Project Launch Music",
    group: "background",
    tags: ["Project Launch"],
    description:
      "A gradual build toward a confident reveal, presented as a sound study.",
    duration: 16,
  },
];

const collectionMusicSamples = [
  {
    id: "dance",
    title: "Dance Performance Edit",
    category: "Dance Track",
    description:
      "A stage-ready performance edit with clean beats, cue points and dancer-friendly transitions.",
    duration: 16,
    image: trackMasteringImage,
  },
  {
    id: "film",
    title: "Short Film Background Score",
    category: "Cinematic Score",
    description:
      "A restrained background score sample shaped for emotion, pacing and visual storytelling.",
    duration: 20,
    image: soundMixingImage,
  },
  {
    id: "advertisement",
    title: "Advertisement Music Cue",
    category: "Brand Music",
    description:
      "A bright, compact music cue for ads, brand reels and premium promotional videos.",
    duration: 14,
    image: mobileStudioImage,
  },
  {
    id: "youtube",
    title: "YouTube Storytelling Score",
    category: "Content Score",
    description:
      "A soft underscore concept designed to support narration without overpowering the story.",
    duration: 18,
    image: voiceRecordingImage,
  },
];

const youtubeVideos = [
  {
    id: "PGtFnFJN8XE",
    title: "Weddings",
  },
  {
    id: "2In1XlzNHLc",
    title: "Sangeet",
  },
  {
    id: "JChQrdh09nw",
    title: "Bride & Groom Entry",
  },
  {
    id: "RIcq2x5gOg4",
    title: "Dance Performances",
  },
  {
    id: "Kc_5WS7HKDA",
    title: "School & College Events",
  },
  {
    id: "-WyCyGbQ1Mk",
    title: "Special Events",
  },
];

function getInstagramEmbedUrl(url) {
  if (!url) return "";
  const reelMatch = url.match(/^https:\/\/(?:www\.)?instagram\.com\/(?:reels?|p)\/([\w-]+)(?:[/?#]|$)/i);
  if (!reelMatch) return "";
  return `https://www.instagram.com/reel/${reelMatch[1]}/embed/`;
}

function getInstagramEmbedSrc(url, active) {
  if (!url) return "";
  const embedUrl = new URL(url);
  embedUrl.searchParams.set("hidecaption", "1");
  if (active) embedUrl.searchParams.set("autoplay", "1");
  return embedUrl.toString();
}

const defaultInstagramProjects = [
  {
    title: "Reel Link Sheet",
    category: "Collection",
    platform: "Spreadsheet",
    image: liveRecordingImage,
    href: "https://1drv.ms/x/c/c062d812ea1c8e6c/IQDFCFPq_kNSRZB4QVfuJlyAAdV1-R9AUoICRnlUCwIjlIQ?e=MYelTG",
  },
  {
    title: "Weddings",
    category: "Weddings",
    image: liveRecordingImage,
    href: "https://www.instagram.com/reel/DUr_lWiCUp4/?stkn=MTZ3aWw3ZTJhN2gxbg==",
  },
  {
    title: "Sangeet",
    category: "Sangeet",
    image: mobileStudioImage,
    href: "https://www.instagram.com/reel/CydI73mvJA2/?stkn=MXh6M200Zmx0bWducg==",
  },
  {
    title: "Bride & Groom Entry",
    category: "Wedding Dance",
    image: soundMixingImage,
    href: "https://www.instagram.com/reel/DDMajTEJG5C/?stkn=MThxdHhucG0zMGt1aQ==",
  },
  {
    title: "Dance Performances",
    category: "Dance",
    image: premiumStudioImage,
    href: "https://www.instagram.com/reel/DEchovcJuYV/?stkn=MXV4czlrZmRjOWt3MA==",
  },
  {
    title: "School & College Events",
    category: "School & College",
    image: voiceRecordingImage,
    href: "https://www.instagram.com/reel/DUnjH55ialt/?stkn=NXh6OW42amY3bW90",
  },
  {
    title: "Special Events",
    category: "Special Events",
    image: trackMasteringImage,
    href: "https://www.instagram.com/reel/DLvDY6VT-y7/?stkn=dmVyOG12cTVvY2Iw",
  },
  {
    title: "Performance Reel",
    category: "Performance",
    image: liveRecordingImage,
    href: "https://www.instagram.com/reel/DKwzEjpvWV8/?stkn=MTM1cmNqeDRzZjZzZQ==",
  },
];

const collectionVideoCategories = [
  {
    id: "bride",
    label: "Bride Performances",
    description: "Solo bride moments, graceful expressions and wedding-stage storytelling.",
    videos: [
      ["bride-expressions", "Bride Expressions", "Wedding solo", "bride-expressions.mp4"],
      ["bride-mesmerising-performance", "Mesmerising Bride Performance", "Bride performance", "bride-mesmerising-performance.mp4"],
      ["love-wedding-performance", "Alive In Love", "Romantic choreography", "love-wedding-performance.mp4"],
      ["video-97232", "Bride Feature Reel", "Performance highlight", "video-97232.mp4"],
      ["video-96070", "Bride Stage Moment", "Wedding choreography", "video-96070.mp4"],
    ],
  },
  {
    id: "couple",
    label: "Couple & Groom",
    description: "Couple chemistry, groom entries and expressive wedding performances.",
    videos: [
      ["couple-chemistry", "Couple Chemistry", "Couple performance", "couple-chemistry.mp4"],
      ["groom-love-performance", "Groom Love Performance", "Groom solo", "groom-love-performance.mp4"],
      ["groom-main-character", "Main Character Groom", "Groom entry", "groom-main-character.mp4"],
      ["parents-kesariya-dance", "Parents Dance Moment", "Family performance", "parents-kesariya-dance.mp4"],
      ["video-87935", "Couple Stage Highlight", "Wedding reel", "video-87935.mp4"],
    ],
  },
  {
    id: "sangeet",
    label: "Sangeet & Family",
    description: "Group energy, family choreography and full-squad sangeet moments.",
    videos: [
      ["sangeet-squad-practice", "Sangeet Squad", "Group choreography", "sangeet-squad-practice.mp4"],
      ["peak-sangeet", "Peak Sangeet", "Event highlight", "peak-sangeet.mp4"],
      ["serving-sangeet", "Serving Sangeet", "Team choreography", "serving-sangeet.mp4"],
      ["video-85224", "Family Stage Energy", "Sangeet reel", "video-85224.mp4"],
      ["video-75926", "Group Formation", "Dance performance", "video-75926.mp4"],
      ["video-62483", "Celebration Reel", "Wedding event", "video-62483.mp4"],
    ],
  },
  {
    id: "entries",
    label: "Entries & Varmala",
    description: "Grand entries, varmala concepts and ceremony-led performance moments.",
    videos: [
      ["varmala-execution", "Breathtaking Varmala", "Ceremony concept", "varmala-execution.mp4"],
      ["mayrid-wedding-choreography", "Wedding Entry Concept", "Entry choreography", "mayrid-wedding-choreography.mp4"],
      ["ohmymosh-song-mix", "Song Mix Performance", "Music and choreography", "ohmymosh-song-mix.mp4"],
      ["video-48690", "Grand Entry Reel", "Wedding entry", "video-48690.mp4"],
      ["video-42114", "Stage Entry Highlight", "Entry performance", "video-42114.mp4"],
      ["video-40121", "Ceremony Choreography", "Varmala moment", "video-40121.mp4"],
    ],
  },
  {
    id: "stage",
    label: "Costume & Stage Looks",
    description: "Visual styling, stage looks and performance-ready costume presentation.",
    videos: [
      ["video-33030", "Stage Costume Look", "Costume direction", "video-33030.mp4"],
      ["video-30579", "Performance Styling", "Stage look", "video-30579.mp4"],
      ["video-24096", "Creative Costume Reel", "Costume concept", "video-24096.mp4"],
      ["video-23352", "Stage Styling Highlight", "Visual direction", "video-23352.mp4"],
      ["video-15036", "Editorial Performance Look", "Costume showcase", "video-15036.mp4"],
      ["video-4442", "Costume Detail Reel", "Performance outfit", "video-4442.mp4"],
    ],
  },
];

const musicEditingVideoShowcase = {
  id: "music-editing-showcase",
  label: "Music Editing Reels",
  description: "Performance edits, song mixes and stage-ready music moments from the collection.",
  videos: [
    ["ohmymosh-song-mix", "Song Mix Performance", "Music editing", "ohmymosh-song-mix.mp4"],
    ["love-wedding-performance", "Wedding Performance Edit", "Wedding music", "love-wedding-performance.mp4"],
    ["sangeet-squad-practice", "Sangeet Track Flow", "Sangeet edit", "sangeet-squad-practice.mp4"],
    ["peak-sangeet", "Peak Sangeet Mix", "Dance mashup", "peak-sangeet.mp4"],
    ["serving-sangeet", "Group Performance Track", "Performance edit", "serving-sangeet.mp4"],
    ["video-75926", "Stage Dance Mix", "Stage track", "video-75926.mp4"],
  ],
};

const musicEditingVideoSections = [
  musicEditingVideoShowcase,
];

const getCollectionVideoKey = (categoryId, index) => `${categoryId}::${index}`;

export default function OurWork({
  initialCategory = "editing",
  collectionPage = false,
  showEditingReels = true,
  managedMedia,
  audioSection,
  managedProjects,
  managedReels,
  onStart,
}) {
  const [category, setCategory] = useState(initialCategory);
  const [filter, setFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [activeYoutubeVideo, setActiveYoutubeVideo] = useState(null);
  const [activeInstagramReel, setActiveInstagramReel] = useState("");
  const instagramProjects = useMemo(() => (Array.isArray(managedReels) ? managedReels : defaultInstagramProjects)
    .filter((item) => item.enabled !== false && getInstagramEmbedUrl(item.href)), [managedReels]);
  useEffect(() => { setActiveInstagramReel(""); }, [instagramProjects]);
  const [instagramEmbedsEnabled, setInstagramEmbedsEnabled] = useState(true);
  const [instagramResetKey, setInstagramResetKey] = useState(0);
  const [activeCollectionVideos, setActiveCollectionVideos] = useState(() =>
    Object.fromEntries(collectionVideoCategories.map((item) => [item.id, 0])),
  );
  const [audibleCollectionVideo, setAudibleCollectionVideo] = useState("");
  const [visibleVideoCategories, setVisibleVideoCategories] = useState(() => new Set());
  const activeAudio = useRef(null);
  const instagramSection = useRef(null);
  const collectionVideoSections = useRef(new Map());
  const collectionVideoPlayers = useRef(new Map());
  const collectionVideoCards = useRef(new Map());
  const managedAudio = Array.isArray(managedMedia);
  const samples = managedAudio
    ? managedMedia.map((item, index) => ({ ...item, id: `page-audio-${index}` }))
      .filter((item) => item.type === "audio" && item.url && item.enabled !== false)
      .map((item) => {
        const tags = (item.category || "").split(",").map((tag) => tag.trim()).filter(Boolean);
        return { ...item, src: item.url, description: item.caption, tags: tags.length ? tags : ["Audio samples"] };
      })
    : demos.filter((demo) => demo.group === category);
  const filters = ["All", ...new Set(samples.flatMap((sample) => sample.tags))];
  const activeFilter = filters.includes(filter) ? filter : "All";
  const visible = samples.filter((sample) => activeFilter === "All" || sample.tags.includes(activeFilter));

  const activateAudio = useCallback((player) => {
    if (activeAudio.current && activeAudio.current !== player)
      activeAudio.current.pause();
    activeAudio.current = player;
    collectionVideoPlayers.current.forEach((video) => video.pause());
    document.querySelectorAll(".collection-managed-carousel video").forEach((video) => video.pause());
    setAudibleCollectionVideo("");
    setActiveYoutubeVideo(null);
    setActiveInstagramReel("");
  }, []);

  function stopPlayback() {
    activeAudio.current?.pause();
    activeAudio.current = null;
    setActiveYoutubeVideo(null);
    setActiveInstagramReel("");
    setAudibleCollectionVideo("");
    collectionVideoPlayers.current.forEach((player) => player.pause());
  }

  function playInstagramReel(cardKey) {
    activeAudio.current?.pause();
    activeAudio.current = null;
    setActiveYoutubeVideo(null);
    setAudibleCollectionVideo("");
    collectionVideoPlayers.current.forEach((player) => player.pause());
    setInstagramEmbedsEnabled(true);
    setInstagramResetKey((value) => value + 1);
    setActiveInstagramReel(cardKey);
  }

  useEffect(() => {
    if (!activeYoutubeVideo) return undefined;

    let frame = 0;
    let interval = 0;
    const isInViewport = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.bottom > 80 && rect.top < window.innerHeight - 80;
    };
    const stopHiddenVideos = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (
          activeYoutubeVideo &&
          !isInViewport(`[data-media-active="youtube-${activeYoutubeVideo}"]`)
        ) {
          setActiveYoutubeVideo(null);
        }
      });
    };

    stopHiddenVideos();
    interval = window.setInterval(stopHiddenVideos, 600);
    window.addEventListener("scroll", stopHiddenVideos, { passive: true });
    window.addEventListener("resize", stopHiddenVideos);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener("scroll", stopHiddenVideos);
      window.removeEventListener("resize", stopHiddenVideos);
    };
  }, [activeYoutubeVideo]);

  useEffect(() => {
    const resetInstagramWhenHidden = () => {
      const element = instagramSection.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / Math.min(rect.height || 1, window.innerHeight);
      const isVisible = visibleRatio >= 0.45;

      if (!isVisible) {
        setInstagramEmbedsEnabled(false);
        setActiveInstagramReel("");
        setInstagramResetKey((value) => value + 1);
        return;
      }

      setInstagramEmbedsEnabled(true);
    };
    const resetInstagramOnHiddenTab = () => {
      if (document.hidden) {
        setInstagramEmbedsEnabled(false);
        setActiveInstagramReel("");
        setInstagramResetKey((value) => value + 1);
      } else {
        resetInstagramWhenHidden();
      }
    };

    resetInstagramWhenHidden();
    window.addEventListener("scroll", resetInstagramWhenHidden, { passive: true });
    window.addEventListener("resize", resetInstagramWhenHidden);
    document.addEventListener("visibilitychange", resetInstagramOnHiddenTab);

    return () => {
      window.removeEventListener("scroll", resetInstagramWhenHidden);
      window.removeEventListener("resize", resetInstagramWhenHidden);
      document.removeEventListener("visibilitychange", resetInstagramOnHiddenTab);
    };
  }, []);

  const portfolioProjects = useMemo(() => (Array.isArray(managedProjects) ? managedProjects : defaultPortfolioProjects)
    .filter((project) => project.enabled !== false)
    .map((project) => ({ ...project, coverImage: mediaUrl(project.coverImage), gallery: (project.gallery || []).map(mediaUrl) })), [managedProjects]);
  const projectCategories = ["All", ...new Set(portfolioProjects.flatMap((project) => [project.category, ...project.services]).filter(Boolean))];

  const filteredProjects = useMemo(
    () =>
      projectFilter === "All"
        ? portfolioProjects
        : portfolioProjects.filter(
            (project) =>
              project.category === projectFilter ||
              project.services.includes(projectFilter),
          ),
    [projectFilter, portfolioProjects],
  );
  const featuredProjects = useMemo(
    () => portfolioProjects.filter((project) => project.featured).concat(
      portfolioProjects.filter((project) => !project.featured),
    ).slice(0, 4),
    [portfolioProjects],
  );
  const collectionFilters = [
    "All Projects",
    "Music Editing",
    "Choreography",
    "Costume Design",
    "Wedding Projects",
    "Featured Projects",
  ];
  const matchesCollectionFilter = useCallback((project, item) => {
    const services = project.services.join(" ").toLowerCase();
    const categoryName = project.category.toLowerCase();
    const searchText = `${project.title} ${project.description} ${services} ${categoryName}`.toLowerCase();

    if (item === "All" || item === "All Projects") return true;
    if (item === "Featured Projects") return Boolean(project.featured);
    if (item === "Wedding Projects") {
      return searchText.includes("wedding") || searchText.includes("sangeet") || searchText.includes("bride");
    }

    return categoryName.includes(item.toLowerCase()) || services.includes(item.toLowerCase());
  }, []);
  const activeCollectionProjects = useMemo(
    () => portfolioProjects.filter((project) => matchesCollectionFilter(project, projectFilter)),
    [matchesCollectionFilter, projectFilter, portfolioProjects],
  );
  const managedCollectionGroups = useMemo(() => {
    const groups = new Map();
    (managedMedia || [])
      .filter((item) => item?.url && item.enabled !== false && ["image", "video"].includes(item.type))
      .forEach((item) => {
        const categoryName = item.category?.trim() || "General";
        if (!groups.has(categoryName)) groups.set(categoryName, []);
        groups.get(categoryName).push(item);
      });
    return Array.from(groups, ([categoryName, items]) => ({ categoryName, items }));
  }, [managedMedia]);
  const musicSamples = Array.isArray(managedMedia)
    ? managedMedia.filter((item) => item.type === "audio" && item.url && item.enabled !== false).map((item, index) => ({
        id: `${item.url}-${index}`, src: item.url, title: item.title || "Audio sample",
        category: item.category || "Audio samples", description: item.caption,
        image: item.poster || collectionMusicSamples[index % collectionMusicSamples.length].image,
      }))
    : collectionMusicSamples;
  const musicProjects = useMemo(
    () =>
      portfolioProjects.filter((project) =>
        project.audio?.length ||
        project.services.some((service) =>
          ["Music Editing", "Background Music", "Custom Music Production"].includes(service),
        ),
      ),
    [portfolioProjects],
  );
  const choreographyProjects = useMemo(
    () =>
      portfolioProjects.filter((project) =>
        project.category === "Choreography" ||
        project.category === "Events" ||
        project.services.includes("Choreography"),
      ),
    [portfolioProjects],
  );
  const costumeProjects = useMemo(
    () =>
      portfolioProjects.filter((project) =>
        project.category === "Costume Design" ||
        project.services.some((service) => service.toLowerCase().includes("costume")),
      ),
    [portfolioProjects],
  );
  useEffect(() => {
    if (!collectionPage) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleVideoCategories((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            const categoryId = entry.target.getAttribute("data-video-category");
            if (!categoryId) return;

            if (entry.isIntersecting && entry.intersectionRatio >= 0.45) next.add(categoryId);
            else next.delete(categoryId);
          });
          return next;
        });
      },
      { threshold: [0, 0.25, 0.45, 0.7] },
    );

    collectionVideoSections.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [collectionPage]);

  useEffect(() => {
    if (!collectionPage || visibleVideoCategories.size === 0 || audibleCollectionVideo) return undefined;

    const timer = window.setInterval(() => {
      setActiveCollectionVideos((current) => {
        const next = { ...current };
        visibleVideoCategories.forEach((categoryId) => {
          const categoryData = collectionVideoCategories.find((item) => item.id === categoryId);
          if (!categoryData) return;
          next[categoryId] = ((next[categoryId] || 0) + 1) % categoryData.videos.length;
        });
        setAudibleCollectionVideo("");
        return next;
      });
    }, 6200);

    return () => window.clearInterval(timer);
  }, [audibleCollectionVideo, collectionPage, visibleVideoCategories]);

  useEffect(() => {
    if (!collectionPage) return;

    collectionVideoPlayers.current.forEach((player, key) => {
      const shouldPlay = key === audibleCollectionVideo;

      if (!shouldPlay) {
        player.pause();
        player.muted = true;
        player.volume = 0;
        return;
      }

      setActiveYoutubeVideo(null);
      setActiveInstagramReel("");
      activeAudio.current?.pause();
      player.muted = false;
      player.volume = 1;
      player.currentTime = player.currentTime || 0;
      player.play().catch(() => {});
    });
  }, [audibleCollectionVideo, collectionPage]);

  useEffect(() => {
    if (!collectionPage) return;
    visibleVideoCategories.forEach((categoryId) => {
      const card = collectionVideoCards.current.get(
        getCollectionVideoKey(categoryId, activeCollectionVideos[categoryId] || 0),
      );
      const track = card?.parentElement;
      if (!card || !track) return;

      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
        behavior: "smooth",
      });
    });
  }, [activeCollectionVideos, collectionPage, visibleVideoCategories]);

  function openProject(project) {
    stopPlayback();
    setActiveProject(project);
  }

  function closeProject() {
    stopPlayback();
    setActiveProject(null);
  }

  const renderProjectCard = (project, variant = "standard") => (
    <m.article
      className={`portfolio-project-card collection-project-card collection-project-card-${variant}`}
      key={project.slug}
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.28 }}
    >
      <img src={project.coverImage} alt={`${project.title} project`} loading="lazy" />
      <div className="portfolio-project-card-body">
        <span>{project.category} / {project.year}</span>
        <h3>{project.title}</h3>
        <p>{project.location}</p>
        <p>{project.description}</p>
        <ul>
          {project.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        {project.audio?.length > 0 && (
          <div className="collection-card-audio">
            <p>{project.audio[0].title}</p>
            <AudioPlayer {...project.audio[0]} onActivate={activateAudio} />
          </div>
        )}
        <button type="button" onClick={() => openProject(project)}>
          View project -&gt;
        </button>
      </div>
    </m.article>
  );

  const renderEmptyState = (title) => (
    <div className="collection-empty-state">
      <p>No completed {title.toLowerCase()} are published yet.</p>
    </div>
  );

  const renderManagedCollectionMedia = () => {
    if (!managedCollectionGroups.length) return null;

    return (
      <section className="collection-section collection-managed-media" aria-labelledby="admin-collection-media-title">
        <div className="collection-section-heading">
          <p className="eyebrow">SELECTED MOMENTS</p>
          <h2 id="admin-collection-media-title">Every performance has a story.</h2>
          <p>A closer look at the celebrations, movement and creative details behind our work.</p>
        </div>
        <div className="collection-managed-groups">
          {managedCollectionGroups.map(({ categoryName, items }) => (
            <CollectionMediaGroup categoryName={categoryName} items={items} key={categoryName} onPlay={stopPlayback} />
          ))}
        </div>
      </section>
    );
  };

  const renderMusicSampleCard = (sample, index) => (
    <m.article
      className="collection-music-sample-card"
      key={sample.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.38 }}
    >
      <div className="collection-audio-card-heading">
        <span>VOL. {String(index + 1).padStart(2, "0")}</span>
        <span><i aria-hidden="true" /> Audio preview</span>
      </div>
      <div className="collection-audio-release">
        <div className="collection-music-sample-art">
          <img src={mediaUrl(sample.image)} alt="" loading="lazy" />
        </div>
        <div className="collection-music-sample-body">
          <p>{sample.category}</p>
          <h3>{sample.title}</h3>
          <span className="collection-audio-credit">MR MUSIC MACK</span>
        </div>
      </div>
      {sample.description && <p className="collection-audio-description">{sample.description}</p>}
      <div className="collection-card-audio collection-sample-audio">
          <p><span>Listen to the edit</span><span aria-hidden="true">↗</span></p>
          <AudioPlayer
            id={sample.id}
            src={sample.src}
            title={sample.title}
            duration={sample.duration}
            onActivate={activateAudio}
          />
      </div>
    </m.article>
  );

  const setCollectionVideoIndex = (categoryId, updater) => {
    setActiveCollectionVideos((current) => {
      const currentIndex = current[categoryId] || 0;
      const nextIndex = typeof updater === "function" ? updater(currentIndex) : updater;
      return { ...current, [categoryId]: nextIndex };
    });
  };

  const playCollectionVideoWithSound = (categoryId, index) => {
    const playerKey = getCollectionVideoKey(categoryId, index);
    setCollectionVideoIndex(categoryId, index);
    setAudibleCollectionVideo(playerKey);
    setActiveYoutubeVideo(null);
    setActiveInstagramReel("");
    activeAudio.current?.pause();
    collectionVideoPlayers.current.forEach((player, key) => {
      if (key !== playerKey) {
        player.pause();
        player.muted = true;
        player.volume = 0;
      }
    });

    const player = collectionVideoPlayers.current.get(playerKey);
    if (!player) return;

    player.muted = false;
    player.volume = 1;
    player.play().catch(() => {});
  };

  const renderCollectionVideoSlider = (categoryData, categoryIndex) => {
    const activeIndex = activeCollectionVideos[categoryData.id] || 0;

    return (
    <section
      className="collection-section collection-local-video-section"
      key={categoryData.id}
      aria-labelledby={`collection-video-slider-${categoryData.id}`}
      data-video-category={categoryData.id}
      ref={(node) => {
        if (node) collectionVideoSections.current.set(categoryData.id, node);
        else collectionVideoSections.current.delete(categoryData.id);
      }}
    >
      <div className="collection-video-title-row">
        <div className="collection-section-heading collection-video-heading">
          <p className="eyebrow">{categoryIndex === 0 ? "CATEGORY-WISE VIDEO COLLECTION" : "PERFORMANCE CATEGORY"}</p>
          <h2 id={`collection-video-slider-${categoryData.id}`}>{categoryData.label}</h2>
          <p>{categoryData.description}</p>
        </div>
        <span>{String(categoryData.videos.length).padStart(2, "0")} videos</span>
      </div>
      <div className="collection-local-video-viewport">
        <div className="collection-local-video-track">
          {categoryData.videos.map(([id, title, tag, filename], index) => {
            const isActive = index === activeIndex;
            const playerKey = getCollectionVideoKey(categoryData.id, index);

            return (
              <article
                className={`collection-local-video-card${isActive ? " is-active" : ""}`}
                key={id}
                ref={(node) => {
                  if (node) collectionVideoCards.current.set(playerKey, node);
                  else collectionVideoCards.current.delete(playerKey);
                }}
                onClick={() => playCollectionVideoWithSound(categoryData.id, index)}
              >
                <video
                  ref={(node) => {
                    if (node) collectionVideoPlayers.current.set(playerKey, node);
                    else collectionVideoPlayers.current.delete(playerKey);
                  }}
                  src={`/collection-videos/${filename}`}
                  muted={audibleCollectionVideo !== playerKey}
                  playsInline
                  loop={false}
                  onPlay={() => {
                    if (audibleCollectionVideo !== playerKey)
                      playCollectionVideoWithSound(categoryData.id, index);
                  }}
                  onPause={() => {
                    setAudibleCollectionVideo((current) => current === playerKey ? "" : current);
                  }}
                  onEnded={() => {
                    if (audibleCollectionVideo === playerKey) setAudibleCollectionVideo("");
                  }}
                  controls={isActive}
                  preload={isActive ? "auto" : "metadata"}
                />
                <div className="collection-local-video-copy">
                  <span>{tag}</span>
                  <h3>{title}</h3>
                  <p>{categoryData.label}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Show ${title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    playCollectionVideoWithSound(categoryData.id, index);
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              </article>
            );
          })}
        </div>
      </div>
      <div className="collection-video-controls" aria-label="Video slider controls">
        <button
          type="button"
          onClick={() => {
            const nextIndex = activeIndex === 0 ? categoryData.videos.length - 1 : activeIndex - 1;
            playCollectionVideoWithSound(categoryData.id, nextIndex);
          }}
        >
          Prev
        </button>
        <div>
          {categoryData.videos.map(([id], index) => (
            <button
              key={id}
              type="button"
              aria-label={`Go to video ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => playCollectionVideoWithSound(categoryData.id, index)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const nextIndex = (activeIndex + 1) % categoryData.videos.length;
            playCollectionVideoWithSound(categoryData.id, nextIndex);
          }}
        >
          Next
        </button>
      </div>
    </section>
    );
  };

  const renderInstagramReels = () => (
    <section className="media-reels-section instagram-reel-slider" aria-label="Instagram reels" ref={instagramSection}>
      <div className="media-reel-grid">
        {instagramProjects
          .map((project) => ({ ...project, embedUrl: getInstagramEmbedUrl(project.href) }))
          .filter((project) => project.embedUrl)
          .map((project, index) => {
          const cardKey = `${project.href}-${index}`;
          const isActive = activeInstagramReel === cardKey;

          return (
          <m.article
            className={`media-reel-card instagram-inline-reel${isActive ? " is-active" : ""}`}
            key={cardKey}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.04, duration: 0.45 }}
          >
            {instagramEmbedsEnabled && (
              <iframe
                title={`${project.title} Instagram reel`}
                key={`${cardKey}-${instagramResetKey}-${isActive ? "active" : "idle"}`}
                src={getInstagramEmbedSrc(project.embedUrl, isActive)}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
            <button
              className="media-play-button"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                playInstagramReel(cardKey);
              }}
              aria-label={`Play ${project.title} Instagram reel`}
            >
              {isActive ? "Playing" : "Play"}
            </button>
            <b>{project.platform || "Instagram"}</b>
            <span>{project.title}</span>
          </m.article>
          );
        })}
      </div>
    </section>
  );

  const renderYoutubeVideos = () => (
    <section className="collection-section collection-youtube-section" id="collection-projects" aria-labelledby="collection-youtube-title">
      <div className="collection-section-heading">
        <p className="eyebrow">YOUTUBE PERFORMANCE VIDEOS</p>
        <h2 id="collection-youtube-title">Watch wedding, sangeet and stage performance references.</h2>
        <p>Play any video to preview the work. When the section leaves the screen, playback stops automatically.</p>
      </div>
      <div className="media-reel-grid collection-youtube-grid">
        {youtubeVideos.map((video, index) => (
          <m.article
            className="media-reel-card collection-youtube-card"
            key={video.id}
            data-media-active={activeYoutubeVideo === video.id ? `youtube-${video.id}` : undefined}
            tabIndex={0}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.04, duration: 0.45 }}
          >
            {activeYoutubeVideo === video.id ? (
              <iframe
                title={`${video.title} YouTube video`}
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&controls=1&modestbranding=1&playsinline=1&rel=0`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={`${video.title} YouTube video`} loading="lazy" />
            )}
            <button
              className="media-play-button"
              type="button"
              onClick={() => {
                stopPlayback();
                setInstagramResetKey((value) => value + 1);
                setActiveYoutubeVideo(video.id);
              }}
              aria-label={`Play ${video.title} YouTube video`}
            >
              Play
            </button>
            <b>YouTube</b>
            <span>{video.title}</span>
          </m.article>
        ))}
      </div>
    </section>
  );

  const renderProjectModal = () => (
    <AnimatePresence>
      {activeProject && (
        <m.div
          className="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.article
            className="project-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <button className="project-modal-close" type="button" onClick={closeProject} aria-label="Close project">
              x
            </button>
            <img src={activeProject.coverImage} alt={`${activeProject.title} hero`} loading="lazy" />
            <div className="project-modal-content">
              <p className="eyebrow">{activeProject.category} / {activeProject.location} / {activeProject.year}</p>
              <h2 id="project-modal-title">{activeProject.title}</h2>
              <p>{activeProject.description}</p>
              <div className="project-modal-sections">
                {["The Brief", "What We Created", "Behind The Scenes", "The Final Performance"].map((title, index) => (
                  <section key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{activeProject.highlights[index] || activeProject.description}</p>
                  </section>
                ))}
              </div>
              {activeProject.audio?.length > 0 && (
                <div className="project-modal-audio">
                  <h3>Audio previews</h3>
                  {activeProject.audio.map((audio) => (
                    <div key={audio.id}>
                      <p>{audio.title}</p>
                      <AudioPlayer {...audio} onActivate={activateAudio} />
                    </div>
                  ))}
                </div>
              )}
              <div className="project-modal-gallery">
                {activeProject.gallery.map((image, index) => (
                  <img key={image} src={image} alt={`${activeProject.title} gallery ${index + 1}`} loading="lazy" />
                ))}
              </div>
            </div>
          </m.article>
        </m.div>
      )}
    </AnimatePresence>
  );

  const renderPortfolio = () => (
    <section className="collection-portfolio" aria-labelledby="collection-portfolio-title">
        <div className="collection-hero-copy">
          <p className="eyebrow">CREATIVE PERFORMANCE STUDIO / SERVING CLIENTS ACROSS INDIA</p>
          <h2 id="collection-portfolio-title">
            The Collection
            <br />
            Work we've created. Moments they remember.
          </h2>
          <p>
            Explore selected music, choreography, costume and performance
            projects created for weddings, events and special productions.
          </p>
        </div>
        <div className="project-filter-bar" aria-label="Filter portfolio projects">
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={projectFilter === item}
              onClick={() => setProjectFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="portfolio-project-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <m.article
                className="portfolio-project-card"
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28 }}
              >
                <img src={project.coverImage} alt={`${project.title} project`} loading="lazy" />
                <div className="portfolio-project-card-body">
                  <span>{project.category} / {project.year}</span>
                  <h3>{project.title}</h3>
                  <p>{project.location}</p>
                  <p>{project.description}</p>
                  <ul>
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => openProject(project)}>
                    View project &rarr;
                  </button>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
  );

  if (collectionPage) {
    return (
      <section className="collection-premium wrap" id="our-work">
        <section className="collection-page-hero" aria-labelledby="collection-page-title">
          <div>
            <p className="eyebrow">THE COLLECTION / MR MUSIC MACK</p>
            <h1 id="collection-page-title">A Collection of Creativity, Passion &amp; Performance.</h1>
            <p>
              Explore selected music editing, audio production, choreography and
              costume design work shaped by MR MUSIC MACK from Jaipur for
              clients across India and worldwide.
            </p>
            <div className="button-row">
              <a className="button primary" href="#collection-projects">Explore projects</a>
              <button
                className="button secondary"
                type="button"
                onClick={() => onStart?.("Music Editing", "", "Creative Portfolio Enquiry")}
              >
                Start your project
              </button>
            </div>
          </div>
          <div className="collection-page-stats" aria-label="Collection highlights">
            <span><b>{portfolioProjects.length}</b> Published projects</span>
            <span><b>{youtubeVideos.length}</b> Performance videos</span>
            <span><b>{instagramProjects.filter((item) => getInstagramEmbedUrl(item.href)).length}</b> Instagram reels</span>
          </div>
        </section>

        {renderPortfolio()}

        {renderManagedCollectionMedia()}

        {musicSamples.length > 0 && <section className="collection-section" aria-labelledby="collection-listening-title">
          <div className="collection-section-heading">
            <p className="eyebrow">{audioSection?.eyebrow || "THE LISTENING ROOM"}</p>
            <h2 id="collection-listening-title">{audioSection?.title || "Hear the work."}</h2>
            <p>{audioSection?.description || "Listen to selected edits and studio previews."}</p>
          </div>
          <div className="collection-music-sample-grid">{musicSamples.map(renderMusicSampleCard)}</div>
        </section>}

        {!Array.isArray(managedMedia) && collectionVideoCategories.map((categoryData, index) =>
          renderCollectionVideoSlider(categoryData, index),
        )}

        <section className="collection-section" aria-labelledby="instagram-reels-title">
          <div className="collection-section-heading">
            <p className="eyebrow">INSTAGRAM REELS COLLECTION</p>
            <h2 id="instagram-reels-title">Recent performance reels in motion.</h2>
            <p>Wedding highlights, expressive performances and moments worth watching again.</p>
          </div>
          {renderInstagramReels()}
        </section>

        {renderYoutubeVideos()}

        <section className="collection-section collection-stories" aria-labelledby="project-stories-title">
          <div className="collection-section-heading">
            <p className="eyebrow">PROJECT STORIES &amp; DETAILS</p>
            <h2 id="project-stories-title">Briefs, highlights and final creative direction.</h2>
          </div>
          <div className="collection-story-grid">
            {portfolioProjects.map((project, index) => (
              <button type="button" key={project.slug} onClick={() => openProject(project)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.title}</strong>
                <small>{project.highlights[0] || project.description}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="collection-final-cta collection-collaboration-cta" aria-labelledby="collection-final-title">
          <p className="eyebrow">CREATIVE COLLABORATION</p>
          <h2 id="collection-final-title">Let us shape your next performance.</h2>
          <p>
            Share your song, event, video, outfit reference or performance idea.
            We will help plan the sound, movement and visual direction around it.
          </p>
          <div>
            <button className="button primary" type="button" onClick={() => onStart?.("Music Editing", "", "The Collection Enquiry")}>
              Start your project
            </button>
            <a className="button secondary" href="https://wa.me/919887563201" target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
          </div>
        </section>
        {renderProjectModal()}
      </section>
    );
  }

  return (
    <section className="section wrap" id="our-work">
      <div className="section-intro">
        <div>
          <p className="eyebrow">{audioSection?.eyebrow ?? "LESS TALK. MORE LISTENING."}</p>
          <h2>
            {audioSection?.title ?? "Don't Just Read About It. Hear the Work."}
          </h2>
        </div>
        <p>
          {audioSection?.description ?? "Explore the two sides of sound. Start with a demonstration, then tell us what you have in mind."}
        </p>
      </div>
      {!managedAudio && <div className="work-tabs" aria-label="Portfolio categories">
        {[
          ["editing", "MUSIC EDITING"],
          ["background", "BACKGROUND MUSIC"],
        ].map(([value, label]) => (
          <button
            key={value}
            aria-pressed={category === value}
            onClick={() => {
              stopPlayback();
              setCategory(value);
              setFilter("All");
            }}
          >
            {label} ↗
          </button>
        ))}
      </div>}
      <div className="work-filters" aria-label="Filter samples">
        {filters.map((item) => (
          <button
            key={item}
            aria-pressed={activeFilter === item}
            onClick={() => {
              stopPlayback();
              setFilter(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {visible.map((demo) => (
          <m.article
            className="work-card"
            key={demo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sample-label">
              <span>{demo.tags[0].toUpperCase()}</span>
              <span>{managedAudio ? "AUDIO SAMPLE" : "DEMONSTRATION"}</span>
            </div>
            {demo.poster && <img className="service-audio-cover" src={mediaUrl(demo.poster)} alt="" loading="lazy" />}
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
            <AudioPlayer
              id={demo.id}
              src={demo.src}
              title={demo.title}
              duration={demo.duration}
              onActivate={activateAudio}
            />
          </m.article>
        ))}
      </div>
      {!visible.length && <p className="collection-empty-state">Audio samples will appear here when they are available.</p>}
      {showEditingReels && category === "editing" &&
        musicEditingVideoSections.map((section, index) =>
          renderCollectionVideoSlider(section, index),
        )}
      <div className="comparison">
        <div>
          <small>BEFORE / DIFFERENT TRACKS</small>
          <div className="before-tracks">
            {["SONG 01", "SONG 02", "SONG 03", "SONG 04"].map((song) => (
              <span key={song}>{song}</span>
            ))}
          </div>
        </div>
        <div className="comparison-center">
          MR MUSIC MACK
          <br />
          CUT · ARRANGE · MIX · POLISH
          <br />→
        </div>
        <div>
          <small>AFTER / ONE SEAMLESS EXPERIENCE</small>
          <div className="after-track">
            <span>ONE FINAL PERFORMANCE TRACK</span>
            <m.span className="tiny-wave" aria-hidden="true">
              ▂▆▃▇▅▂
            </m.span>
          </div>
        </div>
      </div>
      <section className="collection-final-cta" aria-labelledby="collection-final-title">
        <p className="eyebrow">START THE NEXT PERFORMANCE</p>
        <h2 id="collection-final-title">
          Your performance
          <br />
          could be next.
        </h2>
        <p>
          Tell us what you're planning. We'll help shape the music, movement and
          visual experience around it.
        </p>
        <div>
          <a className="button primary" href="/lets-connect">Start your project</a>
          <a className="button secondary" href="https://wa.me/919887563201" target="_blank" rel="noreferrer">
            WhatsApp us
          </a>
        </div>
      </section>
      <AnimatePresence>
        {activeProject && (
          <m.div
            className="project-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.article
              className="project-modal"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <button className="project-modal-close" type="button" onClick={closeProject} aria-label="Close project">
                x
              </button>
              <img src={activeProject.coverImage} alt={`${activeProject.title} hero`} loading="lazy" />
              <div className="project-modal-content">
                <p className="eyebrow">{activeProject.category} / {activeProject.location} / {activeProject.year}</p>
                <h2 id="project-modal-title">{activeProject.title}</h2>
                <p>{activeProject.description}</p>
                <div className="project-modal-sections">
                  {["The Brief", "What We Created", "Behind The Scenes", "The Final Performance"].map((title, index) => (
                    <section key={title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{title}</h3>
                      <p>{activeProject.highlights[index] || activeProject.description}</p>
                    </section>
                  ))}
                </div>
                {activeProject.audio?.length > 0 && (
                  <div className="project-modal-audio">
                    <h3>Before / After</h3>
                    {activeProject.audio.map((audio) => (
                      <div key={audio.id}>
                        <p>{audio.title}</p>
                        <AudioPlayer {...audio} onActivate={activateAudio} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="project-modal-gallery">
                  {activeProject.gallery.map((image, index) => (
                    <img key={image} src={image} alt={`${activeProject.title} gallery ${index + 1}`} loading="lazy" />
                  ))}
                </div>
              </div>
            </m.article>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
