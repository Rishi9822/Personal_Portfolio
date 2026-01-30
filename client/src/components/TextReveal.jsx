import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TextReveal = ({ children, className = "", delay = 0, splitBy = "chars" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const splitText = () => {
    if (splitBy === "words") {
      return children.split(" ");
    }
    if (splitBy === "lines") {
      return children.split("\n");
    }
    return children.split("");
  };

  const items = splitText();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === "chars" ? 0.02 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {item === " " ? "\u00A0" : item}
          {splitBy === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;