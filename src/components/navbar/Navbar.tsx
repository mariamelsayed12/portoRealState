import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../icons/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { HeartIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  variant?: "transparent" | "light";
}

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
    setOpen(false);
    setMobileLangOpen(false);
  };

  useEffect(() => {
    if (!open && !mobileLangOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest(".lang-selector-container")) {
        setOpen(false);
      }
      if (mobileLangOpen && !target.closest(".mobile-lang-selector-container")) {
        setMobileLangOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open, mobileLangOpen]);

  const navLinks = [
    { name: "Buy", path: "/buy", key: "navbar.buy" },
    { name: "Sell", path: "/sell", key: "navbar.sell" },
    { name: "Rent", path: "/rent", key: "navbar.rent" },
    { name: "Management", path: "/management", key: "navbar.management" },
    { name: "About", path: "/about", key: "navbar.about" },
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
          isLight
            ? "bg-[#f5f9fa] shadow-[0px_2px_6.3px_1px_rgba(0,0,0,0.14)]"
            : "bg-[rgba(245,249,250,0.05)]"
        }`}
      >
        <div className="w-full px-6 md:px-[32px] py-4 md:py-[22px] flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-[24px]">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse flex-shrink-0">
              <Logo className="h-[36px] w-[180px] transition-transform hover:scale-102 duration-200" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-[24px] rtl:space-x-reverse">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[16px] font-medium font-['Poppins'] tracking-wide transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                      isActive
                        ? "text-primary after:scale-x-100 font-semibold"
                        : isLight
                        ? "text-[#141414] hover:text-primary"
                        : "text-[#f5f9fa] hover:text-primary"
                    }`
                  }
                >
                  {t(link.key)}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Action Items (Desktop) */}
          <div className="hidden lg:flex items-center space-x-[20px] rtl:space-x-reverse">
            {/* Language Selector */}
            <div className="relative lang-selector-container">
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-[6px] cursor-pointer transition-colors duration-200 focus:outline-none text-[16px] font-normal font-['Poppins'] ${
                  isLight
                    ? "text-[#141414] hover:text-primary"
                    : "text-[#f5f9fa] hover:text-primary"
                }`}
              >
                <span>
                  {i18n.language === "ar" ? "العربية" : "English"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-4 h-4 opacity-80 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {open && (
                <div
                  className={`absolute ${
                    i18n.language === "ar" ? "left-0" : "right-0"
                  } mt-2 w-32 rounded-xl border shadow-xl overflow-hidden z-50 transition-all duration-200 ${
                    isLight
                      ? "bg-white border-[#D9E1E4] text-[#58696F]"
                      : "bg-[#0e1617]/95 backdrop-blur-md border-white/10 text-text-primary"
                  }`}
                >
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`w-full px-4 py-2.5 text-start text-sm transition-colors duration-200 ${
                      i18n.language === "en"
                        ? isLight
                          ? "bg-[#F5F9FA] text-primary font-semibold"
                          : "bg-white/10 text-primary font-semibold"
                        : isLight
                        ? "hover:bg-gray-50 hover:text-primary"
                        : "hover:bg-white/5 hover:text-primary"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("ar")}
                    className={`w-full px-4 py-2.5 text-start text-sm transition-colors duration-200 ${
                      i18n.language === "ar"
                        ? isLight
                          ? "bg-[#F5F9FA] text-primary font-semibold"
                          : "bg-white/10 text-primary font-semibold"
                        : isLight
                        ? "hover:bg-gray-50 hover:text-primary"
                        : "hover:bg-white/5 hover:text-primary"
                    }`}
                  >
                    العربية
                  </button>
                </div>
              )}
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
              className={`h-[36px] flex items-center justify-center px-[16px] rounded-[12px] text-[16px] font-['Poppins'] font-medium transition-all duration-300 border border-solid cursor-pointer text-center block ${
                isLight
                  ? "border-[#747474] text-primary hover:bg-primary/5 hover:border-primary"
                  : "border-[#f5f9fa] text-[#f5f9fa] hover:bg-white/10"
              }`}
            >
              {t("navbar.needHelp")}
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className={`transition-colors duration-200 focus:outline-none ${
                isLight ? "text-[#141414] hover:text-primary" : "text-[#f5f9fa] hover:text-primary"
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
                {t(link.key)}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="space-y-6 border-t border-white/10 pt-6">
          {/* Mobile Language Selector */}
          <div className="relative mobile-lang-selector-container">
            <button
              onClick={() => setMobileLangOpen(!mobileLangOpen)}
              className="flex items-center space-x-2 rtl:space-x-reverse text-text-primary hover:text-primary transition-colors duration-200 cursor-pointer focus:outline-none w-full"
            >
              <span className="text-sm font-medium tracking-wide">
                {i18n.language === "ar" ? "اللغة: العربية" : "Language: English"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 opacity-80 transition-transform duration-200 ${
                  mobileLangOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {mobileLangOpen && (
              <div
                className={`absolute bottom-full ${
                  i18n.language === "ar" ? "left-0" : "right-0"
                } mb-2 w-32 rounded-xl bg-[#0e1617] border border-white/10 shadow-2xl overflow-hidden z-50`}
              >
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setMobileLangOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-start text-sm transition-colors duration-200 text-text-primary ${
                    i18n.language === "en"
                      ? "bg-white/10 text-primary font-semibold"
                      : "hover:bg-white/5 hover:text-primary"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    changeLanguage("ar");
                    setMobileLangOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-start text-sm transition-colors duration-200 text-text-primary ${
                    i18n.language === "ar"
                      ? "bg-white/10 text-primary font-semibold"
                      : "hover:bg-white/5 hover:text-primary"
                  }`}
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          {/* Mobile Favorites link */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-text-primary hover:text-primary transition-colors duration-200 cursor-pointer">
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
            className="w-full py-3 border border-white/20 hover:border-primary text-text-primary bg-white/5 hover:bg-primary transition-all duration-300 rounded-md text-sm font-semibold tracking-wider uppercase text-center shadow-sm block"
          >
            {t("navbar.needHelp")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
