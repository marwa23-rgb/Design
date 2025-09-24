import { useAuth } from '../hooks/useAuth'
import { createCheckoutSession } from '../lib/stripe'
import { SubscriptionPlan } from '../lib/supabase'

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
]

const stripePriceIds = {
  free: null,
  basic: 'price_basic_monthly', // Replace with your actual Stripe price ID
  premium: 'price_premium_monthly', // Replace with your actual Stripe price ID
  enterprise: 'price_enterprise_monthly' // Replace with your actual Stripe price ID
}
interface PricingProps {
  handleGetStarted: () => void;
}
export function Pricing({handleGetStarted}: PricingProps) {
  const { user, profile, signIn } = useAuth()

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      return
    }

    if (plan.id === 'free') {
      return
    }

    try {
      await createCheckoutSession(
        stripePriceIds[plan.id as keyof typeof stripePriceIds]!,
        user.email!,
        user.id
      )
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to initiate payment. Please try again.')
    }
  }

  const getCurrentPlan = () => {
    return profile?.subscription_plan || 'free'
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your architectural design needs. Start with a free plan and upgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => {
            const isCurrentPlan = getCurrentPlan() === plan.id
            const isFreePlan = plan.id === 'free'

            return (
              <div
                key={plan.id}
                className={`relative overflow-hidden rounded-2xl shadow-lg bg-white p-6 flex flex-col justify-between ${
                  isCurrentPlan ? 'ring-2 ring-blue-500 border border-blue-500' : 'border border-gray-200'
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      Current Plan
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {plan.id !== 'free' ? 'Perfect for ' : 'Great for '}
                    {plan.id === 'free' && 'getting started'}
                    {plan.id === 'basic' && 'individual architects'}
                    {plan.id === 'premium' && 'design studios'}
                    {plan.id === 'enterprise' && 'large firms'}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {user ? (
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                        isCurrentPlan
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      onClick={() => handleSubscribe(plan)}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : isFreePlan ? 'Select Free' : `Subscribe for $${plan.price}`}
                    </button>
                  ) : (
                    <button
                      className="w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                      onClick={() => signIn('','')}
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
