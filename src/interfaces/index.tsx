export interface PropertyStat {
	icon: "location" | "bed" | "bath" | "area";
	value: string;
}

export interface PropertyCardData {
	id: string;
	image: string;
	badges: string[];
	location: string;
	title: string;
	stats: PropertyStat[];
	price: string;
	paymentModes: string[];
	paymentNote: string;
}

export interface InvestmentCardData {
	id: string;
	title: string;
	description: string;
	variant: "text" | "image";
	image?: string;
	alt?: string;
}

export interface SectionHeadingData {
	title: string;
	actionLabel?: string;
}

export interface ContactUsFormValues {
	fullName: string;
	phoneCountryCode: string;
	phoneNumber: string;
	description: string;
}
