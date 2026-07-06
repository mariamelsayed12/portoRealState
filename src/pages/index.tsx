import HeaderSection from "../components/HomeCompoents/HeaderSection";
import WhatWeOffer from "../components/HomeCompoents/WhatWeOffer";
import PrestigiousDestinations from "../components/HomeCompoents/PrestigiousDestinations";

const HomePage = () => {
  return (
    <div className="pb-24">
      <HeaderSection />
      <WhatWeOffer />
      <PrestigiousDestinations />
    </div>
  );
};

export default HomePage;