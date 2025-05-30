
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
          /* 📐 SUPER-SIZED responsive heights - 2x larger */
          h-[96px]          /* phones - was 48px */
          sm:h-[128px]      /* ≥640 px - was 64px */
          md:h-[160px]      /* ≥768 px - was 80px */
          lg:h-[192px]      /* ≥1024 px - was 96px */
          xl:h-[224px]      /* ≥1280 px - was 112px */
          
          w-auto            /* preserve aspect ratio */
          max-h-[224px]     /* absolute ceiling - was 112px */
          transition-opacity duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </Link>
  );
};

export default Logo;
