
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';

export const useClerkAuthRedirect = (requireAuth = true) => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!isLoaded) return;

      if (!user) {
        setLoading(false);
        if (requireAuth) {
          navigate('/client-portal');
        }
        return;
      }

      try {
        console.log('Checking profile for Clerk user:', user.id);
        
        // Check if profile is complete in the new user_profiles table
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('first_name, last_name, company_name, phone_number, profile_completed_at')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Profile check error:', error);
        }

        console.log('Profile data:', profile);

        const isProfileComplete = profile?.first_name && 
                                 profile?.last_name && 
                                 profile?.company_name && 
                                 profile?.phone_number &&
                                 profile?.profile_completed_at;

        // Get current path
        const currentPath = window.location.pathname;
        console.log('Current path:', currentPath, 'Profile complete:', isProfileComplete);

        if (!isProfileComplete && currentPath !== '/complete-profile') {
          console.log('Redirecting to complete profile');
          navigate('/complete-profile');
        } else if (isProfileComplete && currentPath === '/complete-profile') {
          console.log('Redirecting to dashboard');
          navigate('/client-portal/dashboard');
        }
      } catch (error) {
        console.error('Profile check error:', error);
        // If profile doesn't exist or there's an error, redirect to complete profile
        if (window.location.pathname !== '/complete-profile') {
          navigate('/complete-profile');
        }
      } finally {
        setLoading(false);
      }
    };

    checkProfileCompletion();
  }, [user, isLoaded, navigate, requireAuth]);

  return { user, loading };
};
