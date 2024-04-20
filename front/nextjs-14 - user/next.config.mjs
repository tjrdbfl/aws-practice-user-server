/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["pbs.twimg.com"],
      },
    env: {
        
        API_KEY: process.env.API_KEY,
      },
};
  
export default nextConfig;
