import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Define the Profile type here if not exported elsewhere
export type Profile = {
  id: string;
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  // Add other fields as needed
};
import { useAuth } from './useAuth';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  };

  const getSubscriptionLimits = () => {
    if (!profile) return { projects: 0, generations: 0, features: [] };

    switch (profile.subscription_tier) {
      case 'starter':
        return {
          projects: 10,
          generations: 50,
          features: ['2d_layout', 'basic_export']
        };
      case 'professional':
        return {
          projects: -1, // unlimited
          generations: -1, // unlimited
          features: ['2d_layout', '3d_model', 'advanced_export', 'collaboration']
        };
      case 'enterprise':
        return {
          projects: -1, // unlimited
          generations: -1, // unlimited
          features: ['2d_layout', '3d_model', 'advanced_export', 'collaboration', 'api_access', 'custom_integrations']
        };
      default:
        return { projects: 0, generations: 0, features: [] };
    }
  };

  const canCreateProject = (currentProjectCount: number) => {
    const limits = getSubscriptionLimits();
    return limits.projects === -1 || currentProjectCount < limits.projects;
  };

  const canGenerate = (currentGenerationCount: number) => {
    const limits = getSubscriptionLimits();
    return limits.generations === -1 || currentGenerationCount < limits.generations;
  };

  const hasFeature = (feature: string) => {
    const limits = getSubscriptionLimits();
    return limits.features.includes(feature);
  };

  return {
    profile,
    loading,
    updateProfile,
    getSubscriptionLimits,
    canCreateProject,
    canGenerate,
    hasFeature,
    refetch: fetchProfile,
  };
}