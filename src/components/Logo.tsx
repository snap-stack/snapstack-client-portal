
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="inline-flex items-center">
      <img 
        src="/lovable-uploads/4f8fc477-a314-468c-89ab-b5fe1571db74.png" 
        alt="SnapStack logo" 
        className="max-h-10"
      />
    </Link>
  );
};

export default Logo;
