import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  title: string;
}

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-300">
      <Link to="/" className="hover:text-white transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-white font-medium">{title}</span>
    </nav>
  );
};

export default Breadcrumb;
