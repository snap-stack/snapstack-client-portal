
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

interface ClerkProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ClerkProtectedRoute = ({ children, redirectTo = '/client-portal' }: ClerkProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ClerkProtectedRoute;
