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
import {
  CANONICAL_URL,
  SEO_KEYWORDS,
  SEO_PROFILE,
  SEO_TEXT,
  SOCIAL_IMAGE_URL,
  TWITTER_CREATOR,
} from "@/lib/seo";

const Index = () => {
  useSmoothScroll();

  const personId = `${CANONICAL_URL}#person`;
  const webSiteId = `${CANONICAL_URL}#website`;
  const webPageId = `${CANONICAL_URL}#webpage`;
  const profilePageId = `${CANONICAL_URL}#profile`;
  const projectListId = `${CANONICAL_URL}#featured-projects`;

  const personStructuredData = {
    "@type": "Person",
    "@id": personId,
    name: SEO_PROFILE.fullName,
    url: CANONICAL_URL,
    description: SEO_TEXT.description,
    jobTitle: SEO_PROFILE.rolePrimary,
    email: `mailto:${SEO_PROFILE.email}`,
    image: SOCIAL_IMAGE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO_PROFILE.locality,
      addressRegion: SEO_PROFILE.region,
      addressCountry: SEO_PROFILE.countryCode,
    },
    knowsAbout: [
      "Full-Stack Development",
      "Software Engineering",
      "Web Development",
      "React",
      "Node.js",
      "MERN Stack",
      "REST API Development",
      "Search Engine Optimization",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SEO_PROFILE.email,
        contactType: "professional inquiries",
      },
    ],
    sameAs: [
      SEO_PROFILE.githubUrl,
      SEO_PROFILE.linkedinUrl,
    ],
    ...(SEO_PROFILE.collegeName
      ? {
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: SEO_PROFILE.collegeName,
          },
        }
      : {}),
  };

  const websiteStructuredData = {
    "@type": "WebSite",
    "@id": webSiteId,
    name: SEO_TEXT.siteName,
    url: CANONICAL_URL,
    inLanguage: "en-IN",
    publisher: {
      "@id": personId,
    },
  };

  const webPageStructuredData = {
    "@type": "WebPage",
    "@id": webPageId,
    url: CANONICAL_URL,
    name: SEO_TEXT.title,
    description: SEO_TEXT.description,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": webSiteId,
    },
    about: {
      "@id": personId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: SOCIAL_IMAGE_URL,
      width: 1895,
      height: 911,
    },
  };

  const profilePageStructuredData = {
    "@type": "ProfilePage",
    "@id": profilePageId,
    url: CANONICAL_URL,
    name: `${SEO_PROFILE.fullName} Portfolio Profile`,
    description: SEO_TEXT.description,
    isPartOf: {
      "@id": webSiteId,
    },
    mainEntity: {
      "@id": personId,
    },
    dateModified: "2026-03-16",
  };

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

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      personStructuredData,
      websiteStructuredData,
      webPageStructuredData,
      profilePageStructuredData,
      projectListStructuredData,
    ],
  };

  return (
    <>
      <Helmet>
        <title>{SEO_TEXT.title}</title>
        <meta name="description" content={SEO_TEXT.description} />
        <meta name="keywords" content={SEO_KEYWORDS} />
        <meta name="author" content={SEO_PROFILE.fullName} />
        <meta name="application-name" content={SEO_TEXT.siteName} />
        <meta name="apple-mobile-web-app-title" content={SEO_TEXT.siteName} />
        <meta name="theme-color" content="#0B0F14" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content={SEO_PROFILE.location} />
        <meta name="geo.position" content="21.1458;79.0882" />
        <meta name="ICBM" content="21.1458, 79.0882" />
        <link rel="canonical" href={CANONICAL_URL} />
        <link rel="alternate" hrefLang="en-IN" href={CANONICAL_URL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL_URL} />
        <link rel="me" href={SEO_PROFILE.githubUrl} />
        <link rel="me" href={SEO_PROFILE.linkedinUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={SEO_TEXT.siteName} />
        <meta property="og:title" content={SEO_TEXT.title} />
        <meta property="og:description" content={SEO_TEXT.socialDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={SOCIAL_IMAGE_URL} />
        <meta property="og:image:alt" content={`${SEO_PROFILE.fullName} portfolio preview`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1895" />
        <meta property="og:image:height" content="911" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO_TEXT.title} />
        <meta name="twitter:description" content={SEO_TEXT.socialDescription} />
        <meta name="twitter:image" content={SOCIAL_IMAGE_URL} />
        <meta name="twitter:image:alt" content={`${SEO_PROFILE.fullName} portfolio preview`} />
        <meta name="twitter:url" content={CANONICAL_URL} />
        {TWITTER_CREATOR ? <meta name="twitter:creator" content={TWITTER_CREATOR} /> : null}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredDataGraph)}
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
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
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
