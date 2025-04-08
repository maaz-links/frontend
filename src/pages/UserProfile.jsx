import React from 'react';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import { Link } from "react-router-dom";
import ModelImage from '/src/assets/images/model-img.jpg'
import Slider from "react-slick";




function UserProfile() {
    var settings = {
        dots: true,
        className: "center",
    infinite: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              dots: true,
              slidesToScroll: 1,
              arrows:false,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows:false,
              slidesToScroll: 1
            }
          }
        ]
      };
    return  (
<>
<Header />
<div className=' pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px]'>
<h1 className='text-[40px] flex gap-x-[15px] items-center'>User<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_698_1127)">
<path d="M24.75 12.4651V13.5001C24.7486 15.9261 23.9631 18.2866 22.5105 20.2296C21.0579 22.1727 19.0162 23.5941 16.6898 24.282C14.3634 24.9698 11.8769 24.8872 9.60128 24.0465C7.32564 23.2058 5.38274 21.652 4.06233 19.6168C2.74192 17.5816 2.11477 15.1742 2.27439 12.7534C2.43401 10.3327 3.37186 8.02846 4.94806 6.1843C6.52427 4.34014 8.65438 3.0549 11.0207 2.52026C13.387 1.98562 15.8628 2.23022 18.0788 3.21759M24.75 4.50009L13.5 15.7613L10.125 12.3863" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_698_1127">
<rect width="27" height="27" fill="white"/>
</clipPath>
</defs>
</svg>
</h1>
<p className='italic'><span>City</span>|<span>Years</span></p>
<div className='flex flex-col md:flex-row gap-[40px] md:gap-x-[100px]  mt-[50px]'>
<div className='profile-slider md:w-[40%] w-full'>
<Slider {...settings}>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
         
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
        
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
       
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="iitem-inner-box">
        <img src='https://placehold.co/400x500' />
          
        </div>
       </a> 
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
          
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
         
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500' />
         
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500' />
       
        </div>
        </a>
        </div>
      </Slider>

</div>
<div className='profile-details md:w-[60%] w-full'>

<p className='flex items-center gap-[10px] text-[16px]'><strong>Years</strong><span>32</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Nationality</strong><span>32</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Height</strong><span>32</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Dress size</strong> <span>32</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Shoes size</strong><span>32</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Tours?</strong><span>32</span></p>
<div className='about'>
<h3 className="text-[24px] pt-[26px] border-b">About </h3>
<p className='pt-[10px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Sed nec mollis velit, in elementum erat. Sed vehicula mi vel pellentesque lacinia.</p>
</div>
<h3 className="mt-[24px] font-[400] text-[26px] border-b">Available for:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[11px] mt-[24px]  max-w-[600px]">
          {["photo model", "fashion pics", "travel & weekend", "dinners", "host hostess", "parties", "fake girlfriend", "talk"].map((item) => (
            <span key={item} className="bg-[#AEAEAE] px-3 py-1  text-[11px] text-center min-w-[78px]">{item}</span>
          ))}
        </div>
        <h3 className="mt-[24px] font-[400] text-[26px] border-b">Personality and Hobbies</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[11px] mt-[24px]  max-w-[600px]">
          {Array.from({ length: 5 }, (_, i) => `Example ${i + 1}`).map((hobby) => (
            <span key={hobby} className="bg-[#AEAEAE] px-3 py-1  text-[11px] text-center min-w-[78px]">{hobby}</span>
          ))}
        </div>
        {/* Languages */}
        <h3 className="mt-[24px] md:mt-[56px] font-[400] text-[26px] border-b">Spoken Languages</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[11px] mt-[24px]  max-w-[600px]">
          {["Deutsch", "English", "Italian", "Espanol", "Français"].map((lang) => (
            <span key={lang} className="bg-[#AEAEAE] px-3 py-1  text-[11px] w-full md:w-[78px] text-center">{lang}</span>
          ))}
        </div>
</div>

</div>
  <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[200px]">
        <Link to="/chat" className="cursor-pointer w-full bg-[#000] block uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]">
        GO TO THE CHAT
        </Link>
        </div>
</div>

<Footer />

</>

    )
    
}
export default UserProfile;