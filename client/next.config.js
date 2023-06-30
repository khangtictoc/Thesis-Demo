/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "http://127.0.0.1:5000",
  },
}

module.exports = nextConfig
