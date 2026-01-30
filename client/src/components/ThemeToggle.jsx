import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { springConfigs } from "@/hooks/useScrollVelocity";

const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme, isTransitioning } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      disabled={isTransitioning}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group relative w-11 h-11 rounded-xl bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center overflow-hidden disabled:opacity-70 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 shadow-sm hover:shadow-md"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, hsl(var(--accent) / 0.12), transparent 70%)"
            : "radial-gradient(circle at center, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      {/* Icon container */}
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ type: "spring", ...springConfigs.snappy }}
            className="relative"
          >
            <Moon className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ type: "spring", ...springConfigs.snappy }}
            className="relative"
          >
            <Sun className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
