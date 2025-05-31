/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'example.com',
      'github.com',
      'raw.githubusercontent.com'
    ],
  },
}

module.exports = nextConfig 