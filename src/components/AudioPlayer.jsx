import { memo, useEffect, useRef, useState } from "react";

import { mediaUrl } from "../api";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

export default memo(function AudioPlayer({ id, src, title, duration, onActivate }) {
  const audio = useRef(null);
  const source = mediaUrl(src || `/samples/${id}.wav`);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(Number(duration) || 0);
  const [error, setError] = useState("");

  useEffect(() => {
    const player = audio.current;
    player?.pause();
    setPlaying(false);
    setTime(0);
    setLength(Number(duration) || 0);
    setError("");
    return () => player?.pause();
  }, [source, duration]);

  const readDuration = (event) => {
    const value = event.currentTarget.duration;
    if (Number.isFinite(value) && value > 0) setLength(value);
  };
  async function toggle() {
    const player = audio.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    setError("");
    player.muted = false;
    player.volume = 1;
    onActivate?.(player);
    try { await player.play(); }
    catch (reason) {
      if (reason.name !== "AbortError") setError("This sample could not play. Please try again.");
    }
  }

  return (
    <>
      <audio ref={audio} src={source} preload="metadata"
        onLoadedMetadata={readDuration} onDurationChange={readDuration}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onError={() => setError("This audio sample is currently unavailable.")} />
      <div className="audio-player" data-playing={playing}>
        <button className="audio-toggle" type="button"
          aria-label={`${playing ? "Pause" : "Play"} ${title}`} aria-pressed={playing} onClick={toggle}>
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>
        <div className="audio-wave" aria-hidden="true">
          {Array.from({ length: 35 }, (_, bar) => <i key={bar}
            className={length && bar / 35 < time / length ? "played" : ""}
            style={{ height: `${15 + ((bar * 17) % 80)}%` }} />)}
        </div>
      </div>
      <div className="audio-meta">
        <span>{formatTime(time)}</span>
        <input type="range" min="0" max={length || 1} step="0.1"
          value={Math.min(time, length || 0)} disabled={!length}
          aria-label={`Seek ${title}`} aria-valuetext={formatTime(time)}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (audio.current && length) {
              audio.current.currentTime = value;
              setTime(value);
            }
          }} />
        <span>{length ? formatTime(length) : "--:--"}</span>
      </div>
      {error && <p role="alert" className="form-status error">{error}</p>}
    </>
  );
});
