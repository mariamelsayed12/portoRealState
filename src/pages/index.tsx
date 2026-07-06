import HeaderSection from "../components/HomeCompoents/HeaderSection";
import WhatWeOffer from "../components/HomeCompoents/WhatWeOffer";
import CuratedPropertiesSection from "../components/HomeCompoents/CuratedPropertiesSection";
import NorthCoastInvestmentSection from "../components/HomeCompoents/NorthCoastInvestmentSection";
import PrestigiousDestinations from "../components/HomeCompoents/PrestigiousDestinations";

const HomePage = () => {
  return (
    <div className="pb-24">
      <HeaderSection />
      <WhatWeOffer />
      <PrestigiousDestinations />
      <CuratedPropertiesSection />
      <NorthCoastInvestmentSection />
    </div>
  );
};

export default HomePage;
