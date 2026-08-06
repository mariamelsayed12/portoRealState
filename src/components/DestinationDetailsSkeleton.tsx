import UnitCardSkeleton from "./UnitCardSkeleton";

export const DestinationDetailsSkeleton = () => {
  return (
    <div className="w-full flex flex-col min-h-screen animate-pulse bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-auto min-h-[440px] sm:min-h-[460px] lg:h-[450px] flex items-end justify-center rounded-bl-[30px] rounded-br-[30px] sm:rounded-bl-[60px] sm:rounded-br-[60px] lg:rounded-bl-[99px] lg:rounded-br-[99px] overflow-hidden bg-[#E8EFF1]">
        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[120px] pt-[120px] pb-[48px] lg:h-full flex flex-col justify-end">
          {/* Breadcrumbs */}
          <div className="mb-[24px] w-32 h-5 bg-white/20 rounded-md"></div>

          <div className="flex flex-col gap-[24px] items-start w-full">
            {/* Title */}
            <div className="w-[40%] sm:w-[25%] h-10 bg-white/30 rounded-md"></div>
            
            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div className="w-28 h-6 bg-white/20 rounded-md"></div>
              <div className="w-1 h-[24px] bg-white/10 hidden sm:block"></div>
              <div className="w-28 h-6 bg-white/20 rounded-md"></div>
              <div className="w-1 h-[24px] bg-white/10 hidden sm:block"></div>
              <div className="w-28 h-6 bg-white/20 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16 w-full flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {/* Explore title placeholder */}
          <div className="w-[30%] h-8 bg-[#E8EFF1] rounded-md"></div>
          {/* Paragraph description lines */}
          <div className="w-[85%] h-4 bg-[#E8EFF1] rounded-md mt-2"></div>
          <div className="w-[75%] h-4 bg-[#E8EFF1] rounded-md"></div>
          <div className="w-[40%] h-4 bg-[#E8EFF1] rounded-md"></div>
        </div>

        {/* Tabs Bar placeholder */}
        <div className="w-full h-[40px] bg-[#E8EFF1]/50 border-b border-[#d4d5d8]/30 mt-4"></div>

        {/* Grid and Sidebar columns */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Unit Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 flex-1 w-full">
            {Array.from({ length: 3 }).map((_, idx) => (
              <UnitCardSkeleton key={idx} className="w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* AmenitiesSection Skeleton */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16 w-full flex flex-col gap-6">
        <div className="w-[20%] h-8 bg-[#E8EFF1] rounded-md"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-[#F5F9FA] border border-white rounded-[12px] p-4 flex flex-col items-center justify-center gap-4 min-h-[120px] shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)]">
              <div className="w-8 h-8 rounded-full bg-[#E8EFF1]"></div>
              <div className="w-16 h-4 bg-[#E8EFF1] rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery Skeleton */}
      <div className="w-full py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
          <div className="w-[25%] h-8 bg-[#E8EFF1] rounded-md mb-6"></div>
          <div className="w-full h-[300px] sm:h-[400px] bg-[#E8EFF1] rounded-[16px]"></div>
        </div>
      </div>

      {/* Location Section Map Skeleton */}
      <div className="w-full py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
          <div className="w-[20%] h-8 bg-[#E8EFF1] rounded-md mb-6"></div>
          <div className="w-full h-[400px] bg-[#E8EFF1] rounded-[16px]"></div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsSkeleton;
