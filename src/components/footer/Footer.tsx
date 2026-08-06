import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "../icons/Logo";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { label: "TikTok", icon: FaTiktok, href: "#" },
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-[#141414] border-t border-[#EDEFF2]">
      <div className="mx-auto px-6 md:px-[120px] py-[60px] flex flex-col gap-[40px]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between gap-10 md:gap-8 lg:gap-12">
          {/* Logo and Socials Column */}
          <div className="flex flex-col gap-[40px] items-start shrink-0">
            <Link to="/" className="inline-flex items-center justify-start">
              <Logo className="h-[52px] w-auto transition-transform hover:scale-102 duration-200" />
            </Link>

            <div className="flex flex-col gap-[12px] items-start justify-center">
              <p className="font-['Poppins'] font-medium text-[14px] text-[#464646]">
                {t("footer.followUs")}
              </p>
              <div className="flex items-center gap-[16px]">
                {socialLinks.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-[32px] w-[32px] place-items-center rounded-full bg-[#e9f4f7] text-[#5E6870] transition-colors hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-[16px] min-w-[120px]">
            <p className="font-['Poppins'] font-medium text-[16px] text-[#464646]">
              {t("footer.group.navigation")}
            </p>
            <div className="flex flex-col gap-[16px]">
              <Link to="/" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.home")}
              </Link>
              <Link to="/about" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.aboutUs")}
              </Link>
              <Link to="/favorites" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.favourites")}
              </Link>
              <Link to="/" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.search")}
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-[16px] min-w-[120px]">
            <p className="font-['Poppins'] font-medium text-[16px] text-[#464646]">
              {t("footer.group.services")}
            </p>
            <div className="flex flex-col gap-[16px]">
              <Link to="/buy" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.propertySales")}
              </Link>
              <Link to="/sell" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.sellYourProperty")}
              </Link>
              <Link to="/rent" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.specialRentals")}
              </Link>
              <Link to="/management" className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary">
                {t("footer.link.rentalManagement")}
              </Link>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-[16px] min-w-[120px]">
            <p className="font-['Poppins'] font-medium text-[16px] text-[#464646]">
              {t("footer.group.contact")}
            </p>
            <div className="flex flex-col gap-[16px]">
              {/* Email */}
              <div className="flex gap-[8px] items-center text-[#141414]">
                <Mail className="w-[24px] h-[24px] text-[#464646] shrink-0" />
                <span className="font-['Poppins'] font-normal text-[16px]">
                  {t("footer.contact.email")}
                </span>
              </div>
              {/* Phone */}
              <div className="flex gap-[8px] items-center text-[#141414]">
                <Phone className="w-[24px] h-[24px] text-[#464646] shrink-0" />
                <span className="font-['Poppins'] font-normal text-[16px]" dir="ltr">
                  {t("footer.contact.phone")}
                </span>
              </div>
              {/* Location */}
              <div className="flex gap-[8px] items-start text-[#141414] max-w-[220px]">
                <MapPin className="w-[24px] h-[24px] text-[#464646] shrink-0 mt-0.5" />
                <span className="font-['Poppins'] font-normal text-[16px] leading-[1.3]">
                  {t("footer.contact.location")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center font-['Poppins'] font-normal text-[16px] text-[#141414] border-t border-[#EDEFF2] pt-8">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

