import React from 'react';
import PricingCard from './PricingCard';

const App: React.FC = () => {
  const handleSubscribe = (planName: string) => {
    alert(`Subscribed to ${planName}!`); // Placeholder action
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-white mb-12">Pricing</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center w-full max-w-5xl mx-auto">
        <PricingCard
          plan="Standard"
          price="$100"
          features={['50,000 Requests', '4 contributors', 'Up to 3 GB storage space']}
          onSubscribe={() => handleSubscribe('Standard')}
        />
        <PricingCard
          plan="Pro"
          price="$200"
          features={['100,000 Requests', '7 contributors', 'Up to 6 GB storage space']}
          isFeatured
          onSubscribe={() => handleSubscribe('Pro')}
        />
        <PricingCard
          plan="Expert"
          price="$500"
          features={['200,000 Requests', '11 contributors', 'Up to 10 GB storage space']}
          onSubscribe={() => handleSubscribe('Expert')}
        />
      </div>
    </div>
  );
};

export default App;
