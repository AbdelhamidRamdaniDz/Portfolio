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
  accentGradient: string;
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
  performance:  { bg: "var(--color-accent-muted)", text: "var(--color-accent)",   dot: "var(--color-accent)" },
  scalability:  { bg: "var(--color-accent-muted)", text: "var(--color-accent)",   dot: "var(--color-accent)" },
  reliability:  { bg: "var(--color-border)",        text: "var(--color-text-tertiary)", dot: "var(--color-text-tertiary)" },
  efficiency:   { bg: "var(--color-accent-muted)", text: "var(--color-accent)",   dot: "var(--color-accent)" },
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
    id: "urgo",
    icon: <HeartPulse className="w-4 h-4" />,
    systemDiagram: <HealthFlowDiagram />,
    title: "URGO — Emergency Response System",
    sector: "Health-Tech · Web + Mobile",
    stack: ["React Native", "Node.js", "MongoDB"],
    accentGradient: "linear-gradient(135deg, #F43F5E 0%, #FB7185 50%, #FDA4AF 100%)",
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
    lift: "Web + Mobile platform for hospitals & paramedics. Interactive map navigation, real-time patient data transmission, bed availability tracking, analytics dashboard.",
    orbit: "Hospital receives patient intake data before ambulance arrival. Unified real-time coordination replaced fragmented phone-based handoffs across two platform surfaces.",
    href: "https://hospital-front-opal.vercel.app/",
  },
  {
    id: "freeflow",
    icon: <LayoutDashboard className="w-4 h-4" />,
    systemDiagram: <SaaSFlowDiagram />,
    title: "FreeFlow — SaaS for Algerian SMEs",
    sector: "Cross-Platform · Web, Desktop & Mobile",
    stack: ["Next.js", "Express.js", "MongoDB", "Hugging Face"],
    accentGradient: "linear-gradient(135deg, #0D7A6B 0%, #14B8A6 50%, #5EEAD4 100%)",
    archDecision: {
      tag: "Shared DB vs. Database-per-Tenant",
      headline: "Middleware-Scoped JWT Isolation",
      rationale: "Database-per-tenant offers the cleanest isolation but multiplies ops cost. Shared schema with compound index enforcement + middleware JWT scoping achieves isolation at <3ms overhead.",
    },
    metrics: [
      { value: "<200ms", label: "P95 Latency", type: "performance" },
      { value: "AI-driven", label: "Process Automation", type: "scalability" },
      { value: "100%", label: "Isolation Record", type: "reliability" },
    ],
    gravity: "Algerian SMEs need affordable, localized SaaS tools. No cross-platform solution existed with AI-driven automation and proper tenant isolation.",
    lift: "Cross-platform SaaS (Web, Desktop & Mobile) with AI-driven process automation, UX/UI refinement, branding & content creation tools. Hugging Face API integration.",
    orbit: "Incubated startup delivering AI-powered business tools to Algerian SMEs. Sub-200ms P95 latency across concurrent multi-tenant load.",
    href: "https://free-flow-studios.vercel.app/",
    githubUrl: "https://github.com/AbdelhamidRamdaniDz",
  },
  {
    id: "public-service",
    icon: <Layers className="w-4 h-4" />,
    systemDiagram: <GovFlowDiagram />,
    title: "Public Service Inspectorate",
    sector: "Gov E-Service · Algeria",
    stack: ["Next.js", "Node.js"],
    accentGradient: "linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #A5B4FC 100%)",
    archDecision: {
      tag: "State Machine vs. CRUD",
      headline: "Stateful Workflow Engine",
      rationale: "Strict regulatory stages demanded immutable state transitions — not free-form CRUD. Event-sourced audit log for dispute resolution.",
    },
    metrics: [
      { value: "12,450+", label: "Requests Simulated", type: "scalability" },
      { value: "15 days", label: "Processing Target", type: "performance" },
      { value: "0", label: "Lost Applications", type: "reliability" },
    ],
    gravity: "Diploma equivalence requests handled entirely on paper. 90+ day resolution cycles. No audit trail. Complete opacity for applicants.",
    lift: "Digitalized diploma equivalence requests with real-time tracking and admin analytics. Stateful workflow engine with role-separated surfaces. Server-side PDF rendering.",
    orbit: "15-day average processing target. 12,450+ processed requests simulated. Zero lost cases. Adopted as permanent infrastructure prototype.",
    href: "https://public-service-inspectorate.vercel.app/",
  },
  {
    id: "minha",
    icon: <Layers className="w-4 h-4" />,
    systemDiagram: <GovFlowDiagram />,
    title: "minha — Automation Bot",
    sector: "Python Automation · Telegram",
    stack: ["Python", "Telegram API"],
    accentGradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #93C5FD 100%)",
    archDecision: {
      tag: "Manual vs. Automated",
      headline: "Telegram-Controlled Automation",
      rationale: "Users needed remote control over the booking process. Telegram bot interface provides instant notifications and control without building a custom mobile app.",
    },
    metrics: [
      { value: "Auto", label: "Booking Process", type: "efficiency" },
      { value: "Remote", label: "Telegram Control", type: "scalability" },
      { value: "24/7", label: "Monitoring", type: "reliability" },
    ],
    gravity: "ANEM unemployment benefit appointments required manual checking and booking — a repetitive, time-sensitive process that users often missed.",
    lift: "Python automation bot that handles ANEM appointment booking end-to-end with Telegram remote control for monitoring and triggering actions.",
    orbit: "Fully automated appointment booking system accessible via Telegram. Eliminated manual checking and reduced missed appointment windows.",
    href: "#",
  },
  {
    id: "waslaauto",
    icon: <LayoutDashboard className="w-4 h-4" />,
    systemDiagram: <SaaSFlowDiagram />,
    title: "waslaauto — Automotive E-Commerce",
    sector: "E-Commerce · Cross-Border",
    stack: ["Next.js", "Node.js", "MongoDB"],
    accentGradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FCD34D 100%)",
    archDecision: {
      tag: "Marketplace vs. Direct Sales",
      headline: "Cross-Border Inventory Bridge",
      rationale: "Connecting Chinese vehicle market to Algerian consumers requires real-time inventory sync, currency handling, and localized product presentation.",
    },
    metrics: [
      { value: "Full", label: "Inventory System", type: "efficiency" },
      { value: "Cross-border", label: "Market Bridge", type: "scalability" },
      { value: "Real-time", label: "Stock Sync", type: "performance" },
    ],
    gravity: "No direct platform existed for Algerian consumers to browse and purchase vehicles from the Chinese market. Fragmented communication and no centralized inventory.",
    lift: "Automotive e-commerce platform connecting Chinese vehicle market to Algerian consumers with full inventory management system.",
    orbit: "Centralized cross-border automotive marketplace with complete inventory management replacing fragmented import processes.",
    href: "#",
  },
  {
    id: "colorea",
    icon: <Scale className="w-4 h-4" />,
    systemDiagram: <LegalFlowDiagram />,
    title: "colorea — Food Colorants E-Commerce",
    sector: "E-Commerce · Health & Food",
    stack: ["Next.js", "Node.js", "Stripe"],
    accentGradient: "linear-gradient(135deg, #059669 0%, #34D399 50%, #A7F3D0 100%)",
    archDecision: {
      tag: "Traditional vs. Direct",
      headline: "Direct-to-Consumer Platform",
      rationale: "Cutting out middlemen for natural food colorants required building trust through transparent sourcing and integrated electronic payments.",
    },
    metrics: [
      { value: "Direct", label: "Purchasing", type: "efficiency" },
      { value: "E-Pay", label: "Electronic Payments", type: "scalability" },
      { value: "Natural", label: "Herb-Based Products", type: "reliability" },
    ],
    gravity: "Natural herb-based food colorants were only available through traditional distribution channels with no online purchasing or electronic payment options.",
    lift: "Direct purchasing platform with electronic payments for natural herb-based food colorants. Transparent product sourcing and order management.",
    orbit: "Healthy food colorants now available for direct purchase online with integrated electronic payment processing.",
    href: "#",
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
        style={{ fontSize: "20px", fontWeight: 800, color: c.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}
      >
        {m.value}
      </p>
      <p style={{ fontSize: "11px", color: c.text, opacity: 0.7, fontWeight: 500, marginTop: "3px", letterSpacing: "0.02em" }}>
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
      {/* ── Gradient banner ──────────────────────────── */}
      <div
        style={{
          height: "6px",
          background: cs.accentGradient,
          flexShrink: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Corner tag ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sharp)",
          padding: "3px 9px",
          fontSize: "9px",
          fontWeight: 700,
          color: "var(--color-text-tertiary)",
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
              background: "var(--color-accent-muted)",
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

        {/* Tech tags — .tag-primary for stack items */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {cs.stack.map((t) => (
            <span key={t} className="tag-primary">{t}</span>
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
          background: "var(--color-accent-muted)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)",
          padding: "12px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontSize: "9px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "var(--radius-sharp)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Architecture Decision
          </span>
          <span style={{ fontSize: "10px", color: "var(--color-accent)", fontWeight: 600 }}>{cs.archDecision.tag}</span>
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
              { key: "Gravity",  value: cs.gravity,  color: "var(--color-accent)" },
              { key: "Lift",     value: cs.lift,      color: "var(--color-text-primary)" },
              { key: "Orbit",    value: cs.orbit,     color: "var(--color-text-secondary)" },
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
            fontSize: "13px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: "var(--color-accent)",
            border: "1.5px solid var(--color-accent)",
            borderRadius: "var(--radius-sharp)",
            padding: "8px 16px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "background 0.15s, transform 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-accent-hover)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-accent)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
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
              color: "var(--color-text-secondary)",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-sharp)",
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
          gap: "24px",
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
          className="btn-ghost text-link"
          style={{ gap: "8px" }}
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