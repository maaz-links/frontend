import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useStateContext } from "@/context/ContextProvider";
import EditProfileModal from "../models/edit-profile-modal";
import { useState } from "react";
import ChangePasswordModal from "../models/change-password-modal";
import DateOfBirthInput from "@/functions/DateOfBirthInput";

export default function PersonalDataSection() {

  const {user} = useStateContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [changePassModalOpen, setChangePassModalOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)]  p-3 py-10 md:p-10 space-y-6 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#090909] tracking-[-0.04em]">
          Dati Personali
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="  text-[#090909]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={
              "border-0 rounded-2xl p-2  font-bold leading-[100%] "
            }
          >
            <DropdownMenuItem onClick={() => setIsEditModalOpen(true)} className={" text-center"}>Modifica Informazioni Personali</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChangePassModalOpen(true)} className={" text-center"}>Cambia Password</DropdownMenuItem>
          </DropdownMenuContent>
          
        </DropdownMenu>
      </div>

      <div className="space-y-[18px] max-w-[420px]">
        {/* Name */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
            Nome (o nickname)
          </label>
          <input
            type="text"
            value={user.name}
            placeholder={user.name}
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
            readOnly
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-3   ">
          <label className="text-base  font-bold text-[#090909] tracking-[-0.03em]">
          Data di nascita
          </label>
          {/* <div className="flex gap-3 md:gap-[18px] flex-wrap md:flex-nowrap">
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
          </div> */}
          <DateOfBirthInput isReadOnly={true} initialValues={user.dob} fieldClass="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent text-black/80" />
        </div>

        {/* Mobile Phone */}
        <div className="space-y-3">
          <label className="text-base font-bold text-[#090909] tracking-[-0.03em]">
          Telefono cellulare
          </label>
          <input
            type="text"
            value={user.phone}
            placeholder={user.phone}
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
            value={user.email}
            readOnly
            placeholder={user.email}
            className="w-full h-[55px] border border-[rgba(12,16,56,0.22)] rounded-xl px-6 py-4 text-base font-medium text-black/80 tracking-[-0.03em] backdrop-blur-[12.5px]"
          />
        </div>

      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <ChangePasswordModal
        isOpen={changePassModalOpen}
        onClose={() => setChangePassModalOpen(false)}
      />
    </div>
  );
}
