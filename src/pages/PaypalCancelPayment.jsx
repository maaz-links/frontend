import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ModelImage from '/src/assets/images/model-img.jpg'
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";

import 'react-loading-skeleton/dist/skeleton.css';

function PaypalCancelPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Payment not Success try again later');
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
