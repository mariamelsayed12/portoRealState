import { Link } from "react-router-dom";

const DestinationNotFound = () => {
	return (
		<div className="mx-auto flex min-h-[40vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
			<h2 className="text-2xl font-semibold text-text-secondary">Destination not found</h2>
			<p className="text-sm text-text-darker">The destination you requested does not exist.</p>
			<Link
				to="/home"
				className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
			>
				Back to Home
			</Link>
		</div>
	);
};

export default DestinationNotFound;
