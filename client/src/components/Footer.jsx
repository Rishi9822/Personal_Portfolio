import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Github, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import { springConfigs } from "@/hooks/useScrollVelocity";

const Footer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const opacity = useSpring(
    useTransform(scrollYProgress, [0.9, 1], [0, 1]),
    springConfigs.smooth
  );

  const socials = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={containerRef} className="md:pb-20 border-t border-border/50 relative overflow-hidden">
      {/* Section divider with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-card/20 pointer-events-none" />

      <div className="container relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group font-mono text-2xl font-bold hover:text-primary transition-all duration-300"
            >
              <span className="text-gradient group-hover:drop-shadow-sm transition-all duration-300">
                Rishi Patel
              </span>
            </motion.a>
          </MagneticButton>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socials.map((social, i) => (
              <MagneticButton key={social.label} strength={0.4}>
                <motion.a
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative p-3 rounded-full glass border border-border text-muted-foreground hover:text-foreground hover:bg-hover transition-all duration-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  {/* Icon with enhanced animation */}
                  <social.icon className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-sm" />
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Back to top button */}
          <motion.div
            style={{ opacity }}
            className="mt-8 flex justify-center"
          >
            <MagneticButton strength={0.4}>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="group p-4 rounded-full bg-primary text-primary-foreground border border-border hover:bg-hover transition-all duration-200"
              >
                <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
              </motion.button>
            </MagneticButton>
          </motion.div>
        </div>
        {/* Built with love */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground flex items-center gap-2"
          >
            Built with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>
            by Rishi Patel
          </motion.p>

      </div>
    </footer>
  );
};

export default Footer;
