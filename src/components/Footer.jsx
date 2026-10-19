import { Link } from "react-router-dom";
import { mediaUrl } from "../api";
import { StudioIcon, WhatsAppIcon } from "./Icons";

export default function Footer({ siteContent }) {
  const settings = siteContent?.settings;
  const phone = settings?.phone || "+91 98875 63201";
  const phoneLink = phone.replace(/[^\d+]/g, "");
  const whatsappNumber = phone.replace(/\D/g, "");
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand footer-group">
            <Link to="/" className="brand">
              <img
                className="brand-logo"
                src={mediaUrl(settings?.logo) || "/brand-logo.svg"}
                alt=""
                width="76"
                height="56"
              />
              <span>
                {settings?.brandName || "MR MUSIC MACK"}
                <small>{settings?.tagline || "MUSIC EDITING &amp; AUDIO PRODUCTION"}</small>
              </span>
            </Link>
            <p className="footer-tagline">
              Crafted Sound.
              <br />
              Powerful Performances.
              <br />
              Unforgettable Moments.
            </p>
            <p className="footer-description">
              Premium music editing, choreography and costume direction for
              weddings, stages and standout creative projects.
            </p>
          </div>
          <div className="footer-group footer-services">
            <h3>SERVICES</h3>
            <div className="footer-links">
              <Link to="/music-editing">Music Editing</Link>
              <Link to="/choreographer">Choreographer</Link>
              <Link to="/costume-design">Costume Design</Link>
            </div>
          </div>
          <div className="footer-group">
            <h3>EXPLORE</h3>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/the-studio">The Studio</Link>
              <Link to="/the-collection">The Collection.</Link>
            </div>
          </div>
          <div className="footer-group">
            <h3>START</h3>
            <div className="footer-links">
              <Link to="/lets-connect">Let’s Connect</Link>
              <Link to="/music-editing">Music Editing Brief</Link>
              <Link to="/the-collection">View Collection</Link>
            </div>
          </div>
          <div className="footer-group footer-contact">
            <h3>LET'S CONNECT</h3>
            <div className="footer-links">
              <p className="footer-address footer-detail">
                <StudioIcon name="location" size={17} />
                <span>{settings?.address || "Shyam Nagar, Sodala, Jaipur, Rajasthan"}</span>
              </p>
              <a className="footer-detail" href={`tel:${phoneLink}`}>
                <StudioIcon name="phone" size={16} />
                <span>{phone}</span>
              </a>
              <a className="footer-detail" href={`mailto:${settings?.email || "mrmusicmack@gmail.com"}`}>
                <StudioIcon name="email" size={16} />
                <span>{settings?.email || "mrmusicmack@gmail.com"}</span>
              </a>
              <Link to="/lets-connect">Send a project brief ↗</Link>
              <a
                className="footer-whatsapp"
                href={`https://wa.me/${whatsappNumber || "919887563201"}`}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={17} />
                <span>Chat on WhatsApp ↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MR MUSIC MACK. All rights reserved.
          </span>
          <span>CRAFTED WITH PRECISION. CREATED WITH FEELING.</span>
        </div>
      </div>
    </footer>
  );
}
