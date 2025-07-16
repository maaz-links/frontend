import React, { useEffect, useState } from 'react';
import HostessImage from '/src/assets/images/servic3.png';
import WingWomanImage from '/src/assets/images/servic2.png';
import SugarBabyImage from '/src/assets/images/servic1.png';


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
            <div className="item w-full md:w-1/3 my-4 md:my-0" key={index}>
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
    </>
  );
}

export default Models;
