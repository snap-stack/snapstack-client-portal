
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuthRedirect = (requireAuth = true) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setUser(null);
          if (requireAuth) {
            navigate('/client-portal');
          }
          return;
        }

        setUser(session.user);

        // Check if profile is complete
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, company, phone')
          .eq('id', session.user.id)
          .single();

        const isProfileComplete = profile?.first_name && 
                                 profile?.last_name && 
                                 profile?.company && 
                                 profile?.phone;

        if (!isProfileComplete && window.location.pathname !== '/complete-profile') {
          navigate('/complete-profile');
        } else if (isProfileComplete && window.location.pathname === '/complete-profile') {
          navigate('/client-portal/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          if (requireAuth) {
            navigate('/client-portal');
          }
        } else if (session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, requireAuth]);

  return { user, loading };
};
