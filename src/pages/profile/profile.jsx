import { useState } from "react";

import ProfileBanner from "./sections/ProfileBanner";
import ProfileCard from "./sections/ProfileCard";
import CreditsSection from "./sections/CreditsSection";
import ContactsSection from "./sections/ContactsSection";
import PersonalDataSection from "./sections/PersonalDataSection";
import PhotoGallery from "./sections/Photos";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function ProfilePage() {
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Sample data for full profile
  const profileData = {
    name: "Tom Jard",
    description:
      "Ciao, sono una giovane ragazza di 28 anni. Amo il mondo artistico, sono solare e passionale. Amo viaggiare",
    interests: ["Travel", "Books", "Books", "Cooking"],
    available_for: [
      "Model Photo",
      "Talk",
      "Dinners",
      "Fake Girlfriend",
      "Company",
    ],
    information: {
      age: 30,
      nationality: "Italian",
      languages: ["Italian", "English"],
      height: "160cm",
      shoeSize: 36,
    },
    credits: isProfileComplete ? 125 : 0,
    contacts: isProfileComplete
      ? [
          {
            name: "Kate",
            status: "Online 5 minutes ago",
            avatar: "/placeholder.svg?height=34&width=34",
          },
          {
            name: "Anna",
            status: "Online 5 minutes ago",
            avatar: "/placeholder.svg?height=34&width=34",
          },
          {
            name: "Melogy",
            status: "Online 5 minutes ago",
            avatar: "/placeholder.svg?height=34&width=34",
          },
          {
            name: "Luna",
            status: "Online 5 minutes ago",
            avatar: "/placeholder.svg?height=34&width=34",
          },
        ]
      : [],
    personalData: {
      name: "Tom Jard",
      dateOfBirth: { day: "13", month: "April", year: "1995" },
      phone: "+38099277892",
      email: "tom@mail.com",
      password: "tom tom",
    },
  };

  return (
    <>
      <Header />

      <div className="relative w-full max-w-[1440px] mx-auto px-4">
        {/* Profile Banner */}
        <ProfileBanner
          isComplete={isProfileComplete}
          onToggleProfile={() => setIsProfileComplete(!isProfileComplete)}
        />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 my-8 ">
          {/* Left Side - Profile Card */}
          <div className="w-full lg:w-[387px]">
            <ProfileCard
              profileData={profileData}
              isComplete={isProfileComplete}
              progressValue={50}
            />
          </div>
          {/* Right Side - Credits, Contacts, Personal Data */}
          <div className="flex-1 space-y-4">
            <CreditsSection credits={profileData.credits} />
            {isProfileComplete && <PhotoGallery />}

            <ContactsSection contacts={profileData.contacts} />
            <PersonalDataSection personalData={profileData.personalData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
