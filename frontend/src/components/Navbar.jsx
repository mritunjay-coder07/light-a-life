
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Light the Light home">
        <span className="brand-icon">
          <Sparkles size={19} aria-hidden="true" />
        </span>

        <span className="brand-text">
          light<span>the</span>light
        </span>
      </a>

      <div className="navbar-right">
        <span className="nav-status">
          <span className="status-dot active" />
          An interactive experience
        </span>

        <a className="nav-link" href="#footer">
          Our purpose <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
