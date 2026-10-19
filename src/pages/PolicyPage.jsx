import { Link } from "react-router-dom";
import { policyPages } from "../policyPages";
import "./PolicyPage.css";

function linkedText(text) {
  return text.split(/(https:\/\/[^\s,]+|mrmusicmack@gmail\.com|\+91 98875 63201)/g).map((part, index) => {
    if (part.startsWith("https://")) return <a href={part.replace(/\.$/, "")} key={index}>{part}</a>;
    if (part === "mrmusicmack@gmail.com") return <a href={`mailto:${part}`} key={index}>{part}</a>;
    if (part === "+91 98875 63201") return <a href="tel:+919887563201" key={index}>{part}</a>;
    return part;
  });
}

export default function PolicyPage({ path }) {
  const policy = policyPages[path];
  return (
    <article className="policy-page wrap">
      <header className="policy-header">
        <p className="eyebrow">MR MUSIC MACK</p>
        <h1>{policy.title}</h1>
      </header>
      <div className="policy-copy">
        {policy.text.split(/\n\s*\n/).map((block, index) => (
          <section key={index}>
            {block.split("\n").map((line, lineIndex) => {
              if (/^\d+\. /.test(line)) return <h2 key={lineIndex}>{line}</h2>;
              if (line.startsWith("Effective Date:")) return <p className="policy-date" key={lineIndex}>{line}</p>;
              return <p key={lineIndex}>{linkedText(line)}</p>;
            })}
          </section>
        ))}
      </div>
      <nav className="policy-navigation" aria-label="Policies">
        {Object.entries(policyPages).map(([route, page]) => (
          <Link key={route} to={route} aria-current={route === path ? "page" : undefined}>{page.title}</Link>
        ))}
      </nav>
    </article>
  );
}
