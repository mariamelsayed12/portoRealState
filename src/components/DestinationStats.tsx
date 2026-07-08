import React from "react";

interface DestinationStatsProps {
  startingPrice: string;
  rentalYield: string;
  availableListings: string;
  developer: string;
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col justify-center px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 hover:bg-black/50 transition-colors duration-300">
    <span className="text-sm text-gray-300 mb-1">{label}</span>
    <span className="text-lg font-medium text-white">{value}</span>
  </div>
);

const DestinationStats: React.FC<DestinationStatsProps> = ({
  startingPrice,
  rentalYield,
  availableListings,
  developer,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <StatCard label="Starting Price" value={startingPrice} />
      <StatCard label="Rental Yield" value={rentalYield} />
      <StatCard label="Available Listing" value={availableListings} />
      <StatCard label="Developer" value={developer} />
    </div>
  );
};

export default DestinationStats;
