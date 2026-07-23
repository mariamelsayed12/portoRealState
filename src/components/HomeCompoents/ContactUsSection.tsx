import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Phone, ChevronDown } from "lucide-react";
import InputErrorMessage from "../Ui/InputErrorMessage";
import type { ContactUsFormValues } from "../../interfaces";
import { ContactUs_Schema } from "../../validation";
import { useTranslation } from "react-i18next";

const phoneCodes = ["Eg +000", "+20", "+971"];

const ContactUsSection = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormValues>({
    resolver: yupResolver(ContactUs_Schema) as any ,
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      phoneCountryCode: "Eg +000",
      phoneNumber: "",
      description: "",
    },
  });

  const getValidationError = (messageKey: string | undefined) => {
    if (!messageKey) return undefined;
    switch (messageKey) {
      case "Full name is required":
        return t("contactUs.validation.fullNameRequired");
      case "Country code is required":
        return t("contactUs.validation.phoneCountryCodeRequired");
      case "Phone number is required":
        return t("contactUs.validation.phoneNumberRequired");
      case "Phone number must contain only digits":
        return t("contactUs.validation.phoneNumberDigits");
      case "Phone number is too short":
        return t("contactUs.validation.phoneNumberShort");
      case "Phone number is too long":
        return t("contactUs.validation.phoneNumberLong");
      case "Description is required":
        return t("contactUs.validation.descriptionRequired");
      default:
        return t(messageKey);
    }
  };

  const onSubmit: SubmitHandler<ContactUsFormValues> = async () => {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } finally {
      setIsSubmitting(false);
    }
  }; 

  return (
    <section className="bg-[#f5f9fa] w-full px-6 sm:px-12 lg:px-[120px] py-[60px] overflow-x-hidden">

      <div className="mx-auto flex flex-col lg:flex-row justify-between items-start gap-[48px] w-full">
        
        {/* Left Side Content */}
        <div className="flex flex-col gap-[48px] justify-center w-full min-w-0 lg:flex-1 lg:max-w-[588px]">
          <div className="flex flex-col gap-[24px] items-start justify-center w-full">
            <h2 className="text-[28px] sm:text-[40px] font-medium text-[#141414] font-['Poppins'] leading-[normal]">
              {t("contactUs.heading")}
            </h2>
            <p className="text-[16px] font-normal text-[#464646] font-['Poppins'] leading-[normal] max-w-[436px]">
              {t("contactUs.subheading")}
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap gap-[24px] sm:gap-[93px] items-center">
            {/* Phone */}
            <div className="flex gap-[12px] items-center">
               <div className="bg-[#b9dbe5] rounded-full size-[44px] flex items-center justify-center text-[#1e8cab] shrink-0">
                <Phone className="size-[20px]" />
              </div>
              <a
                href="tel:+20113333333"
                className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal] hover:underline"
              >
                +20113333333
              </a>
            </div>

            {/* Email */}
            <div className="flex gap-[12px] items-center">
              <div className="bg-[#b9dbe5] rounded-full size-[44px] flex items-center justify-center text-[#1e8cab] shrink-0">
                <Mail className="size-[20px]" />
              </div>
              <a
                href="mailto:elahdd@email.com"
                className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal] hover:underline"
              >
                elahdd@email.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="bg-white p-[16px] rounded-[12px] shadow-[0px_2px_6.3px_1px_rgba(0,0,0,0.14)] w-full min-w-0 lg:flex-1 lg:max-w-[588px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[32px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
              
              {/* Full Name Input */}
              <div className="flex flex-col gap-[8px] w-full">
                <label htmlFor="fullName" className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
                  <span>{t("contactUs.fullName")}</span>
                  <span className="text-[#1e8cab] ml-[2px]">*</span>
                </label>
                <div className="w-full">
                  <input
                    id="fullName"
                    type="text"
                    placeholder={t("contactUs.fullNamePlaceholder")}
                    className={`h-[48px] w-full bg-white border rounded-[8px] px-[12px] text-[16px] text-[#141414] font-['Poppins'] outline-none transition-colors ${
                      errors.fullName ? "border-red-400 focus:border-red-500" : "border-[#d4d5d8] focus:border-[#1e8cab]"
                    }`}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <div className="pt-1 ">
                      <InputErrorMessage msg={getValidationError(errors.fullName.message)} />
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="flex flex-col gap-[8px] w-full h-[80px]">
                <label htmlFor="phoneNumber" className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
                  <span>{t("contactUs.phoneNumber")}</span>
                  <span className="text-[#1e8cab] ml-[2px]">*</span>
                </label>
                <div className="w-full">
                  <div className="flex gap-[8px] items-stretch w-full h-[48px]">
                    {/* Country Code Selector */}
                    <div className="relative shrink-0 w-[108px] h-full">
                      <select
                        id="phoneCountryCode"
                        className="w-full h-full border border-[#d4d5d8] rounded-[8px] pl-[12px] pr-[28px] bg-white text-[13px] text-[#464646] font-['Poppins'] outline-none cursor-pointer appearance-none"
                        {...register("phoneCountryCode")}
                      >
                        {phoneCodes.map((code) => {
                          let label = code;
                          if (code === "Eg +000") label = t("contactUs.phoneCodes.eg");
                          else if (code === "+20") label = t("contactUs.phoneCodes.eg20");
                          else if (code === "+971") label = t("contactUs.phoneCodes.uae");
                          return (
                            <option key={code} value={code}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[16px] text-[#464646] pointer-events-none" />
                    </div>

                    {/* Number Input */}
                    <input
                      id="phoneNumber"
                      type="tel"
                      dir="ltr"
                      placeholder={t("contactUs.phoneNumberPlaceholder")}
                      className={`flex-1 h-full min-w-0 bg-white border rounded-[8px] px-[12px] text-[16px] text-[#141414] font-['Poppins'] outline-none transition-colors text-left ${
                        errors.phoneNumber ? "border-red-400 focus:border-red-500" : "border-[#d4d5d8] focus:border-[#1e8cab]"
                      }`}
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <div className="pt-1 ">
                      <InputErrorMessage msg={getValidationError(errors.phoneNumber.message)} />
                    </div>
                  )}
                </div>
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-[8px] w-full h-[125px]">
                <label htmlFor="description" className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
                  {t("contactUs.description")}
                </label>
                <div className="w-full h-[93px]">
                  <textarea
                    id="description"
                    placeholder={t("contactUs.descriptionPlaceholder")}
                    className={`h-full w-full bg-white border rounded-[8px] p-[12px] text-[16px] text-[#747474] font-['Poppins'] outline-none resize-none transition-colors ${
                      errors.description ? "border-red-400 focus:border-red-500" : "border-[#d4d5d8] focus:border-[#1e8cab]"
                    }`}
                    {...register("description")}
                  />
                  {errors.description && (
                    <div className="pt-1">
                      <InputErrorMessage msg={getValidationError(errors.description.message)} />
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1e8cab] hover:bg-[#1a7a96] text-[#f5f6fa] h-[48px] rounded-[12px] flex items-center justify-center text-[16px] font-medium font-['Poppins'] cursor-pointer transition-colors duration-200"
            >
              {isSubmitting ? t("contactUs.submitting") : t("contactUs.submit")}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUsSection;
