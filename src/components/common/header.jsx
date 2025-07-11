import { Link, NavLink, useNavigate } from "react-router-dom";
import BellIcon from "/src/assets/icons/bell.svg";
import LogoutIcon from "/src/assets/icons/logout.svg";
import { useState } from "react";

import MenuIcon from "/src/assets/icons/menu.svg";
import CrossIcon from "/src/assets/icons/cross.svg";
import HeaderLogoImage from "/src/assets/images/h4ulogoheader.png";

import { ROLES } from "../../../constants";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../../axios-client";
const headerLinks = [
  {
    link: "/",
    text: "About Us",
  },
  {
    link: "/search",
    text: "Search",
  },
  {
    link: "/hostess",
    text: "For Hostess/Models",
  },
  {
    link: "/contact",
    text: "Help",
  },
];

const headerLinksLoggedIn = [
  {
    link: "/search",
    text: "Search",
  },
  {
    link: "/profile",
    text: "My Profile",
  },
  {
    link: "/chat",
    text: "Chat",
  },
];

function HeaderLogo() {
  return (
    <Link to="/">
      {/* <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <span className="text-purple-600">H</span>
          <span>4Y</span>
        </div>
        <div className="flex flex-col text-[12.58px] leading-[16.57px] font-[600] border-l pl-2 ">
          <span>HOSTESS</span>
          FOR YOU
        </div>
      </div> */}
      <img src={HeaderLogoImage} alt="" />
    </Link>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { token, user, setUser, setToken, unreadCount } = useStateContext();
  const navigate = useNavigate();

  const triggerLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/api/logout").then(() => {
      console.log("we re out");
      setUser(null);
      setToken(null);
      navigate("/login");
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!token) {
    // IF USER IS NOT LOGGED IN
    return (
      // <div className="mb-24">
        <nav className="bg-white flex items-center justify-between md:px-2 px-8 lg:px-10 py-5 sticky top-0 left-0 w-full z-50  shadow">
          <HeaderLogo />

          <div className="flex items-center justify-between gap-2 md:gap-20 ">
            <div className=" space-x-6 hidden md:flex">
              {headerLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-gray-950 hover:font-medium font-[400] ${
                      isActive ? "text-gray-950 font-medium" : ""
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {/* <img src={GlobeIcon} alt="Globe Icon" /> */}
              <NavLink
                to="/sign-up"
                className="border-2 hover:bg-[#090909] hover:text-white text-[14px] font-[600] px-4 py-4 rounded-2xl leading-[100%] hidden md:block"
              >
                Sign Up Now
              </NavLink>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden focus:outline-none ml-2"
            >
              <img src={!isMenuOpen ? MenuIcon : CrossIcon} alt="Menu" />
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden fixed top-16 left-1 w-[98%] bg-white shadow-lg z-40 rounded-2xl  ">
              <div className="flex flex-col items-center p-4 space-y-4">
                <NavLink
                  to="/sign-up"
                  className="border-2 text-[14px] hover:bg-[#090909] hover:text-white font-[600] px-4 py-4 rounded-2xl leading-[100%] md:hidden w-full text-center "
                >
                  Sign Up Now
                </NavLink>
                {headerLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.link}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-black font-[400] text-center w-full py-2 ${
                        isActive ? "text-black font-[600]" : ""
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>
      // </div>
    );

    // IF USER ISs LOGGED IN
  }
  return (
    // <div className="mb-24">
      <nav className="bg-white flex items-center justify-between md:px-2 px-8 lg:px-10 py-5 sticky top-0 left-0 w-full z-50  shadow">
        <HeaderLogo />
        <div className="flex items-center justify-between ">
          <div className=" space-x-6 hidden md:flex">
            {headerLinksLoggedIn.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-gray-950 hover:font-medium font-[400] flex items-center ${
                    isActive ? "text-gray-950 font-medium" : ""
                  }`
                }
              >
                {link.text}
              </NavLink>
            ))}
            {/* Unread Message Badge */}
            {unreadCount > 0 && (
              <Link to="/chat">
                <div className="relative -start-4 bg-black text-sm text-center text-white rounded-full w-7 h-7 aspect-square px-1.5 py-1">
                  <strong>{unreadCount > 9 ? "9+" : unreadCount}</strong>
                </div>
              </Link>
            )}
          </div>
          {/* <NavLink
            to="/sign-up"
            className="border-2 text-[14px] font-[600] px-4 py-4 rounded-2xl leading-[100%] invisible hidden md:block"
          >
            S
          </NavLink> */}
          <div className="border-2 text-[14px] font-[600] px-4 py-4 rounded-2xl leading-[100%] invisible hidden md:block">
            s
          </div>
          {/* <img className="mx-2" src={BellIcon} alt="Bell Icon" /> */}
          {/* ONLY SHOW CREDITS TO MALE USERS */}
          {user?.role === ROLES.KING && (
            <div className="relative hidden sm:block bg-black text-sm text-center hover:bg-[#8880FE]  text-white rounded-full h-6.5 mx-4 px-2 py-1">
              <strong>{user.profile.credits} <span className="">Credits</span></strong>
            </div>
          )}

          
          <img
            className=" px-4"
            src={LogoutIcon}
            onClick={(e) => triggerLogout(e)}
            alt="Logout Icon"
          />

          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none ml-2"
          >
            <img src={!isMenuOpen ? MenuIcon : CrossIcon} alt="Menu" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden fixed top-16 left-1 w-[98%] bg-white shadow-lg z-40 rounded-2xl  ">
            <div className="flex flex-col items-center p-4 space-y-4">
              {/* <NavLink
                to="/sign-up"
                className="border-2 text-[14px] font-[600] px-4 py-4 rounded-2xl leading-[100%] md:hidden w-full text-center "
              >
                Sign Up Now
              </NavLink> */}
              {headerLinksLoggedIn.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `text-gray-700 flex justify-center hover:text-black font-[400] text-center w-full py-2 ${
                      isActive ? "text-black font-[600]" : ""
                    }`
                  }
                >
                  {link.text}

                  {/* Unread Message Badge */}
                  {unreadCount > 0 && link.link == "/chat" && (
                    <Link to="/chat">
                      <div className="relative start-4 bg-black text-sm text-center text-white rounded-full w-6.5 h-6.5 aspect-square px-1.5 py-1">
                        <strong>{unreadCount > 9 ? "9+" : unreadCount}</strong>
                      </div>
                    </Link>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    // </div>
  );
}

export default Header;
