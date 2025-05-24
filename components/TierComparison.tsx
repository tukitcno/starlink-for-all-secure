import { motion } from 'framer-motion';

export default function TierComparison() {
  const tiers = [
    {
      name: 'Tier 1',
      investment: '৳2,000 - ৳10,000',
      profitShare: '10%',
      color: 'border-blue-300',
      highlight: false
    },
    {
      name: 'Tier 2',
      investment: '৳10,001 - ৳50,000',
      profitShare: '25%',
      color: 'border-blue-500',
      highlight: true
    },
    {
      name: 'Tier 3',
      investment: '৳50,001+',
      profitShare: '50%',
      color: 'border-blue-700',
      highlight: false
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-trust-blue mb-6 text-center">Investment Tiers</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            className={`border-2 ${tier.color} rounded-lg p-6 ${tier.highlight ? 'bg-blue-50' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h4 className="text-xl font-bold text-trust-blue mb-3">{tier.name}</h4>
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Investment Range</p>
              <p className="text-lg font-semibold">{tier.investment}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Profit Share</p>
              <p className="text-2xl font-bold text-growth-green">{tier.profitShare}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Example</p>
              <p className="text-md">
                {tier.name === 'Tier 1' && '৳5,000 → ৳500/month'}
                {tier.name === 'Tier 2' && '৳25,000 → ৳6,250/month'}
                {tier.name === 'Tier 3' && '৳100,000 → ৳50,000/month'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}