import { Link } from "react-router-dom";
import { useState } from "react";

interface LogoProps {
  /** Extra classes for the outer <Link> wrapper */
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img
        src="/lovable-uploads/4f8fc477-a314-468c-89ab-b5fe1571db74.png"
        alt="SnapStack logo"
        onLoad={() => setLoaded(true)}
        className={`
          /* 📐 SUPER-SIZED responsive heights */
          h-[48px]          /* phones */
          sm:h-[64px]       /* ≥640 px */
          md:h-[80px]       /* ≥768 px */
          lg:h-[96px]       /* ≥1024 px */
          xl:h-[112px]      /* ≥1280 px */
          
          w-auto            /* preserve aspect ratio */
          max-h-[112px]     /* absolute ceiling */
          transition-opacity duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </Link>
  );
};

export default Logo;
