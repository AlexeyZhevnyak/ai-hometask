import React from 'react';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  onSubscribe: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
  onSubscribe,
}) => {
  const cardBaseStyle =
    'flex flex-col text-center shadow-lg transition-transform duration-200 ease-in-out transform focus-within:scale-105 hover:scale-105 focus:outline-none focus:scale-105';
  const standardCardStyle = 'bg-white text-gray-900';
  const featuredCardStyle = 'bg-slate-700 text-white py-8'; // Extra py for elongation

  const buttonBaseStyle =
    'uppercase font-semibold tracking-wider py-3 px-6 focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105 focus:scale-105';
  const standardButtonStyle = 'bg-white text-gray-900 hover:bg-gray-100';
  const featuredButtonStyle = 'bg-slate-700 text-white hover:bg-slate-600';

  return (
    <div
      className={`${cardBaseStyle} ${
        isFeatured ? featuredCardStyle : standardCardStyle
      } ${isFeatured ? 'relative' : 'py-4'} w-full`} // py-4 for standard cards, featured already has py-8
      tabIndex={0} // Make the card focusable
    >
      <div className="px-6 py-8 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{plan}</h3>
        <p className="text-5xl font-bold mb-6">{price}</p>
        <ul className="space-y-3 text-sm flex-grow mb-8">
          {features.map((feature, index) => (
            <li key={index} className="border-t border-gray-300 dark:border-gray-600 pt-3 first:border-t-0">
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onSubscribe}
          className={`${buttonBaseStyle} ${
            isFeatured ? featuredButtonStyle : standardButtonStyle
          } mt-auto`}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PricingCard; 