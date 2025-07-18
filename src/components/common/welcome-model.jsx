import { Link } from "react-router-dom";
import bgImageMale from "/src/assets/images/welcome-image-desktop-new.png"
import bgImageFemale from "/src/assets/images/for-hostess-hero-desktop.png"
import bgImageMaleMobile from "/src/assets/images/welcome-image-mobile-new.png"
import bgImageFemaleMobile from "/src/assets/images/for-hostess-hero-mobile.png"
import { useStateContext } from "@/context/ContextProvider";
import { ROLES } from "../../../constants";
const WelcomeModal = ({ isOpen, onClose }) => {

  const {user} = useStateContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50  backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="welcome-modal relative rounded-3xl p-12 max-w-[96%] md:max-w-[900px] w-full  bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: `url(${user?.role == ROLES.HOSTESS ? bgImageFemale : bgImageMale})`,
          
        //   //backgroundColor: 'gray'
        // }}
        style={{
                  "--mobile-bg": `url(${user?.role == ROLES.HOSTESS ? bgImageFemaleMobile : bgImageMaleMobile})`,
                  "--desktop-bg": `url(${user?.role == ROLES.HOSTESS ? bgImageFemale : bgImageMale})`,
                }}
      >
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-5 right-6 text-white hover:text-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}

        {/* Content */}
        <div className="w-full md:w-[65%]  pb-16 pt-5 md:px-7 flex flex-col items-start  ">
          <h2 className="text-3xl font-bold text-black mb-6">
            Welcome to Hostess for You!
          </h2>

          <p className="text-black text-opacity-90 mb-3 text-lg">
            Finish setting up your
            profile and begin engaging with others.
          </p>

          <Link to="/profile" onClick={onClose}
            className={` py-4 px-8 rounded-2xl font-semibold text-md sm:text-lg transition-all ${"bg-black text-white hover:bg-[#8880FE] active:scale-95"}`}
          >
            Fill out your profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
