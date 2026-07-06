import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...rest }, ref) => {
	return (
		<textarea
			ref={ref}
			className={twMerge(
				clsx(
					"min-h-[104px] w-full resize-none rounded-md border border-border bg-white px-3.5 py-3 text-[14px] text-text-darker outline-none transition-colors placeholder:text-[#8C8C8C] focus:border-primary",
					className,
				),
			)}
			{...rest}
		/>
	);
});

Textarea.displayName = "Textarea";

export default Textarea;
