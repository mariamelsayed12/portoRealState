import defualtImage from "../assets/HomePage/default.png";
import BuyProperty from "../assets/BuyProperty.svg";
import type {
  DestinationData,
  Feature,
  InvestmentCardData,
  PropertyCardData,
} from "../interfaces";
import northcost from "../assets/HomePage/northcost.jpg";
import { Mail, Phone } from "lucide-react";
import HotelsIcon from "../components/icons/hotels";
import GolfIcon from "../components/icons/golf";
import PoolIcon from "../components/icons/pools";
import Security from "../components/icons/security";
import MediacalServiceIcon from "../components/icons/MedicalService";
import Marina from "../components/icons/marina";
import BeachIcon from "../components/icons/beach";

export const destinations: DestinationData[] = [
  {
    id: 1,
    slug: "village",
    title: "Porto Golf",
    breadcrumbLabel: "Village",
    image: defualtImage,
    description:
      "A calm residential destination with signature coastal living and private leisure spaces.",
    developer: "Amer Group",
    price: "2M EGP",
    startingPrice: "2,000,000 EGP",
    rentalYield: "Up to 8%",
    availableListings: "More than 1000",
    hasArrowBadge: false,
    address: "almansoura st, north coast",
    phone: "+20113333333",
    email: "elahdd@email.com",
    coordinates: { lat: 30.8247, lng: 28.9892 },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30.8247,28.9892",
  },
  {
    id: 2,
    title: "Porto Marina",
    slug: "porto-marina",
    developer: "Amer Group",
    price: "3M EGP",
    startingPrice: "3,000,000 EGP",
    rentalYield: "Up to 10%",
    availableListings: "More than 3000",
    image: defualtImage,
    description:
      "Porto Marina is the ultimate seaside resort, providing endless entertainment and pristine beaches.",
    hasArrowBadge: true,
    address: "KM 105, Alex-Matrouh Road, Marina, North Coast",
    phone: "+20113333333",
    email: "elahdd@email.com",
    coordinates: { lat: 30.8284, lng: 29.0028 },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30.8284,29.0028",
  },
  {
    id: 3,
    slug: "beach",
    title: "Porto Golf",
    breadcrumbLabel: "Beach",
    image: defualtImage,
    description:
      "A beachfront destination designed for relaxed everyday access to the sea.",
    developer: "Amer Group",
    price: "2M EGP",
    startingPrice: "2,000,000 EGP",
    rentalYield: "Up to 8%",
    availableListings: "More than 1000",
    hasArrowBadge: false,
    address: "beachfront sector, north coast",
    phone: "+20113333333",
    email: "elahdd@email.com",
    coordinates: { lat: 30.821, lng: 28.975 },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30.8210,28.9750",
  },
  {
    id: 4,
    slug: "lagoon",
    title: "Porto Golf",
    breadcrumbLabel: "Lagoon",
    image: defualtImage,
    description:
      "Waterfront escapes and family-friendly leisure framed by lush landscapes.",
    developer: "Amer Group",
    price: "2.5M EGP",
    startingPrice: "2,500,000 EGP",
    rentalYield: "Up to 9%",
    availableListings: "More than 2000",
    hasArrowBadge: false,
    address: "lagoon parkway, north coast",
    phone: "+20113333333",
    email: "elahdd@email.com",
    coordinates: { lat: 30.83, lng: 28.995 },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30.8300,28.9950",
  },
  {
    id: 5,
    slug: "marina",
    title: "Porto Golf",
    breadcrumbLabel: "Marina",
    image: defualtImage,
    description:
      "A marina lifestyle with an elegant promenade and curated amenities.",
    developer: "Amer Group",
    price: "3M EGP",
    startingPrice: "3,000,000 EGP",
    rentalYield: "Up to 7%",
    availableListings: "More than 1500",
    hasArrowBadge: false,
    address: "yacht promenade, north coast",
    phone: "+20113333333",
    email: "elahdd@email.com",
    coordinates: { lat: 30.827, lng: 28.985 },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30.8270,28.9850",
  },
  {
    id: 6,
    slug: "coast",
    title: "Porto Golf",
    breadcrumbLabel: "Coast",
    image: defualtImage,
    description:
      "A coastal destination with a modern resort rhythm and timeless appeal.",
    developer: "Amer Group",
    price: "4M EGP",
    startingPrice: "4,000,000 EGP",
    rentalYield: "Up to 11%",
    availableListings: "More than 500",
    hasArrowBadge: false,
    address: "coastal bypass, north coast",
    phone: "+20113333333",
    email: "elahdd@email.com",
    coordinates: { lat: 30.823, lng: 28.965 },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30.8230,28.9650",
  },
];

export const LOCATION_OPTIONS = ["Item 1", "Item 1", "Item 1", "Item 1"];

export const offerItems = [
  {
    title: "Property Sales",
    description:
      "Direct access to launches across the most coveted North Coast developments before they reach the market.",
    icon: <img src={BuyProperty} alt="buyProperty" />,
    link: "/buy",
  },
  {
    title: "Sell Your Property",
    description:
      "List discreetly with PORTO expert valuation, qualified buyers, and quiet negotiation that protects your price.",
    icon:<img src={BuyProperty} alt="buyProperty" /> ,
    link: "/sell",
  },
  {
    title: "Special Rentals",
    description:
      "Hand picked special residences for rent, vetted for service, comfort, and privacy.",
    icon:<img src={BuyProperty} alt="buyProperty" />,
    link: "/rent",
  },
  {
    title: "Property Management",
    description:
      "End to end management of your asset yield optimization, guest screening, and concierge upkeep.",
    icon:<img src={BuyProperty} alt="buyProperty" />,
    link: "/management",
  },
];

export const curatedPropertiesHeading = {
  title: "Curated Properties",
  actionLabel: "View All",
};

// export const curatedProperties: PropertyUnitCardData[] = [
//   {
//     id: "sea-view-chalet-1",
//     image: defualtImage,
//     badges: ["Resale", "Delivery in 2023"],
//     location: "Porto Golf • Chalet",
//     title: "Sea view Chalet",
//     stats: [
//       { icon: "location", value: "6.5 km" },
//       { icon: "bed", value: "5" },
//       { icon: "bath", value: "3" },
//     ],
//     price: "3,000,000 EGP",
//     paymentModes: ["Installment", "Cash"],
//     paymentNote: "5% Down payment",
//     destination: { slug: "village" ,name:"Porto Golf" },
//   },
//   {
//     id: "sea-view-chalet-2",
//     image: defualtImage,
//     badges: ["Developer", "Delivery in 2023"],
//     location: "Porto Golf • Chalet",
//     title: "Sea view Chalet",
//     stats: [
//       { icon: "location", value: "6.5 km" },
//       { icon: "bed", value: "5" },
//       { icon: "bath", value: "3" },
//     ],
//     price: "3,000,000 EGP",
//     paymentModes: ["Installment", "Cash"],
//     paymentNote: "5% Down payment",
//     destination: { slug: "village" , name:"Porto Golf" },
//   },
//   {
//     id: "sea-view-chalet-3",
//     image: defualtImage,
//     badges: ["Rent", "Available"],
//     location: "Porto Golf • Chalet",
//     title: "Sea view Chalet",
//     stats: [
//       { icon: "area", value: "125 sqm" },
//       { icon: "bed", value: "3" },
//       { icon: "bath", value: "1" },
//     ],
//     price: "20,000 EGP /month",
//     paymentModes: [],
//     paymentNote: "1 month insurance",
//     destination: { slug: "village" , name:"Porto Golf"},
//   },
//   {
//     id: "sea-view-chalet-4",
//     image: defualtImage,
//     badges: ["Resale", "Delivery in 2023"],
//     location: "Porto Golf • Chalet",
//     title: "Sea view Chalet",
//     stats: [
//       { icon: "location", value: "6.5 km" },
//       { icon: "bed", value: "5" },
//       { icon: "bath", value: "3" },
//     ],
//     price: "3,000,000 EGP",
//     paymentModes: ["Installment", "Cash"],
//     paymentNote: "5% Down payment",
//     destination: { slug: "village",
//       name:"Porto Golf"

//      },
//   },
// ];

export const units: PropertyCardData[] = [
  // Village / Porto Golf units (6 units as shown in grid)
  {
    id: "village-unit-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2028"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "3,000,000 EGP",
    cashPrice: "2,500,000 EGP",
    installmentPrice: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment\n250,000 Quarterly /5 y",
    destination: {
      slug: "village",
      name: "Porto Golf",
    },
  },
  {
    id: "village-unit-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2028"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "3,000,000 EGP",
    cashPrice: "2,500,000 EGP",
    installmentPrice: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment \n 250,000 Quarterly /5 y",
    destination: { slug: "village", name: "Porto Golf" },
  },
  {
    id: "village-unit-3",
    image: defualtImage,
    badges: ["Rent", "Available"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "village", name: "Porto Golf" },
  },
  {
    id: "village-unit-4",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2028"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment\n250,000 Quarterly /5 y",
    destination: { slug: "village", name: "Porto Golf" },
  },
  {
    id: "village-unit-5",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2028"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment\n250,000 Quarterly /5 y",
    destination: { slug: "village", name: "Porto Golf" },
  },
  {
    id: "village-unit-6",
    image: defualtImage,
    badges: ["Rent", "Available"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "village", name: "Porto Golf" },
  },

  // Porto Marina units (3 units)
  {
    id: "marina-unit-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2027"],
    location: "Porto Marina • Chalet",
    title: "Luxury Beachfront Chalet",
    stats: [
      { icon: "area", value: "150 sqm" },
      { icon: "bed", value: "4" },
      { icon: "bath", value: "2" },
    ],
    price: "4,500,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "10% Down payment\n400,000 Quarterly /4 y",
    destination: { slug: "porto-marina", name: "porto-marina" },
  },
  {
    id: "marina-unit-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2027"],
    location: "Porto Marina • Penthouse",
    title: "Marina View Penthouse",
    stats: [
      { icon: "area", value: "200 sqm" },
      { icon: "bed", value: "5" },
      { icon: "bath", value: "3" },
    ],
    price: "6,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "10% Down payment\n500,000 Quarterly /5 y",
    destination: { slug: "porto-marina", name: "porto-marina" },
  },
  {
    id: "marina-unit-3",
    image: defualtImage,
    badges: ["Rent", "Available soon"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "porto-marina", name: "porto-marina" },
  },

  // Beach units (3 units)
  {
    id: "beach-unit-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2026"],
    location: "Porto Beach • Chalet",
    title: "Sea Shore Chalet",
    stats: [
      { icon: "area", value: "110 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "2" },
    ],
    price: "2,800,000 EGP",
    paymentModes: ["Installment"],
    paymentNote: "5% Down payment\n200,000 Quarterly /5 y",
    destination: { slug: "beach", name: "porto-marina" },
  },
  {
    id: "beach-unit-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2026"],
    location: "Porto Beach • Chalet",
    title: "Front Row Chalet",
    stats: [
      { icon: "area", value: "130 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "2" },
    ],
    price: "3,500,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "10% Down payment\n250,000 Quarterly /4 y",
    destination: { slug: "beach", name: "porto-marina" },
  },
  {
    id: "beach-unit-3",
    image: defualtImage,
    badges: ["Rent", "Available soon"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "beach", name: "porto-marina" },
  },

  // Lagoon units (3 units)
  {
    id: "lagoon-unit-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2027"],
    location: "Porto Lagoon • Chalet",
    title: "Lagoon Side Chalet",
    stats: [
      { icon: "area", value: "120 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1.5" },
    ],
    price: "2,600,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment\n180,000 Quarterly /5 y",
    destination: { slug: "lagoon", name: "porto-marina" },
  },
  {
    id: "lagoon-unit-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2027"],
    location: "Porto Lagoon • Chalet",
    title: "Crystal Lagoon Chalet",
    stats: [
      { icon: "area", value: "135 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "2" },
    ],
    price: "3,100,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "8% Down payment\n220,000 Quarterly /5 y",
    destination: { slug: "lagoon", name: "porto-marina" },
  },
  {
    id: "lagoon-unit-3",
    image: defualtImage,
    badges: ["Rent", "Available"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "lagoon", name: "porto-marina" },
  },

  // Marina units (3 units)
  {
    id: "marina-sec-unit-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2028"],
    location: "Porto Marina • Chalet",
    title: "Yacht Harbour Chalet",
    stats: [
      { icon: "area", value: "140 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "2" },
    ],
    price: "3,800,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment\n300,000 Quarterly /5 y",
    destination: { slug: "marina", name: "porto-marina" },
  },
  {
    id: "marina-sec-unit-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2028"],
    location: "Porto Marina • Chalet",
    title: "Panoramic Promenade Chalet",
    stats: [
      { icon: "area", value: "160 sqm" },
      { icon: "bed", value: "4" },
      { icon: "bath", value: "2.5" },
    ],
    price: "4,400,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "10% Down payment\n350,000 Quarterly /5 y",
    destination: { slug: "marina", name: "porto-marina" },
  },
  {
    id: "marina-sec-unit-3",
    image: defualtImage,
    badges: ["Rent", "Available"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "marina", name: "porto-marina" },
  },

  // Coast units (3 units)
  {
    id: "coast-unit-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2029"],
    location: "Porto Coast • Chalet",
    title: "Premium Sea-Breeze Chalet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "2" },
    ],
    price: "3,200,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment\n240,000 Quarterly /5 y",
    destination: { slug: "coast", name: "porto-marina" },
  },
  {
    id: "coast-unit-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2029"],
    location: "Porto Coast • Chalet",
    title: "Infinity View Chalet",
    stats: [
      { icon: "area", value: "145 sqm" },
      { icon: "bed", value: "4" },
      { icon: "bath", value: "2" },
    ],
    price: "4,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "10% Down payment\n300,000 Quarterly /5 y",
    destination: { slug: "coast", name: "porto-marina" },
  },
  {
    id: "coast-unit-3",
    image: defualtImage,
    badges: ["Rent", "Available"],
    location: "Porto Golf • Chalet",
    title: "Sea view Challet",
    stats: [
      { icon: "area", value: "125 sqm" },
      { icon: "bed", value: "3" },
      { icon: "bath", value: "1" },
    ],
    price: "20,000 EGP /month",
    paymentModes: [],
    paymentNote: "1 month insurance",
    destination: { slug: "coast", name: "porto-marina" },
  },
];

export const northCoastHeading = {
  title: "Why to Invest in the North Coast ?",
};

export const northCoastInvestmentCards: InvestmentCardData[] = [
  {
    id: "capital-appreciation",
    title: "Strong Capital Appreciation",
    description:
      "North Coast values have grown across premium compounds, creating resilient long-term upside.",
    variant: "text",
  },
  {
    id: "coastal-location",
    title: "Prime Coastal Location",
    description:
      "Curated addresses in Egypt's most coveted Mediterranean shoreline and lifestyle corridor.",
    variant: "text",
  },
  {
    id: "north-coast-hero",
    title: "North Coast Landscape",
    description: "",
    variant: "image",
    image: northcost,
    alt: "North Coast landscape",
  },
  {
    id: "rental-yields",
    title: "Attractive Rental Yields",
    description:
      "Seasonal demand keeps occupancy strong and short-term returns resilient year after year.",
    variant: "text",
  },
  {
    id: "partnerships",
    title: "Strategic Partnerships",
    description:
      "Developer relationships unlock priority launches, preferred terms, and better allocation.",
    variant: "text",
  },
];
export type ContactFieldConfig =
  | {
      name: "fullName";
      label: string;
      placeholder: string;
      type: "text";
      isTextarea?: false;
    }
  | {
      name: "phoneNumber";
      label: string;
      placeholder: string;
      type: "tel";
      isTextarea?: false;
    }
  | {
      name: "description";
      label: string;
      placeholder: string;
      type: "text";
      isTextarea: true;
    };

export const contactItems = [
  {
    icon: Phone,
    label: "+20113333333",
    href: "tel:+20113333333",
  },
  {
    icon: Mail,
    label: "elahdd@email.com",
    href: "mailto:elahdd@email.com",
  },
];

export const contactFields: ContactFieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name*",
    placeholder: "Input text",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number*",
    placeholder: "Input text",
    type: "tel",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Tell us more about your request..",
    type: "text",
    isTextarea: true,
  },
];

/**
 * Design tokens for the Village Features marquee.
 * Centralised so the visual design can be tuned in one place without
 * touching component logic.
 */
export const FEATURE_MARQUEE_TOKENS = {
  colors: {
    cardBg: "#FFFFFF",
    accent: "#B9DBE5",
    title: "#141414",
    pageBg: "#F4F8FA",
  },
  card: {
    // Desktop
    width: 300,
    height: 132,
    // Tablet
    widthTablet: 240,
    heightTablet: 112,
    // Mobile
    widthMobile: 190,
    heightMobile: 100,
    radius: 28,
    gap: 4,
  },
  marquee: {
    /** px per second — constant speed regardless of item count. */
    speedPxPerSecond: 60,
  },
} as const;

export const villageFeatures: Feature[] = [
  {
    id: "Hotels",
    title: "Hotels",
    icon: HotelsIcon,
  },
  {
    id: "Golf",
    title: "Golf",
    icon: GolfIcon,
  },
  {
    id: "Private-Beach",
    title: "Private Beach",
    icon: BeachIcon,
  },
  {
    id: "Pools",
    title: "Pools",
    icon: PoolIcon,
  },
  {
    id: "Security",
    title: "24/7 Security",
    icon: Security,
  },
  {
    id: "Marina",
    title: "Marina",
    icon: Marina,
  },
  {
    id: "Medical-Service",
    title: "Medical Service",
    icon: MediacalServiceIcon,
  },
];
