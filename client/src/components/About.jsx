import { motion, useInView } from "framer-motion";
import { memo, useRef } from "react";
import { Sparkles } from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import aboutPhotoSrc from "@/assets/photo.png";

const About = () => {
  const visualRef = useRef(null);
  const visualInView = useInView(visualRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20 lg:min-h-screen lg:py-10 lg:flex lg:items-center"
    >
      {/* Section divider with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />

      <div className="container relative w-full">
        <div className="grid items-center gap-12 md:gap-14 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,500px)_minmax(0,1fr)] xl:gap-20">
          {/* Left column - Cinematic Portrait */}
          <ScrollReveal direction="left" distance={80} blur scale>
            <motion.div ref={visualRef} className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] xl:max-w-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                animate={visualInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.9, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-[32px] border border-border bg-card"
              >
                <img
                  src={aboutPhotoSrc}
                  alt="Portrait of Rishi"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 640px) 86vw, (max-width: 1024px) 55vw, 500px"
                  className="h-full w-full object-cover object-center saturate-[1.05] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-[1px] rounded-[30px] border border-border" />
                <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-background/30" />
                <div className="pointer-events-none absolute inset-0 noise opacity-[0.12]" />

                <motion.div
                  className="absolute left-3 top-3 rounded-full border border-border bg-card/90 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2"
                  initial={{ opacity: 0, y: -12 }}
                  animate={visualInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-foreground/85 sm:gap-2 sm:text-xs">
                    <Sparkles className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
                    Creative Developer
                  </span>
                </motion.div>

                <motion.div
                  className="absolute bottom-3 left-3 right-3 rounded-xl border border-border bg-card/90 px-3 py-2 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[290px] sm:rounded-2xl sm:px-4 sm:py-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={visualInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px] sm:tracking-[0.2em]">
                    ABOUT
                  </p>
                  <p className="mt-1 max-w-[28ch] text-xs leading-snug text-foreground/90 sm:max-w-none sm:text-sm sm:leading-normal">
                    Building premium digital experiences.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Right column - Content */}
          <div className="mx-auto w-full max-w-[680px]">
            <ScrollReveal direction="right" distance={60} delay={0.2}>
              <motion.div className="mb-8">
                <h2 className="text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl">
                  About
                </h2>
                <div className="mt-3 h-px w-24 bg-border" />
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={40} delay={0.3}>
              <h3 className="mb-7 max-w-[20ch] text-2xl font-bold leading-[1.12] md:text-3xl xl:text-4xl">
                Passionate about
                <br />
                <span className="text-gradient">
                  building things
                </span>
              </h3>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={30} delay={0.5}>
              <div className="mb-9 max-w-[64ch] space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
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

            {/* Core skills logo cloud */}
            <ScrollReveal direction="up" distance={35} delay={0.6}>
              <div className="w-full">
                <p className="mb-4 text-sm font-mono tracking-[0.14em] text-primary/80">
                  // core skills
                </p>
                <LogoCloud />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
