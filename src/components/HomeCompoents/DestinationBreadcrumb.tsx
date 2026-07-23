import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BreadcrumbProps {
  title: string;
  propertyTitle?: string;
  destinationSlug?: string;
  variant?: "light" | "dark";
}

const Breadcrumb = ({
  title,
  propertyTitle,
  destinationSlug,
  variant = "dark",
}: BreadcrumbProps) => {
  const { t } = useTranslation();
  const isLight = variant === "light";
  
  const textClass = isLight ? "text-[#7D8D93] hover:text-text-secondary" : "text-gray-300 hover:text-white";
  const activeClass = isLight ? "text-text-secondary font-semibold" : "text-white font-medium";
  const chevronClass = isLight ? "w-4 h-4 text-[#C3CCCF]" : "w-4 h-4 text-gray-400";

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link to="/home" className={`${textClass} transition-colors`}>
        {t("navbar.home")}
      </Link>
      <ChevronRight className={chevronClass} />
      
      {propertyTitle ? (
        <>
          {destinationSlug ? (
            <Link to={`/home/${destinationSlug}`} className={`${textClass} transition-colors`}>
              {title}
            </Link>
          ) : (
            <span className={textClass}>{title}</span>
          )}
          <ChevronRight className={chevronClass} />
          <span className={activeClass}>{propertyTitle}</span>
        </>
      ) : (
        <span className={activeClass}>{title}</span>
      )}
    </nav>
  );
};

export default Breadcrumb;
