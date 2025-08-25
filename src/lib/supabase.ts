import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  dimensions: {
    width?: number;
    length?: number;
    height?: number;
    rooms?: number;
  };
  project_type: 'residential' | 'commercial' | 'industrial' | 'mixed';
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  design_data: any;
  file_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Generation {
  id: string;
  project_id: string;
  user_id: string;
  generation_type: '2d_layout' | '3d_model' | 'optimization' | 'analysis';
  input_data: any;
  output_data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}
