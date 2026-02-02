import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { cinematicEasing } from "@/hooks/useScrollVelocity";
import { ReactLenis } from "lenis/react";


const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const duration = 2000; // Total loading time
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setPhase("complete");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 800);
        }, 400);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: phase === "exit" ? 0 : 1,
        scale: phase === "exit" ? 1.05 : 1,
      }}
      transition={{ 
        duration: 0.8, 
        ease: cinematicEasing.smooth,
      }}
    >
      {/* Ambient background effects */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: cinematicEasing.reveal }}
        className="text-center relative z-10"
      >
        {/* Logo */}
        <motion.div
          className="text-5xl md:text-7xl font-mono font-bold mb-10"
          animate={phase === "complete" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.span 
            className="text-gradient inline-block"
            animate={{ 
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &lt;dev /&gt;
          </motion.span>
        </motion.div>
        
        {/* Progress bar container */}
        <div className="relative w-72 md:w-80">
          {/* Progress bar background */}
          <div className="h-1 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Progress fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          
          {/* Progress glow */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-primary rounded-full"
            style={{ 
              width: `${progress}%`,
              boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3)",
            }}
          />
        </div>
        
        {/* Loading text */}
        <motion.div 
          className="mt-6 flex items-center justify-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="font-mono text-sm text-muted-foreground">
            {phase === "complete" ? "Welcome" : "Loading experience"}
          </span>
          <span className="font-mono text-sm text-primary">
            {Math.round(progress)}%
          </span>
        </motion.div>

        {/* Animated dots */}
        {phase === "loading" && (
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 font-mono text-xs text-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        v1.0.0
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 font-mono text-xs text-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © 2024
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>Rishi Patel | CS Student & Developer</title>
        <meta
          name="description"
          content="Portfolio of a passionate third-year Computer Science student specializing in full-stack development, building elegant digital experiences."
        />
        <meta name="keywords" content="developer, portfolio, computer science, web development, react, full-stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0c10" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Rishi Patel | CS Student & Developer" />
        <meta property="og:description" content="Portfolio of a passionate CS student building elegant digital experiences." />
        <meta property="og:type" content="website" />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="relative cursor-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: cinematicEasing.smooth }}
      >
        {/* Custom cursor */}
        <CursorFollower />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content */}
        <main className="relative z-10">
          <section id="home" tabIndex="-1">
            <Hero />
          </section>
          <section id="about" tabIndex="-1">
            <About />
          </section>
<ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>

          <section id="experience" tabIndex="-1">
            <Experience />
          </section>
          </ReactLenis>


          <section id="skills" tabIndex="-1">
            <Skills />
          </section>
          <section id="projects" tabIndex="-1">
            <Projects />
          </section>
          <section id="contact" tabIndex="-1">
            <Contact />
          </section>
        </main>
        
        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;