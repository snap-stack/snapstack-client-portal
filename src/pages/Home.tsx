
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import useCalURL from "@/hooks/useCalURL";

const Home = () => {
  const { calUrl } = useCalURL();

  const handleCTAClick = () => {
    if (calUrl !== '#') {
      window.open(calUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-white via-white to-slate-50">
      <Navbar />

      {/* Hero Section */}
      <div className="mt-20 lg:mt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Custom builds that
                <span className="text-[#40C676] block">scale with you</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From MVP to enterprise. We craft bespoke software solutions that grow with your business, 
                backed by cutting-edge technology and seamless user experiences.
              </p>
              <Button 
                size="lg" 
                className="bg-[#40C676] hover:bg-[#369b63] text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleCTAClick}
              >
                Start planning my custom build
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-[#40C676]/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#40C676]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rapid Development</h3>
              <p className="text-gray-600 leading-relaxed">
                From concept to deployment in weeks, not months. Our proven methodology 
                accelerates your time to market.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-[#40C676]/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#40C676]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Full-stack engineers, UX designers, and product strategists working 
                together to bring your vision to life.
              </p>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-[#40C676]/10 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-[#40C676]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Your dedicated client portal keeps you connected with progress updates, 
                resources, and direct team access.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-6">
              <img
                src="/lovable-uploads/4f8fc477-a314-468c-89ab-b5fe1571db74.png"
                alt="SnapStack logo"
                className="h-6 w-auto object-contain opacity-80"
              />
            </div>
          </div>
          <p className="text-gray-400">
            © 2024 SnapStack. Building the future, one custom solution at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
