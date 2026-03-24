import RESOLVED_SEO from "./seo.generated";

export const SITE_URL = RESOLVED_SEO.siteUrl;
export const CANONICAL_URL = RESOLVED_SEO.canonicalUrl;
export const SOCIAL_IMAGE_URL = RESOLVED_SEO.socialImageUrl;
export const PROFILE_IMAGE_URL = RESOLVED_SEO.profileImageUrl;
export const SEO_PROFILE = RESOLVED_SEO.profile;
export const SEO_TEXT = RESOLVED_SEO.text;
export const SEO_KEYWORD_LIST = RESOLVED_SEO.keywords;
export const SEO_KEYWORDS = SEO_KEYWORD_LIST.join(", ");
export const SEO_FAQ_ITEMS = RESOLVED_SEO.faqItems;
export const SEO_STRUCTURED_DATA = RESOLVED_SEO.structuredData;
export const SEO_DATES = RESOLVED_SEO.dates;
export const TWITTER_CREATOR = RESOLVED_SEO.twitterCreator;
export const GOOGLE_SITE_VERIFICATION = RESOLVED_SEO.googleSiteVerification;
