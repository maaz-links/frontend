// import React from "react";
// import SideMenu from "/src/components/side-menu";
// import { Outlet, Link } from "react-router-dom";
// import Logo from '/src/assets/images/logo.png'
// import { useStateContext } from "../../context/ContextProvider";
// import { ROLES } from "../../../constants";
// function Header() {

//   const { token, user,unreadCount } = useStateContext();

//   //const [unreadCount, setUnreadCount] = useState(4)
//   return (
//     <>
//       <div>
//         <div className="header bg-[#FFFFFF] border-b-2  border-[#BDBDBD] md:h-[115px] p-[15px] flex flex-col md:flex-row items-center justify-between
// ">
//           {/* <div className="logo">
// <Link to="/">
// <img src={Logo} />
// </Link>
// </div> */}
//           <div className="logo w-[250px] h-[70px] overflow-hidden">
//             <Link to="/">
//               <img
//                 src={Logo}
//                 className="w-full h-full object-cover"
//                 alt="Logo"
//               />
//             </Link>
//           </div>
//           <div className="menu flex  items-center mt-[10px] md:mt-[0px] gap-x-8 md:gap-x-[60px] text-[#424242] justify-between">
//             <Link to="/search">
//               <div className="search text-center">
//                 <div className="icon">
//                   <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M38.3833 41.125L26.0458 28.7875C25.0667 29.5708 23.9406 30.191 22.6677 30.6479C21.3948 31.1049 20.0403 31.3333 18.6042 31.3333C15.0465 31.3333 12.0356 30.1012 9.57135 27.637C7.10712 25.1727 5.875 22.1618 5.875 18.6042C5.875 15.0465 7.10712 12.0356 9.57135 9.57135C12.0356 7.10712 15.0465 5.875 18.6042 5.875C22.1618 5.875 25.1727 7.10712 27.637 9.57135C30.1012 12.0356 31.3333 15.0465 31.3333 18.6042C31.3333 20.0403 31.1049 21.3948 30.6479 22.6677C30.191 23.9406 29.5708 25.0667 28.7875 26.0458L41.125 38.3833L38.3833 41.125ZM18.6042 27.4167C21.0521 27.4167 23.1328 26.5599 24.8464 24.8464C26.5599 23.1328 27.4167 21.0521 27.4167 18.6042C27.4167 16.1562 26.5599 14.0755 24.8464 12.362C23.1328 10.6484 21.0521 9.79167 18.6042 9.79167C16.1562 9.79167 14.0755 10.6484 12.362 12.362C10.6484 14.0755 9.79167 16.1562 9.79167 18.6042C9.79167 21.0521 10.6484 23.1328 12.362 24.8464C14.0755 26.5599 16.1562 27.4167 18.6042 27.4167Z" fill="#F8BBD0" />
//                   </svg>

//                 </div>

//                 <div>Search</div>
//               </div>
//             </Link>

//             {token ?
//               <>
//                 <Link to="/chat">
//                   {/* <div className="chat text-center">
//                     <div className="icon">
//                       <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M41.125 22.5209C41.1317 25.1056 40.5278 27.6554 39.3625 29.9626C37.9808 32.7272 35.8566 35.0526 33.2279 36.6782C30.5992 38.3039 27.5699 39.1655 24.4792 39.1667C21.8944 39.1735 19.3446 38.5696 17.0375 37.4042L5.875 41.1251L9.59583 29.9626C8.43049 27.6554 7.82659 25.1056 7.83333 22.5209C7.83453 19.4302 8.6962 16.4008 10.3218 13.7721C11.9475 11.1435 14.2728 9.01929 17.0375 7.63756C19.3446 6.47221 21.8944 5.86832 24.4792 5.87506H25.4583C29.5402 6.10025 33.3955 7.82313 36.2862 10.7138C39.1769 13.6045 40.8998 17.4599 41.125 21.5417V22.5209Z" stroke="#F8BBD0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </div>
//                     <div>Chat</div>
//                   </div> */}
//                   <div className="chat text-center relative">
//                     {/* Chat Icon Container with relative positioning */}
//                     <div className="icon relative">
//                       <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M41.125 22.5209C41.1317 25.1056 40.5278 27.6554 39.3625 29.9626C37.9808 32.7272 35.8566 35.0526 33.2279 36.6782C30.5992 38.3039 27.5699 39.1655 24.4792 39.1667C21.8944 39.1735 19.3446 38.5696 17.0375 37.4042L5.875 41.1251L9.59583 29.9626C8.43049 27.6554 7.82659 25.1056 7.83333 22.5209C7.83453 19.4302 8.6962 16.4008 10.3218 13.7721C11.9475 11.1435 14.2728 9.01929 17.0375 7.63756C19.3446 6.47221 21.8944 5.86832 24.4792 5.87506H25.4583C29.5402 6.10025 33.3955 7.82313 36.2862 10.7138C39.1769 13.6045 40.8998 17.4599 41.125 21.5417V22.5209Z" stroke="#F8BBD0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>

//                       {/* Unread Message Badge */}
//                       {unreadCount > 0 && (
//                         <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full
//                                       flex items-center justify-center min-w-[20px] h-5 px-1 text-xs">
//                           {unreadCount > 9 ? '9+' : unreadCount}
//                         </div>
//                       )}
//                     </div>
//                     <div>Chat</div>
//                   </div>
//                 </Link>
//                 {(user?.role === ROLES.KING) &&
//                   <div className="user-icon text-center">
//                     <div className="icon">
//                       <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g clipPath="url(#clip0_724_133)">
//                           <path d="M23.5 47C36.4787 47 47 36.4787 47 23.5C47 10.5213 36.4787 0 23.5 0C10.5213 0 0 10.5213 0 23.5C0 36.4787 10.5213 47 23.5 47Z" fill="#FFC018" />
//                           <path fillRule="evenodd" clipRule="evenodd" d="M16.8906 21.2969H30.1094V14.6875H34.5156V38.1875H30.1094V25.7031H16.8906V32.3125H12.4844V8.8125H16.8906V21.2969Z" fill="white" />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_724_133">
//                             <rect width="47" height="47" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                     </div>
//                     <div>{user.profile.credits}</div>
//                   </div>

//                 }
//               </> : <>

//               </>}

//             <div>
//               <SideMenu /> </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Header
import { NavLink } from "react-router-dom";
import GlobeIcon from "/src/assets/icons/globe.svg";

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
    link: "/help",
    text: "Help",
  },
];

function Header() {
  return (
    <nav className="bg-white flex items-center justify-between px-8 py-5 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <span className="text-purple-600">H</span>
          <span>4Y</span>
        </div>
        <div className="flex flex-col text-[12.58px] leading-[16.57px] font-[600] border-l pl-2 ">
          <span>HOSTESS</span>
          FOR YOU
        </div>
      </div>
      <div className="flex space-x-6">
        {headerLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.link}
            className={({ isActive }) =>
              `text-gray-700 hover:text-black font-[400] ${
                isActive ? "text-black font-[600]" : ""
              }`
            }
          >
            {link.text}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center justify-between gap-5 space-x-4">
        <img src={GlobeIcon} alt="Globe Icon" />
        <NavLink
          to="/signup"
          className="border-2 text-[14px] font-[600] px-4 py-4 rounded-2xl leading-[100%]"
        >
          Sign Up Now
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
