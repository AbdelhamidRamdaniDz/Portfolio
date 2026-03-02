"use client";

import React, { useState } from "react";
import { ExternalLink, CheckCircle } from "lucide-react";
import { certifications, type Certification } from "@/lib/certifications";
import PageFooter from "@/components/PageFooter";

const domainFilters = ["All", "Frontend", "Backend", "AI & ML", "Full-Stack", "Data Science", "DevOps"] as const;

function CertCard({ cert }: { cert: Certification }) {
  // Initials from organization
  const initials = cert.organization
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* Header row */}
      <div className="flex items-start gap-4 mb-5">
        {/* Org badge */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
          style={{ background: cert.color, letterSpacing: "-0.02em" }}
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-bold leading-snug mb-0.5"
            style={{ fontSize: "15px", color: "var(--color-text-primary)" }}
          >
            {cert.title}
          </h3>
          <p className="text-caption">
            {cert.organization} · {cert.year}
          </p>
        </div>

        {/* Domain tag */}
        <span
          className="text-caption px-2.5 py-1 rounded-md flex-shrink-0"
          style={{
            background: "var(--color-accent-light)",
            color: "var(--color-accent)",
            fontWeight: 600,
          }}
        >
          {cert.domain}
        </span>
      </div>


      {/* Skills */}
      <div className="mb-5 flex-1">
        <p className="text-caption mb-2.5" style={{ color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Skills covered
        </p>
        <ul className="space-y-1.5">
          {cert.skills.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <CheckCircle
                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                style={{ color: "var(--color-accent)" }}
                aria-hidden="true"
              />
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Verify link */}
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-colors duration-150"
        style={{ color: "var(--color-accent)", textDecoration: "none" }}
        aria-label={`Verify ${cert.title} certification`}
      >
        Verify Certificate
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
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
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by domain">
          {domainFilters.map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              aria-pressed={domain === d}
              className="text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-150"
              style={{
                background: domain === d ? "var(--color-accent)" : "var(--color-surface)",
                color: domain === d ? "#fff" : "var(--color-text-secondary)",
                borderColor: domain === d ? "var(--color-accent)" : "var(--color-border)",
              }}
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
        <h1>Professional Certifications — Abdelhamid Ramdani, Technical Product Architect</h1>
      </div>
      <PageFooter />
    </main>
  );
}
