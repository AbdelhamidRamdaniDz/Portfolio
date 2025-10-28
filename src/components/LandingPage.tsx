"use client";
import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ServicesSection from "./ServicesSection";
import PhilosophySection from "./PhilosophySection";
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
    animateElements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      animateElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
  return (
    <main className="relative z-10 bg-black text-text font-inter scroll-smooth antialiased">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <PhilosophySection />
      <ContactSection /> 
      <Footer />
    </main>
  );
};

export default LandingPage;
