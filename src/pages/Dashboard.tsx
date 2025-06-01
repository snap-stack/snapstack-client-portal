
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, Rocket } from "lucide-react";
import Logo from "@/components/Logo";
import UserMenu from "@/components/UserMenu";
import useCalURL from "@/hooks/useCalURL";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const { user, loading } = useAuthRedirect(true);
  const [profile, setProfile] = useState<any>(null);
  const { calUrl } = useCalURL();

  useEffect(() => {
    if (user) {
      // Fetch user profile
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      };
      fetchProfile();
    }
  }, [user]);

  const handleScheduleClick = () => {
    if (calUrl !== '#') {
      window.open(calUrl, '_blank');
    }
  };

  const getDisplayName = () => {
    if (profile?.company) {
      return profile.company;
    }
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return "Welcome";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled by useAuthRedirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo />
              <span className="ml-4 text-gray-400">Client Portal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={handleScheduleClick}
                className="border-[#40C676] text-[#40C676] hover:bg-[#40C676] hover:text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {getDisplayName()}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your custom applications and stay updated on project progress.
          </p>
        </div>

        {/* My Apps Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Apps</h2>
          
          <Card className="text-center py-12">
            <CardContent>
              <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-600 mb-2">
                Your workspace is coming soon 🚀
              </CardTitle>
              <CardDescription className="text-gray-500">
                We're preparing your custom applications. You'll see them here once they're ready.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
