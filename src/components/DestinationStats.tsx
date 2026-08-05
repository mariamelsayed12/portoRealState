import React from "react";
import { useTranslation } from "react-i18next";

interface DestinationStatsProps {
  startingPrice: number;
  rentalYield: number;
  developerName: string;
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/10 backdrop-blur-[12px] rounded-[12px] p-[8px] flex flex-col gap-[8px] items-start w-full sm:w-[181px] h-[75px] shrink-0 border border-white/10">
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
  developerName,
}) => {
  const { t } = useTranslation();

  const formatStartingPrice = (price: number) => {
    return `${price.toLocaleString()} ${t("search.egp")}`;
  };
  
  const formatRentalYield = (yieldVal: number) => {
    return `${t("destinations.upTo")} ${yieldVal}%`;
  };

  const formatDeveloper = (dev: string) => {
    return dev === "Amer Group" ? t("destinations.developer.amerGroup") : dev;
  };

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-[16px] sm:gap-[24px] w-full">
      <StatCard label={t("destinationDetails.startingPrice")} value={formatStartingPrice(startingPrice)} />
      <StatCard label={t("destinationDetails.rentalYield")} value={formatRentalYield(rentalYield)} />
      <StatCard label={t("destinationDetails.developer")} value={formatDeveloper(developerName)} />
    </div>
  );
};

export default DestinationStats;
