"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { sanitizeInput } from '../../lib/security';
import supabase from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import StarlinkHero from '../../starlink-hero/app/page';

export default function Dashboard() {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);
  const [investorData, setInvestorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }
      // Fetch user profile from Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error || !profile) {
        router.replace('/login');
        return;
      }
      // Fetch terminals where user is an investor (adjust query as needed for your schema)
      const { data: terminalsRaw } = await supabase
        .from('terminals')
        .select('*')
        .contains('investor_ids', [user.id]);
      // Normalize terminal data for UI
      const terminals = (terminalsRaw || []).map(t => ({
        id: t.id,
        name: t.name,
        location: t.location,
        monthlyRevenue: t.monthly_revenue || 0,
        investors: t.investors_count || 1
      }));
      // Build referral link
      const referralLink = `${window.location.origin}/ref/${profile.referral_code || user.id}`;
      setInvestorData({
        name: profile.name,
        totalInvestment: profile.total_investment || 0,
        tier: profile.tier || 'N/A',
        profitRate: profile.profit_rate || 0,
        totalProfit: profile.total_profit || 0,
        terminals,
        referrals: profile.referrals || 0,
        referralBonus: profile.referral_bonus || 0,
        referralLink,
      });
      setLoading(false);
    };
    checkAuthAndFetch();
  }, [router]);

  const copyReferralLink = () => {
    if (!investorData) return;
    navigator.clipboard.writeText(investorData.referralLink)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  if (loading || !investorData) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return <StarlinkHero />;
}