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
      style={{ background: "var(--color-surface-2)" }}
      aria-labelledby="about-heading"
    >
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
              <span style={{ color: "var(--color-text-tertiary)" }}>Driven by architecture.</span>
            </h2>

            <div
              className="space-y-5 animate-in"
              style={{ transitionDelay: "160ms" }}
            >
              <p className="text-body-lg">
                I&apos;m <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Abdelhamid Ramdani</strong> —
                a Technical Product Architect and CTO at{" "}
                <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>FreeFlow</strong>.
                I specialize in designing and shipping production systems that serve real load —
                from multi-tenant SaaS platforms to government-grade digital infrastructure.
              </p>
              <p className="text-body-lg">
                My practice combines <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>system architecture</strong>,{" "}
                full-stack engineering, and a research background in AI — giving me the depth
                to choose the right tools for the right problems, and the discipline to ship without shortcuts.
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
                    value: "CTO — FreeFlow Studio",
                    sub: "Full technical leadership",
                  },
                  {
                    label: "Research",
                    value: "AI Master's — Ziane Achour University",
                    sub: "Machine learning & intelligent systems",
                  },
                  {
                    label: "Location",
                    value: "Djelfa, Algeria",
                    sub: "Available remotely worldwide",
                  },
                  {
                    label: "Focus area",
                    value: "System architecture, full-stack, AI integration",
                    sub: "Next.js · Node.js · TypeScript · Python",
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
                    Taking projects · Q2 2026
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                  2–3 select engagements per quarter. Architecture, engineering, and advisory.
                </p>
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