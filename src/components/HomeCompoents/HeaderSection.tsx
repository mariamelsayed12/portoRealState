import primaryImage from "../../assets/HomePage/primaryImage.jpg";
import SearchSection from "../Search/SearchSection";

const HeaderSection = () => {
  return (
    <div className="w-full flex flex-col sm:block pb-[16px] sm:pb-0">
      {/* Hero background */}
      <section className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[516px] rounded-b-[50px] md:rounded-b-[70px] lg:rounded-b-[99px] overflow-visible shadow-xl bg-[#0c1618] z-10">
        {/* Background Image */}
        <img
          src={primaryImage}
          alt="Porto Luxury Coastline"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-b-[50px] md:rounded-b-[70px] lg:rounded-b-[99px] z-0 select-none "
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60 z-10 rounded-b-[50px] md:rounded-b-[70px] lg:rounded-b-[99px]" />

        {/* Content wrapper — centered */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center pt-8 sm:pt-24 pb-12 sm:pb-32 md:pb-40">
          <div className="max-w-3xl flex flex-col justify-center">
            <h1 className="text-3xl sm:text-5xl md:text-[64px] lg:text-[64px] font-medium text-white tracking-wide leading-[1.3] drop-shadow-md">
              <span className="block">
                Discover Exceptional
              </span>

              <span className="block mt-2 sm:mt-4">
                North Cost Properties
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-[16px] text-white/95 font-normal tracking-wide mt-4 sm:mt-6 drop-shadow-sm leading-relaxed">
              Exclusive opportunities in Egypt's most prestigious coastal destinations
            </p>
          </div>
        </div>

        {/* Floating Search Bar — desktop / tablet overlap */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-14 z-30 w-[95%] lg:w-[1200px] px-2 sm:px-4">
          <SearchSection />
        </div>
      </section>

      {/* Floating Search Bar — mobile normal flow with spacing below hero */}
      <div className="block sm:hidden w-[95%] mx-auto mt-6 px-2 z-30">
        <SearchSection />
      </div>
    </div>
  );
};

export default HeaderSection;
