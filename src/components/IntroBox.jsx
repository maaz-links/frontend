import React from 'react';
//import Introimage from "/src/assets/images/intro.png"
import Introimage from "/src/assets/images/intro1.png"
import HeartIcon from "/src/assets/images/heart.svg"
import WalletIcon from "/src/assets/images/Wallet.svg"
import MemberIcon from "/src/assets/images/Member.svg"
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';

function IntroBox() {

  const { token } = useStateContext();

  return (
    <>

      <div className="introduction card-box-into pt-[56px] rounded-2xl pb-[95px] px-[30px] bg-white max-w-[1300px] m-auto mt-[28px] bg-cover bg-center
      
      flex flex-col md:flex-row justify-between items-center gap-4"
        //style={{ backgroundImage:`url(${Introimage})` }}
        style={{
          // backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%), url(${Introimage})`,
          backgroundColor: 'silver',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%', // Adjust as needed
        }}
      >
        
        <div className='card-intro max-w-100 md:max-w-[300px]  text-center'>
          <h1 className="text-[#424242] mb-[15px] font-['Playfair_Display'] font-[400] text-[20px]">INTRODUCTION</h1>
          <p className='text-[#424242] text-[14px] font-[400] md:max-w-[294px]'>
            Step into the world of fashion, elegance, and professionalism. We connect leading brands, designers, and event organizers with exceptional hostesses and models who embody style and confidence. Whether you're casting for a runway show, launching a luxury product, or hosting an exclusive event — our talent brings presence, poise, and polish.

            Ready to discover the perfect match for your next project — or take the first step in your modeling journey? Join our community today.</p>
          <div className='intro-buttons flex items-center justify-between pt-[3em] gap-x-[40px]'>

            {!token &&
              <>
                <Link to='/sign-up' className='btn bg-[#F8BBD0] block p-[10px] w-full text-[20px] font-[400] leading-[130%]'>Sign Up </Link>
                <Link to='/search' className='btn bg-[#F8BBD0]  p-[10px] w-full text-[20px] font-[400] leading-[130%]'>Search</Link>
              </>
            }
          </div>
        </div>
        <div className='max-w-100 md:max-w-[300px] overflow-visible relative'>
        <img src={Introimage} className='w-[900px]'/>
        </div>

      </div>

      <section className="bg-white text-gray-800 py-16 px-8 mt-15 md:py-8 md:px-4 font-sans">
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
                <h2 className="text-2xl font-bold mb-2">Tailored Experiences</h2>
                <p className="text-lg leading-relaxed">
                  From corporate events to personal getaways, each encounter is customized to fit your unique needs and lifestyle.
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
