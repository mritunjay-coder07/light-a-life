import { Fragment, useEffect, useRef } from "react";
import "./SetuPage.css";

/* ==================================================
   EDIT THIS SECTION: all your content lives here
================================================== */

// Background video of the hero.
const BACKGROUND_VIDEO = "/videos/setu-bg.mp4";

// true  = placeholder photos with fixed URLs (needs internet)
// false = your own photos from /public/images/events/<event>/1.jpg ... 20.jpg
const USE_PLACEHOLDER_PHOTOS = true;

// Every event uses exactly this many photos (8 are visible at a time)
const PHOTO_COUNT = 20;

// Heading shown above the video of every event
const MEMORIES_TITLE = "Memories of Giving";

const ABOUT_TEXT =
  "SETU is the social club of Newton School of Technology, a helping club built by students who believe one small act of care can light up a life. “Setu” means bridge, and that is what we try to be: a bridge between people who can give and people who need.";

const AIM_TEXT =
  "To turn student energy into lasting social impact: spreading joy, supporting vulnerable communities and making every festival a chance to light someone else’s life.";

/*
  Real photos: You can now change any photo URL directly in the `photos`
  array of each event below. You can paste any online image URL or a local
  file path like "/images/events/iit-delhi/1.jpg".
*/
const EVENTS = [
  {
    id: "iit-delhi",
    kicker: "Event 01",
    title: "SETU x IIT Delhi",
    heading: "Two campuses, one purpose",
    folder: "/images/events/iit-delhi",
    firstPhotoId: 10,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    impact: [
      "SETU teamed up with IIT Delhi to carry the spirit of giving beyond our own campus.",
      "Students from both communities volunteered side by side, sharing time, ideas and effort.",
      "The focus was on joy, dignity and real connection, not just on donations.",
      "Every activity was planned so that the people we met felt seen, welcomed and celebrated.",
      "It showed how two student communities can build a bridge for good.",
    ],
    // Change any of these 20 fixed photo URLs manually:
    photos: [
      "https://picsum.photos/id/10/360/440",
      "https://picsum.photos/id/11/360/440",
      "https://picsum.photos/id/12/360/440",
      "https://picsum.photos/id/13/360/440",
      "https://picsum.photos/id/14/360/440",
      "https://picsum.photos/id/15/360/440",
      "https://picsum.photos/id/16/360/440",
      "https://picsum.photos/id/17/360/440",
      "https://picsum.photos/id/18/360/440",
      "https://picsum.photos/id/19/360/440",
      "https://picsum.photos/id/20/360/440",
      "https://picsum.photos/id/21/360/440",
      "https://picsum.photos/id/22/360/440",
      "https://picsum.photos/id/23/360/440",
      "https://picsum.photos/id/24/360/440",
      "https://picsum.photos/id/25/360/440",
      "https://picsum.photos/id/26/360/440",
      "https://picsum.photos/id/27/360/440",
      "https://picsum.photos/id/28/360/440",
      "https://picsum.photos/id/29/360/440",
    ],
  },
  {
    id: "club",
    kicker: "Event 02",
    title: "SETU x GHAR",
    heading: "Stronger when we serve together",
    folder: "/images/events/club",
    firstPhotoId: 30,
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    impact: [
      "SETU joined forces with a partner club to turn a shared idea into a day of service.",
      "Volunteers from both teams planned, packed and delivered everything themselves.",
      "The event brought students together around a cause bigger than any one club.",
      "Simple, thoughtful gestures made the biggest difference to the people we met.",
      "It proved that collaboration multiplies the good a student club can do.",
    ],
    // Change any of these 20 fixed photo URLs manually:
    photos: [
      "https://picsum.photos/id/30/360/440",
      "https://picsum.photos/id/31/360/440",
      "https://picsum.photos/id/32/360/440",
      "https://picsum.photos/id/33/360/440",
      "https://picsum.photos/id/34/360/440",
      "https://picsum.photos/id/35/360/440",
      "https://picsum.photos/id/36/360/440",
      "https://picsum.photos/id/37/360/440",
      "https://picsum.photos/id/38/360/440",
      "https://picsum.photos/id/39/360/440",
      "https://picsum.photos/id/40/360/440",
      "https://picsum.photos/id/41/360/440",
      "https://picsum.photos/id/42/360/440",
      "https://picsum.photos/id/43/360/440",
      "https://picsum.photos/id/44/360/440",
      "https://picsum.photos/id/45/360/440",
      "https://picsum.photos/id/46/360/440",
      "https://picsum.photos/id/47/360/440",
      "https://picsum.photos/id/48/360/440",
      "https://picsum.photos/id/49/360/440",
    ],
  },
  {
    id: "asiscc",
    kicker: "Event 03",
    title: "SETU x AIESEC",
    heading: "One bridge, many hands",
    folder: "/images/events/asiscc",
    firstPhotoId: 50,
    video: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    impact: [
      "SETU partnered with ASISCC to bring more hands and more heart to a common cause.",
      "Both teams worked together on the ground, from planning to the final celebration.",
      "The day was built around giving with care, transparency and respect.",
      "Smiles, stories and shared moments mattered as much as the gifts themselves.",
      "It added another strong link to the chain of people who want to light lives.",
    ],
    // Change any of these 20 fixed photo URLs manually:
    photos: [
      "https://picsum.photos/id/50/360/440",
      "https://picsum.photos/id/51/360/440",
      "https://picsum.photos/id/52/360/440",
      "https://picsum.photos/id/53/360/440",
      "https://picsum.photos/id/54/360/440",
      "https://picsum.photos/id/55/360/440",
      "https://picsum.photos/id/56/360/440",
      "https://picsum.photos/id/57/360/440",
      "https://picsum.photos/id/58/360/440",
      "https://picsum.photos/id/59/360/440",
      "https://picsum.photos/id/60/360/440",
      "https://picsum.photos/id/61/360/440",
      "https://picsum.photos/id/62/360/440",
      "https://picsum.photos/id/63/360/440",
      "https://picsum.photos/id/64/360/440",
      "https://picsum.photos/id/65/360/440",
      "https://picsum.photos/id/66/360/440",
      "https://picsum.photos/id/67/360/440",
      "https://picsum.photos/id/68/360/440",
      "https://picsum.photos/id/69/360/440",
    ],
  },
];

// Team photos: /public/images/team/<file>
const LEADERS = [
  { role: "President", name: "President Name", file: "president.jpg" },
  { role: "Vice President", name: "Vice President Name", file: "vice-president.jpg" },
];

const CORE_MEMBERS = [
  { role: "Core Member", name: "Member Name 1", file: "core-1.jpg" },
  { role: "Core Member", name: "Member Name 2", file: "core-2.jpg" },
  { role: "Core Member", name: "Member Name 3", file: "core-3.jpg" },
  { role: "Core Member", name: "Member Name 4", file: "core-4.jpg" },
  { role: "Core Member", name: "Member Name 5", file: "core-5.jpg" },
  { role: "Core Member", name: "Member Name 6", file: "core-6.jpg" },
  { role: "Core Member", name: "Member Name 7", file: "core-7.jpg" }
];

/* ==================================================
   Helpers
================================================== */

// Photo URLs per event. Uses the event's photos array if specified, allowing easy manual edits.
const eventPhotos = (event) =>
  event.photos && event.photos.length > 0
    ? event.photos
    : Array.from({ length: PHOTO_COUNT }, (_, i) =>
        USE_PLACEHOLDER_PHOTOS
          ? `https://picsum.photos/id/${(event.firstPhotoId || 10) + i}/360/440`
          : `${event.folder}/${i + 1}.jpg`
      );

const memberPhoto = (member) =>
  USE_PLACEHOLDER_PHOTOS
    ? `https://picsum.photos/seed/${member.file}/400/400`
    : `/images/team/${member.file}`;

const embers = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: `${3 + ((i * 7) % 6)}px`,
  duration: `${6 + ((i * 3) % 8)}s`,
  delay: `${-((i * 2) % 12)}s`,
  drift: `${((i * 17) % 80) - 40}px`,
}));

// Fades sections in as you scroll to them
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".sp-reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ==================================================
   Small components
================================================== */

function Divider() {
  return (
    <div className="sp-divider" aria-hidden="true">
      <span />
      <b>🪔</b>
      <span />
    </div>
  );
}

// Glowing line between two events
function EventDivider() {
  return (
    <div className="sp-event-divider" aria-hidden="true">
      <span />
      <b>🪔</b>
      <span />
    </div>
  );
}

// Sliding row of photos (8 visible on desktop, loops forever)
function PhotoStrip({ photos, reverse = false }) {
  const loop = [...photos, ...photos];

  return (
    <div className="sp-strip">
      <div
        className="sp-strip-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((src, index) => (
          <div
            className="sp-photo"
            key={`${src}-${index}`}
            aria-hidden={index >= photos.length}
          >
            <img src={src} alt="" loading="lazy" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EventBlock({ event, reverse }) {
  const photos = eventPhotos(event);

  return (
    <article className="sp-event">
      <header className="sp-event-head sp-reveal">
        <p className="sp-event-kicker">
          <span aria-hidden="true" />
          {event.kicker}
          <span aria-hidden="true" />
        </p>
        <h3 className="sp-event-title">{event.title}</h3>
      </header>

      {/* One single frame: photos + Memories of Giving + video + points */}
      <div className="sp-frame sp-reveal">
        <div className="sp-frame-band">
          <PhotoStrip photos={photos} reverse={reverse} />
        </div>

        <div className="sp-frame-body">
          <header className="sp-memories-head">
            <span className="sp-memories-orn" aria-hidden="true">
              🪔
            </span>

            <div className="sp-memories-heading-wrap">
              <h4 className="sp-memories-title">{MEMORIES_TITLE}</h4>
              <span className="sp-underline" aria-hidden="true" />
            </div>

            <span className="sp-memories-orn" aria-hidden="true">
              🪔
            </span>
          </header>

          <div className="sp-memories-body">
            <div className="sp-video-frame">
              <video
                controls
                playsInline
                preload="metadata"
                poster={photos[0]}
                src={event.video}
              />
            </div>

            <div className="sp-memories-info">
              <h5 className="sp-memories-heading">{event.heading}</h5>

              <ul className="sp-points">
                {event.impact.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Member({ member, large = false }) {
  return (
    <div className={`sp-member ${large ? "sp-member-large" : ""} sp-reveal`}>
      <div className="sp-avatar">
        <img src={memberPhoto(member)} alt={member.name} loading="lazy" />
      </div>
      <p className="sp-member-role">{member.role}</p>
      <h4 className="sp-member-name">{member.name}</h4>
    </div>
  );
}

/* ==================================================
   Page
================================================== */

export default function SetuPage() {
  const aboutRef = useRef(null);
  useReveal();

  return (
    <div className="sp-page">
      {/* Diwali atmosphere */}
      <div className="sp-pillar sp-pillar-left" aria-hidden="true" />
      <div className="sp-pillar sp-pillar-right" aria-hidden="true" />

      <div className="sp-embers" aria-hidden="true">
        {embers.map((ember) => (
          <span
            key={ember.id}
            className="sp-ember"
            style={{
              "--left": ember.left,
              "--top": ember.top,
              "--size": ember.size,
              "--duration": ember.duration,
              "--delay": ember.delay,
              "--drift": ember.drift,
            }}
          />
        ))}
      </div>

      {/* HERO: background video */}
      <section className="sp-hero">
        <video
          className="sp-hero-video"
          src={BACKGROUND_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="sp-hero-overlay" aria-hidden="true" />

        <nav className="sp-topbar">
          <img
            className="sp-logo sp-logo-left"
            src="/images/newton-school-logo.png"
            alt="Newton School of Technology"
            draggable="false"
          />

          <a className="sp-back" href="#/">
            <span className="sp-back-line">← Back to the Diya</span>
            </a>

          <img
            className="sp-logo sp-logo-right"
            src="/images/setu-logo.png"
            alt="SETU Club"
            draggable="false"
          />
        </nav>

        <div className="sp-hero-content">
          <p className="sp-hero-kicker">
            Social Empowerment &amp; Transformation Union
          </p>
          <h1 className="sp-hero-title">SETU</h1>
          <p className="sp-hero-sub">Bridging hearts. Lighting lives.</p>
        </div>

        <button
          type="button"
          className="sp-scroll-cue"
          onClick={() =>
            aboutRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll down"
        >
          <span>Scroll</span>
          <i aria-hidden="true">↓</i>
        </button>
      </section>

      {/* ABOUT */}
      <section className="sp-section sp-about" ref={aboutRef}>
        <div className="sp-card sp-reveal">
          <h2 className="sp-title">What is SETU?</h2>
          <Divider />
          <p className="sp-text">{ABOUT_TEXT}</p>
        </div>

        <div className="sp-card sp-reveal">
          <h2 className="sp-title">What is our aim?</h2>
          <Divider />
          <p className="sp-text">{AIM_TEXT}</p>
        </div>
      </section>

      {/* EVENTS */}
      <section className="sp-section sp-events">
        <header className="sp-section-head sp-reveal">
          <p className="sp-kicker">Moments of light</p>
          <h2 className="sp-title">Our Events</h2>
          <Divider />
        </header>

        {EVENTS.map((event, index) => (
          <Fragment key={event.id}>
            {index > 0 && <EventDivider />}
            <EventBlock event={event} reverse={index % 2 === 1} />
          </Fragment>
        ))}
      </section>

      {/* TEAM */}
      <section className="sp-section sp-team">
        <header className="sp-section-head sp-reveal">
          <p className="sp-kicker">The people behind the light</p>
          <h2 className="sp-title">Our Members</h2>
          <Divider />
        </header>

        <div className="sp-leaders">
          {LEADERS.map((member) => (
            <Member key={member.role} member={member} large />
          ))}
        </div>

        <div className="sp-core">
          {CORE_MEMBERS.map((member) => (
            <Member key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sp-footer">
        <p className="sp-kicker">Made with light &amp; purpose</p>
        <a className="sp-back sp-back-footer" href="#/">
          ← Back to the Diya
        </a>
      </footer>
    </div>
  );

  
}

