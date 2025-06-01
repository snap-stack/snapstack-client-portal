
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, Rocket, Briefcase, BarChart, Database, Settings } from "lucide-react";
import Logo from "@/components/Logo";
import ClerkUserMenu from "@/components/ClerkUserMenu";
import useCalURL from "@/hooks/useCalURL";
import { useClerkAuthRedirect } from "@/hooks/useClerkAuthRedirect";
import { supabase } from "@/lib/supabase";

interface AppLink {
  id: string;
  app_name: string;
  airtable_url: string;
  icon_identifier: string | null;
  display_order: number | null;
}

const Dashboard = () => {
  const { user, loading } = useClerkAuthRedirect(true);
  const [profile, setProfile] = useState<any>(null);
  const [appLinks, setAppLinks] = useState<AppLink[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const { calUrl } = useCalURL();

  useEffect(() => {
    if (user) {
      // Fetch user profile from the new user_profiles table
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setProfile(data);
      };

      // Fetch client app links
      const fetchAppLinks = async () => {
        console.log('Fetching app links for user:', user.id);
        setLoadingApps(true);
        
        const { data, error } = await supabase
          .from('client_app_links')
          .select('id, app_name, airtable_url, icon_identifier, display_order')
          .eq('user_id', user.id)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching app links:', error);
        } else {
          console.log('Fetched app links:', data);
          setAppLinks(data || []);
        }
        
        setLoadingApps(false);
      };

      fetchProfile();
      fetchAppLinks();
    }
  }, [user]);

  const handleScheduleClick = () => {
    if (calUrl !== '#') {
      window.open(calUrl, '_blank');
    }
  };

  const getDisplayName = () => {
    if (profile?.company_name) {
      return profile.company_name;
    }
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (user?.fullName) {
      return user.fullName;
    }
    return "Welcome";
  };

  const getIconForApp = (iconIdentifier: string | null) => {
    switch (iconIdentifier) {
      case 'briefcase-icon':
        return <Briefcase className="w-8 h-8" />;
      case 'chart-icon':
        return <BarChart className="w-8 h-8" />;
      case 'database-icon':
        return <Database className="w-8 h-8" />;
      case 'settings-icon':
        return <Settings className="w-8 h-8" />;
      default:
        return <Rocket className="w-8 h-8" />;
    }
  };

  const handleAppClick = (url: string) => {
    window.open(url, '_blank');
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
    return null; // Redirect is handled by useClerkAuthRedirect
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
              <ClerkUserMenu />
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
            Access your custom applications and manage your project progress.
          </p>
        </div>

        {/* My Apps Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Apps</h2>
          
          {loadingApps ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your applications...</p>
              </CardContent>
            </Card>
          ) : appLinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appLinks.map((app) => (
                <Card 
                  key={app.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
                  onClick={() => handleAppClick(app.airtable_url)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-[#40C676] mb-4 flex justify-center group-hover:scale-110 transition-transform duration-200">
                      {getIconForApp(app.icon_identifier)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{app.app_name}</h3>
                    <div className="flex items-center justify-center text-sm text-gray-500 group-hover:text-[#40C676] transition-colors">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Open Application
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-600 mb-2">
                  No custom applications are currently assigned to your account
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Please contact support if you believe this is an error.
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
