import primaryImage from "../../assets/HomePage/primaryImage.jpg";
import SearchSection from "../Search/SearchSection";

const HeaderSection = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]  rounded-b-[50px] md:rounded-b-[70px]     lg:rounded-b-[99px] overflow-visible shadow-xl bg-[#0c1618] z-10">
      {/* Background Image */}
      <img
        src={primaryImage}
        alt="Porto Luxury Coastline"
        className="absolute inset-0 w-full h-full object-cover object-center rounded-b-[50px] md:rounded-b-[70px] lg:rounded-b-[99px] z-0 select-none "
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60 z-10 rounded-b-[50px] md:rounded-b-[70px] lg:rounded-b-[99px]" />

      {/* Content wrapper — centered */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center pt-24 pb-32 md:pb-40">
        <div className="max-w-3xl flex flex-col items-center justify-center">
   <h1 className="text-4xl sm:text-5xl md:text-[64px] lg:text-[64px] font-medium text-white tracking-wide leading-[1.3] drop-shadow-md">
  <span className="block">
    Discover Exceptional
  </span>

  <span className="block mt-4">
    North Cost Properties
  </span>
</h1>
          <p className="text-sm  md:text-[16px] text-white/95 font-normal tracking-wide mt-6 drop-shadow-sm leading-relaxed">
            Exclusive opportunities in Egypt's most prestigious coastal
            destinations
          </p>
        </div>
      </div>

      {/* Floating Search Bar — uses the new SearchSection component */}
<div className="relative -mt-20 sm:-mt-24 z-30  w-[95%]  lg:w-[1200px]  mx-auto px-2 sm:px-4">
    <SearchSection />
      </div>
    </section>
  );
};

export default HeaderSection;
