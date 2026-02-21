import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import { MouseFollowingEyes } from "@/components/ui/mouse-following-eyes";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ReactLenis } from "lenis/react";

const Index = () => {
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>Rishi Patel | CS Student & Developer</title>
        <meta
          name="description"
          content="Portfolio of a passionate third-year Computer Science student specializing in full-stack development, building elegant digital experiences."
        />
        <meta
          name="keywords"
          content="developer, portfolio, computer science, web development, react, full-stack"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0F14" />

        <meta property="og:title" content="Rishi Patel | CS Student & Developer" />
        <meta
          property="og:description"
          content="Portfolio of a passionate CS student building elegant digital experiences."
        />
        <meta property="og:type" content="website" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Helmet>

      <motion.div
        className="relative cursor-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Custom cursor */}
        <CursorFollower />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
          <main className="relative z-10">
            <section id="home" tabIndex="-1">
              <Hero />
            </section>

            <section id="about" tabIndex="-1">
              <About />
            </section>

            <section id="experience" tabIndex="-1">
              <Experience />
            </section>

            <section id="skills" tabIndex="-1">
              <Skills />
            </section>

            <section id="projects" tabIndex="-1">
              <Projects />
            </section>

            <section id="contact" tabIndex="-1">
              <Contact />
            </section>
          </main>
        </ReactLenis>

        {/* Footer */}
        <Footer />

        {/* Persistent bottom-right mascot */}
        <MouseFollowingEyes />
      </motion.div>
    </>
  );
};

export default Index;
