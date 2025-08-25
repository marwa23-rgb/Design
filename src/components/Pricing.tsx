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
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-2 hover:border-blue-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">Starter</h3>
              <div className="text-3xl font-bold font-logo text-gray-900 mb-1">$29<span className="text-lg font-medium text-gray-600">/mo</span></div>
              <p className="text-gray-600 font-logo">Perfect for individuals</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />10 designs per month</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />2D floor plans</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Basic 3D views</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />PDF exports</li>
            </ul>
            <button
              onClick={handleGetStarted}
              className="w-full border hover:bg-blue-700 hover:text-white font-logo border-blue-500 text-blue-500 py-3 rounded-lg font-medium transition-colors"
            >
              Start Free Trial
            </button>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium font-logo">Most Popular</span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">Professional</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1 font-logo">$99<span className="text-lg font-medium text-gray-600">/mo</span></div>
              <p className="text-gray-600 font-logo">For architects & firms</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Unlimited designs</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Advanced 2D/3D tools</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />CAD file exports</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Priority support</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Team collaboration</li>
            </ul>
            <button
              onClick={handleGetStarted}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors font-logo"
            >
              Get Started
            </button>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:border-2 hover:border-blue-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-logo">Enterprise</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1 font-logo">Custom</div>
              <p className="text-gray-600 font-logo">For large organizations</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Everything in Pro</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Custom integrations</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Dedicated support</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />On-premise deployment</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3 font-logo" />Custom training</li>
            </ul>
            <button className="w-full border border-blue-500 hover:border-blue-700 font-logo text-blue-500 hover:text-white hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;