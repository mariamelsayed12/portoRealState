import React from "react";

interface DestinationStatsProps {
  startingPrice: string;
  rentalYield: string;
  availableListings: string;
  developer: string;
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[12px] rounded-[12px] p-[8px] flex flex-col gap-[8px] items-start w-full sm:w-[181px] h-[75px] shrink-0 border border-white/10">
    <span className="text-[16px] font-normal text-[#edeff2] font-['Poppins'] leading-[normal]">
      {label}
    </span>
    <span className="text-[19px] font-medium text-[#edeff2] font-['Poppins'] leading-[normal] truncate w-full">
      {value}
    </span>
  </div>
);

const DestinationStats: React.FC<DestinationStatsProps> = ({
  startingPrice,
  rentalYield,
  availableListings,
  developer,
}) => {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-[16px] sm:gap-[24px] w-full">
      <StatCard label="Starting Price" value={startingPrice} />
      <StatCard label="Rental Yield" value={rentalYield} />
      <StatCard label="Available Listing" value={availableListings} />
      <StatCard label="Developer" value={developer} />
    </div>
  );
};

export default DestinationStats;
