import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
	return (
		<input
			ref={ref}
			className={twMerge(
				clsx(
					"h-11 w-full rounded-md border border-border bg-white px-3.5 text-[14px] text-text-darker outline-none transition-colors placeholder:text-[#8C8C8C] focus:border-primary",
					className,
				),
			)}
			{...rest}
		/>
	);
});

Input.displayName = "Input";

export default Input;
