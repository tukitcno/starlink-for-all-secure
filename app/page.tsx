"use client";

import Hero from '../components/Hero';
import Calculator from '../components/Calculator';
import TierComparison from '../components/TierComparison';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-white hexagon-pattern">
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <section className="rounded-2xl bg-white/90 shadow-xl p-8 mb-16 border border-trust-blue/10">
          <h2 className="text-3xl font-extrabold text-trust-blue mb-8 text-center tracking-tight">Calculate Your Investment</h2>
          <Calculator />
        </section>
        <section className="rounded-2xl bg-white/90 shadow-xl p-8 border border-trust-blue/10">
          <TierComparison />
        </section>
      </div>
    </main>
  );
}