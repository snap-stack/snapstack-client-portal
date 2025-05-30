
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

const InviteLanding = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (token) {
      // Store token in sessionStorage to avoid re-verification
      const storedToken = sessionStorage.getItem('invite_token');
      if (storedToken === token) {
        setProcessed(true);
        return;
      }

      try {
        // In a real app, you'd verify the JWT token here
        // For now, we'll simulate extracting an email from the token
        const decodedEmail = atob(token).split(':')[0]; // Simple simulation
        setEmail(decodedEmail);
        sessionStorage.setItem('invite_token', token);
      } catch (err) {
        setError("Invalid invite token. Please contact your account manager.");
      }
    }
  }, [token]);

  const handleAcceptInvite = async () => {
    if (!email) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/client-portal/onboard'
        }
      });
      
      if (error) throw error;
      
      toast.success("Magic link sent! Check your email to complete setup.");
      setProcessed(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px]">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#40C676] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-xl font-bold text-gray-900">Invalid Invitation</CardTitle>
              <CardDescription className="text-gray-600">
                {error}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (processed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px]">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CheckCircle className="w-16 h-16 text-[#40C676] mx-auto mb-4" />
              <CardTitle className="text-xl font-bold text-gray-900">Invitation Sent</CardTitle>
              <CardDescription className="text-gray-600">
                Check your email for the magic link to complete your account setup.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/client-portal">
                <Button className="w-full bg-[#40C676] hover:bg-[#369b63]">
                  Go to Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-[#40C676] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome to SnapStack</CardTitle>
            <CardDescription className="text-gray-600">
              You've been invited to join our client portal
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                  <span className="text-gray-900">{email}</span>
                </div>
              </div>

              <Button 
                onClick={handleAcceptInvite}
                className="w-full h-12 bg-[#40C676] hover:bg-[#369b63] text-white font-medium rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending magic link..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Accept invitation & send magic link
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                Accepting this invitation will send a magic link to your email for secure sign-in.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteLanding;
