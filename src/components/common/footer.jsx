import React from "react";
import { Outlet, Link } from "react-router-dom";
import Logo from '/src/assets/images/h4ulogofooter.png';

function Footer() {
  return (
    <>
      {/* <Outlet /> */}
      <div className="footer md:bg-black bg-black pt-[50px] pb-[50px]">
        <div className="md:flex max-w-[1300px] m-auto justify-between px-[15px] text-white md:text-white ">

          {/* Footer Intro Section */}
          <div className="footer-intro text-center md:text-left flex items-center mb-15 md:mb-0 justify-center">
            <Link to="/"> <img className="m-auto md:m-0" src={Logo} alt="Logo" /></Link>
            {/* <p className="text-white md:max-w-[346px] text-[14px] mt-[18px]">
              Aliquam in feugiat orci. Phasellus ullamcorper nibh turpis, vitae rutrum enim malesuada sed. Cras a dui vestibulum, cursus leo in, dignissim libero.
            </p> */}
          </div>

          {/* Footer Menu Section */}
          <div className="footer-menu md:mt-[0px] flex justify-center gap-4 md:gap-10 md:h-[100px] items-center"
          >
            <FooterLink link="/">Chi siamo</FooterLink>
            <FooterLink link="/search">Cerca</FooterLink>
            <FooterLink link="/hostess">Per Hostess/Models</FooterLink>
            <FooterLink link="/help">Aiuto</FooterLink>
          </div>
        </div>
        <div className="md:flex flex-row-reverse max-w-[1300px] m-auto justify-between px-[15px] text-gray-500 ">
          <div className="footer-menu md:mt-[0px] flex justify-center gap-4"
          >
            <FooterLink link="/terms">Termini e Condizioni</FooterLink>
            <FooterLink link="/privacy">Privacy Policy</FooterLink>
          </div>

          <div className="footer-menu md:mt-[0px] flex justify-center gap-4"
          >
            <FooterLink link="">&copy; 2025 Hostess For You</FooterLink>

          </div>
        </div>


      </div>
    </>
  );
}

function FooterLink({ link, children }) {
  return <>
    <Link to={link} className="mb-[13px] text-center p-[6px] text-nowrap text-[13px] sm:text-[15px] md:text-[20px]">
      {children}
    </Link>
  </>
}

export default Footer;
