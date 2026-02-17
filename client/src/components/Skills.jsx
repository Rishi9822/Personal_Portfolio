import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  Code2,
  Palette,
  Server,
  Wrench,
  Database,
  Globe,
  Smartphone,
  Terminal,
  Cloud,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "../hooks/use-mobile.js";
import { StaggeredGrid } from "@/components/ui/staggered-grid";

const projectExamples = {
  JavaScript: [
    {
      title: "Interactive Dashboard",
      description: "Real-time analytics dashboard with dynamic charts",
      date: "2024",
    },
  ],
  React: [
    {
      title: "Portfolio Website",
      description: "Animated portfolio with Framer Motion",
      date: "2024",
    },
  ],
  Nodejs: [
    {
      title: "REST API Server",
      description: "Scalable backend serving 10k+ requests/min",
      date: "2024",
    },
  ],
};


// Extended skill data for rich carousel
const allSkills = [
  { name: "JavaScript", icon: Code2, level: 90, color: "primary" },
  { name: "React", icon: Layers, level: 88, color: "accent" },
  { name: "TypeScript", icon: Code2, level: 85, color: "primary" },
  { name: "Python", icon: Terminal, level: 82, color: "accent" },
  { name: "Nodejs", icon: Server, level: 80, color: "primary" },
  { name: "Next.js", icon: Globe, level: 78, color: "accent" },
  { name: "Tailwind CSS", icon: Palette, level: 92, color: "primary" },
  { name: "PostgreSQL", icon: Database, level: 75, color: "accent" },
  { name: "MongoDB", icon: Database, level: 78, color: "primary" },
  { name: "Docker", icon: Cloud, level: 68, color: "accent" },
  { name: "Git", icon: Wrench, level: 88, color: "primary" },
  { name: "AWS", icon: Cloud, level: 65, color: "accent" },
  { name: "GraphQL", icon: Cpu, level: 72, color: "primary" },
  { name: "React Native", icon: Smartphone, level: 70, color: "accent" },
  { name: "Vue.js", icon: Layers, level: 68, color: "primary" },
  { name: "Express", icon: Server, level: 80, color: "accent" },
];

// Skill categories for the bottom section
const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Python", "Java"],
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Frontend",
    icon: Palette,
    skills: ["React", "Next.js", "Tailwind CSS", "Vue.js"],
    gradient: "from-accent/20 to-accent/5",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Nodejs", "Express", "PostgreSQL", "MongoDB"],
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Docker", "AWS", "Linux"],
    gradient: "from-accent/20 to-accent/5",
  },
];

const SkillBadge = ({ label }) => (
  <span className="text-[10px] font-semibold tracking-[0.2em] text-white/90">
    {label}
  </span>
);

const desktopGridItems = allSkills.map((skill) => ({
  id: skill.name,
  label: skill.name,
  meta: `${skill.level}%`,
  tone: skill.color,
}));

const desktopBentoItems = [
  {
    id: "javascript",
    title: "JavaScript",
    icon: <SkillBadge label="JS" />,
    tone: "primary",
  },
  {
    id: "react",
    title: "React",
    icon: <SkillBadge label="REACT" />,
    tone: "accent",
  },
  {
    id: "node",
    title: "Node.js",
    icon: <SkillBadge label="NODE" />,
    tone: "primary",
  },
];

// Individual skill card for the carousel
const SkillCard = memo(({ skill, isActive, isMobile, onClick }) => {
  const IconComponent = skill.icon;
  const [isHovered, setIsHovered] = useState(false);
  const showEffects = isActive || isHovered;

  return (
    <motion.div
      className={`flex-shrink-0 cursor-pointer ${isMobile
        ? 'w-[140px] xs:w-[150px] mx-1.5'
        : 'w-[160px] sm:w-[180px] md:w-[200px] mx-2 md:mx-3'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
      onClick={() => onClick?.(skill)}
      whileHover={isMobile || !showEffects ? {} : { y: -8, scale: 1.02 }}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className={`relative rounded-2xl bg-card/80 backdrop-blur-xl border transition-all duration-300 overflow-hidden group ${isMobile ? 'p-4' : 'p-5 sm:p-6'
        } ${showEffects
          ? 'border-primary/50 shadow-lg shadow-primary/10'
          : 'border-border/50'
        }`}>
        {/* Animated glow background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color === 'primary'
            ? 'from-primary/10 via-transparent to-accent/5'
            : 'from-accent/10 via-transparent to-primary/5'
            } transition-opacity duration-300 ${showEffects ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Animated corner accents - only show on hover/active for desktop */}
        {showEffects && !isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/60 rounded-tl-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/60 rounded-br-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            />
          </>
        )}

        {/* Icon with animated background */}
        <div className="relative mb-3 sm:mb-4">
          <motion.div
            className={`rounded-xl flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'
              } ${skill.color === 'primary'
                ? 'bg-primary/10'
                : 'bg-accent/10'
              }`}
            animate={showEffects && !isMobile ? {
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 0.4 }}
          >
            <IconComponent className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6 sm:w-7 sm:h-7'
              } ${skill.color === 'primary' ? 'text-primary' : 'text-accent'
              }`} />
          </motion.div>

          {/* Floating sparkle */}
          {showEffects && (
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-primary`} />
            </motion.div>
          )}
        </div>

        {/* Skill name */}
        <h3 className={`font-bold mb-2 text-foreground transition-colors ${isMobile ? 'text-xs' : 'text-sm sm:text-base'
          } ${showEffects ? 'text-primary' : ''}`}>
          {skill.name}
        </h3>

        {/* Progress bar */}
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-muted-foreground ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
              Proficiency
            </span>
            <span
              className={`font-mono font-bold ${isMobile ? 'text-[10px]' : 'text-xs'
                } ${skill.color === 'primary' ? 'text-primary' : 'text-accent'
                }`}
            >
              {skill.level}%
            </span>
          </div>

          <div className={`rounded-full bg-secondary overflow-hidden ${isMobile ? 'h-1' : 'h-1.5'}`}>
            <motion.div
              className={`h-full rounded-full ${skill.color === 'primary'
                ? 'bg-gradient-to-r from-primary to-primary/70'
                : 'bg-gradient-to-r from-accent to-accent/70'
                }`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Infinite carousel row with improved touch support
const CarouselRow = memo(({ skills, direction, speed, isMobile, onSkillClick }) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);

  // Duplicate skills for seamless loop
  const duplicatedSkills = useMemo(() => [...skills, ...skills, ...skills], [skills]);

  // Calculate total width for animation
  const cardWidth = isMobile ? 143 : 206; // width + margin
  const totalWidth = skills.length * cardWidth;

  // Adjusted speed for mobile - slower for better readability
  const adjustedSpeed = isMobile ? speed * 1.5 : speed;

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setIsPaused(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    // Resume animation after a delay
    setTimeout(() => setIsPaused(false), 1000);
  }, []);

  return (
    <div
      className="relative overflow-hidden py-3 sm:py-4"
      ref={containerRef}
      onMouseEnter={() => !isMobile && setIsPaused(true)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
    >
      {/* Gradient masks - smaller on mobile */}
      <div className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none ${isMobile ? 'w-8' : 'w-16 sm:w-24 lg:w-32'
        }`} />
      <div className={`absolute right-0 top-0 bottom-0 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none ${isMobile ? 'w-8' : 'w-16 sm:w-24 lg:w-32'
        }`} />

      <motion.div
        className="flex cursor-grab active:cursor-grabbing will-change-transform"
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: -totalWidth, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
        animate={!isPaused && !isDragging ? {
          x: direction === 'left'
            ? [0, -totalWidth]
            : [-totalWidth, 0]
        } : {}}
        transition={!isPaused && !isDragging ? {
          x: {
            duration: adjustedSpeed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }
        } : {}}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCard
            key={`${skill.name}-${index}`}
            skill={skill}
            isActive={false}
            isMobile={isMobile}
            onClick={onSkillClick}
          />
        ))}
      </motion.div>

      {/* Touch hint for mobile */}
      {isMobile && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1 text-muted-foreground/50 text-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ChevronLeft className="w-3 h-3" />
          <span>Swipe</span>
          <ChevronRight className="w-3 h-3" />
        </motion.div>
      )}
    </div>
  );
});

// Category card component
const CategoryCard = memo(({ category, index, isInView, isMobile }) => {
  const IconComponent = category.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 200)}
      className="group"
    >
      <motion.div
        className={`relative rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden h-full ${isMobile ? 'p-3.5' : 'p-4 sm:p-5 lg:p-6'
          }`}
        whileHover={isMobile ? {} : { y: -4, scale: 1.01 }}
        whileTap={isMobile ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='currentColor' fill-opacity='0.3'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 relative">
          <motion.div
            className={`rounded-lg sm:rounded-xl bg-card/80 border border-border/50 ${isMobile ? 'p-1.5' : 'p-2 sm:p-2.5'
              }`}
            animate={isHovered && !isMobile ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <IconComponent className={`text-primary ${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
          </motion.div>
          <h3 className={`font-bold text-foreground ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
            {category.title}
          </h3>

          {/* Animated indicator - hide on mobile */}
          {!isMobile && (
            <motion.div
              className="ml-auto"
              animate={isHovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          )}
        </div>

        {/* Skills list */}
        <div className={`flex flex-wrap relative ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
          {category.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className={`rounded-md sm:rounded-lg font-mono bg-card/60 text-muted-foreground border border-border/30 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-200 ${isMobile ? 'px-2 py-0.5 text-[10px]' : 'px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs'
                }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.08 + i * 0.03 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});

const SkillDetailModal = ({ skill, isOpen, onClose, isMobile }) => {
  if (!skill) return null;

  const Icon = skill.icon;
  const projects = projectExamples[skill.name] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-card w-full mx-4 rounded-2xl p-5 sm:p-6 shadow-2xl ${isMobile ? "max-w-[95vw]" : "max-w-lg"
              }`}
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
            </div>

            {/* Projects */}
            <div className="space-y-3">
              {projects.length > 0 ? (
                projects.map((p) => (
                  <div
                    key={p.title}
                    className="p-3 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{p.title}</h4>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {p.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  More projects coming soon.
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-lg bg-primary text-primary-foreground py-2 font-medium"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



const Skills = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkillClick = useCallback((skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  }, []);


  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSkill(null), 200);
  }, []);



  // Use intersection observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Split skills for two rows
  const firstRowSkills = useMemo(() => allSkills.slice(0, 8), []);
  const secondRowSkills = useMemo(() => allSkills.slice(8), []);

  return (
    <section
      id="skills"
      className={`relative overflow-hidden ${
        isMobile ? "py-16 sm:py-20 lg:py-28" : "py-10 lg:py-16"
      }`}
      ref={containerRef}
    >
      {isMobile ? (
        <>
          {/* Section divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Background effects - reduced on mobile */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className={`absolute top-1/4 left-1/4 rounded-full blur-3xl bg-primary/5 ${
                isMobile
                  ? "w-[250px] h-[250px]"
                  : "w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
              }`}
              animate={
                isMobile
                  ? {}
                  : {
                      scale: [1, 1.2, 1],
                      x: [0, 50, 0],
                      y: [0, -30, 0],
                    }
              }
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute bottom-1/4 right-1/4 rounded-full blur-3xl bg-accent/5 ${
                isMobile
                  ? "w-[200px] h-[200px]"
                  : "w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
              }`}
              animate={
                isMobile
                  ? {}
                  : {
                      scale: [1, 1.3, 1],
                      x: [0, -40, 0],
                      y: [0, 40, 0],
                    }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="container relative z-10 px-4 sm:px-6">
            {/* Section header */}
            <ScrollReveal direction="up" distance={20}>
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <motion.span
                  className={`inline-block font-mono text-primary mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                  // my skills
                </motion.span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5">
                  Tech Stack & <span className="text-gradient">Expertise</span>
                </h2>
                <p
                  className={`text-muted-foreground max-w-xl mx-auto ${
                    isMobile ? "text-sm px-4" : "text-base lg:text-lg"
                  }`}
                >
                  Technologies I've mastered through projects and continuous
                  learning.
                </p>
              </div>
            </ScrollReveal>

            {/* Infinite carousel section */}
            <div
              className={`-mx-4 sm:-mx-6 lg:-mx-8 ${
                isMobile ? "mb-10" : "mb-14 lg:mb-20"
              }`}
            >
              {/* First row - left to right */}
              <CarouselRow
                skills={firstRowSkills}
                direction="left"
                speed={35}
                isMobile={isMobile}
                onSkillClick={handleSkillClick}
              />

              {/* Second row - right to left */}
              <CarouselRow
                skills={secondRowSkills}
                direction="right"
                speed={40}
                isMobile={isMobile}
                onSkillClick={handleSkillClick}
              />
            </div>

            {/* Category cards grid */}
            <div
              className={`grid gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto ${
                isMobile ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {skillCategories.map((category, index) => (
                <CategoryCard
                  key={category.title}
                  category={category}
                  index={index}
                  isInView={isInView}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Bottom decorative element */}
            <motion.div
              className={`flex justify-center ${
                isMobile ? "mt-8" : "mt-10 lg:mt-16"
              }`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div
                className={`flex items-center gap-2 sm:gap-3 text-muted-foreground ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                <motion.div
                  className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-border"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
                <span className="font-mono">Always learning</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Zap
                    className={`text-primary ${
                      isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                    }`}
                  />
                </motion.div>
                <motion.div
                  className="w-6 sm:w-8 h-px bg-gradient-to-l from-transparent to-border"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </div>
            </motion.div>
          </div>

          <SkillDetailModal
            skill={selectedSkill}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            isMobile={isMobile}
          />
        </>
      ) : (
        <div className="relative z-10 px-4 sm:px-6">
          <StaggeredGrid
            gridItems={desktopGridItems}
            bentoItems={desktopBentoItems}
            centerText="Expertise"
            showFooter={false}
            className="mx-auto"
          />
        </div>
      )}
    </section>
  );
};

export default Skills;
