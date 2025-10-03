import { Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { createCheckoutSession } from '../lib/stripe';
import { SubscriptionPlan } from '../lib/supabase';

const pricingPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: ['Basic AI rendering', '5 projects per month', 'Standard resolution', 'Community support'],
    interval: 'month'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 19,
    features: ['Advanced AI rendering', '20 projects per month', 'HD resolution', 'Priority support', 'Export options'],
    interval: 'month'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49,
    features: ['Premium AI rendering', 'Unlimited projects', '4K resolution', '24/7 dedicated support', 'All export formats', 'Early access to features'],
    interval: 'month'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    features: ['Everything in Premium', 'Custom AI models', 'White-label solutions', 'SLA guarantee', 'Dedicated account manager', 'API access'],
    interval: 'month'
  }
];

const stripePriceIds = {
  free: null,
  basic: 'price_basic_monthly', // Replace with your actual Stripe price ID
  premium: 'price_premium_monthly', // Replace with your actual Stripe price ID
  enterprise: 'price_enterprise_monthly' // Replace with your actual Stripe price ID
};

interface PricingProps {
  handleGetStarted: () => void;
}

export function Pricing({ handleGetStarted }: PricingProps) {
  const { user, profile, signIn } = useAuth();

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      signIn('', ''); // Trigger sign-in if user is not authenticated
      return;
    }

    if (plan.id === 'free') {
      return;
    }

    try {
      await createCheckoutSession(
        stripePriceIds[plan.id as keyof typeof stripePriceIds]!,
        user.email!,
        user.id
      );
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const getCurrentPlan = () => {
    return profile?.subscription_plan || 'free';
  };

  return (
    <section id="Pricing" className="py-20 bg-gray-50 font-sans" dir="auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-logo text-blue-700 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 font-logo">Select the perfect plan for your architectural design needs</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => {
            const isCurrentPlan = getCurrentPlan() === plan.id;
            const isFreePlan = plan.id === 'free';
            const isPopularPlan = plan.id === 'premium'; 

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative ${
                  isPopularPlan ? 'border-2 border-blue-500' : 'hover:border-2 hover:border-blue-500'
                }`}
              >
                {/* Most Popular Badge Only */}
                {isPopularPlan && ( 
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-2 rounded-full text-md font-medium font-logo">
                      Most Popular 
                    </span>
                  </div>
                )}

                {/* Plan Details */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-2 font-logo">{plan.name}</h3>
                  <p className="text-gray-600 font-logo mb-4">
                    {plan.id !== 'free' ? 'Perfect for ' : 'Great for '}
                    {plan.id === 'free' && 'getting started'}
                    {plan.id === 'basic' && 'individual architects'}
                    {plan.id === 'premium' && 'design studios'}
                    {plan.id === 'enterprise' && 'large firms'}
                  </p>
                  <div className="text-4xl font-bold font-logo text-gray-900 mb-1">
                    ${plan.price}<span className="text-lg font-medium text-gray-600">/{plan.interval}</span>
                  </div>
                  <p className="text-gray-500 text-sm">billed monthly</p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 font-logo" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div>
                  <button
                    className={`w-full py-3 rounded-lg font-medium text-white transition-colors font-logo ${
                      isCurrentPlan ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
                    }`}
                    onClick={() => (isFreePlan || isCurrentPlan ? handleGetStarted() : handleSubscribe(plan))}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Current Plan' : isFreePlan ? 'Select Free' : `Subscribe`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}