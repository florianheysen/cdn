/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "aws-nextjs-2-florianheysen-mybucket-btbdbzaf.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // ...
};

export default nextConfig;
