import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Abdelhamid Ramdani — Technical Product Architect & CTO",
    template: "%s | Abdelhamid Ramdani",
  },
  description:
    "Technical Product Architect and CTO at FreeFlow. I design and engineer scalable, production-grade systems — from system architecture to deployment.",
  keywords: [
    "Technical Product Architect",
    "CTO",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "AI Engineer",
    "Algeria",
  ],
  authors: [{ name: "Abdelhamid Ramdani" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Abdelhamid Ramdani — Technical Product Architect & CTO",
    description: "I architect systems that scale businesses.",
    siteName: "Abdelhamid Ramdani",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
