import { motion, useInView } from "framer-motion";
import { useRef, forwardRef } from "react";

const ScrollReveal = forwardRef(({ 
  children, 
  direction = "up", 
  distance = 30, 
  delay = 0, 
  duration = 0.6,
  blur = false,
  scale = false,
  className = "",
  ...props 
}, ref) => {
  const internalRef = useRef(null);
  const isInView = useInView(ref || internalRef, { once: true, margin: "-100px" });

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getFinalTransform = () => {
    const base = { x: 0, y: 0, opacity: 1 };
    if (blur) {
      base.filter = "blur(0px)";
    }
    return base;
  };

  const initial = getInitialTransform();
  if (blur) {
    initial.filter = "blur(10px)";
  }
  if (scale) {
    initial.scale = 0.8;
  }

  return (
    <motion.div
      ref={ref || internalRef}
      initial={initial}
      animate={isInView ? getFinalTransform() : initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;