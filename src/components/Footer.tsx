"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "var(--sp-6) 0",
      }}
      aria-label="Site footer"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span
              className="font-black text-base"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}
            >
              AR.
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Abdelhamid Ramdani &middot; Full-Stack Developer &amp; AI Engineer
            </span>
          </div>

          {/* Center: Social links + Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/abdelhamid-ramdani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-tertiary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-surface)";
                e.currentTarget.style.color = "var(--color-text-tertiary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/AbdelhamidRamdaniDz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-tertiary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-text-primary)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "var(--color-text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-surface)";
                e.currentTarget.style.color = "var(--color-text-tertiary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <Github className="w-4 h-4" />
            </a>

            <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
              &copy; {new Date().getFullYear()} Abdelhamid Ramdani
            </span>
          </div>

          {/* Scroll top */}
          <button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text-tertiary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-text-primary)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface)";
              e.currentTarget.style.color = "var(--color-text-tertiary)";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;