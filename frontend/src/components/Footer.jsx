
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <p className="footer-kicker">MADE WITH LIGHT &amp; PURPOSE</p>

      <p className="footer-love">
        Crafted with <Heart size={13} aria-hidden="true" /> and a little hope.
      </p>

      <a href="#home" className="back-to-top">
        Back to the light ↑
      </a>
    </footer>
  );
}
