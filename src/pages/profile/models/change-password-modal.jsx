import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ErrorText } from "../../../functions/Common";
import { toast } from "react-toastify";
import { useStateContext } from "@/context/ContextProvider";
import axiosClient from "../../../../axios-client";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { user } = useStateContext();
  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [personalData, setPersonalData] = useState({
    phone: '',
    email: '',
    dob: ''
  });

  useEffect(() => {
    if (user) {
      setPersonalData({
        phone: user.phone || '',
        email: user.email || '',
        dob: user.dob || ''
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    if (field in formData) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setPersonalData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosClient.post('/api/change-password', formData);
      if (response.data.success) {
        toast.success("Password cambiata con successo", {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setErrors({});
        setFormData({
          current_password: '',
          password: '',
          password_confirmation: ''
        });
        onClose();
      }
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
          {/* Close Button */}
          {/* <button
            onClick={onClose}
            className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center text-black hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button> */}

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
                Cambia password
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-[420px] p-1 flex flex-col gap-[18px] overflow-y-auto">

              {/* Password Section */}
              <div className="mt-6">
                

                {/* Current Password */}
                <div className="flex flex-col gap-3 mb-4">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Password attuale
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="current_password"
                      value={formData.current_password}
                      onChange={(e) => handleInputChange("current_password", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                    <ErrorText errors={errors} field="current_password" />
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-3 mb-4">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Nuova password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                    <ErrorText errors={errors} field="password" />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-3">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Conferma password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={(e) => handleInputChange("password_confirmation", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full max-w-[426px] h-[60px] bg-[#090909] hover:bg-[#8880FE] rounded-xl flex items-center justify-center text-base font-bold tracking-[-0.03em] text-white transition-colors mt-6"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChangePasswordModal;