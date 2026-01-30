import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cinematicEasing } from "@/hooks/useScrollVelocity";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const duration = 1800;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      // Eased progress for smoother feel
      const linear = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 3); // ease-out cubic
      const newProgress = eased * 100;
      
      setProgress(newProgress);
      
      if (linear < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setPhase("complete");
        setTimeout(() => {
          setPhase("reveal");
          setTimeout(onComplete, 800);
        }, 400);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  // Letter animation for logo
  const logoLetters = ["<", "d", "e", "v", " ", "/", ">"];
  
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: phase === "reveal" ? 0 : 1,
      }}
      transition={{ duration: 0.6, ease: cinematicEasing.smooth }}
    >
      {/* Animated background grid */}
      <motion.div 
        className="absolute inset-0 grid-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Radial gradient backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Animated curtains that reveal */}
      <motion.div
        className="absolute inset-0 bg-primary/5"
        initial={{ scaleY: 0 }}
        animate={{ 
          scaleY: phase === "reveal" ? 0 : 1,
          originY: phase === "reveal" ? 0 : 0.5,
        }}
        transition={{ duration: 0.6, ease: cinematicEasing.reveal }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative text-center z-10"
      >
        {/* Animated Logo */}
        <div className="text-5xl md:text-7xl font-mono font-bold mb-10 flex justify-center">
          {logoLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                scale: phase === "complete" ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                duration: 0.4, 
                delay: 0.2 + i * 0.05,
                ease: cinematicEasing.reveal,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
        
        {/* Progress bar container */}
        <div className="relative w-64 md:w-80">
          {/* Background track */}
          <div className="h-1 bg-border/50 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Animated gradient progress */}
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ 
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
              }}
              transition={{ ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/50" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/50" />
        </div>
        
        {/* Loading text with typing effect */}
        <motion.div 
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span 
            className="font-mono text-sm text-muted-foreground tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {phase === "complete" ? "Welcome" : "Initializing"}
          </motion.span>
          
          <span className="text-border">|</span>
          
          <motion.span 
            className="font-mono text-sm font-semibold text-primary tabular-nums"
            key={Math.round(progress)}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>

        {/* Animated dots */}
        {phase === "loading" && (
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/60"
                animate={{ 
                  y: [0, -6, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Corner decorations */}
      <motion.div 
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div 
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/20 rounded-br-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
    </motion.div>
  );
};

export default Preloader;
