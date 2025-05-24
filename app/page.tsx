"use client";

import Hero from '../components/Hero';
import Calculator from '../components/Calculator';
import TierComparison from '../components/TierComparison';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-trust-blue mb-8 text-center">Calculate Your Investment</h2>
        <Calculator />
        <div className="mt-16">
          <TierComparison />
        </div>
      </div>
    </main>
  );
}