"use client";

import React from "react";
import { ArrowRight, Mail } from "lucide-react";

/**
 * PhilosophySection — Contact CTA
 *
 * LAYOUT: Asymmetric 55/45 two-column grid on dark background.
 * Replaces the "centered headline on dark background" Webflow template pattern.
 *
 * Left col (55%): Headline — left-aligned, no centering
 * Right col (45%): Availability card + action buttons — left-aligned within col
 */
const PhilosophySection: React.FC = () => (
  <section
    id="cta"
    className="section-cta"
    aria-labelledby="cta-heading"
  >
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          gap: "var(--sp-10)",
          alignItems: "center",
        }}
        className="cta-grid"
      >

        {/* ── Left column — Headline ─────────────────── */}
        <div>
          <span
            className="section-label animate-in"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Next Steps
          </span>

          <h2
            id="cta-heading"
            className="text-h1 animate-in"
            style={{
              transitionDelay: "80ms",
              color: "#FFFFFF",
              marginBottom: "var(--sp-4)",
              lineHeight: 1.05,
            }}
          >
            Your next system starts with a conversation.
          </h2>

          <p
            className="text-body-lg animate-in"
            style={{
              transitionDelay: "160ms",
              color: "rgba(255,255,255,0.50)",
              maxWidth: "420px",
            }}
          >
            Architecture that holds under real load begins with understanding
            your constraints — not your tech stack.
          </p>
        </div>

        {/* ── Right column — Availability + Actions ── */}
        <div className="animate-in" style={{ transitionDelay: "220ms" }}>

          {/* Availability card */}
          <div
            style={{
              background: "var(--color-cta-surface)",
              border: "1px solid var(--color-cta-border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--sp-4) var(--sp-4)",
              marginBottom: "var(--sp-4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--sp-1)" }}>
              {/* Live green dot */}
              <span
                style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#22C55E",
                  boxShadow: "0 0 0 3px rgba(34,197,94,0.20)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>
                Taking projects · Q2 2026
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.5 }}>
              2–3 select engagements per quarter. Architecture, engineering
              leadership, and advisory — no maintenance contracts.
            </p>
          </div>

          {/* Action buttons — stacked, left-aligned within right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
            <a
              href="mailto:abdelhamidramdani17@gmail.com"
              className="btn-primary"
              style={{ justifyContent: "center" }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Book a Technical Call
            </a>

            <a
              href="https://wa.me/213666564435"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minHeight: "48px",
                padding: "0 24px",
                borderRadius: "var(--radius-sharp)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.65)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.01em",
                textDecoration: "none",
                transition: "border-color 180ms ease, color 180ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)";
              }}
            >
              Send a brief via WhatsApp
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <p
            style={{
              color: "rgba(255,255,255,0.22)",
              fontSize: "12px",
              marginTop: "var(--sp-3)",
              letterSpacing: "0.02em",
            }}
          >
            Response within 24 hours. No sales calls. Direct technical conversation.
          </p>
        </div>
      </div>
    </div>

    {/* Responsive: stack columns below 768px */}
    <style>{`
      @media (max-width: 767px) {
        .cta-grid {
          grid-template-columns: 1fr !important;
          gap: var(--sp-8) !important;
        }
      }
    `}</style>
  </section>
);

export default PhilosophySection;