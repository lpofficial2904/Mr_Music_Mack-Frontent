import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "../api";

export default function CollectionMediaGroup({ categoryName, items, onPlay }) {
  const track = useRef(null);
  const players = useRef(new Map());
  const [slide, setSlide] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [playing, setPlaying] = useState("");
  const lastSlide = Math.max(0, items.length - perPage);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)");
    const tablet = window.matchMedia("(max-width: 1000px)");
    const update = () => {
      setPerPage(mobile.matches ? 1 : tablet.matches ? 2 : 3);
      setSlide(0);
      track.current?.scrollTo({ left: 0, behavior: "instant" });
    };
    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => { mobile.removeEventListener("change", update); tablet.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    setSlide(0);
    track.current?.scrollTo({ left: 0, behavior: "instant" });
  }, [items.length]);

  const step = () => {
    const cards = track.current?.children;
    return cards?.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
  };
  const goTo = (index) => {
    const next = Math.max(0, Math.min(index, lastSlide));
    setSlide(next);
    track.current?.scrollTo({ left: next * step(), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const toggle = async (url) => {
    const player = players.current.get(url);
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    try { await player.play(); } catch { setPlaying(""); }
  };

  return (
    <section className="collection-local-video-section collection-managed-carousel" aria-label={categoryName}>
      <div className="collection-video-title-row">
        <div className="collection-section-heading collection-video-heading">
          <p className="eyebrow">PERFORMANCE CATEGORY</p>
          <h2>{categoryName}</h2>
          <p>Selected moments, expressive performances and creative details from our collection.</p>
        </div>
        <span>{String(items.length).padStart(2, "0")} {items.every((item) => item.type === "video") ? "videos" : "items"}</span>
      </div>
      <div className="collection-local-video-viewport">
        <div className="collection-local-video-track" ref={track} onScroll={() => {
          const distance = step();
          if (distance) setSlide(Math.min(lastSlide, Math.max(0, Math.round(track.current.scrollLeft / distance))));
        }}>
          {items.map((item, index) => {
            const title = item.title || categoryName;
            const key = `${item.url}-${index}`;
            const isPlaying = playing === key;
            return (
                <article className={`collection-local-video-card${isPlaying ? " is-playing" : ""}`} key={key}>
                {item.type === "video" ? <video
                  ref={(node) => { if (node) players.current.set(key, node); else players.current.delete(key); }}
                  src={mediaUrl(item.url)} poster={mediaUrl(item.poster) || undefined}
                  playsInline controls={isPlaying} preload="metadata"
                  onPlay={() => { onPlay?.(); setPlaying(key); }}
                  onPause={() => setPlaying((current) => current === key ? "" : current)}
                  onEnded={() => setPlaying("")} /> : <img src={mediaUrl(item.url)} alt={title} loading="lazy" />}
                <div className="collection-local-video-copy"><span>{item.type === "video" ? "Performance film" : "Photo story"}</span><h3>{title}</h3><p>{item.caption || categoryName}</p></div>
                <span className="collection-card-number">{String(index + 1).padStart(2, "0")}</span>
                {!isPlaying && <div className="collection-card-play">{item.type === "video" ?
                  <button type="button" aria-label={`Play ${title}`} onClick={() => toggle(key)}>▶</button> :
                  <a href={mediaUrl(item.url)} target="_blank" rel="noreferrer" aria-label={`View ${title}`}>↗</a>}</div>}
              </article>
            );
          })}
        </div>
      </div>
      {lastSlide > 0 && <div className="collection-video-controls" aria-label={`${categoryName} slider controls`}>
        <button type="button" disabled={slide === 0} onClick={() => goTo(slide - 1)}>Prev</button>
        <div>{Array.from({ length: lastSlide + 1 }, (_, index) => (index === 0 || index === lastSlide || Math.abs(index - slide) <= 2) && <button type="button" key={index} aria-label={`Show ${categoryName} slide ${index + 1}`} aria-pressed={index === slide} onClick={() => goTo(index)} />)}</div>
        <button type="button" disabled={slide === lastSlide} onClick={() => goTo(slide + 1)}>Next</button>
      </div>}
    </section>
  );
}
