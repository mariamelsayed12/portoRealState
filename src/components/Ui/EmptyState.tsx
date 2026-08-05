import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import defaultEmptyImage from "../../assets/emptyState.svg";

interface EmptyStateProps {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  image,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center w-full max-w-lg mx-auto"
    >
      {/* Icon or Image container */}
      <div className="flex items-center justify-center mb-6">
        {icon ? (
          <div className="text-primary flex items-center justify-center">{icon}</div>
        ) : (
          <img
            src={image || defaultEmptyImage}
            alt={title}
            className="w-48 sm:w-60 md:w-72 h-auto object-contain select-none"
            draggable={false}
          />
        )}
      </div>

      {/* Text content */}
      <h3 className="text-lg sm:text-xl text-[#141414] md:text-2xl font-medium font-['Poppins'] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm sm:text-base text-[#464646] font-['Poppins'] max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-lg bg-primary hover:bg-[#1a7d99] font-semibold text-xs sm:text-sm px-6 py-2.5 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
