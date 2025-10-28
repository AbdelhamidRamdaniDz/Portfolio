"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface GradientBeamProps {
  color?: string;
  duration?: number;
  delay?: number;
}

const GradientBeam: React.FC<GradientBeamProps> = ({
  color = "cyan-400",
  duration = 3,
  delay = 0
}) => (
  <motion.div
    className="absolute top-0 left-0 right-0 h-px overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
  >
    <motion.div
      className={`h-full w-full bg-gradient-to-r from-transparent via-${color} to-transparent`}
      animate={{
        x: ['-100%', '200%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 1,
      }}
    />
    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}/50 to-transparent blur-sm`} />
  </motion.div>
);

export default GradientBeam;