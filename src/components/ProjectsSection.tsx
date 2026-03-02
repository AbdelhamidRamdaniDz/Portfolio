"use client";

import React, { useState } from "react";
import { ArrowRight, ExternalLink, Github, Layers, HeartPulse, Scale, LayoutDashboard } from "lucide-react";

/* ─── TYPES ───────────────────────────────────────────────── */

interface Metric {
  value: string;
  label: string;
  type: "performance" | "scalability" | "reliability" | "efficiency";
}

interface CaseStudy {
  id: string;
  icon: React.ReactNode;
  systemDiagram: React.ReactNode;
  title: string;
  sector: string;
  stack: string[];
  archDecision: {
    tag: string;
    headline: string;
    rationale: string;
  };
  metrics: Metric[];
  gravity: string;   // The Challenge
  lift: string;      // The Solution
  orbit: string;     // The Result
  href: string;
  githubUrl?: string;
}

/* ─── METRIC COLORS ──────────────────────────────────────── */

const metricColors = {
  performance:  { bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
  scalability:  { bg: "#EEF2FF", text: "#3730A3", dot: "#6366F1" },
  reliability:  { bg: "#FFF7ED", text: "#92400E", dot: "#F59E0B" },
  efficiency:   { bg: "#F0FDF4", text: "#14532D", dot: "#22C55E" },
};

/* ─── ABSTRACT SYSTEM DIAGRAMS ───────────────────────────── */

const GovFlowDiagram = () => (
  <svg width="100%" height="52" viewBox="0 0 280 52" fill="none" aria-hidden="true">
    {/* Nodes */}
    <rect x="2" y="14" width="52" height="24" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
    <text x="28" y="30" fontSize="9" fill="#4338CA" textAnchor="middle" fontWeight="600">Applicant</text>
    <rect x="72" y="14" width="52" height="24" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
    <text x="98" y="30" fontSize="9" fill="#4338CA" textAnchor="middle" fontWeight="600">Reviewer</text>
    <rect x="142" y="14" width="52" height="24" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
    <text x="168" y="30" fontSize="9" fill="#4338CA" textAnchor="middle" fontWeight="600">Admin</text>
    <rect x="212" y="14" width="64" height="24" rx="4" fill="#DCFCE7" stroke="#A7F3D0" strokeWidth="1.5"/>
    <text x="244" y="30" fontSize="9" fill="#065F46" textAnchor="middle" fontWeight="600">PDF + Audit</text>
    {/* Arrows */}
    <path d="M54 26 L72 26" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arr1)"/>
    <path d="M124 26 L142 26" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arr1)"/>
    <path d="M194 26 L212 26" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arr1)"/>
    <defs><marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#6366F1"/></marker></defs>
    {/* Step labels */}
    <text x="28" y="10" fontSize="7.5" fill="#9CA3AF" textAnchor="middle">01</text>
    <text x="98" y="10" fontSize="7.5" fill="#9CA3AF" textAnchor="middle">02</text>
    <text x="168" y="10" fontSize="7.5" fill="#9CA3AF" textAnchor="middle">03</text>
    <text x="244" y="10" fontSize="7.5" fill="#9CA3AF" textAnchor="middle">04</text>
  </svg>
);

const SaaSFlowDiagram = () => (
  <svg width="100%" height="52" viewBox="0 0 280 52" fill="none" aria-hidden="true">
    <rect x="2" y="14" width="48" height="24" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
    <text x="26" y="27" fontSize="8" fill="#4338CA" textAnchor="middle" fontWeight="600">Tenant A</text>
    <text x="26" y="36" fontSize="7" fill="#6366F1" textAnchor="middle">JWT scope</text>
    <rect x="72" y="8" width="60" height="36" rx="4" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5"/>
    <text x="102" y="25" fontSize="8" fill="#065F46" textAnchor="middle" fontWeight="600">Middleware</text>
    <text x="102" y="35" fontSize="7" fill="#15803D" textAnchor="middle">Enforce Scope</text>
    <rect x="154" y="14" width="52" height="24" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
    <text x="180" y="27" fontSize="8" fill="#4338CA" textAnchor="middle" fontWeight="600">MongoDB</text>
    <text x="180" y="36" fontSize="7" fill="#6366F1" textAnchor="middle">Shard/Tenant</text>
    <rect x="226" y="14" width="50" height="24" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
    <text x="251" y="27" fontSize="8" fill="#4338CA" textAnchor="middle" fontWeight="600">Tenant B</text>
    <text x="251" y="36" fontSize="7" fill="#6366F1" textAnchor="middle">JWT scope</text>
    <path d="M50 26 L72 26" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arr2)"/>
    <path d="M132 26 L154 26" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arr2)"/>
    <path d="M226 26 L206 26" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arr3)"/>
    <defs>
      <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#6366F1"/></marker>
      <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6 Z" fill="#6366F1"/></marker>
    </defs>
  </svg>
);

const HealthFlowDiagram = () => (
  <svg width="100%" height="52" viewBox="0 0 280 52" fill="none" aria-hidden="true">
    <rect x="2" y="8" width="60" height="36" rx="4" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.5"/>
    <text x="32" y="25" fontSize="8" fill="#9F1239" textAnchor="middle" fontWeight="600">Paramedic</text>
    <text x="32" y="35" fontSize="7" fill="#BE123C" textAnchor="middle">React Native</text>
    <rect x="108" y="8" width="64" height="36" rx="4" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5"/>
    <text x="140" y="22" fontSize="8" fill="#065F46" textAnchor="middle" fontWeight="600">Node.js API</text>
    <text x="140" y="32" fontSize="7" fill="#15803D" textAnchor="middle">WebSocket</text>
    <text x="140" y="40" fontSize="7" fill="#15803D" textAnchor="middle">real-time sync</text>
    <rect x="218" y="8" width="60" height="36" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5"/>
    <text x="248" y="25" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="600">Hospital</text>
    <text x="248" y="35" fontSize="7" fill="#2563EB" textAnchor="middle">Next.js</text>
    <path d="M62 26 L108 26" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arr4)"/>
    <path d="M172 26 L218 26" stroke="#22C55E" strokeWidth="1.5" markerEnd="url(#arr5)"/>
    <defs>
      <marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#F43F5E"/></marker>
      <marker id="arr5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#22C55E"/></marker>
    </defs>
  </svg>
);

const LegalFlowDiagram = () => (
  <svg width="100%" height="52" viewBox="0 0 280 52" fill="none" aria-hidden="true">
    <rect x="2" y="14" width="60" height="24" rx="4" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5"/>
    <text x="32" y="30" fontSize="8.5" fill="#92400E" textAnchor="middle" fontWeight="600">Submission</text>
    <rect x="80" y="14" width="60" height="24" rx="4" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5"/>
    <text x="110" y="30" fontSize="8.5" fill="#92400E" textAnchor="middle" fontWeight="600">Review</text>
    <rect x="158" y="14" width="60" height="24" rx="4" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5"/>
    <text x="188" y="30" fontSize="8.5" fill="#92400E" textAnchor="middle" fontWeight="600">Ruling</text>
    <rect x="236" y="14" width="42" height="24" rx="4" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5"/>
    <text x="257" y="30" fontSize="8.5" fill="#065F46" textAnchor="middle" fontWeight="600">Record</text>
    <path d="M62 26 L80 26" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#arr6)"/>
    <path d="M140 26 L158 26" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#arr6)"/>
    <path d="M218 26 L236 26" stroke="#22C55E" strokeWidth="1.5" markerEnd="url(#arr7)"/>
    <defs>
      <marker id="arr6" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#F59E0B"/></marker>
      <marker id="arr7" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#22C55E"/></marker>
    </defs>
  </svg>
);

/* ─── DATA ────────────────────────────────────────────────── */

const studies: CaseStudy[] = [
  {
    id: "public-service",
    icon: <Layers className="w-4 h-4" />,
    systemDiagram: <GovFlowDiagram />,
    title: "Government Digitization Platform",
    sector: "Public Sector · Algeria",
    stack: ["Next.js", "TypeScript", "Node.js", "PDF Gen"],
    archDecision: {
      tag: "State Machine vs. CRUD",
      headline: "Stateful Workflow Engine",
      rationale: "Strict regulatory stages demanded immutable state transitions — not free-form CRUD. Event-sourced audit log for dispute resolution.",
    },
    metrics: [
      { value: "−83%", label: "Processing Time", type: "performance" },
      { value: "12,450+", label: "Cases Digitized", type: "scalability" },
      { value: "0", label: "Lost Applications", type: "reliability" },
    ],
    gravity: "12,450+ paper applications. 90+ day resolution cycles. No audit trail. Complete opacity across applicant / reviewer / admin roles.",
    lift: "Stateful workflow engine with role-separated surfaces. Server-side PDF rendering. Automated email notifications at each stage transition. Full event log for every state change.",
    orbit: "15-day average resolution. 70% reduction in manual staff hours. Zero lost cases since go-live. Adopted by government body as permanent infrastructure.",
    href: "https://public-service-inspectorate.vercel.app/",
  },
  {
    id: "freeflow",
    icon: <LayoutDashboard className="w-4 h-4" />,
    systemDiagram: <SaaSFlowDiagram />,
    title: "Multi-Tenant SaaS Studio",
    sector: "Creative Agency · B2B SaaS",
    stack: ["Next.js", "MongoDB", "JWT", "Vercel"],
    archDecision: {
      tag: "Shared DB vs. Database-per-Tenant",
      headline: "Middleware-Scoped JWT Isolation",
      rationale: "Database-per-tenant offers the cleanest isolation but multiplies ops cost. Shared schema with compound index enforcement + middleware JWT scoping achieves isolation at <3ms overhead.",
    },
    metrics: [
      { value: "<200ms", label: "P95 Latency", type: "performance" },
      { value: "4 clients", label: "Onboarded in 30d", type: "scalability" },
      { value: "100%", label: "Isolation Record", type: "reliability" },
    ],
    gravity: "One platform, multiple enterprise clients. Any data leakage across tenants is a contractual and legal liability. Standard CMSes have no query-layer tenant enforcement.",
    lift: "Scoped JWT claims enforced at API middleware layer. MongoDB compound indexes (tenantId + resource). Single admin action to provision a new tenant — no infrastructure change.",
    orbit: "Zero cross-tenant data incidents across 12+ months of production. 4 enterprise clients live in 30 days. Sub-200ms P95 across concurrent multi-tenant load.",
    href: "https://free-flow-studios.vercel.app/",
    githubUrl: "https://github.com/AbdelhamidRamdaniDz",
  },
  {
    id: "urgo",
    icon: <HeartPulse className="w-4 h-4" />,
    systemDiagram: <HealthFlowDiagram />,
    title: "Emergency Health System",
    sector: "Health-Tech · Cross-Platform",
    stack: ["Next.js", "React Native", "Expo", "Node.js"],
    archDecision: {
      tag: "Monolith vs. Dual-Surface API",
      headline: "Single API, Two Surfaces",
      rationale: "Two separate APIs would create sync debt instantly. A single Node.js API with WebSocket events serves mobile (paramedic) and web (hospital) simultaneously from one source of truth.",
    },
    metrics: [
      { value: "Real-time", label: "Patient Data Sync", type: "performance" },
      { value: "1 API", label: "Two Surfaces", type: "efficiency" },
      { value: "2 platforms", label: "Mobile + Web", type: "scalability" },
    ],
    gravity: "Paramedics on mobile. Hospitals on desktop. Two disconnected systems. No shared state during transit. Critical patient data arrived after the patient.",
    lift: "Single Node.js API with WebSocket broadcast. React Native app (paramedic) and Next.js dashboard (hospital) both subscribe to the same event stream. Interactive map routing for both.",
    orbit: "Hospital receives patient intake data before ambulance arrival. Unified real-time coordination replaced fragmented phone-based handoffs across two platform surfaces.",
    href: "https://hospital-front-opal.vercel.app/",
  },
  {
    id: "arbitration",
    icon: <Scale className="w-4 h-4" />,
    systemDiagram: <LegalFlowDiagram />,
    title: "Digital Arbitration Center",
    sector: "LegalTech · Algeria",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    archDecision: {
      tag: "UX-First vs. Compliance-First",
      headline: "Legal UX: Clarity Over Beauty",
      rationale: "Legal tech users are not consumer app users. Every design decision subordinated to: unambiguous stage labeling, full document record, formal legalese UX language over marketing copy.",
    },
    metrics: [
      { value: "#1", label: "Platform in Algeria", type: "reliability" },
      { value: "100%", label: "Cases Documented", type: "efficiency" },
      { value: "Remote", label: "Access Enabled", type: "scalability" },
    ],
    gravity: "No digital arbitration platform existed for Algeria's sports and commercial sectors. Cases managed by phone. No audit trail. Commercial clients demanded formal documentation.",
    lift: "Document-first architecture: every case stage creates an immutable record. Formal typography and structured legal language chosen deliberately over consumer-app aesthetics. Jurisdictional scope defined at submission.",
    orbit: "First dedicated digital arbitration platform in Algeria. Replaced ad-hoc phone processes with fully documented, remotely accessible case flows. Geographic barriers removed for commercial clients.",
    href: "https://sports-arbitration-center.vercel.app/",
  },
];

/* ─── METRIC PILL ─────────────────────────────────────────── */

function MetricPill({ m }: { m: Metric }) {
  const c = metricColors[m.type];
  return (
    <div
      style={{
        background: c.bg,
        borderRadius: "8px",
        padding: "8px 10px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <p
        className="tabular-nums"
        style={{ fontSize: "16px", fontWeight: 700, color: c.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}
      >
        {m.value}
      </p>
      <p style={{ fontSize: "10px", color: c.text, opacity: 0.7, fontWeight: 500, marginTop: "2px", letterSpacing: "0.02em" }}>
        {m.label}
      </p>
    </div>
  );
}

/* ─── CASE STUDY CARD ──────────────────────────────────────── */

function CaseCard({ cs }: { cs: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      aria-labelledby={`cs-title-${cs.id}`}
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #EAEAE6",
        /* Antigravity floating shadow */
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(27,79,216,0.09), 0 1px 4px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* ── Corner tag ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          background: "#F8F8F6",
          border: "1px solid #E4E4E0",
          borderRadius: "20px",
          padding: "3px 9px",
          fontSize: "9px",
          fontWeight: 700,
          color: "#909090",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          zIndex: 2,
        }}
        aria-label="Architecture decision approach"
      >
        Logic &gt; Intuition
      </div>

      {/* ── Section A: Header ─────────────────────────── */}
      <div style={{ padding: "20px 20px 0" }}>
        {/* Icon + title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "4px", paddingRight: "80px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "var(--color-accent-light)",
              color: "var(--color-accent)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2px",
            }}
            aria-hidden="true"
          >
            {cs.icon}
          </div>
          <h3
            id={`cs-title-${cs.id}`}
            style={{ fontSize: "17px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.25, letterSpacing: "-0.02em" }}
          >
            {cs.title}
          </h3>
        </div>
        <p style={{ fontSize: "11px", color: "#909090", fontWeight: 500, marginBottom: "12px", paddingLeft: "40px" }}>
          {cs.sector}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {cs.stack.map((t) => (
            <span
              key={t}
              style={{
                background: "#F2F2F0",
                color: "#525252",
                fontSize: "10px",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "20px",
                letterSpacing: "0.02em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Abstract system flow diagram */}
        <div
          style={{
            background: "#FAFAFE",
            border: "1px solid #EAEAF6",
            borderRadius: "10px",
            padding: "10px 10px 6px",
            marginBottom: "14px",
            overflow: "hidden",
          }}
          aria-label={`System architecture diagram for ${cs.title}`}
        >
          {cs.systemDiagram}
        </div>
      </div>

      {/* ── Section B: Architecture Decision ─────────── */}
      <div
        style={{
          margin: "0 14px 14px",
          background: "#EEF2FF",
          border: "1px solid #C7D2FE",
          borderRadius: "10px",
          padding: "12px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span
            style={{
              background: "#1B4FD8",
              color: "#fff",
              fontSize: "9px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "20px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Architecture Decision
          </span>
          <span style={{ fontSize: "10px", color: "#6366F1", fontWeight: 600 }}>{cs.archDecision.tag}</span>
        </div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px", letterSpacing: "-0.01em" }}>
          {cs.archDecision.headline}
        </p>
        <p style={{ fontSize: "11.5px", color: "#525252", lineHeight: 1.55 }}>
          {cs.archDecision.rationale}
        </p>
      </div>

      {/* ── Section C: Metrics Bar ────────────────────── */}
      <div style={{ padding: "0 14px 14px" }}>
        <p
          style={{
            fontSize: "9px",
            fontWeight: 700,
            color: "#909090",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "7px",
          }}
        >
          Measurable Outcomes
        </p>
        <div style={{ display: "flex", gap: "6px" }}>
          {cs.metrics.map((m) => (
            <MetricPill key={m.label} m={m} />
          ))}
        </div>
      </div>

      {/* ── Section D: Gravity / Lift / Orbit ─────────── */}
      <div
        style={{
          borderTop: "1px solid #EAEAE6",
          padding: "12px 14px",
          flex: 1,
        }}
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full text-left"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-expanded={expanded}
          aria-controls={`case-body-${cs.id}`}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#909090",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Case Study
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "var(--color-accent)",
              fontWeight: 600,
              transition: "transform 0.2s",
              display: "inline-flex",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        {expanded && (
          <div
            id={`case-body-${cs.id}`}
            style={{ marginTop: "10px" }}
          >
            {[
              { key: "Gravity",  value: cs.gravity,  color: "#BE185D" },
              { key: "Lift",     value: cs.lift,      color: "#1B4FD8" },
              { key: "Orbit",    value: cs.orbit,     color: "#065F46" },
            ].map(({ key, value, color }) => (
              <div key={key} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    minWidth: "42px",
                    paddingTop: "2px",
                    flexShrink: 0,
                  }}
                >
                  {key}
                </span>
                <p style={{ fontSize: "12px", color: "#525252", lineHeight: 1.6, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Section E: Action buttons ─────────────────── */}
      <div
        style={{
          borderTop: "1px solid #EAEAE6",
          padding: "12px 14px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <a
          href={cs.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View live case study for ${cs.title}`}
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--color-accent)",
            border: "1.5px solid var(--color-accent)",
            borderRadius: "6px",
            padding: "6px 12px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "background 0.15s, color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-accent)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
          }}
        >
          View Case Study
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>

        {cs.githubUrl ? (
          <a
            href={cs.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View codebase for ${cs.title}`}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#525252",
              border: "1.5px solid #E4E4E0",
              borderRadius: "6px",
              padding: "6px 12px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A1A1A";
              (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E4E4E0";
              (e.currentTarget as HTMLAnchorElement).style.color = "#525252";
            }}
          >
            Codebase
            <Github className="w-3 h-3" aria-hidden="true" />
          </a>
        ) : (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#C0C0BC",
              border: "1.5px solid #EAEAE6",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "not-allowed",
              userSelect: "none",
            }}
          >
            Private Codebase
          </span>
        )}
      </div>
    </article>
  );
}

/* ─── SECTION ─────────────────────────────────────────────── */

const ProjectsSection: React.FC = () => (
  <section
    id="work"
    className="section"
    style={{ background: "var(--color-bg)" }}
    aria-labelledby="work-heading"
  >
    <div className="container">

      {/* Section header */}
      <div className="mb-14">
        <span className="section-label animate-in">Case Studies</span>
        <h2 id="work-heading" className="text-h1 animate-in mt-2" style={{ transitionDelay: "80ms" }}>
          Selected Work
        </h2>
        <p className="text-body-lg mt-4 max-w-lg animate-in" style={{ transitionDelay: "160ms" }}>
          Architecture decisions, engineering trade-offs, and measurable outcomes.
        </p>
      </div>

      {/* 2-column card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 500px), 1fr))",
          gap: "28px",
        }}
        role="list"
      >
        {studies.map((cs) => (
          <div key={cs.id} role="listitem">
            <CaseCard cs={cs} />
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <a
          href="https://github.com/AbdelhamidRamdaniDz"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "10px 20px",
            textDecoration: "none",
            background: "var(--color-surface)",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-accent)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-secondary)";
          }}
        >
          View All Projects
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>

    <div aria-hidden="true" className="section-divider mt-16" />
  </section>
);

export default ProjectsSection;