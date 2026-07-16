import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { ChevronDown } from "lucide-react";

import primaryImage from "../assets/HomePage/northcost.jpg";
import RectangleSellPage from "../components/icons/RectangleSellPage";
import Input from "../components/Ui/Input";
import Textarea from "../components/Ui/Textarea";
import Button from "../components/Ui/Button";
import InputErrorMessage from "../components/Ui/InputErrorMessage";
import { sellFormSchema } from "../validation";
import vectorImage from "../assets/Vector.svg";

interface SellFormData {
  fullName: string;
  phoneNumber: string;
  description: string;
}

const phoneCodes = ["+20", "+971", "+966", "+44", "+1"];

const SellPage = () => {
  const [prefix, setPrefix] = useState("+20");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellFormData>({
    resolver: yupResolver(sellFormSchema) as any,
    defaultValues: { fullName: "", phoneNumber: "", description: "" },
  });

  const onSubmit = async (data: SellFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Submit data:", { ...data, countryCode: prefix });
      toast.success("Consultation request submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F9FA] min-h-screen">
      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section className="relative w-full h-[280px] sm:h-[320px] lg:h-[364px] rounded-b-[60px] sm:rounded-b-[80px] lg:rounded-b-[99px] overflow-hidden bg-[#0c1618]">
        <img
          src={primaryImage}
          alt="Porto Sell Property"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-[120px] pt-16 sm:pt-20">
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#F5F9FA] font-['Poppins'] leading-normal">
            Sell your Property
          </h1>
          <p className="text-[14px] sm:text-[16px] text-[#F5F9FA] font-['Poppins'] font-normal mt-6 leading-normal">
            Join 1000+ property owners who trust our selling strategies.
          </p>
        </div>
      </section>

      {/* ─── Agents + Form Section ────────────────────────────── */}
      <section className="w-full bg-[#F5F9FA] px-6 sm:px-12 lg:px-[120px] py-[40px] sm:py-[50px] lg:py-[60px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[24px] w-full mx-auto">

          {/* Left — illustration + text */}
          <div className="flex flex-col items-center gap-[40px] w-full lg:w-[588px] shrink-0">
            {/* Building Illustration */}
            <div className="relative flex justify-center items-center w-full max-w-[400px] lg:w-[588px] h-[132px]">
              <RectangleSellPage className="absolute inset-0 w-full h-full" />
              <img
                src={vectorImage}
                alt="Building"
                className="absolute w-[60px] sm:w-[70px] h-auto"
              />
            </div>

            {/* Agent text */}
            <div className="flex flex-col gap-[24px] items-center text-center">
              <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#141414] font-['Poppins'] leading-normal whitespace-nowrap">
                Our Agents are waiting
              </h2>
              <p className="text-[14px] sm:text-[16px] text-[#464646] font-['Poppins'] font-normal leading-normal max-w-[436px]">
                Fill out the form and one of our agents will be
                <br className="hidden sm:block" /> in touch within 24 hours.
              </p>
            </div>
          </div>

          {/* Right — Form Card */}
          <div className="w-full lg:w-[588px] shrink-0 bg-white rounded-[12px] shadow-[0px_2px_6.3px_1px_rgba(0,0,0,0.14)] p-[16px]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[16px]">
                {/* Full Name */}
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[16px] font-normal font-['Poppins'] text-[#141414]">
                    Full Name<span className="text-[#1E8CAB]">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Input text"
                    {...register("fullName")}
                    className={`h-[48px] rounded-[8px] border px-[12px] text-[16px] font-['Poppins'] ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#1E8CAB] focus:border-[#1E8CAB]"
                    }`}
                  />
                  <InputErrorMessage msg={errors.fullName?.message} />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-[8px] h-auto">
                  <label className="text-[16px] font-normal font-['Poppins'] text-[#141414]">
                    Phone Number<span className="text-[#1E8CAB]">*</span>
                  </label>
                  <div className="flex gap-[8px] h-[48px]">
                    <div className="relative w-[108px] shrink-0">
                      <select
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="h-full w-full appearance-none rounded-[8px] border border-[#D4D5D8] bg-white pl-[12px] pr-8 text-[13px] font-['Poppins'] text-[#464646] outline-none focus:border-[#1E8CAB] cursor-pointer"
                      >
                        {phoneCodes.map((code) => (
                          <option key={code} value={code}>
                            Eg {code}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                        <ChevronDown className="h-[20px] w-[20px] text-[#464646]" />
                      </div>
                    </div>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      {...register("phoneNumber")}
                      className={`flex-1 h-full rounded-[8px] border px-[12px] text-[16px] font-['Poppins'] ${
                        errors.phoneNumber
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#D4D5D8] focus:border-[#1E8CAB]"
                      }`}
                    />
                  </div>
                  <InputErrorMessage msg={errors.phoneNumber?.message} />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[16px] font-normal font-['Poppins'] text-[#141414]">
                    Description
                  </label>
                  <Textarea
                    placeholder="Tell us more about your property type and location..."
                    {...register("description")}
                    className="rounded-[8px] border border-[#D4D5D8] px-[12px] py-[12px] text-[16px] font-['Poppins'] placeholder-[#747474] focus:border-[#1E8CAB] h-[93px] resize-none"
                  />
                  <InputErrorMessage msg={errors.description?.message} />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full h-[48px] rounded-[12px] bg-[#1E8CAB] text-[#F5F6FA] text-[16px] font-medium font-['Poppins'] hover:opacity-90 transition-opacity"
              >
                Request Consultation
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellPage;
