"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Dashboard() {
  // Mock data - in a real app, this would come from Supabase
  const investorData = {
    name: "Rahim Ahmed",
    totalInvestment: 25000,
    tier: "Tier 2",
    profitRate: 0.25,
    totalProfit: 6250,
    terminals: [
      { id: 1, name: "Rangpur Hub", location: "Rangpur", monthlyRevenue: 12500, investors: 5 },
      { id: 2, name: "Khulna Central", location: "Khulna", monthlyRevenue: 10000, investors: 4 }
    ],
    referrals: 3,
    referralBonus: 312.5
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-trust-blue mb-8">Investor Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-bold text-trust-blue mb-4">Your Investment</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 text-sm">Total Investment</p>
              <p className="text-2xl font-bold">৳{investorData.totalInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Tier</p>
              <p className="text-xl font-semibold">{investorData.tier} ({investorData.profitRate * 100}%)</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">Total Profit Earned</p>
                <p className="text-2xl font-bold text-growth-green">৳{investorData.totalProfit.toLocaleString()}</p>
              </div>
              <button className="bg-growth-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Withdraw
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-trust-blue mb-2">Referral Program</h3>
            <p className="text-gray-600 text-sm mb-2">You've referred {investorData.referrals} investors</p>
            <p className="text-gray-600 text-sm mb-4">Referral bonus: ৳{investorData.referralBonus.toLocaleString()}</p>
            
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm mb-2">Your referral link:</p>
              <div className="flex">
                <input 
                  type="text" 
                  value="https://starlinkforall.bd/ref/rahim123" 
                  readOnly
                  className="flex-grow bg-white border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                />
                <button className="bg-trust-blue text-white px-3 py-2 rounded-r-md">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-trust-blue mb-4">Your Terminals</h2>
          
          <div className="space-y-4">
            {investorData.terminals.map(terminal => (
              <div key={terminal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{terminal.name}</h3>
                  <span className="bg-blue-100 text-trust-blue text-xs px-2 py-1 rounded-full">
                    {terminal.location}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Monthly Revenue</p>
                    <p className="font-semibold">৳{terminal.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Co-investors</p>
                    <p className="font-semibold">{terminal.investors}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-4">Terminal locations</p>
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
              {/* This would be replaced with a Google Maps component */}
              <p className="text-gray-500">Map view of your terminals</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-8 bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-trust-blue mb-4">Profit History</h2>
        
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          {/* This would be replaced with a chart component */}
          <p className="text-gray-500">Profit chart over time</p>
        </div>
      </motion.div>
    </div>
  );
}