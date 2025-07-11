import { MoreVertical } from "lucide-react";

export default function PersonalDataSection({ personalData }) {
  return (
    <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-10 space-y-6 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">
          Personal Data
        </h3>
        <MoreVertical className="w-6 h-6 text-[#090909]" />
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
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909] tracking-[-0.03em] backdrop-blur-[12.5px]"
            readOnly
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
            Date of birth
          </label>
          <div className="flex gap-[18px]">
            <input
              type="text"
              value={personalData.dateOfBirth.day}
              className="w-[133px] h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909] tracking-[-0.03em] backdrop-blur-[12.5px]"
              readOnly
            />
            <input
              type="text"
              value={personalData.dateOfBirth.month}
              className="w-[133px] h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-bold text-[#090909] tracking-[-0.03em] backdrop-blur-[12.5px]"
              readOnly
            />
            <input
              type="text"
              value={personalData.dateOfBirth.year}
              className="w-[133px] h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909] tracking-[-0.03em] backdrop-blur-[12.5px]"
              readOnly
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
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909]/70 tracking-[-0.03em] backdrop-blur-[12.5px]"
            readOnly
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
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909] tracking-[-0.03em] backdrop-blur-[12.5px]"
            readOnly
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
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-[#090909]/70 tracking-[-0.03em] backdrop-blur-[12.5px]"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
