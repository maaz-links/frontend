import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const reviews = [
  { id: 1, user: "USER 2", date: "31/3/24", rating: 5 },
  { id: 2, user: "USER 3", date: "28/3/24", rating: 5 },
  { id: 3, user: "USER 4", date: "26/3/24", rating: 5 },
  { id: 4, user: "USER 5", date: "27/3/24", rating: 5 },
  { id: 5, user: "USER 6", date: "19/3/24", rating: 5 },
];

function Reviews() {
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
      <h2 className="ml-auto text-[32px] font-bold text-right border-b pe-[15px]">Leave a Review</h2>
      {/* Reviews List */}
      <div className="mt-[10px] p-4 pt-[0px]">
        <div className="grid grid-cols-4 font-[600]">
          <p></p>
          <p className="text-[16px]">Unlocked on:</p>
          <p></p>
          <p></p>
        </div>

        {reviews.map((review) => (
          <div key={review.id} className="grid grid-cols-4 items-center  py-3">
            <div className="flex items-center">
              <div className="w-15 h-15 bg-[#B5B5B5BB] rounded-full"></div>
              <p className="ml-3 text-[16px] font-[600]">{review.user}</p>
            </div>
            <p className="text-[16px]">{review.date}</p>
            <div className="text-[18px] text-[#6B6B6BBB]">{"★".repeat(review.rating)}</div>
            <button className="text-[16px] font-[600] italic hover:underline">LEAVE A REVIEW</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Reviews;
