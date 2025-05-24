"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      title: "Fund",
      description: "Invest a minimum of ৳2,000 to join our micro-investment platform. Choose your investment tier for 10-50% profit sharing.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Deploy",
      description: "We install Starlink terminals in high-traffic rural markets across Bangladesh, providing affordable internet access.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Earn",
      description: "Track your earnings in real-time as users pay ৳25/hour for internet access. Withdraw profits to your bKash or bank account.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-trust-blue mb-4 text-center">How It Works</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our micro-investment platform makes it easy to invest in Starlink terminals and earn passive income from rural internet access.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4 text-trust-blue">
              {step.icon}
            </div>
            <h2 className="text-xl font-bold text-trust-blue mb-3">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-trust-blue mb-6 text-center">Video Explanation</h2>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
          {/* This would be replaced with an actual video player */}
          <div className="text-center p-12">
            <svg className="w-16 h-16 mx-auto text-trust-blue opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <p className="mt-4 text-gray-500">3-step video explanation (Bengali)</p>
          </div>
        </div>
      </div>
      
      <div className="bg-trust-blue text-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Investing?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join hundreds of investors who are already earning passive income while bringing internet access to rural Bangladesh.
        </p>
        <Link href="/#calculator" className="inline-block bg-growth-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
          Calculate Your Investment
        </Link>
      </div>
    </div>
  );
}