import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cinematicEasing } from "@/hooks/useScrollVelocity";

const SectionTransition = ({
  children,
  className = "",
  id,
  variant = "reveal",
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  // Smooth springs for premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values for cinematic reveal
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [100, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1]);
  const blur = useTransform(smoothProgress, [0, 0.5, 1], [8, 4, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [5, 0]);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade":
        return { opacity };
      case "slide":
        return { opacity, y };
      case "parallax":
        return { opacity, y, scale };
      case "reveal":
      default:
        return { 
          opacity, 
          y, 
          scale,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : "none",
          rotateX,
        };
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{
        ...getVariantStyles(),
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.section>
  );
};

export default SectionTransition;