
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
        // Check if profile is complete in Supabase
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, company, phone')
          .eq('id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Profile check error:', error);
        }

        const isProfileComplete = profile?.first_name && 
                                 profile?.last_name && 
                                 profile?.company && 
                                 profile?.phone;

        // Get current path
        const currentPath = window.location.pathname;

        if (!isProfileComplete && currentPath !== '/complete-profile') {
          navigate('/complete-profile');
        } else if (isProfileComplete && currentPath === '/complete-profile') {
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
