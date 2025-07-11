import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import 'react-loading-skeleton/dist/skeleton.css';
import { useStateContext } from "/src/context/ContextProvider";

function PaypalCancelPayment() {
  const navigate = useNavigate();
  const {setGenericModalOpen,setGenericModalContent} = useStateContext();
  useEffect(() => {
    // toast.success('Payment not Success try again later');
    
    setGenericModalOpen(true);
              setGenericModalContent(
                <>
                <h1 className=" text-[45px] font-bold">Payment Failed</h1>
                <p className=" my-4 ">
                Payment was not Successful. Please try again later.
                </p>
                <button onClick={() => setGenericModalOpen(false)} className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full">
                  OK
                </button>
                </>
              )
    navigate(`/shop`);

  }, [])

  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Shop</h1>
      <div className="max-w-[1180px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-[15px] md:gap-x-[40px]">
          <h1 className="font-bold text-center text-[30px]">Payment Not Success try again later</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaypalCancelPayment;
