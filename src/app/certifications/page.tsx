"use client";

import React, { useState } from "react";
import { ExternalLink, CheckCircle } from "lucide-react";
import { certifications, type Certification } from "@/lib/certifications";
import PageFooter from "@/components/PageFooter";

const domainFilters = ["All", "Frontend", "Backend", "AI & ML", "Full-Stack", "Data Science", "DevOps"] as const;

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div
      className="card card-interactive"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header row — title left, badge right (avatar removed) */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3
            className="text-h4"
            style={{ fontSize: "15px", fontWeight: 700 }}
          >
            {cert.title}
          </h3>
          <p className="text-caption" style={{ marginTop: "4px" }}>
            {cert.organization} · {cert.year}
          </p>
        </div>

        {/* Domain tag — single color system */}
        <span className="tag-primary" style={{ flexShrink: 0 }}>
          {cert.domain}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--color-border)", margin: "0 0 16px" }} />

      {/* Skills */}
      <div className="mb-4 flex-1">
        <p
          className="text-caption"
          style={{
            color: "var(--color-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          Skills covered
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {cert.skills.slice(0, 4).map((s) => (
            <li key={s} className="flex items-start gap-2">
              <CheckCircle
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "var(--color-accent)", marginTop: "2px" }}
                aria-hidden="true"
              />
              <span className="text-body-sm">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Verify link */}
      <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px", marginTop: "auto" }}>
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-body-sm font-medium transition-colors duration-150"
          style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: 500 }}
          aria-label={`Verify ${cert.title} certification`}
        >
          Verify Certificate
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  const [domain, setDomain] = useState<string>("All");

  const filtered = domain === "All"
    ? certifications
    : certifications.filter((c) => c.domain === domain);

  return (
    <main
      style={{ background: "var(--color-bg)", minHeight: "100vh", paddingTop: "88px" }}
      aria-label="Certifications — Abdelhamid Ramdani"
    >
      {/* Header */}
      <div
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "var(--sp-12) 0 var(--sp-8)",
        }}
      >
        <div className="container">
          <span className="section-label">Credentials</span>
          <h1 className="text-h1 mt-2 mb-4">Certifications</h1>
          <p className="text-body-lg max-w-xl">
            Validated competencies in frontend, backend, data science, and AI.
            Each certification reflects focused, structured learning applied to shipped production systems.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-12)" }}>
        {/* Domain filter */}
        <div className="flex flex-wrap gap-2" style={{ marginBottom: "var(--sp-8)" }} role="group" aria-label="Filter by domain">
          {domainFilters.map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              aria-pressed={domain === d}
              className={`filter-tab${domain === d ? " filter-tab--active" : ""}`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>

      </div>

      <div className="sr-only">
        <h1>Professional Certifications — Abdelhamid Ramdani, Full-Stack Developer & AI Engineer</h1>
      </div>
      <PageFooter />
    </main>
  );
}
