import defualtImage from "../../assets/HomePage/default.png";
import { destinations } from "../../data";


const PrestigiousDestinations = () => {
  return (
    <section className="w-full bg-light-primary">
      <div className="max-w-6xl mx-auto bg-light-primary  py-16">
      {/* Section Title */}
      <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight mb-12">
        Prestigious Destinations
      </h2>

      {/* Grid container for 3 destination cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="group relative aspect-[4/5] rounded-md  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            {/* Background image */}
            <img
              src={defualtImage}
              alt={dest.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none z-0"
            />
            {/* Dark bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            {/* Optional Floating Arrow Button (Top Right) */}
            {dest.hasArrowBadge && (
              <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:bg-primary/95 hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            )}

            {/* Bottom Glassmorphism Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20  text-text-primary flex justify-between items-center shadow-md">
              <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl  p-4">
                <h3 className="text-lg font-bold tracking-wide ">{dest.title}</h3>
                <p className="text-xs text-text-primary font-medium mt-0.5">{dest.developer}</p>
              </div>
              <div className="text-right backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl  p-4">
                <span className="block text-lg  text-text-primary font-medium">
                  Starts from
                </span>
                <span className="block text-sm  text-text-primary mt-0.5">
                  {dest.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div> 

    </section>
    
  );
};

export default PrestigiousDestinations;
