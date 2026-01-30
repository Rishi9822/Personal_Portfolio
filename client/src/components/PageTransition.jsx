import { motion, AnimatePresence } from "framer-motion";
import { cinematicEasing } from "@/hooks/useScrollVelocity";

const PageTransition = ({ children, isVisible }) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: cinematicEasing.smooth }}
        >
          {/* Reveal animation layers */}
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: cinematicEasing.reveal, delay: 0.1 }}
            style={{ 
              background: "hsl(var(--primary))",
              transformOrigin: "top",
            }}
          />
          <motion.div
            className="fixed inset-0 z-[99] pointer-events-none"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: cinematicEasing.reveal, delay: 0.2 }}
            style={{ 
              background: "hsl(var(--background))",
              transformOrigin: "top",
            }}
          />
          
          {/* Main content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: cinematicEasing.smooth, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
