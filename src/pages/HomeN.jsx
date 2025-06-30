import React from 'react'
import Header from '/src/components/common/header'
import '/src/App.css'
import IntroBox from '/src/components/IntroBox'
import Models from '/src/components/Models'
import How_To from '/src/components/How_To'
import Faqs from '/src/components/Faqs'
import Footer from '/src/components/common/footer'
import HeaderGuest from '../components/common/headerGuest'
import { Link } from 'react-router-dom'


function HomeN() {

  return (
    <>
   
     
    <HeaderGuest />
   <IntroBox />
   <Models />
   {/* <div

   className='introduction card-box-into pt-[56px] rounded-2xl pb-[95px] px-[30px] bg-white max-w-[1300px] m-auto mt-[28px] bg-cover bg-center
      
      flex flex-col md:flex-row justify-between items-center gap-4'
   
   style={{
    backgroundImage: `url('/src/assets/images/Frame3.png')`,
    // backgroundColor: 'gray',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%', // Adjust as needed
  }}
   >
<div className='card-intro max-w-100 md:max-w-[300px]  text-center'>
          <h1 className="text-white mb-[15px] font-bold text-[30px]">Find The Match For Any Ocassion</h1>
          <p className='text-white text-[14px] font-[400] md:max-w-[294px]'>
            Step into the world of fashion, elegance, and professionalism. We connect leading brands, designers, and event organizers with exceptional hostesses and models who embody style and confidence. Whether you're casting for a runway show, launching a luxury product, or hosting an exclusive event — our talent brings presence, poise, and polish.

            Ready to discover the perfect match for your next project — or take the first step in your modeling journey? Join our community today.</p>
          <div className='intro-buttons flex items-center justify-between pt-[3em] gap-x-[40px]'>

            
              <>
                <Link to='/sign-up' className='btn bg-[#F8BBD0] block p-[10px] w-full text-[20px] font-[400] leading-[130%]'>Sign Up </Link>
                <Link to='/search' className='btn bg-[#F8BBD0]  p-[10px] w-full text-[20px] font-[400] leading-[130%]'>Search</Link>
              </>
            
          </div>
        </div>
   </div> */}
    <How_To />
    {/* <Blogs /> */}
   <Faqs />
   <Footer />
    </>
  )
}

export default HomeN
