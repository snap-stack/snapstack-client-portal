
import { Link } from 'react-router-dom';
import { Calendar, Menu } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import useCalURL from '@/hooks/useCalURL';
import { useScrolled } from '@/hooks/useScrolled';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { calUrl } = useCalURL();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const handleScheduleClick = () => {
    if (calUrl !== '#') {
      window.open(calUrl, '_blank');
    }
  };

  const NavItems = () => (
    <>
      <Link to="/client-portal">
        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
          Client Portal
        </Button>
      </Link>
      <Button
        variant="outline"
        className="border-[#40C676] text-[#40C676] hover:bg-[#40C676] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40C676]"
        onClick={handleScheduleClick}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Schedule
      </Button>
    </>
  );

  return (
    <nav className={`border-b border-slate-100 fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'shadow-sm bg-white/80 backdrop-blur-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-2">
          <Logo />
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <NavItems />
            </div>
          )}
          
          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
