import Hero from "../components/Hero";
import StudioShowcase from "../components/StudioShowcase";
export default function HomePage({ onStart, siteContent }) {
  const sections = siteContent?.home?.sections;
  return (
    <div className="studio-home">
      {sections?.hero !== false && <Hero onStart={onStart} siteContent={siteContent} />}
      {sections?.studioShowcase !== false && <StudioShowcase siteContent={siteContent} />}
    </div>
  );
}
