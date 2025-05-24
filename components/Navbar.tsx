"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-trust-blue">Starlink For All</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-trust-blue px-3 py-2">
              Home
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-trust-blue px-3 py-2">
              How It Works
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-trust-blue px-3 py-2">
              FAQ
            </Link>
            <Link href="/dashboard" className="bg-trust-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Investor Dashboard
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-trust-blue focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 hover:text-trust-blue px-3 py-2">
              Home
            </Link>
            <Link href="/how-it-works" className="block text-gray-700 hover:text-trust-blue px-3 py-2">
              How It Works
            </Link>
            <Link href="/faq" className="block text-gray-700 hover:text-trust-blue px-3 py-2">
              FAQ
            </Link>
            <Link href="/dashboard" className="block bg-trust-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-2">
              Investor Dashboard
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}