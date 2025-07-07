import React from 'react';
//import Introimage from "/src/assets/images/intro.png"
import star from "/src/assets/images/intro-rating-star.svg"
import HeartIcon from "/src/assets/images/heart.svg"
import WalletIcon from "/src/assets/images/Wallet.svg"
import MemberIcon from "/src/assets/images/Member.svg"
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';
import mobileImage from '/src/assets/images/welcome-image-mobile.jpg';
import desktopImage from '/src/assets/images/welcome-image-desktop.jpg';

function IntroBox() {

  const { token } = useStateContext();

  return (
    <>

      <div className="introduction bg-intro-mobile md:bg-intro-desktop card-box-into pt-[56px] rounded-4xl py-[95px] px-[50px] lg:px-[100px]
      bg-white max-w-[1300px] m-auto mt-[28px] bg-cover bg-center
      h-1/2 flex md:block justify-center"
      style={{
        '--mobile-bg': `url(${mobileImage})`,
        '--desktop-bg': `url(${desktopImage})`
      }}
      >
        
        <div className='card-intro max-w-full md:max-w-1/2'>
          <h1 className="text-black mb-[15px] text-[25px] sm:text-[30px] lg:text-[40px]"><strong>More Than Just a<br/> Presence — A Real <br/>Connection</strong></h1>
          <p className='text-black text-[14px] md:text-[12px]  lg:text-[14px] md:max-w-[500px]'>
          Discover a new way to connect: <strong>elegance, support, and meaningful companionship — on your terms</strong></p>
          <div className='intro-buttons flex items-center justify-between pt-[2em] gap-x-[40px]'>

            {!token &&
              <>
                <Link to='/sign-up' className='btn bg-black btn-grad text-white block px-[40px] py-[20px] rounded-2xl text-[15px] md:text-[20px] font-[400] leading-[130%]'
                
                >
                                Get Started for Free </Link>
              </>
              
            }
          </div>
          <div className='flex items-center gap-1 mt-7'>
            <img src={star} className='w-5'/>
            <img src={star} className='w-5'/>
            <img src={star} className='w-5'/>
            <img src={star} className='w-5'/>
            <img src={star} className='w-5'/>
            <p className='text-black text-[14px] font-[400] md:max-w-[500px] ml-6'>
          Trusted by about 300 users</p>
          </div>
        </div>

      </div>
     
      <section className="bg-white text-gray-800 py-16 px-8 mt-15 md:py-8 md:px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

          <div className="w-full flex justify-center md:block">
            <div className="w-[400px] md:w-auto">
              <div className="text-5xl mb-8 text-gray-800 md:mb-6 font-bold">
                <h1 className="text-center md:text-left">
                  What Is
                </h1>
                <h1 className="text-center md:text-left">
                  Hostess For You?
                </h1>
              </div>


              <p className="text-lg leading-relaxed mb-12 text-center max-w-4xl mx-auto md:text-base md:mb-8 md:text-left">
                HostessForYou is an elite platform connecting affluent clients with refined companions for events, social outings, or discreet personal arrangements. Each connection is built on mutual respect, clear boundaries, and seamless communication.
              </p>
            </div>
          </div>

        <div className="w-full">
            <div className="flex flex-1 gap-5 items-start mb-2">
              <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">

                <img src={WalletIcon} className='w-10 h-10'></img>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Exclusive Companionship</h2>
                <p className="text-lg leading-relaxed">
                We connect you with refined, elegant companions who embody charm, discretion, and sophistication.
                </p>
              </div>
            </div>
            <div className='py-7'>
              <hr className='border-t-3 border-gray-100'/>
            </div>
            <div className="flex flex-1 gap-5 items-start mb-2">
              <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">
               
                <img src={MemberIcon} className='w-10 h-10'></img>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Tailored Experiences</h2>
                <p className="text-lg leading-relaxed">
                  From corporate events to personal getaways, each encounter is customized to fit your unique needs and lifestyle.
                </p>
              </div>
            </div>
            <div className='py-7'>
              <hr className='border-t-3 border-gray-100'/>
            </div>
            <div className="flex flex-1 gap-5 items-start mb-2">
              <div className="bg-gray-200 p-6 rounded-full mt-2 mr-4 flex flex-shrink-0 justify-center items-center ">
               
                <img src={HeartIcon} className='w-10 h-10'></img>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Trusted Privacy and Respect</h2>
                <p className="text-lg leading-relaxed">
                Every connection is based on clear boundaries, mutual understanding, and the highest level of confidentiality.
                </p>
              </div>
            </div>
          </div>
      </div>
    </section>

    </>
  )
}

export default IntroBox
