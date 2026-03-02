"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock } from "lucide-react";
import { posts, type BlogPost } from "@/lib/blog";
import PageFooter from "@/components/PageFooter";

const categories = ["All", "AI", "System Design", "Architecture", "Big Data", "Research"] as const;
type Filter = (typeof categories)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const categoryColors: Record<string, string> = {
  AI:              "var(--color-accent)",
  "System Design": "#059669",
  Architecture:    "#7c3aed",
  "Big Data":      "#b45309",
  Research:        "#be185d",
};

function PostCard({ post }: { post: BlogPost }) {
  const accentColor = categoryColors[post.category] ?? "var(--color-accent)";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block card card-hover h-full"
      aria-label={`Read: ${post.title}`}
      style={{ textDecoration: "none" }}
    >
      {/* Category tag */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-caption px-2.5 py-1 rounded-md font-semibold"
          style={{ background: `${accentColor}15`, color: accentColor }}
        >
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h2
        className="text-h3 mb-3 leading-snug"
        style={{ fontSize: "18px", fontWeight: 700 }}
      >
        {post.title}
      </h2>

      {/* Abstract */}
      <p
        className="text-body mb-5 line-clamp-2 flex-1"
        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {post.abstract}
      </p>

      {/* Meta footer */}
      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: "var(--color-text-tertiary)" }} aria-hidden="true" />
          <span className="text-caption">{post.readingTime} min read</span>
        </div>
        <span className="text-caption">{formatDate(post.publishedAt)}</span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = filter === "All" ? posts : posts.filter((p) => p.category === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.abstract.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return result;
  }, [filter, query]);

  return (
    <main
      style={{ background: "var(--color-bg)", minHeight: "100vh", paddingTop: "88px" }}
      aria-label="Blog — Technical writing by Abdelhamid Ramdani"
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
          <span className="section-label">Writing</span>
          <h1 className="text-h1 mt-2 mb-4">Technical Journal</h1>
          <p className="text-body-lg max-w-xl" style={{ marginBottom: "var(--sp-6)" }}>
            Architecture decisions, engineering trade-offs, and lessons from building production systems.
            Written for engineers, not for algorithms.
          </p>

          {/* Search */}
          <div className="relative max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--color-text-tertiary)" }}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-12)" }}>
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className="text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-150"
              style={{
                background: filter === cat ? "var(--color-accent)" : "var(--color-surface)",
                color: filter === cat ? "#fff" : "var(--color-text-secondary)",
                borderColor: filter === cat ? "var(--color-accent)" : "var(--color-border)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-h3 mb-2" style={{ color: "var(--color-text-tertiary)" }}>No articles found</p>
            <p className="text-body">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        {/* Count */}
        <p className="text-caption mt-8" style={{ color: "var(--color-text-tertiary)" }}>
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {filter !== "All" ? ` in ${filter}` : ""}
          {query ? ` matching "${query}"` : ""}
        </p>
      </div>

      {/* SEO */}
      <span className="sr-only">Technical Blog — Abdelhamid Ramdani</span>
      <PageFooter />
    </main>
  );
}
