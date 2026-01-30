import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, GraduationCap, Rocket, Coffee, Sparkles, Terminal, Zap } from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { cinematicEasing, springConfigs } from "@/hooks/useScrollVelocity";

const stats = [
  { icon: Code, value: "15+", label: "Projects Completed", color: "primary" },
  { icon: GraduationCap, value: "3rd", label: "Year CS Student", color: "accent" },
  { icon: Rocket, value: "3+", label: "Years Coding", color: "primary" },
  { icon: Coffee, value: "∞", label: "Coffee Consumed", color: "accent" },
];

const technologies = [
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "Docker", category: "devops" },
  { name: "Tailwind", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Git", category: "tool" },
  { name: "AWS", category: "cloud" },
  { name: "MongoDB", category: "database" },
  { name: "GraphQL", category: "backend" },
];

const About = () => {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });
  const visualInView = useInView(visualRef, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, springConfigs.smooth);
  const rotate = useTransform(smoothProgress, [0, 1], [-5, 5]);

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Section divider with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left column - Premium Visual */}
          <ScrollReveal direction="left" distance={80} blur scale>
            <motion.div
              ref={visualRef}
              className="relative"
            >
              <motion.div 
                className="relative aspect-square max-w-lg mx-auto"
                style={{ perspective: "1200px" }}
              >
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "conic-gradient(from 0deg at 50% 50%, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
                    rotate,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-[3px] rounded-3xl bg-card" />
                </motion.div>
                
                {/* Inner glass container */}
                <motion.div
                  className="absolute inset-5 rounded-2xl glass border border-border/30 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", ...springConfigs.snappy }}
                >
                  {/* Grid overlay */}
                  <div className="absolute inset-0 grid-background opacity-20" />
                  
                  {/* Central animated element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Terminal className="w-32 h-32 text-primary/20 stroke-[1]" />
                    </motion.div>
                  </div>

                  {/* Floating code snippets */}
                  {[
                    { code: "const", top: "15%", left: "10%", delay: 0 },
                    { code: "build()", top: "25%", right: "15%", delay: 0.5 },
                    { code: "async", bottom: "30%", left: "15%", delay: 1 },
                    { code: "=>", bottom: "20%", right: "20%", delay: 1.5 },
                  ].map((snippet, i) => (
                    <motion.span
                      key={i}
                      className="absolute font-mono text-sm text-primary/40"
                      style={{ top: snippet.top, left: snippet.left, right: snippet.right, bottom: snippet.bottom }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={visualInView ? { 
                        opacity: [0.3, 0.6, 0.3],
                        scale: 1,
                        y: [0, -10, 0],
                      } : {}}
                      transition={{
                        opacity: { duration: 3, repeat: Infinity, delay: snippet.delay },
                        scale: { duration: 0.5, delay: snippet.delay + 0.5 },
                        y: { duration: 4, repeat: Infinity, delay: snippet.delay },
                      }}
                    >
                      {snippet.code}
                    </motion.span>
                  ))}

                  {/* Ambient particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                        background: i % 2 === 0 
                          ? "hsl(var(--primary) / 0.5)" 
                          : "hsl(var(--accent) / 0.5)",
                      }}
                      animate={{
                        y: [0, -25, 0],
                        opacity: [0.2, 0.7, 0.2],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                {/* Floating badges with 3D tilt */}
                <motion.div
                  className="absolute -top-4 -right-4 px-5 py-3 rounded-2xl glass border border-primary/30 shadow-lg"
                  initial={{ opacity: 0, y: 30, rotateX: -45 }}
                  animate={visualInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 0.6, type: "spring", ...springConfigs.bouncy }}
                  whileHover={{ scale: 1.1, rotateY: 15, z: 50 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.span
                    className="font-mono text-primary text-sm flex items-center gap-2"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4" />
                    React Expert
                  </motion.span>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl glass border border-accent/30 shadow-lg"
                  initial={{ opacity: 0, y: -30, rotateX: 45 }}
                  animate={visualInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 0.8, type: "spring", ...springConfigs.bouncy }}
                  whileHover={{ scale: 1.1, rotateY: -15, z: 50 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.span
                    className="font-mono text-accent text-sm flex items-center gap-2"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4" />
                    Fast Learner
                  </motion.span>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-8 px-4 py-2 rounded-xl glass border border-primary/20"
                  initial={{ opacity: 0, x: 30 }}
                  animate={visualInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-mono text-xs text-muted-foreground">TypeScript →</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Right column - Content */}
          <div>
            <ScrollReveal direction="right" distance={60} delay={0.2}>
              <motion.span 
                className="font-mono text-primary text-sm mb-6 block"
              >
                // about me
              </motion.span>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={40} delay={0.3}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Passionate about
                <br />
                <span className="text-gradient">
                  building things
                </span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={30} delay={0.5}>
              <div className="space-y-5 text-muted-foreground text-lg mb-10 leading-relaxed">
                <p>
                  I'm a third-year Computer Science student with a deep passion for 
                  creating elegant solutions to complex problems. My journey in tech 
                  started with curiosity and has evolved into a love for full-stack 
                  development.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open-source projects, or sharing knowledge with 
                  fellow developers.
                </p>
              </div>
            </ScrollReveal>

            {/* Technology pills */}
            <ScrollReveal direction="up" distance={30} delay={0.6}>
              <div className="flex flex-wrap gap-2 mb-12">
                {technologies.map((tech, i) => (
                  <motion.span
                    key={tech.name}
                    className={`px-4 py-2 rounded-full text-sm font-mono cursor-default transition-all duration-300 ${
                      hoveredTech === tech.name 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    }`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ 
                      delay: 0.8 + i * 0.03,
                      type: "spring",
                      ...springConfigs.snappy,
                    }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} direction="up" distance={40} delay={0.9 + i * 0.1}>
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { type: "spring", ...springConfigs.snappy }
                    }}
                    className="group relative p-5 rounded-2xl glass border border-border/50 text-center overflow-hidden cursor-default"
                  >
                    {/* Hover gradient */}
                    <motion.div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        stat.color === "primary" 
                          ? "bg-gradient-to-br from-primary/15 to-transparent" 
                          : "bg-gradient-to-br from-accent/15 to-transparent"
                      }`}
                    />
                    
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6, ease: cinematicEasing.smooth }}
                    >
                      <stat.icon className={`w-7 h-7 mx-auto mb-3 ${
                        stat.color === "primary" ? "text-primary" : "text-accent"
                      }`} />
                    </motion.div>
                    
                    <div className="text-3xl font-bold text-foreground mb-1 relative z-10">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground relative z-10">{stat.label}</div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;