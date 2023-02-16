/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_DISCORD_IDENTIFICATION_URL: process.env.NODE_ENV === 'production' ? 
    'https://discord.com/api/oauth2/authorize?client_id=1073750713928257538&redirect_uri=https%3A%2F%2Fpleasurepal.de%2Fprofile%2Fidentification%2Fdiscord&response_type=code&scope=identify%20gdm.join' 
    : 
    "https://discord.com/api/oauth2/authorize?client_id=1073750713928257538&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile%2Fidentification%2Fdiscord&response_type=code&scope=identify%20gdm.join",
    NEXT_PUBLIC_PLEASUREPAL_API: process.env.NODE_ENV === 'production' ? 
    'https://api.pleasurepal.de/api' 
    : 
    'http://localhost:3001',
  }
}

module.exports = nextConfig
