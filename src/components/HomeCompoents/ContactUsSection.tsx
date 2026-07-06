import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import Textarea from "../Ui/Textarea";
import InputErrorMessage from "../Ui/InputErrorMessage";
import type { ContactUsFormValues } from "../../interfaces";
import { ContactUs_Schema } from "../../validation";
import { contactFields, contactItems } from "../../data";



const phoneCodes = ["Eg +000", "+20", "+971"];

const ContactUsSection = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactUsFormValues>({
		resolver: yupResolver(ContactUs_Schema),
		mode: "onSubmit",
		defaultValues: {
			fullName: "",
			phoneCountryCode: "Eg +000",
			phoneNumber: "",
			description: "",
		},
	});

	const onSubmit: SubmitHandler<ContactUsFormValues> = async () => {
		try {
			setIsSubmitting(true);
			await new Promise((resolve) => setTimeout(resolve, 250));
			reset();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
			<section className="bg-background py-16 sm:py-20">
				<div className="mx-auto max-w-[1152px] px-6 sm:px-8 lg:px-12">
					<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
						<div className="max-w-[420px] pt-6 lg:pt-8">
							<h2 className="text-[28px] font-medium tracking-tight text-text-secondary sm:text-[32px] lg:text-[34px]">
							Need Expert Advice ?
						</h2>

							<p className="mt-4 max-w-[340px] text-[14px] font-normal leading-6 text-text-darker sm:text-[15px]">
							Fill out the form and a single advisor will be in touch within 24 hours.
							</p>

							<div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
								{contactItems.map(({ icon: Icon, label, href }) => (
									<a key={label} href={href} className="flex items-center gap-3 text-text-darker">
										<span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-[#1F2937]">
											<Icon className="h-3.5 w-3.5" />
										</span>
										<span className="text-[14px] font-normal">{label}</span>
									</a>
								))}
							</div>
						</div>

					<div className="w-full max-w-[382px] rounded-[12px] border border-[#E1E8EB] bg-white p-4 shadow-[0_2px_8px_rgba(73,95,104,0.08)] sm:p-5 lg:justify-self-end">
						<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
							{contactFields.map((field) => {
								const fieldError = errors[field.name];

								if (field.isTextarea) {
									return (
										<div key={field.name}>
											<label htmlFor={field.name} className="mb-1.5 block text-[12px] font-normal text-text-darker">
												{field.label}
											</label>
											<Textarea
												id={field.name}
												placeholder={field.placeholder}
												className={fieldError ? "border-red-400 focus:border-red-500" : ""}
												{...register(field.name)}
											/>
											<div className="min-h-[18px] pt-1">
												<InputErrorMessage msg={fieldError?.message} />
											</div>
										</div>
									);
								}

								if (field.name === "phoneNumber") {
									return (
										<div key={field.name}>
											<label htmlFor={field.name} className="mb-1.5 block text-[12px] font-normal text-text-darker">
												{field.label}
											</label>
											<div className="flex items-stretch gap-1.5">
												<select
													{...register("phoneCountryCode")}
													className="h-11 w-[80px] rounded-md border border-border bg-white px-2 text-[12px] text-text-darker outline-none transition-colors focus:border-primary"
												>
													{phoneCodes.map((code) => (
														<option key={code} value={code}>
															{code}
														</option>
													))}
												</select>
												<Input
													id={field.name}
													type={field.type}
													placeholder={field.placeholder}
													className={`flex-1 ${fieldError ? "border-red-400 focus:border-red-500" : ""}`}
													{...register(field.name)}
												/>
											</div>
											<div className="min-h-[18px] pt-1">
												<InputErrorMessage msg={fieldError?.message} />
											</div>
										</div>
									);
								}

								return (
									<div key={field.name}>
										<label htmlFor={field.name} className="mb-1.5 block text-[12px] font-normal text-text-darker">
											{field.label}
										</label>
										<Input
											id={field.name}
											type={field.type}
											placeholder={field.placeholder}
											className={fieldError ? "border-red-400 focus:border-red-500" : ""}
											{...register(field.name)}
										/>
										<div className="min-h-[18px] pt-1">
											<InputErrorMessage msg={fieldError?.message} />
										</div>
									</div>
								);
							})}

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full rounded-md bg-primary py-3 text-[13px] font-medium text-white shadow-none transition-opacity hover:opacity-95"
							>
								{isSubmitting ? "Submitting..." : "Request Consultation"}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUsSection;
