import { memo, useEffect, useRef, useState } from "react";

// Playback state belongs to one player, so time updates do not redraw the portfolio.
export default memo(function AudioPlayer({ id, title, duration, onActivate }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const player = audio.current;
    return () => player?.pause();
  }, []);

  async function toggle() {
    const player = audio.current;
    if (!player.paused) {
      player.pause();
      return;
    }
    setError("");
    player.muted = false;
    player.volume = 1;
    onActivate(player);
    try {
      await player.play();
    } catch (reason) {
      // A quick pause or switch can cancel play(); this is not a failed file.
      if (reason.name !== "AbortError")
        setError("This sample could not play. Please try again.");
    }
  }

  return (
    <>
      <audio
        ref={audio}
        src={`/samples/${id}.wav`}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onError={() =>
          setError(
            "This audio sample is unavailable. Ask us for a reference on WhatsApp.",
          )
        }
      />
      <div className="audio-player">
        <button
          className="audio-toggle"
          aria-label={`${playing ? "Pause" : "Play"} ${title}`}
          aria-pressed={playing}
          onClick={toggle}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
        <div className="audio-wave" aria-hidden="true">
          {Array.from({ length: 35 }, (_, bar) => (
            <i
              key={bar}
              className={bar / 35 < time / duration ? "played" : ""}
              style={{ height: `${15 + ((bar * 17) % 80)}%` }}
            />
          ))}
        </div>
      </div>
      <div className="audio-meta">
        <span>0:{String(Math.floor(time)).padStart(2, "0")}</span>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={time}
          aria-label={`Seek ${title}`}
          onChange={(event) => {
            const value = Number(event.target.value);
            audio.current.currentTime = value;
            setTime(value);
          }}
        />
        <span>0:{duration}</span>
      </div>
      {error && (
        <p role="alert" className="form-status error">
          {error}
        </p>
      )}
    </>
  );
});
