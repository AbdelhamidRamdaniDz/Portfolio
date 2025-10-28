import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Type definitions
interface ServiceParticle {
  x: string;
  y: string;
  opacity: number;
  animateY: string;
  duration: number;
  delay: number;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  glowColor: string;
  delay: number;
}

interface IconProps {
  className?: string;
}

interface ServiceCardProps {
  service: Service;
}

// Service card data
const services: Service[] = [
  {
    icon: "code",
    title: "Full-Stack Development",
    description: "Secure, scalable web solutions with modern frameworks like Next.js and Node.js.",
    gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
    iconColor: "text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.4)",
    delay: 0.2,
  },
  {
    icon: "brain",
    title: "AI Integration",
    description: "Enhancing digital products with intelligent, machine learning–driven features.",
    gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    iconColor: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
    delay: 0.4,
  },
  {
    icon: "rocket",
    title: "Performance & UX Optimization",
    description: "Delivering speed, precision, and accessibility for seamless user experiences.",
    gradient: "from-emerald-500/20 via-cyan-500/20 to-blue-500/20",
    iconColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.4)",
    delay: 0.6,
  },
];

// Icon components
const CodeIcon = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const BrainIcon = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const RocketIcon = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const iconMap = {
  code: CodeIcon,
  brain: BrainIcon,
  rocket: RocketIcon,
};

// Animated background grid
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-30">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
      backgroundSize: '50px 50px',
      animation: 'gridMove 20s linear infinite',
    }} />
    <style>{`
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
    `}</style>
  </div>
);

// Floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<ServiceParticle[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      opacity: 0,
      animateY: Math.random() * -100 - 20 + '%',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(arr);
  }, []);
  if (!particles.length) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{ x: p.x, y: p.y, opacity: p.opacity }}
          animate={{ y: [null, p.animateY], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// Spotlight effect card
const ServiceCard = ({ service }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: service.delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.glowColor}, transparent)`,
        }}
      />
      
      {/* Card container */}
      <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 group-hover:border-gray-700/50 transition-all duration-500 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{
            background: [
              'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            ],
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 100%' }}
        />

        {/* Content */}
        <div className="relative p-8 flex flex-col h-full z-10">
          {/* Icon container */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm flex items-center justify-center mb-6 border border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-300`}
          >
            <IconComponent className={`w-8 h-8 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {service.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className={`mt-6 h-0.5 ${service.iconColor} bg-current rounded-full`}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: service.delay + 0.3 }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

// Main Services Section
const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-24 px-6 md:px-12 bg-black text-gray-100 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background effects */}
      <AnimatedGrid />
      <FloatingParticles />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <h2
              id="services-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              What I Do
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            Core services focused on <span className="text-cyan-400 font-semibold">scalable architecture</span>, <span className="text-purple-400 font-semibold">AI innovation</span>, and <span className="text-emerald-400 font-semibold">seamless user experience</span>.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>

      {/* SEO content */}
      <span className="sr-only">
        Abdelhamid Ramdani — Full-Stack Developer & CTO specializing in modern web development, 
        AI integration, and performance optimization. Expert in Next.js, Node.js, MongoDB, 
        machine learning APIs, and creating accessible, high-performance digital experiences.
      </span>
    </section>
  );
};

export default ServicesSection;