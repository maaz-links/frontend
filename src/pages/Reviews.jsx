import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axios from "axios";
import axiosClient from "../../axios-client";
import { formatDateToDMY, getAttachmentURL } from "../functions/Common";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";

const Reviews = () => {
  // Sample data of users that can be reviewed
  const [reviewableUsers, setReviewableUsers] = useState([]);

  const {user ,getProvinceName} = useStateContext();

  // State to track ratings for each user
  const [ratings, setRatings] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axiosClient.get('/api/reviews')
    .then(response => {
      //setGivenUser(response.data)
      setReviewableUsers(response.data);
      // console.log('rev:', response.data);
    })
    .catch(error => {
        console.error('Error response:', error);
    })
    .finally(() => {
      // console.log('Request completed');
    });
  }, [])

  const handleRatingChange = (userId, rating) => {
    setRatings(prev => ({
      ...prev,
      [userId]: rating
    }));
    //console.log(ratings);
  };

  const handleSubmitReview = async (userId) => {
    if (!ratings[userId]) return;
    
    setIsSubmitting(true);
    try {
      const response = await axiosClient.post('/api/reviews', {
        reviewed_user_id: userId,
        rating: ratings[userId]
      });
      //alert(response.data.message)
      toast.success(response.data.message,{
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                        })
      // Remove the user from reviewable list after successful submission
      setReviewableUsers(prev => prev.filter(user => user.id !== userId));
      setRatings(prev => {
        const newRatings = {...prev};
        delete newRatings[userId];
        return newRatings;
      });
    } catch (error) {
      const ratingError = error?.response?.data?.formError?.rating?.[0] ?? 'An unexpected error occurred.';
    
      toast.error(ratingError, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (userId, currentRating) => {
    return (
      <div className="flex justify-center">
        {[1, 2, 3, 4, 5].map((star,index) => (
          <span
            key={index}
            className={`text-[24px] cursor-pointer hover:text-yellow-400 ${
              star <= (currentRating || 0)
                ? 'text-yellow-500'
                : 'text-[#BDBDBD]'
            }`}
            onClick={() => handleRatingChange(userId, star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="max-w-[1300px] m-auto mt-[60px] mb-[60px]">
        {/* User Profile Section */}
        <div className=" p-4 flex pb-[0px]">
          <div className="w-[130px] h-[130px]">

            {user.profile_picture_id && <img className={`w-full h-full rounded-2xl object-cover`} src={getAttachmentURL(user.profile_picture_id)}></img>}
          </div>
          <div className="ml-4">
            <h2 className="text-[20px] font-bold">{user.name || 'USER'}</h2>
            <p className="text-[16px] italic mt-[10px]">{getProvinceName(user?.profile?.province_id) || 'City'}</p>
          </div>

        </div>

        <h2 className="ml-auto text-[25px] md:text-[32px] font-bold text-start my-5 border-b pe-[15px]">
          Leave a Review
        </h2>

        {/* Reviews List */}
        {(reviewableUsers.length == 0) ? 
        <div className="mt-[10px] p-4 pt-[0px]">No Pending Reviews</div>
          :
        <div className="mt-[10px] p-4 pt-[0px]">
          <div className="grid grid-cols-3 md:grid-cols-4  font-[600]">
            <p></p>
            <p className="hidden md:block text-[16px]">Unlocked on</p>
            <p></p>
            <p></p>
          </div>

          {reviewableUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-3 md:grid-cols-4  items-center py-3">
              <div className="flex items-center">
                <div className="w-15 h-15 bg-[#F5F5F5] rounded-full">
                <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(user.profile_picture_id)}></img>
                </div>
                <p className="hidden sm:block ml-3 text-[16px] font-[600]">{user.name}</p>
              </div>
              <p className="hidden md:block text-[18px]">{formatDateToDMY(user.unlocked_at)}</p>
              <div className="text-[18px] text-[#BDBDBD]">
                {renderStars(user.id, ratings[user.id])}
              </div>
              <button 
                className={`text-[18px] font-[600] italic hover:underline justify-self-end ${
                  !ratings[user.id] ? 'text-[#BDBDBD] cursor-not-allowed' : ''
                }`}
                onClick={() => handleSubmitReview(user.id)}
                disabled={!ratings[user.id] || isSubmitting}
              >
                LEAVE A REVIEW
              </button>
            </div>
          ))}
        </div>}
      </div>
      <Footer />
    </>
  );
};

export default Reviews;