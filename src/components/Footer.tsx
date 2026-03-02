"use client";

import React from "react";

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
          <div>
            <span
              className="font-black text-base"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}
            >
              AR.
            </span>
            <span
              className="text-sm ml-2"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Abdelhamid Ramdani · Technical Product Architect
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            &copy; {new Date().getFullYear()} · Built with Next.js &amp; TypeScript
          </p>

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