"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Type definitions
interface FooterParticle {
  left: string;
  top: string;
  color: string;
  duration: number;
  delay: number;
}

// Animated gradient beam
const GradientBeam = () => (
  <motion.div
    className="absolute top-0 left-0 right-0 h-px overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      animate={{
        x: ['-100%', '200%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 1,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent blur-sm" />
  </motion.div>
);

// Floating particles
const FooterParticles = () => {
  const [particles, setParticles] = useState<FooterParticle[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 15 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 2 === 0 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(168, 85, 247, 0.6)',
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(arr);
  }, []);
  if (!particles.length) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: p.left, top: p.top, background: p.color }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// Scroll to top button
const ScrollToTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={handleScrollTop}
      className="group relative w-12 h-12"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll to top"
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Button container */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-full border border-gray-800/50 flex items-center justify-center group-hover:border-cyan-400/50 transition-all duration-300 shadow-lg">
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </motion.button>
  );
};

// Light bulb icon for the "built with 💡" text
const LightBulbIcon = () => (
  <motion.svg
    className="inline-block w-4 h-4 ml-1 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    animate={{
      opacity: [0.5, 1, 0.5],
      scale: [0.95, 1.05, 0.95],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
  </motion.svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 px-6 md:px-12 bg-black text-gray-100 overflow-hidden"
      aria-label="Website Footer"
    >
      {/* Animated gradient beam at top */}
      <GradientBeam />
      
      {/* Background effects */}
      <FooterParticles />
      
      {/* Gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Left Section - Copyright & Tech Stack */}
          <div className="text-center md:text-left">
            <motion.p
              className="text-sm text-gray-300 mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              © {currentYear}{' '}
              <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Abdelhamid Ramdani
              </span>
              . All rights reserved.
            </motion.p>
            <motion.p
              className="text-xs text-gray-400 flex items-center justify-center md:justify-start gap-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Designed & built with
              <LightBulbIcon />
              using{' '}
              <span className="font-semibold text-cyan-400">Next.js</span> &{' '}
              <span className="font-semibold text-purple-400">TailwindCSS</span>
            </motion.p>
          </div>

          {/* Center - Scroll to top button (visible on mobile) */}
          <div className="md:hidden">
            <ScrollToTop />
          </div>

          {/* Right Section - Inspirational Quote */}
          <motion.div
            className="text-center md:text-right relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Decorative glow behind quote */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative">
              <motion.p
                className="text-sm md:text-base font-medium mb-2 leading-relaxed"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  &quot;Crafting digital experiences with
                  <br className="hidden md:block" />
                  purpose and precision.&quot;
                </span>
              </motion.p>
              
              {/* Signature */}
              <p className="text-xs text-gray-500 tracking-wider italic flex items-center justify-center md:justify-end gap-2">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-gray-600" />
                Abdelhamid Ramdani
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-gray-600" />
              </p>
            </div>
          </motion.div>

          {/* Scroll to top button (desktop - absolute positioned) */}
          <div className="hidden md:block absolute right-0 bottom-0">
            <ScrollToTop />
          </div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Abdelhamid Ramdani',
            jobTitle: 'Full-Stack Developer & CTO',
            description: 'Expert Full-Stack Developer and CTO specializing in AI integration, Next.js, React, Node.js, and modern web development. Building intelligent digital experiences with purpose and precision.',
            url: 'https://abdelhamidramdani.vercel.app',
            email: 'abdelhamidramdani17@gmail.com',
            knowsAbout: [
              'Full-Stack Development',
              'AI Integration',
              'Next.js',
              'React',
              'Node.js',
              'TailwindCSS',
              'MongoDB',
              'Machine Learning',
              'Web Performance Optimization',
              'UX Design',
            ],
            sameAs: [
              'https://github.com/AbdelhamidRamdaniDz',
              'https://www.linkedin.com/in/abdelhamid-ramdani/',
              'https://wa.me/213666564435',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Djelfa',
              addressCountry: 'Algeria',
            },
          }),
        }}
      />

      {/* Hidden SEO text */}
      <span className="sr-only">
        Abdelhamid Ramdani - Full-Stack Developer, CTO, and AI Integration Expert. 
        Specializing in Next.js, React, Node.js, TailwindCSS, MongoDB, and modern 
        web development. Building scalable web applications with artificial intelligence, 
        machine learning features, and exceptional user experiences. Portfolio showcasing 
        full-stack engineering, AI-powered solutions, and human-centered design.
      </span>
    </footer>
  );
};

export default Footer;