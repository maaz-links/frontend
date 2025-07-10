import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";

function BannedNotice() {
  const {username} = useParams();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const url = `api/ban-report/${username}`;
    axiosClient.get(url)
    .then(response => {
      // console.log(url, response);
      setMessage(response.data.message);
    })
    .catch(error => {
        console.error('Error response:', error);
        navigate('/');
    })
    .finally(() => {
      // console.log('Request completed');
    });
    
    }, [])

  const navigate = useNavigate();

  
  return (
    <>
      <Header />
      
      <div className="max-w-[971px] min-h-[300px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px] flex items-center">
      <h1 className="text-center text-[32px] font-[400] mt-[50px] md:mt-[121px]">{message}</h1>

      </div>
      <Footer />
    </>
  );
}

export default BannedNotice;
