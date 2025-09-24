import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  subscription_plan: 'free' | 'basic' | 'premium' | 'enterprise'
  subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing'
  stripe_customer_id: string | null
  created_at: string
  updated_at: string
}

export interface SubscriptionPlan {
  id: 'free' | 'basic' | 'premium' | 'enterprise'
  name: string
  price: number
  features: string[]
  interval: 'month' | 'year'
}