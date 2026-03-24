const DEFAULT_SITE_URL = "https://rishiwebfolio.netlify.app";
const DEFAULT_UPDATED_AT = "2026-03-24";

const BASE_DEFAULTS = Object.freeze({
  siteUrl: DEFAULT_SITE_URL,
  siteName: "Rishi Patel Portfolio",
  fullName: "Rishi Patel",
  givenName: "Rishi",
  familyName: "Patel",
  rolePrimary: "Full-Stack Developer",
  roleSecondary: "Software Engineer",
  roleAcademic: "Computer Science Student",
  email: "rishipatel9822@gmail.com",
  location: "Nagpur, Maharashtra, India",
  locality: "Nagpur",
  region: "Maharashtra",
  countryCode: "IN",
  countryName: "India",
  collegeName: "K.D.K. College of Engineering, Nagpur",
  githubUrl: "https://github.com/Rishi9822",
  linkedinUrl: "https://linkedin.com/in/rishi-patel-091226291",
  twitterHandle: "",
  locale: "en_IN",
  language: "en-IN",
  themeColor: "#0B0F14",
  googleSiteVerification: "_wBgAAEYC3tGjoN6upKqxEmTzd_4sghYRzKG7Plr9Q0",
  updatedAt: DEFAULT_UPDATED_AT,
});

const trimValue = (value) => (typeof value === "string" ? value.trim() : "");

const normalizeUrl = (value) => {
  const trimmed = trimValue(value);
  if (!trimmed) {
    return BASE_DEFAULTS.siteUrl;
  }

  return trimmed.replace(/\/+$/, "");
};

const normalizeDate = (value) => {
  const trimmed = trimValue(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  return BASE_DEFAULTS.updatedAt;
};

const splitCsv = (value) =>
  trimValue(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const dedupeStrings = (values) => {
  const seen = new Set();
  return values.filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const buildCollegeVariants = (collegeName, csvAliases = "") => {
  if (!collegeName) {
    return [];
  }

  const aliases = [collegeName, ...splitCsv(csvAliases)];
  const normalizedName = collegeName.toLowerCase();

  if (/k\s*\.?\s*d\s*\.?\s*k/.test(normalizedName)) {
    aliases.push(
      "KDK College",
      "KDK College of Engineering",
      "KDK College Nagpur",
      "K.D.K College of Engineering",
      "K.D.K. College of Engineering",
      "K.D.K. College of Engineering, Nagpur",
    );
  }

  return dedupeStrings(aliases);
};

const buildFaqItems = (profile, text) => [
  {
    question: `Who is ${profile.fullName}?`,
    answer: `I'm ${profile.fullName}, a ${profile.rolePrimary.toLowerCase()} and ${profile.roleAcademic.toLowerCase()} from ${profile.location}. On this portfolio, I share the projects I've built, the experience I'm gaining, the tools I work with, and the kind of software I enjoy creating.`,
  },
  {
    question: `Which college does ${profile.fullName} attend?`,
    answer: `I study at ${profile.collegeName}${profile.collegeShortName ? `, which many people also search for as ${profile.collegeShortName}` : ""}.`,
  },
  {
    question: `What can I find on the ${text.siteName}?`,
    answer: `You'll find my featured full-stack projects, internship and freelance experience, technical skills, and the best way to contact me.`,
  },
];

export const resolveSeoConfig = (env = {}) => {
  const siteUrl = normalizeUrl(env.VITE_SITE_URL || BASE_DEFAULTS.siteUrl);
  const canonicalUrl = `${siteUrl}/`;
  const socialImageUrl = `${siteUrl}/og-image.png`;
  const profileImageUrl = `${siteUrl}/photo.png`;
  const collegeName = trimValue(env.VITE_COLLEGE_NAME || BASE_DEFAULTS.collegeName);
  const collegeVariants = buildCollegeVariants(collegeName, env.VITE_COLLEGE_ALIASES || "");
  const collegeShortName =
    collegeVariants.find((value) => /^kdk college$/i.test(value)) ||
    collegeVariants.find((value) => /kdk/i.test(value)) ||
    collegeVariants[0] ||
    "";
  const twitterHandle = trimValue(env.VITE_TWITTER_HANDLE || BASE_DEFAULTS.twitterHandle).replace(/^@/, "");
  const locale = trimValue(env.VITE_SITE_LOCALE || BASE_DEFAULTS.locale) || BASE_DEFAULTS.locale;
  const language = trimValue(env.VITE_SITE_LANGUAGE || BASE_DEFAULTS.language) || BASE_DEFAULTS.language;
  const updatedAt = normalizeDate(env.VITE_SITE_UPDATED_AT || BASE_DEFAULTS.updatedAt);

  const profile = Object.freeze({
    fullName: BASE_DEFAULTS.fullName,
    givenName: BASE_DEFAULTS.givenName,
    familyName: BASE_DEFAULTS.familyName,
    rolePrimary: BASE_DEFAULTS.rolePrimary,
    roleSecondary: BASE_DEFAULTS.roleSecondary,
    roleAcademic: BASE_DEFAULTS.roleAcademic,
    email: BASE_DEFAULTS.email,
    location: BASE_DEFAULTS.location,
    locality: BASE_DEFAULTS.locality,
    region: BASE_DEFAULTS.region,
    countryCode: BASE_DEFAULTS.countryCode,
    countryName: BASE_DEFAULTS.countryName,
    collegeName,
    collegeShortName,
    collegeVariants,
    collegeSearchLabel:
      collegeName && collegeShortName && collegeShortName !== collegeName
        ? `${collegeName} (${collegeShortName})`
        : collegeName,
    githubUrl: BASE_DEFAULTS.githubUrl,
    linkedinUrl: BASE_DEFAULTS.linkedinUrl,
    twitterHandle,
  });

  const collegeTitleSuffix = profile.collegeShortName || profile.collegeName || profile.locality;
  const text = Object.freeze({
    siteName: BASE_DEFAULTS.siteName,
    title: `${profile.fullName} Portfolio | ${profile.rolePrimary}, ${collegeTitleSuffix}`,
    description: `Official portfolio of ${profile.fullName}, ${profile.rolePrimary.toLowerCase()} and ${profile.roleAcademic.toLowerCase()} at ${profile.collegeName}${profile.collegeShortName && profile.collegeShortName !== profile.collegeName ? `, also searched as ${profile.collegeShortName}` : ""}. Explore projects, skills, experience, and contact details from ${profile.location}.`,
    socialDescription: `${profile.fullName} builds scalable full-stack products with React, Node.js, and clean software engineering practices.`,
    pageSummary: `${profile.fullName} Portfolio highlights full-stack projects, engineering experience, and work from ${profile.collegeSearchLabel || profile.location}.`,
  });

  const faqItems = buildFaqItems(profile, text);

  const keywords = dedupeStrings(
    [
      profile.fullName,
      text.siteName,
      `${profile.fullName} portfolio`,
      `${profile.fullName} developer`,
      `${profile.fullName} full stack developer`,
      `${profile.fullName} software engineer`,
      `${profile.fullName} computer science student`,
      `${profile.fullName} ${profile.collegeName}`,
      `${profile.fullName} ${profile.collegeShortName}`,
      profile.collegeName,
      ...profile.collegeVariants,
      "KDK College portfolio",
      "full-stack developer portfolio",
      "software engineer portfolio",
      "React developer portfolio",
      "Node.js developer portfolio",
      "MERN stack developer portfolio",
      "web developer in Nagpur",
    ].filter(Boolean),
  );

  const personId = `${canonicalUrl}#person`;
  const collegeId = `${canonicalUrl}#college`;
  const websiteId = `${canonicalUrl}#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const profilePageId = `${canonicalUrl}#profile`;
  const faqPageId = `${canonicalUrl}#faq`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": collegeId,
        name: profile.collegeName,
        alternateName: profile.collegeVariants.filter((item) => item !== profile.collegeName),
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.locality,
          addressRegion: profile.region,
          addressCountry: profile.countryCode,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.fullName,
        givenName: profile.givenName,
        familyName: profile.familyName,
        url: canonicalUrl,
        image: profileImageUrl,
        description: text.description,
        jobTitle: profile.rolePrimary,
        email: `mailto:${profile.email}`,
        mainEntityOfPage: {
          "@id": profilePageId,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.locality,
          addressRegion: profile.region,
          addressCountry: profile.countryCode,
        },
        homeLocation: {
          "@type": "Place",
          name: profile.location,
        },
        affiliation: {
          "@id": collegeId,
        },
        knowsAbout: [
          "Full-Stack Development",
          "Software Engineering",
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "REST API Development",
          "Frontend Performance",
        ],
        sameAs: [
          profile.githubUrl,
          profile.linkedinUrl,
          twitterHandle ? `https://twitter.com/${twitterHandle}` : "",
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: text.siteName,
        url: canonicalUrl,
        inLanguage: language,
        publisher: {
          "@id": personId,
        },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: canonicalUrl,
        name: text.title,
        description: text.description,
        inLanguage: language,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: socialImageUrl,
          width: 1895,
          height: 911,
        },
        dateModified: updatedAt,
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: canonicalUrl,
        name: `${profile.fullName} Profile`,
        description: text.pageSummary,
        inLanguage: language,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": personId,
        },
        dateModified: updatedAt,
      },
      {
        "@type": "FAQPage",
        "@id": faqPageId,
        url: `${canonicalUrl}#profile-faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return {
    siteUrl,
    canonicalUrl,
    socialImageUrl,
    profileImageUrl,
    locale,
    language,
    themeColor: BASE_DEFAULTS.themeColor,
    googleSiteVerification:
      trimValue(env.VITE_GOOGLE_SITE_VERIFICATION || BASE_DEFAULTS.googleSiteVerification) ||
      "",
    twitterCreator: twitterHandle ? `@${twitterHandle}` : "",
    dates: {
      modified: updatedAt,
    },
    profile,
    text,
    keywords,
    faqItems,
    structuredData,
  };
};

export { DEFAULT_SITE_URL, DEFAULT_UPDATED_AT };
