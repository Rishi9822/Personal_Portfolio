import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { springConfigs } from "@/hooks/useScrollVelocity";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const NAV_HIDE_DELAY_MS = 4500;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);

  const hideTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Show navbar on scroll
      setIsVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (scrollY >= 100) {
        hideTimeoutRef.current = setTimeout(() => setIsVisible(false), NAV_HIDE_DELAY_MS);
      }

      // Set home as active if at top of page
      if (scrollY < 100) {
        setActiveSection("home");
      }

      rafRef.current = null;
    });
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navLinks.map(link => document.getElementById(link.href.replace("#", ""))).filter(Boolean);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Show navbar on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (window.scrollY >= 100) {
      hideTimeoutRef.current = setTimeout(() => setIsVisible(false), NAV_HIDE_DELAY_MS);
    }
  }, []);

  useEffect(() => {
    const events = ['touchstart', 'mousedown'];
    events.forEach(event => document.addEventListener(event, handleUserInteraction, { passive: true }));
    return () => events.forEach(event => document.removeEventListener(event, handleUserInteraction));
  }, [handleUserInteraction]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Force navbar visible in home section
  useEffect(() => {
    if (activeSection === "home") {
      setIsVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    }
  }, [activeSection]);

  // Show navbar on cursor movement when hidden
  useEffect(() => {
    const handleMouseMove = () => {
      if (!isVisible) {
        setIsVisible(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        if (window.scrollY >= 100) {
          hideTimeoutRef.current = setTimeout(() => setIsVisible(false), NAV_HIDE_DELAY_MS);
        }
      }
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 40 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => {
          setIsVisible(true);
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        }}
        onMouseLeave={() => {
          if (window.scrollY >= 100) {
            hideTimeoutRef.current = setTimeout(() => setIsVisible(false), NAV_HIDE_DELAY_MS);
          }
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2.5 bg-black/85 backdrop-blur-xl border-b border-gray-800"
      >
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <motion.a
              href="#"
              className="font-mono text-sm md:text-lg font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="inline-flex items-center px-3 py-1 text-foreground shadow-[0_0_30px_rgba(37,99,235,0.35)]">
                Rishi Patel             
              </span>
            </motion.a>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <MagneticButton key={link.name} strength={0.12}>
                  <motion.a
                    href={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                    style={{ textShadow: '0 0 2px rgba(0,0,0,0.8)' }}
                    className={`relative px-4 py-2.5 rounded-lg font-medium text-base transition-colors duration-200 ${isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>

                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-primary/10"
                        transition={{ type: "spring", ...springConfigs.snappy }}
                      />
                    )}
                  </motion.a>
                </MagneticButton>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* CTA Button - Desktop */}
            <MagneticButton strength={0.25}>
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-primary text-primary-foreground border border-border hover:bg-hover transition-colors duration-200"
              >
                <span>Let's Talk</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {"->"}
                </motion.span>
              </motion.a>
            </MagneticButton>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden group relative w-11 h-11 flex items-center justify-center rounded-xl bg-card border border-border hover:bg-hover transition-all duration-300"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden"
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-card border-l border-border z-50 md:hidden p-8 flex flex-col"
            >
              <div className="flex-1 flex flex-col justify-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={menuItemVariants}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="#contact"
                variants={menuItemVariants}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-center border border-border hover:bg-hover transition-colors duration-200"
              >
                Let's Talk
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
