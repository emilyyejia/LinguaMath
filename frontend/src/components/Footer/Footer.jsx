import { NavLink } from "react-router-dom";
import { Linkedin, Github, Globe } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-light text-center text-lg-start mt-auto">
      <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side: LinguaMath text */}
        <div className="text-muted mb-2 mb-md-0">
          <strong>LinguaMath</strong> © {new Date().getFullYear()} — Empowering multilingual learners in math.
        </div>

        {/* Right side: Contact, Privacy, and Icons */}
        <div className="d-flex justify-content-center align-items-center gap-3">
          <NavLink className="nav-link p-0" to="/support">Contact Us</NavLink>
          <NavLink className="nav-link p-0" to="/about">Privacy Terms</NavLink>

          <a
            href="https://www.linkedin.com/in/ye-jia-a80245205/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
          >
            <Linkedin size={20} strokeWidth={1} />
          </a>
          <a
            href="https://github.com/emilyyejia"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
          >
            <Github size={20} strokeWidth={1} />
          </a>
          <a
            href="https://emilyyejia.github.io/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
          >
            <Globe size={20} strokeWidth={1} />
          </a>
        </div>
      </div>
    </footer>
  );
}
