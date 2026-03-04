"use client";

import React from "react";
import { Code2, BrainCircuit, ShieldCheck, Zap } from "lucide-react";

interface Service {
  index: string;
  title: string;
  outcome: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    index: "01",
    title: "Full-Stack Engineering",
    outcome: "Build fast, reliable web apps end-to-end",
    tagline: "End-to-end web & mobile apps.",
    description:
      "Building complete applications with React, Next.js, Node.js, and Express — from database design to polished front-end. I ship production-ready systems, not prototypes.",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    index: "02",
    title: "AI System Integration",
    outcome: "Ship AI features that work in production",
    tagline: "From model to product.",
    description:
      "Integrating ML models and AI APIs (Hugging Face, Python pipelines) into existing platforms as reliable production features — not demos. I handle the full integration architecture.",
    icon: <BrainCircuit className="w-6 h-6" />,
  },
  {
    index: "03",
    title: "System Architecture & Security",
    outcome: "Secure, scalable systems from day one",
    tagline: "Secure by design.",
    description:
      "JWT authentication, bcrypt hashing, Helmet headers, and scalable backend design. I build systems that are secure and maintainable from day one.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    index: "04",
    title: "Front-End Performance",
    outcome: "40%+ load speed improvements on real projects",
    tagline: "Speed is a feature.",
    description:
      "Internationalization with i18n, React Query caching, code splitting, and bundle optimization — delivering measurable performance gains on real-world projects.",
    icon: <Zap className="w-6 h-6" />,
  },
];

const ServicesSection: React.FC = () => (
  <section
    id="services"
    className="section"
    style={{ background: "var(--color-bg)" }}
    aria-labelledby="services-heading"
  >
    <div className="container">
      {/* Header */}
      <div className="mb-14">
        <span className="section-label animate-in">Services</span>
        <h2 id="services-heading" className="text-h1 animate-in" style={{ transitionDelay: "80ms" }}>
          What I Deliver
        </h2>
        <p className="text-body-lg mt-4 max-w-xl animate-in" style={{ transitionDelay: "160ms" }}>
          Four disciplines I practice across every project. Each engagement starts with understanding your business constraints — not your tech stack.
        </p>
      </div>

      {/* Services list */}
      <div className="space-y-0 relative">
        {services.map((s, i) => (
          <div
            key={s.index}
            className="animate-in group py-12 border-t border-[var(--color-border)] relative overflow-hidden"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {/* Background Decorative Index - Fixed Positioning */}
            <span
              className="hidden md:block absolute left-0 bottom-[-10px] pointer-events-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "120px",
                fontWeight: 900,
                color: "var(--color-accent)",
                opacity: 0.08,
                lineHeight: 1,
                letterSpacing: "-0.05em",
                zIndex: 0,
                transform: "translateX(-20px)",
              }}
              aria-hidden="true"
            >
              {s.index}
            </span>

            <div
              className="relative z-10 grid md:grid-cols-[60px_1fr_1fr] gap-x-12 gap-y-6 items-start"
              style={{
                borderLeft: "3px solid var(--color-accent)",
                paddingLeft: "24px",
              }}
            >
              {/* Icon - Always on top */}
              <div
                style={{
                  color: "var(--color-accent)",
                  opacity: 0.9,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  height: "32px",
                }}
                aria-hidden="true"
              >
                {s.icon}
              </div>

              {/* Title block */}
              <div>
                <h3 className="text-h2 mb-2 leading-tight">{s.title}</h3>
                <p
                  className="text-sm uppercase tracking-widest font-bold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {s.outcome}
                </p>
              </div>

              {/* Description */}
              <p className="text-body-lg leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}

        {/* Bottom border */}
        <div className="border-t border-[var(--color-border)]" />
      </div>
    </div>

    <div aria-hidden="true" className="section-divider mt-16" />
  </section>
);

export default ServicesSection;