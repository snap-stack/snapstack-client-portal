
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";
import type { User } from '@supabase/supabase-js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/client-portal'
        }
      });
      
      if (error) throw error;
      
      toast.success("Magic link sent! Check your email.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
                Sign in to access your project dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#40C676] hover:bg-[#369b63] text-white font-medium rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Sending magic link..."
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send magic link
                    </>
                  )}
                </Button>
              </form>

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
