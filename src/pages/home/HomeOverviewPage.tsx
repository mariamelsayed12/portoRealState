import { motion } from "framer-motion";
import ContactUsSection from "../../components/HomeCompoents/ContactUsSection";
import CuratedPropertiesSection from "../../components/HomeCompoents/CuratedPropertiesSection";
import HeaderSection from "../../components/HomeCompoents/HeaderSection";
import NorthCoastInvestmentSection from "../../components/HomeCompoents/NorthCoastInvestmentSection";
import PrestigiousDestinations from "../../components/HomeCompoents/PrestigiousDestinations";
import WhatWeOffer from "../../components/HomeCompoents/WhatWeOffer";

const HomeOverviewPage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className="pb-24"
		>
			<HeaderSection />
			<WhatWeOffer />
			<PrestigiousDestinations />
			<CuratedPropertiesSection />
			<NorthCoastInvestmentSection />
			<ContactUsSection />
		</motion.div>
	);
};

export default HomeOverviewPage;
