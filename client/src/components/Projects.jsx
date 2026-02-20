import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import ReactLenis from "lenis/react";
import { TestimonialsCard } from "@/components/ui/testimonials-card";

const projects = [
  {
    id: 1,
    number: "01/04",
    title: "ELIOS FINANCE",
    subtitle: "Finance Website",
    description: "Website revamp that brought an Indian finance advisory firm's story to life through design and motion while highlighting its services.",
    image: "https://framerusercontent.com/images/cESHCUNY7OxTpoEynSgXDBfOoM.webp?width=800&height=600",
    liveUrl: "https://eliosfin.com/",
    githubUrl: "#",
    color: "#eb5939",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion"]
  },
  {
    id: 2,
    number: "02/04",
    title: "GREENLAM MFC",
    subtitle: "Manufacturing Website",
    description: "Modern manufacturing website showcasing industrial excellence with interactive product galleries and technical specifications.",
    image: "https://framerusercontent.com/images/lg4aCbGnRwMMK59qe2r950OXo8.webp?width=800&height=600",
    liveUrl: "https://www.greenlammfc.com/",
    githubUrl: "#",
    color: "#eb5939",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"]
  },
  {
    id: 3,
    number: "03/04",
    title: "MARUTI ROPES",
    subtitle: "Industrial Website",
    description: "Comprehensive industrial website for rope manufacturing with product catalog and technical documentation.",
    image: "https://framerusercontent.com/images/z6OwSiDnezWln6hQuqA8APzwo.webp?width=800&height=600",
    liveUrl: "https://www.marutiropes.com/",
    githubUrl: "#",
    color: "#eb5939",
    tags: ["React", "Express", "MySQL", "Canvas API"]
  },
  {
    id: 4,
    number: "04/04",
    title: "CUPRUM QUIRKS",
    subtitle: "Creative Portfolio",
    description: "Creative portfolio website with unique animations and interactive storytelling elements.",
    image: "https://framerusercontent.com/images/7bfqXM2Kq5sRrSbxdgbIKnosqw.webp?width=800&height=600",
    liveUrl: "https://cuprumquirks.com/",
    githubUrl: "#",
    color: "#eb5939",
    tags: ["Gatsby", "GraphQL", "Contentful", "GSAP"]
  }
];

const clientProjects = [
  {
    id: "client-1",
    title: "Elios Finance",
    description: "Revamped digital presence with motion-led storytelling.",
    image: projects[0].image,
    liveUrl: projects[0].liveUrl,
  },
  {
    id: "client-2",
    title: "Greenlam MFC",
    description: "Modern product showcase for a manufacturing leader.",
    image: projects[1].image,
    liveUrl: projects[1].liveUrl,
  },
  {
    id: "client-3",
    title: "Maruti Ropes",
    description: "Industrial catalog experience with technical clarity.",
    image: projects[2].image,
    liveUrl: projects[2].liveUrl,
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  // Scroll progress for sticky card animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });



  // Track active project based on scroll progress
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Calculate which project should be active based on scroll progress
      const projectIndex = Math.floor(latest * projects.length);
      const clampedIndex = Math.max(0, Math.min(projectIndex, projects.length - 1));
      setActiveProject(clampedIndex);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToProject = (index) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const currentProject = projects[activeProject];

  // Sticky Card Component - Exactly like 21st.dev
  const StickyCard = ({ project, progress, range, targetScale }) => {
    const scale = useTransform(progress, range, [1.05, targetScale]);
    const opacity = useTransform(progress, range, [0.6, 1]);
    const y = useTransform(progress, range, [80, 0]);

    return (
      <div className={`
  ${isDesktop ? "sticky top-0 h-screen" : "relative h-auto"}
  flex items-center justify-center
`}>
        <motion.div
          style={{ scale, opacity, y }}
          className="
  relative
  w-full sm:w-[92vw] max-w-[960px]
  h-[240px] sm:h-[360px] lg:h-[56vh]
  min-h-0 lg:min-h-[420px]
  overflow-hidden
  rounded-2xl lg:rounded-[32px]
  bg-neutral-900
  shadow-[0_30px_80px_rgba(0,0,0,0.4)]
"

        >
          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/50">
              {project.subtitle}
            </span>

            <h3 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight">
              {project.title}
            </h3>

            <div className="mt-5 sm:mt-6 flex items-center gap-6">
              <a
                href={project.liveUrl}
                target="_blank"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                View Project
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <span className="text-white/40 text-sm">
                {project.number}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };



  return (
    <ReactLenis root>
      <section className="min-h-screen bg-neutral-950 text-white">
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-16 pt-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-white/70">Scroll to explore my work</p>
          </div>

          {/* Progress Indicators */}
          <div className="hidden lg:flex justify-center gap-2 mb-16">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProject === index
                  ? 'bg-orange-500 w-8'
                  : 'bg-white/30 hover:bg-white/50'
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
                transition={{ duration: 0.6, ease: "easeOut" }}
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
                  <div className="h-px bg-white/20 w-20"></div>
                </div>

                {/* Project Title */}
                <p className="
  text-sm sm:text-base lg:text-lg
  text-white/60 leading-relaxed
">
                  {currentProject.title}
                </p>

                {/* Subtitle */}
                <p className="text-xl lg:text-2xl text-white/70 font-light">
                  {currentProject.subtitle}
                </p>

                {/* Description */}
                <p className="text-lg text-white/60 leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 text-white/80 border border-white/20"
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Site
                  </motion.a>

                  <motion.a
                    href={currentProject.githubUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
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
                const start = i / projects.length;
                const end = (i + 1) / projects.length;

                return (
                  <div key={project.id} className="space-y-6">
                    <StickyCard
                      project={project}
                      progress={scrollYProgress}
                      range={isDesktop ? [start, end] : [0, 1]}
                      targetScale={isDesktop ? 1 - (projects.length - i - 1) * 0.06 : 1}
                    />

                    {/* Mobile Details */}
                    <div className="lg:hidden space-y-4 px-2 pb-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl font-semibold"
                          style={{ color: project.color }}
                        >
                          {project.number}
                        </span>
                        <div className="h-px bg-white/20 flex-1"></div>
                      </div>

                      <p className="text-base text-white/80 font-medium">
                        {project.title}
                      </p>

                      <p className="text-sm text-white/60">
                        {project.subtitle}
                      </p>

                      <p className="text-sm text-white/60 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg text-[11px] font-mono bg-white/10 text-white/80 border border-white/20"
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
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors w-full sm:w-auto"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Site
                        </a>

                        <a
                          href={project.githubUrl}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-colors w-full sm:w-auto"
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

      <section className="bg-neutral-950 text-white pb-24">
        <div className="container">
          <div className="text-center mb-12 pt-6">
            <h3 className="text-3xl md:text-4xl font-semibold mb-3">
              Client Projects
            </h3>
            <p className="text-base md:text-lg text-white/70">
              A few highlights from recent collaborations.
            </p>
          </div>
          <TestimonialsCard
            items={clientProjects}
            width={1040}
            showCounter={true}
            showNavigation={true}
            autoPlay={true}
            autoPlayInterval={4200}
            className="w-full justify-center"
          />
        </div>
      </section>
    </ReactLenis>
  );
};

export default Projects;
