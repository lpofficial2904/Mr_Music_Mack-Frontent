import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageContent from "./PageContent";
import { MobileProjectCTA } from "./ProjectCTA";
import VideoPlaybackGuard from "./VideoPlaybackGuard";
import { apiUrl, hasApiBackend } from "../api";

const ProjectBriefModal = lazy(() => import("./ProjectBriefModal"));

export default function SiteLayout() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const path = pathname.replace(/\/$/, "") || "/";
  const query = new URLSearchParams(search);
  const [brief, setBrief] = useState(null);
  const [siteContent, setSiteContent] = useState(null);
  const contentSnapshot = useRef("");
  const briefRedirectTimer = useRef(null);

  useEffect(
    () => () => window.clearTimeout(briefRedirectTimer.current),
    [],
  );

  const loadSiteContent = useCallback(async ({ signal } = {}) => {
    const response = await fetch(apiUrl("/api/site-content"), {
      cache: "no-store",
      signal,
    });
    if (!response.ok)
      throw new Error(`Website content request failed (${response.status}).`);
    const content = await response.json();
    const snapshot = JSON.stringify(content);
    // Unchanged fallback responses must not reset active media and page controls.
    if (snapshot !== contentSnapshot.current) {
      contentSnapshot.current = snapshot;
      setSiteContent(content);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (!hasApiBackend()) return;
    const controller = new AbortController();
    let refreshing = false;
    let pending = false;
    const refresh = async () => {
      if (document.hidden) return;
      if (refreshing) { pending = true; return; }
      refreshing = true;
      try {
        await loadSiteContent({ signal: controller.signal });
      } catch (error) {
        if (error.name !== "AbortError")
          console.error("Could not load published website customization:", error);
      } finally {
        refreshing = false;
        if (pending && !controller.signal.aborted) {
          pending = false;
          refresh();
        }
      }
    };
    const events = typeof EventSource !== "undefined"
      ? new EventSource(apiUrl("/api/site-content/events")) : null;
    events?.addEventListener("content-updated", refresh);
    refresh();
    const interval = window.setInterval(refresh, 3000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      events?.close();
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [loadSiteContent]);

  useEffect(() => {
    if (!siteContent?.settings) return;
    const root = document.documentElement;
    root.style.setProperty("--brand-gold", siteContent.settings.accentColor);
    root.style.setProperty("--brand-gold-light", siteContent.settings.accentLight);
    root.style.setProperty("--site-accent", siteContent.settings.accentColor);
    root.style.setProperty("--site-accent-light", siteContent.settings.accentLight);
  }, [siteContent]);

  function startProject(type = "Music Editing", mood = "", need = "") {
    setBrief({ type, mood, need });
  }

  function handleBriefSubmitted() {
    setBrief(null);
    window.clearTimeout(briefRedirectTimer.current);
    briefRedirectTimer.current = window.setTimeout(
      () => navigate("/"),
      3000,
    );
  }

  function startPageProject() {
    const isCostumeDesign = path === "/costume-design";
    const isChoreographer = path === "/choreographer";

    startProject(
      isCostumeDesign
        ? "Costume Design"
        : isChoreographer
          ? "Choreographer"
          : "Music Editing",
      "",
      isCostumeDesign
        ? "Costume Design"
        : isChoreographer
          ? "Choreography"
          : "",
    );
  }

  return (
    <>
      <VideoPlaybackGuard />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar onStart={startPageProject} path={path} siteContent={siteContent} />
      <main id="main-content">
        <Routes>
          <Route
            path="*"
            element={
              <PageContent
                path={path}
                query={query}
                onStart={startProject}
                siteContent={siteContent}
              />
            }
          />
        </Routes>
      </main>
      <Footer siteContent={siteContent} />
      <MobileProjectCTA onStart={startPageProject} />
      <Suspense
        fallback={
          <p className="brief-loading" role="status">
            Opening project brief...
          </p>
        }
      >
        {brief && (
          <ProjectBriefModal
            isOpen
            onClose={() => setBrief(null)}
            initialType={brief.type}
            initialMood={brief.mood}
            initialNeed={brief.need}
            onSubmitted={handleBriefSubmitted}
          />
        )}
      </Suspense>
    </>
  );
}
