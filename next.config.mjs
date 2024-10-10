/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-dev-uploads-mdsbmxre.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "v0.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
