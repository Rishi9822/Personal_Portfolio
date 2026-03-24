import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProfileFaq from "@/components/ProfileFaq";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import { MouseFollowingEyes } from "@/components/ui/mouse-following-eyes";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ReactLenis } from "lenis/react";
import { CANONICAL_URL } from "@/lib/seo";

const Index = () => {
  useSmoothScroll();

  const projectListId = `${CANONICAL_URL}#featured-projects`;

  const projectListStructuredData = {
    "@type": "ItemList",
    "@id": projectListId,
    name: "Featured Projects by Rishi Patel",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: "smartTable",
          codeRepository: "https://github.com/Rishi9822/TimeTable_Organizer",
          programmingLanguage: "JavaScript",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareSourceCode",
          name: "Personal Portfolio Website",
          codeRepository: "https://github.com/Rishi9822/Personal_Portfolio",
          programmingLanguage: "JavaScript",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "SoftwareSourceCode",
          name: "RoomiPlan",
          codeRepository: "https://github.com/Rishi9822/Roomiplan",
          programmingLanguage: "JavaScript",
        },
      },
    ],
  };

  return (
    <>
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
            <Hero />
            <About />
            <ProfileFaq />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </ReactLenis>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListStructuredData) }}
        />

        {/* Footer */}
        <Footer />

        {/* Persistent bottom-right mascot */}
        <MouseFollowingEyes />
      </motion.div>
    </>
  );
};

export default Index;
