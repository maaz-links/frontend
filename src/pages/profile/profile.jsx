import { useState } from "react";

import ProfileBanner from "./sections/ProfileBanner";
import ProfileCard from "./sections/ProfileCard";
import CreditsSection from "./sections/CreditsSection";
import ContactsSection from "./sections/ContactsSection";
import PersonalDataSection from "./sections/PersonalDataSection";
import PhotoGallery from "./sections/Photos";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { useStateContext } from "@/context/ContextProvider";
import { ROLES } from "../../../constants";;

export default function ProfilePage() {
  const { user, backendConfigs } = useStateContext();
  
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const canUpload = (backendConfigs.image_limit_per_user - photos.length > 0);

  return (
    <>
      <Header />

      <div className="relative w-full max-w-[1440px] mx-auto px-4">
        {/* Profile Banner */}
        <ProfileBanner
          progressValue={user.profile.profile_completion}
          isCompleteModalOpen={isCompleteModalOpen} setIsCompleteModalOpen={setIsCompleteModalOpen}
        />

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 my-8 ">
          {/* Left Side - Profile Card */}
          <div className="w-full md:min-w-[287px] md:w-[287px] lg:w-[387px]">
            <ProfileCard
              progressValue={user.profile.profile_completion}
              canUpload={canUpload}
              isCompleteModalOpen={isCompleteModalOpen} setIsCompleteModalOpen={setIsCompleteModalOpen}
            />
          </div>
          {/* Right Side - Credits, Contacts, Personal Data */}
          <div className="flex-1 space-y-4">
            {user.role == ROLES.KING && <CreditsSection credits={user.profile.credits} />}
            <PhotoGallery photos={photos} setPhotos={setPhotos} canUpload={canUpload} />

            <ContactsSection/>
            <PersonalDataSection/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
