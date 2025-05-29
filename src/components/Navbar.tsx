import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';

const Navbar = () => {
  const [calUrl, setCalUrl] = useState('https://cal.com/snapstack/30-min');

  useEffect(() => {
    const fetchCalUrl = async () => {
      try {
        const { data } = await supabase
          .from('site_config')
          .select('cal_url')
          .single();
        if (data?.cal_url) {
          setCalUrl(data.cal_url);
        }
      } catch (err) {
        console.log('Using default calendar URL:', err);
      }
    };

    fetchCalUrl();
  }, []);

  const handleScheduleClick = () => {
    window.open(calUrl, '_blank');
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link to="/login">
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
