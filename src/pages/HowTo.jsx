import React from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { Outlet, Link } from "react-router-dom"
import ModelImage from '/src/assets/images/model-img.jpg'
import Faqs from '/src/components/Faqs'
import JoinUs from '../components/common/joinus'
import Models from '../components/Models'
function HowTo() {


  return (
    <>
      <Header />
      <div className='max-w-[1200px] m-auto mt-[50px] mb-[50px] md:mt-[126px] md:mb-[144px]'>
        <h1 className="text-center text-[32px] font-[400] uppercase">HOW TO?</h1>
        <p className="text-center text-[16px] font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consectetur neque. Ut metus ex, pretium et massa id, molestie luctus dui.</p>
        <div className='max-w-[1035px] m-auto px-[15px]'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-x-[40px] mt-[40px] md:mt-[80px]">
            <div className='model-and-host'>
              <div className='bg-[#F5F5F5] w-full text-center p-[12px] uppercase mb-[15px]'>ARE YOU AN HOSTESS OR A MODEL?</div>
              <ul>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Sign up for free</Link>
                </li>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Complete your profile</Link>
                </li>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Value the request and choose a fee</Link>
                </li>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Enjoy!</Link>
                </li>
              </ul>
            </div>
            <div className='looking-model'>
              <div className='bg-[#F5F5F5] w-full text-center p-[12px] uppercase mb-[15px]'>ARE YOU LOOKING FOR AN HOSTESS OR A MODEL?</div>
              <ul>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Sign up for free</Link>
                </li>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Search for profiles near you</Link>
                </li>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Unclock the chat</Link>
                </li>
                <li>
                  <Link className='flex items-center gap-2 mb-[10px]'><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75383 8.70711C9.14435 8.31658 9.14435 7.68342 8.75383 7.29289L2.38987 0.928932C1.99934 0.538408 1.36618 0.538408 0.975653 0.928932C0.585129 1.31946 0.585129 1.95262 0.975653 2.34315L6.63251 8L0.975653 13.6569C0.585129 14.0474 0.585129 14.6805 0.975653 15.0711C1.36618 15.4616 1.99934 15.4616 2.38987 15.0711L8.75383 8.70711ZM4.71143 9H8.04672V7L4.71143 7V9Z" fill="black" />
                  </svg>
                    Enjoy!</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='max-w-[1070px] m-auto px-[15px] mb-[50px] md:mb-[99px]'>
        <h4 className='text-[20px] mb-[20px]'>What could you do togheter?</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[15px] md:gap-x-[50px]">
          <div className='howto-box text-center bg-[#F8BBD0]  flex items-center justify-center '>
            <a href='#' className="block">
              <img src={ModelImage} />
              <h3>Service 2 </h3>
            </a>
          </div>
          <div className='howto-box text-center bg-[#F8BBD0]  flex items-center justify-center'>
            <a href='#' className="block">
              <img src={ModelImage} />
              <h3>Service 2 </h3>
            </a>
          </div>
          <div className='howto-box text-center bg-[#F8BBD0]  flex items-center justify-center'>
            <a href='#' className="block">
              <img src={ModelImage} />
              <h3>Service 2 </h3>
            </a>
          </div>
          <div className='howto-box text-center bg-[#F8BBD0]  flex items-center justify-center'>
            <a href='#' className="block">
              <img src={ModelImage} />
              <h3>Service 2 </h3>
            </a>
          </div>
          <div className='howto-box text-center bg-[#F8BBD0]  flex items-center justify-center'>
            <a href='#' className="block">
              <img src={ModelImage} />
              <h3>Service 2 </h3>
            </a>
          </div>
        </div>
      </div> */}
      <Models/>
      <Faqs />
      <JoinUs />
      <Footer />
    </>
  )
}

export default HowTo
