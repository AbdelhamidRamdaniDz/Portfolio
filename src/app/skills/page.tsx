"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  SiLinkedin,
} from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { Code, Cpu, Layers, Palette, Terminal, Zap } from "lucide-react";

type Category = "Frontend" | "Backend" | "AI/ML" | "Tools" | "DevOps" | "Design" | "Problem Solving";

type Skill = {
  id: string;
  name: string;
  category: Category;
  proficiency: number;
  projects?: number;
};

const SKILLS: Skill[] = [
  { id: "next", name: "Next.js", category: "Frontend", proficiency: 90, projects: 12 },
  { id: "react", name: "React", category: "Frontend", proficiency: 92, projects: 25 },
  { id: "ts", name: "TypeScript", category: "Frontend", proficiency: 88, projects: 20 },
  { id: "tailwind", name: "TailwindCSS", category: "Frontend", proficiency: 90, projects: 30 },
  { id: "node", name: "Node.js", category: "Backend", proficiency: 85, projects: 18 },
  { id: "express", name: "Express.js", category: "Backend", proficiency: 82, projects: 15 },
  { id: "mongo", name: "MongoDB", category: "Backend", proficiency: 80, projects: 14 },
  { id: "python", name: "Python", category: "AI/ML", proficiency: 84, projects: 10 },
  { id: "ai", name: "AI/ML", category: "AI/ML", proficiency: 78, projects: 8 },
  { id: "three", name: "Three.js", category: "Frontend", proficiency: 75, projects: 6 },
  { id: "r3f", name: "@react-three/fiber", category: "Frontend", proficiency: 76, projects: 5 },
  { id: "drei", name: "@react-three/drei", category: "Frontend", proficiency: 74, projects: 5 },
  { id: "gitgithub", name: "Git & GitHub", category: "Tools", proficiency: 88, projects: 50 },
  { id: "docker", name: "Docker", category: "Tools", proficiency: 70, projects: 12 },
  { id: "vercel", name: "Vercel", category: "Tools", proficiency: 82, projects: 20 },
  { id: "postman", name: "Postman", category: "Tools", proficiency: 80, projects: 25 },
  { id: "figma", name: "Figma", category: "Design", proficiency: 76, projects: 15 },
  { id: "go", name: "Go", category: "Backend", proficiency: 68, projects: 4 },
  { id: "jwt", name: "JWT", category: "Tools", proficiency: 74, projects: 10 },
];

type RadarDatum = { label: Category; value: number; icon: React.ComponentType<{ className?: string }> };

const RADAR_DATA: RadarDatum[] = [
  { label: "Frontend", value: 92, icon: Code },
  { label: "Backend", value: 84, icon: Terminal },
  { label: "AI/ML", value: 78, icon: Cpu },
  { label: "DevOps", value: 72, icon: Layers },
  { label: "Design", value: 65, icon: Palette },
  { label: "Problem Solving", value: 90, icon: Zap },
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

function FloatingParticles() {
  // deterministic PRNG
  function mulberry32(seed: number) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  type Particle = { id: number; x: number; y: number; size: number; duration: number; delay: number };
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const rand = mulberry32(123456); // stable seed across renders
    const list = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 3 + 1,
      duration: rand() * 20 + 10,
      delay: rand() * 5,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p: Particle) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
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
          className="pointer-events-none fixed z-20 -translate-x-1/2 -translate-y-full rounded-md border border-cyan-500/20 bg-black/90 px-3 py-2 text-xs text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.4)] backdrop-blur-md"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold text-cyan-300">{tooltip.label}</div>
          <div className="text-purple-300/90">{tooltip.value}%</div>
        </div>
      )}

      {mounted && (
        <motion.svg
          viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
          className="h-full w-full drop-shadow-[0_0_50px_rgba(0,255,245,0.2)]"
          style={{ perspective: 1200 }}
          animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
          transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.8 }}
        >
          <defs>
            <radialGradient id="bgRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,255,245,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="polyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00fff5" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#b066ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" filterUnits="objectBoundingBox">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 1  0 0 0 0 0.96  0 0 0 0.7 0" />
            </filter>
          </defs>

          <circle cx={0} cy={0} r={radius + 40} fill="url(#bgRadial)" />
          <circle cx={0} cy={0} r={radius + 18} fill="none" stroke="rgba(0,255,245,0.1)" strokeWidth={2} filter="url(#softGlow)" />

          {[...Array(levels)].map((_, li) => {
            const r = radius * ((li + 1) / levels);
            const pts = buildPolygonPoints(new Array(RADAR_DATA.length).fill(max), max, r);
            return (
              <polygon
                key={`lvl-${li}`}
                points={pts}
                fill="none"
                stroke={li === levels - 1 ? "rgba(0,255,245,0.2)" : "rgba(255,255,255,0.08)"}
                strokeWidth={li === levels - 1 ? 2 : 1}
                strokeDasharray={li === levels - 1 ? "5,5" : "none"}
                style={{ filter: "url(#softGlow)" }}
              />
            );
          })}

          {RADAR_DATA.map((d, i) => {
            const a = -Math.PI / 2 + i * stepAngle;
            const { x, y } = polarToCartesian(a, radius);
            return (
              <g key={`axis-${i}`} onMouseEnter={() => onEnterAxis(i)} onMouseLeave={onLeaveAxis}>
                <line x1={0} y1={0} x2={x} y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} />
                <text
                  x={x * 1.12}
                  y={y * 1.12}
                  textAnchor={Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end"}
                  alignmentBaseline={y > 0 ? "hanging" : "baseline"}
                  className="select-none font-medium"
                  style={{
                    fill: hoverIdx === i ? "#00fff5" : "rgba(255,255,255,0.7)",
                    fontSize: 13,
                    transition: "fill 0.3s ease",
                    filter: hoverIdx === i ? "url(#glow)" : "none",
                  }}
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
            animate={{ opacity: [0.9, 0.3, 0.9], r: [4, 12, 4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#glow)"
          />

          <motion.polygon
            points={polyPoints}
            fill="url(#polyGrad)"
            fillOpacity={0.25}
            stroke="#00fff5"
            strokeWidth={2.5}
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {RADAR_DATA.map((d, i) => {
            const a = -Math.PI / 2 + i * stepAngle;
            const r = (d.value / max) * radius;
            const { x, y } = polarToCartesian(a, r);
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r={hoverIdx === i ? 6 : 5}
                fill={hoverIdx === i ? "#ff6b9d" : "#00fff5"}
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                style={{ cursor: "pointer" }}
              />
            );
          })}

          {mounted && (
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {new Array(32).fill(0).map((_, i) => {
                const a = (i / 32) * Math.PI * 2;
                const { x, y } = polarToCartesian(a, radius + 28);
                return (
                  <circle
                    key={`p-${i}`}
                    cx={x}
                    cy={y}
                    r={1.8}
                    fill={i % 3 === 0 ? "#00fff5" : i % 3 === 1 ? "#b066ff" : "#ff6b9d"}
                    opacity={0.7}
                  />
                );
              })}
            </motion.g>
          )}
        </motion.svg>
      )}
    </div>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 10);
    mouseY.set((e.clientY - centerY) / -10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon =
    skill.id === "next" ? SiNextdotjs :
    skill.id === "react" ? SiReact :
    skill.id === "ts" ? SiTypescript :
    skill.id === "tailwind" ? SiTailwindcss :
    skill.id === "node" ? SiNodedotjs :
    skill.id === "express" ? SiExpress :
    skill.id === "mongo" ? SiMongodb :
    skill.id === "python" ? SiPython :
    skill.id === "docker" ? SiDocker :
    skill.id === "gitgithub" ? null :
    skill.id === "postman" ? SiPostman :
    skill.id === "figma" ? SiFigma :
    skill.id === "go" ? SiGo :
    skill.id === "jwt" ? SiJsonwebtokens :
    skill.id === "vercel" ? SiVercel :
    skill.id === "three" ? SiThreedotjs :
    skill.id === "ai" ? SiTensorflow : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 shadow-[0_0_40px_rgba(176,102,255,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,255,245,0.25)]"
    >
      <div className="absolute -inset-px rounded-xl bg-[linear-gradient(110deg,rgba(0,255,245,0.3),rgba(176,102,255,0.3),rgba(255,107,157,0.3),transparent)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-2"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {skill.id === "gitgithub" ? (
                <span className="flex items-center gap-1">
                  <SiGit className="h-5 w-5 text-cyan-400" />
                  <SiGithub className="h-5 w-5 text-cyan-400" />
                </span>
              ) : (
                Icon && <Icon className="h-5 w-5 text-cyan-400" />
              )}
            </motion.div>
            <div>
              <span className="font-semibold text-cyan-200">{skill.name}</span>
              {skill.projects && (
                <div className="text-xs text-purple-300/70">{skill.projects} projects</div>
              )}
            </div>
          </div>
          {skill.proficiency >= 85 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.3, type: "spring" }}
              className="rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 text-[10px] font-bold text-yellow-400"
            >
              Expert
            </motion.div>
          )}
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-purple-300/70">{skill.category}</span>
            <span className="font-medium text-cyan-300">{skill.proficiency}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_25px_rgba(167,139,250,0.4)]"
              style={{ width: `${skill.proficiency}%` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
            />
            <motion.div
              className="absolute left-0 top-0 h-2 w-full rounded-full bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-pink-500/50 blur-sm"
              style={{ width: `${skill.proficiency}%` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillList() {
  const [activeTab, setActiveTab] = useState<Category | "All">("All");
  const categories: (Category | "All")[] = ["All", "Frontend", "Backend", "AI/ML", "Tools", "Design"];

  const filteredSkills = activeTab === "All" ? SKILLS : SKILLS.filter((s) => s.category === activeTab);

  return (
    <div className="mx-auto mt-12 w-full max-w-6xl px-4">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === cat
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                : "border border-white/10 bg-white/5 text-cyan-200/70 hover:border-cyan-500/30 hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        layout
      >
        {filteredSkills.map((skill, idx) => (
          <SkillCard key={skill.id} skill={skill} index={idx} />
        ))}
      </motion.div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delay }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-sm"
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex items-center gap-3">
        <div className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-2">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-cyan-200/70">{label}</div>
        </div>
      </div>
    </motion.div>
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
    <div className="relative isolate min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      <FloatingParticles />
      
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/15 blur-[110px]"
          animate={{
            x: [0, 70, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(34,211,238,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        animate={{ x: parallax.x, y: parallax.y }}
        transition={{ type: "spring", stiffness: 30, damping: 20, mass: 1 }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:pt-20">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            className="flex flex-col items-center lg:items-start lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="group relative">
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <div className="h-full w-full bg-gradient-to-br from-cyan-500/40 via-purple-500/40 to-pink-500/40" />
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,255,245,0.2),transparent)]"
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{ boxShadow: "inset 0 0 80px rgba(0,255,245,0.2), 0 0 80px rgba(176,102,255,0.2)" }}
                />
              </div>
            </div>

            <motion.div
              className="mt-6 text-center lg:text-left space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                Full-Stack Developer
              </h2>
              <p className="text-cyan-200/70 text-sm sm:text-base max-w-xs">
                AI/ML Enthusiast & Problem Solver
              </p>

              <div className="flex items-center gap-2 justify-center lg:justify-start pt-2">
                <motion.div
                  className="h-2 w-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-green-400">Available for work</span>
              </div>

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

              <div className="flex gap-3 justify-center lg:justify-start pt-4">
                <motion.a
                  href="#"
                  className="rounded-full bg-white/5 p-2 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SiGithub className="h-5 w-5 text-cyan-300" />
                </motion.a>
                <motion.a
                  href="#"
                  className="rounded-full bg-white/5 p-2 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SiLinkedin className="h-5 w-5 text-cyan-300" />
                </motion.a>
                <motion.a
                  href="#"
                  className="rounded-full bg-white/5 p-2 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter className="h-5 w-5 text-cyan-300" />
                </motion.a>
              </div>

              <motion.button
                className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.button>
            </motion.div>

            <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-sm">
              <StatCard icon={Code} label="Years Experience" value="5+" delay={0.5} />
              <StatCard icon={Terminal} label="Projects" value="50+" delay={0.6} />
              <StatCard icon={Zap} label="Technologies" value="19" delay={0.7} />
              <StatCard icon={Cpu} label="Happy Clients" value="30+" delay={0.8} />
            </div>
          </motion.div>

          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.h1
              className="relative inline-block bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            >
              <span>Interactive Skill Network</span>
              <motion.span
                className="pointer-events-none absolute -inset-1 -z-10 blur-xl bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.h1>
            <motion.p
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-cyan-100/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
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
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 p-4 sm:p-6 lg:p-8 shadow-[0_0_100px_rgba(34,211,238,0.2)] backdrop-blur-md">
          <div className="absolute top-0 left-0 h-24 w-24 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 h-24 w-24 border-b-2 border-r-2 border-purple-500/40 rounded-br-2xl" />

          <motion.div
            className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,255,245,0.03),transparent)]"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <RadarChart />
        </div>
      </motion.div>

      <SkillList />

      <div className="h-20 sm:h-24" />
    </div>
  );
}