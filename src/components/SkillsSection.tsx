"use client";

import React from "react";
import {
  SiNextdotjs, SiReact, SiVitess,
  SiNodedotjs, SiExpress, SiPrisma, SiDocker,
  SiPython, SiMongodb, SiPostgresql,
} from "react-icons/si";

/* ── Hugging Face doesn't exist in react-icons/si, use a custom SVG ── */
const HuggingFaceIcon = () => (
  <svg viewBox="0 0 120 120" fill="currentColor" className="w-full h-full" aria-hidden="true">
    <path d="M60 10C32.4 10 10 32.4 10 60s22.4 50 50 50 50-22.4 50-50S87.6 10 60 10zm-15 70c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm30 0c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/>
  </svg>
);

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  title: string;
  skills: SkillItem[];
}

const groups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js",      icon: <SiReact /> },
      { name: "Next.js",       icon: <SiNextdotjs /> },
      { name: "React Native",  icon: <SiReact /> },
      { name: "Vite.js",       icon: <SiVitess /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",       icon: <SiNodedotjs /> },
      { name: "Express.js",    icon: <SiExpress /> },
      { name: "Prisma",        icon: <SiPrisma /> },
      { name: "Docker",        icon: <SiDocker /> },
    ],
  },
  {
    title: "AI & Data",
    skills: [
      { name: "Python",        icon: <SiPython /> },
      { name: "Hugging Face",  icon: <HuggingFaceIcon /> },
      { name: "PostgreSQL",    icon: <SiPostgresql /> },
      { name: "MongoDB",       icon: <SiMongodb /> },
    ],
  },
];

const SkillsSection: React.FC = () => (
  <section
    id="skills"
    className="section"
    style={{ background: "var(--color-bg)" }}
    aria-labelledby="skills-heading"
  >
    <div className="container">
      {/* Header */}
      <div className="mb-12">
        <span className="section-label animate-in">Expertise</span>
        <h2 id="skills-heading" className="text-h1 animate-in" style={{ transitionDelay: "80ms" }}>
          Stack &amp; Toolchain
        </h2>
        <p className="text-body-lg mt-4 max-w-xl animate-in" style={{ transitionDelay: "160ms" }}>
          Core technologies I use in production — proven through shipped systems.
        </p>
      </div>

      {/* 3-group grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div key={g.title} className="animate-in">
            {/* Group label */}
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text-tertiary)",
                marginBottom: "16px",
              }}
            >
              {g.title}
            </p>

            {/* 4-icon grid inside each group */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {g.skills.map((s) => (
                <div
                  key={s.name}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 12px",
                    textAlign: "center",
                    transition: "box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,122,107,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  }}
                >
                  <span
                    style={{
                      fontSize: "48px",
                      color: "var(--color-text-secondary)",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                    }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div aria-hidden="true" className="section-divider mt-16" />
  </section>
);

export default SkillsSection;
