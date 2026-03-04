"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Mail } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ── Reading Progress Bar ─────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "2px",
        background: "var(--color-accent)",
        zIndex: 60,
        transition: "width 50ms linear",
      }}
    />
  );
}

/* ── Section Block ────────────────────────────────────── */
function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "var(--color-text-tertiary)",
          marginBottom: "12px",
          marginTop: "48px",
        }}
      >
        {label}
      </h2>
      {children}
    </div>
  );
}

/* ── Code Block (Dark) ────────────────────────────────── */
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        margin: "32px 0",
        background: "#0d0d0d",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          height: "40px",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        >
          {language ?? "code"}
        </span>
        <button
          onClick={copy}
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: copied ? "#22C55E" : "rgba(255,255,255,0.4)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "2px 8px",
            borderRadius: "4px",
            transition: "color 150ms ease",
          }}
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <pre
        style={{
          overflowX: "auto",
          padding: "20px 24px",
          margin: 0,
          color: "#E2E8F0",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: "13px",
          lineHeight: 1.7,
          whiteSpace: "pre",
          wordWrap: "normal",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Key Insights ─────────────────────────────────────── */
function KeyInsights({ insights }: { insights: string[] }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        padding: "24px",
        marginTop: "16px",
      }}
    >
      <ul style={{ display: "flex", flexDirection: "column", gap: "16px", margin: 0, padding: 0, listStyle: "none" }}>
        {insights.map((insight, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <span
              style={{
                flexShrink: 0,
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "var(--color-accent)",
                color: "var(--color-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "11px",
                marginTop: "2px",
              }}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="text-body" style={{ color: "var(--color-text-primary)" }}>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Article Page ─────────────────────────────────────── */
export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const mailtoHref = `mailto:abdelhamidramdani17@gmail.com?subject=${encodeURIComponent(`Discussion: ${post.title}`)}&body=${encodeURIComponent(`Hi Abdelhamid,\n\nI read your article "${post.title}" and wanted to discuss it.\n\n`)}`;

  return (
    <main
      style={{ background: "var(--color-bg)", minHeight: "100vh", paddingTop: "88px" }}
      aria-label={`Article: ${post.title}`}
    >
      <ReadingProgress />

      {/* ── Article Header ──────────────────────────────── */}
      <div
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "var(--sp-10) 0 var(--sp-8)",
        }}
      >
        <div className="container" style={{ maxWidth: "720px" }}>
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-body-sm transition-colors duration-150"
            style={{
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              marginBottom: "32px",
              display: "inline-flex",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to writing
          </Link>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center"
            style={{ gap: "12px", marginBottom: "24px" }}
          >
            <span className="tag-primary">{post.category}</span>
            <span
              aria-hidden="true"
              style={{
                width: "1px",
                height: "12px",
                background: "var(--color-border)",
              }}
            />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" style={{ color: "var(--color-text-tertiary)" }} aria-hidden />
              <span className="text-caption">{post.readingTime} min read</span>
            </span>
            <span
              aria-hidden="true"
              style={{
                width: "1px",
                height: "12px",
                background: "var(--color-border)",
              }}
            />
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-h1" style={{ maxWidth: "720px", lineHeight: 1.1, marginBottom: "24px" }}>
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg" style={{ maxWidth: "640px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
            {post.abstract}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap" style={{ gap: "8px", marginBottom: "0" }}>
            {post.keywords.map((kw) => (
              <span
                key={kw}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "28px",
                  padding: "0 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "var(--color-text-secondary)",
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Article Body ────────────────────────────────── */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          paddingTop: "var(--sp-10)",
          paddingBottom: "var(--sp-16)",
          paddingLeft: "var(--sp-3)",
          paddingRight: "var(--sp-3)",
        }}
      >
        {/* Horizontal rule */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "var(--color-border)",
            marginBottom: "var(--sp-8)",
          }}
        />

        <article>
          {/* 1. Executive Summary */}
          <SectionBlock label="Executive Summary">
            <div
              style={{
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: "0 8px 8px 0",
                background: "var(--color-accent-muted)",
                padding: "20px 20px 20px 24px",
              }}
            >
              <p className="text-body-lg" style={{ color: "var(--color-text-primary)", lineHeight: 1.75, fontWeight: 500 }}>
                {post.sections.executiveSummary}
              </p>
            </div>
          </SectionBlock>

          {/* 2. Context / Problem Statement */}
          <SectionBlock label="Context / Problem Statement">
            <p className="text-body">{post.sections.context}</p>
          </SectionBlock>

          {/* 3. Technical Deep Dive */}
          <SectionBlock label="Technical Deep Dive">
            <p className="text-body">{post.sections.technicalDeepDive}</p>
          </SectionBlock>

          {/* 4. Architecture Decisions */}
          <SectionBlock label="Architecture Decisions">
            <p className="text-body" style={{ marginBottom: "16px" }}>{post.sections.architectureDecisions}</p>
            {post.sections.codeSnippet && (
              <CodeBlock
                code={post.sections.codeSnippet}
                language={post.sections.codeLanguage}
              />
            )}
          </SectionBlock>

          {/* 5. Trade-offs & Complexity */}
          <SectionBlock label="Trade-offs & Complexity Considerations">
            <p className="text-body">{post.sections.tradeoffs}</p>
          </SectionBlock>

          {/* 6. Conclusion */}
          <SectionBlock label="Conclusion">
            <p className="text-body">{post.sections.conclusion}</p>
          </SectionBlock>

          {/* Key Insights */}
          <SectionBlock label="Key Insights">
            <KeyInsights insights={post.sections.keyInsights} />
          </SectionBlock>
        </article>

        {/* ── Footer Nav ────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--sp-6)",
            marginTop: "var(--sp-8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-body-sm transition-colors duration-150"
            style={{
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All articles
          </Link>
          <a
            href={mailtoHref}
            className="btn-primary"
            style={{ gap: "8px" }}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Discuss this article
          </a>
        </div>
      </div>
    </main>
  );
}
