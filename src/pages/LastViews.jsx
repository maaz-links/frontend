import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { Outlet, Link } from "react-router-dom";


const Views = [
  { id: 1, user: "USER 2", date: "31/3/24", hour:"16:34" },
  { id: 2, user: "USER 3", date: "28/3/24", hour:"14:25" },
  { id: 3, user: "USER 4", date: "26/3/24", hour:"11:29" },
  { id: 4, user: "USER 5", date: "27/3/24", hour:"23:51" },
  { id: 5, user: "USER 6", date: "19/3/24", hour:"03:33" },
];

function LastViews() {
  return (
    <>
    <Header />
    <div className="max-w-[1300px] m-auto mt-[60px] mb-[60px]">
      {/* User Profile Section */}
      <div className=" p-4 flex pb-[0px]">
        <div className="w-[180px] h-[135px] bg-[#B5B5B5BB]"></div>
        <div className="ml-4">
          <h2 className="text-[20px] font-bold">USER</h2>
          <p className="text-[16px] italic mt-[10px]">Profile Status: <span className=" font-semibold">ACTIVE</span></p>
        </div>
       
      </div>
      <h2 className="ml-auto text-[32px] font-bold text-right border-b pe-[15px]">Last views of the profile</h2>
      {/* Reviews List */}
      <div className="mt-[10px] p-4 pt-[0px]">
        <div className="grid grid-cols-4 font-[600]">
          <p></p>
          <p className="text-[16px] text-center">DATE</p>
          <p className="text-[16px] text-center">HOUR</p>
          <p></p>
        </div>

        {Views.map((view) => (
          <div key={view.id} className="grid grid-cols-4 items-center  py-3">
            <div className="flex items-center">
              <div className="w-15 h-15 bg-[#B5B5B5BB] rounded-full"></div>
              <p className="ml-3 text-[16px] font-[600]">{view.user}</p>
            </div>
            <p className="text-[16px] text-center">{view.date}</p>
            <div className="text-[18px] text-[#000] text-center">{view.hour}</div>
         <div className="text-center">   <Link to="/chat" className="text-[16px] font-[600] bg-black text-white p-[10px] px-[20px]  hover:bg-[#8B8B8B]">Chat</Link> </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default LastViews;
