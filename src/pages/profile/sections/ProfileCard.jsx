import { MoreVertical, Plus, User } from "lucide-react";

export default function ProfileCard({ profileData, isComplete }) {
  return (
    <div className="w-[387px]   bg-white   rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] p-6 ">
      {/* More Button */}
      <div className="flex justify-end mb-6">
        <MoreVertical className="w-6 h-6 text-[#090909]" />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {isComplete ? (
            <>
              {/* Profile Ring */}
              <div className="absolute -inset-6 bg-[#8880FE] rounded-full transform rotate-[60deg] opacity-80"></div>
              <div className="relative w-[122px] h-[122px] bg-gray-300/30 rounded-full overflow-hidden">
                <div className="absolute inset-[17px] bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src="/profile-placeholder.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="w-[150px] h-[150px]  border-12  border-[#CCCCCC4D] rounded-full flex items-center justify-center relative">
              <div className="w-28 h-28 bg-[#F3F3F5] rounded-full  flex items-center justify-center">
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
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#090909] border-[6px] border-white rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-6 w-full">
          <h3 className="text-[24px] font-bold text-[#090909] tracking-[-0.04em] mt-2">
            {profileData.name}
          </h3>

          {isComplete && (
            <>
              <p className="text-base font-normal text-[#090909]/70 tracking-[-0.02em] leading-[23px]">
                {profileData.description}
              </p>

              <div className="w-full h-px bg-black/10"></div>

              {/* Interests */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Personality and interests:
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-[#F3F3F5] rounded-full px-3 py-2 text-sm font-bold text-[#090909] tracking-[-0.03em]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-black/10"></div>
              <div className="w-full h-px bg-black/10"></div>

              {/* Informations */}
              <div className="space-y-4">
                <p className="text-base font-bold text-[#090909] tracking-[-0.03em]">
                  Informations
                </p>
                <p className="text-sm font-normal text-[#090909]/40 tracking-[-0.02em] leading-[23px]">
                  No Informations
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <button className="  mt-10 mb-5 text-[#090909]   mx-auto w-[301px] h-[60px] bg-[#090909]/4 rounded-xl flex items-center justify-center">
        <span className="text-[#090909]  text-[16px] font-bold  tracking-[-0.03em] capitalize">
          {isComplete ? "add Informations" : "fill out my profile"}
        </span>
      </button>
    </div>
  );
}
