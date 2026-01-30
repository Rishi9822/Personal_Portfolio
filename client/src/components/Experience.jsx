import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

const ExperienceCard = ({ exp, index, isActive, direction, totalCards }) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -120 : 120, scale: 0.85 }}
      animate={{
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : direction === 'left' ? -120 : 120,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? "blur(0px)" : "blur(4px)",
        y: '-50%',
      }}
      transition={{
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`absolute top-1/2 w-full max-w-lg xl:max-w-xl ${direction === 'left'
        ? 'left-4 lg:left-12 xl:left-20'
        : 'right-4 lg:right-12 xl:right-20'
        } ${isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'}`}
    >
      <div className="group relative p-6 lg:p-8 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-2xl shadow-background/50">
        {/* Subtle glow behind card */}
        <div className={`absolute -inset-1 rounded-2xl opacity-20 blur-xl transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-0'
          } ${direction === 'left' ? 'bg-gradient-to-r from-primary to-transparent' : 'bg-gradient-to-l from-accent to-transparent'}`} />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Card number badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="font-mono text-xs text-primary font-medium">
            {String(index + 1).padStart(2, '0')}/{String(totalCards).padStart(2, '0')}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5 pr-16">
          <motion.div
            className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Briefcase className="w-6 h-6 text-primary" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {exp.title}
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

        {/* Period */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono text-primary text-sm font-medium">{exp.period}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-5 leading-relaxed text-sm lg:text-base">
          {exp.description}
        </p>

        {/* Achievements */}
        <div className="mb-5">
          <h4 className="font-bold mb-3 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {exp.achievements.map((achievement, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-5">
          <h4 className="font-bold mb-3 text-sm">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-secondary text-foreground/80 border border-border/30 hover:border-primary/50 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Link */}
        {exp.link && exp.link !== "#" && (
          <MagneticButton strength={0.3}>
            <motion.a
              href={exp.link}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              View Details
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </MagneticButton>
        )}
      </div>
    </motion.div>
  );
};

// Mobile card component for normal scrolling
const MobileExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
};

const Experience = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // SSR-safe responsive detection
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
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
    if (newIndex !== activeIndex && newIndex >= 0) {
      setActiveIndex(newIndex);
    }
  });

  const step = 1 / experiences.length;

  const snappedProgress = useTransform(scrollYProgress, (latest) => {
    const snapped = Math.floor(latest / step) * step;
    return Math.min(snapped, 1);
  });

  const smoothSnappedProgress = useSpring(snappedProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });



  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Mobile/Tablet: Normal scrolling layout
  if (!isDesktop) {
    return (
      <section id="experience" className="py-20 lg:py-28 relative overflow-hidden">
        {/* Section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono text-primary text-sm mb-4 block">
              // my professional journey
            </span>
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

        {/* Background with subtle parallax */}
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ y: bgY }}
        >
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Content container */}
        <div className="relative h-full flex flex-col">
          {/* Header - fixed at top */}
          <div className="pt-16 lg:pt-20 pb-6 text-center relative z-20">
            <motion.span
              className="font-mono text-primary text-sm mb-3 block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
                // my professional journey
            </motion.span>
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
              {/* Center timeline */}
              <div className="absolute left-1/2 top-8 bottom-24 -translate-x-1/2 w-1 z-10">
                {/* Background line */}
                <div className="absolute inset-0 bg-border/30 rounded-full" />

                {/* Animated progress line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 rounded-full origin-top
             bg-gradient-to-b from-primary via-purple-500 to-accent"
                  style={{
                    scaleY: smoothSnappedProgress,
                    transformOrigin: 'top',
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-md opacity-60
                  bg-gradient-to-b from-primary via-purple-500 to-accent" />                </motion.div>

                {/* Step dots */}
                {experiences.map((_, index) => {
                  const dotPosition = ((index + 0.5) / experiences.length) * 100;
                  const isCompleted = activeIndex >= index;
                  const isCurrent = activeIndex === index;

                  return (
                    <motion.div
                      key={index}
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: `${dotPosition}%` }}
                      animate={{
                        scale: isCurrent ? 1.4 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${isCompleted
                          ? 'bg-primary border-primary shadow-lg'
                          : 'bg-background border-border'
                          }`}
                        style={{
                          boxShadow: isCurrent ? '0 0 20px hsl(var(--primary) / 0.6)' : 'none'
                        }}
                      />
                    </motion.div>
                  );
                })}
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
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>Scroll</span>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
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