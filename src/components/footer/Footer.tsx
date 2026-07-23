import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import Logo from "../icons/Logo";
import { useTranslation } from "react-i18next";

type FooterLinkGroup = {
  titleKey: string;
  links: Array<{ labelKey: string; to: string }>;
};

const footerLinkGroups: FooterLinkGroup[] = [
  {
    titleKey: "footer.group.navigation",
    links: [
      { labelKey: "footer.link.home", to: "/" },
      { labelKey: "footer.link.aboutUs", to: "/about" },
      { labelKey: "footer.link.favourites", to: "/favorites" },
      { labelKey: "footer.link.search", to: "/" },
    ],
  },
  {
    titleKey: "footer.group.services",
    links: [
      { labelKey: "footer.link.propertySales", to: "/buy" },
      { labelKey: "footer.link.sellYourProperty", to: "/sell" },
      { labelKey: "footer.link.specialRentals", to: "/rent" },
      { labelKey: "footer.link.rentalManagement", to: "/management" },
    ],
  },
  {
    titleKey: "footer.group.navigation",
    links: [
      { labelKey: "footer.link.home", to: "/" },
      { labelKey: "footer.link.aboutUs", to: "/about" },
      { labelKey: "footer.link.favourites", to: "/" },
      { labelKey: "footer.link.search", to: "/" },
    ],
  },
];

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

          {/* Links Columns */}
          {footerLinkGroups.map((group, groupIdx) => (
            <div key={`${group.titleKey}-${groupIdx}`} className="flex flex-col gap-[16px] min-w-[120px]">
              <p className="font-['Poppins'] font-medium text-[16px] text-[#464646]">
                {t(group.titleKey)}
              </p>
              <div className="flex flex-col gap-[16px]">
                {group.links.map((link) => (
                  <Link
                    key={link.labelKey}
                    to={link.to}
                    className="font-['Poppins'] font-normal text-[16px] text-[#141414] transition-colors hover:text-primary"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
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