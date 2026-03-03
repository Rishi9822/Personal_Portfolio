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

// SEO CONFIG:
// 1) Set VITE_SITE_URL in your deployment environment to your production domain.
//    Example: https://yourdomain.com
// 2) Update social links in `personStructuredData.sameAs` if needed.
const DEFAULT_SITE_URL = "https://example.com";
const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
const canonicalUrl = `${siteUrl}/`;
const socialPreviewImageUrl = `${siteUrl}/photo.png`;

const Index = () => {
  useSmoothScroll();
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rishi Patel",
    url: canonicalUrl,
    jobTitle: "Full-Stack Developer",
    email: "mailto:rishipatel9822@gmail.com",
    image: socialPreviewImageUrl,
    sameAs: [
      "https://github.com/Rishi9822",
      "https://linkedin.com/in/rishi-patel-091226291",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rishi Patel Portfolio",
    url: canonicalUrl,
    inLanguage: "en",
  };

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
        <meta name="theme-color" content="#0B0F14" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />

        <meta property="og:title" content="Rishi Patel | CS Student & Developer" />
        <meta
          property="og:description"
          content="Portfolio of a passionate CS student building elegant digital experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Rishi Patel Portfolio" />
        <meta property="og:image" content={socialPreviewImageUrl} />
        <meta property="og:image:alt" content="Rishi Patel Profile Photo" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rishi Patel | CS Student & Developer" />
        <meta
          name="twitter:description"
          content="Portfolio of a passionate CS student building elegant digital experiences."
        />
        <meta name="twitter:image" content={socialPreviewImageUrl} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script type="application/ld+json">
          {JSON.stringify(personStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
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
