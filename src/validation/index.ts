import * as yup from "yup";

export const ContactUs_Schema = yup.object({
	fullName: yup.string().trim().required("Full name is required"),
	phoneCountryCode: yup.string().required("Country code is required"),
	phoneNumber: yup
		.string()
		.trim()
		.required("Phone number is required")
		.matches(/^[0-9]+$/, "Phone number must contain only digits")
		.min(7, "Phone number is too short")
		.max(15, "Phone number is too long"),
	description: yup.string().trim().required("Description is required"),
});

export const sellFormSchema = yup.object({
  fullName: yup
	.string()
	.required("Full Name is required")
	.min(3, "Full Name must be at least 3 characters"),
  phoneNumber: yup
	.string()
	.required("Phone Number is required")
	.matches(/^[0-9]+$/, "Phone number must be digits only")
	.min(8, "Phone number must be at least 8 digits"),
  description: yup.string().ensure(),
});

