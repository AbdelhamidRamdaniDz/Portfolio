import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Type definitions
interface Particle {
  width: number;
  height: number;
  left: string;
  top: string;
  color: string;
  duration: number;
  delay: number;
}

interface SocialIconProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  delay: number;
}

interface IconProps {
  className?: string;
}

// Animated background grid
const HolographicGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
          linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
);

// Floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 25 }).map((_, i) => ({
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.width, height: p.height, left: p.left, top: p.top, background: p.color }}
          animate={{ y: [0, -30, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// Glowing beam effect
const GlowingBeam = () => (
  <motion.div
    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
  />
);

// Social icon component
const SocialIcon = ({ href, icon: Icon, label, delay }: SocialIconProps) => (
  <motion.a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Glow effect */}
    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Icon container */}
    <div className="relative w-14 h-14 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-full border border-gray-800/50 flex items-center justify-center group-hover:border-cyan-400/50 transition-all duration-300 shadow-lg">
      <Icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
      
      {/* Inner glow ring */}
      <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-300" />
    </div>
  </motion.a>
);

// GitHub Icon
const GitHubIcon = ({ className }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// LinkedIn Icon
const LinkedInIcon = ({ className }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// WhatsApp Icon
const WhatsAppIcon = ({ className }: IconProps) => (
  <svg
  className={className}
  fill="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.672.149-.198.297-.771.967-.946 1.165-.174.198-.348.223-.645.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.174-.297-.018-.458.131-.606.135-.134.297-.348.446-.522.149-.174.198-.298.297-.497.1-.198.05-.372-.025-.522-.075-.149-.672-1.616-.921-2.217-.243-.583-.49-.504-.672-.513l-.573-.01c-.198 0-.522.074-.796.372-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.08 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.871.118.571-.085 1.758-.718 2.006-1.412.248-.695.248-1.29.174-1.412-.074-.123-.272-.198-.57-.347zm-5.421 7.403h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.861 9.861 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.887-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.45-4.436 9.885-9.885 9.885zm8.413-18.297A11.815 11.815 0 0012.05.001C5.495 0 .16 5.335.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.86 11.86 0 005.683 1.45h.005c6.554 0 11.89-5.335 11.893-11.892a11.821 11.821 0 00-3.474-8.366z" />
</svg>
);
// Mail Icon
const MailIcon = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Location Icon
const LocationIcon = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Main Contact Section
const ContactSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 md:px-12 bg-black text-gray-100 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background effects */}
      <GlowingBeam />
      <HolographicGrid />
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-4xl mx-auto z-10"
      >
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Heading with animated underline */}
          <div className="mb-8">
            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Let&apos;s Build Something Meaningful
            </h2>
            <motion.div
              className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 200 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            I&apos;m <span className="text-cyan-400 font-semibold">Abdelhamid Ramdani</span> — a{' '}
            <span className="text-purple-400 font-semibold">Full-Stack Developer & CTO</span> from Djelfa, Algeria.
            Let&apos;s collaborate on modern web platforms, AI-powered solutions, or technical consultations.
          </motion.p>

          {/* Glass contact card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative inline-block mb-12"
          >
            {/* Card glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
            
            {/* Card container */}
            <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black/80 backdrop-blur-2xl rounded-2xl border border-gray-800/50 px-10 py-8 shadow-2xl">
              {/* Email link */}
              <motion.a
                href="mailto:abdelhamidramdani17@gmail.com"
                className="group flex items-center justify-center gap-3 text-xl font-medium mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <MailIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300">
                  abdelhamidramdani17@gmail.com
                </span>
              </motion.a>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

              {/* Location */}
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-400"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <LocationIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-lg">Djelfa, Algeria</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-6">
            <SocialIcon
              href="https://github.com/AbdelhamidRamdaniDz"
              icon={GitHubIcon}
              label="GitHub - Abdelhamid Ramdani"
              delay={0.6}
            />
            <SocialIcon
              href="https://www.linkedin.com/in/abdelhamid-ramdani/"
              icon={LinkedInIcon}
              label="LinkedIn - Abdelhamid Ramdani"
              delay={0.7}
            />
            <SocialIcon
              href="https://wa.me/213666564435"
              icon={WhatsAppIcon}
              label="Whatsapp - Abdelhamid Ramdani"
              delay={0.8}
            />
          </div>
        </motion.div>

        {/* Bottom wave effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-purple-500/5 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>

      {/* SEO content */}
      <span className="sr-only">
        Contact Abdelhamid Ramdani — Full-Stack Developer and CTO from Djelfa, Algeria.
        Expert in Next.js, Node.js, React, MongoDB, and AI integration. Available for 
        collaborations, freelance web development projects, startup partnerships, and 
        technical consultations. Specializing in modern web platforms, AI-powered solutions, 
        and scalable architecture. Email: abdelhamidramdani17@gmail.com
      </span>
    </section>
  );
};

export default ContactSection;