import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";

const Invite = () => {
  const { token } = useParams();
  const [invite, setInvite] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchInvite(token);
    }
  }, [token]);

  const fetchInvite = async (token: string) => {
    try {
      // TODO: Implement Supabase query to fetch invite by token
      // Placeholder for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock invite data
      const mockInvite = {
        email: "meadoworks@example.com",
        first_name: "Brian",
        last_name: "Adams",
        company_name: "Meadoworks",
        phone: "555-555-1212",
        claimed_at: null
      };
      
      setInvite(mockInvite);
    } catch (error) {
      setError("Invalid or expired invite link. Please contact your account manager.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement Supabase auth signUp and profile creation
      toast.success("Invitation accepted! Check your email for the magic link.");
      console.log("Accepting invite for:", invite);
    } catch (error) {
      toast.error("Failed to accept invitation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
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

  if (invite?.claimed_at) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CheckCircle className="w-16 h-16 text-[#40C676] mx-auto mb-4" />
              <CardTitle className="text-xl font-bold text-gray-900">Already Claimed</CardTitle>
              <CardDescription className="text-gray-600">
                This invitation has already been used. Please sign in to access your portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/login">
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
      <div className="w-full max-w-md">
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
            <form onSubmit={handleAcceptInvite} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input value={invite?.first_name || ""} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input value={invite?.last_name || ""} readOnly className="bg-gray-50" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <Input value={invite?.company_name || ""} readOnly className="bg-gray-50" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input value={invite?.email || ""} readOnly className="bg-gray-50" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input value={invite?.phone || ""} readOnly className="bg-gray-50" />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#40C676] hover:bg-[#369b63] text-white font-medium rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending magic link..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Accept invitation & send magic link
                  </>
                )}
              </Button>
            </form>

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

export default Invite;
