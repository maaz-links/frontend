import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HostessImage from '/src/assets/images/servic3.png';
import WingWomanImage from '/src/assets/images/servic2.png';
import SugarBabyImage from '/src/assets/images/servic1.png';

import mobileImage from '/src/assets/images/joinnow-mobile.png';
import desktopImage from '/src/assets/images/joinnow-desktop.png';
import axiosClient from '../../axios-client';

function Models() {

  const [services, setShownServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axiosClient.get('/api/my-shown-services');
      
        // Ensure we always have an array and grab at most the first 3 elements
        const services = (Array.isArray(data) ? data : [data]).slice(0, 3);
      
        setShownServices(services);
      } catch (err) {
        console.error(err);

        setShownServices(
          [
            {
              title: 'Hostess',
              description: 'Attend events, dinners, or private gatherings with a polished, professional presence.',
              image: HostessImage
            },
            {
              title: 'Wing Woman',
              description: 'Navigate social environments with confidence and support; impress at business mixers or casual parties.',
              image: WingWomanImage
            },
            {
              title: 'Sugar Baby',
              description: 'Engage in mutually beneficial relationships with clarity, honesty, and discretion.',
              image: SugarBabyImage
            }
          ]
        );
      }
    };

    fetchServices();
  }, []);

  // const services = [
  //   {
  //     title: 'Hostess',
  //     description: 'Attend events, dinners, or private gatherings with a polished, professional presence.',
  //     image: HostessImage
  //   },
  //   {
  //     title: 'Wing Woman',
  //     description: 'Navigate social environments with confidence and support; impress at business mixers or casual parties.',
  //     image: WingWomanImage
  //   },
  //   {
  //     title: 'Sugar Baby',
  //     description: 'Engage in mutually beneficial relationships with clarity, honesty, and discretion.',
  //     image: SugarBabyImage
  //   }
  // ];

  return (
    <>
      <div className="mt-[35px] px-[15px]">
        <h1 className="text-center text-[32px] font-bold">Our Core Offerings</h1>
        <p className="text-center text-[14px] font-[400] mt-[18px]">
          Each role is customizable to the needs and comfort of both parties.<br />
          You’re always in control.
        </p>
      </div>

      <div className="mt-[35px] mb-[135px] px-[15px] max-w-[1300px] m-auto">
        <div className="slider-container flex flex-wrap justify-between mt-[36px]">
          {services.map((service, index) => (
            <div className="item cursor-pointer w-full md:w-1/3 my-4 md:my-0" key={index}>
              <div className="item-inner rounded-4xl overflow-hidden relative h-120">
                <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                <div className="absolute bottom-5 left-0 mx-4 z-20 text-black">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-lg">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block mt-[35px] px-[25px] max-w-[1300px] m-auto ">
        <div className='h-[110vw] md:max-h-[300px] md:h-[23vw] p-15 md:p-10 lg:p-15 flex flex-wrap justify-between md:items-center'

          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: 'no-repeat'
          }}

        >
          <div className='md:w-1/2 text-center md:text-start'>
            <h1 className="text-white mb-[15px] font-bold text-[35px] md:text-[25px] lg:text-[35px]">Find the Right Match</h1>
            <p className='text-white text-[14px] md:text-[12px]  lg:text-[14px] font-[400] md:max-w-[500px]'>
              Tell us about your occasion, and we’ll hand-pick the best candidates for your goals and audience. Whether it's a high-end corporate gala or a casual product promo, we’ve got you covered.
            </p>
          </div>
          <div className="md:w-2/5 flex flex-row-reverse justify-center items-center">
            <Link to='/sign-up' className='btn bg-white text-black px-[40px] mt-2 py-[20px] rounded-2xl text-[15px] md:text-[15px] font-[600] leading-[130%]'
            >
              Get Started for Free</Link>
          </div>
        </div>
      </div>

          {/* FOR MOBILE */}
      <div className=" md:hidden mt-[35px] px-[25px] max-w-[1300px] m-auto ">
        <div className='h-[120vw] md:max-h-[300px] md:h-[23vw] p-[10vw] md:p-10 lg:p-15 flex flex-wrap justify-between items-center'
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: 'no-repeat'
          }}

        >
          <div className=' w-full h-[35vw] md:w-1/2 text-center md:text-start'>
            <h1 className="text-white mb-[15px] font-bold text-[10vw] md:text-[25px] lg:text-[35px]">Find the Right Match</h1>
          </div>
          <div className='w-full md:w-1/2 text-center md:text-start'>
          
          <p className='text-white text-[4vw] sm:text-[3vw] md:text-[12px]  lg:text-[14px] font-[400]'>
              Tell us about your occasion, and we’ll hand-pick the best candidates for your goals and audience. Whether it's a high-end corporate gala or a casual product promo, we’ve got you covered.
            </p>
          </div>
          <div className="w-full md:w-2/5 flex flex-row-reverse justify-center items-center">
            <Link to='/sign-up' className='btn bg-white text-black px-[40px] py-[20px] rounded-2xl mt-[5vw] text-[3vw] md:text-[15px] font-[600] leading-[130%]'
            >
              Get Started for Free</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Models;
