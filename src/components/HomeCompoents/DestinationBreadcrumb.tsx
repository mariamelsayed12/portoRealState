import { Link } from "react-router-dom";

interface DestinationBreadcrumbProps {
	label: string;
}

const DestinationBreadcrumb = ({ label }: DestinationBreadcrumbProps) => {
	return (
		<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-white/90">
			<Link to="/home" className="transition-colors hover:text-white">
				Home
			</Link>
			<span className="text-white/55">&gt;</span>
			<span className="font-semibold text-white">{label}</span>
		</nav>
	);
};

export default DestinationBreadcrumb;
