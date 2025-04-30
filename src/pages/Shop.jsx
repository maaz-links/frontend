import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ModelImage from '/src/assets/images/model-img.jpg'
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";

function Shop() {

  const {refreshUser} = useStateContext();

  const buy100 = async () => {
    try {
      const response = await axiosClient.post('/api/set-customer-credits');
      alert('You have 100 credits now');
      refreshUser();
    } catch (error) {
      alert('Error setting credits');
      console.error('Error fetching data:', error);
    }
    return 1;
  }


  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Shop</h1>
      <div className="max-w-[1180px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[15px] md:gap-x-[40px]">
          <div className='blog-box text-center'>
            <div className='blog-inner'>
              {/* <Link to="/payment-method"> */}
                <div onClick={buy100}  className='blog-img bg-gray-500'>
                <img src={ModelImage} style={{visibility: 'hidden'}} />
                  
               
                </div>
                {/* <div className="absolute user-icon text-center">
                    <div className="icon absolute">
                      <svg width="500" height="500" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_724_133)">
                          <path d="M23.5 47C36.4787 47 47 36.4787 47 23.5C47 10.5213 36.4787 0 23.5 0C10.5213 0 0 10.5213 0 23.5C0 36.4787 10.5213 47 23.5 47Z" fill="#FFC018" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.8906 21.2969H30.1094V14.6875H34.5156V38.1875H30.1094V25.7031H16.8906V32.3125H12.4844V8.8125H16.8906V21.2969Z" fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_724_133">
                            <rect width="47" height="47" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>100</div>
                  </div> */}
                <h3 onClick={buy100} className='uppercase font-[400] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>GET 100 CREDITS</h3>
              {/* </Link> */}

            </div>

          </div>
          <div className='blog-box text-center'>
            <div className='blog-inner'>
              <Link to="/payment-method">
                <div className='blog-img'>
                  <img src={ModelImage} />
                </div>
                <h3 className='uppercase font-[400] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
              </Link>

            </div>

          </div>
          <div className='blog-box text-center'>
            <div className='blog-inner'>
              <Link to="/payment-method">
                <div className='blog-img'>
                  <img src={ModelImage} />
                </div>
                <h3 className='uppercase font-[400] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
              </Link>

            </div>
          </div>
          <div className='blog-box text-center'>
            <div className='blog-inner'>
              <Link to="/payment-method">
                <div className='blog-img'>
                  <img src={ModelImage} />
                </div>
                <h3 className='uppercase font-[400] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
              </Link>

            </div>
          </div>
          <div className='blog-box text-center'>
            <div className='blog-inner'>
              <Link to="/payment-method">
                <div className='blog-img'>
                  <img src={ModelImage} />
                </div>
                <h3 className='uppercase font-[400] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
