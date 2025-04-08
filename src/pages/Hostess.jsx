import  React from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { Outlet, Link } from "react-router-dom";
import JoinUs from '../components/common/joinus';

function Hostess() {
  

  return (
    <>
    <Header />
    <div className='max-w-[1119px] m-auto mt-[50px] mb-[50px] md:mt-[126px] md:mb-[144px] px-[15px]'>
    <h1 className="text-center text-[32px] font-[400] uppercase">TITLE</h1>
    <p className="text-center max-w-[700px]  m-auto  text-[16px] font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consectetur neque. Ut metus ex, pretium et massa id, molestie luctus dui.</p>
    <div className='text-center mt-[40px] mb-[50px] md:mb-[100px]'>
<a href='#' className='bg-[#000] text-[20px] text-[#fff] p-[10px] px-[70px] hover:bg-[#8B8B8B] '>SIGN UP</a>
</div>
      <div className="flex flex-col md:flex-row gap-x-[50px] pb-[35px] md:pb-[70px] border-b-1 md:border-b-0">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://placehold.co/600x400"
            alt="Example"
            className="w-full"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-[32px]">Title Goes Here</h2>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent euismod metus at velit dapibus, vel pharetra justo fermentum.
          </p>
        
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-x-[50px] pt-[35px] md:pt-[0px]">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://placehold.co/600x400"
            alt="Example"
            className="w-full"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-[32px]">Reversed Title</h2>
          <p className="text-gray-700">
            This section has the image on the right and text on the left. Easily adaptable for different content styles.
          </p>
          
        </div>
      </div>
  
    </div>
    <JoinUs />
    <Footer />
    </>
  )
}

export default Hostess
