import { X } from "lucide-react";
import { useState } from "react";

export default function ProfileBanner({progressValue = 0, isCompleteModalOpen, setIsCompleteModalOpen }) {
  const [isVisible, setIsVisible] = useState((progressValue != 100));

  if (!isVisible) return null;
  return (
    <div className="  w-[98%]     mx-auto h-fit md:h-[125px] bg-[#8880FE] rounded-[20px] mt-2 ">
      {/* Content */}
      <div className="flex flex-col items-start md:flex-row md:justify-between px-4 gap-5 md:text-start text-center py-10 md:px-16 md:items-center h-full">
        <div className="  flex  flex-col gap-3">
          <h2 className="text-[20px]  md:text-[24px] font-bold  text-white  leading-[24px]">
            {`Il tuo profilo è completo al ${progressValue}%`}
          </h2>
          <p className="text-[16px] font-normal hidden md:block text-white tracking-[-0.02em] leading-[23px]">
            {"Completa il tuo profilo per aumentare la tua visibilità e ottenere più contatti."}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => setIsCompleteModalOpen(true)}
          className=" md:right-[40px] hover:bg-[#8880FE] hover:border-white border border-[#090909]  bg-[#090909] transition-colors rounded-xl px-7 py-3 h-[60px] flex items-center justify-center"
        >
          <span className="text-white  text-base font-normal tracking-[-0.03em] capitalize">
            {"Completa il tuo profilo"}
          </span>
        </button>
      </div>
      {/* Close Button */}
      <button
        className="absolute right-10 top-3 opacity-50"
        onClick={() => setIsVisible(false)}
      >
        <X className=" text-white" strokeWidth={2} />
      </button>
    </div>
  );
}
