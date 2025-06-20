import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-react';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        navigate('/client-portal');
        return;
      }

      try {
        console.log('Loading profile for user:', user.id);
        
        // Check existing profile data in the new user_profiles table
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('first_name, last_name, company_name, phone_number, profile_completed_at')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading profile:', error);
        }

        console.log('Loaded profile:', profile);

        setFormData({
          firstName: profile?.first_name || user.firstName || '',
          lastName: profile?.last_name || user.lastName || '',
          company: profile?.company_name || '',
          phone: profile?.phone_number || ''
        });

        // If profile is already complete, redirect to dashboard
        if (profile?.first_name && profile?.last_name && profile?.company_name && profile?.phone_number && profile?.profile_completed_at) {
          console.log('Profile already complete, redirecting to dashboard');
          navigate('/client-portal/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        // Pre-fill with Clerk data if no profile exists
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          company: '',
          phone: ''
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, isLoaded, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.company || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to save profile for user:', user.id);
      console.log('Profile data:', formData);

      const profileData = {
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.company,
        phone_number: formData.phone,
        profile_completed_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Profile saved successfully');
      toast.success('Profile completed successfully!');
      navigate('/client-portal/dashboard');
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Complete Your Profile</CardTitle>
            <CardDescription className="text-gray-600">
              Tell us a bit about yourself to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">First Name *</label>
                  <Input
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    required
                    className="mt-1"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Name *</label>
                  <Input
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    required
                    className="mt-1"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Company *</label>
                <Input
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  required
                  className="mt-1"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Phone *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  required
                  className="mt-1"
                  placeholder="Enter phone number"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#40C676] hover:bg-[#369b63] text-white font-medium rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Complete Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
