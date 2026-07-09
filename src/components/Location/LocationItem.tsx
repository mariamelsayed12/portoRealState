import React from "react";

interface LocationItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}

const LocationItem: React.FC<LocationItemProps> = ({ icon: Icon, label, href }) => {
  const textContent = (
    <span className="text-base text-text-secondary font-normal transition-colors duration-200">
      {label}
    </span>
  );

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-text-secondary flex-shrink-0">
        <Icon className="w-5 h-5 stroke-[1.75]" />
      </div>
      <div className="ml-4">
        {href ? (
          <a href={href} className="hover:text-primary hover:underline transition-colors duration-200">
            {textContent}
          </a>
        ) : (
          textContent
        )}
      </div>
    </div>
  );
};

export default LocationItem;
