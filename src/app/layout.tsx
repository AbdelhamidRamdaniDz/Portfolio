import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

/* ── Font Loading ────────────────────────────────────────────
   display: Syne — geometric, high ink contrast (replaces Inter)
   body:    Manrope — humanist grotesque (replaces Inter)
   display: 'swap' — prevents invisible text during load
   Loaded as CSS variables: --font-syne, --font-manrope
   Both reference the same variables used in globals.css :root
─────────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Abdelhamid Ramdani — Full-Stack Developer & AI Engineer",
    template: "%s | Abdelhamid Ramdani",
  },
  description:
    "Full-Stack Developer and Co-Founder of FreeFlow. Building secure, scalable web applications with React, Next.js, Node.js, and Express.",
  keywords: [
    "Full-Stack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Algeria",
  ],
  authors: [{ name: "Abdelhamid Ramdani" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Abdelhamid Ramdani — Full-Stack Developer & AI Engineer",
    description: "I build systems that scale businesses.",
    siteName: "Abdelhamid Ramdani",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
