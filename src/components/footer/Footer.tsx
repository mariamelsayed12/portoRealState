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
    <footer className="bg-white text-text-darker">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 md:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] md:gap-8 lg:gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center justify-start">
              <Logo className="h-9 w-auto" />
            </Link>

            <div className="space-y-3">
              <p className="text-[13px] font-medium text-text-darker">{t("footer.followUs")}</p>
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

          {footerLinkGroups.map((group, groupIdx) => (
            <div key={`${group.titleKey}-${groupIdx}`} className="space-y-4">
              <p className="text-[13px] font-medium text-text-darker">{t(group.titleKey)}</p>
              <div className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.labelKey}
                    to={link.to}
                    className="text-[13px] font-normal text-[#464646] transition-colors hover:text-primary"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[13px] font-normal text-[#464646]">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;