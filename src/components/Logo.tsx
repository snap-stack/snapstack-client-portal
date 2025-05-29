import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/" className="inline-flex items-center">
    <img
      src="/lovable-uploads/4f8fc477-a314-468c-89ab-b5fe1571db74.png"
      alt="SnapStack logo"
      className="h-32 w-auto sm:h-42 md:h-46 object-contain"
    />
  </Link>
);

export default Logo;
