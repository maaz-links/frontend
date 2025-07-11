"use client"

import { X } from "lucide-react"

export default function ProfileBanner({ isComplete, onToggleProfile }) {
  return (
    <div className="relative w-full  mx-auto h-[125px] bg-[#8880FE] rounded-[20px] mt-2 overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute w-20 h-20 bg-white/25 rounded-full top-[25px] left-[664px]"></div>
      <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[73px] left-[734px]"></div>
      <div className="absolute w-20 h-[118px] bg-white/10 rounded-full top-[102px] left-[593px]"></div>
      <div className="absolute w-[61px] h-[118px] bg-white/10 rounded-full top-[-79px] left-[734px]"></div>
      <div className="absolute w-[61px] h-[60px] bg-white/10 rounded-full top-0 left-[603px]"></div>

      {/* Content */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <h2 className="text-[24px] font-bold  text-white  leading-[24px]">
          {isComplete ? "Your profile is 50% complete" : "Complete Your Profile"}
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
        className="absolute right-[40px] hover:bg-[#8880FE] hover:border-white hover:border top-1/2 -translate-y-1/2 bg-[#090909] rounded-xl px-7 py-3 h-[60px] flex items-center justify-center"
      >
        <span className="text-white  text-base font-normal tracking-[-0.03em] capitalize">
          {isComplete ? "Finish Your Profile" : "Fill Out My Profile"}
        </span>
      </button>

      {/* Close Button */}
      <button className="absolute right-4 top-3 opacity-30">
        <X className="w-[18px] h-[18px] text-white" strokeWidth={2} />
      </button>
    </div>
  )
}
