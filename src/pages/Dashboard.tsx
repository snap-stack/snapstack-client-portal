
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, LogOut, Rocket } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import useCalURL from "@/hooks/useCalURL";
import { supabase } from "@/lib/supabase";
import RequireAuth from "@/components/RequireAuth";
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const { calUrl } = useCalURL();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch user profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

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

  return (
    <RequireAuth>
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
    </RequireAuth>
  );
};

export default Dashboard;
