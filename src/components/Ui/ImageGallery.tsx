import { useState, useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active index when images array changes (e.g. navigation to another destination)
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-[12px] sm:gap-0 sm:relative w-full">
      {/* Main Image Container */}
      <div className="relative w-full overflow-hidden rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
        <img
          src={images[activeIndex]}
          alt={`${alt} - ${activeIndex + 1}`}
          className="h-[250px] w-full md:h-[400px] lg:h-[526px] object-cover transition-all duration-500 ease-in-out"
        />
        
        {/* Dark Overlay (Subtle) */}
        <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
      </div>

      {/* Thumbnails Navigation */}
      {images.length > 1 && (
        <div className="flex flex-row justify-center gap-[8px] sm:absolute sm:right-[16px] sm:lg:right-[32px] sm:top-1/2 sm:-translate-y-1/2 sm:flex-col sm:gap-[12px] z-20 rtl:sm:right-auto rtl:sm:left-[16px] rtl:sm:lg:left-[32px]">
          {images.slice(0, 4).map((img, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative overflow-hidden cursor-pointer rounded-[6px] transition-all duration-200 outline-none w-[56px] h-[36px] sm:w-[64px] sm:h-[44px] lg:w-[80px] lg:h-[54px] ${
                  isActive
                    ? "border-2 border-[#1e8cab] scale-105 shadow-[0px_4px_12px_rgba(30,140,171,0.35)]"
                    : "border border-white/90 hover:border-[#1e8cab]/70 shadow-sm"
                }`}
              >
                <img
                  src={img}
                  alt={`${alt} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-[4px]"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
