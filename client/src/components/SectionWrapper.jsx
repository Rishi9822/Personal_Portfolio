import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

const SectionWrapper = ({
  children,
  id,
  className = "",
  variant = "reveal",
}) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-15%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });

  // Smooth spring for butter-smooth animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform values based on scroll
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(smoothProgress, [0, 1], [60, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.97, 1]);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade":
        return { opacity };
      case "slide":
        return { opacity, y };
      case "scale":
        return { opacity, scale };
      case "reveal":
      default:
        return { opacity, y, scale };
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{
        ...getVariantStyles(),
        willChange: isInView ? "auto" : "transform, opacity",
      }}
    >
      {/* Section transition overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0 : 0.5 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;