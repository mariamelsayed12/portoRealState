import primaryImage from "../../assets/HomePage/primaryImage.jpg";
import SearchSection from "../Search/SearchSection";

const HeaderSection = () => {
  return (
    <section className="relative w-full h-[650px] md:h-[750px] lg:h-[800px] rounded-b-[60px] md:rounded-b-[80px] lg:rounded-b-[100px] overflow-visible shadow-xl bg-[#0c1618] z-10">
      {/* Background Image */}
      <img
        src={primaryImage}
        alt="Porto Luxury Coastline"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60 z-10" />

      {/* Content wrapper — centered */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center pt-24 pb-40">
        <div className="max-w-3xl flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md">
            Discover Exceptional <br />
            North Cost Properties
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/95 font-medium tracking-wide mt-6 max-w-xl mx-auto drop-shadow-sm leading-relaxed">
            Exclusive opportunities in Egypt's most prestigious coastal
            destinations
          </p>
        </div>
      </div>

      {/* Floating Search Bar — uses the new SearchSection component */}
<div className="relative -mt-24 z-30 w-[90%] max-w-6xl mx-auto px-4">
    <SearchSection />
      </div>
    </section>
  );
};

export default HeaderSection;
