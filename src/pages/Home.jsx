import React, { useState } from "react";
import Header from "/src/components/common/header";
import "/src/App.css";
import IntroBox from "/src/components/IntroBox";
import Models from "/src/components/Models";
import Faqs from "/src/components/Faqs";
import Footer from "/src/components/common/footer";

import WalletIcon from "/src/assets/images/money-filled.svg";
import MemberIcon from "/src/assets/images/question-cloud.svg";
import worldMap from "/src/assets/images/worldmap.png";
import { Link } from "react-router-dom";

import HowItWorks from "./home/how-it-works";
import PromoBanner from "./home/PromoBanner";
import GetStartedBanner from "./home/GetStartedBanner";
import { useStateContext } from "@/context/ContextProvider";

function Home() {

  const {setIsWelcomeModel} = useStateContext();
  return (
    <>
      <Header />
      <IntroBox />
      <Models />
      <GetStartedBanner/>
      <HowItWorks />

      <VerifiedPeopleOnly />
      <PromoBanner />
      <Faqs />

      <Footer />
    </>
  );
}

export default Home;

function VerifiedPeopleOnly() {
  return (
    <>
      <div className="w-full overflow-clip">
        <img src={worldMap} className="min-w-2xl mt-10 md:hidden" />
      </div>

      <div className="md:my-[100px]">
        <div className="mt-[35px] px-[15px] max-w-[700px] mx-auto">
          <h1 className="text-center text-[32px] font-bold">
            Profili verificati – solo persone reali
          </h1>
          <p className="text-center text-[14px] font-[400] mt-[18px]">
          Verifichiamo ogni account per garantire che la piattaforma sia composta esclusivamente da
          persone autentiche. Il nostro team controlla con cura ogni profilo prima della pubblicazione.
          </p>
          <img
            src={worldMap}
            className="absolute start-0 max-w-1/2 hidden md:inline w-[1000px]"
          />
          <div className="slider-container max-w-sm md:max-w-[1120px] m-auto mt-[36px]"></div>
        </div>

        <section className="bg-white text-gray-800 p-8 px-8 md:mt-10 md:py-8 md:px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 flex justify-center md:block">
              {/* <img src={worldMap} className='relative -start-30 -top-10 max-w-[900px]'/> */}
              <div className="w-[500px] md:w-auto"></div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex flex-1 gap-5 items-start mb-2">
                <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">
                  <img src={WalletIcon} className="w-10 h-10"></img>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                  Rimborso garantito in caso 
                  di mancata risposta
                  </h2>
                  <p className="text-lg leading-relaxed">
                  Se non ricevi risposta entro 72 ore dall’invio del messaggio, attiviamo automaticamente il rimborso del credito utilizzato.
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
                  Cerca
                  </h2>
                  <p className="text-lg leading-relaxed">
                  Hai sempre la possibilità di contattare il nostro team per assistenza o ulteriori verifiche.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-5 justify-center md:justify-start items-start mb-2">
                <Link
                  to="/search"
                  className="btn bg-black btn-grad hover:bg-[#8880FE] mt-[55px] transition-colors text-white px-[140px] py-[20px] rounded-2xl text-[15px] md:text-[20px] font-[400] leading-[130%]"
                >
                  Cerca
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
