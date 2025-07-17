import mobileImage from '/src/assets/images/joinnow-mobile.png';
import desktopImage from '/src/assets/images/joinnow-desktop.png';

import { Link } from 'react-router-dom';
export default function GetStartedBanner({
    heading='Find the Right Match',
    content="Tell us about your occasion, and we’ll hand-pick the best candidates for your goals and audience. Whether it's a high-end corporate gala or a casual product promo, we’ve got you covered.",
    btnText='Get Started For Free'
}){

    return (
        <>
        <div className="hidden md:block  mt-[35px] px-[25px] max-w-[1300px] m-auto">
        <div className='h-[110vw] md:max-h-[300px] md:h-[23vw] p-15 md:p-10 lg:p-15 flex flex-wrap justify-between md:items-center'

          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: 'no-repeat'
          }}

        >
          <div className='md:w-1/2 text-center md:text-start'>
            <h1 className="text-white mb-[15px] font-bold text-[35px] md:text-[25px] lg:text-[35px]">{heading}</h1>
            <p className='text-white text-[14px] md:text-[12px]  lg:text-[14px] font-[400] md:max-w-[500px]'>
              {content}
            </p>
          </div>
          <div className="md:w-2/5 flex flex-row-reverse justify-center items-center">
            <Link to='/sign-up' className='btn bg-white hover:bg-black hover:text-white transition-all text-black px-[40px] mt-2 py-[20px] rounded-2xl text-[15px] md:text-[15px] font-[600] leading-[130%]'
            >
              {btnText}</Link>
          </div>
        </div>
      </div>

          {/* FOR MOBILE */}
      <div className=" md:hidden mt-[35px]  max-w-[1300px] m-auto w-full ">
        <div className='h-[120vw] md:max-h-[300px] md:h-[23vw] p-[10vw] md:p-10 lg:p-15 flex flex-wrap justify-between items-center mx-[25px]'
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