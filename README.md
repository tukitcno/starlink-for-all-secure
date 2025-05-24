# Starlink For All

A micro-investment platform for Starlink terminals across Bangladesh.

## Project Overview

Starlink For All is a platform that allows users to invest in Starlink terminals across Bangladesh and earn passive income. The platform provides tools for calculating investment returns, comparing different investment tiers, and managing user accounts.

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- Supabase for database and authentication
- GSAP and Framer Motion for animations
- Google Maps API for location services

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd starlink-for-all
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in the required environment variables

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the project:
   ```bash
   vercel
   ```

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Environment Variables

The following environment variables need to be set in your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_ENCRYPTION_KEY`: Key for encrypting sensitive data
- `NEXT_PUBLIC_SSLCOMMERZ_STORE_ID`: Your SSLCommerz store ID
- `NEXT_PUBLIC_SSLCOMMERZ_STORE_PASSWORD`: Your SSLCommerz store password
- `NEXT_PUBLIC_SSLCOMMERZ_IS_LIVE`: Set to "true" for production
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key

## Project Structure

- `/app`: Next.js app directory with pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility libraries and service connections
- `/utils`: Helper functions and utilities