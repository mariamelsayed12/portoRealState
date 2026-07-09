import { villageFeatures } from "../../data";
import FeaturesMarquee from "./Featuresmarquee";

 
export default function AmenitiesSection() {
  return (
    <div className="bg-[#F4F8FA] px-6 py-12 sm:px-10 lg:px-16">
      <FeaturesMarquee title="Amenities" features={villageFeatures} />
    </div>
  );
}