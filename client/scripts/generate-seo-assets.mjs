import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveSeoConfig } from "../src/lib/seo.shared.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const srcLibDir = path.join(projectRoot, "src", "lib");
const indexHtmlPath = path.join(projectRoot, "index.html");

const resolveMode = () => {
  const explicitMode = (process.env.MODE || process.env.VITE_USER_NODE_ENV || "").trim();
  if (explicitMode) {
    return explicitMode;
  }

  return process.env.npm_lifecycle_event === "build" ? "production" : "development";
};

const parseEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const content = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
};

const loadEnv = () => {
  const mode = resolveMode();
  const envFiles = [
    ".env",
    ".env.local",
    `.env.${mode}`,
    `.env.${mode}.local`,
  ];

  const merged = {};
  for (const envFile of envFiles) {
    Object.assign(merged, parseEnvFile(path.join(projectRoot, envFile)));
  }

  return { ...merged, ...process.env };
};

const writeFileIfChanged = (filePath, content) => {
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (current === content) {
    return;
  }

  fs.writeFileSync(filePath, content, "utf8");
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const toPrettyJson = (value) => JSON.stringify(value, null, 2);

const buildHeadMarkup = (seo) => {
  const jsonLd = toPrettyJson(seo.structuredData).replace(/<\/script/gi, "<\\/script");

  return `<!-- SEO:BEGIN -->
    <title>${escapeHtml(seo.text.title)}</title>
    <meta name="description" content="${escapeHtml(seo.text.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords.join(", "))}" />
    <meta name="author" content="${escapeHtml(seo.profile.fullName)}" />
    <meta name="application-name" content="${escapeHtml(seo.text.siteName)}" />
    <meta name="apple-mobile-web-app-title" content="${escapeHtml(seo.text.siteName)}" />
    <meta name="theme-color" content="${escapeHtml(seo.themeColor)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="geo.region" content="IN-MH" />
    <meta name="geo.placename" content="${escapeHtml(seo.profile.location)}" />
    <meta name="geo.position" content="21.1458;79.0882" />
    <meta name="ICBM" content="21.1458, 79.0882" />
    <link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />
    <link rel="alternate" hreflang="${escapeHtml(seo.language)}" href="${escapeHtml(seo.canonicalUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.canonicalUrl)}" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="icon" type="image/png" href="/Logo.png" />
    <link rel="apple-touch-icon" href="/Logo.png" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="me" href="${escapeHtml(seo.profile.githubUrl)}" />
    <link rel="me" href="${escapeHtml(seo.profile.linkedinUrl)}" />
    <meta property="og:locale" content="${escapeHtml(seo.locale)}" />
    <meta property="og:site_name" content="${escapeHtml(seo.text.siteName)}" />
    <meta property="og:title" content="${escapeHtml(seo.text.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.text.socialDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(seo.socialImageUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(seo.socialImageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(`${seo.profile.fullName} portfolio preview`)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1895" />
    <meta property="og:image:height" content="911" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.text.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.text.socialDescription)}" />
    <meta name="twitter:url" content="${escapeHtml(seo.canonicalUrl)}" />
    <meta name="twitter:image" content="${escapeHtml(seo.socialImageUrl)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(`${seo.profile.fullName} portfolio preview`)}" />
${seo.twitterCreator ? `    <meta name="twitter:creator" content="${escapeHtml(seo.twitterCreator)}" />\n` : ""}${seo.googleSiteVerification ? `    <meta name="google-site-verification" content="${escapeHtml(seo.googleSiteVerification)}" />\n` : ""}    <script type="application/ld+json">
${jsonLd}
    </script>
    <!-- SEO:END -->`;
};

const buildNoScriptMarkup = (seo) => `<!-- SEO-NOSCRIPT:BEGIN -->
    <noscript>
      <main>
        <h1>${escapeHtml(seo.text.siteName)}</h1>
        <p>${escapeHtml(seo.text.description)}</p>
        <p>
          Visit
          <a href="${escapeHtml(seo.canonicalUrl)}">${escapeHtml(seo.canonicalUrl)}</a>
          to view projects, experience, skills, and contact information.
        </p>
      </main>
    </noscript>
    <!-- SEO-NOSCRIPT:END -->`;

const buildRobotsTxt = (seo) => `User-agent: *
Allow: /

Sitemap: ${seo.siteUrl}/sitemap.xml
`;

const buildSitemapXml = (seo) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${seo.canonicalUrl}</loc>
    <lastmod>${seo.dates.modified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${seo.socialImageUrl}</image:loc>
      <image:title>${escapeHtml(seo.text.siteName)}</image:title>
      <image:caption>${escapeHtml(seo.text.pageSummary)}</image:caption>
    </image:image>
  </url>
</urlset>
`;

const buildManifest = (seo) =>
  `${toPrettyJson({
    id: seo.canonicalUrl,
    lang: seo.language,
    name: seo.text.siteName,
    short_name: "Rishi Portfolio",
    description: seo.text.pageSummary,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: seo.themeColor,
    theme_color: seo.themeColor,
    categories: ["portfolio", "developer", "software"],
    icons: [
      {
        src: "/Logo.png",
        sizes: "919x962",
        type: "image/png",
      },
    ],
  })}
`;

const buildGeneratedSeoModule = (seo) => `export const RESOLVED_SEO = Object.freeze(${toPrettyJson(seo)});

export default RESOLVED_SEO;
`;

const env = loadEnv();
const seo = resolveSeoConfig(env);

const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
const nextIndexHtml = indexHtml
  .replace(/<!-- SEO:BEGIN -->[\s\S]*?<!-- SEO:END -->/, buildHeadMarkup(seo))
  .replace(/<!-- SEO-NOSCRIPT:BEGIN -->[\s\S]*?<!-- SEO-NOSCRIPT:END -->/, buildNoScriptMarkup(seo));

writeFileIfChanged(indexHtmlPath, nextIndexHtml);
writeFileIfChanged(path.join(publicDir, "robots.txt"), buildRobotsTxt(seo));
writeFileIfChanged(path.join(publicDir, "sitemap.xml"), buildSitemapXml(seo));
writeFileIfChanged(path.join(publicDir, "site.webmanifest"), buildManifest(seo));
writeFileIfChanged(path.join(srcLibDir, "seo.generated.js"), buildGeneratedSeoModule(seo));
