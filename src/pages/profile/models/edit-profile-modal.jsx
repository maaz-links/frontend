import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ErrorText } from "../../../functions/Common";
import { toast } from "react-toastify";
import { useStateContext } from "@/context/ContextProvider";
import axiosClient from "../../../../axios-client";
import DateOfBirthInput from "@/functions/DateOfBirthInput";
import PhoneNumberInput from "@/functions/PhoneNumberInput";
import { allCountries } from 'country-telephone-data';

const EditProfileModal = ({ isOpen, onClose }) => {

  
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const { user, refreshUser } = useStateContext();
  const dobRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const fullPhone = user.phone || '';

      // Try to match the country dial code (remove `+` before comparing)
      const matchedCountry = allCountries.find(({ dialCode }) =>
        fullPhone.startsWith(`+${dialCode}`)
      );

      const code = matchedCountry?.dialCode || '1'; // fallback to '1'
      const number = fullPhone.replace(`+${code}`, ''); // remove the dial code

      setCountryCode(code);
      setPhoneNumber(number);
      console.log(code,number);

      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        dob: user.dob || ''
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullNumber = `+${countryCode}${phoneNumber}`;
    try {
      const response = await axiosClient.post('/api/update-personal',
        {
          name: formData.name,
          phone: fullNumber,
          dob: dobRef.current.getDate().formatted,
        }
      
      );
      // if (response.data.success) {
        
        refreshUser()
        
        toast.success("Profile updated successfully", {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setErrors({});
        onClose();
      // }
    } catch (error) {
      setErrors(error.response?.data?.formError || {});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 shadow-2xl backdrop-blur bg-black/40" />

      {/* Modal */}
      <ScrollArea className="relative w-full max-w-[506px] mx-4 overflow-y-auto h-full scrollbar-hide">
        <div className="bg-white relative rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] my-5 p-10 md:p-[50px_40px]">
          <button
            onClick={onClose}
            className="absolute end-5 top-5 w-6 h-6 flex items-center justify-center text-black hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          
          {/* Content */}
          <div className="flex flex-col items-center gap-[26px]">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-[32px] leading-[128%] font-bold tracking-[-0.06em] text-[#090909]">
                Edit Personal Info
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-[420px] p-1 flex flex-col gap-[18px] overflow-y-auto">
              {/* Name Field */}
              <div className="flex flex-col gap-3 mb-4">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                Name (or Nickname)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                  <ErrorText errors={errors} field="name" />
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={user.email}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-gray-400 focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>

              {/* Date of Birth Field */}
              
              {/* <div className="flex flex-col gap-3 mb-4">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                  <ErrorText errors={errors} field="dob" />
                </div>
              </div> */}

              <div className="flex flex-col gap-3 mb-4">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Date of Birth
                </label>
                <DateOfBirthInput ref={dobRef} initialValues={formData.dob} fieldClass="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent" />
                  <ErrorText errors={errors} field="dob" />
                </div>
              

              {/* Phone Field */}
              <div className="flex flex-col gap-3 mb-4">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Phone Number
                </label>
                <div className="relative">
                  {/* <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  /> */}
                  <PhoneNumberInput
                      countryCode={countryCode}
                      setCountryCode={setCountryCode}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      fieldClass={`h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent`}
                  />
                  <ErrorText errors={errors} field="phone" />
                </div>
              </div>

              

              {/* Save Button */}
              <button
                type="submit"
                className="w-full max-w-[426px] h-[60px] bg-[#090909] hover:bg-[#8880FE] rounded-xl flex items-center justify-center text-base font-bold tracking-[-0.03em] text-white transition-colors mt-6"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditProfileModal;