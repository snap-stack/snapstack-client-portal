
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Login = () => {
  const navigate = useNavigate();

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
          <SignedOut>
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="auth-logo w-40 mx-auto -mt-8 mb-4">
                  <Logo />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Client Portal</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to access your dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex justify-center">
                <SignIn 
                  routing="hash"
                  fallbackRedirectUrl="/client-portal/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "border-0 shadow-none",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                    }
                  }}
                />
              </CardContent>
            </Card>
          </SignedOut>
          
          <SignedIn>
            {/* User is signed in, redirect will be handled by useClerkAuthRedirect */}
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Redirecting...</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
