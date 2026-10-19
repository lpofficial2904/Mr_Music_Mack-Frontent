import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl, hasApiBackend } from "../api";
import { projectTypes, requirements } from "../siteData";
import { WhatsAppIcon } from "./Icons";

const briefProfiles = {
  "Music Editing": {
    tone: "editing",
    eyebrow: "MUSIC EDITING BRIEF",
    title: "Tell us the songs, cuts and timing.",
    hint: "Best for song edits, mashups, remixes, mix-mastering and custom performance tracks.",
    proof: ["Song list", "Timing cues", "Reference mix"],
    need: "Music Editing",
    notesPlaceholder:
      "Share your song list, order, timestamps, transitions, event use and any must-keep sections...",
  },
  "Wedding Music": {
    tone: "wedding",
    eyebrow: "WEDDING & EVENT BRIEF",
    title: "Make every entry and performance land right.",
    hint: "Perfect for bride/groom entries, couple dances, family performances and sangeet mashups.",
    proof: ["Performance order", "Entry cues", "Final duration"],
    need: "Mashup",
    notesPlaceholder:
      "Mention the function, song order, entry points, family/couple sections and choreography timings...",
  },
  "Dance Performance": {
    tone: "performance",
    eyebrow: "PERFORMANCE TRACK BRIEF",
    title: "Build a track that follows every count.",
    hint: "Designed for choreography, school/college functions, stage acts and rehearsal-led edits.",
    proof: ["Counts", "Cue points", "Clean ending"],
    need: "Performance Track",
    notesPlaceholder:
      "Share choreography cues, counts, rehearsal video notes, transitions and where the track should end...",
  },
  "Background Music": {
    tone: "background",
    eyebrow: "BACKGROUND SCORE BRIEF",
    title: "Give the scene its own sound.",
    hint: "For films, launches, ads, YouTube videos and brand stories needing original background music.",
    proof: ["Video cut", "Mood arc", "Usage"],
    need: "Background Score",
    notesPlaceholder:
      "Tell us about the story, key moments, mood changes, voiceover space and where the music will be used...",
  },
  "Short Film": {
    tone: "film",
    eyebrow: "SHORT FILM SCORE BRIEF",
    title: "Score the emotion scene by scene.",
    hint: "Built around picture, dialogue, tension, silence and the emotional rhythm of your story.",
    proof: ["Scene notes", "Picture lock", "Emotional beats"],
    need: "Background Score",
    notesPlaceholder:
      "Describe scenes, characters, emotional beats, dialogue-heavy sections and reference scores...",
  },
  Advertisement: {
    tone: "ad",
    eyebrow: "ADVERTISEMENT MUSIC BRIEF",
    title: "Make the message sound memorable.",
    hint: "For promos, reels, campaigns, product videos and voiceover-led advertisements.",
    proof: ["Brand cue", "Hook", "Cut-downs"],
    need: "Background Score",
    notesPlaceholder:
      "Share the product, campaign goal, voiceover details, brand tone and any cut-down versions needed...",
  },
  "Project Launch": {
    tone: "launch",
    eyebrow: "LAUNCH MUSIC BRIEF",
    title: "Build anticipation before the reveal.",
    hint: "For business launches, product reveals, presentations and high-impact opening videos.",
    proof: ["Reveal cue", "Build-up", "Venue/platform"],
    need: "Background Score",
    notesPlaceholder:
      "Mention the reveal moment, brand tone, presentation flow, target audience and final playback platform...",
  },
  YouTube: {
    tone: "youtube",
    eyebrow: "YOUTUBE MUSIC BRIEF",
    title: "Support the content without covering the voice.",
    hint: "For intros, storytelling, explainers, educational videos and recurring channel themes.",
    proof: ["Channel style", "Voice space", "Loop points"],
    need: "Background Score",
    notesPlaceholder:
      "Share the video topic, channel feel, sections that need music and whether narration needs space...",
  },
  "Custom Audio": {
    tone: "custom",
    eyebrow: "CUSTOM AUDIO BRIEF",
    title: "Start with the idea. We will shape the sound.",
    hint: "For original tracks, unique concepts, brand audio and audio that does not fit a standard box.",
    proof: ["Concept", "References", "Delivery"],
    need: "Custom Production",
    notesPlaceholder:
      "Describe the concept, audience, where it will be used, references and the final format you need...",
  },
  "Costume Design": {
    tone: "costume",
    eyebrow: "COSTUME DESIGN BRIEF",
    title: "Shape a look around the person and moment.",
    hint: "For performances, videos, events and creative styling with visual references.",
    proof: ["Occasion", "Measurements", "Style direction"],
    need: "Costume Design",
    notesPlaceholder:
      "Describe the occasion, performers, movement needs, colors, visual references, budget and event date...",
  },
};

// One form serves both the contact page and the project dialog.
export default function ProjectBriefModal({
  isOpen = false,
  onClose,
  onSubmitted,
  inline = false,
  initialType = "Music Editing",
  initialNeed = "",
}) {
  const dialog = useRef(null);
  const form = useRef(null);
  const redirectTimer = useRef(null);
  const navigate = useNavigate();
  const headingId = useId();
  const [type, setType] = useState(
    projectTypes.includes(initialType) ? initialType : "Music Editing",
  );
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const profile = briefProfiles[type] || briefProfiles["Music Editing"];
  const background = [
    "Background Music",
    "Short Film",
    "Advertisement",
    "Project Launch",
    "YouTube",
  ].includes(type);
  const costumeDesign = type === "Costume Design";
  const defaultNeed =
    requirements.includes(initialNeed) && type === initialType
      ? initialNeed
      : costumeDesign
        ? "Costume Design"
        : profile.need;
  useEffect(() => {
    if (inline || !isOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const currentDialog = dialog.current;
    currentDialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      currentDialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, inline]);

  useEffect(
    () => () => window.clearTimeout(redirectTimer.current),
    [],
  );

  function readBrief() {
    const data = new FormData(form.current);
    const file = data.get("referenceFile");
    data.delete("referenceFile");
    return { fields: Object.fromEntries(data), file: file?.size ? file : null };
  }

  function validateBrief(fields, file) {
    const nextErrors = {};
    const phoneDigits = String(fields.phone || "").replace(/\D/g, "");

    if (!String(fields.name || "").trim())
      nextErrors.name = "Please enter your name.";
    if (phoneDigits.length < 10)
      nextErrors.phone = "Enter a valid WhatsApp number with at least 10 digits.";
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      nextErrors.email = "Enter a valid email address.";
    if (fields.referenceLink && !/^https?:\/\/.+/i.test(fields.referenceLink))
      nextErrors.referenceLink = "Paste a full link starting with http:// or https://.";
    if (!String(fields.notes || "").trim())
      nextErrors.notes = "Tell us a little about your project.";
    if (file && file.size > 10 * 1024 * 1024)
      nextErrors.referenceFile = "Maximum file size is 10 MB. Use a Drive link for larger files.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submitBrief(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus(null);
    window.clearTimeout(redirectTimer.current);
    toast.loading("Sending your project requirement…", { id: "project-brief" });
    try {
      const { fields, file } = readBrief();
      if (!validateBrief(fields, file)) {
        setBusy(false);
        setStatus({
          success: false,
          text: "Please fix the highlighted fields before submitting.",
        });
        toast.error("Please fix the highlighted fields before submitting.", {
          id: "project-brief",
        });
        return;
      }
      let referenceFile = null;
      if (file) {
        if (file.size > 10 * 1024 * 1024)
          throw new Error(
            "Please upload a file up to 10 MB, or share a reference link.",
          );
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = () =>
            reject(
              new Error("The file could not be read. Please select it again."),
            );
          reader.readAsDataURL(file);
        });
        referenceFile = { name: file.name, type: file.type, base64 };
      }
      if (!hasApiBackend()) {
        throw new Error(
          "Online form is not connected on this deployment. Please continue on WhatsApp with your details.",
        );
      }
      const response = await fetch(apiUrl("/api/briefs"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, referenceFile }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          result.error ||
            "Submission is unavailable right now. Your details are still here; continue on WhatsApp or try again.",
        );
      setStatus({
        success: true,
        text: `Your requirement has been sent to us on WhatsApp and email. Reference: ${result.reference}.`,
      });
      toast.custom(
        (toastState) => (
          <section
            className="booking-toast"
            data-visible={toastState.visible}
            role="status"
            aria-live="polite"
          >
            <span className="booking-toast-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m6.5 12.5 3.7 3.7 7.8-8" />
              </svg>
            </span>
            <div className="booking-toast-copy">
              <p className="booking-toast-eyebrow">
                {fields.projectType || type} booking enquiry
              </p>
              <h2>Your project is in motion.</h2>
              <p className="booking-toast-description">
                Thanks, {String(fields.name || "there").trim()}. Our studio team
                will review your brief and contact you about next steps.
              </p>
              {result.reference && (
                <p className="booking-toast-reference">
                  Request reference <strong>{result.reference}</strong>
                </p>
              )}
              <p className="booking-toast-redirect">
                Returning to the home page in 3 seconds
              </p>
            </div>
            <span className="booking-toast-timer" aria-hidden="true" />
          </section>
        ),
        { id: "project-brief", duration: 3000 },
      );
      if (onSubmitted) {
        onSubmitted();
      } else {
        redirectTimer.current = window.setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      const message =
        error.message === "Failed to fetch"
          ? "Could not connect. Please try again or continue on WhatsApp with your details."
          : error.message;
      setStatus({
        success: false,
        text: message,
      });
      toast.error(message, { id: "project-brief" });
    } finally {
      setBusy(false);
    }
  }

  function continueOnWhatsApp() {
    const { fields, file } = readBrief();
    if (!validateBrief(fields, file)) {
      setStatus({
        success: false,
        text: "Please fix the highlighted fields before opening WhatsApp.",
      });
      toast.error("Please fix the highlighted fields before opening WhatsApp.");
      return;
    }
    const labels = {
      name: "Name",
      phone: "WhatsApp",
      email: "Email",
      projectType: "Project",
      requirement: "Requirement",
      referenceLink: "Reference link",
      notes: "Project details",
    };
    const message = [
      "Hello MR MUSIC MACK, here is my project brief:",
      ...Object.entries(fields)
        .filter(([, value]) => value)
        .map(([key, value]) => `${labels[key] || key}: ${value}`),
      ...(file
        ? [`Reference file: ${file.name} (I will attach this in WhatsApp).`]
        : []),
    ].join("\n");
    window.open(
      `https://wa.me/919887563201?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus({
      success: true,
      text: file
        ? "WhatsApp opened with your brief. Attach your selected file there and press Send to share it."
        : "WhatsApp opened with your brief. Press Send there to share your requirement.",
    });
    toast("WhatsApp draft opened. Press Send there to submit your requirement.", {
      icon: "↗",
    });
  }

  const briefForm = (
    <form
      ref={form}
      className={`brief-form service-brief service-brief-${profile.tone}`}
      onSubmit={submitBrief}
      noValidate
    >
      <div className="brief-form-hero">
        <div>
          <p className="brief-kicker">{profile.eyebrow}</p>
          <h3 className="form-heading" id={headingId}>
            {profile.title}
          </h3>
          <p className="form-hint">{profile.hint}</p>
        </div>
        <div className="brief-meter" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} style={{ height: `${28 + ((index * 19) % 62)}%` }} />
          ))}
        </div>
      </div>
      <div className="brief-proof-row" aria-label="Brief highlights">
        {profile.proof.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <p className="form-hint">
        Share a little about your project. Fields marked * are required.
      </p>
      <div className="form-grid">
        <label data-error={errors.name ? "true" : undefined}>
          Your name *
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            maxLength={100}
            aria-invalid={errors.name ? "true" : undefined}
          />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>
        <label data-error={errors.phone ? "true" : undefined}>
          WhatsApp number *
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98875 63201"
            pattern={"[+0-9\\s\\(\\)\\-]{10,20}"}
            title="Enter a phone number with 10 to 20 characters."
            onChange={(event) =>
              event.target.setCustomValidity(
                event.target.value.replace(/\D/g, "").length < 10
                  ? "Please enter at least 10 digits."
                  : "",
              )
            }
            required
            maxLength={20}
            aria-invalid={errors.phone ? "true" : undefined}
          />
          {errors.phone && <small className="field-error">{errors.phone}</small>}
        </label>
        <label data-error={errors.email ? "true" : undefined}>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={200}
            aria-invalid={errors.email ? "true" : undefined}
          />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
        <label className="service-select">
          Project type *
          <select
            name="projectType"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {projectTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="service-select">
          What do you need? *
          <select name="requirement" key={type} defaultValue={defaultNeed}>
            {requirements.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="full" data-error={errors.referenceFile ? "true" : undefined}>
          Upload {costumeDesign ? "visual" : "audio / video"} reference
          <input
            name="referenceFile"
            type="file"
            accept={costumeDesign ? ".jpg,.jpeg,.png,.webp,.pdf" : ".mp3,.wav,.m4a,.ogg,.mp4,.mov,.webm"}
            onChange={(event) => {
              const file = event.target.files[0];
              const tooLarge = file && file.size > 10 * 1024 * 1024;
              event.target.setCustomValidity(
                tooLarge
                  ? "Maximum file size is 10 MB. Use a reference link for larger files."
                  : "",
              );
              setFileName(file?.name || "");
            }}
          />
          <small>
            {fileName ||
              (costumeDesign
                ? "JPG, PNG, WebP or PDF. Maximum 10 MB. Use a Drive link for larger files."
                : "MP3, WAV, M4A, OGG, MP4, MOV or WebM. Maximum 10 MB. Use a Drive link for larger files.")}
          </small>
          {errors.referenceFile && <small className="field-error">{errors.referenceFile}</small>}
        </label>
        <label className="full" data-error={errors.referenceLink ? "true" : undefined}>
          Google Drive / YouTube reference link
          <input
            name="referenceLink"
            type="url"
            placeholder="https://..."
            maxLength={2000}
            aria-invalid={errors.referenceLink ? "true" : undefined}
          />
          {errors.referenceLink && <small className="field-error">{errors.referenceLink}</small>}
        </label>
        <label className="full" data-error={errors.notes ? "true" : undefined}>
          Tell us about your project *
          <textarea
            name="notes"
            required
            rows="4"
            maxLength={4000}
            placeholder={
              costumeDesign
                ? profile.notesPlaceholder
                : background
                ? profile.notesPlaceholder
                : profile.notesPlaceholder
            }
            aria-invalid={errors.notes ? "true" : undefined}
          />
          {errors.notes && <small className="field-error">{errors.notes}</small>}
        </label>
      </div>
      <div className="form-actions">
        <button className="button primary" type="submit" disabled={busy}>
          {busy ? "Saving your requirement…" : "Submit project requirement ↗"}
        </button>
        <button
          className="button secondary"
          type="button"
          onClick={continueOnWhatsApp}
        >
          <WhatsAppIcon size={17} /> Continue on WhatsApp
        </button>
      </div>
      <p className="form-hint" style={{ margin: "15px 0 0" }}>
        Your details are used to discuss your project. WhatsApp opens a draft;
        uploaded files must be attached separately there.
      </p>
      {status && (
        <p
          className={`form-status ${status.success ? "" : "error"}`}
          role={status.success ? "status" : "alert"}
        >
          {status.text}
        </p>
      )}
    </form>
  );

  if (inline) return briefForm;
  return (
    <dialog
      ref={dialog}
      className="brief-dialog"
      aria-labelledby={headingId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-top">
        <p className="eyebrow">YOUR NEXT IDEA STARTS HERE</p>
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label="Close project brief"
        >
          ✕
        </button>
      </div>
      {briefForm}
    </dialog>
  );
}
