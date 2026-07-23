import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DestinationNotFound = () => {
	const { t } = useTranslation();

	return (
		<div className="mx-auto flex min-h-[40vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
			<h2 className="text-2xl font-semibold text-text-secondary">{t("destinationDetails.notFound.heading")}</h2>
			<p className="text-sm text-text-darker">{t("destinationDetails.notFound.description")}</p>
			<Link
				to="/home"
				className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
			>
				{t("destinationDetails.notFound.backToHome")}
			</Link>
		</div>
	);
};

export default DestinationNotFound;
