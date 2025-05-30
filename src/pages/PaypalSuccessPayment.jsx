import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";

function PaypalSuccessPayment() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  const hasFetchedRef = useRef(false);

  const queryParams = new URLSearchParams(location.search);
  const shopId = queryParams.get("shopId");
  const token = queryParams.get("token");
  const payerId = queryParams.get("PayerID");

  const { refreshUser } = useStateContext();
  const [message, setMessage] = useState('');

  const BuyCredit = async () => {
    try {
      const response = await axiosClient.post("api/add/user-credits", {
        payment_method: "paypal",
        shopId,
        token, 
        paymentIntentId:payerId,
      });

      if (response?.data?.status === true) {
        setMessage('You have purchased credits successfully')
        toast.success(response.data.message);
        refreshUser();
        navigate(`/shop`);
      } else {
        toast.error("Failed to add credits.");
      }
    } catch (error) {
      setMessage('Error adding credits.')
      toast.error("Error adding credits.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current && shopId && token && payerId) {
      console.log("11");
      hasFetchedRef.current = true; 
      BuyCredit(); 
    } else if (!shopId || !token || !payerId) {
      toast.error("Missing payment details.");
      setLoading(false); 
    }
  }, [shopId, token, payerId]); 

  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">
        Shop
      </h1>
      <div className="max-w-[1180px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-[15px] md:gap-x-[40px]">
          {loading ? (
            <h1 className="font-bold text-center text-[30px]">Processing...</h1>
          ) : (
            <h1 className="font-bold text-center text-[30px]">
              {message}
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaypalSuccessPayment;
