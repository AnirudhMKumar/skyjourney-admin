
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
            <div className="absolute w-6 h-6 bg-white rounded-full animate-pulse-soft"></div>
            <div className="relative z-10 text-white font-bold">SJ</div>
          </div>
          <span className="text-xl font-semibold text-gray-900">SkyJourney</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-sky-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/flights"
            className="text-gray-700 hover:text-sky-600 transition-colors"
          >
            Flights
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-700 hover:text-sky-600 transition-colors">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 glass rounded-lg p-2 shadow-lg">
              <Link
                to="/services/baggage"
                className="block px-4 py-2 text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Baggage Information
              </Link>
              <Link
                to="/services/special"
                className="block px-4 py-2 text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Special Assistance
              </Link>
              <Link
                to="/services/meals"
                className="block px-4 py-2 text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                In-flight Meals
              </Link>
            </div>
          </div>
          <Link
            to="/about"
            className="text-gray-700 hover:text-sky-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-sky-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            <span>Log In</span>
          </Link>
          <Link
            to="/signup"
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className="text-lg text-gray-800 py-3 border-b border-gray-100"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/flights"
            className="text-lg text-gray-800 py-3 border-b border-gray-100"
            onClick={toggleMobileMenu}
          >
            Flights
          </Link>
          <button className="text-lg text-gray-800 py-3 border-b border-gray-100 text-left flex justify-between items-center">
            Services <ChevronDown className="w-5 h-5" />
          </button>
          <div className="pl-4 flex flex-col gap-2 mb-2">
            <Link
              to="/services/baggage"
              className="text-gray-600 py-2"
              onClick={toggleMobileMenu}
            >
              Baggage Information
            </Link>
            <Link
              to="/services/special"
              className="text-gray-600 py-2"
              onClick={toggleMobileMenu}
            >
              Special Assistance
            </Link>
            <Link
              to="/services/meals"
              className="text-gray-600 py-2"
              onClick={toggleMobileMenu}
            >
              In-flight Meals
            </Link>
          </div>
          <Link
            to="/about"
            className="text-lg text-gray-800 py-3 border-b border-gray-100"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg text-gray-800 py-3 border-b border-gray-100"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sky-600 border border-sky-600 px-6 py-3 rounded-full"
              onClick={toggleMobileMenu}
            >
              <LogIn className="w-5 h-5" />
              <span>Log In</span>
            </Link>
            <Link
              to="/signup"
              className="bg-sky-500 text-white px-6 py-3 rounded-full text-center"
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
