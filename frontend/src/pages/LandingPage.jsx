import { useState } from "react";
import Diya3D from "../components/Diya3D";

// Replace these with your real links
const DONATE_URL = "#";
const SETU_URL = "#/setu";

const embers = Array.from({ length: 75 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: `${3 + ((i * 7) % 7)}px`,
  duration: `${5 + ((i * 3) % 9)}s`,
  delay: `${-((i * 2) % 12)}s`,
  drift: `${((i * 17) % 100) - 50}px`,
  opacity: 0.45 + ((i * 13) % 50) / 100,
}));

const sparks = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 61 + 19) % 100}%`,
  top: `${(i * 29 + 13) % 100}%`,
  size: `${2 + ((i * 5) % 3)}px`,
  duration: `${4 + ((i * 7) % 8)}s`,
  delay: `${-((i * 3) % 10)}s`,
}));

const isExternal = (url) => url.startsWith("http");

export default function LandingPage() {
  // The page starts dark. The visitor lights the Diya by clicking it.
  const [isLit, setIsLit] = useState(false);

  const handleDiyaClick = () => {
    setIsLit(true);
  };

  return (
    <main className={`diya-page ${isLit ? "is-lit" : ""}`}>
      {/* Background atmosphere */}
      <div className="warm-atmosphere" aria-hidden="true" />
      <div className="light-rays" aria-hidden="true" />

      {/* Floating glowing embers */}
      <div className="floating-embers" aria-hidden="true">
        {embers.map((ember) => (
          <span
            className="ambient-ember"
            key={ember.id}
            style={{
              "--left": ember.left,
              "--top": ember.top,
              "--size": ember.size,
              "--duration": ember.duration,
              "--delay": ember.delay,
              "--drift": ember.drift,
              "--ember-opacity": ember.opacity,
            }}
          />
        ))}
      </div>

      {/* Fine sparks */}
      <div className="floating-sparks" aria-hidden="true">
        {sparks.map((spark) => (
          <span
            className="ambient-spark"
            key={spark.id}
            style={{
              "--left": spark.left,
              "--top": spark.top,
              "--size": spark.size,
              "--duration": spark.duration,
              "--delay": spark.delay,
            }}
          />
        ))}
      </div>

      {/* Central Diya glow */}
      <div className="main-diya-glow" aria-hidden="true" />

      {/* Decorative festive side pillars */}
      <div className="festive-side-bars" aria-hidden="true">
        <div className="festive-side-bar festive-side-bar-left">
          <span className="side-bar-core" />
          <span className="side-bar-highlight" />
          <span className="side-bar-ornament side-bar-ornament-top" />
          <span className="side-bar-ornament side-bar-ornament-bottom" />
        </div>

        <div className="festive-side-bar festive-side-bar-right">
          <span className="side-bar-core" />
          <span className="side-bar-highlight" />
          <span className="side-bar-ornament side-bar-ornament-top" />
          <span className="side-bar-ornament side-bar-ornament-bottom" />
        </div>
      </div>

      {/* Top corner logos (appear when the Diya is lit) */}
      <header className="corner-logo-header">
        <div className="corner-logo corner-logo-left">
          <img
            src="/images/newton-school-logo.png"
            alt="Newton School of Technology"
            draggable="false"
          />
        </div>

        <div className="corner-logo corner-logo-right">
          <img
            src="/images/setu-logo.png"
            alt="SETU Club"
            draggable="false"
          />
        </div>
      </header>

      {/* Intro hint: the only thing visible before the Diya is lit */}
      <div className="click-hint" aria-hidden={isLit}>
        <h1 className="click-hint-text">Click the Diya to light it</h1>
      </div>

      {/* Campaign heading + description (above the Diya) */}
      <div className="campaign-top">
        <h1 className="campaign-title">Light a Life This Diwali</h1>

        <p className="campaign-description">
          This Diwali, Newton School of Technology with college’s SETU Club is
          leading Project SEVA, a social initiative to support the Sant Ishwar
          Foundation – GHAR, a home for orphaned and vulnerable girls, women
          with disabilities, and elderly individuals.
        </p>
      </div>

      {/* Main interactive 3D Diya */}
      <section className="diya-canvas" aria-label="Interactive 3D Diya">
        <Diya3D isLit={isLit} onDiyaClick={handleDiyaClick} />
      </section>

      {/* Call to action (below the Diya) */}
      <div className="campaign-bottom">
        <p className="campaign-join">Join us in spreading joy</p>

        <a
          className="donate-button"
          href={DONATE_URL}
          target={isExternal(DONATE_URL) ? "_blank" : undefined}
          rel={isExternal(DONATE_URL) ? "noopener noreferrer" : undefined}
        >
          Donate Now
        </a>

        <a
          className="setu-button"
          href={SETU_URL}
          target={isExternal(SETU_URL) ? "_blank" : undefined}
          rel={isExternal(SETU_URL) ? "noopener noreferrer" : undefined}
        >
          Know about SETU
        </a>
      </div>

      {/* Soft edge vignette */}
      <div className="screen-vignette" aria-hidden="true" />
    </main>
  );
}