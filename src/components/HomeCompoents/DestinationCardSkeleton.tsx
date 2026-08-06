export const DestinationCardSkeleton = () => (
	<div className="relative flex flex-col justify-end p-6 rounded-[12px] border border-white shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)] overflow-hidden shrink-0 w-[280px] sm:w-[384px] h-[320px] sm:h-[443px] bg-[#F5F9FA] animate-pulse">
		{/* Badges container skeleton at the bottom */}
		<div className="relative z-10 flex items-start justify-between gap-4 w-full">
			{/* Left Glass Badge Skeleton */}
			<div className="bg-white/60 backdrop-blur-md rounded-[12px] p-2 flex flex-col items-start min-w-[120px] border border-white/80 w-1/2">
				<div className="h-5 bg-[#E8EFF1] rounded w-[80%] mb-1.5"></div>
				<div className="h-4 bg-[#E8EFF1] rounded w-[60%]"></div>
			</div>

			{/* Right Glass Badge Skeleton */}
			<div className="bg-white/60 backdrop-blur-md rounded-[12px] p-2 flex flex-col items-start border border-white/80 w-1/3">
				<div className="h-4 bg-[#E8EFF1] rounded w-[70%] mb-1.5"></div>
				<div className="h-5 bg-[#E8EFF1] rounded w-[90%]"></div>
			</div>
		</div>
	</div>
);