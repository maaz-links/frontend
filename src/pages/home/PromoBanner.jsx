import mobileImage from "/src/assets/images/hostess-bg-mobile.png";
import desktopImage from "/src/assets/images/hostess-bg-desktop.png";
import HostessImg from "/src/assets/images/hostess.png";
import { useNavigate } from "react-router-dom";

const PromoBanner = () => {

  const navigate = useNavigate();

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 ">
      <style>
        {`
          .promo-banner {
            background-image: var(--mobile-bg, linear-gradient(90deg, #6B46C1, #E6E6FA));
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            overflow: visible;
          }
          @media (min-width: 768px) {
            .promo-banner {
              background-image: var(--desktop-bg, linear-gradient(90deg, #6B46C1, #E6E6FA));
            }
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="relative overflow-visible rounded-[2rem] md:px-8 pt-12  md:py-16 flex flex-col md:flex-row items-center  promo-banner  md:h-fit "
          style={{
            "--mobile-bg": `url(${mobileImage})`,
            "--desktop-bg": `url(${desktopImage})`,
          }}
        >
          {/* Left Text */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left  ">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Are You a Hostess or Model?
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              HostessForYou invites you into a world of elegance, freedom, and
              meaningful encounters. As a hostess or companion, you embody
              sophistication and charm, attending elite events, forming genuine
              connections, and embracing a lifestyle beyond the ordinary.
            </p>
            <button onClick={() => navigate('/sign-up')} className="mt-6 px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-[#FFFFFF] hover:text-black hover:border transition">
              Create your profile for free
            </button>
          </div>

          {/* Right Image — Overflowing */}
          <div className="w-full md:w-1/2 relative     ">
            <img
              src={HostessImg}
              alt="Hostess or Model"
              className="md:absolute md:bottom-[-10rem]  md:right-[5rem] h-[392px]  w-[397.60546875px] md:w-[320px] lg:w-[370px] object-cover z-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;