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


function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block card card-interactive h-full"
      aria-label={`Read: ${post.title}`}
    >
      {/* Category tag */}
      <div className="mb-4">
        <span className="tag-primary">{post.category}</span>
      </div>

      {/* Title */}
      <h2
        className="text-h3 mb-2"
        style={{
          fontSize: "18px",
          fontWeight: 700,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.title}
      </h2>

      {/* Abstract */}
      <p
        className="text-body-sm flex-1"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginTop: "8px",
        }}
      >
        {post.abstract}
      </p>

      {/* Meta footer */}
      <div
        className="flex items-center justify-between mt-auto"
        style={{
          marginTop: "16px",
          paddingTop: "16px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
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
          <div className="relative">
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
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-12)" }}>
        {/* Category filter */}
        <div className="flex flex-wrap gap-2" style={{ marginBottom: "var(--sp-8)" }} role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`filter-tab${filter === cat ? " filter-tab--active" : ""}`}
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
