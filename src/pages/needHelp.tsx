import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import contactUsImg from "../assets/contactUs.png";
import CustomShapeForContact from "../components/icons/CustomShapforContact";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import Button from "../components/Ui/Button";
import InputErrorMessage from "../components/Ui/InputErrorMessage";
import { ContactUs_Schema } from "../validation";

interface ContactUsFormData {
  fullName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  description: string;
}

const NeedHelpPage = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsFormData>({
    resolver: yupResolver(ContactUs_Schema) as any,
    defaultValues: {
      fullName: "",
      phoneCountryCode: "+20",
      phoneNumber: "",
      description: "",
    },
  });

  const onSubmit = async (data: ContactUsFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact form submitted:", data);
      toast.success(t("needHelp.successMessage"));
      reset();
    } catch (error) {
      console.error(error);
      toast.error(t("needHelp.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getValidationError = (msg?: string) => {
    if (!msg) return "";
    switch (msg.toLowerCase()) {
      case "full name is required":
        return t("needHelp.validation.fullNameRequired");
      case "country code is required":
        return t("needHelp.validation.phoneCountryCodeRequired");
      case "phone number is required":
        return t("needHelp.validation.phoneNumberRequired");
      case "phone number must contain only digits":
        return t("needHelp.validation.phoneNumberDigits");
      case "phone number is too short":
        return t("needHelp.validation.phoneNumberShort");
      case "phone number is too long":
        return t("needHelp.validation.phoneNumberLong");
      case "description is required":
        return t("needHelp.validation.descriptionRequired");
      default:
        return msg;
    }
  };

  const getPhoneCodeLabel = (code: string) => {
    switch (code) {
      case "+20":
        return `${t("needHelp.phoneCodes.eg")} ${code}`;
      case "+966":
        return `${t("needHelp.phoneCodes.ksa")} ${code}`;
      case "+971":
        return `${t("needHelp.phoneCodes.uae")} ${code}`;
      case "+44":
        return `${t("needHelp.phoneCodes.uk")} ${code}`;
      case "+1":
        return `${t("needHelp.phoneCodes.us")} ${code}`;
      default:
        return code;
    }
  };

  return (
    <div className="bg-[#f5f9fa] w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Centered Content Area with fixed height on desktop */}
      <div className="relative w-full max-w-[1440px] mx-auto flex-1 flex items-center justify-center pt-28 pb-16 lg:pt-0 lg:pb-0 lg:h-[725px] shrink-0">
        <div className="w-full flex flex-col lg:flex-row lg:absolute lg:top-[140px] lg:left-0 lg:right-0 lg:px-[120px] lg:justify-between lg:items-center gap-12 lg:gap-6 px-6 max-w-xl lg:max-w-none mx-auto">
          {/* Left Column - Illustration & Text */}
          <div className="flex flex-col items-center text-center lg:w-[588px] shrink-0 gap-[40px]">
            {/* Custom Shape Wrapper with wood blocks image */}
            <div className="relative w-full max-w-[588px] aspect-[588/260] shrink-0 select-none">
              <CustomShapeForContact className="absolute inset-0 w-full h-full" />
              <img
                src={contactUsImg}
                alt={t("needHelp.hero.imageAlt")}
                className="absolute left-[9%] top-[5.76%] w-[81.8%] h-[89.2%] object-contain"
              />
            </div>

            {/* Heading & Subtitle */}
            <div className="flex flex-col gap-[24px] items-center">
              <h1 className="font-['Poppins'] font-medium text-[28px] sm:text-[34px] lg:text-[40px] leading-normal text-[#141414]">
                {t("needHelp.hero.title")}
              </h1>
              <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] text-[#464646] leading-normal max-w-[436px]">
                {t("needHelp.hero.subtitle")}
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 lg:gap-[93px] justify-center items-center w-full">
              {/* Phone Link */}
              <a
                href="tel:+20113333333"
                className="flex gap-[12px] items-center select-none hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <div className="bg-[#B9DBE5] rounded-[99px] size-[44px] flex items-center justify-center text-[#141414] group-hover:bg-[#a3ccd9] transition-colors shrink-0">
                  <Phone className="w-[20px] h-[20px]" />
                </div>
                <p className="font-['Poppins'] font-normal text-[16px] text-[#141414] select-none">
                  +20113333333
                </p>
              </a>

              {/* Email Link */}
              <a
                href="mailto:elahdd@email.com"
                className="flex gap-[12px] items-center select-none hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <div className="bg-[#B9DBE5] rounded-[99px] size-[44px] flex items-center justify-center text-[#141414] group-hover:bg-[#a3ccd9] transition-colors shrink-0">
                  <Mail className="w-[20px] h-[20px]" />
                </div>
                <p className="font-['Poppins'] font-normal text-[16px] text-[#141414] select-none">
                  elahdd@email.com
                </p>
              </a>
            </div>
          </div>

          {/* Right Column - Request Form */}
          <div className="w-full lg:w-[588px] bg-white rounded-[12px] p-[16px] shadow-[0px_2px_6.3px_1px_rgba(0,0,0,0.14)] shrink-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[32px]"
            >
              <div className="flex flex-col gap-[16px]">
                {/* Full Name Field */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-['Poppins'] font-normal text-[16px] text-[#141414]">
                    {t("needHelp.form.fullName")}
                    <span className="text-[#1E8CAB] font-bold ml-0.5 rtl:mr-0.5">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t("needHelp.form.fullNamePlaceholder")}
                    {...register("fullName")}
                    className={`h-[48px] rounded-[8px] border px-[12px] text-[16px] font-['Poppins'] ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#1E8CAB] focus:border-[#1E8CAB]"
                    }`}
                  />
                  <InputErrorMessage msg={getValidationError(errors.fullName?.message)} />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-[8px] h-auto">
                  <label className="font-['Poppins'] font-normal text-[16px] text-[#141414]">
                    {t("needHelp.form.phoneNumber")}
                    <span className="text-[#1E8CAB] font-bold ml-0.5 rtl:mr-0.5">*</span>
                  </label>
                  <div className="flex gap-[8px] h-[48px]">
                    {/* Prefix selector */}
                    <div className="relative w-[108px] shrink-0">
                      <select
                        {...register("phoneCountryCode")}
                        className="h-full w-full appearance-none rounded-[8px] border border-[#D4D5D8] bg-white pl-[12px] pr-8 rtl:pr-[12px] rtl:pl-8 text-[14px] font-['Poppins'] text-[#464646] outline-none focus:border-[#1E8CAB] cursor-pointer"
                      >
                        {["+20", "+966", "+971", "+44", "+1"].map((code) => (
                          <option key={code} value={code}>
                            {getPhoneCodeLabel(code)}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-[12px] rtl:left-[12px] rtl:right-auto top-1/2 -translate-y-1/2">
                        <ChevronDown className="h-[20px] w-[20px] text-[#464646]" />
                      </div>
                    </div>

                    {/* Number input */}
                    <Input
                      type="tel"
                      dir="ltr"
                      placeholder={t("needHelp.form.phoneNumberPlaceholder")}
                      {...register("phoneNumber")}
                      className={`flex-1 h-full rounded-[8px] border px-[12px] text-[16px] font-['Poppins'] text-left ${
                        errors.phoneNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#D4D5D8] focus:border-[#1E8CAB]"
                      }`}
                    />
                  </div>
                  <InputErrorMessage msg={getValidationError(errors.phoneNumber?.message)} />
                </div>

                {/* Description Field */}
                <div className="flex flex-col gap-[8px]">
                  <label className="font-['Poppins'] font-normal text-[16px] text-[#141414]">
                    {t("needHelp.form.description")}
                  </label>
                  <Textarea
                    placeholder={t("needHelp.form.descriptionPlaceholder")}
                    {...register("description")}
                    className={`w-full rounded-[8px] border border-[#D4D5D8] px-[12px] py-[12px] text-[16px] font-['Poppins'] placeholder-[#747474] focus:border-[#1E8CAB] h-[93px] resize-none ${
                      errors.description
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                  />
                  <InputErrorMessage msg={getValidationError(errors.description?.message)} />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full h-[48px] rounded-[12px] bg-[#1E8CAB] text-[#F5F6FA] text-[16px] font-medium font-['Poppins'] hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? t("needHelp.form.submitting") : t("needHelp.form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelpPage;
