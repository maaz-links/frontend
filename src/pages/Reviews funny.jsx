import React, { useState, useEffect } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  // Replace with actual user ID you're reviewing
  const reviewedUserId = 1; 

  useEffect(() => {
    // Fetch reviews for the user
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/users/${reviewedUserId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
    
    // Fetch user data (replace with actual API call)
    setActiveUser({
      id: reviewedUserId,
      name: "USER",
      status: "ACTIVE"
    });
  }, [reviewedUserId]);

  const handleSubmitReview = async (reviewedUser) => {
    if (selectedRating === 0) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/reviews', {
        reviewed_user_id: reviewedUser.id,
        rating: selectedRating,
        comment: comment
      });
      
      setReviews([response.data, ...reviews]);
      setSelectedRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null, onStarHover = null) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-[24px] cursor-pointer ${interactive ? 'hover:text-yellow-400' : ''} ${
              star <= (interactive ? hoverRating || selectedRating : rating)
                ? 'text-yellow-500'
                : 'text-[#BDBDBD]'
            }`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
            onMouseEnter={() => interactive && onStarHover && onStarHover(star)}
            onMouseLeave={() => interactive && onStarHover && onStarHover(0)}
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
        {activeUser && (
          <div className="p-4 flex pb-[0px]">
            <div className="w-[180px] h-[135px] bg-[#F5F5F5]"></div>
            <div className="ml-4">
              <h2 className="text-[20px] font-bold">{activeUser.name}</h2>
              <p className="text-[16px] italic mt-[10px]">
                Profile Status: <span className="font-semibold">{activeUser.status}</span>
              </p>
            </div>
          </div>
        )}

        <h2 className="ml-auto text-[32px] font-bold text-right border-b pe-[15px]">
          Leave a Review
        </h2>

        {/* Review Form */}
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your Review</h3>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            {renderStars(0, true, setSelectedRating, setHoverRating)}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment (optional):</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={() => handleSubmitReview(activeUser)}
            disabled={selectedRating === 0 || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* Reviews List */}
        <div className="mt-[30px] p-4 pt-[0px]">
          <div className="grid grid-cols-4 font-[600]">
            <p></p>
            <p className="text-[16px]">Unlocked on:</p>
            <p></p>
            <p></p>
          </div>

          {reviews.length == 0 && reviews.map((review) => (
            <div key={review.id} className="grid grid-cols-4 items-center py-3 border-b">
              <div className="flex items-center">
                <div className="w-15 h-15 bg-[#F5F5F5] rounded-full"></div>
                <p className="ml-3 text-[16px] font-[600]">
                  {review.reviewer?.name || `USER ${review.reviewer_id}`}
                </p>
              </div>
              <p className="text-[16px]">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
              <div className="text-[18px] text-yellow-500">
                {"★".repeat(review.rating)}
              </div>
              <div className="text-[16px] italic">
                {review.comment || "No comment"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reviews;