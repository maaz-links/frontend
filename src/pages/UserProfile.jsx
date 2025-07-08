// import React, { useEffect, useState } from 'react';
// import Footer from '../components/common/footer';
// import Header from '../components/common/header';
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useStateContext } from '../context/ContextProvider';
// import axiosClient from '../../axios-client';
// import { dressSizeName, getAttachmentURL } from '../functions/Common';
// import { ROLES } from '../../constants';
// import ReportUserButton from '../components/ReportUserButton';
// import { ClipLoader } from 'react-spinners';
// import { toast } from 'react-toastify';
// import { StarRating } from '../functions/StarRating';
// import { createChat } from '../functions/UnlockChat';

// function UserProfile() {

//   const {token, user, optionsInterest,optionsAvailableFor,languageOptions, getProvinceName ,refreshUser, profileCosts} = useStateContext();
//   const [givenUser, setGivenUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [unlockChat,setUnlockChat] = useState(false);
//   const [canReport,setCanReport] = useState(false);
//   const {username} = useParams();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const url = token ? `/api/user-profile/${username}` : `/api/user-profile-guest/${username}`;
//     axiosClient.get(url)
//     .then(response => {
//       // Handle successful response
//       //setEntities(response.data);
//       setGivenUser(response.data.user)
//       setUnlockChat(response.data.unlockChat)
//       setCanReport(response.data.canReport)
//       console.log(url, response);
      
//     })
//     .catch(error => {
//         console.error('Error response:', error);
//     })
//     .finally(() => {
//       setLoading(false);
//       // console.log('Request completed');
//     });
    
//     }, [])


//     function capitalizeFirstLetter(string) {
//       return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     var settings = {
//         dots: true,
//         className: "center",
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         initialSlide: 1,
//         responsive: [
//           {
//             breakpoint: 1024,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               infinite: true,
//               dots: true
//             }
//           },
//           {
//             breakpoint: 600,
//             settings: {
//               slidesToShow: 1,
//               dots: true,
//               slidesToScroll: 1,
//               arrows:false,
//               initialSlide: 1
//             }
//           },
//           {
//             breakpoint: 480,
//             settings: {
//               slidesToShow: 1,
//               dots: true,
//               arrows:false,
//               slidesToScroll: 1
//             }
//           }
//         ]
//       };
//     if(loading){
//       return <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
//       <ClipLoader color="#E91E63" size={50} />
//     </div>
//     }
//     if(!givenUser){
//       return (
//         <>
//         <Header />
// <div className=' pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px] mb-[400px]'>
//   This user either doesn't exist or has the profile set to pause.
// </div>
// <Footer />
//         </>
//       )
//     }
//     return  (
// <>
// <Header />
// <div className=' pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px]'>
// <h1 className='text-[40px] flex gap-x-[15px] items-center'>{givenUser.name}
//             {givenUser.profile.verified_profile ?
//               <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <title>Verified Profile</title>
//                 <g clipPath="url(#clip0_698_1127)">
//                   <path d="M24.75 12.4651V13.5001C24.7486 15.9261 23.9631 18.2866 22.5105 20.2296C21.0579 22.1727 19.0162 23.5941 16.6898 24.282C14.3634 24.9698 11.8769 24.8872 9.60128 24.0465C7.32564 23.2058 5.38274 21.652 4.06233 19.6168C2.74192 17.5816 2.11477 15.1742 2.27439 12.7534C2.43401 10.3327 3.37186 8.02846 4.94806 6.1843C6.52427 4.34014 8.65438 3.0549 11.0207 2.52026C13.387 1.98562 15.8628 2.23022 18.0788 3.21759M24.75 4.50009L13.5 15.7613L10.125 12.3863" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_698_1127">
//                     <rect width="27" height="27" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg> : ''
//             }
//             {givenUser.profile.top_profile ?
//               <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <title>Top Profile</title>
//               <path 
//                 d="M13.5 2L16.35 9.5H24.3L17.85 14.5L20.7 22L13.5 17L6.3 22L9.15 14.5L2.7 9.5H10.65L13.5 2Z" 
//                 fill="#000" 
//                 stroke="#000"
//                 strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
//               />
//               </svg> : ''
//             }
//             {givenUser.is_online == "online" ?
//               <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <title>Online</title>
//               <path 
//                 d="M13.5 2L16.35 9.5H24.3L17.85 14.5L20.7 22L13.5 17L6.3 22L9.15 14.5L2.7 9.5H10.65L13.5 2Z" 
//                 fill="green" 
//                 stroke="green"
//                 strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
//               />
//               </svg> : ''
//             }
// </h1>
// <p className='italic'><span>{getProvinceName(givenUser.profile.province_id)}</span> | <span>{new Date(givenUser.created_at).getFullYear()}</span></p>
// <div className='flex flex-col md:flex-row gap-[40px] md:gap-x-[100px]  mt-[50px]'>
// <div className='profile-slider md:w-[40%] w-full'>
// {/* <Slider {...settings}> */}
//         <div className="">
//         <a href='#'>
//         <div className="item-inner-box">
//         {/* <img src='https://placehold.co/400x500'/> */}
//         <img src={getAttachmentURL(givenUser.profile_picture_id)}/>
//         {/* <div className='w-full flex'>
//         <img className='w-[50%]' src={getAttachmentURL(givenUser.profile_picture_id)}/>
//         <img className='w-[50%]' src={getAttachmentURL(givenUser.profile_picture_id)}/>
//         </div> */}
//         <div className="w-full flex flex-wrap">
//           {givenUser.other_pics.map((id, i) => (
//             <img
//               key={id ?? i}
//               src={getAttachmentURL(id)}
//               alt={`user-pic-${i + 1}`}
//               className="w-[50%]"
//             />
//           ))}
//         </div>
        
         
//         </div>
//         </a>
//         </div>


//             </div>
//             <div className='profile-details md:w-[60%] w-full'>
//               {/* <p className='flex items-center gap-[10px] text-[16px]'><strong>Years</strong><span>32</span></p> */}
//               <div className="flex flex-wrap">
//                 <div className="w-full md:w-1/2 p-2">
//                   <p className='flex items-center gap-[10px] text-[16px]'><strong>Nationality:</strong><span>{capitalizeFirstLetter(givenUser.profile.nationality || 'Eye Color')}</span></p>
//                   <p className='flex items-center gap-[10px] text-[16px]'><strong>Eye Colour:</strong><span>{capitalizeFirstLetter(givenUser.profile.eye_color || 'Brown')}</span></p>
//                   <p className='flex items-center gap-[10px] text-[16px]'><strong>Shoes size:</strong><span>{givenUser.profile.shoe_size || 0}</span></p>
//                   <p className='flex items-center gap-[10px] text-[16px]'><strong>Height:</strong><span>{givenUser.profile.height || 0}cm</span></p>
//                 {/* </div>
//                 <div className="w-full md:w-1/2 p-2"> */}
//                   {(givenUser.role === ROLES.HOSTESS) &&
//                     <>
//                       <p className='flex items-center gap-[10px] text-[16px]'><strong>Weight:</strong><span>{givenUser.profile.weight || 0}kg</span></p>
//                       <p className='flex items-center gap-[10px] text-[16px]'><strong>Dress size:</strong> <span>{dressSizeName(givenUser.profile.dress_size)}</span></p>
//                       <p className='flex items-center gap-[10px] text-[16px]'><strong>Available for Tours:</strong><span>{givenUser.profile.travel_available ? 'Yes' : 'No'}</span></p>
//                       <p className='flex items-center gap-[10px] text-[16px]'><strong>Telegram:</strong><span>{givenUser.profile.telegram || 'N/A'}</span></p>


//                     </>
//                   }
//                 </div>
//               </div>



// {givenUser.visible_rating && <StarRating rating={givenUser?.rating || 0} size='text-[30px]'  />}
// <div className='about'>
// <h3 className="text-[24px] pt-[26px] border-b">About </h3>
// <p className='pt-[10px]'>{givenUser.profile.description}</p>
// </div>


// {(givenUser.role === ROLES.HOSTESS) &&
// <>

// <h3 className="mt-[24px] font-[400] text-[26px] border-b">Available for:</h3>
            
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
               
//                 {optionsAvailableFor
//                   .filter(item => givenUser.profile.available_services.includes(item.id))
//                   .map((item) => (
//                     <span
//                       key={item.id}
//                       className={`px-3 py-1 text-[11px] text-center min-w-[139px] transition-colors bg-[#F5F5F5]`}
//                     >
//                       {item.name}
//                     </span>
//                   ))
//                 }
          
//         </div>
//         <h3 className="mt-[24px] font-[400] text-[26px] border-b">Personality and Hobbies</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
//         {optionsInterest
//                   .filter(item => givenUser.profile.personal_interests.includes(item.id))
//                   .map((item) => (
//                     <span
//                       key={item.id}
//                       className={`px-3 py-1 text-[11px] text-center min-w-[139px] transition-colors bg-[#F5F5F5]`}
//                     >
//                       {item.name}
//                     </span>
//                   ))
//                 }
//         </div>
// </>}
//         {/* Languages */}
//         <h3 className="mt-[24px] md:mt-[56px] font-[400] text-[26px] border-b">Spoken Languages</h3>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
//         {languageOptions
//                   .filter(item => givenUser.profile.my_languages.includes(item.id))
//                   .map((item) => (
//                     <span
//                       key={item.id}
//                       className={`px-3 py-1 text-[11px] text-center min-w-[139px] transition-colors bg-[#F5F5F5]`}
//                     >
//                       {item.name}
//                     </span>
//                   ))
//                 }
//         </div>
// </div>

// </div>
//   <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[200px]">
//             {unlockChat ?
//               <button onClick={() => createChat(givenUser.id,navigate,refreshUser,user.role,givenUser.name)} className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] p-[12px]  hover:bg-[#F8BBD0] text-[#FFFFFF]">
//                 {user?.role == ROLES.KING ? `UNLOCK CHAT FOR ${givenUser.profile.unlock_cost} CREDITS` : 'SEND FREE MESSAGE'}
//               </button>
//               :
//               <Link to='/chat' className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]">
//                 GO TO THE CHAT
//               </Link>
//             }
//         {/* <button className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]">
//         GO TO THE CHAT
//         </button> */}
//         <div className='mt-20'>
//         {canReport &&
//           <ReportUserButton userId={givenUser.id}/>
//         }
          
          
//         </div>
//         </div>
       
// </div>

// <Footer />

// </>

//     )
    
// }
// export default UserProfile;




// ------------------ NEW CODE ------------------------------




import { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { dressSizeName, getAttachmentURL } from "../functions/Common";
import { ROLES } from "../../constants";
import ReportUserButton from "../components/ReportUserButton";
import { ClipLoader } from "react-spinners";
import { createChat } from "../functions/UnlockChat";

function UserProfile() {
  const {
    token,
    user,
    optionsInterest,
    optionsAvailableFor,
    languageOptions,
    getProvinceName,
    refreshUser,
    profileCosts,
  } = useStateContext();
  const [givenUser, setGivenUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlockChat, setUnlockChat] = useState(false);
  const [canReport, setCanReport] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = token
      ? `/api/user-profile/${username}`
      : `/api/user-profile-guest/${username}`;
    axiosClient
      .get(url)
      .then((response) => {
        setGivenUser(response.data.user);
        setUnlockChat(response.data.unlockChat);
        setCanReport(response.data.canReport);
        console.log(url, response);
      })
      .catch((error) => {
        console.error("Error response:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
        <ClipLoader color="#E91E63" size={50} />
      </div>
    );
  }

  if (!givenUser) {
    return (
      <>
        <Header />
        <div className=" pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px] mb-[400px]">
          This user either doesn't exist or has the profile set to pause.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-black text-[16px] font-[400] hover:text-gray-800 mb-8 text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="flex gap-8">
            {/* Profile Image */}
            <div className=" w-60 lg:w-[672px] flex-shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={
                    getAttachmentURL(givenUser.profile_picture_id) ||
                    "/placeholder.svg"
                  }
                  alt={givenUser.name}
                  className="w-full h-60 lg:h-[526px] object-cover"
                />
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 relative pt-12 ">
              {/* Credit Badge - Top Left */}
              <div className="absolute top-0 left-0 ">
                <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium ">
                  16 Credit
                </div>
              </div>

              {/* User ID - Top Right */}
              <div className="absolute top-0 right-0 text-sm text-gray-400">
                User ID: {givenUser.id}
              </div>

              <div className="my-3 ">
                {/* Name with Green Dot and Age */}
                <h1 className="text-4xl font-normal text-black mb-2 flex items-center">
                  {givenUser.name}
                  <span className="w-2 h-2 bg-green-500 rounded-full mx-2"></span>
                  <span className="text-black text-[16px] font-[400] ">
                    (
                    {new Date().getFullYear() -
                      new Date(givenUser.created_at).getFullYear()}
                    years)
                  </span>
                </h1>

                {/* Location */}
                <div className="flex items-center text-black text-[16px] font-[400] mb-6">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getProvinceName(givenUser.profile.province_id)}
                </div>
              </div>

              {/* About Me */}
              <div className="mb-8">
                <h2 className="text-[20px]  font-extrabold text-black mb-3">
                  About Me
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {givenUser.profile.description || "New User here."}
                </p>
              </div>

              {/* Available for */}
              {givenUser.role === ROLES.HOSTESS && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Available for
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {optionsAvailableFor
                      .filter((item) =>
                        givenUser.profile.available_services.includes(item.id)
                      )
                      .map((item) => (
                        <span
                          key={item.id}
                          className="bg-[#8880FE] text-white px-3 py-2 font-[400] rounded-full text-[14px] "
                        >
                          {item.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Personality and interests */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Personality and interests:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {optionsInterest
                    .filter((item) =>
                      givenUser.profile.personal_interests.includes(item.id)
                    )
                    .map((item) => (
                      <span
                        key={item.id}
                        className="bg-[#F3F3F5] text-black  px-3 py-2 rounded-full text-xs"
                      >
                        {item.name}
                      </span>
                    ))}
                </div>
              </div>

              {/* Informations */}
              <div className="mb-8">
                <h3 className="text[20px]  font-[400] leading-[24px] text-gray-900 mb-4">
                  Informations
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-black text-[16px] font-[400]">
                      Age
                    </span>
                    <span className="text-gray-900">
                      {new Date().getFullYear() -
                        new Date(givenUser.created_at).getFullYear()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-black text-[16px] font-[400]">
                      Eye Colour
                    </span>
                    <span className="text-[#090909]">
                      {capitalizeFirstLetter(
                        givenUser.profile.eye_color || "Blue"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-black text-[16px] font-[400]">
                      Nationality
                    </span>
                    <span className="text-[#090909]">
                      {capitalizeFirstLetter(
                        givenUser.profile.nationality || "Italian"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-black text-[16px] font-[400]">
                      Shoe Size
                    </span>
                    <span className="text-gray-900">
                      {givenUser.profile.shoe_size || "45"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-black text-[16px] font-[400]">
                      Languages
                    </span>
                    <span className="text-gray-900">
                      {languageOptions
                        .filter((item) =>
                          givenUser.profile.my_languages.includes(item.id)
                        )
                        .map((item) => item.name)
                        .join(", ") || "Italian, English"}
                    </span>
                  </div>

                  {givenUser.role === ROLES.HOSTESS && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-black text-[16px] font-[400]">
                          Weight
                        </span>
                        <span className="text-gray-900">
                          {givenUser.profile.weight || "70"}kg
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-black text-[16px] font-[400]">
                      Height
                    </span>
                    <span className="text-[#090909]">
                      {givenUser.profile.height || "170"}cm
                    </span>
                  </div>

                  {givenUser.role === ROLES.HOSTESS && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-black text-[16px] font-[400]">
                          Dress size
                        </span>
                        <span className="text-[#090909]">
                          {dressSizeName(givenUser.profile.dress_size) ||
                            "Medium"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-black text-[16px] font-[400]">
                          Available for Tours
                        </span>
                        <span className="text-gray-900">
                          {givenUser.profile.travel_available ? "Yes" : "No"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-black text-[16px] font-[400]">
                          Telegram
                        </span>
                        <span className="text-orange-500">
                          {givenUser.profile.telegram || "N/A"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Start chat section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Start chat with {givenUser.name}
                </h3>

                {unlockChat ? (
                  <button
                    onClick={() =>
                      createChat(
                        givenUser.id,
                        navigate,
                        refreshUser,
                        user.role,
                        givenUser.name
                      )
                    }
                    className="w-full bg-black text-white py-3 px-6 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    {user?.role == ROLES.KING
                      ? `Unlock Chat for ${givenUser.profile.unlock_cost} credits`
                      : "Send Free Message"}
                  </button>
                ) : (
                  <Link
                    to="/chat"
                    className="block w-full bg-black text-white py-3 px-6 rounded text-sm font-medium text-center hover:bg-gray-800 transition-colors"
                  >
                    Go to the Chat
                  </Link>
                )}
              </div>

              {/* Report Button */}
              {canReport && (
                <div className="mt-8">
                  <ReportUserButton userId={givenUser.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;


