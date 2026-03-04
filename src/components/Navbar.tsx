"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/",                label: "Home" },
  { href: "/#work",           label: "Projects" },
  { href: "/blog",            label: "Blog" },
  { href: "/research",        label: "Research" },
  { href: "/certifications",  label: "Certifications" },
  { href: "/#contact",        label: "Contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/96 backdrop-blur-md border-b py-3"
            : "bg-transparent py-5"
        }`}
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Wordmark */}
            <Link
              href="/"
              className="font-black text-xl"
              style={{
                color: "var(--color-text-primary)",
                letterSpacing: "-0.04em",
                textDecoration: "none",
              }}
              aria-label="Abdelhamid Ramdani — Home"
            >
              AR.
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`text-link px-3.5 py-2 text-sm font-medium transition-colors duration-150${active ? " text-link--active" : ""}`}
                    style={{
                      color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                      fontWeight: active ? 600 : 500,
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                    {/* Active: static 2px bottom line */}
                    {active && (
                      <span
                        className="absolute bottom-0 left-3.5 right-3.5 h-[2px]"
                        style={{ background: "var(--color-accent)" }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}

              <Link
                href="/#contact"
                className="btn-primary ml-4"
              >
                Book a Technical Call
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md border"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
              }}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/25"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute top-[68px] left-4 right-4 rounded-xl overflow-hidden shadow-xl border transition-all duration-300 ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <nav className="p-3 space-y-0.5" aria-label="Mobile navigation">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150"
                  style={{
                    color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                    background: active ? "var(--color-accent-muted)" : "transparent",
                    textDecoration: "none",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                  {active && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div
            className="p-4 pt-0 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              Book a Technical Call
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;