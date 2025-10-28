import React from "react";
import CardSwap, { Card } from "./cool/CardSwap";
import Link from "next/link";

const projects = [
  {
    title: "colorea",
    description: "An e-commerce platform specializing in healthy food colorants extracted from natural herbs, targeting housewives, food and pharmaceutical companies. Features direct purchasing, electronic payments, and a modern, appealing visual identity.",
    tech: "Next JS • TailwindCSS • TypeScript",
    href: "https://colorea-kappa.vercel.app/",
    bg: "colorea.webp",
    gradient: "from-purple-700 to-purple-400",
    delay: "0.2s",
  },
  {
    title: "Trade & Sports Arbitration Center",
    tech: "Next JS • TailwindCSS • TypeScript",
    description: "First digital startup platform in Algeria specializing in commercial and sports arbitration and alternative dispute resolution. Provides independent, impartial services with focus on speed, flexibility, and reliability through digital transformation.",
    href: "https://sports-arbitration-center.vercel.app/",
    gradient: "from-purple-400 to-purple-900",
    delay: "0.3s",
    bg: "tahkeem_tech.webp",
  },
  {
    title: "FreeFlow",
    tech: "Next JS • TailwindCSS • TypeScript • Mongodb • Express.js • JWT • Node.js",
    description: "AI-powered digital platform and creative studio accelerating digital transformation for Algerian SMEs. Offers integrated services including branding, web development, content creation, and AI-driven marketing solutions.",
    href: "https://free-flow-studios.vercel.app/",
    bg: "freeflow.webp",
    gradient: "from-purple-400 to-purple-900",
    delay: "0.4s",
  },
];

const CARD_WIDTH = 380;
const CARD_HEIGHT = 400;

const ProjectsSection: React.FC = () => (
  <section
    id="projects"
    className="relative py-20 px-4 md:px-12 bg-black text-gray-200 mx-auto max-w-7xl"
    aria-labelledby="projects-heading"
  >
    <div className="relative z-50 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
      <div className="absolute left-0 right-0 bottom-0 top-1/2 z-10 bg-gradient-to-t from-black to-transparent lg:block hidden" />

      <div className="z-20 flex flex-col justify-center items-start">
        <h2
          id="projects-heading"
          className="text-3xl md:text-5xl font-bold mb-6 text-purple-400"
        >
          Selected Projects
        </h2>
        <p
          className="text-lg text-left mb-12 opacity-80 max-w-2xl animate-in font-inter text-gray-400"
          style={{ transitionDelay: "0.1s" }}
        >
          A curated selection of my most impactful work
        </p>
        <div
          className="text-center lg:text-left mt-14 animate-in w-full lg:w-auto"
          style={{ transitionDelay: "0.5s" }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-purple-400 font-inter font-semibold text-lg hover:text-purple-200 focus-visible:ring-2 focus-visible:ring-purple-500 transition group"
            aria-label="View all projects"
          >
            <span>View All Projects</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
      </div>
      <div className="overflow-hidden relative min-h-[400px] flex justify-center lg:justify-start">
        <CardSwap
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          cardDistance={50}
          verticalDistance={40}
        >
          {projects.map((project) => (
            <Card key={project.title} customClass="shadow-xl">
              <Link
                href={project.href}
                tabIndex={0}
                aria-label={`View case study for ${project.title}`}
              >
                <div
                  className={`h-40 w-full rounded-t-xl opacity-75`}
                  style={{
                    backgroundImage: `url('/${project.bg}')`,
                    backgroundSize: "100% 100%",
                  }}
                />
              </Link>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-2 text-purple-300 font-space-grotesk">
                  {project.title}
                </h3>
                <p className="text-sm text-purple-400 mb-3 font-inter">
                  {project.tech}
                </p>
                <p className="text-base opacity-90 mb-6 font-inter text-gray-300">
                  {project.description}
                </p>
                <Link
                  href={project.href}
                  className="mt-auto inline-flex items-center gap-2 text-purple-400 text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:ring-purple-500 transition group-hover:text-purple-200 font-inter"
                  tabIndex={0}
                  aria-label={`View case study for ${project.title}`}
                >
                  View Case Study
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  </section>
);

export default ProjectsSection;