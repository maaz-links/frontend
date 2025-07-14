import { useState } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const CompleteProfileModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    about: "",
    nationality: "",
    languages: "",
    height: "",
    shoeSize: "",
    interests: [],
    availability: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleAvailabilityChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      availability: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 mt-2 shadow-2xl backdrop-blur bg-black/40 border" />

      <ScrollArea className="relative top-5 xl:top-10 w-full max-w-[506px] md:mx-4 overflow-y-auto h-full">
        <div className="bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-5 md:p-[50px_40px]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center text-black hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center gap-[26px]">
            <div className="text-center">
              <h2 className=" text-[28px] md:text-[32px] leading-[128%] font-bold tracking-[-0.06em] text-[#090909]">
                Complete Your Profile
              </h2>
            </div>

            <div className="w-full max-w-[420px] p-1 flex flex-col gap-[18px] overflow-y-auto">
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  About you
                </label>
                <textarea
                  value={formData.about}
                  placeholder="Text"
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  className="w-full h-[117px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Nationality
                </label>
                <input
                  placeholder="Text"
                  type="text"
                  value={formData.nationality}
                  onChange={(e) =>
                    handleInputChange("nationality", e.target.value)
                  }
                  className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Languages
                </label>
                <input
                  placeholder="Text"
                  type="text"
                  value={formData.languages}
                  onChange={(e) =>
                    handleInputChange("languages", e.target.value)
                  }
                  className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-3">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Height
                  </label>
                  <input
                    placeholder="Text"
                    type="text"
                    value={formData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Shoe size
                  </label>
                  <input
                    placeholder="Text"
                    type="text"
                    value={formData.shoeSize}
                    onChange={(e) =>
                      handleInputChange("shoeSize", e.target.value)
                    }
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Personality and interests:
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Travel", "Books", "Cooking"].map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestChange(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        formData.interests.includes(interest)
                          ? "bg-black text-white"
                          : "bg-white border border-[rgba(12,16,56,0.22)] text-[#090909]"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Available for
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Model Photo",
                    "Talk",
                    "Dinners",
                    "Fake Girlfriend",
                    "Company",
                    "Friendship",
                    "Dating",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAvailabilityChange(option)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        formData.availability === option
                          ? "bg-[#8880FE] text-white"
                          : "bg-white border border-[rgba(12,16,56,0.22)] text-[#090909]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full max-w-[426px] h-[60px] bg-[#090909] hover:bg-[#8880FE] rounded-xl flex items-center justify-center text-base font-bold tracking-[-0.03em] text-white transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CompleteProfileModal;
