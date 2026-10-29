import { useEffect } from "react";
import {
  X,
  ShieldCheck,
  FileText,
  RotateCcw,
  Truck,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Heart,
} from "lucide-react";

export const POLICY_TABS = [
  { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
  { id: "terms", label: "Terms & Conditions", icon: FileText },
  { id: "refund", label: "Refund & Cancellation", icon: RotateCcw },
  { id: "shipping", label: "Shipping & Delivery", icon: Truck },
  { id: "contact", label: "Contact Us", icon: Phone },
  { id: "about", label: "About SETU Club", icon: Heart },
];

export default function PolicyModal({ activeTab, onClose, onSelectTab }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!activeTab) return null;

  return (
    <div
      className="policy-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      onClick={onClose}
    >
      <div
        className="policy-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="policy-modal-header">
          <div className="policy-modal-brand">
            <span className="policy-badge">SETU CLUB • LEGAL &amp; COMPLIANCE</span>
            <h2 id="policy-modal-title" className="policy-modal-title">
              {POLICY_TABS.find((t) => t.id === activeTab)?.label || "Policy Details"}
            </h2>
          </div>
          <button
            type="button"
            className="policy-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="policy-modal-tabs" role="tablist">
          {POLICY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                className={`policy-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="policy-modal-body">
          {activeTab === "privacy" && <PrivacyPolicyContent />}
          {activeTab === "terms" && <TermsContent />}
          {activeTab === "refund" && <RefundContent />}
          {activeTab === "shipping" && <ShippingContent />}
          {activeTab === "contact" && <ContactContent />}
          {activeTab === "about" && <AboutContent />}
        </div>

        {/* Modal Footer */}
        <div className="policy-modal-footer">
          <div className="policy-footer-note">
            <span>Official contact: </span>
            <a href="mailto:mritunjaysahu07@gmail.com">mritunjaysahu07@gmail.com</a>
            <span> | +91 8450073003</span>
          </div>
          <button type="button" className="policy-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   POLICY CONTENTS (Compliant with Razorpay standards)
================================================== */

function PrivacyPolicyContent() {
  return (
    <article className="policy-article">
      <div className="policy-meta">
        <span>Last Updated: October 2026</span>
        <span>•</span>
        <span>SETU Club (Newton School of Technology)</span>
      </div>

      <h3>1. Overview</h3>
      <p>
        SETU Club (&quot;SETU&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a student-led social impact
        initiative operating under Newton School of Technology. We are committed to upholding the privacy,
        dignity, and data security of all our donors, volunteers, and website visitors.
      </p>
      <p>
        This Privacy Policy explains how your personal data is collected, used, protected, and shared when you
        interact with our web platform (including campaign donations for Project SEVA and &quot;Light a Life This
        Diwali&quot;).
      </p>

      <h3>2. Information We Collect</h3>
      <p>When you donate or interact with our platform, we may collect the following information:</p>
      <ul>
        <li>
          <strong>Contact Information:</strong> Full name, email address, mobile/WhatsApp number, and postal
          address / pincode.
        </li>
        <li>
          <strong>Donation Details:</strong> Contribution amount, selected festival kit, date and timestamp of
          transaction, and transaction reference ID.
        </li>
        <li>
          <strong>Statutory Compliance Data:</strong> PAN (Permanent Account Number) if voluntarily submitted
          by donors for 80G tax exemption receipts where applicable.
        </li>
        <li>
          <strong>Technical Data:</strong> IP address, browser type, device information, and standard session
          analytics used strictly to ensure platform security and prevent fraudulent transactions.
        </li>
      </ul>

      <h3>3. Payment Security &amp; Razorpay Compliance</h3>
      <div className="policy-callout">
        <strong>Payment Gateway Processing:</strong>
        <p>
          All electronic payments on this platform are processed through authorized, RBI-regulated, and
          PCI-DSS Level 1 compliant payment gateways (including <strong>Razorpay Software Private Limited</strong>).
        </p>
        <p>
          <strong>SETU Club does NOT collect, view, process, or store</strong> credit card numbers, debit card
          numbers, CVV codes, net banking passwords, or UPI PINs on any of our servers. All transaction details
          are encrypted during transit via industry-standard 256-bit SSL/TLS encryption.
        </p>
      </div>

      <h3>4. How We Use Your Information</h3>
      <p>We use your personal information solely for legitimate philanthropic purposes, including:</p>
      <ul>
        <li>Processing your voluntary donations and generating digital donation receipts.</li>
        <li>Transmitting transactional SMS/email confirmations and impact updates.</li>
        <li>Maintaining accurate accounting records and fulfilling non-profit statutory compliance.</li>
        <li>Responding to donor questions, feedback, or refund inquiries.</li>
      </ul>

      <h3>5. Information Sharing and Non-Disclosure</h3>
      <p>
        We strictly respect your privacy. <strong>We do not sell, rent, lease, or trade</strong> your personal
        information to third-party commercial marketing agencies. Your data is only shared with:
      </p>
      <ul>
        <li>Payment gateway partners (Razorpay) strictly to verify and settle payment transactions.</li>
        <li>Statutory or government authorities when explicitly mandated under the laws of India.</li>
      </ul>

      <h3>6. Data Retention and Security</h3>
      <p>
        We implement administrative and technical security measures to prevent unauthorized access or disclosure.
        Donation records are retained for statutory audit periods as mandated by Indian non-profit and financial
        regulations.
      </p>

      <h3>7. Grievance Redressal &amp; Contact</h3>
      <p>
        For any privacy queries, data update requests, or concerns, please contact our designated coordinator:
      </p>
      <div className="policy-contact-box">
        <p><strong>Lead Coordinator:</strong> Mritunjay Sahu</p>
        <p><strong>Email:</strong> <a href="mailto:mritunjaysahu07@gmail.com">mritunjaysahu07@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+918450073003">+91 8450073003</a></p>
        <p><strong>Campus Address:</strong> SETU Club, Newton School of Technology, Delhi-NCR, India</p>
      </div>
    </article>
  );
}

function TermsContent() {
  return (
    <article className="policy-article">
      <div className="policy-meta">
        <span>Last Updated: October 2026</span>
        <span>•</span>
        <span>SETU Club (Newton School of Technology)</span>
      </div>

      <h3>1. Acceptance of Terms</h3>
      <p>
        By accessing or using this website, or contributing to SETU Club campaigns (&quot;Project SEVA&quot;), you
        agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please
        refrain from using our services.
      </p>

      <h3>2. About SETU Club</h3>
      <p>
        SETU is the official student social club of Newton School of Technology. The word &quot;Setu&quot; means
        bridge. We operate as a philanthropic bridge connecting students, sponsors, and donors with underprivileged
        communities, orphanages (such as Sant Ishwar Foundation – GHAR), elderly care homes, and individuals in need.
      </p>

      <h3>3. Nature of Contributions</h3>
      <ul>
        <li>All contributions made through this website are voluntary charitable donations.</li>
        <li>Donations are utilized for procuring Diwali kits, sweets, clothing, meals, and relief packages for beneficiaries.</li>
        <li>
          Donors declare that all funds used for donations are derived from legitimate, authorized personal or
          corporate sources.
        </li>
      </ul>

      <h3>4. Payment Processing</h3>
      <p>
        Online payments are facilitated through our third-party payment partner, <strong>Razorpay</strong>.
        By initiating a payment, you agree to comply with Razorpay’s payment terms and acknowledge that your
        payment is subject to their authentication and bank validation processes.
      </p>

      <h3>5. Intellectual Property</h3>
      <p>
        All content, including the 3D Diya presentation, graphics, photographs, logos of Newton School of
        Technology and SETU Club, text, and layout, are protected by intellectual property rights. Reproduction
        or commercial misuse without prior written consent is strictly prohibited.
      </p>

      <h3>6. Limitation of Liability</h3>
      <p>
        SETU Club and Newton School of Technology coordinators act in good faith to coordinate charitable drives.
        In no event shall SETU Club, its student volunteers, or parent university be liable for any indirect,
        punitive, or consequential damages resulting from website downtime, banking gateway errors, or third-party
        network disruptions.
      </p>

      <h3>7. Governing Law &amp; Jurisdiction</h3>
      <p>
        These Terms shall be governed and interpreted under the laws of the Republic of India. Any legal dispute
        arising under or in connection with these terms shall fall under the exclusive jurisdiction of the competent
        courts in Delhi-NCR / Haryana, India.
      </p>
    </article>
  );
}

function RefundContent() {
  return (
    <article className="policy-article">
      <div className="policy-meta">
        <span>Last Updated: October 2026</span>
        <span>•</span>
        <span>Donation Refund &amp; Cancellation Policy</span>
      </div>

      <div className="policy-callout">
        <strong>Donation Policy Overview:</strong>
        <p>
          SETU Club is a non-profit social initiative. Because donations are immediately allocated towards
          procuring Diwali festive kits, ration packages, and relief items for vulnerable children and elderly
          residents, <strong>donations once made are generally non-refundable</strong>.
        </p>
      </div>

      <h3>1. Eligible Conditions for Refund</h3>
      <p>
        We understand that errors can happen during digital payments. We will gladly investigate and process
        a full refund under the following valid circumstances:
      </p>
      <ul>
        <li>
          <strong>Duplicate Deduction:</strong> Your bank account or card was debited multiple times for a single
          intended contribution due to gateway lag or double-clicking.
        </li>
        <li>
          <strong>Incorrect Amount Keyed In:</strong> You accidentally typed an erroneous donation amount (e.g.,
          ₹10,000 instead of ₹1,000) due to a typographical error.
        </li>
        <li>
          <strong>Unauthorized Account Usage:</strong> The transaction was made fraudulently without your consent,
          subject to verification by your issuing bank.
        </li>
        <li>
          <strong>Technical Failure:</strong> Funds were debited from your account, but the payment gateway reported
          a failure or did not generate a transaction ID.
        </li>
      </ul>

      <h3>2. Refund Request Window</h3>
      <p>
        To be eligible for a refund, the donor must submit a refund request within <strong>7 calendar days</strong> of
        the transaction date. Requests made after 7 days cannot be entertained, as funds are already committed or
        deployed to beneficiary homes.
      </p>

      <h3>3. How to Request a Refund</h3>
      <p>Please send an email to our official contact with the following information:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:mritunjaysahu07@gmail.com">mritunjaysahu07@gmail.com</a></li>
        <li><strong>Phone / WhatsApp:</strong> <a href="tel:+918450073003">+91 8450073003</a></li>
      </ul>
      <p>Please include:</p>
      <ol>
        <li>Donor Full Name &amp; Contact Number</li>
        <li>Date and exact Time of Transaction</li>
        <li>Donation Amount (INR)</li>
        <li>Razorpay Payment ID / Bank UTR Reference Number</li>
        <li>Reason for the refund request along with proof of double deduction (if applicable)</li>
      </ol>

      <h3>4. Refund Review and Timeline</h3>
      <ul>
        <li><strong>Review Period:</strong> Our team verifies the transaction log with Razorpay within <strong>2 to 3 business days</strong>.</li>
        <li>
          <strong>Settlement:</strong> Once approved, the refund is initiated via Razorpay back to the
          <strong>original payment method</strong> (credit/debit card, net banking, or UPI account).
        </li>
        <li>
          <strong>Credit Timeline:</strong> Banks typically take <strong>5 to 7 business days</strong> for the refunded
          amount to reflect in your bank account or card statement, as per standard banking protocol.
        </li>
      </ul>

      <h3>5. Cancellation Policy</h3>
      <p>
        Once a donation is confirmed and festival kits are purchased/distributed to beneficiary orphanages and
        homes, donation cancellation cannot be processed.
      </p>
    </article>
  );
}

function ShippingContent() {
  return (
    <article className="policy-article">
      <div className="policy-meta">
        <span>Last Updated: October 2026</span>
        <span>•</span>
        <span>Fulfillment &amp; Digital Delivery Policy</span>
      </div>

      <div className="policy-callout">
        <strong>Charity Initiative Notice:</strong>
        <p>
          SETU Club is a student-led social welfare club. <strong>No physical commercial goods or products are
          sold or shipped to donors.</strong>
        </p>
        <p>
          All donations made on this platform fund charitable Diwali kits and food drives that our volunteers
          physically deliver directly to children, disabled women, and elderly residents at Sant Ishwar Foundation – GHAR.
        </p>
      </div>

      <h3>1. Digital Fulfillment &amp; Acknowledgement</h3>
      <p>
        Donors receive digital fulfillment of their contributions as follows:
      </p>
      <ul>
        <li>
          <strong>Instant On-Screen Confirmation:</strong> Immediately upon successful transaction completion via
          Razorpay, an on-screen acknowledgement displaying your Transaction ID and Kit details is displayed.
        </li>
        <li>
          <strong>Email &amp; WhatsApp Receipt:</strong> An official digital donation confirmation, donor receipt,
          and acknowledgement letter will be delivered to your registered email address and WhatsApp number within
          <strong>24 to 48 hours</strong>.
        </li>
        <li>
          <strong>Post-Event Impact Update:</strong> Donors will receive photographic and video updates detailing
          the distribution of festival kits, smiles shared, and meals served during the campaign.
        </li>
      </ul>

      <h3>2. Shipping Fees</h3>
      <p>
        Because physical products are not shipped to donors, <strong>no shipping, handling, or packaging charges</strong>
        are levied on any contribution. 100% of your donation is directed to social impact.
      </p>

      <h3>3. Delivery Issues &amp; Support</h3>
      <p>
        If you have not received your digital donation receipt within 48 hours of transaction completion, please
        contact us:
      </p>
      <div className="policy-contact-box">
        <p><strong>Email:</strong> <a href="mailto:mritunjaysahu07@gmail.com">mritunjaysahu07@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+918450073003">+91 8450073003</a></p>
      </div>
    </article>
  );
}

function ContactContent() {
  return (
    <article className="policy-article">
      <div className="policy-meta">
        <span>Official Support &amp; Grievance Redressal</span>
        <span>•</span>
        <span>SETU Club</span>
      </div>

      <p>
        Have a question about our Diwali initiative, want to volunteer, or need support with your donation? We are
        here to help!
      </p>

      <div className="policy-cards-grid">
        <div className="policy-info-card">
          <Mail className="policy-icon" size={24} />
          <h4>Official Email</h4>
          <p>For donations, receipts, partnerships &amp; grievances:</p>
          <a href="mailto:mritunjaysahu07@gmail.com" className="policy-link">
            mritunjaysahu07@gmail.com
          </a>
        </div>

        <div className="policy-info-card">
          <Phone className="policy-icon" size={24} />
          <h4>Official Helpline</h4>
          <p>Call or WhatsApp our team coordinator:</p>
          <a href="tel:+918450073003" className="policy-link">
            +91 8450073003
          </a>
        </div>

        <div className="policy-info-card">
          <MapPin className="policy-icon" size={24} />
          <h4>Campus Address</h4>
          <p>
            SETU Club, Newton School of Technology Campus,
            <br />
            Delhi-NCR (Sonipat, Haryana – 131021), India
          </p>
        </div>

        <div className="policy-info-card">
          <Clock className="policy-icon" size={24} />
          <h4>Operating Hours</h4>
          <p>Monday – Saturday: 10:00 AM – 6:00 PM IST</p>
          <p className="policy-subnote">Support emails are typically answered within 24 hours.</p>
        </div>
      </div>

      <h3>Entity Details for Verification</h3>
      <div className="policy-contact-box">
        <p><strong>Entity Name:</strong> SETU Club (Social Impact Club)</p>
        <p><strong>Affiliation:</strong> Newton School of Technology</p>
        <p><strong>Authorized Coordinator:</strong> Mritunjay Sahu</p>
        <p><strong>Payment Processing Partner:</strong> Razorpay Software Private Limited</p>
      </div>
    </article>
  );
}

function AboutContent() {
  return (
    <article className="policy-article">
      <div className="policy-meta">
        <span>About Us</span>
        <span>•</span>
        <span>SETU Club</span>
      </div>

      <h3>Who We Are</h3>
      <p>
        SETU is the premier social welfare club of Newton School of Technology. &quot;Setu&quot; translates to
        &quot;Bridge&quot; in Sanskrit—and that is our lifelong mission: serving as a resilient bridge between
        individuals who wish to give and vulnerable communities in need.
      </p>

      <h3>Project SEVA – Light a Life This Diwali</h3>
      <p>
        This festive season, SETU Club is spearheading Project SEVA in partnership with
        <strong>Sant Ishwar Foundation – GHAR</strong>, a dedicated sanctuary providing care, shelter, and medical
        support to orphaned and vulnerable girls, women with severe disabilities, and elderly citizens without families.
      </p>

      <h3>Our Core Pillars</h3>
      <ul>
        <li><strong>Transparency:</strong> 100% accountability in fund allocation and kit distribution.</li>
        <li><strong>Dignity:</strong> We celebrate human connection and bring joy, not mere charity.</li>
        <li><strong>Youth Empowerment:</strong> Channeling student technology and volunteer energy into sustained social good.</li>
      </ul>

      <div className="policy-contact-box">
        <p>
          Want to learn more about our past drives?
          <a href="#/setu" style={{ marginLeft: "8px", color: "#ffcf6b", fontWeight: "bold" }}>
            Explore our Memories &amp; Team Page →
          </a>
        </p>
      </div>
    </article>
  );
}
