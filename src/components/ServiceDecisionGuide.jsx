import { Link } from "react-router-dom";
import { serviceGuides } from "../serviceGuides";
import { enquiryContext } from "../seoStrategy";

export default function ServiceDecisionGuide({ path, onStart }) {
  const guide = serviceGuides[path];
  if (!guide) return null;
  const context = enquiryContext(path);
  return (
    <section
      className="section wrap landing-details"
      aria-label="Service planning and questions"
    >
      <div>
        <p className="eyebrow">PLAN YOUR PROJECT</p>
        <h2>Is this the right service for you?</h2>
        <p>{guide.audience}</p>
        <h3>What to send with your enquiry</h3>
        <p>{guide.inputs}</p>
        <h3>What your quote should cover</h3>
        <p>{guide.scope}</p>
        <Link to="/the-collection">
          Explore samples and portfolio references &rarr;
        </Link>
      </div>
      <div>
        <p className="eyebrow">BEFORE YOU BOOK</p>
        <h2>Questions about your project</h2>
        <details className="service-question">
          <summary>{guide.question}</summary>
          <p>{guide.answer}</p>
        </details>
        <details className="service-question">
          <summary>How are pricing and turnaround confirmed?</summary>
          <p>
            Send the brief and deadline first. The studio will confirm
            availability, the work involved, delivery format and revision terms
            for your project before you decide to book.
          </p>
        </details>
        <button
          type="button"
          className="button primary"
          onClick={() => onStart(context.type, "", context.need)}
        >
          {context.cta} &rarr;
        </button>
      </div>
    </section>
  );
}
