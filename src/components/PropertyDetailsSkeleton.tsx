import UnitCardSkeleton from "./UnitCardSkeleton";

export const PropertyDetailsSkeleton = () => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background animate-pulse lg:pt-36 pt-24 md:pt-36 pb-0">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full flex-1">
        {/* Breadcrumb Navigation placeholder */}
        <div className="mb-6 w-48 h-5 bg-[#E8EFF1] rounded-md"></div>

        {/* Gallery Section Skeleton */}
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[24px] items-start w-full">
          {/* Main Large Hero Image placeholder */}
          <div className="w-full lg:flex-1 h-[240px] sm:h-[350px] lg:h-[456px] rounded-[12px] bg-[#E8EFF1] shrink-0 lg:shrink"></div>

          {/* Vertical Thumbnail Sidebar placeholder */}
          <div className="w-full lg:w-[78px] flex flex-row lg:flex-col gap-[8px] items-center justify-center shrink-0">
            <div className="w-[36px] h-[36px] bg-[#E8EFF1] rounded-[12px]"></div>
            <div className="flex flex-row lg:flex-col gap-[8px]">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-[44px] w-[58px] lg:h-[52px] lg:w-[78px] rounded-[4px] bg-[#E8EFF1]"></div>
              ))}
            </div>
            <div className="w-[36px] h-[36px] bg-[#E8EFF1] rounded-[12px]"></div>
          </div>
        </div>

        {/* Content Details Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start w-full">
          {/* Left Block: Description and Specs Grid */}
          <div className="lg:col-span-7 flex flex-col gap-[24px] w-full">
            {/* Location and Title Block placeholder */}
            <div className="flex flex-col gap-[12px]">
              <div className="w-32 h-4 bg-[#E8EFF1] rounded-md"></div>
              <div className="w-[70%] h-7 bg-[#E8EFF1] rounded-md"></div>
            </div>

            {/* Description placeholder */}
            <div className="flex flex-col gap-2 mt-2 w-full">
              <div className="w-[95%] h-4 bg-[#E8EFF1] rounded-md"></div>
              <div className="w-[90%] h-4 bg-[#E8EFF1] rounded-md"></div>
              <div className="w-[80%] h-4 bg-[#E8EFF1] rounded-md"></div>
              <div className="w-[50%] h-4 bg-[#E8EFF1] rounded-md"></div>
            </div>

            {/* Specs Grid Placeholder */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[16px] w-full mt-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-[#d4d5d8]/60 rounded-[12px] px-[16px] py-[8px] flex flex-col gap-[8px] items-start justify-center min-h-[76px]">
                  <div className="w-16 h-4 bg-[#E8EFF1] rounded-md"></div>
                  <div className="w-24 h-4 bg-[#E8EFF1] rounded-md"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Pricing Actions Widget Placeholder */}
          <div className="lg:col-span-5 bg-white border border-[#EDEFF2] rounded-[12px] p-[16px] shadow-[0px_2px_6.3px_1px_rgba(0,0,0,0.14)] lg:top-36 flex flex-col gap-[40px] w-full">
            <div className="flex flex-col gap-[32px] w-full">
              {/* Header switcher row placeholder */}
              <div className="flex items-center justify-between w-full">
                <div className="w-20 h-5 bg-[#E8EFF1] rounded-md"></div>
                <div className="w-32 h-8 bg-[#E8EFF1] rounded-[12px]"></div>
              </div>

              {/* Pricing Display box placeholder */}
              <div className="bg-[#f5f9fa] border border-[#d4d5d8]/60 rounded-[12px] p-[12px] flex justify-between items-center w-full min-h-[96px]">
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-12 h-4 bg-[#E8EFF1] rounded-md"></div>
                  <div className="w-20 h-5 bg-[#E8EFF1] rounded-md"></div>
                </div>
                <div className="w-[1px] h-[40px] bg-[#d4d5d8]/60"></div>
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-16 h-4 bg-[#E8EFF1] rounded-md"></div>
                  <div className="w-24 h-5 bg-[#E8EFF1] rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Call Actions Row placeholder */}
            <div className="flex gap-[15px] items-center w-full">
              <div className="flex-1 h-[48px] rounded-[12px] bg-[#E8EFF1]"></div>
              <div className="flex-1 h-[48px] rounded-[12px] bg-[#E8EFF1]"></div>
            </div>
          </div>
        </div>

        {/* Amenities Section Placeholder */}
        <div className="py-12 w-full flex flex-col gap-6">
          <div className="w-[20%] h-8 bg-[#E8EFF1] rounded-md"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white border border-[#EDEFF2] rounded-[12px] p-4 flex flex-col items-center justify-center gap-4 min-h-[120px]">
                <div className="w-8 h-8 rounded-full bg-[#E8EFF1]"></div>
                <div className="w-16 h-4 bg-[#E8EFF1] rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Properties Carousel/Grid Section Placeholder */}
      <div className="w-full bg-[#E9F4F7] py-[60px] mt-16 sm:mt-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="w-48 h-8 bg-[#E8EFF1] rounded-md"></div>
            <div className="flex gap-2">
              <div className="w-[40px] h-[40px] bg-[#E8EFF1] rounded-[12px]"></div>
              <div className="w-[40px] h-[40px] bg-[#E8EFF1] rounded-[12px]"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {Array.from({ length: 4 }).map((_, idx) => (
              <UnitCardSkeleton key={idx} className="w-full bg-white" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;
