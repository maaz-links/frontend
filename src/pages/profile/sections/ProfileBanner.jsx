"use client";

import { X } from "lucide-react";

export default function ProfileBanner({ isComplete, onToggleProfile }) {
  return (
    <div className="  w-[98%]     mx-auto h-fit lg:h-[125px] bg-[#8880FE] rounded-[20px] mt-2 ">

      {/* Content */}
      <div className="flex flex-col lg:flex-row justify-between px-4 gap-5 lg:text-start text-center py-10 lg:px-16 items-center h-full">
        <div className="  flex  flex-col gap-3">
          <h2 className="text-[24px] font-bold  text-white  leading-[24px]">
            {isComplete
              ? "Your profile is 50% complete"
              : "Complete Your Profile"}
          </h2>
          <p className="text-[16px] font-normal text-white tracking-[-0.02em] leading-[23px]">
            {isComplete
              ? "Complete it to unlock more contacts and increase your visibility."
              : "Stand out and attract more attention!"}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onToggleProfile}
          className=" lg:right-[40px] hover:bg-[#8880FE] hover:border-white hover:border  bg-[#090909] rounded-xl px-7 py-3 h-[60px] flex items-center justify-center"
        >
          <span className="text-white  text-base font-normal tracking-[-0.03em] capitalize">
            {isComplete ? "Finish Your Profile" : "Fill Out My Profile"}
          </span>
        </button>
      </div>
      {/* Close Button */}
      <button className="absolute right-10 top-3 opacity-50">
        <X className=" text-white" strokeWidth={2} />
      </button>
    </div>
  );
}
