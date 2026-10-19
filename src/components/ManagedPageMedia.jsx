import { useRef } from "react";
import AudioPlayer from "./AudioPlayer";
import { mediaUrl } from "../api";

const mediaLabels = {
  image: "Photo",
  video: "Video",
  audio: "Audio",
};

export default function ManagedPageMedia({ page, excludeAudio = false }) {
  const section = useRef(null);
  const activate = (player) => {
    section.current?.querySelectorAll("audio, video").forEach((other) => {
      if (other !== player) other.pause();
    });
  };
  const media = (page?.media || []).filter((item) => item?.url && item.enabled !== false && (!excludeAudio || item.type !== "audio"));
  if (!media.length) return null;

  return (
    <section className="managed-page-media" ref={section}>
      <div className="wrap">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Page media</p>
            <h2>Photos, videos and audio</h2>
          </div>
          <p>Explore selected photos, videos and audio from our work.</p>
        </div>
        <div className="managed-media-grid">
          {media.map((item, index) => (
            <article
              className={`managed-media-card managed-media-${item.type}`}
              key={`${item.url}-${index}`}
            >
              <div className="managed-media-visual">
                <div className="managed-media-labels"><span>{mediaLabels[item.type] || "Media"}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                {item.type === "video" ? (
                  <video src={mediaUrl(item.url)} poster={mediaUrl(item.poster) || undefined} controls playsInline preload="metadata" onPlay={(event) => activate(event.currentTarget)} />
                ) : (
                  <img src={mediaUrl(item.type === "audio" ? item.poster || "/main-service-cards/background-music.jpg" : item.url)} alt={item.type === "audio" ? "" : item.title || page.name || "Page media"} loading="lazy" />
                )}
                {item.type === "audio" && <span className="managed-media-art-label">THE SOUND OF OUR STUDIO</span>}
              </div>
                <div className="managed-media-copy">
                  <p className="managed-media-category">{item.category || (item.type === "audio" ? "Studio sessions" : "Selected work")}</p>
                  <h3>{item.title || `${mediaLabels[item.type]} ${index + 1}`}</h3>
                  {item.caption && <p>{item.caption}</p>}
                  {item.type === "audio" && <div className="managed-media-player"><span>Listen to preview</span><AudioPlayer src={item.url} title={item.title || "Audio sample"} onActivate={activate} /></div>}
                </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
