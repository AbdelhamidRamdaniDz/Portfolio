"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const PhilosophySection: React.FC = () => (
  <section
    id="cta"
    className="section"
    style={{ background: "var(--color-text-primary)" }}
    aria-labelledby="cta-heading"
  >
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <span
          className="section-label animate-in"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Next steps
        </span>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="animate-in"
          style={{
            transitionDelay: "80ms",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#ffffff",
            marginBottom: "var(--sp-4)",
          }}
        >
          Your next system starts with a conversation.
        </h2>

        {/* Sub */}
        <p
          className="text-body-lg animate-in"
          style={{
            transitionDelay: "160ms",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "var(--sp-6)",
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          I take on 2–3 engagements per quarter. If you have a system to architect,
          a team to lead, or an existing codebase to evolve — let&apos;s talk.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in"
          style={{ transitionDelay: "240ms" }}
        >
          <a
            href="mailto:abdelhamidramdani17@gmail.com"
            className="inline-flex items-center gap-2 font-semibold text-base px-8 py-4 rounded-md transition-all duration-150"
            style={{
              background: "#ffffff",
              color: "var(--color-text-primary)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f0f0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; }}
          >
            Book a Technical Call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href="https://wa.me/213666564435"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-base px-8 py-4 rounded-md transition-all duration-150"
            style={{
              color: "rgba(255,255,255,0.7)",
              borderRadius: "var(--radius-sm)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            Send a brief via WhatsApp
          </a>
        </div>

        {/* Trust note */}
        <p
          className="animate-in mt-10 text-sm"
          style={{
            transitionDelay: "320ms",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Response within 24 hours. No sales calls. Just a direct technical conversation.
        </p>
      </div>
    </div>
  </section>
);

export default PhilosophySection;