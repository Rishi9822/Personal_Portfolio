import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxSection = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const getTransform = () => {
    const distance = speed * 200;
    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case "down":
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      case "left":
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
    }
  };

  const transform = getTransform();
  const isVertical = direction === "up" || direction === "down";

  return (
    <motion.div
      ref={ref}
      style={{ 
        [isVertical ? "y" : "x"]: transform 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;