export function getSiteUrl() {
 const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`];
 for (const value of candidates) { if (!value) continue; try { const url = new URL(value); if (url.protocol === "https:" || (process.env.NODE_ENV === "development" && url.protocol === "http:")) return url.origin; } catch {} }
 return null;
}
