/** @type {import('next').NextConfig} */
const nextConfig = { poweredByHeader: false, reactStrictMode: true, async headers() { return [{ source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] }]; } };
export default nextConfig;
