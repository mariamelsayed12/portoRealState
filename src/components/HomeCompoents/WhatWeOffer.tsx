import { offerItems } from "../../data";
import { FaWhatsapp } from "react-icons/fa";


const WhatWeOffer = () => {
  return (
  <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 ">
      {/* Header section with floating WhatsApp */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-[40px] font-semibold text-gray-900 tracking-tight">
          What We Offer ?
        </h2>
        
        {/* WhatsApp Float Icon */}
        <a
          href="https://wa.me/#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md hover:bg-[#20ba59] transition-all duration-300 hover:scale-110"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="text-background w-5 h-5"/>
        </a>
      </div>

      {/* Grid container for 4 offer cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {offerItems.map((item, index) => (
          <div
            key={index}
            className="group relative bg-[#F5F9FA]/40 hover:bg-white rounded-3xl border border-border hover:border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col pt-16 pb-8 px-6 text-center"
          >
            {/* Top arched decoration with icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2  w-32 h-16 bg-[#B9DBE5] border-b-0 overflow-hidden flex  justify-center items-center rounded-b-full">
<div className="w-[220px] h-[110px] bg-primary/10 rounded-t-full flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                {item.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide group-hover:text-primary transition-colors duration-200">
              {item.title}
            </h3>
            
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-grow">
              {item.description}
            </p>

            {/* Reusable Action link */}
            <a
              href="#"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <span>Learn More</span>
              <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                ↗
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeOffer;
