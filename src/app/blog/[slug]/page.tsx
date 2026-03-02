"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="text-caption mb-4 pb-3"
        style={{
          color: "var(--color-text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {label}
      </h2>
      {children}
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden my-6"
      style={{ border: "1px solid var(--color-border)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-border)" }}
      >
        <span className="text-caption font-mono" style={{ color: "var(--color-text-tertiary)" }}>
          {language ?? "code"}
        </span>
        <button
          onClick={copy}
          className="text-caption px-2.5 py-1 rounded transition-colors duration-150"
          style={{
            background: copied ? "#dcfce7" : "var(--color-surface)",
            color: copied ? "#166534" : "var(--color-text-tertiary)",
            border: "1px solid var(--color-border)",
          }}
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <pre
        className="overflow-x-auto text-sm leading-relaxed"
        style={{
          background: "#F8F8F7",
          padding: "var(--sp-4)",
          margin: 0,
          color: "#1A1A1A",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function KeyInsights({ insights }: { insights: string[] }) {
  return (
    <ul className="space-y-3 mt-4">
      {insights.map((insight, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold mt-0.5"
            style={{ background: "var(--color-accent)", fontSize: "10px", minWidth: "20px" }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span className="text-body">{insight}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main
      style={{ background: "var(--color-bg)", minHeight: "100vh", paddingTop: "88px" }}
      aria-label={`Article: ${post.title}`}
    >
      {/* Article header */}
      <div
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "var(--sp-10) 0 var(--sp-8)",
        }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-150"
            style={{ color: "var(--color-text-tertiary)", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-tertiary)")}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to writing
          </Link>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-caption px-2.5 py-1 rounded-md font-semibold"
              style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" style={{ color: "var(--color-text-tertiary)" }} aria-hidden />
              <span className="text-caption">{post.readingTime} min read</span>
            </span>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-h1 mb-5" style={{ maxWidth: "760px", lineHeight: 1.1 }}>
            {post.title}
          </h1>

          {/* Abstract */}
          <p className="text-body-lg" style={{ maxWidth: "640px", color: "var(--color-text-secondary)" }}>
            {post.abstract}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.keywords.map((kw) => (
              <span
                key={kw}
                className="text-caption px-2.5 py-1 rounded-md"
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
        </div>
      </div>

      {/* Article body */}
      <div
        className="container"
        style={{
          maxWidth: "800px",
          paddingTop: "var(--sp-10)",
          paddingBottom: "var(--sp-16)",
        }}
      >
        <article>
          {/* 1. Executive Summary */}
          <SectionBlock label="Executive Summary">
            <div
              className="rounded-lg p-5"
              style={{
                background: "var(--color-accent-light)",
                borderLeft: `3px solid var(--color-accent)`,
              }}
            >
              <p className="text-body-lg font-medium" style={{ color: "var(--color-text-primary)" }}>
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
            <p className="text-body mb-4">{post.sections.architectureDecisions}</p>
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

        {/* Footer nav */}
        <div
          className="flex items-center justify-between pt-8 mt-8"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
            style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All articles
          </Link>
          <a
            href="mailto:abdelhamidramdani17@gmail.com"
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: "13px" }}
          >
            Discuss this article
          </a>
        </div>
      </div>
    </main>
  );
}
