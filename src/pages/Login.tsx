
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";
import AuthCard from "@/components/AuthCard";
import type { User } from '@supabase/supabase-js';

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Exchange hash fragment for session if coming from OAuth
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          toast.error("Authentication error. Please try again.");
        }
        
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error('Auth initialization error:', error);
        toast.error("Failed to initialize authentication.");
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user needs onboarding
          const needsOnboarding = !session.user.user_metadata?.onboarded;
          if (needsOnboarding) {
            window.location.href = '/client-portal/onboard';
          } else {
            window.location.href = '/client-portal/dashboard';
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state during initialization
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if already logged in
  if (user) {
    const needsOnboarding = !user.user_metadata?.onboarded;
    return <Navigate to={needsOnboarding ? '/client-portal/onboard' : '/client-portal/dashboard'} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header with logo */}
      <div className="fixed inset-x-0 top-0 z-50 bg-white border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-8 h-[72px] sm:h-[80px] lg:h-[96px]">
          <Logo />
          
          {/* Back to home */}
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#40C676] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>

      {/* Main content with padding to account for fixed header */}
      <div className="flex items-center justify-center px-4 pt-[120px] sm:pt-[128px] lg:pt-[144px] pb-8">
        <div className="w-full max-w-[420px]">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Client Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in with Google or your email to access your dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <AuthCard />

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-medium">Need access?</span>
                  <br />
                  Email your account manager for an invite.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
