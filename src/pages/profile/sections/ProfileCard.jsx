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
import { getAttachmentURL } from "@/functions/Common";
import { ROLES } from "../../../../constants";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import { Avatar } from "@/functions/Avatar";
import { ImageErrorMessages, ImageSuccessMessages } from "./Photos";
export default function ProfileCard({
  progressValue,
  isCompleteModalOpen, setIsCompleteModalOpen
}) {

  const {user,refreshUser,optionsInterest,optionsAvailableFor,languageOptions,getProvinceName, SocialLinks} = useStateContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

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

  const hasProfileInfo =
  user.profile?.province_id ||
  user.profile?.nationality ||
  
  (user.role === ROLES.HOSTESS &&
    (user.profile?.dress_size ||
      user.profile?.height ||
      user.profile?.shoe_size ||
      user.profile?.eye_color ||
      user.profile?.weight ||
     user.profile?.travel_available !== null ||
     SocialLinks.some((platform) => !!user.profile?.[platform.name]))
  );

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.slice(0, 1).forEach(file => {
      formData.append('images[]', file);
      formData.append('set_profile_picture', 1);
    });

    try {
      //setIsLoading(true);
      const response = await axiosClient.post('/api/attachments', formData);
      refreshUser();
      ImageSuccessMessages(response,toast)
    } catch (error) {
      ImageErrorMessages(error,toast)
    } finally {
      //setIsLoading(false);
    }
  };

  return (
    <div className=" bg-white rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-6">
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
        <Avatar 
          hasProfilePicture={true}
          profilePictureId={user.profile_picture_id}
          showProgressRing={true}
          progressValue={progressValue}
          showUploadButton={true}
          onImageUpload={handleImageUpload}
        />

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
              {user.role === ROLES.HOSTESS && (
                <>
              {(user.profile.personal_interests.length != 0) && <>
              <div className="w-full h-px bg-black/10"></div>
              {/* Interests */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Personality and Interests:
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
              </>}

              {(user.profile.available_services.length != 0) && <>
              <div className="w-full h-px bg-black/10"></div>
              
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
                </>}
                </>
              )}

              {(user.profile.my_languages.length != 0) && <><div className="w-full h-px bg-black/10"></div>
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
              </div></>}


              <div className="w-full h-px bg-black/10"></div>
              {/* Informations */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Informations
                </p>

              {hasProfileInfo ? (
                <ul className="space-y-1 text-sm px-10 text-[#090909] tracking-[-0.02em] leading-[23px]">
                  {user.profile?.province_id && (
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Province</span>
                      <span className="truncate max-w-[50%]">{getProvinceName(user.profile.province_id)}</span>
                    </li>
                  )}

                  {user.profile?.nationality && (
                    <li className="flex items-center justify-between">
                      <span className="font-bold">Nationality</span>
                      <span className="truncate max-w-[50%]">{user.profile.nationality}</span>
                    </li>
                  )}

                  

                  {user.role === ROLES.HOSTESS && (
                    <>
                      {user.profile?.shoe_size && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Shoe Size</span>
                          <span className="truncate max-w-[50%]">{user.profile.shoe_size}</span>
                        </li>
                      )}
                      {user.profile?.eye_color && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Eye Colour</span>
                          <span className="truncate max-w-[50%]">{user.profile.eye_color}</span>
                        </li>
                      )}
                      {user.profile?.height && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Height</span>
                          <span className="truncate max-w-[50%]">{user.profile.height}cm</span>
                        </li>
                      )}
                      {user.profile?.weight && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Weight</span>
                          <span className="truncate max-w-[50%]">{user.profile.weight}kg</span>
                        </li>
                      )}
                      {user.profile?.dress_size && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Dress Size</span>
                          <span className="truncate max-w-[50%]">{user.profile.dress_size}</span>
                        </li>
                      )}

                      {user.profile?.travel_available !== null && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Available for travel</span>
                          <span className="truncate max-w-[50%]">{user.profile.travel_available ? "Yes" : "No"}</span>
                        </li>
                      )}

                      {/* {user.profile?.telegram && (
                        <li className="flex items-center justify-between">
                          <span className="font-bold">Telegram</span>
                          <span className="truncate max-w-[50%]">{user.profile.telegram}</span>
                        </li>
                      )} */}
                      {SocialLinks.map((platform) => {
                        const value = user.profile?.[platform.name];

                        return value ? (
                          <li key={platform.name} className="flex items-center justify-between">
                            <span className="font-bold capitalize">{platform.label}</span>
                            <span className="truncate max-w-[50%]">{value}</span>
                          </li>
                        ) : null;
                      })}
                    </>
                  )}
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