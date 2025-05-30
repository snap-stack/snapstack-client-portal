
import { Link } from "react-router-dom";
import { useState } from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img
        src="/lovable-uploads/4f8fc477-a314-468c-89ab-b5fe1571db74.png"
        alt="SnapStack logo"
        className={`
          h-[24px] sm:h-[32px] md:h-[36px] lg:h-[40px]
          w-auto
          max-h-[40px]
          transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
};

export default Logo;
