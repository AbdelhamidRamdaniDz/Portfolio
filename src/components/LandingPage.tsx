"use client";
import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ServicesSection from "./ServicesSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  useEffect(() => {
    const animateElements = document.querySelectorAll(".animate-in");
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    animateElements.forEach((el) => observer.observe(el));
    return () => animateElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
