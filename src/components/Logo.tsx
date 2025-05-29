
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="inline-flex items-center">
      <img 
        src="/placeholder.svg" 
        alt="SnapStack logo" 
        className="max-h-10"
      />
    </Link>
  );
};

export default Logo;
