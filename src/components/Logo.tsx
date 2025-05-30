
import { Link } from "react-router-dom";
import { useState } from "react";

const Logo = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link to="/" className="inline-flex items-center">
      <img
        src="/lovable-uploads/4f8fc477-a314-468c-89ab-b5fe1571db74.png"
        alt="SnapStack logo"
        className={`h-6 md:h-7 lg:h-8 w-auto object-contain transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
};

export default Logo;
