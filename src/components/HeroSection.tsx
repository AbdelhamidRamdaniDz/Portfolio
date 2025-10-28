"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated matrix background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);
    
    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const chars = matrix.split("");

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Gradient color for matrix effect
        const gradient = ctx.createLinearGradient(0, drops[i] * 20, 0, drops[i] * 20 + 20);
        gradient.addColorStop(0, "rgba(6, 182, 212, 0.8)");
        gradient.addColorStop(1, "rgba(168, 85, 247, 0.3)");
        ctx.fillStyle = gradient;

        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-8"
      role="banner"
    >
      {/* Animated Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      {/* Gradient Orbs with Parallax */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500 filter blur-[120px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600 filter blur-[140px] opacity-15 animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400 filter blur-[100px] opacity-10" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      {/* Light Beams */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-beam-1" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-beam-2" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-beam-3" />
      </div>

      {/* Glassmorphic Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* AI Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-md border border-cyan-500/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm font-medium text-cyan-400 tracking-wider">
            AI-POWERED DEVELOPMENT
          </span>
        </div>

        {/* Main Heading with Staggered Animation */}
        <h1 className="relative mb-6">
          <span className="sr-only">Abdelhamid Ramdani - Full-Stack Developer and CTO</span>
          
          {/* First Name */}
          <div
            className={`block transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
            }`}
            style={{ transitionDelay: "200ms" }}
            aria-hidden="true"
          >
            <span
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #e5e7eb 0%, #06b6d4 50%, #a855f7 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Abdelhamid
            </span>
          </div>

          {/* Last Name */}
          <div
            className={`block transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
            }`}
            style={{ transitionDelay: "400ms" }}
            aria-hidden="true"
          >
            <span
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #e5e7eb 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
                animationDelay: "0.5s",
              }}
            >
              Ramdani
            </span>
          </div>

          {/* Glow Effect Behind Name */}
          <div className="absolute inset-0 blur-3xl opacity-30 -z-10" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-pulse-slow" />
          </div>
        </h1>

        {/* Role Title */}
        <h2
          className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400">
            Full-Stack Developer & CTO
          </span>
          <span className="text-gray-400 mx-3">@</span>
          <span className="text-gray-200">FreeFlow</span>
        </h2>

        {/* Description */}
        <p
          className={`text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          An <strong className="text-cyan-400 font-semibold">AI-driven full-stack developer</strong> from Algeria,
          specialized in crafting <strong className="text-purple-400 font-semibold">scalable web solutions</strong> using{" "}
          <span className="text-gray-100 font-mono">Next.js</span>,{" "}
          <span className="text-gray-100 font-mono">Node.js</span>, and{" "}
          <span className="text-gray-100 font-mono">TypeScript</span>.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          {/* Primary CTA */}
          <Link
            href="/projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/#contact"
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-md text-cyan-400 font-bold text-lg rounded-lg border-2 border-cyan-500/30 overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Let&apos;s Connect
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Tech Stack Pills */}
        <div
          className={`mt-16 flex flex-wrap items-center justify-center gap-3 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          {["Next.js", "React", "Node.js", "TypeScript", "AI/ML", "Cloud"].map((tech, index) => (
            <span
              key={tech}
              className="px-4 py-2 text-sm font-mono text-gray-400 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 cursor-default"
              style={{ animationDelay: `${1200 + index * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1400ms" }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
        </div>
      </div>

      {/* SEO Content */}
      <div className="sr-only">
        <h1>Abdelhamid Ramdani - Full-Stack Developer & CTO at FreeFlow</h1>
        <p>
          Abdelhamid Ramdani is an AI-driven full-stack developer from Algeria, 
          specialized in scalable web solutions using Next.js, Node.js, and TypeScript. 
          Expert in modern web development, cloud architecture, and artificial intelligence integration.
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

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

        @keyframes beam-1 {
          0%, 100% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 0.3;
            transform: translateY(0);
          }
        }

        @keyframes beam-2 {
          0%, 100% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 0.2;
            transform: translateY(0);
          }
        }

        @keyframes beam-3 {
          0%, 100% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 0.25;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }

        .animate-beam-1 {
          animation: beam-1 8s ease-in-out infinite;
        }

        .animate-beam-2 {
          animation: beam-2 10s ease-in-out infinite 2s;
        }

        .animate-beam-3 {
          animation: beam-3 12s ease-in-out infinite 4s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;