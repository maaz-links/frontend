//import Introimage from "/src/assets/images/intro.png"
import star from "/src/assets/images/intro-rating-star.svg";
import { useStateContext } from "../../../context/ContextProvider";

import { Link } from "react-router-dom";
import mobileImage from "/src/assets/images/for-hostess-hero-mobile.png";
import desktopImage from "/src/assets/images/for-hostess-hero-desktop.png";

function Hero() {
  const { token } = useStateContext();

  return (
    <>
      <div
        className="introduction bg-intro-mobile md:bg-intro-desktop card-box-into pt-[56px] rounded-4xl py-[95px] px-[20px] lg:px-[80px] 
      bg-white max-w-[1300px] m-auto mt-[28px] bg-cover bg-center
      h-1/2 flex md:block justify-center"
        style={{
          "--mobile-bg": `url(${mobileImage})`,
          "--desktop-bg": `url(${desktopImage})`,
        }}
      >
        <div className="card-intro max-w-full md:max-w-2/3 lg:max-w-1/2 flex flex-col items-center md:items-start text-center md:text-start">
          <h1 className="text-black mb-[15px] font-bold text-[32px] sm:text-[30px] lg:text-[45px]">
            Iscriviti a HostessForYou
          </h1>
          <p className="text-black text-[16px]   lg:text-[20px] font-[400] md:max-w-[500px]">
            <strong> Entra in un mondo di eleganza, rispetto e libertà secondo le tue regole. </strong>
          </p>

          <p className="py-3 text-[14px] md:text-[16px]">
          Scopri la piattaforma dedicata a hostess, accompagnatrici e donne indipendenti in cerca di esperienze esclusive, eleganti e su misura. HostessForYou è il punto d’incontro tra donne sofisticate, sicure di sé e professionali e clienti selezionati che desiderano compagnia per eventi di alto profilo, cene private o viaggi personalizzati.
          </p>

          <div className="intro-buttons flex items-center justify-between pt-[2em] gap-x-[40px]">
            {!token && (
              <>
                <Link
                  to="/sign-up"
                  className="btn hover:bg-[#8880FE] transition-colors bg-black btn-grad text-white block px-[40px] py-[20px] rounded-2xl text-[15px] md:text-[20px] font-[400] leading-[130%]"
                >
                  Crea il tuo profilo: è gratis!
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 flex-wrap justify-center md:gap-3 mt-7">
            <div className="flex gap-1">
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
            </div>
            <p className="text-black text-[12px] md:text-[14px] font-[400] md:max-w-[500px] ">
              Powered by Clixer - we build next community
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
