import { MoreVertical, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";
import EditProfileModal from "../models/edit-profile-modal";
import CompleteProfileModal from "../models/complete-profile-model";
import { useStateContext } from "@/context/ContextProvider";
import { dressSizeName, getAge, getAttachmentURL } from "@/functions/Common";
import { ROLES } from "../../../../constants";

import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";

export default function ProfileCard({
  profileData,
  isComplete,
  progressValue,
}) {

  const {user,optionsInterest,optionsAvailableFor,languageOptions,getProvinceName, countries,nationalitiesList,eyeColorList } = useStateContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleDelete = async () => {
      
      try {
        const response = await axiosClient.post('/api/send-cancellation-request')
        if (response.data?.message) {
          toast.success(response.data.message,{
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          })
          // Optionally redirect or update UI
          // console.log('we re out')
                  // setUser(null)
                  // setToken(null)
                  // navigate('/login');
        } else {
          toast.info("Cancellation Request Sent",{
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          })
        }
      } catch (error) {
        console.error('Error cancelling account:', error);
        toast.error("Error Sending Request. Try again later.",{
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
  }
  // Calculate the stroke-dasharray and stroke-dashoffset for the progress ring
  const radius = 75; // Radius of the progress circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressValue / 100) * circumference;

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // handle upload or preview
    }
  };

  return (
    <div className=" lg:w-[387px] bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] py-6 lg:p-6">
      {/* More Button */}

      <div className="flex justify-end mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-6 h-6 text-[#090909]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"border-0 rounded-2xl p-2  font-bold leading-[100%] "}
          >
            <DropdownMenuItem onClick={() => setIsCompleteModalOpen(true)}>
              Edit Information
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className={"text-red-600 text-[14px]"}>
              Send Cancellation Request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {true ? (
            <>
              {/* Progress Ring */}
              <div className="absolute -inset-3">
                <svg
                  className="w-[162px] h-[162px] transform -rotate-90"
                  viewBox="0 0 162 162"
                >
                  {/* Background circle */}
                  <circle
                    cx="81"
                    cy="81"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="6"
                    fill="transparent"
                    className="opacity-30"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="81"
                    cy="81"
                    r={radius}
                    stroke="#8880FE"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
              </div>
              <div className="relative w-[140px] h-[140px] bg-white rounded-full overflow-hidden">
                <div className="absolute inset-[16px] bg-white rounded-full overflow-hidden">
                  <img
                    src={getAttachmentURL(user.profile_picture_id)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="w-[150px] h-[150px] border-12 border-[#CCCCCC4D] rounded-full flex items-center justify-center relative">
              <div className="w-28 h-28 bg-[#F3F3F5] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="54"
                  viewBox="0 0 55 54"
                  fill="none"
                >
                  <g opacity="0.1">
                    <path
                      d="M33.4921 24.6019C38.0372 25.9307 42.0293 28.6966 44.8702 32.4852C47.711 36.2738 49.2476 40.881 49.2496 45.6163H5.44141C5.44236 40.8807 6.97852 36.273 9.81951 32.4842C12.6605 28.6954 16.6532 25.9297 21.1989 24.6019L27.3455 33.8218L33.4921 24.6019ZM38.2976 12.7602C38.2976 15.6648 37.1437 18.4505 35.0898 20.5044C33.0359 22.5583 30.2502 23.7122 27.3455 23.7122C24.4409 23.7122 21.6552 22.5583 19.6012 20.5044C17.5473 18.4505 16.3935 15.6648 16.3935 12.7602C16.3935 9.85549 17.5473 7.0698 19.6012 5.01589C21.6552 2.96198 24.4409 1.80811 27.3455 1.80811C30.2502 1.80811 33.0359 2.96198 35.0898 5.01589C37.1437 7.0698 38.2976 9.85549 38.2976 12.7602Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </div>
            </div>
          )}
          {/* Plus Button */}
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleClick}
              className={`absolute bottom-0 ${
                "-right-2"
              } w-10 h-10 bg-[#090909] border-[6px] border-white rounded-full flex items-center justify-center`}
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </>
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-6 w-full">
          <h3 className="text-[24px] font-bold text-[#090909] tracking-[-0.04em] mt-2">
            {user.name}
          </h3>
          {true && (
            <>
              <p className="text-base font-normal text-[#090909]/70 tracking-[-0.02em] leading-[23px]">
                {user.profile.description}
              </p>
              <div className="w-full h-px bg-black/10"></div>
              {/* Interests */}
              {/* <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Personality and interests:
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-[#F3F3F5] hover:text-white hover:bg-black cursor-pointer rounded-full px-3 py-2 text-sm font-bold text-[#090909]  tracking-[-0.03em]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div> */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Personality and interests:
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {optionsInterest
                    .filter((item) =>
                      user.profile.personal_interests.includes(item.id)
                    )
                    .map((item) => (
                      <span
                        key={item.id}
                        className="bg-[#F3F3F5] rounded-full px-3 py-2 text-sm font-bold text-[#090909] tracking-[-0.03em]"
                      >
                        {item.name}
                      </span>
                    ))}
                </div>
              </div>

              <div className="w-full h-px bg-black/10"></div>
              {/* <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Available For
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {profileData.available_for.map((available_for, index) => (
                    <span
                      key={index}
                      className="bg-[#8880FE]  hover:bg-black cursor-pointer rounded-full px-3 py-2 text-sm font-bold text-white  tracking-[-0.03em]"
                    >
                      {available_for}
                    </span>
                  ))}
                </div>
              </div> */}
              {user.role === ROLES.HOSTESS && (
                <div className="space-y-4">
                  <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                    Available For
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {optionsAvailableFor
                      .filter((item) =>
                        user.profile.available_services.includes(item.id)
                      )
                      .map((item) => (
                        <span
                          key={item.id}
                          className="bg-[#8880FE] rounded-full px-3 py-2 text-sm font-bold text-white tracking-[-0.03em]"
                        >
                          {item.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              <div className="w-full h-px bg-black/10"></div>
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Languages
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {languageOptions
                    .filter(item => user.profile.my_languages.includes(item.id))
                    .map((item) => (
                      <span
                        key={item.id}
                        className="bg-[#F5F5F5] rounded-full px-3 py-2 text-sm font-bold text-[#090909] tracking-[-0.03em]"
                      >
                        {item.name}
                      </span>
                    ))}
                </div>
              </div>


              <div className="w-full h-px bg-black/10"></div>
              {/* Informations */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Informations
                </p>

                {profileData.information ? (
                  <ul className="space-y-1 text-sm px-10 text-[#090909] tracking-[-0.02em] leading-[23px]">
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Age</span>
                      <span>{getAge(user.dob)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Province</span>
                      <span className="">
                        {getProvinceName(user.profile.province_id)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Nationality</span>
                      <span className="">
                        {user.profile.nationality}
                      </span>
                    </li>
                    {/* <li className="flex items-center justify-between">
                      <span className="font-bold">Languages</span>
                      <span>
                        {profileData.information.languages.join(", ")}
                      </span>
                    </li> */}
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Height</span>
                      <span>{user.profile.height}cm</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Weight</span>
                      <span>{user.profile.weight}kg</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Shoe Size</span>
                      <span>{user.profile.shoe_size}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Dress Size</span>
                      <span>{dressSizeName(user.profile.dress_size)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Available for travel</span>
                      <span>{user.profile.travel_available ? "Yes" : "No"}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Telegram</span>
                      <span>{user.profile.telegram}</span>
                    </li>
                    
                  </ul>
                ) : (
                  <p className="text-sm font-normal text-[#090909]/40 tracking-[-0.02em] leading-[23px]">
                    No Informations
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => {
          setIsCompleteModalOpen(true);
          
        }}
        className="mt-10 text-[16px] font-bold tracking-[-0.03em]  capitalize mb-5 text-[#090909] mx-auto w-[90%] hover:text-white hover:bg-black  lg:w-[301px] h-[60px] bg-[#090909]/4 rounded-xl flex items-center justify-center"
      >
        add Informations
      </button>

      <CompleteProfileModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      />
    </div>
  );
}
