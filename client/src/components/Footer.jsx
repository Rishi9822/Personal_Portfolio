import { memo, useCallback, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp, Github, Heart, Linkedin, Mail } from "lucide-react";

import { springConfigs } from "@/hooks/useScrollVelocity";

const SOCIALS = Object.freeze([
  { icon: Github, href: "https://github.com/Rishi9822", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:rishipatel9822@gmail.com", label: "Email" },
]);

function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const backToTopOpacity = useSpring(
    useTransform(scrollYProgress, [0.75, 1], [0, 1]),
    springConfigs.smooth
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  return (
    <footer
      className="relative overflow-hidden border-t border-border/60 pt-8 pb-5 sm:pt-9 sm:pb-6 md:pt-10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 420px" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 bottom-8 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-0 top-4 h-40 w-40 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />

      <div className="container relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-2 md:max-w-xl pt-4"
            >
              <a
                href="#"
                className="inline-block text-2xl font-bold tracking-tight text-gradient transition-opacity hover:opacity-90 sm:text-3xl"
              >
                Rishi Patel
              </a>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Building elegant, high-performance digital experiences with modern frontend and full-stack tools.
              </p>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex items-center gap-3"
              aria-label="Footer social links"
            >
              {SOCIALS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + index * 0.08 }}
                    whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group rounded-full border border-border/70 bg-card/60 p-3 text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </motion.nav>
          </div>

          <motion.div style={{ opacity: backToTopOpacity }} className="md:ml-auto md:pt-10 md:pr-2">
            <motion.button
              onClick={scrollToTop}
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-hover mt-10"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Top
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 flex flex-col gap-2 border-t border-border/50 pt-4 text-xs text-muted-foreground sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:text-sm"
        >
          <p className="text-muted-foreground">© {currentYear} Rishi Patel. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <a href="#projects" className="transition-colors hover:text-foreground">
              Projects
            </a>
            <a href="#skills" className="transition-colors hover:text-foreground">
              Skills
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
            <p className="flex items-center gap-2">
              Built with
              <motion.span
                animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.3, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 fill-primary text-primary" />
              </motion.span>
              by Rishi Patel
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
