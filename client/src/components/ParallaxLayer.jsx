import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { useRef } from "react";

const ParallaxLayer = ({
  children,
  className = "",
  speed = 0.5,
  scale = false,
  opacity = false,
  rotate = false,
  velocityAware = false,
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Velocity-aware parallax for premium feel
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });

  // Parallax transforms
  const distance = speed * 200;
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance, -distance]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  // Optional transforms
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [-5 * speed, 5 * speed]);
  
  // Velocity-based skew for motion feel
  const skewY = velocityAware 
    ? useTransform(smoothVelocity, [-3000, 0, 3000], [2, 0, -2])
    : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        scale: scale ? scaleValue : 1,
        opacity: opacity ? opacityValue : 1,
        rotate: rotate ? rotateValue : 0,
        skewY: velocityAware ? skewY : 0,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;