
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import useCalURL from "@/hooks/useCalURL";

const NavItems = () => {
  const { calUrl } = useCalURL();

  const handleScheduleClick = () => {
    if (calUrl !== '#') {
      window.open(calUrl, '_blank');
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleScheduleClick}
        className="text-gray-700 hover:text-[#40C676] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40C676]"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Schedule
      </Button>
      <Link to="/client-portal">
        <Button
          variant="outline"
          className="border-[#40C676] text-[#40C676] hover:bg-[#40C676] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40C676]"
        >
          Client Portal
        </Button>
      </Link>
    </>
  );
};

export default NavItems;
