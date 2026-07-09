import { villageFeatures } from "../../data";
import FeaturesMarquee from "./Featuresmarquee";

 
export default function AmenitiesSection() {
  return (
    <div className="bg-[#F4F8FA] ">
      <FeaturesMarquee title="Amenities" features={villageFeatures} />
    </div>
  );
}