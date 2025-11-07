"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiDocker,
  SiGit,
  SiGithub,
  SiVercel,
  SiThreedotjs,
  SiTensorflow,
  SiPostman,
  SiFigma,
  SiGo,
  SiJsonwebtokens,
} from "react-icons/si";
type Category = "Frontend" | "Backend" | "AI/ML" | "Tools" | "DevOps" | "Design" | "Problem Solving";

type Skill = {
  id: string;
  name: string;
  category: Category;
  proficiency: number;
};

const SKILLS: Skill[] = [
  { id: "next", name: "Next.js", category: "Frontend", proficiency: 90 },
  { id: "react", name: "React", category: "Frontend", proficiency: 92 },
  { id: "ts", name: "TypeScript", category: "Frontend", proficiency: 88 },
  { id: "tailwind", name: "TailwindCSS", category: "Frontend", proficiency: 90 },
  { id: "node", name: "Node.js", category: "Backend", proficiency: 85 },
  { id: "express", name: "Express.js", category: "Backend", proficiency: 82 },
  { id: "mongo", name: "MongoDB", category: "Backend", proficiency: 80 },
  { id: "python", name: "Python", category: "AI/ML", proficiency: 84 },
  { id: "ai", name: "AI/ML", category: "AI/ML", proficiency: 78 },
  { id: "three", name: "Three.js", category: "Frontend", proficiency: 75 },
  { id: "r3f", name: "@react-three/fiber", category: "Frontend", proficiency: 76 },
  { id: "drei", name: "@react-three/drei", category: "Frontend", proficiency: 74 },
  { id: "gitgithub", name: "Git & GitHub", category: "Tools", proficiency: 88 },
  { id: "docker", name: "Docker", category: "Tools", proficiency: 70 },
  { id: "vercel", name: "Vercel", category: "Tools", proficiency: 82 },
  { id: "postman", name: "Postman", category: "Tools", proficiency: 80 },
  { id: "figma", name: "Figma", category: "Design", proficiency: 76 },
  { id: "go", name: "Go", category: "Backend", proficiency: 68 },
  { id: "jwt", name: "JWT", category: "Tools", proficiency: 74 },
];

type RadarDatum = { label: Category; value: number };

const RADAR_DATA: RadarDatum[] = [
  { label: "Frontend", value: 92 },
  { label: "Backend", value: 84 },
  { label: "AI/ML", value: 78 },
  { label: "DevOps", value: 72 },
  { label: "Design", value: 65 },
  { label: "Problem Solving", value: 90 },
];

function polarToCartesian(angle: number, radius: number) {
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function buildPolygonPoints(values: number[], max: number, radius: number) {
  const step = (Math.PI * 2) / values.length;
  const pts = values.map((v, i) => {
    const r = (v / max) * radius;
    const a = -Math.PI / 2 + i * step;
    const { x, y } = polarToCartesian(a, r);
    return `${x},${y}`;
  });
  return pts.join(" ");
}

function RadarChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  const size = 520;
  const radius = 190;
  const levels = 5;
  const max = 100;
  const stepAngle = (Math.PI * 2) / RADAR_DATA.length;

  const values = RADAR_DATA.map((d) => d.value);
  const polyPoints = useMemo(() => buildPolygonPoints(values, max, radius), [values]);

  const handleHover = (i: number | null) => setHoverIdx(i);

  const projectToClient = (idx: number) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return null;
    const a = -Math.PI / 2 + idx * stepAngle;
    const r = (RADAR_DATA[idx].value / max) * radius;
    const { x, y } = polarToCartesian(a, r);
    // Convert viewBox coords to client
    const px = box.left + box.width / 2 + x;
    const py = box.top + box.height / 2 + y;
    return { x: px, y: py };
  };

  const onEnterAxis = (idx: number) => {
    handleHover(idx);
    const c = projectToClient(idx);
    if (c) setTooltip({ x: c.x, y: c.y - 8, label: RADAR_DATA[idx].label, value: RADAR_DATA[idx].value });
  };
  const onLeaveAxis = () => {
    handleHover(null);
    setTooltip(null);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tilt = useMemo(() => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return { rx: 0, ry: 0 };
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const dx = (cursor.x - cx) / box.width;
    const dy = (cursor.y - cy) / box.height;
    return { rx: dy * -6, ry: dx * 6 };
  }, [cursor]);

  return (
    <div ref={containerRef} className="relative mx-auto h-[72vh] w-full max-w-5xl">
      {tooltip && (
        <div
          className="pointer-events-none fixed z-20 -translate-x-1/2 -translate-y-full rounded-md border border-cyan-500/20 bg-black/70 px-2.5 py-1.5 text-xs text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.3)] backdrop-blur"
          style={{ left: tooltip.x, top: tooltip.y }}
          aria-live="polite"
        >
          <div className="font-semibold text-cyan-300">{tooltip.label}</div>
          <div className="text-purple-300/90">{tooltip.value}%</div>
        </div>
      )}
      {!mounted && (
        <div
          className="absolute inset-0 rounded-xl border border-white/5 bg-gradient-to-b from-black/60 to-black/30"
          aria-hidden
        />
      )}

      {mounted && (
      <motion.svg
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        className="h-full w-full drop-shadow-[0_0_40px_rgba(0,255,245,0.15)]"
        style={{
          perspective: 1200,
        }}
        suppressHydrationWarning
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.8 }}
      >
        <defs>
          <radialGradient id="bgRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,255,245,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="polyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00fff5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b066ff" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow" filterUnits="objectBoundingBox">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 1  0 0 0 0 0.96  0 0 0 0.6 0"/>
          </filter>
        </defs>

        <circle cx={0} cy={0} r={radius + 40} fill="url(#bgRadial)" />
        <circle cx={0} cy={0} r={radius + 18} fill="none" stroke="rgba(0,255,245,0.08)" strokeWidth={2} filter="url(#softGlow)" />

        {[...Array(levels)].map((_, li) => {
          const r = radius * ((li + 1) / levels);
          const pts = buildPolygonPoints(new Array(RADAR_DATA.length).fill(max), max, r);
          return (
            <polygon
              key={`lvl-${li}`}
              points={pts}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
              style={{ filter: "url(#softGlow)" }}
            />
          );
        })}

        {RADAR_DATA.map((d, i) => {
          const a = -Math.PI / 2 + i * stepAngle;
          const { x, y } = polarToCartesian(a, radius);
          return (
            <g key={`axis-${i}`} onMouseEnter={() => onEnterAxis(i)} onMouseLeave={onLeaveAxis}>
              <line x1={0} y1={0} x2={x} y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
              <text
                x={x * 1.08}
                y={y * 1.08}
                textAnchor={Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end"}
                alignmentBaseline={y > 0 ? "hanging" : "baseline"}
                className="select-none"
                style={{ fill: hoverIdx === i ? "#00fff5" : "rgba(255,255,255,0.65)", fontSize: 12, transition: "opacity 0.2s ease, fill 0.2s ease" }}
              >
                {d.label}
              </text>
            </g>
          );
        })}

        <motion.circle
          cx={0}
          cy={0}
          r={4}
          fill="#00fff5"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.9, 0.2, 0.9], r: [4, 10, 4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glow)"
        />

        <motion.polygon
          points={polyPoints}
          fill="url(#polyGrad)"
          fillOpacity={0.2}
          stroke="#00fff5"
          strokeWidth={2}
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {hoverIdx !== null && (() => {
          const highlightValues = RADAR_DATA.map((_, i) => (i === hoverIdx ? RADAR_DATA[i].value : RADAR_DATA[i].value * 0.6));
          const pts = buildPolygonPoints(highlightValues, max, radius);
          return (
            <polygon
              points={pts}
              fill="#b066ff"
              fillOpacity={0.12}
              stroke="#b066ff"
              strokeOpacity={0.8}
              strokeWidth={1.5}
              filter="url(#glow)"
            />
          );
        })()}

        {mounted && (
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {new Array(24).fill(0).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              const { x, y } = polarToCartesian(a, radius + 26);
              return <circle key={`p-${i}`} cx={x} cy={y} r={1.6} fill={i % 2 ? "#00fff5" : "#b066ff"} opacity={0.6} />;
            })}
          </motion.g>
        )}
      </motion.svg>
      )}
    </div>
  );
}

function SkillList() {
  return (
    <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKILLS.map((s, idx) => {
        const Icon =
          s.id === "next" ? SiNextdotjs :
          s.id === "react" ? SiReact :
          s.id === "ts" ? SiTypescript :
          s.id === "tailwind" ? SiTailwindcss :
          s.id === "node" ? SiNodedotjs :
          s.id === "express" ? SiExpress :
          s.id === "mongo" ? SiMongodb :
          s.id === "python" ? SiPython :
          s.id === "docker" ? SiDocker :
          s.id === "gitgithub" ? null :
          s.id === "postman" ? SiPostman :
          s.id === "figma" ? SiFigma :
          s.id === "go" ? SiGo :
          s.id === "jwt" ? SiJsonwebtokens :
          s.id === "vercel" ? SiVercel :
          s.id === "three" ? SiThreedotjs :
          s.id === "ai" ? SiTensorflow : null;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.03, duration: 0.5, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4 shadow-[0_0_30px_rgba(176,102,255,0.12)]"
          >
            <div className="absolute -inset-px rounded-xl bg-[linear-gradient(110deg,rgba(0,255,245,0.25),rgba(176,102,255,0.25),transparent)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-cyan-200">
                {s.id === "gitgithub" ? (
                  <span className="flex items-center gap-1">
                    <SiGit className="h-4 w-4 text-cyan-300" />
                    <SiGithub className="h-4 w-4 text-cyan-300" />
                  </span>
                ) : (
                  Icon && <Icon className="h-4 w-4 text-cyan-300" />
                )}
                <span className="font-medium">{s.name}</span>
              </div>
              <span className="text-purple-300/80">{s.category}</span>
            </div>
            <div className="relative mt-3 h-2 w-full rounded-full bg-white/10">
              <motion.div
                className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500 shadow-[0_0_20px_rgba(167,139,250,0.35)]"
                style={{ width: `${s.proficiency}%` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                aria-valuenow={s.proficiency}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function SkillsPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 1, h: 1 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const parallax = {
    x: (mouse.x - viewport.w / 2) * 0.01,
    y: (mouse.y - viewport.h / 2) * 0.01,
  };

  return (
    <div className="relative isolate min-h-[100svh] bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-[100px]"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/15 blur-[110px]"
          animate={{ 
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        animate={{ x: parallax.x, y: parallax.y }}
        transition={{ type: "spring", stiffness: 30, damping: 20, mass: 1 }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:pt-20 lg:pt-24">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">          
          <motion.div
            className="flex flex-col items-center lg:items-start lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur-lg group-hover:opacity-100 transition duration-500" />
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <NextImage
                  src="/me.jpg"
                  alt="Profile"
                  fill
                  sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
                  priority
                  className="object-cover"
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,255,245,0.15),transparent)]"
                  initial={{ y: "-100%" }}
                  whileHover={{ y: "100%" }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ boxShadow: "inset 0 0 60px rgba(0,255,245,0.15), 0 0 60px rgba(176,102,255,0.15)" }}
                />
              </div>
            </div>
            
            <motion.div 
              className="mt-6 text-center lg:text-left space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                Full-Stack Developer
              </h2>
              <p className="text-cyan-200/70 text-sm sm:text-base max-w-xs">
                AI/ML Enthusiast & Problem Solver
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  React Expert
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  AI Integration
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  3D Graphics
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title Section */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.h1
              className="relative inline-block bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <span>Interactive Skill Network</span>
              <span className="pointer-events-none absolute inset-0 -z-10 select-none text-transparent" aria-hidden>
                <span className="absolute inset-0 translate-x-0.5 text-cyan-400/30 blur-[1px]">Interactive Skill Network</span>
                <span className="absolute inset-0 -translate-x-0.5 text-purple-400/30 blur-[1px]">Interactive Skill Network</span>
              </span>
            </motion.h1>
            <motion.p
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-cyan-100/80 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Explore my comprehensive technical expertise across frontend, backend, and AI/ML domains. 
              Each skill represents years of hands-on experience and continuous learning.
            </motion.p>
          </div>
        </div>
      </div>
      <motion.div
        className="relative mx-auto mt-12 sm:mt-16 lg:mt-20 w-full max-w-7xl px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/70 via-gray-900/50 to-black/70 p-4 sm:p-6 lg:p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-sm">
          <div className="absolute top-0 left-0 h-20 w-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 h-20 w-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-2xl" />
          
          <RadarChart />
        </div>
      </motion.div>

      <SkillList />

      <div className="h-20 sm:h-24" />
    </div>
  );
}