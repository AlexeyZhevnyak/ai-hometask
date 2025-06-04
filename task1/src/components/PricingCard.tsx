import React from 'react';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  plan, 
  price, 
  features, 
  isFeatured = false 
}) => {
  return (
    <div
      className={`
        relative border transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-blue-500 focus-within:ring-opacity-50
        ${isFeatured 
          ? 'bg-slate-700 text-white border-slate-600 py-17 px-8' 
          : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300 p-8'
        }
      `}
      tabIndex={0}
    >
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isFeatured ? 'text-white' : 'text-gray-700 md:group-hover:text-white'}`}>
          {plan}
        </h3>

        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
        </div>

        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`text-sm border-b pb-2 transition-colors duration-300 ${
                isFeatured 
                  ? 'text-gray-200 border-slate-600' 
                  : 'text-gray-600 border-gray-200 md:group-hover:text-gray-200 md:group-hover:border-slate-600'
              }`}
            >
              {feature}
            </div>
          ))}
        </div>

        <button
          className={`
            w-full py-3 px-6 rounded font-medium border
            ${isFeatured 
              ? 'text-white border-white bg-slate-700' 
              : 'text-gray-700 border-gray-300 bg-white'
            }
          `}
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default PricingCard;