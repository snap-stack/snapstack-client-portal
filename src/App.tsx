
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InviteLanding from "./pages/InviteLanding";
import OnboardForm from "./pages/OnboardForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import "./components/ui/auth-styles.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client-portal" element={<Login />} />
          <Route path="/client-portal/invite/:token" element={<InviteLanding />} />
          <Route path="/client-portal/onboard" element={<OnboardForm />} />
          <Route path="/client-portal/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
