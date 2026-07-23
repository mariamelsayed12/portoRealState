import { villageFeatures } from "../../data";
import FeaturesMarquee from "./Featuresmarquee";
import { useTranslation } from "react-i18next";

export default function AmenitiesSection() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F4F8FA] ">
      <FeaturesMarquee title={t("amenitiesSection.title")} features={villageFeatures} />
    </div>
  );
}
