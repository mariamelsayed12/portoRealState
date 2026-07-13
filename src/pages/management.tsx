import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { ChevronDown } from "lucide-react";

import managementImage from "../assets/mangamentPage.jpg";
import RectangleSellPage from "../components/icons/RectangleSellPage";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import Button from "../components/Ui/Button";
import InputErrorMessage from "../components/Ui/InputErrorMessage";
import { sellFormSchema } from "../validation";
import 

interface SellFormData {
  fullName: string;
  phoneNumber: string;
  description: string;
}

const ManagementPage = () => {
  const [prefix, setPrefix] = useState("+20");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellFormData>({
    resolver: yupResolver(sellFormSchema) as any,
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      description: "",
    },
  });

  const onSubmit = async (data: SellFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Submit data:", {
        ...data,
        countryCode: prefix,
      });
      toast.success("Consultation request submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Finishing & design",
    "Rental marketing",
    "Guest management",
    "Ongoing maintenance",
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[380px] md:h-[420px] lg:h-[460px] rounded-b-[48px] md:rounded-b-[72px] lg:rounded-b-[80px] overflow-hidden bg-[#0c1618] z-10">
        <img
          src={managementImage}
          alt="Property Management Hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center pt-16">
          <div className="max-w-3xl">
            <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-white tracking-tight leading-[1.1] drop-shadow-md">
              Property Management
            </h1>
            {/* Pill Badges */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-6">
              {services.map((service) => (
                <span
                  key={service}
                  className="px-5 py-2.5 rounded-full border border-white/30 bg-white/10 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm select-none"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Agent Illustration */}
          <div className="flex flex-col items-center text-center">
            {/* Building Icon Container */}
            <div className="relative flex justify-center items-center w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px]">
              <RectangleSellPage className="w-full h-auto" />
              <img src={vector} alt="vector"   className="absolute text-primary w-14 sm:w-16 md:w-20 lg:w-24 h-auto" />
            </div>

            <h2 className="text-3xl md:text-[40px] font-bold text-text-secondary mt-8 leading-tight">
              Our Agents are waiting
            </h2>
            <p className="text-sm sm:text-base text-[#58696F] max-w-sm mt-4 leading-relaxed">
              Fill out the form and one of our agents will be in touch within 24
              hours.
            </p>
          </div>

          {/* Right Column - Consultation Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-white rounded-[24px] border border-[#E8EFF1] shadow-[0_10px_30px_rgba(73,95,104,0.06)] p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-secondary">
                    Full Name
                    <span className="text-primary font-semibold">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Input text"
                    {...register("fullName")}
                    className={`border-[#D9E1E4] focus:border-primary ${
                      errors.fullName ? "border-red-700" : ""
                    }`}
                  />
                  <InputErrorMessage msg={errors.fullName?.message} />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-secondary">
                    Phone Number
                    <span className="text-primary font-semibold">*</span>
                  </label>
                  <div className="flex gap-3">
                    {/* Country Code Prefix */}
                    <div className="relative w-28 shrink-0">
                      <select
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="h-11 w-full appearance-none rounded-md border border-[#D9E1E4] bg-white pl-3.5 pr-8 text-[14px] font-semibold text-text-darker outline-none transition-colors focus:border-primary cursor-pointer"
                      >
                        <option value="+20">Eg +000</option>
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
                        errors.phoneNumber ? "border-red-700" : ""
                      }`}
                    />
                  </div>
                  <InputErrorMessage msg={errors.phoneNumber?.message} />
                </div>

                {/* Description Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-secondary">
                    Description
                  </label>
                  <Textarea
                    placeholder="Tell us more about your property..."
                    {...register("description")}
                    className="border-[#D9E1E4] focus:border-primary"
                  />
                  <InputErrorMessage msg={errors.description?.message} />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full rounded-xl bg-primary text-white font-bold hover:opacity-95 h-12 text-sm transition-opacity"
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

export default ManagementPage;