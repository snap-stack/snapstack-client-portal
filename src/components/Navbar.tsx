
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui/button';
import useCalURL from '@/hooks/useCalURL';
import { useScrolled } from '@/hooks/useScrolled';

const Navbar = () => {
  const { calUrl } = useCalURL();
  const scrolled = useScrolled();

  const handleScheduleClick = () => {
    if (calUrl !== '#') {
      window.open(calUrl, '_blank');
    }
  };

  return (
    <nav className={`border-b border-slate-100 fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link to="/client-portal">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Client Portal
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-[#40C676] text-[#40C676] hover:bg-[#40C676] hover:text-white"
              onClick={handleScheduleClick}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
