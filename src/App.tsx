
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InviteLanding from "./pages/InviteLanding";
import OnboardForm from "./pages/OnboardForm";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ClerkProtectedRoute from "./components/ClerkProtectedRoute";
import "./components/ui/auth-styles.css";

const queryClient = new QueryClient();

// SSO Callback component for Clerk
const SSOCallback = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#40C676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client-portal" element={<Login />} />
          <Route path="/sso-callback" element={<SSOCallback />} />
          <Route path="/client-portal/sso-callback" element={<SSOCallback />} />
          <Route path="/client-portal/invite/:token" element={<InviteLanding />} />
          <Route path="/client-portal/onboard" element={<OnboardForm />} />
          <Route path="/complete-profile" element={
            <ClerkProtectedRoute>
              <CompleteProfile />
            </ClerkProtectedRoute>
          } />
          <Route path="/client-portal/dashboard" element={
            <ClerkProtectedRoute>
              <Dashboard />
            </ClerkProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
