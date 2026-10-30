import { useState, useEffect, useRef } from "react";
import Diya3D from "../components/Diya3D";
import Footer from "../components/Footer";
import PolicyModal, { POLICY_TABS } from "../components/PolicyModal";
import { ChevronDown } from "lucide-react";

// Campaign links
const DONATE_URL = "https://smartpay.easebuzz.in/114196/setu_club";
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

// Animated number counter component for impact stats
function AnimatedCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const steps = 40;
    const stepTime = Math.max(Math.floor(duration / steps), 20);
    const stepIncrement = target / steps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

export default function LandingPage() {
  // Page starts dark. Lighting the Diya activates the atmosphere & content
  const [isLit, setIsLit] = useState(false);

  // Policy modal state for Razorpay compliance
  const [activePolicy, setActivePolicy] = useState(null);

  const containerRef = useRef(null);

  const handleDiyaClick = () => {
    setIsLit(true);
  };

  const handleScrollToWhy = (e) => {
    if (e) e.preventDefault();
    const whySection = document.getElementById("why-this-matters");
    if (whySection) {
      whySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Check URL hash on mount and hashchange for policy navigation (e.g. #/privacy or #privacy)
  useEffect(() => {
    const checkHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase();
      const valid = POLICY_TABS.map((t) => t.id);
      if (valid.includes(raw)) {
        setActivePolicy(raw);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const handleOpenPolicy = (policyId) => {
    setActivePolicy(policyId);
    window.history.pushState(null, "", `#${policyId}`);
  };

  const handleClosePolicy = () => {
    setActivePolicy(null);
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <div
      ref={containerRef}
      className={`diya-page ${isLit ? "is-lit" : ""}`}
      id="landing-scroll-root"
    >
      {/* Background atmosphere (fixed across all sections) */}
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

      {/* Decorative festive side pillars (fixed along left and right edges) */}
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

      {/* ==================================================
          HERO SECTION (3D Interactive Diya)
      ================================================== */}
      <section className="diya-hero-section" id="hero">
        {/* Central Diya glow */}
        <div className="main-diya-glow" aria-hidden="true" />

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

        {/* Intro hint: visible before the Diya is lit */}
        <div className="click-hint" aria-hidden={isLit}>
          <h1 className="click-hint-text">Click the Diya to light it</h1>
        </div>

        {/* Campaign heading + description (above the Diya) */}
        <div className="campaign-top">
          <h1 className="campaign-title">Light a Life This Diwali</h1>

          <p className="campaign-description">
            This Diwali, Newton School of Technology with college&apos;s SETU Club is
            leading Project SEVA, a social initiative to support Jayatu
            Foundation Pune, a home for orphaned and vulnerable girls, women
            with disabilities, and elderly individuals.
          </p>
        </div>

        {/* Main interactive 3D Diya */}
        <div className="diya-canvas" aria-label="Interactive 3D Diya">
          <Diya3D isLit={isLit} onDiyaClick={handleDiyaClick} />
        </div>

        {/* Call to action (below the Diya) */}
        <div className="campaign-bottom">
          <p className="campaign-join">Join us in spreading joy</p>

          <div className="campaign-buttons-group">
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

          {/* Scroll button below "Know about SETU" */}
          <button
            type="button"
            className="hero-scroll-btn"
            onClick={handleScrollToWhy}
            aria-label="Scroll down to explore"
          >
            <span className="scroll-btn-label">Scroll to Explore</span>
            <ChevronDown size={18} className="scroll-chevron-icon" />
          </button>
        </div>

        {/* Soft edge vignette */}
        <div className="screen-vignette" aria-hidden="true" />
      </section>

      {/* ==================================================
          CAMPAIGN HIGHLIGHTS: WHY THIS MATTERS + OUR IMPACT
          (Single continuous video background across both blocks)
      ================================================== */}
      <div className={`landing-campaign-wrapper ${isLit ? "is-visible" : ""}`}>
        {/* Single continuous background video spanning both blocks */}
        <div className="campaign-video-bg" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="campaign-bg-video"
          >
            <source src="/videos/setu-bg.mp4" type="video/mp4" />
          </video>
          <div className="campaign-video-overlay" />
        </div>

        {/* ==================================================
            SECTION 1: WHY THIS MATTERS
        ================================================== */}
        <section
          className="landing-plan-section why-cause-section"
          id="why-this-matters"
          aria-label="Why This Matters"
        >
          <div className="plan-section-container">
            <div className="plan-header">
              <h2 className="plan-section-title">Why This Matters</h2>
              <div className="plan-title-underline" aria-hidden="true" />
            </div>

            <p className="plan-lead-description">
              Diwali is the festival of sharing, where every small contribution can light up someone&apos;s
              life. This year, let&apos;s come together to spread the warmth of celebration to those who
              need it most.
            </p>

            <div className="why-mission-layout">
              {/* Glowing Diya Left */}
              <div className="diya-decoration left-diya" aria-hidden="true">
                <div className="diya-body" />
                <div className="diya-flame" />
              </div>

              {/* Mission Statement Box */}
              <div className="mission-statement-card">
                <h3 className="mission-statement-title">Our Mission</h3>
                <p className="mission-statement-quote">
                  &ldquo;We aim to bring sweets, smiles, and hope to underprivileged children this festive season.&rdquo;
                </p>
              </div>

              {/* Glowing Diya Right */}
              <div className="diya-decoration right-diya" aria-hidden="true">
                <div className="diya-body" />
                <div className="diya-flame" />
              </div>
            </div>
          </div>
        </section>

        {/* Decorative divider between the two sections */}
        <div className="campaign-section-divider" aria-hidden="true" />

        {/* ==================================================
            SECTION 2: OUR IMPACT LAST YEAR
        ================================================== */}
        <section
          className="landing-plan-section impact-summary-section"
          id="our-impact"
          aria-label="Our Impact Last Year"
        >
          <div className="plan-section-container">
            <div className="plan-header">
              <h2 className="plan-section-title">Our Impact Last Year</h2>
              <div className="plan-title-underline" aria-hidden="true" />
            </div>

            {/* 3 Impact Numbers */}
            <div className="impact-stats-grid">
              <div className="stat-item-card">
                <div className="stat-number-val">
                  <AnimatedCounter target={250} />
                </div>
                <div className="stat-label-text">Families Helped</div>
              </div>

              <div className="stat-item-card">
                <div className="stat-number-val">
                  <AnimatedCounter target={45} />
                </div>
                <div className="stat-label-text">Volunteers Joined</div>
              </div>

              <div className="stat-item-card">
                <div className="stat-number-val">
                  <AnimatedCounter target={1200} />
                </div>
                <div className="stat-label-text">Meals Served</div>
              </div>
            </div>

            {/* Testimonial Quote Cards */}
            <div className="impact-testimonials-grid">
              <div className="testimonial-quote-card">
                <p className="testimonial-text">
                  &ldquo;Seeing the children&apos;s faces light up when they received their Diwali kits was
                  the most heartwarming experience.&rdquo;
                </p>
                <span className="testimonial-author">&ndash; Priya, Volunteer</span>
              </div>

              <div className="testimonial-quote-card">
                <p className="testimonial-text">
                  &ldquo;This was the first time my children had their own Diwali celebration. Thank you for
                  bringing joy to our home.&rdquo;
                </p>
                <span className="testimonial-author">&ndash; Rajesh, Recipient</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==================================================
          FOOTER WITH RAZORPAY COMPLIANCE & LEGAL LINKS
      ================================================== */}
      <Footer onOpenPolicy={handleOpenPolicy} />

      {/* ==================================================
          POLICY MODAL (Razorpay Compliance Pages)
      ================================================== */}
      <PolicyModal
        activeTab={activePolicy}
        onClose={handleClosePolicy}
        onSelectTab={handleOpenPolicy}
      />
    </div>
  );
}
