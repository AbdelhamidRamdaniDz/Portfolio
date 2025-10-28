import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SpotlightCard from "../../components/cool/SpotLightCard";

const techStack = [
  { name: "CSS3", description: "Style web pages with modern layouts." },
  { name: "HTML5", description: "Semantic markup for web structure." },
  { name: "JavaScript", description: "Dynamic scripting for interactive UIs." },
  { name: "TypeScript", description: "Typed superset for robust JS apps." },
  { name: "Express.js", description: "Minimalist Node.js web framework." },
  { name: "JWT", description: "Secure authentication tokens." },
  { name: "NPM", description: "Package manager for JavaScript." },
  { name: "Next.js", description: "React framework for SSR and SSG." },
  { name: "NodeJS", description: "JavaScript runtime for servers." },
  { name: "Nodemon", description: "Auto-restart Node.js apps." },
  { name: "React Query", description: "Data fetching for React apps." },
  { name: "React", description: "Component-based UI library." },
  { name: "Radix UI", description: "Primitives for accessible UIs." },
  { name: "SASS", description: "Advanced CSS preprocessor." },
  { name: "TailwindCSS", description: "Utility-first CSS framework." },
  { name: "Vite", description: "Fast frontend build tool." },
  { name: "Adobe Illustrator", description: "Vector graphic design tool." },
  { name: "Adobe Photoshop", description: "Image editing software." },
  { name: "Canva", description: "Online design platform." },
  { name: "Figma", description: "Collaborative UI design tool." },
  { name: "GitHub", description: "Code hosting and collaboration." },
  { name: "Git", description: "Version control system." },
  { name: "Postman", description: "API testing and development." },
  { name: "Swagger", description: "API documentation tool." },
  { name: "Go", description: "Efficient, scalable backend development." },
];

const TechPage: React.FC = () => (
  <main className="bg-black text-purple-100 font-inter min-h-screen">
    <Navbar />
    <section className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-200 font-space-grotesk">
        Tech Stack
      </h2>
      <div className="flex flex-wrap justify-center gap-1">
        {techStack.map((tech) => (
          <SpotlightCard
            key={tech.name}
            spotlightColor="rgba(128, 0, 128, 0.5)"
            className="p-1 flex flex-col items-center justify-center border bg-gray-950 border-purple-800/40 shadow-xl rounded-2xl min-h-[120px] backdrop-blur-md transition-transform duration-300 hover:scale-[1.04] hover:shadow-purple-900/40 hover:border-purple-400/60 group"
          >
            <h3 className="font-bold text-sm text-white text-center font-space-grotesk">
              {tech.name}
            </h3>
            <p className="text-center text-xs  opacity-90 text-gray-500  font-inter">
              {tech.description}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
    <Footer />
  </main>
);

export default TechPage;
