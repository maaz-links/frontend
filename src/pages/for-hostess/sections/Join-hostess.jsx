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
    <div className="mb-10 px-2">
      <div className="hidden md:block mt-[35px] px-[25px] max-w-[1300px] m-auto ">
        <div
          className="h-[110vw] md:max-h-[300px] md:h-[23vw] p-15 md:p-10 lg:p-15 flex flex-wrap justify-between md:items-center"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="md:w-1/2 text-center md:text-start">
            <h1 className="text-white mb-[15px] font-bold text-[35px] md:text-[25px] lg:text-[35px]">
              Join HostessForYou
            </h1>
            <p className="text-white text-[14px] md:text-[12px]  lg:text-[14px] font-[400] md:max-w-[500px]">
              A job you can do in your free time that allows you to meet new
              people and visit new places. Accompany clients and offer your
              company in exchange for a fee agreed directly with them.
            </p>
          </div>
          <div className="md:w-2/5 flex flex-row-reverse justify-center items-center">
            <Link
              to="/sign-up"
              className="btn bg-white text-black px-[40px] mt-2 py-[20px] rounded-2xl text-[15px] md:text-[15px] font-[600] leading-[130%]"
            >
              Create your profile for free
            </Link>
          </div>
        </div>
      </div>

      {/* FOR MOBILE */}
      <div className=" md:hidden mt-[35px]  max-w-[1300px]  ">
        <div
          className="h-[120vw] md:max-h-[300px] md:h-[23vw] p-[10vw] md:p-10 lg:p-15 flex flex-wrap justify-between items-center"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className=" w-full h-[35vw] md:w-1/2 text-center md:text-start">
            <h1 className="text-white  font-bold text-[44px] md:text-[25px] lg:text-[35px] ">
              Join HostessForYou
            </h1>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-start">
            <p className="text-white text-[4vw] sm:text-[3vw] md:text-[12px]  lg:text-[14px] font-[400]">
              A job you can do in your free time that allows you to meet new
              people and visit new places. Accompany clients and offer your
              company in exchange for a fee agreed directly with them.
            </p>
          </div>
          <div className="w-full md:w-2/5 flex flex-row-reverse justify-center items-center">
            <Link
              to="/sign-up"
              className="btn bg-white text-black px-[40px] py-[20px] rounded-2xl mt-[5vw] text-[3vw] md:text-[15px] font-[600] leading-[130%]"
            >
              Create your profile for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinHostess;
