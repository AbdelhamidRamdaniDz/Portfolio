"use client";

import React from "react";

interface Service {
  index: string;
  title: string;
  tagline: string;
  description: string;
}

const services: Service[] = [
  {
    index: "01",
    title: "System Architecture & Design",
    tagline: "Blueprint before code.",
    description:
      "I map your data flow, service boundaries, API contracts, and infrastructure decisions before a line of code is written. The output is documentation and decisions your whole team can build from — eliminating costly rework during execution.",
  },
  {
    index: "02",
    title: "Full-Stack Engineering",
    tagline: "End-to-end. Production-grade.",
    description:
      "Development using Next.js, Node.js, and TypeScript with security, monitoring, and CI/CD built in from day one. I don't hand off prototypes — I ship systems ready for real users and real load.",
  },
  {
    index: "03",
    title: "AI System Integration",
    tagline: "From model to product.",
    description:
      "Operationalizing AI into your existing platform — not as a demo, but as a reliable production feature. I handle model selection, inference API design, latency optimization, and the integration architecture that makes AI actually useful in a business context.",
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
          Three disciplines I practice at CTO level. Each engagement starts with understanding your business constraints — not your tech stack.
        </p>
      </div>

      {/* Services list */}
      <div className="space-y-0">
        {services.map((s, i) => (
          <div
            key={s.index}
            className="animate-in"
            style={{
              transitionDelay: `${i * 80}ms`,
              padding: "var(--sp-6) 0",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <div className="grid md:grid-cols-[80px_1fr_1fr] gap-6 items-start">
              {/* Index */}
              <span
                className="font-black"
                style={{ fontSize: "13px", color: "var(--color-text-tertiary)", letterSpacing: "0.05em" }}
                aria-hidden="true"
              >
                {s.index}
              </span>

              {/* Title block */}
              <div>
                <h3 className="text-h3 mb-1">{s.title}</h3>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  {s.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-body">{s.description}</p>
            </div>
          </div>
        ))}

        {/* Bottom border */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />
      </div>
    </div>

    <div aria-hidden="true" className="section-divider mt-16" />
  </section>
);

export default ServicesSection;