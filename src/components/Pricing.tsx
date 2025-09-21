// src/components/Pricing.tsx
import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  handleGetStarted: () => void;
}

const Pricing: React.FC<PricingProps> = ({ handleGetStarted }) => {
  return (
    <section id="Pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-logo text-blue-700 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 font-logo">Select the perfect plan for your architectural design needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-2 hover:border-blue-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">Basic Plan</h3>
              <p className="text-gray-600 font-logo mb-4">Explore AI tools to elevate your design workflow.</p>
              <div className="text-4xl font-bold font-logo text-gray-900 mb-1">$19<span className="text-lg font-medium text-gray-600">/mo</span></div>
              <p className="text-gray-500 text-sm">billed monthly</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />1,000 Credits</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />100 Designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />12 Videos</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />200 text-to-render designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />High resolution designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Save generated designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />4K Upscaling</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Commercial use</li>
            </ul>
            <button
              onClick={handleGetStarted}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors font-logo"
            >
              Subscribe Now
            </button>
          </div>

          {/* Pro Plan (Most Popular) */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-md font-large font-logo">Most Popular</span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">Pro Plan</h3>
              <p className="text-gray-600 font-logo mb-4">Generate amazing designs and visuals at a fraction of the cost.</p>
              <div className="text-4xl font-bold font-logo text-gray-900 mb-1">$39<span className="text-lg font-medium text-gray-600">/mo</span></div>
              <p className="text-gray-500 text-sm">billed monthly</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />5,000 Credits</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />500 Designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />65 Videos</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />1000 text-to-render designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />High resolution designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Save generated designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />4K Upscaling</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Commercial use</li>
            </ul>
            <button
              onClick={handleGetStarted}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors font-logo"
            >
              Subscribe Now
            </button>
          </div>

          {/* Expert Plan */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-2 hover:border-blue-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">Expert Plan</h3>
              <p className="text-gray-600 font-logo mb-4">Optimize your design workflow and serve your clients fast.</p>
              <div className="text-4xl font-bold font-logo text-gray-900 mb-1">$79<span className="text-lg font-medium text-gray-600">/mo</span></div>
              <p className="text-gray-500 text-sm">billed monthly</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />10,000 Credits</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />1,000 Designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />130 Videos</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />2000 text-to-render designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />High resolution designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Save generated designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />4K Upscaling</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Commercial use</li>
            </ul>
            <button
              onClick={handleGetStarted}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors font-logo"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;