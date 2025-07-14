import { useState } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
const EditProfileModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "Tom Jard",
    day: "13",
    month: "April",
    year: "1995",
    phone: "+38099277892",
    email: "tom@mail.com",
    password: "tom tom",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile data:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center ">
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
                Edit Information
              </h2>
            </div>

            {/* Form */}
            <div className="w-full max-w-[420px] p-1 flex flex-col gap-[18px] overflow-y-auto">
              {/* Name Field */}
              <div className="flex flex-col gap-3  ">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Name (or Nickname)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px]  border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Date of birth
                </label>
                <div className="flex gap-[18px]">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.day}
                      onChange={(e) => handleInputChange("day", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.month}
                      onChange={(e) =>
                        handleInputChange("month", e.target.value)
                      }
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) =>
                        handleInputChange("year", e.target.value)
                      }
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Mobile Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] opacity-70 focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent focus:opacity-100"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full max-w-[426px] h-[60px] bg-[#090909] hover:bg-[#8880FE] rounded-xl flex items-center justify-center text-base font-bold tracking-[-0.03em] text-white  transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditProfileModal;
