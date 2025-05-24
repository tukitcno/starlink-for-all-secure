export interface TierInfo {
  rate: number;
  label: string;
}

export interface ProfitCalculation {
  tier: TierInfo;
  monthlyProfit: number;
  dailyProfit: number;
  yearlyProfit: number;
}

export const calculateProfit = (investment: number): ProfitCalculation => {
  let tier: TierInfo;
  
  if (investment >= 2000 && investment <= 10000) {
    tier = { rate: 0.1, label: "Tier 1" };
  } else if (investment <= 50000) {
    tier = { rate: 0.25, label: "Tier 2" };
  } else {
    tier = { rate: 0.5, label: "Tier 3" };
  }

  const avgHoursPerDay = 3; // Based on rural usage data
  const dailyProfit = investment * tier.rate * avgHoursPerDay / 30;
  const monthlyProfit = dailyProfit * 30;
  const yearlyProfit = monthlyProfit * 12;

  return { 
    tier, 
    monthlyProfit,
    dailyProfit,
    yearlyProfit
  };
};