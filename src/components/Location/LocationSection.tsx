import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import type { IVillage } from "../../app/services/crudVillage";
import LocationItem from "./LocationItem";
import GoogleMap from "./GoogleMap";
import { useTranslation } from "react-i18next";
import type { IProfile } from "../../app/services/crudeProfile";

interface LocationSectionProps {
  destination: IVillage;
  profile?: IProfile;
}

const LocationSection: React.FC<LocationSectionProps> = ({ destination,profile }) => {
  const { t } = useTranslation();
  const { name,latitude, longitude, googleMapsUrl } = destination;

  const coordinates = { lat: latitude, lng: longitude };

  // Define location items configuration to avoid duplicating markup
  const locationItems = [
    {
      icon: MapPin,
      label: destination.locationText|| t("locationSection.addressNotAvailable"),
      href: googleMapsUrl,
    },
    {
      icon: Phone,
      label: profile?.phoneNumber || t("locationSection.phoneNotAvailable"),
      href: undefined,
    },
    {
      icon: Mail,
      label:profile?.email || t("locationSection.emailNotAvailable"),
      href: undefined,
    },
  ];

  return (
    <section className="bg-light-primary py-16 sm:py-20 border-t border-[#E8EFF1]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16 items-center">
          {/* Left Side: Destination Info */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <h2 className="text-[32px] sm:text-[40px] font-semibold leading-[40px] sm:leading-[48px] text-text-secondary tracking-tight mb-8 md:mb-10 lg:mb-12">
              {t("locationSection.heading", { title: name })}
            </h2>
            
            <div className="flex flex-col gap-6 md:gap-5 lg:gap-8">
              {locationItems.map((item, index) => (
                <LocationItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="md:col-span-7 w-full mt-4 md:mt-0">
            <GoogleMap
              coordinates={coordinates}
              googleMapsUrl={googleMapsUrl}
              title={name}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
