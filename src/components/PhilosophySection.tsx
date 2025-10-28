import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Type definitions
interface PhilosophyParticle {
  left: string;
  top: string;
  duration: number;
  delay: number;
}

// Animated light beams
const LightBeams = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
        style={{
          left: `${20 + i * 15}%`,
        }}
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: [0, 0.5, 0],
          y: ['-100%', '200%'],
        }}
        transition={{
          duration: 4 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.8,
          ease: 'linear',
        }}
      />
    ))}
  </div>
);

// Floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<PhilosophyParticle[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setParticles(arr);
  }, []);

  if (!particles.length) return null; // SSR: don't render anything

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// Geometric floating shapes
const GeometricShapes = () => {
  const shapes = [
    { size: 60, x: '10%', y: '20%', delay: 0 },
    { size: 40, x: '85%', y: '15%', delay: 1 },
    { size: 50, x: '15%', y: '75%', delay: 2 },
    { size: 45, x: '90%', y: '70%', delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute border border-cyan-400/20"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Gradient wave background
const GradientWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15), transparent 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>
);

// Main Philosophy Section
const PhilosophySection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 px-6 md:px-12 bg-black text-gray-100 overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      {/* Background effects */}
      <GradientWave />
      <LightBeams />
      <FloatingParticles />
      <GeometricShapes />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

      {/* Vertical divider line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-5xl mx-auto z-10"
      >
        {/* Main content container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Glassmorphic quote box */}
          <div className="relative inline-block mb-12">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60" />
            
            {/* Quote container */}
            <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black/80 backdrop-blur-2xl rounded-2xl border border-gray-800/50 px-12 py-10 shadow-2xl">
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Quote marks */}
              <div className="absolute -top-6 -left-4 text-6xl text-cyan-400/30 font-serif">&quot;</div>
              <div className="absolute -bottom-6 -right-4 text-6xl text-purple-400/30 font-serif">&quot;</div>

              <h2
                id="philosophy-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight mb-0"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Technology with purpose,
                <br />
                design with clarity.
              </h2>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Animated divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400/50" />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              I craft digital products at the intersection of{' '}
              <span className="text-cyan-400 font-semibold">AI</span>,{' '}
              <span className="text-purple-400 font-semibold">design</span>, and{' '}
              <span className="text-pink-400 font-semibold">full-stack development</span>{' '}
              — where intelligence meets intuition.
            </p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-gray-600" />
              <p className="text-gray-500 text-lg italic tracking-wide">
                Abdelhamid Ramdani
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-gray-600" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom floating elements */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-cyan-400/40"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom vertical divider line */}
      <motion.div
        className="absolute left-1/2 bottom-0 w-px h-20 bg-gradient-to-t from-transparent via-purple-400/50 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
      />

      {/* SEO content */}
      <span className="sr-only">
        Abdelhamid Ramdani — Full-Stack Developer and AI Engineer specializing in 
        human-centered design. Creating intelligent digital experiences at the 
        intersection of artificial intelligence, modern web development, and 
        intuitive user interface design. Philosophy: Technology with purpose, 
        design with clarity.
      </span>
    </section>
  );
};

export default PhilosophySection;