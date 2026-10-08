import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { editingServices } from "../siteData";
import { WhatsAppIcon } from "./Icons";

const MotionLink = m.create(Link);

export default function Navbar({ onStart, path, siteContent }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const toggle = useRef(null);
  const mobileClose = useRef(null);
  const header = useRef(null);
  const serviceToggle = useRef(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(false);
  };

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => {
    const dismiss = (event) => { if (!header.current?.contains(event.target)) { closeServices(); setOpen(false); } };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  useEffect(() => {
    closeServices();
  }, [path]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (open) mobileClose.current?.focus();
  }, [open]);
  const reduceMotion = useReducedMotion();
  const defaultLinks = [
    ["Home", "/"],
    ["The Studio", "/the-studio"],
    ["Music Editing", "/music-editing"],
    ["Choreographer", "/choreographer"],
    ["Costume Design", "/costume-design"],
    ["The Collection.", "/the-collection"],
    ["Let’s Connect", "/lets-connect"],
  ];
  const links = siteContent?.navigation?.length
    ? siteContent.navigation.map((item) => [item.label, item.path, item.dropdown])
    : defaultLinks.map(([label, href]) => [label, href, label === "Music Editing" ? "editing" : undefined]);
  const menuEditingServices = siteContent?.services
    ? siteContent.services
        .filter((service) => service.category === "editing" && service.enabled)
        .map((service) => [service.name, service.path])
    : editingServices.filter(([, route]) => route !== "/custom-music-production");
  const visibleLinks = links.filter(([, href]) => {
    const route = href.split("?")[0];
    return siteContent?.pages?.[route]?.published !== false &&
      !siteContent?.hiddenPages?.includes(route);
  });
  const settings = siteContent?.settings;
  const phone = settings?.phone || "+91 98875 63201";
  const phoneDigits = phone.replace(/\D/g, "");
  const isEditingMenu = (label, dropdown) => dropdown === "editing" || label === "Music Editing";
  const isActiveService = (route) =>
    path === route ||
    (route === "/music-editing" && path === "/services");
  const drawerVariants = {
    closed: {
      x: "-100%",
      transition: { duration: reduceMotion ? 0 : 0.24, when: "afterChildren" },
    },
    open: {
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.32,
        ease: [0.22, 1, 0.36, 1],
        delayChildren: reduceMotion ? 0 : 0.08,
        staggerChildren: reduceMotion ? 0 : 0.045,
      },
    },
  };
  const drawerItemVariants = {
    closed: { opacity: 0, x: reduceMotion ? 0 : -12 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.2 },
    },
  };
  return (
    <header
      className="site-navbar-root nav-shell" ref={header} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          setServicesOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="site-navbar-bar navbar">
        <Link to="/" className="site-navbar-brand brand" aria-label="MR Music Mack home">
          <span className="brand-mark">
            <img className="brand-logo" src={settings?.logo || "/brand-logo.svg"} alt="" width="76" height="56" />
          </span>
          <span>
            {settings?.brandName || "MR MUSIC MACK"}<small>{settings?.tagline || "EDITING & AUDIO STUDIO"}</small>
          </span>
        </Link>
        <nav className="site-navbar-menu desktop-nav" aria-label="Main navigation">
          {visibleLinks.map(([label, href, dropdown]) => isEditingMenu(label, dropdown) ? (
            <div
              className="nav-music"
              key={label}
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
              onFocusCapture={openServices}
            >
              <button
                ref={serviceToggle}
                className="nav-music-toggle"
                aria-expanded={servicesOpen}
                aria-controls="desktop-music-services"
                aria-haspopup="true"
                data-active={path === href || path === "/services" || menuEditingServices.some(([, route]) => route === path)}
                onClick={() => setServicesOpen((current) => !current)}
              >
                {label} <span aria-hidden="true">⌄</span>
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <m.div
                    className="nav-music-panel"
                    id="desktop-music-services"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.98 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                  >
                    <div className="nav-music-heading">EDITING SERVICES <Link to={href} onClick={closeServices}>Explore all ↗</Link></div>
                    <div className="nav-music-grid">{menuEditingServices.map(([title, route]) => <Link to={route} key={title} aria-current={path === route ? "page" : undefined} onClick={closeServices}>{title}<span aria-hidden="true">↗</span></Link>)}</div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              key={href}
              to={href}
              aria-current={isActiveService(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="site-navbar-actions nav-actions">
          <a
            className="nav-phone"
            href={`https://wa.me/${phoneDigits || "919887563201"}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`WhatsApp ${phone}`}
          >
            <WhatsAppIcon size={19} />
            <span>{phone}</span>
          </a>
          <button className="button primary nav-cta" onClick={() => onStart()}>
            Start your project ↗
          </button>
          <button
            ref={toggle}
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <m.button
              type="button"
              className="nav-backdrop"
              aria-label="Close navigation menu"
              onClick={() => {
                setOpen(false);
                toggle.current?.focus();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            />
            <m.nav
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
            >
              <div className="mobile-nav-top">
                <MotionLink to="/" className="brand" aria-label="MR Music Mack home" variants={drawerItemVariants}>
                  <span className="brand-mark">
                    <img className="brand-logo" src={settings?.logo || "/brand-logo.svg"} alt="" width="76" height="56" />
                  </span>
                  <span>{settings?.brandName || "MR MUSIC MACK"}<small>{settings?.tagline || "EDITING & AUDIO STUDIO"}</small></span>
                </MotionLink>
                <m.button
                  ref={mobileClose}
                  type="button"
                  className="mobile-nav-close"
                  aria-label="Close menu"
                  onClick={() => {
                    setOpen(false);
                    toggle.current?.focus();
                  }}
                  variants={drawerItemVariants}
                >
                  <span aria-hidden="true">✕</span>
                </m.button>
              </div>
              {visibleLinks.map(([label, href, dropdown]) => isEditingMenu(label, dropdown) ? (
                <m.details className="mobile-music" key={label} variants={drawerItemVariants}>
                  <summary data-active={path === href || path === "/services" || menuEditingServices.some(([, route]) => route === path)}>{label} <span aria-hidden="true">⌄</span></summary>
                  <div>
                    {menuEditingServices.map(([title, route]) => <Link to={route} key={title} aria-current={path === route ? "page" : undefined} onClick={() => setOpen(false)}>{title}<span aria-hidden="true">↗</span></Link>)}
                    <Link to={href} onClick={() => setOpen(false)}>Explore music editing ↗</Link>
                  </div>
                </m.details>
              ) : (
                <MotionLink
                  key={href}
                  to={href}
                  aria-current={path === href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  variants={drawerItemVariants}
                >
                  {label}
                  <span>↗</span>
                </MotionLink>
              ))}
              <m.button
                className="button primary"
                onClick={() => {
                  setOpen(false);
                  onStart();
                }}
                variants={drawerItemVariants}
              >
                Start your project ↗
              </m.button>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
