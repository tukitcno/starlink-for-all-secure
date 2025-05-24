"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// FAQ Item component with accordion functionality
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-trust-blue focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 text-gray-600"
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function FAQ() {
  // FAQ data
  const faqItems = [
    {
      question: "Is Starlink legal in Bangladesh?",
      answer: "Yes, Starlink received regulatory approval in Bangladesh in 2023. Our business model complies with all local telecommunications regulations and we maintain necessary permits for operation."
    },
    {
      question: "How secure is my investment?",
      answer: "Your investment is secured by physical Starlink hardware assets. We maintain comprehensive insurance on all terminals and equipment. Additionally, our legal structure provides investors with partial ownership of the terminals proportional to their investment."
    },
    {
      question: "When will I start earning profits?",
      answer: "Profit generation begins as soon as the terminal you've invested in is deployed and operational, typically within 2-4 weeks of your investment. You'll receive daily profit updates in your dashboard and can withdraw funds at any time."
    },
    {
      question: "How are the profits calculated?",
      answer: "Profits are calculated based on actual usage hours multiplied by the hourly rate (৳25/hour for general users, ৳15/hour for students/NGOs). Your profit share (10-50% based on your tier) is calculated daily and added to your account balance."
    },
    {
      question: "Can I withdraw my initial investment?",
      answer: "Yes, after a minimum period of 6 months, you can request to withdraw your initial investment. This is subject to a 5% early withdrawal fee if done before 12 months. After 12 months, you can withdraw your full investment without fees."
    },
    {
      question: "What happens if a terminal breaks or needs maintenance?",
      answer: "We maintain a comprehensive maintenance fund that covers all repairs and replacements. Your profits will not be affected by routine maintenance. In case of major damage, our insurance policy covers replacement costs."
    },
    {
      question: "How do you verify student/NGO status for discounted rates?",
      answer: "We have a verification process that requires submission of valid student ID or NGO registration documents. Our team manually verifies these documents before approving the discounted rate."
    },
    {
      question: "Can I name a terminal after myself or my business?",
      answer: "Yes! Investors in Tier 2 and Tier 3 have the option to name terminals. This is a great way to promote your business while investing in rural connectivity."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-trust-blue mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Find answers to common questions about investing in Starlink For All.
      </p>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a 
          href="mailto:info@starlinkforall.bd" 
          className="inline-block bg-trust-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}