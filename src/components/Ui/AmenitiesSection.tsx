import type { Feature } from "../../interfaces";
import FeaturesMarquee from "./Featuresmarquee";
import { useTranslation } from "react-i18next";

interface AmenitiesSectionProps {
  features?: Feature[];
}

export default function AmenitiesSection({
  features = [],
}: AmenitiesSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F4F8FA]">
      <FeaturesMarquee
        title={t("amenitiesSection.title")}
        features={features}
      />
    </div>
  );
}
