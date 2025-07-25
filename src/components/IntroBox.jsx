import React from "react";
//import Introimage from "/src/assets/images/intro.png"
import star from "/src/assets/images/intro-rating-star.svg";
import HeartIcon from "/src/assets/images/heart.svg";
import WalletIcon from "/src/assets/images/Wallet.svg";
import MemberIcon from "/src/assets/images/Member.svg";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import mobileImage from "/src/assets/images/welcome-image-mobile-new.png";
import desktopImage from "/src/assets/images/welcome-image-desktop-new.png";

function IntroBox() {
  const { token } = useStateContext();

  return (
    <>
      <div
        className="introduction bg-intro-mobile md:bg-intro-desktop card-box-into  rounded-[35px]  md:px-[50px] lg:px-[100px]
      bg-white mx-auto max-w-[1300px] mt-[28px] bg-cover bg-center md:h-[646px] 

       py-10 
      h-1/2 flex md:block justify-center"
        style={{
          "--mobile-bg": `url(${mobileImage})`,
          "--desktop-bg": `url(${desktopImage})`,
        }}
      >
        <div className="card-intro max-w-full md:max-w-2/3 lg:max-w-1/2  h-full flex flex-col justify-center items-center md:items-start text-center md:text-start">
          <h1 className="text-black mb-[15px] text-[32px] sm:text-[30px] lg:text-[40px]">
            <strong>
            Eleganza, stile,<br/> complicità: a te la scelta!
            </strong>
          </h1>
          <p className="text-black text-[16px] md:text-[12px]  lg:text-[20px] md:max-w-[500px] max-w-[295px]">
          Scopri profili verificati per eventi, incontri privati o esperienze personali. {" "}
            <strong>
              Libertà di scelta, massima riservatezza e zero intermediazione.
            </strong>
          </p>
          <div className="intro-buttons flex items-center justify-between pt-[2em] gap-x-[40px]">
            {!token && (
              <>
                <Link
                  to="/sign-up"
                  className="btn bg-black btn-grad hover:bg-[#8880FE] transition-colors text-white block px-[40px] py-[20px] rounded-2xl text-[15px] md:text-[20px] font-[400] leading-[130%]"
                >
                  Inizia ora, gratis e in totale libertà{" "}
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center flex-wrap justify-center  gap-1  md:gap-3 mt-7">
            <div className="flex gap-1">
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
              <img src={star} className="w-5" />
            </div>
            <p className="text-black  text-[12px] md:text-[14px] font-[400] md:max-w-[500px] ">
            Powered by Clixer - we build next community
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white text-gray-800 py-16 px-8 mt-15 md:py-8 md:px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="w-full flex justify-center md:block">
            <div className="w-[400px] md:w-auto">
              <div className="text-4xl w-full md:w-[70%] mb-8  mx-auto md:mx-0 text-gray-800 md:mb-6 font-bold">
                <h1 className="text-center md:text-left">Cos’è HostessForYou?</h1>
              </div>

              <p className="text-lg md:w-[70%] leading-relaxed mb-12 text-center max-w-4xl  mx-auto md:mx-0 md:text-base md:mb-8 md:text-left">
              HostessForYou è il portale dedicato a hostess, wing woman e sugarbabies che desiderano incontrare uomini eleganti e generosi, interessati a esperienze autentiche e raffinate.
              <br/><br/>
              Che si tratti di eventi esclusivi, cene, weekend privati o relazioni discrete, ogni incontro si basa su rispetto, libertà di scelta e chiarezza.
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-1 gap-5 items-start mb-2">
              <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">
                <img src={WalletIcon} className="w-10 h-10"></img>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                Compagnia selezionata 
                per uomini selezionati
                </h2>
                <p className="text-lg leading-relaxed">
                Scopri hostess, sugarbabies e wing woman eleganti, discrete e intelligenti, ideali per eventi, incontri riservati o momenti di compagnia esclusiva.
                </p>
              </div>
            </div>
            <div className="py-7">
              <hr className="border-t-3 border-gray-100" />
            </div>
            <div className="flex flex-1 gap-5 items-start mb-2">
              <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">
                <img src={MemberIcon} className="w-10 h-10"></img>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                Esperienze personalizzate
                </h2>
                <p className="text-lg leading-relaxed">
                Ogni incontro è organizzato in base alle tue preferenze. Cena elegante, viaggio privato o evento speciale: scegli la compagnia giusta per il tuo stile di vita.
                </p>
              </div>
            </div>
            <div className="py-7">
              <hr className="border-t-3 border-gray-100" />
            </div>
            <div className="flex flex-1 gap-5 items-start mb-2">
              <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">
                <img src={HeartIcon} className="w-10 h-10"></img>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                Privacy garantita e rispetto assoluto
                </h2>
                <p className="text-lg leading-relaxed">
                Hostess, sugarbabies e wing woman incontrano clienti selezionati in un ambiente sicuro e riservato, dove ogni interazione si basa su discrezione, consenso e massima tutela della privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntroBox;
