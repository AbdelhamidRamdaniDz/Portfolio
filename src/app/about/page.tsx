import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SpotlightCard from "@/components/cool/SpotLightCard";

const techStack = [
  { name: "Next.js", description: "React framework for SSR, SSG, and scalable web apps." },
  { name: "Node.js", description: "High-performance backend environment for APIs and microservices." },
  { name: "TypeScript", description: "Type-safe JavaScript for robust, maintainable codebases." },
  { name: "Express.js", description: "Lightweight web framework powering secure REST APIs." },
  { name: "TailwindCSS", description: "Utility-first framework for fast and elegant UI design." },
  { name: "React", description: "Declarative library for building dynamic user interfaces." },
  { name: "MongoDB", description: "NoSQL database for flexible and scalable data storage." },
  { name: "Postman", description: "Testing and documenting RESTful APIs efficiently." },
  { name: "Git & GitHub", description: "Version control and collaborative development." },
  { name: "Figma", description: "UI/UX design and prototyping for modern digital experiences." },
  { name: "Adobe Illustrator", description: "Vector design for branding and interfaces." },
  { name: "Python", description: "AI and automation scripting for intelligent applications." },
  { name: "Go", description: "Efficient concurrent backend development." },
  { name: "JWT", description: "Secure authentication and session management." },
];

const TechPage: React.FC = () => (
  <main className="bg-black text-purple-100 font-inter min-h-screen">
    <Navbar />

    <section
      className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center"
      aria-labelledby="tech-heading"
    >
      <h1
        id="tech-heading"
        className="text-4xl md:text-5xl font-bold mb-6 text-accent-sand font-space-grotesk"
      >
        Tech Stack & Tools
      </h1>
      <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
        The technologies I use to build <strong>secure, scalable, and AI-driven web applications</strong> — 
        from frontend design to backend architecture.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
        {techStack.map((tech) => (
          <SpotlightCard
            key={tech.name}
            spotlightColor="rgba(128, 0, 128, 0.5)"
            className="p-4 border border-purple-800/40 bg-gray-950 rounded-xl backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-[1.05] hover:border-purple-400/60 hover:shadow-purple-900/40 group"
          >
            <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-accent-sand transition-colors">
              {tech.name}
            </h3>
            <p className="text-xs text-gray-500 leading-snug">{tech.description}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>

    <Footer />

    {/* SEO metadata */}
    <span className="sr-only">
      Abdelhamid Ramdani — Full-Stack Developer & CTO from Algeria. Expert in Next.js,
      Node.js, TypeScript, TailwindCSS, and AI-powered application development.
    </span>
  </main>
);

export default TechPage;
