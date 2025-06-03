import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { formatDateToDMY, formatToHourMinute, getAttachmentURL } from "../functions/Common";




function LastViews() {


  const {user,getProvinceName} = useStateContext()

  const [views, setViews] = useState([]);

  useEffect(() => {
    axiosClient.get('/api/last-views')
    .then(response => {
      //setGivenUser(response.data)
      setViews(response.data);
      // console.log('lastviews:', response.data);
      
    })
    .catch(error => {
        console.error('Error response:', error);
    })
    .finally(() => {
      // console.log('Request completed');
    });
  }, [])
  
  
  return (
    <>
    <Header />
    <div className="max-w-[1300px] m-auto mt-[60px] mb-[60px]">
      {/* User Profile Section */}
      <div className=" p-4 flex pb-[0px]">
        <div className="w-[130px] h-[130px] bg-[#F5F5F5]">

        {user.profile_picture_id && <img className={`w-full h-full object-cover`} src={getAttachmentURL(user.profile_picture_id)}></img>}
        </div>
        <div className="ml-4">
          <h2 className="text-[20px] font-bold">{user.name || 'USER'}</h2>
          <p className="text-[16px] italic mt-[10px]">{getProvinceName(user?.profile?.province_id) || 'City'}</p>
        </div>
       
      </div>
      <h2 className="ml-auto text-[32px] font-bold text-right border-b pe-[15px]">Last views of the profile</h2>
      {/* Reviews List */}
      {(views.length == 0) ? 

      <div className="mt-[10px] p-4 pt-[0px]">No Views</div>
      :
      <div className="mt-[10px] p-4 pt-[0px]">
        <div className="grid grid-cols-4 font-[600]">
          <p></p>
          <p className="text-[16px] text-center">DATE</p>
          <p className="text-[16px] text-center">TIME</p>
          <p></p>
        </div>

        {views.map((view) => (
          <div key={view.id} className="grid grid-cols-4 items-center  py-3">
            <div className="flex items-center">
              {/* <a href={`/user-profile/${view?.viewer?.name}`}> */}
              <div className="w-15 h-15 bg-[#F5F5F5] rounded-full">
              <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(view?.viewer?.profile_picture_id)}></img>
              </div>
              {/* </a> */}
              <p className="ml-3 text-[16px] font-[600]">{view?.viewer?.name}</p>
            </div>
            <p className="text-[18px] text-center">{formatDateToDMY(view.created_at)}</p>
            <div className="text-[18px] text-[#424242] text-center">{formatToHourMinute(view.created_at)}</div>
         <div className="text-center">   <Link to={`/user-profile/${view?.viewer?.name}`} className="text-[16px] font-[600] bg-[#E91E63] text-white p-[10px] px-[20px]  hover:bg-[#F8BBD0]">View Profile</Link> </div>
          </div>
        ))}
      </div>
      }
    </div>
    <Footer />
    </>
  );
}

export default LastViews;
