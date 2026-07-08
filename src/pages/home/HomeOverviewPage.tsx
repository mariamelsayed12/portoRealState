import ContactUsSection from "../../components/HomeCompoents/ContactUsSection";
import CuratedPropertiesSection from "../../components/HomeCompoents/CuratedPropertiesSection";
import HeaderSection from "../../components/HomeCompoents/HeaderSection";
import NorthCoastInvestmentSection from "../../components/HomeCompoents/NorthCoastInvestmentSection";
import PrestigiousDestinations from "../../components/HomeCompoents/PrestigiousDestinations";
import WhatWeOffer from "../../components/HomeCompoents/WhatWeOffer";

const HomeOverviewPage = () => {
	return (
		<div className="pb-24">
			<HeaderSection />
			<WhatWeOffer />
			<PrestigiousDestinations />
			<CuratedPropertiesSection />
			<NorthCoastInvestmentSection />
			<ContactUsSection />
		</div>
	);
};

export default HomeOverviewPage;
