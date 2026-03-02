"use client";

import React from "react";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiThreedotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiGo, SiJsonwebtokens,
  SiPython, SiTensorflow,
  SiDocker, SiGit, SiGithub, SiVercel, SiPostman, SiFigma,
} from "react-icons/si";

interface SkillGroup {
  title: string;
  skills: { name: string; icon: React.ReactNode }[];
}

const groups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "Next.js",      icon: <SiNextdotjs /> },
      { name: "React",        icon: <SiReact /> },
      { name: "TypeScript",   icon: <SiTypescript /> },
      { name: "TailwindCSS",  icon: <SiTailwindcss /> },
      { name: "Three.js",     icon: <SiThreedotjs /> },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js",    icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB",    icon: <SiMongodb /> },
      { name: "Go",         icon: <SiGo /> },
      { name: "JWT / Auth", icon: <SiJsonwebtokens /> },
    ],
  },
  {
    title: "AI & Data",
    skills: [
      { name: "Python",     icon: <SiPython /> },
      { name: "TensorFlow", icon: <SiTensorflow /> },
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      { name: "Docker",      icon: <SiDocker /> },
      { name: "Git",         icon: <SiGit /> },
      { name: "GitHub",      icon: <SiGithub /> },
      { name: "Vercel",      icon: <SiVercel /> },
      { name: "Postman",     icon: <SiPostman /> },
      { name: "Figma",       icon: <SiFigma /> },
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
          Technologies I use in production. Proficiency is demonstrated through shipped systems, not percentages.
        </p>
      </div>

      {/* 4-column category grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {groups.map((g) => (
          <div
            key={g.title}
            className="card animate-in"
            style={{ padding: "var(--sp-5)" }}
          >
            {/* Category title */}
            <h3
              className="text-caption mb-5"
              style={{
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {g.title}
            </h3>

            {/* Skills list */}
            <ul className="space-y-3">
              {g.skills.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <span
                    className="text-lg flex-shrink-0"
                    style={{ color: "var(--color-text-secondary)" }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {s.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p
        className="mt-8 text-caption text-center"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        Expertise is proven through the case studies below — not self-reported percentages.
      </p>
    </div>

    <div aria-hidden="true" className="section-divider mt-16" />
  </section>
);

export default SkillsSection;
