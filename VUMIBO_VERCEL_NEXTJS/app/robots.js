import { getSiteUrl } from "../lib/site-url";
export default function robots() { const url = getSiteUrl(); return { rules: { userAgent: "*", ...(process.env.VERCEL_ENV === "preview" ? { disallow: "/" } : { allow: "/" }) }, ...(url ? { sitemap: url + "/sitemap.xml" } : {}) }; }
