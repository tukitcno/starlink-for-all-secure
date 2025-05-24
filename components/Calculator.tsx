"use client";

import { useState, useEffect } from 'react';
import { calculateProfit } from '../utils/calculator';
import { motion } from 'framer-motion';

export default function Calculator() {
  const [investment, setInvestment] = useState<number>(2000);
  const [result, setResult] = useState(calculateProfit(2000));

  useEffect(() => {
    setResult(calculateProfit(investment));
  }, [investment]);

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 2000) {
      setInvestment(value);
    }
  };

  const getTierColor = () => {
    switch (result.tier.label) {
      case 'Tier 1': return 'bg-blue-100 text-trust-blue';
      case 'Tier 2': return 'bg-blue-200 text-trust-blue';
      case 'Tier 3': return 'bg-blue-300 text-trust-blue';
      default: return 'bg-blue-100 text-trust-blue';
    }
  };

  return (
    <div id="calculator" className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-trust-blue mb-6">Investment Calculator</h3>
      
      <div className="mb-6">
        <label htmlFor="investment" className="block text-gray-700 mb-2">
          Investment Amount (Min ৳2,000)
        </label>
        <input
          type="number"
          id="investment"
          min="2000"
          value={investment}
          onChange={handleInvestmentChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust-blue"
        />
      </div>

      <div className="flex items-center mb-6">
        <span className={`px-4 py-1 rounded-full text-sm font-medium ${getTierColor()}`}>
          {result.tier.label} ({result.tier.rate * 100}% profit share)
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 text-sm">Daily Profit</p>
          <p className="text-2xl font-bold text-trust-blue">৳{result.dailyProfit.toFixed(2)}</p>
        </motion.div>
        
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-600 text-sm">Monthly Profit</p>
          <p className="text-2xl font-bold text-trust-blue">৳{result.monthlyProfit.toFixed(2)}</p>
        </motion.div>
        
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-gray-600 text-sm">Yearly Profit</p>
          <p className="text-2xl font-bold text-trust-blue">৳{result.yearlyProfit.toFixed(2)}</p>
        </motion.div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">
          Based on average usage of 3 hours per day at ৳25/hour for general users.
        </p>
      </div>

      <button className="w-full bg-growth-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
        Start Investing Now
      </button>
    </div>
  );
}