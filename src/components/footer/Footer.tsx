import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import Logo from "../icons/Logo";

type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; to: string }>;
};

const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Favourites", to: "/favorites" },
      { label: "Search", to: "/" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Property sales", to: "/buy" },
      { label: "Sell your property", to: "/sell" },
      { label: "Special Rentals", to: "/rent" },
      { label: "Rental management", to: "/management" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Favourites", to: "/" },
      { label: "Search", to: "/" },
    ],
  },
];

const socialLinks = [
  { label: "TikTok", icon: FaTiktok, href: "#" },
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-white text-text-darker">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 md:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] md:gap-8 lg:gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center justify-start">
              <Logo className="h-9 w-auto" />
            </Link>

            <div className="space-y-3">
              <p className="text-[13px] font-medium text-text-darker">Follow us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-7 w-7 place-items-center rounded-full border border-border bg-[#F5F9FA] text-[#5E6870] transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-[13px] font-medium text-text-darker">{group.title}</p>
              <div className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-[13px] font-normal text-[#464646] transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[13px] font-normal text-[#464646]">
          © Copyright 2026 - Porto
        </div>
      </div>
    </footer>
  );
};

export default Footer;