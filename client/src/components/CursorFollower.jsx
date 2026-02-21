import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const [isEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [isHovering, setIsHovering] = useState(false);
  const hoverRef = useRef(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const mainX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.18 });
  const mainY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.18 });
  const trailX = useSpring(x, { stiffness: 320, damping: 34, mass: 0.3 });
  const trailY = useSpring(y, { stiffness: 320, damping: 34, mass: 0.3 });

  useEffect(() => {
    if (!isEnabled) return;

    const interactiveSelector =
      "a,button,[role='button'],input,textarea,select,[data-cursor='interactive'],.grid__item,.bento-container";

    const handlePointerMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const nextHover = !!target.closest(interactiveSelector);
      if (hoverRef.current !== nextHover) {
        hoverRef.current = nextHover;
        setIsHovering(nextHover);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
    };
  }, [isEnabled, x, y]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 will-change-transform"
        style={{ x: mainX, y: mainY }}
        initial={false}
        animate={{ scale: isHovering ? 1.7 : 1 }}
        transition={{
          type: "tween",
          duration: 0.14,
          scale: {
            type: "spring",
            stiffness: 800,
            damping: 30,
          },
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-primary/30 rounded-full pointer-events-none z-40 will-change-transform"
        style={{ x: trailX, y: trailY }}
        initial={false}
        animate={{ scale: isHovering ? 1.35 : 1 }}
        transition={{
          type: "tween",
          duration: 0.18,
          scale: {
            type: "spring",
            stiffness: 380,
            damping: 28,
          },
        }}
      />
    </>
  );
};

export default CursorFollower;
