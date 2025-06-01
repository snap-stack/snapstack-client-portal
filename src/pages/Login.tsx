
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import AuthCard from "@/components/AuthCard";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Login = () => {
  const { user, loading } = useAuthRedirect(false);

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

  // If user is logged in, redirect is handled by useAuthRedirect
  if (user) {
    return null;
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
              <div className="auth-logo w-40 mx-auto -mt-8 mb-4">
                <Logo />
              </div>
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
