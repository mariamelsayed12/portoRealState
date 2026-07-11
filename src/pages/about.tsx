import aboutImage from "../assets/aboutpage.jpg";
import HomeIconInAbout from "../components/icons/homeiconeinabout";
import BackgroundShapeInAbout from "../components/icons/backgroundfInAbout";
import ChatIcon from "../components/icons/ChatIcon";

const AboutPage = () => {
  const heroCards = [
    { label: "North Coast", highlight: "Specialists" },
    { label: "Verified", highlight: "Listings" },
    { label: "Personal", highlight: "Advisory" },
    { label: "End-to-End", highlight: "Services" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* About Hero Section */}
      <section className="relative w-full h-[460px] md:h-[500px] lg:h-[540px] rounded-b-[48px] md:rounded-b-[72px] lg:rounded-b-[80px] overflow-hidden bg-[#0c1618] z-10">
        <img
          src={aboutImage}
          alt="Luxury Resort Deck"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center items-center text-center pt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-md">
              In Porto We Offer Exceptional Opportunities
              <br className="hidden sm:inline" /> Across North Coast
            </h1>
          </div>

          {/* Glassmorphic Row Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mt-12 sm:mt-16">
            {heroCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-5 rounded-2xl text-left text-white select-none shadow-lg hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-xs sm:text-sm font-normal text-white/80 leading-tight">
                  {card.label}
                </div>
                <div className="text-sm sm:text-base font-semibold mt-1 leading-tight">
                  {card.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Partner & Content Section */}
      <section className="py-20 sm:py-28 lg:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
          
          {/* Left Icon */}
          <div className="flex justify-center items-center shrink-0 w-32 sm:w-40 lg:w-48">
            <HomeIconInAbout className="hidden md:block h-auto text-primary/30" />
          </div>

          {/* Center Capsule Graphics */}
          <div className="relative py-8 flex justify-center items-center">
            {/* The Central Rounded Capsule using Custom SVG */}
            <div className="relative flex items-center justify-center min-w-[280px] sm:min-w-[340px] md:min-w-[420px] min-h-[140px] md:min-h-[180px]">
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <BackgroundShapeInAbout className="w-full h-full drop-shadow-sm text-light-gray" color="currentColor" />
              </div>
              <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold text-text-secondary text-center tracking-tight leading-tight select-none">
                Your Investment
                <br /> Partner
              </h2>

              {/* Absolute positioned floating badges */}
              
              {/* Top Left: Property Sales */}
              <div className="bg-light-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E8EFF1] shadow-[0_6px_20px_rgba(73,95,104,0.06)] text-[11px] sm:text-xs md:text-sm font-semibold text-text-darker hover:shadow-md transition-shadow select-none whitespace-nowrap absolute -top-4 left-2 sm:-top-5 sm:left-4 md:-top-6 md:left-12">
                Property Sales
              </div>

              {/* Top Right: Resale */}
              <div className="bg-light-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E8EFF1] shadow-[0_6px_20px_rgba(73,95,104,0.06)] text-[11px] sm:text-xs md:text-sm font-semibold text-text-darker hover:shadow-md transition-shadow select-none whitespace-nowrap absolute -top-4 right-2 sm:-top-5 sm:right-6 md:-top-6 md:right-16">
                Resale
              </div>

              {/* Bottom Left: Rent */}
              <div className="bg-light-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E8EFF1] shadow-[0_6px_20px_rgba(73,95,104,0.06)] text-[11px] sm:text-xs md:text-sm font-semibold text-text-darker hover:shadow-md transition-shadow select-none whitespace-nowrap absolute -bottom-4 left-6 sm:-bottom-5 sm:left-10 md:-bottom-6 md:left-20">
                Rent
              </div>

              {/* Bottom Right: Management */}
              <div className="bg-light-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#E8EFF1] shadow-[0_6px_20px_rgba(73,95,104,0.06)] text-[11px] sm:text-xs md:text-sm font-semibold text-text-darker hover:shadow-md transition-shadow select-none whitespace-nowrap absolute -bottom-4 right-2 sm:-bottom-5 sm:right-4 md:-bottom-6 md:right-12">
                Management
              </div>
            </div>
          </div>

          {/* Right Icon */}
          <div className="flex justify-center items-center shrink-0 w-32 sm:w-40 lg:w-48">
            <ChatIcon className="hidden md:block   h-auto text-primary/30" />
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;