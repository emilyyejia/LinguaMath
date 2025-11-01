import { NavLink } from "react-router-dom";
import { Linkedin, Github, Globe } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white py-3 mt-auto"
      style={{ boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        {/* Left: Brand and tagline */}
        <div className="text-muted text-center text-md-start">
          <strong className="text-dark">LinguaMath</strong> © {year} — Empowering multilingual learners in math.
        </div>

        {/* Middle: Links */}
        <ul className="list-unstyled d-flex justify-content-center align-items-center gap-4 mb-0">
          <li>
            <NavLink className="text-decoration-none text-muted small" to="/about">
              Privacy & Terms
            </NavLink>
          </li>
          <li>
            <NavLink className="text-decoration-none text-muted small" to="/support">
              Support
            </NavLink>
          </li>
        </ul>

        {/* Right: Social Icons */}
        <div className="d-flex justify-content-center align-items-center gap-3">
          <a
            href="https://www.linkedin.com/in/ye-jia-a80245205/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover-opacity"
          >
            <Linkedin size={20} strokeWidth={1.25} />
          </a>
          <a
            href="https://github.com/emilyyejia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover-opacity"
          >
            <Github size={20} strokeWidth={1.25} />
          </a>
          <a
            href="https://emilyyejia.github.io/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover-opacity"
          >
            <Globe size={20} strokeWidth={1.25} />
          </a>
        </div>
      </div>
    </footer>
  );
}
