export const UnitCardSkeleton = ({ className = "w-[282px] sm:w-[382px] shrink-0" }: { className?: string }) => {
  return (
    <div
      className={`flex flex-col bg-neutral-300 animate-pulse rounded-[16px] p-4 sm:p-5 gap-4 ${className}`}
    >
      {/* Image Skeleton */}
      <div className="bg-neutral-400/50 w-full h-[200px] sm:h-[268px] rounded-md"></div>
      
      {/* Content Skeleton */}
      <div className="flex flex-col gap-4">
        {/* Location / Destination */}
        <div className="bg-neutral-400/50 w-1/2 h-4 rounded-md"></div>
        
        {/* Title */}
        <div className="bg-neutral-400/50 w-[85%] h-5 rounded-md"></div>
        
        {/* Stats Row */}
        <div className="flex gap-4">
          <div className="bg-neutral-400/50 w-16 h-4 rounded-md"></div>
          <div className="bg-neutral-400/50 w-8 h-4 rounded-md"></div>
          <div className="bg-neutral-400/50 w-8 h-4 rounded-md"></div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-neutral-400/30"></div>

        {/* Price & Toggle Taps Area */}
        <div className="flex justify-between items-center w-full">
          <div className="bg-neutral-400/50 w-[120px] h-6 rounded-md"></div>
          <div className="bg-neutral-400/50 w-[80px] h-8 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default UnitCardSkeleton;
