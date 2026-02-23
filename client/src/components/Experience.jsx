import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useReducedMotion } from "framer-motion";
import { memo, useRef, useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink, Briefcase, ArrowRight, Code, Zap, TrendingUp, Award } from "lucide-react";
import MagneticButton from "./MagneticButton";

const experiences = [
  {
    id: 1,
    title: "Full-Stack Developer Intern",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    period: "Jun 2024 - Aug 2024",
    description: "Developed and maintained full-stack web applications using React, Node.js, and MongoDB. Implemented responsive designs and optimized database queries resulting in 30% performance improvement.",
    achievements: [
      "Built RESTful APIs serving 10K+ daily users",
      "Reduced page load time by 40% through optimization",
      "Collaborated with cross-functional team of 6 developers"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Git"],
    link: "#",
    icon: Code
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Digital Agency Pro",
    location: "Remote",
    period: "Jan 2024 - May 2024",
    description: "Created responsive and interactive user interfaces for client projects. Worked closely with design team to implement pixel-perfect designs and improve user experience.",
    achievements: [
      "Developed 5+ client websites with modern frameworks",
      "Improved mobile responsiveness across all projects",
      "Implemented accessibility features meeting WCAG 2.1 standards"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Framer Motion", "SASS"],
    link: "#",
    icon: Zap
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "StartUp Hub",
    location: "New York, NY",
    period: "Sep 2023 - Dec 2023",
    description: "Assisted in developing and maintaining company's main web application. Participated in code reviews and contributed to technical documentation.",
    achievements: [
      "Contributed to 15+ feature releases",
      "Improved code coverage by 25% through unit testing",
      "Mentored 2 junior developers on best practices"
    ],
    technologies: ["JavaScript", "React", "Vue.js", "Node.js", "PostgreSQL"],
    link: "#",
    icon: TrendingUp
  }
];

const seeded = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const bgParticles = Array.from({ length: 8 }, (_, i) => ({
  left: 10 + seeded(i + 1) * 80,
  top: 10 + seeded(i + 11) * 80,
  driftX: seeded(i + 21) * 40 - 20,
  duration: 4 + seeded(i + 31) * 3,
  delay: seeded(i + 41) * 2,
}));

const timelineParticles = Array.from({ length: 8 }, (_, i) => ({
  left: 30 + seeded(i + 51) * 60,
  top: seeded(i + 61) * 100,
  duration: 3 + seeded(i + 71) * 2,
  delay: seeded(i + 81) * 2,
}));

const ExperienceCard = memo(function ExperienceCard({ exp, index, isActive, direction, totalCards, isPerfConstrained }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "calc(-50% + 140px)",
        x: direction === "left" ? -40 : 40,
        scale: 0.96,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? "-50%" : "calc(-50% + 120px)",
        x: isActive ? 0 : direction === "left" ? -40 : 40,
        scale: isActive ? 1 : 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 24,
        mass: 0.8,
      }}
      className={`absolute top-1/2 w-full max-w-lg xl:max-w-xl will-change-transform ${direction === 'left'
        ? 'left-4 lg:left-12 xl:left-20'
        : 'right-4 lg:right-12 xl:right-20'
        } ${isActive ? 'pointer-events-auto z-20' : 'pointer-events-none z-0'}`}
    >
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 p-6 shadow-2xl shadow-background/50 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-500 lg:p-8"
        whileHover={isActive ? { 
          scale: 1.02,
          boxShadow: "0 25px 50px -10px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.1)",
        } : {}}
        transition={{ type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.3 }}
      >
        {/* Jawdropping glow behind card */}
        <div className={`absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-all duration-700 ${
          isActive 
            ? 'opacity-60 bg-gradient-to-r from-primary/30 via-purple-500/30 to-accent/30' 
            : 'opacity-0'
        } ${direction === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'}`} />

        {/* Premium background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Animated corner accents */}
        {isActive && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50"
              animate={isPerfConstrained ? undefined : { scale: [1, 1.25, 1] }}
              transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50"
              animate={isPerfConstrained ? undefined : { scale: [1, 1.25, 1] }}
              transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50"
              animate={isPerfConstrained ? undefined : { scale: [1, 1.25, 1] }}
              transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50"
              animate={isPerfConstrained ? undefined : { scale: [1, 1.25, 1] }}
              transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Premium card number badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
          <span className="font-mono text-xs text-primary font-bold">
            {String(index + 1).padStart(2, '0')}/{String(totalCards).padStart(2, '0')}
          </span>
        </div>

        {/* Header with enhanced effects */}
        <div className="flex items-start gap-4 mb-5 pr-16">
          <motion.div
            className="p-3 rounded-xl bg-gradient-to-br from-primary/20 via-purple-500/15 to-accent/10 group-hover:scale-110 transition-all duration-300 shadow-lg"
            whileHover={{ 
              rotate: 360,
              boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.3)"
            }}
            transition={{ duration: 0.6 }}
          >
            <Briefcase className="w-6 h-6 text-primary" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-primary transition-all duration-300">
              {exp.title}
              {isActive && (
                <motion.div
                  className="inline-block ml-2 w-2 h-2 bg-primary rounded-full"
                  animate={isPerfConstrained ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
              <span className="font-semibold text-foreground">
                {exp.company}
              </span>
              <span className="hidden sm:inline text-primary">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Period with enhanced styling */}
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            className="p-1.5 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 shadow-md"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 5px 15px -3px hsl(var(--primary) / 0.3)"
            }}
            transition={{ duration: 0.2 }}
          >
            <Calendar className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="font-mono text-primary text-sm font-medium">{exp.period}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-5 leading-relaxed text-sm lg:text-base">
          {exp.description}
        </p>

        {/* Achievements with enhanced styling */}
        <div className="mb-5">
          <h4 className="font-bold mb-3 text-sm flex items-center gap-2">
          <motion.div
            className="p-1 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10"
            animate={isPerfConstrained ? undefined : { rotate: [0, 5, 0] }}
            transition={isPerfConstrained ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Award className="w-4 h-4 text-primary" />
          </motion.div>
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {exp.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="text-muted-foreground flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0"
                  animate={isPerfConstrained ? undefined : { scale: [1, 1.3, 1] }}
                  transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
                <span className="text-sm leading-relaxed">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies with enhanced hover effects */}
        <div className="mb-5">
          <h4 className="font-bold mb-3 text-sm">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-gradient-to-r from-secondary/50 to-secondary/30 text-foreground/80 border border-border/30 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Enhanced link button */}
        {exp.link && exp.link !== "#" && (
          <MagneticButton strength={0.3}>
            <motion.a
              href={exp.link}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.02, 
                x: 4,
                boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.2 }}
            >
              <ExternalLink className="w-4 h-4" />
              View Details
              <motion.div
                animate={isPerfConstrained ? undefined : { x: [0, 4, 0] }}
                transition={isPerfConstrained ? undefined : { duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.a>
          </MagneticButton>
        )}
      </motion.div>
    </motion.div>
  );
});

// Mobile card component for normal scrolling
const MobileExperienceCard = memo(function MobileExperienceCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary border-2 border-background z-10" />

      <div className="group p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
              {exp.title}
            </h3>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-foreground">{exp.company}</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Period */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-3 h-3 text-primary" />
          <span className="font-mono text-primary text-xs">{exp.period}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {exp.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs font-mono bg-secondary text-foreground/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const Experience = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isLowPerfDesktop, setIsLowPerfDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isPerfConstrained = prefersReducedMotion || isLowPerfDesktop;
  const totalSteps = experiences.length;
  const progress = totalSteps > 1 ? activeIndex / (totalSteps - 1) : 0;
  const activeBgParticles = isPerfConstrained ? bgParticles.slice(0, 5) : bgParticles;
  const activeTimelineParticles = isPerfConstrained ? timelineParticles.slice(0, 5) : timelineParticles;

  const smoothProgress = useSpring(progress, {
    stiffness: 52,
    damping: 22,
    mass: 0.9,
  });

  const progressHeight = useTransform(smoothProgress, (v) => `${v * 70}vh`);


  // SSR-safe responsive detection
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      const cores = navigator.hardwareConcurrency ?? 8;
      const memory = navigator.deviceMemory ?? 8;
      const lowPerf = desktop && (cores <= 4 || memory <= 4);
      setIsLowPerfDesktop(lowPerf);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active experience based on scroll progress with discrete steps
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / experiences.length;
    const buffered = step * 0.15;

    const newIndex = Math.min(
      Math.floor((latest + buffered) / step),
      experiences.length - 1
    );
    if (newIndex >= 0) {
      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    }
  });

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, isPerfConstrained ? -18 : -50]);

  // Mobile/Tablet: Normal scrolling layout
  if (!isDesktop) {
    return (
      <section id="experience" className="py-20 lg:py-28 relative overflow-hidden">
        {/* Section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Transforming ideas into impactful digital solutions.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <MobileExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Pinned scroll-snap behavior
  return (
    <section id="experience" className="relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent z-10" />

      {/* Scroll container - height = experiences × 100vh */}
      <div
        ref={containerRef}
        style={{ height: `${experiences.length * 100}vh` }}
        className="relative"
      >

        {/* Background with jawdropping parallax and effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background"
          style={{ y: bgY }}
        >
          {/* Premium gradient orbs with animation */}
          <motion.div
            className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-purple-500/6 rounded-full blur-3xl"
            animate={isPerfConstrained ? undefined : { scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={isPerfConstrained ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-tr from-accent/8 to-cyan-500/6 rounded-full blur-3xl"
            animate={isPerfConstrained ? undefined : { scale: [1, 1.4, 1], x: [0, -60, 0], y: [0, 40, 0] }}
            transition={isPerfConstrained ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating geometric shapes */}
          {activeBgParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={isPerfConstrained ? undefined : { y: [0, -30, 0], x: [0, particle.driftX, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 2, 1] }}
              transition={isPerfConstrained ? undefined : { duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
            />
          ))}
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-30" />
        </motion.div>

        {/* Content container */}
        <div className="relative h-full flex flex-col">
          {/* Header - fixed at top */}
          <div className="pt-16 lg:pt-20 pb-6 text-center relative z-20">
            <motion.h2
              className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Work <span className="text-gradient">Experience</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Transforming ideas into impactful digital solutions.
            </motion.p>
          </div>
          {/* Sticky viewport - this is where the magic happens */}
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Main content area - cards and timeline */}
            <div className="relative h-full flex items-center justify-center">
              {/* Center timeline - perfectly positioned with highly visible effects */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                h-[70vh] w-[120px] z-30">
                
                {/* Premium ambient gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-accent/10 rounded-full blur-2xl" />
                
                {/* Animated floating particles for premium feel */}
                {activeTimelineParticles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/50"
                    style={{
                      left: `${particle.left}px`,
                      top: `${particle.top}%`,
                    }}
                    animate={isPerfConstrained ? undefined : { y: [0, -25, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.8, 1] }}
                    transition={isPerfConstrained ? undefined : { duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
                  />
                ))}

                {/* Progress line container – fixed height */}
<div
  className="absolute left-1/2 -translate-x-1/2 top-0
    w-[12px] h-[70vh] rounded-full overflow-hidden z-40"
>
  {/* Animated progress fill */}
  <motion.div
    className="absolute top-0 left-0 w-full rounded-full"
    style={{ height: progressHeight }}
  >
    {/* Bright core */}
    <div className="absolute inset-0 bg-gradient-to-b from-primary via-purple-500 to-accent rounded-full">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-b from-primary/70 via-purple-500/70 to-accent/70 blur-2xl" />
      <div className="absolute -inset-2 bg-gradient-to-b from-primary/90 via-purple-500/90 to-accent/90 blur-xl" />
    </div>
  </motion.div>
</div>


                {/* Step dots - perfectly aligned with premium effects */}
                {experiences.map((_, index) => {
                  const dotPosition = (index / (experiences.length - 1)) * 100;
                  const isCompleted = activeIndex >= index;
                  const isCurrent = activeIndex === index;

                  return (
                    <motion.div
                      key={index}
                      className="absolute left-1/2 -translate-x-1/2 z-50"
                      style={{ top: `${dotPosition}%` }}
                      animate={{
                        scale: isCurrent ? 1.5 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    >
                      {/* Outer ring for active state */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-3 border-primary"
                          animate={isPerfConstrained ? undefined : { scale: [1, 2.5, 1], opacity: [1, 0.3, 1] }}
                          transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            width: '40px',
                            height: '40px',
                            left: '-7px',
                            top: '-7px',
                          }}
                        />
                      )}
                      
                      {/* Main dot with premium styling */}
                      <div
                        className={`w-4 h-4 rounded-full border-4 transition-all duration-700 relative ${
                          isCompleted
                            ? 'bg-primary border-primary shadow-[0_0_40px_hsl(var(--primary))]'
                            : 'bg-background border-border/80'
                        }`}
                        style={{
                          boxShadow: isCurrent 
                            ? '0 0 50px hsl(var(--primary) / 1), 0 0 25px hsl(var(--primary) / 0.7), inset 0 0 15px hsl(var(--primary) / 0.4)' 
                            : isCompleted 
                              ? '0 0 20px hsl(var(--primary) / 0.6), inset 0 0 8px hsl(var(--primary) / 0.3)'
                              : '0 0 8px hsl(var(--border) / 0.4)'
                        }}
                      >
                        {/* Inner glow for active state */}
                        {isCurrent && (
                          <>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary"
                              animate={isPerfConstrained ? undefined : { scale: [1, 0.6, 1], opacity: [1, 0.3, 1] }}
                              transition={isPerfConstrained ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </>
                        )}
                        
                        {/* Completed state checkmark */}
                        {isCompleted && !isCurrent && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 text-primary font-bold" style={{
                              fontSize: '10px',
                            }}>
                              ✓
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Connecting line to dot */}
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/60 to-transparent"
                        style={{
                          height: '25px',
                          top: isCurrent ? '-25px' : '-15px',
                          opacity: isCompleted ? 1 : 0.4,
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Progress percentage indicator */}
                <motion.div
                  className="absolute -right-9 lg:-right-10 top-1/2 -translate-y-1/2 text-primary font-mono text-sm font-bold bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-primary/40 shadow-lg"
                  animate={isPerfConstrained ? undefined : { opacity: [0.8, 1, 0.8] }}
                  transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {Math.round(progress * 100)}%
                </motion.div>
              </div>

              {/* Experience cards container */}
              <div className="absolute inset-0 px-4">
                {experiences.map((exp, index) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    index={index}
                    isActive={activeIndex === index}
                    direction={index % 2 === 0 ? 'left' : 'right'}
                    totalCards={experiences.length}
                    isPerfConstrained={isPerfConstrained}
                  />
                ))}
              </div>

              {/* Step indicators at bottom */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {experiences.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-full transition-all duration-500 ${activeIndex === index
                        ? 'w-8 h-2 bg-primary'
                        : 'w-2 h-2 bg-border'
                        }`}
                      animate={{
                        scale: activeIndex === index ? 1 : 0.8,
                      }}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2 ml-4 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50">
                  <span className="font-mono text-lg font-bold text-primary">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-mono text-muted-foreground">
                    {String(experiences.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Scroll hint */}
                <motion.div
                  className="flex items-center gap-2 text-muted-foreground text-sm"
                  animate={isPerfConstrained ? undefined : { opacity: [0.5, 1, 0.5] }}
                  transition={isPerfConstrained ? undefined : { duration: 2, repeat: Infinity }}
                >
                  <span>Scroll</span>
                  <motion.div
                    animate={isPerfConstrained ? undefined : { y: [0, 4, 0] }}
                    transition={isPerfConstrained ? undefined : { duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

