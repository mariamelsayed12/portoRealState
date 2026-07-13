import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { offerItems } from "../../data";

const WhatWeOffer = () => {
  return (
    <section className="bg-[#f5f9fa] w-full px-6 sm:px-12 lg:px-[120px] py-[60px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[24px] items-start w-full">
        {/* Section Heading */}
        <h2 className="text-[28px] sm:text-[40px] font-medium text-[#141414] font-['Poppins'] leading-[normal]">
          What We Offer ?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-[24px] w-full">
          {offerItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group border border-[#d4d5d8] bg-white rounded-[12px] flex flex-col gap-[24px] items-center pb-[16px] px-[16px] w-full sm:w-[282px] shrink-0 transition-all duration-300 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] hover:border-[#1e8cab]/30 cursor-pointer"
            >
              {/* Top Arched Decoration with Icon */}
              <div className="bg-[#b9dbe5] h-[84px] overflow-clip relative rounded-bl-[99px] rounded-br-[99px] flex items-center justify-center shrink-0 w-[174px]">
                <div className="size-[40px] flex items-center justify-center [&>img]:size-full">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-[16px] items-center text-center w-full flex-1">
                <h3 className="text-[19px] font-medium text-[#141414] font-['Poppins'] leading-[normal] group-hover:text-[#1e8cab] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[16px] font-normal text-[#464646] font-['Poppins'] leading-[normal] min-h-[72px]">
                  {item.description}
                </p>
              </div>

              {/* Learn More Button */}
              <div className="inline-flex items-center gap-[8px] h-[36px] px-[8px] py-[8px] rounded-[12px] text-[16px] font-medium text-[#0d3b48] font-['Poppins'] leading-[normal] group-hover:text-[#1e8cab] transition-colors duration-200 shrink-0">
                <span>Learn More</span>
                <ArrowUpRight className="size-[16px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
