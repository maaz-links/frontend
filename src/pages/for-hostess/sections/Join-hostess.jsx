import React from "react";
import { Link } from "react-router-dom";
import HostessImage from "/src/assets/images/servic3.png";
import WingWomanImage from "/src/assets/images/servic2.png";
import SugarBabyImage from "/src/assets/images/servic1.png";
import mobileImage from "/src/assets/images/joinnow-mobile.png";
import desktopImage from "/src/assets/images/joinnow-desktop.png";

function JoinHostess() {
  const services = [
    {
      title: "Hostess",
      description:
        "Attend events, dinners, or private gatherings with a polished, professional presence.",
      image: HostessImage,
    },
    {
      title: "Wing Woman",
      description:
        "Navigate social environments with confidence and support; impress at business mixers or casual parties.",
      image: WingWomanImage,
    },
    {
      title: "Sugar Baby",
      description:
        "Engage in mutually beneficial relationships with clarity, honesty, and discretion.",
      image: SugarBabyImage,
    },
  ];

  return (
    <div className="mb-10 md:px-4 px-1">
      {/* Desktop */}
      <div className="hidden md:block mt-9 px-6 max-w-[1300px] m-auto ">
        <div
          className="min-h-[300px] p-6 lg:p-10 flex flex-wrap justify-between items-center rounded-3xl"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full md:w-1/2 text-center md:text-start">
            <h1 className="text-white mb-4 font-bold text-3xl lg:text-[35px]">
              Join HostessForYou
            </h1>
            <p className="text-white text-sm lg:text-[14px] font-[400] md:max-w-[500px]">
              A job you can do in your free time that allows you to meet new
              people and visit new places. Accompany clients and offer your
              company in exchange for a fee agreed directly with them.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0">
            <Link
              to="/sign-up"
              className="btn bg-white text-black px-10 py-5 rounded-2xl text-base font-[600] leading-[130%]"
            >
              Create your profile for free
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden mt-9 max-w-[1300px] m-auto ">
        <div
          className="min-h-[300px] p-8 flex flex-col items-center pt-16 rounded-3xl "
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-white font-bold text-3xl text-center">
            Join HostessForYou
          </h1>
          <p className="text-white text-sm font-[400] text-center mt-4">
            A job you can do in your free time that allows you to meet new
            people and visit new places. Accompany clients and offer your
            company in exchange for a fee agreed directly with them.
          </p>
          <Link
            to="/sign-up"
            className="btn bg-white text-black px-10 py-4 rounded-2xl mt-6 text-base font-[600] leading-[130%]"
          >
            Create your profile for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JoinHostess;