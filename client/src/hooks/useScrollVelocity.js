import { useScroll, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect } from "react";

export const useScrollVelocity = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth velocity for ambient effects
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Normalized velocity between -1 and 1
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-1, 0, 1]);

  return {
    scrollY,
    scrollYProgress,
    scrollVelocity,
    smoothVelocity,
    velocityFactor,
  };
};

export const useReducedMotion = () => {
  const prefersReducedMotion = 
    typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;
  
  return prefersReducedMotion;
};

// Cinematic easing curves
export const cinematicEasing = {
  // Smooth entrance
  enter: [0.22, 1, 0.36, 1],
  // Subtle exit
  exit: [0.55, 0, 1, 0.45],
  // Elegant bounce
  bounce: [0.34, 1.56, 0.64, 1],
  // Smooth inOut
  smooth: [0.76, 0, 0.24, 1],
  // Quick start, slow end
  reveal: [0.16, 1, 0.3, 1],
};

// Premium spring configs
export const springConfigs = {
  // Buttery smooth for UI elements
  smooth: { stiffness: 100, damping: 20, mass: 0.5 },
  // Snappy for interactions
  snappy: { stiffness: 300, damping: 30, mass: 0.8 },
  // Gentle for large movements
  gentle: { stiffness: 50, damping: 15, mass: 1 },
  // Bouncy for playful elements
  bouncy: { stiffness: 400, damping: 25, mass: 0.5 },
  // Heavy for dramatic reveals
  dramatic: { stiffness: 80, damping: 20, mass: 2 },
};