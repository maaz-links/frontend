import React, { useEffect, useState } from 'react';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import { Link, useNavigate, useParams } from "react-router-dom";
import ModelImage from '/src/assets/images/model-img.jpg'
import Slider from "react-slick";
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../../axios-client';
import { dressSizeName, getAttachmentURL, getUserCost } from '../functions/Common';
import { ROLES } from '../../constants';
import ReportUserButton from '../components/ReportUserButton';
import { ClipLoader } from 'react-spinners';




function UserProfile() {

  const {token, user, optionsInterest,optionsAvailableFor,languageOptions, getProvinceName ,refreshUser, profileCosts} = useStateContext();
  const [givenUser, setGivenUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlockChat,setUnlockChat] = useState(false);
  const {username} = useParams();

  const {warnModal, setWarnModal} = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = token ? `/api/user-profile/${username}` : `/api/user-profile-guest/${username}`;
    axiosClient.get(url)
    .then(response => {
      // Handle successful response
      //setEntities(response.data);
      setGivenUser(response.data.user)
      setUnlockChat(response.data.unlockChat)
      // console.log(url, response);
      
    })
    .catch(error => {
        console.error('Error response:', error);
    })
    .finally(() => {
      setLoading(false);
      // console.log('Request completed');
    });
    
    }, [])

    const createChat = async (other_user_id) => {
    try{
      const response = await axiosClient.post('/api/chats/credits',{other_user_id: other_user_id });
      // console.log('buychat',response);
      alert(response.data.message);
      refreshUser();
      navigate('/chat');
    } catch (error) {
      alert(error.response.data.message);
      if(error.response.data.shop_redirect){
        navigate('/shop');
      }
      console.error('Error', error);
    }

    
    }


    var settings = {
        dots: true,
        className: "center",
    infinite: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              dots: true,
              slidesToScroll: 1,
              arrows:false,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows:false,
              slidesToScroll: 1
            }
          }
        ]
      };
    if(loading){
      return <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
      <ClipLoader color="#E91E63" size={50} />
    </div>
    }
    if(!givenUser){
      return (
        <>
        <Header />
<div className=' pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px] mb-[400px]'>
  This user either doesn't exist or has the profile set to pause.
</div>
<Footer />
        </>
      )
    }
    return  (
<>
<Header />
<div className=' pt-[50px] md:pt-[68px] pb-[95px] px-[30px] max-w-[1300px] m-auto mt-[28px]'>
<h1 className='text-[40px] flex gap-x-[15px] items-center'>{givenUser.name}
            {givenUser.profile.verified_profile ?
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Verified Profile</title>
                <g clipPath="url(#clip0_698_1127)">
                  <path d="M24.75 12.4651V13.5001C24.7486 15.9261 23.9631 18.2866 22.5105 20.2296C21.0579 22.1727 19.0162 23.5941 16.6898 24.282C14.3634 24.9698 11.8769 24.8872 9.60128 24.0465C7.32564 23.2058 5.38274 21.652 4.06233 19.6168C2.74192 17.5816 2.11477 15.1742 2.27439 12.7534C2.43401 10.3327 3.37186 8.02846 4.94806 6.1843C6.52427 4.34014 8.65438 3.0549 11.0207 2.52026C13.387 1.98562 15.8628 2.23022 18.0788 3.21759M24.75 4.50009L13.5 15.7613L10.125 12.3863" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_698_1127">
                    <rect width="27" height="27" fill="white" />
                  </clipPath>
                </defs>
              </svg> : ''
            }
            {givenUser.profile.top_profile ?
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Top Profile</title>
              <path 
                d="M13.5 2L16.35 9.5H24.3L17.85 14.5L20.7 22L13.5 17L6.3 22L9.15 14.5L2.7 9.5H10.65L13.5 2Z" 
                fill="#FFD700" 
                stroke="#FFD700"
                strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              />
              </svg> : ''
            }
</h1>
<p className='italic'><span>{getProvinceName(givenUser.profile.province_id)}</span> | <span>{new Date(givenUser.created_at).getFullYear()}</span></p>
<div className='flex flex-col md:flex-row gap-[40px] md:gap-x-[100px]  mt-[50px]'>
<div className='profile-slider md:w-[40%] w-full'>
{/* <Slider {...settings}> */}
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        {/* <img src='https://placehold.co/400x500'/> */}
        <img src={getAttachmentURL(givenUser.profile_picture_id)}/>
         
        </div>
        </a>
        </div>
        {/* <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
        
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
       
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="iitem-inner-box">
        <img src='https://placehold.co/400x500' />
          
        </div>
       </a> 
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
          
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500'/>
         
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500' />
         
        </div>
        </a>
        </div>
        <div className="item">
        <a href='#'>
        <div className="item-inner-box">
        <img src='https://placehold.co/400x500' />
       
        </div>
        </a>
        </div> */}
      {/* </Slider> */}

</div>
<div className='profile-details md:w-[60%] w-full'>

{/* <p className='flex items-center gap-[10px] text-[16px]'><strong>Years</strong><span>32</span></p> */}
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Nationality:</strong><span>{givenUser.profile.nationality}</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Height:</strong><span>{givenUser.profile.height}cm</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Dress size:</strong> <span>{dressSizeName(givenUser.profile.dress_size)}</span></p>
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Shoes size:</strong><span>{givenUser.profile.shoe_size}</span></p>
{(givenUser.role === ROLES.HOSTESS) && 
<p  className='flex items-center gap-[10px] text-[16px]'><strong>Available for Tours:</strong><span>{givenUser.profile.travel_available ? 'Yes':'No'}</span></p>
}
<div className='about'>
<h3 className="text-[24px] pt-[26px] border-b">About </h3>
<p className='pt-[10px]'>{givenUser.profile.description}</p>
</div>


{(givenUser.role === ROLES.HOSTESS) &&
<>

<h3 className="mt-[24px] font-[400] text-[26px] border-b">Available for:</h3>
              {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-[11px] mt-[24px]  max-w-[600px]">
          {["photo model", "fashion pics", "travel & weekend", "dinners", "host hostess", "parties", "fake girlfriend", "talk"].map((item) => (
            <span key={item} className="bg-[#F5F5F5] px-3 py-1  text-[11px] text-center min-w-[78px]">{item}</span>
          ))}
        </div> */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
          {optionsAvailableFor.map((item) => (
            <span key={item.name} className="bg-[#F5F5F5] px-3 py-1  text-[11px] text-center min-w-[78px]">{item.name}</span>
            
            // <div>{item.name}</div>
          ))}
        </div> */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
                {/* {optionsAvailableFor.map((item) => (
            <span key={item.name} className="bg-[#F5F5F5] px-3 py-1  text-[11px] text-center min-w-[78px]">{item.name}</span>
            
            // <div>{item.name}</div>
          ))} */}
                {optionsAvailableFor
                  .filter(item => givenUser.profile.available_services.includes(item.id))
                  .map((item) => (
                    <span
                      key={item.id}
                      className={`px-3 py-1 text-[11px] text-center min-w-[139px] transition-colors bg-[#F5F5F5]`}
                    >
                      {item.name}
                    </span>
                  ))
                }
          
        </div>
        <h3 className="mt-[24px] font-[400] text-[26px] border-b">Personality and Hobbies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
        {optionsInterest
                  .filter(item => givenUser.profile.personal_interests.includes(item.id))
                  .map((item) => (
                    <span
                      key={item.id}
                      className={`px-3 py-1 text-[11px] text-center min-w-[139px] transition-colors bg-[#F5F5F5]`}
                    >
                      {item.name}
                    </span>
                  ))
                }
        </div>
</>}
        {/* Languages */}
        <h3 className="mt-[24px] md:mt-[56px] font-[400] text-[26px] border-b">Spoken Languages</h3>
        {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-[11px] mt-[24px]  max-w-[600px]">
          {["Deutsch", "English", "Italian", "Espanol", "Français"].map((lang) => (
            <span key={lang} className="bg-[#F5F5F5] px-3 py-1  text-[11px] w-full md:w-[78px] text-center">{lang}</span>
          ))}
        </div> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[24px]  max-w-[600px]">
        {languageOptions
                  .filter(item => givenUser.profile.my_languages.includes(item.id))
                  .map((item) => (
                    <span
                      key={item.id}
                      className={`px-3 py-1 text-[11px] text-center min-w-[139px] transition-colors bg-[#F5F5F5]`}
                    >
                      {item.name}
                    </span>
                  ))
                }
        </div>
</div>

</div>
  <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[200px]">
            {unlockChat ?
              <button onClick={() => createChat(givenUser.id)} className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] p-[12px]  hover:bg-[#F8BBD0] text-[#FFFFFF]">
                {user?.role == ROLES.KING ? `UNLOCK CHAT FOR ${getUserCost(givenUser.profile.top_profile,givenUser.profile.verified_profile,profileCosts)} CREDITS` : 'SEND FREE MESSAGE'}
              </button>
              :
              <Link to='/chat' className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]">
                GO TO THE CHAT
              </Link>
            }
        {/* <button onClick={() => createChat(givenUser.id)} className="cursor-pointer w-full bg-[#E91E63] block uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]">
        GO TO THE CHAT
        </button> */}
        <div className='mt-20'>
        {token &&
          <ReportUserButton userId={givenUser.id}/>
        }
          
          
        </div>
        </div>
       
</div>

<Footer />

</>

    )
    
}
export default UserProfile;