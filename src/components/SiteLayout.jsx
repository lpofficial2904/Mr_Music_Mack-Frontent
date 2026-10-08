import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageContent from "./PageContent";
import { MobileProjectCTA } from "./ProjectCTA";
import { apiUrl, hasApiBackend } from "../api";

const ProjectBriefModal = lazy(() => import("./ProjectBriefModal"));

export default function SiteLayout() {
  const { pathname, search } = useLocation();
  const path = pathname.replace(/\/$/, "") || "/";
  const query = new URLSearchParams(search);
  const [brief, setBrief] = useState(null);
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (!hasApiBackend()) return;
    let active = true;
    fetch(apiUrl("/api/site-content"))
      .then((response) => {
        if (!response.ok) throw new Error(`Website content request failed (${response.status}).`);
        return response.json();
      })
      .then((content) => {
        if (active) setSiteContent(content);
      })
      .catch((error) => {
        console.error("Could not load published website customization:", error);
      });
    return () => { active = false; };
  }, []);

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
          />
        )}
      </Suspense>
    </>
  );
}
