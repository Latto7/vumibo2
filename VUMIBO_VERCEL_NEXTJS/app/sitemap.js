import { getSiteUrl } from "../lib/site-url";
export default function sitemap() { const url = getSiteUrl(); return url ? [{ url, changeFrequency: "weekly", priority: 1 }] : []; }
