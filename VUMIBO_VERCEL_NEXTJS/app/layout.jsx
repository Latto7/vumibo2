import "./globals.css";
import { getSiteUrl } from "../lib/site-url";
const origin = getSiteUrl();
export const metadata = {
 title: "Vumibo — Little wheels. Big adventures.",
 description: "Step into the colourful world of Vumibo. Meet our friendly trucks, watch original animated adventures and discover songs made for singing along.",
 ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: "/" } } : {}),
 openGraph: { title: "Vumibo — Little wheels. Big adventures.", description: "Friendly trucks. Colourful adventures. Original stories and songs. Welcome to Vumibo.", type: "website", locale: "en_US", ...(origin ? { url: origin, images: [{ url: "/assets/episode-pinwheel.webp", width: 1400, height: 788, alt: "Vumibo's colourful vehicle crew" }] } : {}) },
 twitter: { card: "summary_large_image", title: "Vumibo — Little wheels. Big adventures.", ...(origin ? { images: [origin + "/assets/episode-pinwheel.webp"] } : {}) },
 icons: { icon: "/assets/favicon.png", apple: "/assets/favicon.png" },
 robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : { index: true, follow: true }
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#1261f5" };
export default function RootLayout({ children }) { return <html lang="en"><body>{children}</body></html>; }
