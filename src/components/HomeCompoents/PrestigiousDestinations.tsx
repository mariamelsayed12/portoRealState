import { destinations } from "../../data";
import DestinationCard from "./DestinationCard";

const PrestigiousDestinations = () => {
  return (
    <section className="w-full bg-light-primary">
      <div className="max-w-6xl mx-auto bg-light-primary  py-16">
        {/* Section Title */}
        <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight mb-12">
          Prestigious Destinations
        </h2>

        {/* Grid container for 6 destination cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrestigiousDestinations;
