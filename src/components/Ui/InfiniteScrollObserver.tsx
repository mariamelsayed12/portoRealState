import React from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

interface InfiniteScrollObserverProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  checkCanTrigger?: () => boolean;
  className?: string;
  children?: React.ReactNode;
}

export const InfiniteScrollObserver = ({
  hasNextPage,
  isFetching,
  onLoadMore,
  checkCanTrigger,
  className = "h-10 w-full flex items-center justify-center mt-6",
  children,
}: InfiniteScrollObserverProps) => {
  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching,
    onLoadMore,
    checkCanTrigger,
  });

  return (
    <div
      ref={sentinelRef}
      className={className}
      style={{
        visibility: hasNextPage ? "visible" : "hidden",
        minHeight: "40px",
      }}
    >
      {hasNextPage && children}
    </div>
  );
};

export default InfiniteScrollObserver;
