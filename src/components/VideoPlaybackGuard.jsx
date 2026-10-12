import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function isDecorativeVideo(video) {
  return video.dataset.videoPreview === "true" || (video.muted && video.loop && !video.controls);
}

function isVisibleEnough(video) {
  if (!video.isConnected || video.getClientRects().length === 0) return false;
  const rect = video.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  return rect.bottom > 80 && rect.top < viewportHeight - 80 && rect.right > 0 && rect.left < viewportWidth;
}

function pauseVideo(video, { mute = true } = {}) {
  if (!video || video.paused) return;
  video.pause();
  if (mute) video.muted = true;
}

function pauseOtherVideos(activeVideo) {
  document.querySelectorAll("video").forEach((video) => {
    if (video === activeVideo || isDecorativeVideo(video)) return;
    pauseVideo(video);
  });
}

function pauseHiddenVideos() {
  document.querySelectorAll("video").forEach((video) => {
    if (isDecorativeVideo(video) || video.paused) return;
    if (!isVisibleEnough(video)) pauseVideo(video);
  });
}

function pauseAllContentVideos() {
  document.querySelectorAll("video").forEach((video) => {
    if (!isDecorativeVideo(video)) pauseVideo(video);
  });
}

export default function VideoPlaybackGuard() {
  const location = useLocation();

  useEffect(() => {
    pauseAllContentVideos();
  }, [location.pathname, location.search]);

  useEffect(() => {
    let frame = 0;
    const schedulePauseHiddenVideos = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(pauseHiddenVideos);
    };
    const handlePlay = (event) => {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement) || isDecorativeVideo(video)) return;
      video.muted = false;
      pauseOtherVideos(video);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) pauseAllContentVideos();
    };

    document.addEventListener("play", handlePlay, true);
    window.addEventListener("scroll", schedulePauseHiddenVideos, { passive: true });
    window.addEventListener("resize", schedulePauseHiddenVideos);
    window.addEventListener("pagehide", pauseAllContentVideos);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("play", handlePlay, true);
      window.removeEventListener("scroll", schedulePauseHiddenVideos);
      window.removeEventListener("resize", schedulePauseHiddenVideos);
      window.removeEventListener("pagehide", pauseAllContentVideos);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
