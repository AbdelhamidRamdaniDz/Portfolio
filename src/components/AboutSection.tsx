"use client";

import React, { useEffect, useRef, useState } from "react";
import { Code2, Sparkles, GraduationCap, Briefcase, MapPin, Download } from "lucide-react";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden bg-black"
      aria-labelledby="about-heading"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 filter blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/15 filter blur-[140px] animate-pulse-slower" />
        
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-1/4 text-cyan-500/10 text-6xl font-mono animate-float-1">{"{}"}</div>
        <div className="absolute bottom-40 right-1/4 text-purple-500/10 text-5xl font-mono animate-float-2">{"</>"}</div>
        <div className="absolute top-1/2 left-1/3 text-cyan-400/10 text-4xl font-mono animate-float-3">{"()"}</div>
      </div>

      {/* Glow Line Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 backdrop-blur-md border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">
              About Me
            </span>
          </div>
          
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #e5e7eb 0%, #06b6d4 50%, #a855f7 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Building the Future
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Where artificial intelligence meets full-stack excellence
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Introduction Card */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 40%)`,
                }}
                onMouseMove={handleMouseMove}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Code2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Abdelhamid Ramdani</h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Briefcase className="w-4 h-4" />
                        Full-Stack Developer & CTO
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-purple-400">FreeFlow</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      Djelfa, Algeria
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  I build <span className="text-cyan-400 font-semibold">secure and scalable web applications</span> using{" "}
                  <span className="font-mono text-white">Next.js</span> and{" "}
                  <span className="font-mono text-white">Node.js</span>, blending clean code with purposeful design.
                  My approach combines <span className="text-purple-400 font-semibold">technical precision</span> with{" "}
                  human-centered solutions.
                </p>
              </div>
            </div>

            {/* Academic Focus Card */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.1), transparent 40%)`,
                }}
                onMouseMove={handleMouseMove}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">AI Master&apos;s Student</h3>
                    <p className="text-sm text-gray-400">Ziane Achour University</p>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  Focused on merging <span className="text-purple-400 font-semibold">machine learning</span> with modern web technologies.
                  I explore the intersection of AI and full-stack development to create{" "}
                  <span className="text-cyan-400 font-semibold">intelligent, efficient solutions</span> that push the boundaries
                  of what&apos;s possible.
                </p>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-3">
              {["Next.js", "React", "Node.js", "TypeScript", "Python", "AI/ML", "PostgreSQL", "Cloud"].map((tech, index) => (
                <span
                  key={tech}
                  className={`px-4 py-2 text-sm font-mono text-gray-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 cursor-default ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Signature and CV Button */}
            <div
              className={`pt-6 border-t border-white/10 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">
                  Abdelhamid Ramdani
                </p>
                
                <a
                  href="/cv.pdf"
                  download
                  className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-cyan-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <Download className="w-4 h-4 text-cyan-400 relative z-10 transition-transform group-hover/btn:translate-y-0.5" />
                  <span className="text-sm font-semibold text-white relative z-10">Download CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative group">
              {/* Animated Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-spin-slow" />
              
              {/* Outer Ring */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 p-1 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500">
                {/* Inner Glass Frame */}
                <div className="w-full h-full rounded-full bg-white/5 backdrop-blur-md p-2 border border-white/10">
                  {/* Image Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-500/50 transition-all duration-500">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: "url('/me.jpg')",
                      }}
                      role="img"
                      aria-label="Abdelhamid Ramdani, Full-Stack Developer and CTO"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-10 -right-10 w-3 h-3 rounded-full bg-cyan-400 animate-float-particle-1 shadow-lg shadow-cyan-400/50" aria-hidden="true" />
              <div className="absolute bottom-20 -left-10 w-2 h-2 rounded-full bg-purple-400 animate-float-particle-2 shadow-lg shadow-purple-400/50" aria-hidden="true" />
              <div className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-cyan-300 animate-float-particle-3 shadow-lg shadow-cyan-300/50" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="sr-only">
        <h2>About Abdelhamid Ramdani</h2>
        <p>
          Abdelhamid Ramdani is a Full-Stack Developer and CTO at FreeFlow based in Djelfa, Algeria.
          He specializes in building secure and scalable web applications using Next.js, Node.js, and TypeScript.
          As an AI Master&apos;s student at Ziane Achour University, he focuses on merging machine learning with modern web technologies
          to create efficient, human-centered solutions.
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.08);
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.15;
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-40px) rotate(-5deg);
            opacity: 0.15;
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-25px) rotate(3deg);
            opacity: 0.12;
          }
        }

        @keyframes float-particle-1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -20px);
          }
          50% {
            transform: translate(-5px, -40px);
          }
          75% {
            transform: translate(-15px, -20px);
          }
        }

        @keyframes float-particle-2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-15px, 20px);
          }
          66% {
            transform: translate(10px, 40px);
          }
        }

        @keyframes float-particle-3 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, 30px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 10s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 12s ease-in-out infinite 2s;
        }

        .animate-float-3 {
          animation: float-3 14s ease-in-out infinite 4s;
        }

        .animate-float-particle-1 {
          animation: float-particle-1 8s ease-in-out infinite;
        }

        .animate-float-particle-2 {
          animation: float-particle-2 10s ease-in-out infinite 1s;
        }

        .animate-float-particle-3 {
          animation: float-particle-3 12s ease-in-out infinite 2s;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;