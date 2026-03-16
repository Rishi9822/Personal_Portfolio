const DEFAULT_SITE_URL = "https://rishiwebfolio.netlify.app";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
export const CANONICAL_URL = `${SITE_URL}/`;
export const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const SEO_PROFILE = Object.freeze({
  fullName: "Rishi Patel",
  rolePrimary: "Full-Stack Developer",
  roleSecondary: "Software Engineer",
  roleAcademic: "Computer Science Student",
  email: "rishipatel9822@gmail.com",
  location: "Nagpur, Maharashtra, India",
  locality: "Nagpur",
  region: "Maharashtra",
  countryCode: "IN",
  collegeName: (import.meta.env.VITE_COLLEGE_NAME || "").trim(),
  githubUrl: "https://github.com/Rishi9822",
  linkedinUrl: "https://linkedin.com/in/rishi-patel-091226291",
  twitterHandle: (import.meta.env.VITE_TWITTER_HANDLE || "").replace("@", "").trim(),
});

const collegeSegment = SEO_PROFILE.collegeName
  ? ` at ${SEO_PROFILE.collegeName}`
  : "";

export const SEO_TEXT = Object.freeze({
  siteName: "Rishi Patel Portfolio",
  title: `${SEO_PROFILE.fullName} | ${SEO_PROFILE.rolePrimary}, ${SEO_PROFILE.roleAcademic}${collegeSegment}`,
  description: `${SEO_PROFILE.fullName} is a ${SEO_PROFILE.roleAcademic}${collegeSegment} and ${SEO_PROFILE.rolePrimary} from ${SEO_PROFILE.location}. Explore projects, skills, and experience in scalable web development, software engineering, and modern UI architecture.`,
  socialDescription: `${SEO_PROFILE.fullName} builds scalable full-stack products with React, Node.js, and modern cloud-ready architecture.`,
});

export const SEO_KEYWORDS = [
  SEO_PROFILE.fullName,
  `${SEO_PROFILE.fullName} portfolio`,
  `${SEO_PROFILE.fullName} full stack developer`,
  `${SEO_PROFILE.fullName} software engineer`,
  `${SEO_PROFILE.fullName} computer science student`,
  SEO_PROFILE.collegeName ? `${SEO_PROFILE.fullName} ${SEO_PROFILE.collegeName}` : "",
  SEO_PROFILE.collegeName || "",
  "full-stack developer portfolio",
  "software engineer portfolio",
  "computer science student portfolio",
  "React developer",
  "Node.js developer",
  "web developer in Nagpur",
  "MERN stack developer",
]
  .filter(Boolean)
  .join(", ");

export const TWITTER_CREATOR = SEO_PROFILE.twitterHandle
  ? `@${SEO_PROFILE.twitterHandle}`
  : "";
