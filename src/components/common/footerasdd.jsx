import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from '/src/assets/images/h4ulogofooter.png';

function Footer() {
  return (
    <>
      {/* <Outlet /> */}
      <div className="footer bg-black border-t-2 border-[#BDBDBD] pt-[50px] pb-[50px] md:pt-[84px] md:pb-[84px] ">
        <div className="md:flex flex-wrap max-w-[1300px] m-auto justify-between px-[15px]">
          
          {/* Footer Intro Section */}
          <div className="footer-intro text-center md:text-left"> 
          {/* <Link to="/"> <img className="m-auto md:m-0" src={Logo} alt="Logo" /></Link>   */}
            <div className="logo w-[250px] h-[70px] overflow-hidden"> 
              <Link to="/">
                <img 
                  src={Logo} 
                  className="w-full object-cover"  
                  alt="Logo"  
                />
              </Link>
            </div>
            {/* <p className="md:max-w-[346px] text-[14px] mt-[18px]">
              Discover the platform where elegance meets opportunity. Whether you're showcasing your talent or searching for it, we bring the fashion world closer—one connection at a time.
            </p> */}
          </div>
          

          {/* Footer Menu Section */}
          <div className="footer-menu mt-[15px] md:mt-[0px] basis-1/2 text-right">
          <Link to="/terms" className="bg-[#F8BBD0] mb-[13px] mx-2 text-center p-[6px] text-[12px] hover:bg-[#F8BBD0]">
                  TERMS & CONDITIONS
                </Link>
                <Link to="/terms" className="bg-[#F8BBD0] mb-[13px] mx-2 text-center p-[6px] text-[12px] hover:bg-[#F8BBD0]">
                  TERMS & CONDITIONS
                </Link>
                <Link to="/terms" className="bg-[#F8BBD0] mb-[13px] mx-2 text-center p-[6px] text-[12px] hover:bg-[#F8BBD0]">
                  TERMS & CONDITIONS
                </Link>
                
            {/* <ul className="md:columns-2 gap-x-[45px]">
              <li>
                <Link to="/terms" className="bg-[#F8BBD0] block mb-[13px] text-center p-[6px] text-[12px] uppercase hover:bg-[#F8BBD0]">
                  TERMS & CONDITIONS
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="bg-[#F8BBD0] block mb-[13px] text-center p-[6px] text-[12px] uppercase hover:bg-[#F8BBD0]">
                  PRIVACY POLICY
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="bg-[#F8BBD0] block mb-[13px] text-center p-[6px] text-[12px] uppercase hover:bg-[#F8BBD0]">
                  COOKIES INFO
                </Link>
              </li>
              <li>
                <Link to="/how-to" className="bg-[#F8BBD0] block mb-[13px] text-center p-[6px] text-[12px] uppercase hover:bg-[#F8BBD0]">
                  HOW TO?
                </Link>
              </li>
              <li>
                <Link to="/payments" className="bg-[#F8BBD0] block mb-[13px] text-center p-[6px] text-[12px] uppercase hover:bg-[#F8BBD0]">
                  CREDITS & PAYMENT
                </Link>
              </li>
              <li>
                <Link to="/contact" className="bg-[#F8BBD0] block mb-[13px] text-center p-[6px] text-[12px] uppercase hover:bg-[#F8BBD0]">
                  HELP & CONTACTS
                </Link>
              </li>
            </ul> */}
          </div>

          <div className="basis-1/2">
All right reserved
          </div>
          <div className="basis-1/2">
                      
          </div>

        </div>
      </div>
    </>
  );
}

export default Footer;
