import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { ChevronDown, Mail, Phone } from "lucide-react";
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
      toast.success("Thank you! Your help request has been submitted.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Information & Shape */}
          <div className="lg:col-span-7 flex flex-col items-center text-center">
            {/* Custom Shape Wrapper with wood blocks image */}
            <div className="relative flex justify-center items-center w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[588px] aspect-[588/261] mb-8 select-none">
              <CustomShapeForContact className="w-full h-full" />
              <img
                src={contactUsImg}
                alt="We are here to help blocks"
                className="absolute lg:w-[481px] w-[280.583px] h-[133.846px]  lg:h-[232px] object-contain top-[10%] lg:-top-[3%]"
              />
            </div>

            {/* Heading & Subtitle */}
            <h1 className="text-3xl sm:text-4xl font-semibold text-text-secondary leading-tight">
              We are here to help!
            </h1>
            <p className="text-sm sm:text-base text-[#58696F] max-w-md mt-4 leading-relaxed">
              Fill out the form and one of our agents will be in touch within 24 hours.
            </p>

            {/* Quick Contact Links */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center mt-10">
              <a
                href="tel:+20113333333"
                className="flex items-center gap-3 hover:text-primary transition-colors group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#E9F4F7] flex items-center justify-center text-primary group-hover:bg-[#d5e9ef] transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[15px] font-semibold text-[#141414] group-hover:text-primary transition-colors">
                  +20113333333
                </span>
              </a>

              <a
                href="mailto:elahdd@email.com"
                className="flex items-center gap-3 hover:text-primary transition-colors group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#E9F4F7] flex items-center justify-center text-primary group-hover:bg-[#d5e9ef] transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[15px] font-semibold text-[#141414] group-hover:text-primary transition-colors">
                  elahdd@email.com
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Request Form */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-[#E8EFF1] shadow-[0_10px_30px_rgba(73,95,104,0.06)] p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#141414] flex items-center">
                    Full Name
                    <span className="text-primary font-bold ml-0.5">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Input text"
                    {...register("fullName")}
                    className={`border-[#D9E1E4] focus:border-primary ${
                      errors.fullName ? "border-red-700 focus:border-red-700" : ""
                    }`}
                  />
                  <InputErrorMessage msg={errors.fullName?.message} />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#141414] flex items-center">
                    Phone Number
                    <span className="text-primary font-bold ml-0.5">*</span>
                  </label>
                  <div className="flex gap-3">
                    {/* Country Code Prefix */}
                    <div className="relative w-28 shrink-0">
                      <select
                        {...register("phoneCountryCode")}
                        className="h-11 w-full appearance-none rounded-md border border-[#D9E1E4] bg-white pl-3.5 pr-8 text-[14px] font-semibold text-text-darker outline-none transition-colors focus:border-primary cursor-pointer"
                      >
                        <option value="+20">Eg +20</option>
                        <option value="+966">Sa +966</option>
                        <option value="+971">Ae +971</option>
                        <option value="+44">Uk +44</option>
                        <option value="+1">Us +1</option>
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        <ChevronDown className="h-4 w-4 text-[#7D8D93]" />
                      </div>
                    </div>

                    {/* Number Input */}
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      {...register("phoneNumber")}
                      className={`border-[#D9E1E4] focus:border-primary ${
                        errors.phoneNumber ? "border-red-700 focus:border-red-700" : ""
                      }`}
                    />
                  </div>
                  <InputErrorMessage msg={errors.phoneNumber?.message} />
                </div>

                {/* Description Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#141414]">
                    Description
                  </label>
                  <Textarea
                    placeholder="Tell us more about your request..."
                    {...register("description")}
                    className={`border-[#D9E1E4] focus:border-primary ${
                      errors.description ? "border-red-700 focus:border-red-700" : ""
                    }`}
                  />
                  <InputErrorMessage msg={errors.description?.message} />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full rounded-xl bg-primary text-white font-bold hover:opacity-95 h-12 text-sm transition-opacity cursor-pointer"
                >
                  Request Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelpPage;
