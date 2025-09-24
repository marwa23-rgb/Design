import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { createBillingPortalSession } from '../lib/stripe'

export function Dashboard() {
  const { user, profile, signOut } = useAuth()

  const handleManageSubscription = async () => {
    if (!profile?.stripe_customer_id) {
      alert('No subscription found')
      return
    }

    try {
      await createBillingPortalSession(profile.stripe_customer_id)
    } catch (error) {
      console.error('Error creating billing portal session:', error)
      alert('Failed to open billing portal. Please try again.')
    }
  }

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-blue-100 text-blue-800'
      case 'basic': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'trialing': return 'bg-blue-100 text-blue-800'
      case 'past_due': return 'bg-yellow-100 text-yellow-800'
      case 'canceled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h2>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile.full_name || user.email}!</p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <p className="text-sm text-gray-500 mb-4">Your account details and personal information</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{profile.full_name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Subscription Details</h2>
            <p className="text-sm text-gray-500 mb-4">Your current plan and billing information</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Current Plan</label>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanBadgeColor(
                      profile.subscription_plan
                    )}`}
                  >
                    {profile.subscription_plan.toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Subscription Status</label>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      profile.subscription_status
                    )}`}
                  >
                    {profile.subscription_status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Billing</label>
                <p className="text-gray-900">
                  {profile.subscription_plan === 'free'
                    ? 'Free plan - no billing'
                    : 'Managed through Stripe'}
                </p>
              </div>
              {profile.subscription_plan !== 'free' && profile.stripe_customer_id && (
                <button
                  onClick={handleManageSubscription}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Manage Subscription
                </button>
              )}
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Usage Statistics</h2>
            <p className="text-sm text-gray-500 mb-4">Your architectural design usage overview</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-gray-600">Projects Created</div>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-gray-600">Designs Rendered</div>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-gray-600">Exports Downloaded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
