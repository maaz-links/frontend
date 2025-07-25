import { useEffect, useState, useMemo, useRef } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { getAge, getAttachmentURL, getOnlineStatus } from "../functions/Common";
import { ROLES } from "../../constants";
import ReportUserButton from "../components/ReportUserButton";
import { ClipLoader } from "react-spinners";
import UnlockChatModal from "../components/common/unlock-chat-modal";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function UserProfile() {
  const openModal = (user) => {
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const {
    token,
    user,
    optionsInterest,
    optionsAvailableFor,
    profileTypeList,
    languageOptions,
    getProvinceName,
    SocialLinks,
  } = useStateContext();
  const [givenUser, setGivenUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlockChat, setUnlockChat] = useState(false);
  const [canReport, setCanReport] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const scrollRef = useRef(null);

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = token
      ? `/api/user-profile/${username}`
      : `/api/user-profile-guest/${username}`;
    axiosClient
      .get(url)
      .then((response) => {
        setGivenUser(response.data.user);
        setUnlockChat(response.data.unlockChat);
        setCanReport(response.data.canReport);
        setShowSocial(response.data.showSocial);
        console.log(url, response);
      })
      .catch((error) => {
        console.error("Error response:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [startSlideIndex, setStartSlideIndex] = useState(0);
  // Define slides using useMemo to compute only when givenUser changes
  const slides = useMemo(() => {
    if (!givenUser) {
      return [{ src: "/placeholder.svg" }]; // Fallback for when givenUser is null
    }
    return [
      {
        src:
          getAttachmentURL(givenUser.profile_picture_id) || "/placeholder.svg",
      },
      ...(givenUser.other_pics || []).map((id) => ({
        src: getAttachmentURL(id),
      })),
    ];
  }, [givenUser]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
        <ClipLoader color="black" size={50} />
      </div>
    );
  }

  if (!givenUser) {
    return (
      <>
        <Header />
        <div className=" pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px] mb-[400px]">
          Questo utente non esiste oppure ha il profilo nascosto.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen px-2">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex justify-between items-center ">
            {/* Back Button */}
       
       
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-black text-[16px] font-bold hover:text-gray-800 mb-4 sm:mb-8 text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>


            <div className="flex flex-col items-center py-2 ">
              <div>
              {/* Report Button */}
              {canReport && (
                // <div className="mt-6 sm:mt-8">
                <ReportUserButton userId={givenUser.id} />

                // </div>
              )}
              </div>
              <div className=" text-xs sm:text-sm text-gray-400">
                User ID: {givenUser.id}
              </div>
            </div>


          </div>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
            {/* Profile Image */}
            <div className="w-full md:w-[45%] xl:w-[672px] flex-shrink-0">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Profile Tags - Top */}
                                      <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
                                        {givenUser.role == ROLES.HOSTESS &&
                                        profileTypeList
                                          .filter((item) =>
                                            givenUser.profile.my_profile_types.includes(
                                              item.id
                                            )
                                          )
                                          .map((item) => (
                                            <span
                                              key={item.id}
                                              className="bg-black backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium"
                                            >
                                              {item.name}
                                            </span>
                                          ))  
                                        
                                        }
                                      </div>
                <img
                  src={
                    getAttachmentURL(givenUser.profile_picture_id) ||
                    "/placeholder.svg"
                  }
                  alt={givenUser.name}
                  className="w-full h-72 sm:h-80 md:h-60 xl:h-[526px] object-cover cursor-pointer"
                  onClick={() => {
                    setStartSlideIndex(0);
                    setIsLightboxOpen(true);
                  }}
                />
              </div>

              <div className="w-full hidden md:grid grid-cols-2 gap-1 md:gap-5 mt-3 ">
                {givenUser.other_pics.map((id, i) => (
                  <img
                    key={id ?? i}
                    src={getAttachmentURL(id)}
                    alt={`user-pic-${i + 1}`}
                    className="rounded-2xl md:h-60 w-full object-cover cursor-pointer"
                    onClick={() => {
                      setStartSlideIndex(i + 1);
                      setIsLightboxOpen(true);
                    }}
                  />
                ))}
              </div>

              <div className="relative block md:hidden mt-3">
                {/* Scroll container */}
                <div
                  ref={scrollRef}
                  className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth "
                >
                  {givenUser.other_pics.map((id, i) => (
                    <img
                      key={id ?? i}
                      src={getAttachmentURL(id)}
                      alt={`user-pic-${i + 1}`}
                      className="rounded-lg h-20 sm:h-24 w-[25%] flex-shrink-0 object-cover cursor-pointer"
                      onClick={() => {
                        setStartSlideIndex(i + 1);
                        setIsLightboxOpen(true);
                      }}
                    />
                  ))}
                </div>

                <span
                  className={`${
                    (givenUser.other_pics.length < 4 && "hidden"+ " md:hidden")
                  }`}
                >
                  {/* Left arrow */}
                  <button
                    onClick={() =>
                      scrollRef.current.scrollBy({
                        left: -100,
                        behavior: "smooth",
                      })
                    }
                    className="absolute -left-8 top-1/2 -translate-y-1/2   rounded-full p-1 z-10"
                  >
                    <ChevronLeftIcon className="w-8 h-8" />
                  </button>

                  {/* Right arrow */}
                  <button
                    onClick={() =>
                      scrollRef.current.scrollBy({
                        left: 100,
                        behavior: "smooth",
                      })
                    }
                    className="absolute -right-8 top-1/2 -translate-y-1/2   rounded-full p-1 z-10"
                  >
                    <ChevronRightIcon className="w-8 h-8" />
                  </button>
                </span>
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 relative pt-4 sm:pt-12">
              {/* Credit Badge - Top Left */}

              {token && user?.role === ROLES.KING && (
                <div className="absolute top-0 left-0 hidden md:block">
                  <div className="bg-black text-white px-3 sm:px-2 py-1 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                    <strong>{user.profile.credits} Crediti</strong>
                  </div>
                </div>
              )}

              <div className="my-3">
                {/* Name with Green Dot and Age */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 flex   items-center">
                  <div className="flex items-center">
                    {givenUser.name}
                    {getOnlineStatus(givenUser) ? (
                      <span className="w-2 h-2 bg-green-500 rounded-full mx-2"></span>
                    ) : (
                      <span className="w-2 h-2 bg-none rounded-full mx-2"></span>
                    )}
                  </div>
                  <span className="text-black text-[20px]  font-medium md:mt-1 sm:mt-0">
                    ({getAge(givenUser.dob)}
                    anni)
                  </span>
                </h1>

                {/* Location */}

                <div className="flex flex-row   gap-5">
                  {token && user?.role === ROLES.KING && (
                    <div className="w-fit  md:hidden">
                      <div className="bg-black text-white px-3 sm:px-2 py-2 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                        <strong>{user.profile.credits} Crediti</strong>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center flex-row text-black text-[14px] sm:text-[16px] font-[400]">
                    <svg
                      className="w-6 h-6 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getProvinceName(givenUser.profile.province_id)}
                  </div>

                </div>
              </div>

              {/* About Me */}
              {givenUser.profile.description && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-black mb-3">
                    Su di me
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {givenUser.profile.description}
                  </p>
                </div>
              )}

              {givenUser.role === ROLES.HOSTESS && (
                <>
                  {/* Available for */}
                  {givenUser.profile.available_services?.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                        Disponibile per
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {optionsAvailableFor
                          .filter((item) =>
                            givenUser.profile.available_services.includes(
                              item.id
                            )
                          )
                          .map((item) => (
                            <span
                              key={item.id}
                              className="bg-[#8880FE] hover:bg-black text-white px-3 py-2 font-bold rounded-full text-[12px] sm:text-[14px]"
                            >
                              {item.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Personality and interests */}
                  {givenUser.profile.personal_interests?.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                        Personalità e interessi:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {optionsInterest
                          .filter((item) =>
                            givenUser.profile.personal_interests.includes(
                              item.id
                            )
                          )
                          .map((item) => (
                            <span
                              key={item.id}
                              className="bg-[#F3F3F5] text-black px-3 py-2 rounded-full text-xs"
                            >
                              {item.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              {/* Informations */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-[18px] sm:text-[20px] font-bold leading-[24px] text-gray-900 mb-4">
                  Informazioni
                </h3>
                <div className="space-y-3">
                  {givenUser.profile.nationality && (
                    <div className="flex justify-between text-sm">
                      <span className="text-black text-[14px] sm:text-[16px] font-bold">
                        Nazionalità
                      </span>
                      <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px]">
                        {capitalizeFirstLetter(givenUser.profile.nationality)}
                      </span>
                    </div>
                  )}

                  

                  {givenUser.profile.my_languages?.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-black text-[14px] sm:text-[16px] font-bold">
                        Lingue
                      </span>
                      <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px] text-right">
                        {languageOptions
                          .filter((item) =>
                            givenUser.profile.my_languages.includes(item.id)
                          )
                          .map((item) => item.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  
                  {givenUser.role === ROLES.HOSTESS && (
                    <>

                      {givenUser.profile.shoe_size && (
                        <div className="flex justify-between text-sm">
                          <span className="text-black text-[14px] sm:text-[16px] font-bold">
                          Misura della scarpa
                          </span>
                          <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px]">
                            {givenUser.profile.shoe_size}
                          </span>
                        </div>
                      )}
                      
                      {givenUser.profile.eye_color && (
                        <div className="flex justify-between text-sm">
                          <span className="text-black text-[14px] sm:text-[16px] font-bold">
                          Colore degli occhi
                          </span>
                          <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px]">
                            {capitalizeFirstLetter(givenUser.profile.eye_color)}
                          </span>
                        </div>
                      )}

                      {givenUser.profile.height && (
                        <div className="flex justify-between text-sm">
                          <span className="text-black text-[14px] sm:text-[16px] font-bold">
                          Altezza
                          </span>
                          <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px]">
                            {givenUser.profile.height}cm
                          </span>
                        </div>
                      )}

                      {givenUser.profile.weight && (
                        <div className="flex justify-between text-sm">
                          <span className="text-black text-[14px] sm:text-[16px] font-bold">
                            Peso
                          </span>
                          <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px]">
                            {givenUser.profile.weight}kg
                          </span>
                        </div>
                      )}

                      {givenUser.profile.dress_size && (
                        <div className="flex justify-between text-sm">
                          <span className="text-black text-[14px] sm:text-[16px] font-bold">
                            Taglia dell'abbigliamento
                          </span>
                          <span className="text-gray-900 truncate max-w-[50%]  text-[14px] sm:text-[16px]">
                            {givenUser.profile.dress_size}
                          </span>
                        </div>
                      )}

                      {givenUser.profile.travel_available !== null && (
                        <div className="flex justify-between text-sm">
                          <span className="text-black text-[14px] sm:text-[16px] font-bold">
                            Disponibile a viaggiare
                          </span>
                          <span className="text-gray-900 truncate max-w-[50%] text-[14px] sm:text-[16px]">
                          {givenUser.profile.travel_available ? "Sì" : "No"}
                          </span>
                        </div>
                      )}

                      {showSocial && (
                        <>
                          {/* {givenUser.profile.telegram && (
                      <div className="flex justify-between text-sm">
                        <span className="text-black text-[14px] sm:text-[16px] font-bold">
                          Telegram
                        </span>
                        <span className="text-orange-500 text-[14px] sm:text-[16px]">
                          {givenUser.profile.telegram}
                        </span>
                      </div>
                    )} */}
                          {SocialLinks.map(({ name, label }) => {
                            const value = givenUser.profile?.[name];

                            return value ? (
                              <div
                                key={name}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-black capitalize text-[14px] sm:text-[16px] font-bold">
                                  {label}
                                </span>
                                <span className="text-orange-500 truncate max-w-[50%] text-[14px] sm:text-[16px]">
                                  {value.replace(/_/g, " ")}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {user && (
                <UnlockChatModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  userName={givenUser.name}
                  userId={givenUser.id}
                  coinCost={givenUser.profile.unlock_cost}
                  userBalance={user?.profile?.credits || 0}
                  userRole={user?.role}
                />
              )}

              {/* Start chat section */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Invia un messaggio a {givenUser.name}
                </h3>
                {unlockChat ? (
                  <button
                    onClick={() => openModal(givenUser)}
                    className="w-full bg-black  text-white py-4 px-4 sm:px-6 rounded-xl text-sm font-bold  transition-colors"
                  >
                    {user?.role == ROLES.KING ? (
                      <div className="flex  items-center gap-2 cursor-pointer justify-center text-[16px] font-bold">
                        {" "}
                        Sblocca la chat per
                        <div className="text-[#8880FE] ">
                          {givenUser.profile.unlock_cost} crediti
                        </div>
                      </div>
                    ) : (
                      "Invia un messaggio gratuito"
                    )}
                  </button>
                ) : (
                  <Link
                    to={`/chat?chat=${givenUser.name}`}
                    className="block w-full bg-black text-white py-4 px-4 sm:px-6 rounded-xl text-sm font-bold text-center hover:bg-[#8880FE] transition-colors"
                  >
                    Vai alla chat
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            slides={slides}
            startSlideIndex={startSlideIndex}
            index={startSlideIndex}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
