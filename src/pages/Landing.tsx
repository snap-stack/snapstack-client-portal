
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-[#40C676] w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">SnapStack</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Client Portal
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-[#40C676] text-[#40C676] hover:bg-[#40C676] hover:text-white"
                onClick={() => window.open('https://cal.com/snapstack/30-min', '_blank')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Custom builds that
              <span className="text-[#40C676] block">scale with you</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              From MVP to enterprise. We craft bespoke software solutions that grow with your business, 
              backed by cutting-edge technology and seamless user experiences.
            </p>
            <Button 
              size="lg" 
              className="bg-[#40C676] hover:bg-[#369b63] text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start planning my custom build
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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
            <div className="bg-[#40C676] w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="ml-2 text-xl font-bold">SnapStack</span>
          </div>
          <p className="text-gray-400">
            © 2024 SnapStack. Building the future, one custom solution at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
