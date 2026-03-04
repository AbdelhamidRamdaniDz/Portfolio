"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const fade = (delay: string) =>
    `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

  return (
    <section
      id="about"
      ref={ref}
      className="section"
      style={{ background: "var(--color-surface-2)", position: "relative", overflow: "hidden" }}
      aria-labelledby="about-heading"
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #C8C8C4 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
          opacity: 0.3,
        }}
      />
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 xl:gap-20 items-start">

          {/* Left — narrative */}
          <div>
            <span className="section-label animate-in" style={{ transitionDelay: "0ms" }}>About</span>

            <h2
              id="about-heading"
              className="text-h1 animate-in mb-8"
              style={{ transitionDelay: "80ms" }}
            >
              Built on engineering.<br />
              <span style={{ color: "var(--color-text-tertiary)" }}>Driven by impact.</span>
            </h2>

            <div
              className="space-y-5 animate-in"
              style={{ transitionDelay: "160ms" }}
            >
              <p className="text-body-lg">
                I&apos;m <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Abdelhamid Ramdani</strong> —
                a Full-Stack Developer and Co-Founder of{" "}
                <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>FreeFlow</strong>,
                an incubated startup. I hold a Master&apos;s degree in Artificial Intelligence and have
                hands-on experience building production-grade web applications using React, Next.js,
                Node.js, and Express.
              </p>
              <p className="text-body-lg">
                I&apos;ve worked across <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>front-end and back-end roles</strong>,{" "}
                led architecture decisions, and integrated AI-driven features into real products.
              </p>
            </div>

            {/* Credentials row */}
            <div
              className="mt-10 pt-8 animate-in"
              style={{
                transitionDelay: "240ms",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    label: "Current role",
                    value: "Co-Founder — FreeFlow",
                    sub: "March 2025 – Present",
                  },
                  {
                    label: "Previous role",
                    value: "Front-End Developer — Nhanik",
                    sub: "Remote · March–July 2024",
                  },
                  {
                    label: "Education",
                    value: "AI Master's — Ziane Achour University",
                    sub: "Machine learning & intelligent systems",
                  },
                  {
                    label: "Available for",
                    value: "Front-End or Back-End Developer roles",
                    sub: "Djelfa, Algeria · Remote worldwide",
                  },
                ].map((c) => (
                  <div key={c.label}>
                    <p className="text-caption mb-1" style={{ color: "var(--color-text-tertiary)" }}>
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {c.value}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                      {c.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA row — Download CV + anchor to work */}
              <div
                className="animate-in flex flex-wrap gap-3 mt-8"
                style={{ transitionDelay: "300ms" }}
              >
                <a
                  href="/AbdelhamidRamdani-CV.pdf"
                  download
                  className="btn-ghost"
                  aria-label="Download Abdelhamid Ramdani's CV as PDF"
                >
                  Download CV
                </a>
                <a href="#work" className="btn-ghost">
                  View My Work
                </a>
              </div>
            </div>
          </div>

          {/* Right — Photo card */}
          <div className="hidden lg:block animate-in" style={{ transitionDelay: "200ms" }}>
            <div className="sticky top-28">
              <div
                className="rounded-xl overflow-hidden relative"
                style={{
                  aspectRatio: "3/4",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <Image
                  src="/me.jpg"
                  alt="Abdelhamid Ramdani"
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
                />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    Djelfa, Algeria
                  </span>
                </div>
              </div>

              {/* Availability card */}
              <div
                className="mt-4 p-4 rounded-xl"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    Available for hire · 2026
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                  Open to front-end or back-end developer roles. Remote worldwide.
                </p>
              </div>

              {/* Social proof chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "\u2713 Master's in AI",
                  "\u2713 Co-Founder",
                  "\u2713 Available for hire",
                ].map((chip) => (
                  <span
                    key={chip}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-accent-muted)",
                      color: "var(--color-accent)",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="section-divider mt-16 container" />
    </section>
  );
};

export default AboutSection;