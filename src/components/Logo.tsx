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
          /* ⬇️ responsive heights */
          h-[32px]          /*  mobile  */
          sm:h-[40px]       /* ≥ 640 px */
          md:h-[48px]       /* ≥ 768 px */
          lg:h-[56px]       /* ≥ 1024 px */
          xl:h-[64px]       /* ≥ 1280 px */
          
          w-auto            /* keep aspect ratio */
          max-h-[64px]      /* absolute ceiling */
          transition-opacity duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </Link>
  );
};

export default Logo;
