
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserMenuProps {
  user: SupabaseUser;
}

export default function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/client-portal');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDisplayName = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return user.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#40C676] focus:ring-offset-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={getUserDisplayName()} />
            <AvatarFallback className="bg-[#40C676] text-white text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 text-sm text-gray-900">
          <div className="font-medium">{getUserDisplayName()}</div>
          <div className="text-gray-500">{user.email}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut} 
          disabled={isLoading}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoading ? 'Signing out...' : 'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
