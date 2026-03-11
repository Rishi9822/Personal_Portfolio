import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { TestimonialsCard } from "@/components/ui/testimonials-card";

const projects = [
  {
    id: 1,
    number: "01/04",
    title: "smartTable",
    subtitle: "Multi-Tenant SaaS Timetable Management Platform",
    description: "Production-ready multi-tenant SaaS platform for schools and colleges to generate conflict-free timetables. Built with a subscription-driven architecture (Trial, Standard, Flex), dual-mode data isolation (School & College), role-based access control, and a Super Admin governance system for cross-tenant management and notifications.",
    image: new URL("../assets/Personal1.png", import.meta.url).href,
    liveUrl: "#",
    githubUrl: "https://github.com/Rishi9822/TimeTable_Organizer",
    color: "hsl(var(--muted-foreground))",
    tags: ["React", "Node.js", "MongoDB", "Express", "SaaS", "Tailwind"]
  },
  {
    id: 2,
    number: "02/04",
    title: "Rishi Patel",
    subtitle: "Personal Portfolio Website",
    description: "I built this personal portfolio to showcase my full-stack development skills, scalable system design, and modern UI practices. It highlights my projects, technical stack, and problem-solving approach while focusing on performance, responsiveness, and clean architecture to deliver a smooth and professional user experience.",
    image: new URL("../assets/Personal2.png", import.meta.url).href,
    liveUrl: "#",
    githubUrl: "https://github.com/Rishi9822/Personal_Portfolio",
    color: "hsl(var(--muted-foreground))",
    tags: ["React", "SEO Optimized", "Modern UI", "Tailwind"]
  },
  {
    id: 3,
    number: "03/04",
    title: "RoomiPlan",
    subtitle: "Floor Plan Generator",
    description: "A web application that generates optimized floor plans based on user-defined room dimensions and layout preferences. It utilizes a custom algorithm to efficiently arrange rooms while maximizing space utilization and adhering to design constraints, providing users with visually appealing and functional floor plan options.",
    image: new URL("../assets/Personal3.png", import.meta.url).href,
    liveUrl: "#",
    githubUrl: "https://github.com/Rishi9822/Roomiplan",
    color: "hsl(var(--muted-foreground))",
    tags: ["React", "Express", "MongoDB", "Node.js", "Tailwind" ]
  },
  {
    id: 4,
    number: "04/04",
    title: "MyBucket",
    subtitle: "Personal Bucket List Web Application",
    description: "A personal bucket list application that allows users to create, manage, and track their life goals and aspirations. Users can add new goals, categorize them, set deadlines, and mark them as completed. The app provides a visually appealing interface with progress tracking and motivational features to help users stay inspired and organized in pursuing their dreams. ",
    image: new URL("../assets/Personal4.png", import.meta.url).href,
    liveUrl: "#",
    githubUrl: "https://github.com/Rishi9822/Rishi-Portfolio",
    color: "hsl(var(--muted-foreground))",
    tags: ["HTML", "CSS", "JavaScript"]
  }
];

const clientProjects = [
  {
    id: "client-1",
    title: "Apna Kabadi Wala",
    description: "I developed a full-stack web application for a scrap collection business, implementing online pickup booking, dynamic scrap pricing management, and an admin panel to manage orders, update rates, and monitor customer requests efficiently.",
    image: new URL("../assets/Client1.png", import.meta.url).href,
    liveUrl: "https://apnakabadiwala.com/",
  },
  {
    id: "client-2",
    title: "Dr. Shiv Clinic",
    description: "I developed a full-stack clinic management web application with online appointment booking and real-time status tracking. The admin panel enables appointment confirmation, cancellation, completion, holiday management, and monthly report downloads for streamlined clinic operations.",
    image: new URL("../assets/Client2.png", import.meta.url).href,
    liveUrl: "https://drshivclinic.netlify.app/",
  },
  {
    id: "client-3",
    title: "Sellestial Devs",
    description: "I developed a modern, responsive website for a software development company to showcase its services, portfolio, and technical expertise. The focus was on clean UI, smooth navigation, performance optimization, and creating a strong digital presence to attract potential clients.",
    image: new URL("../assets/Client3.png", import.meta.url).href,
    liveUrl: "#",
  },
];

const isLowEndClient = () => {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory ?? 8;
  return cores <= 4 || memory <= 4;
};

const StickyCard = memo(function StickyCard({
  project,
  progress,
  range,
  targetScale,
  isDesktop,
  reduceMotion,
  isPriorityImage,
}) {
  const scale = useTransform(progress, range, [1.05, targetScale]);
  const opacity = useTransform(progress, range, [0.6, 1]);
  const y = useTransform(progress, range, [80, 0]);

  const motionStyle =
    reduceMotion || !isDesktop ? undefined : { scale, opacity, y };

  return (
    <div
      className={`
  ${isDesktop ? "sticky top-0 h-screen" : "relative h-auto"}
  flex items-center justify-center
`}
    >
      <motion.div
        style={motionStyle}
        className="
  relative
  w-full sm:w-[92vw] max-w-[960px]
  h-[240px] sm:h-[360px] lg:h-[56vh]
  min-h-0 lg:min-h-[420px]
  overflow-hidden
  rounded-2xl lg:rounded-[32px]
  bg-card border border-border
"
      >
        <img
          src={project.image}
          alt={project.title}
          loading={isPriorityImage ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isPriorityImage ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-contain object-center"
        />

        <div className="absolute inset-0 bg-background/55" />

        <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {project.subtitle}
          </span>

          <h3 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-display font-semibold tracking-tight">
            {project.title}
          </h3>

          <div className="mt-5 sm:mt-6 flex items-center gap-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <span className="text-muted-foreground text-sm">{project.number}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

const Projects = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const activeProjectRef = useRef(0);

  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isLowEndDevice] = useState(() => isLowEndClient());
  const shouldConstrainMotion = prefersReducedMotion || isLowEndDevice;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    const updateScreen = () => setIsDesktop(media.matches);

    updateScreen();
    if (media.addEventListener) {
      media.addEventListener("change", updateScreen);
      return () => media.removeEventListener("change", updateScreen);
    }

    media.addListener(updateScreen);
    return () => media.removeListener(updateScreen);
  }, []);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const projectIndex = Math.floor(latest * projects.length);
      const clampedIndex = Math.max(0, Math.min(projectIndex, projects.length - 1));
      if (activeProjectRef.current !== clampedIndex) {
        activeProjectRef.current = clampedIndex;
        setActiveProject(clampedIndex);
      }
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToProject = useCallback((index) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const currentProject = projects[activeProject];
  const projectRanges = useMemo(
    () =>
      projects.map((_, i) => {
        const start = i / projects.length;
        const end = (i + 1) / projects.length;
        const targetScale = isDesktop ? 1 - (projects.length - i - 1) * 0.06 : 1;
        return {
          range: isDesktop ? [start, end] : [0, 1],
          targetScale,
        };
      }),
    [isDesktop]
  );

  return (
    <>
      <section
        className="min-h-screen bg-background text-foreground"
        style={{ contentVisibility: "auto", containIntrinsicSize: isDesktop ? "1px 2600px" : "1px 3600px" }}
      >
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-4 pt-14">
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">Scroll to explore my work</p>
          </div>

          {/* Progress Indicators */}
          <div className="hidden lg:flex justify-center gap-2 mb-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProject === index
                  ? 'bg-primary w-8'
                  : 'bg-primary/50 hover:bg-hover'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-16 lg:py-24">
            {/* LEFT SIDE - Fixed Project Description */}
            <div className="relative lg:sticky lg:top-32 h-fit pr-0 lg:pr-16 hidden lg:block">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  shouldConstrainMotion
                    ? { duration: 0.25, ease: "linear" }
                    : { duration: 0.6, ease: "easeOut" }
                }
                className="space-y-8 px-6 lg:px-0"
              >
                {/* Project Number */}
                <div className="flex items-center gap-4">
                  <span
                    className="text-4xl lg:text-5xl font-semibold"
                    style={{ color: currentProject.color }}
                  >
                    {currentProject.number}
                  </span>
                  <div className="h-px bg-primary/20 w-20"></div>
                </div>

                {/* Project Title */}
                <p className="
  text-sm sm:text-base lg:text-lg
  text-muted-foreground leading-relaxed
">
                  {currentProject.title}
                </p>

                {/* Subtitle */}
                <p className="text-xl lg:text-2xl text-muted-foreground font-light">
                  {currentProject.subtitle}
                </p>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-primary/10 text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(var(--button))] text-[hsl(var(--button-foreground))] border border-border font-semibold hover:bg-[hsl(var(--button-hover))] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Site
                  </motion.a>

                  <motion.a
                    href={currentProject.githubUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground bg-card hover:bg-hover transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE - Sticky Card Animation */}
            <div
              ref={containerRef}
              className="relative w-full"
              style={{
                height: isDesktop ? `${projects.length * 100}vh` : "auto"
              }}
            >
              {projects.map((project, i) => {
                const { range, targetScale } = projectRanges[i];

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      projectRefs.current[i] = el;
                    }}
                    className="space-y-6"
                  >
                    <StickyCard
                      project={project}
                      progress={scrollYProgress}
                      range={range}
                      targetScale={targetScale}
                      isDesktop={isDesktop}
                      reduceMotion={shouldConstrainMotion}
                      isPriorityImage={i === 0}
                    />

                    {/* Mobile Details */}
                    <div className="lg:hidden space-y-4 px-2 pb-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl font-display font-semibold"
                          style={{ color: project.color }}
                        >
                          {project.number}
                        </span>
                        <div className="h-px bg-primary/20 flex-1"></div>
                      </div>

                      <p className="text-base text-muted-foreground font-medium">
                        {project.title}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {project.subtitle}
                      </p>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg text-[11px] font-mono bg-primary/10 text-muted-foreground border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[hsl(var(--button))] text-[hsl(var(--button-foreground))] border border-border text-sm font-semibold hover:bg-[hsl(var(--button-hover))] transition-colors duration-200 w-full sm:w-auto"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Site
                        </a>

                        <a
                          href={project.githubUrl}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border bg-card text-foreground text-sm hover:bg-hover transition-colors duration-200 w-full sm:w-auto"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-background text-foreground pb-12"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
      >
        <div className="container">
          <div className="text-center mb-12 pt-6">
            <h3 className="text-3xl md:text-4xl font-display font-semibold mb-3">
              Client Projects
            </h3>
            <p className="text-base md:text-lg text-muted-foreground">
              A few highlights from recent collaborations.
            </p>
          </div>
          <TestimonialsCard
            items={clientProjects}
            width={1040}
            showCounter={true}
            showNavigation={true}
            autoPlay={true}
            autoPlayInterval={8200}
            className="w-full justify-center"
          />
        </div>
      </section>
    </>
  );
};

export default Projects;

