"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const metrics = [
  { value: "1,000+", label: "Users served across production platforms" },
  { value: "15 days",  label: "Govt. processing time reduced from 3+ months" },
  { value: "8+",       label: "Projects shipped to production" },
];

const HeroSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const fade = (delay: number) =>
    `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

  return (
    <section
      id="hero"
      role="banner"
      className="relative overflow-hidden"
      style={{
        background: "var(--color-bg)",
        paddingTop: "128px",
        paddingBottom: "96px",
      }}
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #C8C8C4 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center">

          {/* ── Left: Copy ─────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 mb-8 ${fade(0)}`}
              style={{ transitionDelay: "60ms" }}
            >
              <span
                className="px-3 py-1.5 text-xs font-semibold rounded-md"
                style={{
                  background: "var(--color-accent-muted)",
                  color: "var(--color-accent)",
                  letterSpacing: "0.04em",
                }}
              >
                Full-Stack Developer &amp; AI Engineer
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-display mb-6 ${fade(0)}`}
              style={{ transitionDelay: "140ms" }}
            >
              <span className="sr-only">Abdelhamid Ramdani — Full-Stack Developer & AI Engineer. I build systems that scale businesses.</span>
              <span aria-hidden="true">
                I build<br />
                <span style={{ color: "var(--color-text-tertiary)" }}>systems that<br />scale businesses.</span>
              </span>
            </h1>

            {/* Sub */}
            <p
              className={`text-body-lg mb-10 max-w-lg ${fade(0)}`}
              style={{ transitionDelay: "220ms" }}
            >
              Full Stack Developer &amp; AI Engineer — building secure, scalable web applications
              for startups and tech-driven businesses.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 mb-14 ${fade(0)}`}
              style={{ transitionDelay: "300ms" }}
            >
              <a href="mailto:abdelhamidramdani17@gmail.com" className="btn-primary">
                Book a Technical Call
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link href="#work" className="btn-ghost">
                View Case Studies
              </Link>
            </div>

            {/* Metrics — stats-container treatment per spec */}
            <div
              className={`stats-container ${fade(0)}`}
              style={{
                transitionDelay: "380ms",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
              }}
            >
              <p
                style={{
                  gridColumn: "1 / -1",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  marginBottom: "12px",
                }}
              >
                Impact so far
              </p>
              {metrics.map((m, i) => (
                <div
                  key={m.value}
                  style={{
                    padding: "0 24px 0 0",
                    marginRight: i < metrics.length - 1 ? "24px" : 0,
                    borderRight: i < metrics.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <div className="stats-number" style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
                    {m.value}
                  </div>
                  <div className="stats-label" style={{ maxWidth: "120px" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ────────────────────────────── */}
          <div
            className={`hidden lg:block ${fade(0)}`}
            style={{ transitionDelay: "160ms" }}
          >
            <div className="relative">
              {/* Main photo */}
              <div
                className="rounded-xl overflow-hidden relative"
                style={{
                  aspectRatio: "4/5",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <Image
                  src="/me.jpg"
                  alt="Abdelhamid Ramdani — Full-Stack Developer and AI Engineer"
                  fill
                  priority
                  sizes="(max-width: 767px) 0px, (max-width: 1023px) 400px, 420px"
                  className="object-cover object-top"
                />
                {/* Bottom tint for badge legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-28"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  }}
                />

                {/* Status badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.93)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>Open to projects</p>
                      <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>2–3 slots / quarter</p>
                    </div>
                  </div>
                  <a
                    href="/cv.pdf"
                    download
                    className="text-white text-xs font-semibold px-4 py-2.5 rounded-lg shrink-0 transition-colors duration-150"
                    style={{ background: "rgba(26,26,26,0.85)", backdropFilter: "blur(8px)" }}
                  >
                    Download CV
                  </a>
                </div>
              </div>

              {/* Corner accents */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 w-20 h-20 rounded-xl -z-10"
                style={{ border: "1.5px solid var(--color-border)", background: "var(--color-surface-2)" }}
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 w-14 h-14 rounded-xl -z-10"
                style={{ background: "var(--color-accent-muted)", border: `1px solid var(--color-accent)`, opacity: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "1px", background: "var(--color-border)" }}
      />

      {/* Mobile photo */}
      <div className="lg:hidden container relative z-10 mt-12">
        <div className="max-w-xs mx-auto rounded-xl overflow-hidden relative" style={{ border: "1px solid var(--color-border)", aspectRatio: "1", boxShadow: "var(--shadow-md)" }}>
          <Image src="/me.jpg" alt="Abdelhamid Ramdani" fill priority sizes="320px" className="object-cover object-top" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;