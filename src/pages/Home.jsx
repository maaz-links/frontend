import React, { useState } from "react";
import Header from "/src/components/common/header";
import "/src/App.css";
import IntroBox from "/src/components/IntroBox";
import Models from "/src/components/Models";
import How_To from "/src/components/How_To";
import Faqs from "/src/components/Faqs";
import Footer from "/src/components/common/footer";

import WalletIcon from "/src/assets/images/money-filled.svg";
import MemberIcon from "/src/assets/images/question-cloud.svg";
import worldMap from "/src/assets/images/worldmap.png";
import { Link } from "react-router-dom";
import PopUpModel from "../components/common/popup-model";

import HowItWorks from "./home/how-it-works";
import PromoBanner from "./home/PromoBanner";
import { useStateContext } from "../context/ContextProvider";
function Home() {
  //const [GenericModalOpen, setGenericModalOpen] = useState(false);
  const {setGenericModalOpen,setGenericModalContent} = useStateContext();
  return (
    <>
      <Header />
      <IntroBox />
      <Models />
      <HowItWorks />

      <VerifiedPeopleOnly />
      <PromoBanner />

      {/* <How_To /> */}
      {/* <Blogs /> */}
      <Faqs />

      {/* for Testying Only */}
      <div className="w-full flex justify-center mb-10">
        <button
          // onClick={() => setGenericModalOpen(true)}
          onClick={() => {
            setGenericModalOpen(true);
            setGenericModalContent(
              <>
              <h1 className=" text-[45px] font-bold">Verify your email</h1>
              <p className=" my-4 ">
                Check your mailbox, follow the instructions, and confirm account!
              </p>
              <button onClick={() => setGenericModalOpen(false)} className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full">
                Got It
              </button>
              </>
            )
          }}
          className="mt-6 px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition  w-fit"
        >
          Open POPUP (testing only)
        </button>
      </div>
      {/* <PopUpModel isOpen={GenericModalOpen} onClose={() => setGenericModalOpen(false)}>
        <h1 className=" text-[45px] font-bold">Verify your email</h1>

        <p className=" my-4 ">
          Check your mailbox, follow the instructions, and confirm account!
        </p>
        <button onClick={() => setGenericModalOpen(false)} className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full">
          Got It
        </button>
      </PopUpModel> */}

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
            Verified profiles – real people only
          </h1>
          <p className="text-center text-[14px] font-[400] mt-[18px]">
            We ensure that every profile on our platform belongs to a genuine
            user. All accounts are carefully reviewed and confirmed by our
            moderation team.
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
                    No reply? We've got your back
                  </h2>
                  <p className="text-lg leading-relaxed">
                    If your message goes unanswered for more than 72 hours,
                    you’ll receive an automatic refund. You can also reach out
                    to us for further review.
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
                    Always here to help – 24/7
                  </h2>
                  <p className="text-lg leading-relaxed">
                    Our support team is available around the clock. No matter
                    when you need us, we’re ready to assist.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-5 justify-center md:justify-start items-start mb-2">
                <Link
                  to="/search"
                  className="btn bg-black btn-grad mt-[55px] text-white px-[140px] py-[20px] rounded-2xl text-[15px] md:text-[20px] font-[400] leading-[130%]"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
