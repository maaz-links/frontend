import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function PersonalDataSection({ personalData }) {
  return (
    <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)]  p-3 py-10 md:p-10 space-y-6 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">
          Personal Data
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="  text-[#090909]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={
              "border-0  text-center  items-center  rounded-full font-bold  "
            }
          >
            <DropdownMenuItem className={" text-center"}>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-[18px] max-w-[420px]">
        {/* Name */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
            Name (or Nickname)
          </label>
          <input
            type="text"
            value={personalData.name}
            placeholder={personalData.name}
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
            readOnly
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-3   ">
          <label className="text-base  font-bold text-[#090909] tracking-[-0.03em]">
            Date of birth
          </label>
          <div className="flex gap-3 md:gap-[18px] flex-wrap md:flex-nowrap">
            <input
              type="text"
              value={personalData.dateOfBirth.day}
              readOnly
              placeholder={personalData.dateOfBirth.day}
              className="md:w-[133px]  w-24 h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
            />
            <input
              type="text"
              value={personalData.dateOfBirth.month}
              readOnly
              placeholder={personalData.dateOfBirth.month}
              className="md:w-[133px] w-24 h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-bold text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
            />
            <input
              type="text"
              value={personalData.dateOfBirth.year}
              readOnly
              placeholder={personalData.dateOfBirth.year}
              className="w-24 md:w-[133px] h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
            Mobile Phone
          </label>
          <input
            type="text"
            value={personalData.phone}
            placeholder={personalData.phone}
            readOnly
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909]/70 tracking-[-0.03em] backdrop-blur-[12.5px]"
          />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
            Email
          </label>
          <input
            type="email"
            value={personalData.email}
            readOnly
            placeholder={personalData.email}
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
          />
        </div>

        {/* Password */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
            Password
          </label>
          <input
            type="password"
            value={personalData.password}
            readOnly
            placeholder={personalData.password}
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
          />
        </div>
      </div>
    </div>
  );
}
