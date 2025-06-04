import React from 'react';
import PricingCard from './components/PricingCard';

const App: React.FC = () => {
  const pricingPlans = [
    {
      plan: 'Standard',
      price: '$100',
      features: ['50,000 Requests', '4 contributors', 'Up to 3 GB storage space'],
      isFeatured: false,
    },
    {
      plan: 'Pro',
      price: '$200',
      features: ['100,000 Requests', '7 contributors', 'Up to 6 GB storage space'],
      isFeatured: true,
    },
    {
      plan: 'Expert',
      price: '$500',
      features: ['200,000 Requests', '11 contributors', 'Up to 10 GB storage space'],
      isFeatured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Pricing</h1>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:space-x-0">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex-1 ${index === 1 ? 'sm:-mt-10 sm:mb-[-4rem]' : ''} ${index > 0 ? 'sm:-ml-[1px]' : ''}`}
            >
              <PricingCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
