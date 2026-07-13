import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../icons/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { HeartIcon } from "lucide-react";

interface NavbarProps {
  variant?: "transparent" | "light";
}

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Buy", path: "/buy" },
    { name: "Sell", path: "/sell" },
    { name: "Rent", path: "/rent" },
    { name: "Management", path: "/management" },
    { name: "About", path: "/about" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { favUnite } = useSelector((state: RootState) => state.favUnit);
  const isLight = variant === "light";

  return (
    <>
      <nav
        className={`absolute left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl z-40 transition-all duration-300 backdrop-blur-[2.9px] rounded-[99px] ${
          isLight ? "bg-background  shadow-md" : "bg-[#F5F9FA]/5 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Logo className="h-8 w-auto transition-transform hover:scale-105 duration-200" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm md:text-[16px] font-medium tracking-wide transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-primary after:scale-x-100 font-semibold"
                      : isLight
                      ? "text-[#58696F] hover:text-primary"
                      : "text-text-primary hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Action Items (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Selector */}
            <div
              className={`flex items-center space-x-1 cursor-pointer transition-colors duration-200 ${
                isLight
                  ? "text-[#58696F] hover:text-primary"
                  : "text-text-primary hover:text-primary"
              }`}
            >
              <span className="text-sm font-medium tracking-wide">English</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Favorites (Heart) Icon */}
            <Link to="/favorites" className="relative">
              <HeartIcon className="text-primary" />

              {favUnite.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-700 text-white text-xs flex items-center justify-center">
                  {favUnite.length}
                </span>
              )}
            </Link>

            <Link
              to="/need-help"
              className={`px-5 py-2 border hover:border-primary transition-all duration-300 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm cursor-pointer text-center block ${
                isLight
                  ? "border-[#D9E1E4] text-text-secondary bg-[#F5F9FA] hover:bg-primary hover:text-white"
                  : "border-white/20 text-text-primary bg-white/5 hover:bg-primary"
              }`}
            >
              Need Help
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className={`transition-colors duration-200 focus:outline-none ${
                isLight ? "text-text-secondary hover:text-primary" : "text-text-primary hover:text-primary"
              }`}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm bg-[#0e1617]/95 backdrop-blur-md border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <Logo className="h-7 w-auto" />
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="text-text-primary hover:text-primary transition-colors duration-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={toggleMobileMenu}
                className={({ isActive }) =>
                  `text-lg font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-text-primary hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="space-y-6 border-t border-white/10 pt-6">
          {/* Mobile Language Selector */}
          <div className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors duration-200 cursor-pointer">
            <span className="text-sm font-medium tracking-wide">
              Language: English
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 opacity-80"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Mobile Favorites link */}
          <div className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors duration-200 cursor-pointer">
            <Link to="/favorites" className="relative">
              <HeartIcon />

              {favUnite.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {favUnite.length}
                </span>
              )}
            </Link>
          </div>

          <Link
            to="/need-help"
            onClick={toggleMobileMenu}
            className="w-full py-3 border border-white/20 hover:border-primary text-text-primary bg-white/5 hover:bg-primary transition-all duration-300 rounded-full text-sm font-semibold tracking-wider uppercase text-center shadow-sm block"
          >
            Need Help
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
