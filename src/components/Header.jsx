import { Link } from "react-router-dom";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <div>
          <Link
            to="/"
            className="text-gray-800 hover:text-red-600 font-semibold text-lg"
          >
            홈
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </div>
      </div>
    </header>
  );
};

export default Header;
