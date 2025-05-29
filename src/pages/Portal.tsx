import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, LogOut, Rocket } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { useCalendarUrl } from "@/hooks/useCalendarUrl";

interface AirtableApp {
  id: number;
  title: string;
  airtable_url: string;
  sort_order: number;
  created_at: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
}

const Portal = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [apps, setApps] = useState<AirtableApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { calUrl } = useCalendarUrl();

  useEffect(() => {
    fetchPortalData();
  }, []);

  const fetchPortalData = async () => {
    try {
      // TODO: Implement Supabase queries
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfile = {
        first_name: "Brian",
        last_name: "Adams", 
        company_name: "Meadoworks",
        email: "meadoworks@example.com"
      };
      
      const mockApps = [
        {
          id: 1,
          title: "WARN Tracking",
          airtable_url: "https://airtable.com/meadoworks_warn",
          sort_order: 1,
          created_at: "2024-01-15T10:00:00Z"
        },
        {
          id: 2,
          title: "LinkedIn Recommendations",
          airtable_url: "https://airtable.com/meadoworks_li",
          sort_order: 2,
          created_at: "2024-01-20T14:30:00Z"
        }
      ];
      
      setProfile(mockProfile);
      setApps(mockApps);
    } catch (error) {
      toast.error("Failed to load portal data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // TODO: Implement Supabase auth signOut
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleScheduleClick = () => {
    window.open(calUrl, '_blank');
  };

  const getDisplayName = () => {
    if (profile?.company_name) {
      return profile.company_name;
    }
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return "Welcome";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
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
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
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
          
          {apps.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{app.title}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-[#40C676] hover:bg-[#369b63]"
                      onClick={() => window.open(app.airtable_url, '_blank')}
                    >
                      Open App
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Portal;
