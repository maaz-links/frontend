import { useState } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStateContext } from "@/context/ContextProvider";
import { DateOfBirthInput } from "@/pages/CreatSignup";
const EditProfileModal = ({ isOpen, onClose }) => {

  const {profileTypeList, user} = useStateContext();
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
                    value={user.name}
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
                    value={user.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                </div>
              </div>
              {true && <>
                              <div className="text-base font-bold tracking-[-0.03em] text-[#090909]">I am a</div>
                              <div className="flex flex-wrap">
                                {profileTypeList.map((type) => (
                                  <div key={type.id} className="inline-flex items-center mr-5 mb-3">
                                    <input
                                      type="checkbox"
                                      id={`profile-type-${type.id}`}
                                      // checked={selectedIds.includes(type.id)}
                                      // onChange={() => handleCheckboxChange(type.id)}
                                      className="mr-2 w-[25px] aspect-square appearance-none bg-gray-300 rounded focus:outline-none csshecked:bg-blue-500"
                                    />
                                    <label htmlFor={`profile-type-${type.id}`} className="ml-2">
                                      {type.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </>}
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
        <style jsx>{`
                input[type="checkbox"] {
                  appearance: none;
                  position: relative;
                }
                input[type="checkbox"]:checked::after {
                  content: "✔";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: #000;
                  font-size: 14px;
                }
              `}</style>
      </ScrollArea>
    </div>
  );
};

export default EditProfileModal;
