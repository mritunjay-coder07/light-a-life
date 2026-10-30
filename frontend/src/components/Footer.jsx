import { Heart, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer({ onOpenPolicy }) {
  const handlePolicyClick = (e, policyId) => {
    e.preventDefault();
    if (onOpenPolicy) {
      onOpenPolicy(policyId);
    } else {
      window.location.hash = `#${policyId}`;
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    const scrollRoot = document.getElementById("landing-scroll-root") || document.querySelector(".diya-page");
    if (scrollRoot && scrollRoot.scrollTo) {
      scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const hero = document.getElementById("hero");
      if (hero && hero.scrollIntoView) {
        hero.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer-inner">
        {/* Top brand & mission column */}
        <div className="footer-col footer-col-brand">
          <div className="footer-brand-header">
            <img
              src="/images/setu-logo.png"
              alt="SETU Club Logo"
              className="footer-brand-logo"
            />
            <div className="footer-brand-text">
              <h3 className="footer-title">SETU CLUB</h3>
              <p className="footer-sub">Newton School of Technology</p>
            </div>
          </div>
          <p className="footer-tagline">
            Building bridges between people who can give and people who need. A student-driven
            social impact club lighting up lives this festive season.
          </p>
          <div className="footer-security-pill">
            <ShieldCheck size={16} />
            <span>Razorpay Verified • 256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col footer-col-links">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-nav-list">
            <li>
              <a href="#hero" onClick={scrollToTop}>
                Light the Diya (Top)
              </a>
            </li>
            <li>
              <a href="#why-this-matters">Why This Matters</a>
            </li>
            <li>
              <a href="#our-impact">Our Impact Last Year</a>
            </li>
            <li>
              <a href="#/setu">
                Know about SETU <ExternalLink size={12} style={{ display: "inline", marginLeft: 4 }} />
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Razorpay Policy Column */}
        <div className="footer-col footer-col-legal">
          <h4 className="footer-heading">Legal &amp; Policies</h4>
          <ul className="footer-nav-list">
            <li>
              <a
                href="#privacy"
                onClick={(e) => handlePolicyClick(e, "privacy")}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                onClick={(e) => handlePolicyClick(e, "terms")}
              >
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a
                href="#refund"
                onClick={(e) => handlePolicyClick(e, "refund")}
              >
                Refund &amp; Cancellation
              </a>
            </li>
            <li>
              <a
                href="#shipping"
                onClick={(e) => handlePolicyClick(e, "shipping")}
              >
                Shipping &amp; Delivery Policy
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handlePolicyClick(e, "contact")}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handlePolicyClick(e, "about")}
              >
                About SETU Club
              </a>
            </li>
          </ul>
        </div>

        {/* Official Contact Column */}
        <div className="footer-col footer-col-contact">
          <h4 className="footer-heading">Contact Information</h4>
          <ul className="footer-contact-list">
            <li>
              <Mail size={16} className="contact-icon" />
              <div className="contact-info">
                <span className="contact-label">Official Email</span>
                <a href="mailto:mritunjaysahu07@gmail.com">mritunjaysahu07@gmail.com</a>
              </div>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <div className="contact-info">
                <span className="contact-label">Helpline / WhatsApp</span>
                <a href="tel:+918450073003">+91 8450073003</a>
              </div>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" />
              <div className="contact-info">
                <span className="contact-label">Campus Location</span>
                <span>Newton School of Technology, Lohegaon, Pune, 412105</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar with Copyright */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <strong>SETU Club</strong>, Newton School of Technology.
            All rights reserved.
          </p>
          <p className="footer-made-with">
            Crafted with <Heart size={14} className="heart-icon" /> for Project SEVA.
          </p>
        </div>
      </div>
    </footer>
  );
}
