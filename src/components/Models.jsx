import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axiosClient from '../../axios-client';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (

    <div
      className={className}
      onClick={onClick}


    >
      <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.5874 8.70711C50.9779 8.31658 50.9779 7.68342 50.5874 7.29289L44.2235 0.928932C43.8329 0.538408 43.1998 0.538408 42.8092 0.928932C42.4187 1.31946 42.4187 1.95262 42.8092 2.34315L48.4661 8L42.8092 13.6569C42.4187 14.0474 42.4187 14.6805 42.8092 15.0711C43.1998 15.4616 43.8329 15.4616 44.2235 15.0711L50.5874 8.70711ZM0.8479 9H49.8803V7H0.8479V9Z" fill="black" />
      </svg>


    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.411243 7.29289C0.0207214 7.68342 0.0207214 8.31658 0.411243 8.70711L6.7752 15.0711C7.16573 15.4616 7.79889 15.4616 8.18942 15.0711C8.57994 14.6805 8.57994 14.0474 8.18942 13.6569L2.53257 8L8.18942 2.34315C8.57994 1.95262 8.57994 1.31946 8.18942 0.928932C7.79889 0.538408 7.16573 0.538408 6.7752 0.928932L0.411243 7.29289ZM50.1508 7L1.11835 7V9L50.1508 9V7Z" fill="black" />
      </svg>
    </div>
  );
}

function Models() {

  const [shownServices, setShownServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosClient.get('/api/my-shown-services');
        let services = response.data;

        // If only one object is returned, duplicate it
        //We do this bcz Slider is buggy with only one object.
        if (Array.isArray(services) && services.length === 1) {
          services = [services[0], { ...services[0] }];
        }

        setShownServices(services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  var settings = {
    dots: false,
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true,
          slidesToScroll: 2,
          arrows: false,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    {shownServices.length != 0  && <div>
      <div className="mt-[35px] px-[15px]">
        <h1 className="text-center text-[32px] uppercase font-[400]">Hostess and Models</h1>
        <p className="text-center text-[14px] uppercase font-[400] mt-[18px]">Unforgettable experiences begin with the right presence — refined hostess and modeling services for any occasion.</p>
        <div className="slider-container max-w-sm md:max-w-[1120px] m-auto mt-[36px]">
          <Slider {...settings}>

            {shownServices.map((service, index) => (
              <div className="item cursor-pointer" key={index}>
                {/* <a href="#" > */}
                <div className="item-inner rounded-lg overflow-hidden relative h-64">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-30% via-transparent to-transparent z-10"></div>
                  <img src={service.image_path} className={`w-full h-full object-cover`} alt={service.name} />
                  <h3 className="text-[#fff] text-[24px] z-20 absolute bottom-2 left-2">{service.name}</h3>
                </div>
                
                {/* </a> */}
              </div>
            ))}
{/*             
            <div className="item">
              <a href='#'>
                <div className="item-inner  rounded-lg overflow-hidden">
                  <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-30% via-transparent to-transparent z-10"></div>

                  <img src={ModelImage} className="" />
                  <h3 className='text-[#fff] text-[24px] z-12'>Service 8</h3>
                </div>
              </a>
            </div> */}
          </Slider>
        </div>
      </div>

    </div>}
    </>
  )


}
export default Models