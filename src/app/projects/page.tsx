"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "@/components/cool/SpotLightCard";
import Footer from "../../components/Footer";


interface Project {
  title: string;
  description: string;
  image: string;
  tech: string;
  href: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "colorea",
    description: "An e-commerce platform specializing in healthy food colorants extracted from natural herbs, targeting housewives, food and pharmaceutical companies. Features direct purchasing, electronic payments, and a modern, appealing visual identity.",
    image: "/colorea.webp",
    tech: "Next JS • TailwindCSS • TypeScript",
    href: "https://colorea-kappa.vercel.app/",
    category: "Web",
  },
  {
    title: "Trade & Sports Arbitration Center",
    tech: "Next JS • TailwindCSS • TypeScript",
    description: "First digital startup platform in Algeria specializing in commercial and sports arbitration and alternative dispute resolution. Provides independent, impartial services with focus on speed, flexibility, and reliability through digital transformation.",
    href: "https://sports-arbitration-center.vercel.app/",
    image: "/tahkeem_tech.webp",
    category: "Web",
  },
  {
    title: "FreeFlow",
    tech: "Next JS • TailwindCSS • TypeScript • Mongodb • Express.js • JWT • Node.js",
    description: "AI-powered digital platform and creative studio accelerating digital transformation for Algerian SMEs. Offers integrated services including branding, web development, content creation, and AI-driven marketing solutions.",
    href: "https://free-flow-studios.vercel.app/",
    image: "/freeflow.webp",
    category: "Web",
  },
];

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const techStack = project.tech.split("•").map((t: string) => t.trim());

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <SpotlightCard
        spotlightColor="rgba(6, 182, 212, 0.15)"
        className="rounded-2xl p-0 flex flex-col h-full group hover:scale-[1.02] transition-transform duration-500"
      >
        <div className="relative p-6 flex flex-col h-full bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-950/80 backdrop-blur-xl rounded-2xl border border-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
          {/* Gradient glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />

          {/* Image Section */}
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mb-5 overflow-hidden rounded-xl group/image focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
            aria-label={`View demo of ${project.title}`}
          >
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={`${project.title} - Full-stack web application showcase`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-xl border border-cyan-500/20 transition-all duration-500 group-hover/image:scale-110 group-hover/image:border-cyan-400/40"
                priority={index === 0}
              />
              {/* Image overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 rounded-xl" />
            </div>
          </Link>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {techStack.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium bg-cyan-500/5 text-cyan-400/90 rounded-full border border-cyan-500/20 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent font-space-grotesk relative z-10">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed font-inter relative z-10">
            {project.description}
          </p>

          {/* View Demo Link */}
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none transition-colors duration-300 group/link relative z-10 font-inter"
            aria-label={`Open ${project.title} project demo in new tab`}
          >
            View Demo
            <svg
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1 duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

// Category Filter Component
const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: { 
  categories: string[]; 
  activeCategory: string; 
  setActiveCategory: (category: string) => void; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((category: string) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none font-inter ${
            activeCategory === category
              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
              : "bg-gray-900/50 text-gray-400 border border-cyan-500/10 hover:border-cyan-500/30 hover:text-gray-300 backdrop-blur-sm"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Web", "AI", "Design"];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-black text-purple-100 font-inter min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles />
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto relative z-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-space-grotesk tracking-tight bg-[length:200%_auto] animate-gradient">
            Projects Gallery
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-inter"
          >
            A curated collection of full-stack applications, AI integrations, and modern web experiences
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </section>
      <Footer />
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: projects.map((project, index) => ({
              "@type": "CreativeWork",
              position: index + 1,
              name: project.title,
              description: project.description,
              url: project.href,
            })),
          }),
        }}
      />

      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </main>
  );
};

export default ProjectsPage;