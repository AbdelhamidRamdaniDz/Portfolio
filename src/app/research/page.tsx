"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, Github } from "lucide-react";
import { researchEntries, categories, type ResearchEntry, type ResearchCategory } from "@/lib/research";
import PageFooter from "@/components/PageFooter";

const statusConfig = {
  published:    { label: "Published",    bg: "#dcfce7", color: "#166534" },
  submitted:    { label: "Under Review", bg: "#fef9c3", color: "#854d0e" },
  "in-progress":{ label: "In Progress",  bg: "var(--color-accent-light)", color: "var(--color-accent)" },
};

function ResearchCard({ entry }: { entry: ResearchEntry }) {
  const [open, setOpen] = useState(false);
  const status = statusConfig[entry.status];

  return (
    <article
      className="card"
      style={{ padding: "var(--sp-5)" }}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-start gap-3 mb-4">
        {/* Domain tag */}
        <span
          className="text-caption px-2.5 py-1 rounded-md font-semibold"
          style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}
        >
          {entry.domain}
        </span>

        {/* Status badge */}
        <span
          className="text-caption px-2.5 py-1 rounded-md font-semibold"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>

        {entry.citationCount != null && (
          <span className="text-caption ml-auto" style={{ color: "var(--color-text-tertiary)" }}>
            {entry.citationCount} citations
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-2 leading-snug"
        style={{ fontSize: "16px", color: "var(--color-text-primary)" }}
      >
        {entry.title}
      </h3>

      {/* Venue + year */}
      {entry.venue && (
        <p className="text-caption mb-3" style={{ color: "var(--color-text-tertiary)" }}>
          {entry.venue} · {entry.year}
        </p>
      )}

      {/* Note */}
      {entry.note && (
        <p className="text-sm italic mb-4" style={{ color: "var(--color-text-tertiary)" }}>
          {entry.note}
        </p>
      )}

      {/* Collapsible abstract */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium mb-3 transition-colors duration-150"
        style={{ color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        aria-expanded={open}
        aria-controls={`abstract-${entry.id}`}
      >
        {open
          ? <ChevronDown className="w-4 h-4" aria-hidden="true" />
          : <ChevronRight className="w-4 h-4" aria-hidden="true" />
        }
        {open ? "Hide abstract" : "Read abstract"}
      </button>

      {open && (
        <div
          id={`abstract-${entry.id}`}
          className="rounded-lg p-4 mb-4 text-body"
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            lineHeight: 1.75,
          }}
        >
          {entry.abstract}
        </div>
      )}

      {/* IEEE citation */}
      {entry.ieeecitation && (
        <div className="mb-4">
          <p className="text-caption mb-1.5" style={{ color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            IEEE Citation
          </p>
          <p
            className="text-sm font-mono"
            style={{
              color: "var(--color-text-secondary)",
              background: "var(--color-surface-2)",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid var(--color-border)",
              lineHeight: 1.6,
            }}
          >
            {entry.ieeecitation}
          </p>
        </div>
      )}

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {entry.keywords.map((kw) => (
          <span
            key={kw}
            className="text-caption px-2 py-0.5 rounded"
            style={{
              background: "var(--color-surface-2)",
              color: "var(--color-text-tertiary)",
              border: "1px solid var(--color-border)",
            }}
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
        {entry.pdfUrl && entry.pdfUrl !== "#" && (
          <a
            href={entry.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
            style={{ color: "var(--color-accent)", textDecoration: "none" }}
            aria-label={`Download PDF of ${entry.title}`}
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            PDF
          </a>
        )}
        {entry.pdfUrl === "#" && (
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            PDF (coming soon)
          </span>
        )}
        {entry.githubUrl && (
          <a
            href={entry.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
            style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}
            aria-label={`GitHub repository for ${entry.title}`}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            Repository
          </a>
        )}
      </div>
    </article>
  );
}

function CategorySection({ cat }: { cat: ResearchCategory }) {
  const entries = researchEntries.filter((e) => e.category === cat);
  if (entries.length === 0) return null;

  return (
    <section aria-labelledby={`cat-${cat}`} className="mb-14">
      <div
        className="flex items-center gap-4 mb-6 pb-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <h2
          id={`cat-${cat}`}
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          {cat}
        </h2>
        <span
          className="text-caption px-2.5 py-1 rounded-full font-semibold"
          style={{ background: "var(--color-surface-2)", color: "var(--color-text-tertiary)", border: "1px solid var(--color-border)" }}
        >
          {entries.length}
        </span>
      </div>
      <div className="grid gap-5">
        {entries.map((e) => (
          <ResearchCard key={e.id} entry={e} />
        ))}
      </div>
    </section>
  );
}

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredCategories = categories;
  const filteredEntries = activeFilter === "All"
    ? researchEntries
    : researchEntries.filter((e) => e.domain === activeFilter);

  const domains = ["All", "AI & ML", "Big Data", "System Architecture", "Cyber-Physical Systems", "Full-Stack Engineering"];

  return (
    <main
      style={{ background: "var(--color-bg)", minHeight: "100vh", paddingTop: "88px" }}
      aria-label="Research & Publications — Abdelhamid Ramdani"
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
          <span className="section-label">Academic</span>
          <h1 className="text-h1 mt-2 mb-4">Research &amp; Publications</h1>
          <p className="text-body-lg max-w-xl">
            Peer-reviewed submissions, ongoing Master&apos;s research in AI systems, and technical whitepapers
            on production architecture. Affiliated with Ziane Achour University, Djelfa.
          </p>

          {/* Domain filter */}
          <div className="flex flex-wrap gap-2 mt-8" role="group" aria-label="Filter by domain">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                aria-pressed={activeFilter === d}
                className="text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-150"
                style={{
                  background: activeFilter === d ? "var(--color-accent)" : "var(--color-surface)",
                  color: activeFilter === d ? "#fff" : "var(--color-text-secondary)",
                  borderColor: activeFilter === d ? "var(--color-accent)" : "var(--color-border)",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--sp-10)", paddingBottom: "var(--sp-16)" }}>
        {activeFilter === "All" ? (
          // Category-grouped view
          categories.map((cat) => <CategorySection key={cat} cat={cat} />)
        ) : (
          // Flat filtered view
          <div className="grid gap-5">
            {filteredEntries.length === 0 ? (
              <p className="text-body" style={{ color: "var(--color-text-tertiary)" }}>
                No entries in this domain.
              </p>
            ) : (
              filteredEntries.map((e) => <ResearchCard key={e.id} entry={e} />)
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div
          className="mt-10 p-5 rounded-lg"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
            <strong style={{ color: "var(--color-text-secondary)" }}>Note on research status:</strong>{" "}
            Entries marked &quot;In Progress&quot; represent active research. Entries marked &quot;Under Review&quot;
            are submitted and awaiting editorial decision. Abstracts for in-progress work describe the current
            research direction and may change as the work evolves.
          </p>
        </div>
      </div>

      <span className="sr-only">Research &amp; Publications — Abdelhamid Ramdani</span>
      <PageFooter />
    </main>
  );
}
