import aboutImage from "../assets/aboutpage.jpg";
import HomeIcon from "../components/icons/homeiconeinabout";
import ChatIcon from "../components/icons/ChatIcon";
import BackgroundShapeInAbout from "../components/icons/backgroundfInAbout";
import { useTranslation } from "react-i18next";

interface CardProps {
  label: string;
  highlight: string;
}

const WhatWeOfferCard = ({ label, highlight }: CardProps) => {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-[2.9px] rounded-[12px] p-[8px] h-[74px] w-full max-w-[181px] flex flex-col justify-center shrink-0">
      <div className="w-[134px] mx-auto text-left flex flex-col justify-center">
        <p className="font-['Poppins'] font-medium text-[19px] leading-[20px] text-[#EDEFF2] select-none">
          {label}
        </p>
        <p className="font-['Poppins'] font-normal text-[16px] leading-[18px] text-[#D4D5D8] select-none mt-[4px]">
          {highlight}
        </p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  const heroCards = [
    { label: t("about.hero.cards.northCoast.label"), highlight: t("about.hero.cards.northCoast.highlight") },
    { label: t("about.hero.cards.verified.label"), highlight: t("about.hero.cards.verified.highlight") },
    { label: t("about.hero.cards.personal.label"), highlight: t("about.hero.cards.personal.highlight") },
    { label: t("about.hero.cards.services.label"), highlight: t("about.hero.cards.services.highlight") },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section className="relative w-full h-[460px] sm:h-[480px] lg:h-[483px] rounded-b-[48px] sm:rounded-b-[72px] lg:rounded-b-[99px] overflow-hidden bg-[#0c1618] z-10">
        <img
          src={aboutImage}
          alt={t("about.hero.imageAlt")}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none"
        />
        <div className="absolute inset-0 bg-black/45 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-16">
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#EDEFF2] font-['Poppins'] tracking-tight leading-normal sm:leading-normal lg:leading-normal max-w-[794px]">
            {t("about.hero.title")}
          </h1>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[796px] mt-12 justify-items-center">
            {heroCards.map((card, idx) => (
              <WhatWeOfferCard key={idx} label={card.label} highlight={card.highlight} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Investment Partner Section ───────────────────────── */}
      <section className="bg-[#f5f9fa] w-full py-20 flex justify-center items-center overflow-hidden">
        {/* Desktop View (>= 1280px) */}
        <div className="relative w-[1440px] h-[331px] shrink-0 xl:block hidden">
          {/* Left Flag Icon */}
          <div className="absolute left-[278px] top-[135px] w-[124px] h-[124px] text-[#B9DBE5]">
            <HomeIcon size={124} color="#B9DBE5" />
          </div>

          {/* Center Container */}
          <div className="absolute left-[477px] top-[60px] w-[486px] h-[211px]">
            {/* Subtract Background SVG */}
            <BackgroundShapeInAbout
              width={486}
              height={211}
              color="#EDEFF2"
              className="absolute top-0 left-0"
            />

            {/* Centered Heading */}
            <h2 className="absolute left-[58px] top-[53px] w-[370px] h-[120px] font-['Poppins'] font-medium text-[40px] leading-[44px] text-[#141414] text-center flex items-center justify-center">
              {t("about.partner.title")}
            </h2>

            {/* Top-Left Pill */}
            <div className="absolute left-0 top-0 w-[161px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                {t("about.partner.sales")}
              </span>
            </div>

            {/* Top-Right Pill */}
            <div className="absolute left-[325px] top-0 w-[88px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                {t("about.partner.resale")}
              </span>
            </div>

            {/* Bottom-Left Pill */}
            <div className="absolute left-[93px] top-[158px] w-[68px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                {t("about.partner.rent")}
              </span>
            </div>

            {/* Bottom-Right Pill */}
            <div className="absolute left-[325px] top-[158px] w-[155px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                {t("about.partner.management")}
              </span>
            </div>
          </div>

          {/* Right Chat Icon */}
          <div className="absolute left-[1038px] top-[60px] w-[124px] h-[124px] text-[#B9DBE5]">
            <ChatIcon size={124} color="#B9DBE5" />
          </div>
        </div>

        {/* Responsive View (< 1280px) */}
        <div className="w-full flex items-center justify-center gap-8 md:gap-12 xl:hidden  py-6">
          {/* Decorative Left Flag Icon (hidden on mobile, visible on tablet) */}
          <div className="hidden md:block text-[#B9DBE5] shrink-0">
            <HomeIcon size={100} color="#B9DBE5" />
          </div>

          {/* Group 5 Container */}
          <div className="relative w-[339px] h-[211px] shrink-0 select-none">
            {/* Subtract shape */}
            <BackgroundShapeInAbout
              width={339}
              height={211}
              color="#EDEFF2"
              className="absolute top-0 left-0"
            />

            {/* Text */}
            <h2 className="absolute left-[40.46px] top-[64px] w-[258.08px] h-[84px] font-['Poppins'] font-semibold text-[28px] leading-[32px] text-[#141414] text-center flex items-center justify-center">
              {t("about.partner.title")}
            </h2>

            {/* Top-Left Pill */}
            <div className="absolute left-0 top-0 w-[112.3px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[14px] text-[#141414]">
                {t("about.partner.sales")}
              </span>
            </div>

            {/* Top-Right Pill */}
            <div className="absolute left-[226.7px] top-0 w-[61.4px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[14px] text-[#141414]">
                {t("about.partner.resale")}
              </span>
            </div>

            {/* Bottom-Left Pill */}
            <div className="absolute left-[64.9px] top-[158px] w-[47.4px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[14px] text-[#141414]">
                {t("about.partner.rent")}
              </span>
            </div>

            {/* Bottom-Right Pill */}
            <div className="absolute left-[226.7px] top-[158px] w-[108.1px] h-[53px] bg-[#E9F4F7] rounded-[44px] flex items-center justify-center shadow-sm select-none">
              <span className="font-['Poppins'] font-medium text-[14px] text-[#141414]">
                {t("about.partner.management")}
              </span>
            </div>
          </div>

          {/* Decorative Right Chat Icon (hidden on mobile, visible on tablet) */}
          <div className="hidden md:block text-[#B9DBE5] shrink-0">
            <ChatIcon size={100} color="#B9DBE5" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
