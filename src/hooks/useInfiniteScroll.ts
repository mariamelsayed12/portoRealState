import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  checkCanTrigger?: () => boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  onLoadMore,
  checkCanTrigger,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetching) return;

    // Force a layout reflow to ensure the browser has calculated the new
    // positions of the appended cards and pushed the sentinel down.
    void sentinel.offsetTop;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          if (checkCanTrigger && !checkCanTrigger()) {
            return;
          }
          // Immediately unobserve the sentinel to prevent multiple triggers
          // before the page state updates and isFetching transitions to true.
          observer.unobserve(sentinel);
          onLoadMore();
        }
      },
      { threshold }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetching, onLoadMore, checkCanTrigger, threshold]);

  return sentinelRef;
};
