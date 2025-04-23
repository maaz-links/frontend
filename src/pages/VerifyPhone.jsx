import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";

function VerifyPhone() {
  // const [phone, setPhone] = useState("");
  const { token, user, setToken,setUser } = useStateContext();

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const ErrorText = ({ field }) => {
    return (
      <>
        {errors[field]?.map((error, index) => (
          <p key={index} className="text-red-500 text-sm">
            {error}
          </p>
        ))}
      </>
    );
  };
  // const [otpSent, setOtpSent] = useState(false);
  // const [verified, setVerified] = useState(false);
  const otpEmail = sessionStorage.getItem('hostess_otp_email');
  const otpMessage = sessionStorage.getItem('hostess_otp_message');
  const otpPhone = sessionStorage.getItem('hostess_otp_phone');
  const navigate = useNavigate();

  if (!otpEmail || !otpPhone) {
    navigate('/login')
  }

  // Simulate OTP verification
  const verifyOtp = async (e) => {
    e.preventDefault();
    const payload = {
      email: otpEmail,
      otp: otp,
    }
    try {
      const response = await axiosClient.post('/api/verify-otp', payload);
      console.log(response);
      setErrors({});
      //setUser(response.data.user);
      alert('OTP Successfully verified');
      setToken(response.data.access_token);
      sessionStorage.removeItem('hostess_otp_email');
      sessionStorage.removeItem('hostess_otp_phone');
      sessionStorage.removeItem('hostess_otp_message');

      //navigate('/verify-phone');
      // <Navigate to="/verify-phone" replace />
      // console.log('here');
      // window.location.href('/verify-phone');
      // refreshUser();
      // console.log('here');
      // window.location.href('/profile');
    }
    catch (err) {
      const response = err.response;
      console.log(response);
      setErrors(response.data.formError)
      if (response && response.status === 422) {
        // setMessage(response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Verify your Phone Number</h1>
      <div className="max-w-[971px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">


        <form onSubmit={verifyOtp}>
          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-center text-[20px] mb-[20px]">Enter the verification code that we sent to: {otpPhone}</label>

            <input
              type="tel"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder=""
              className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
            />
            <ErrorText field='otp' />
          </div>


          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[45px]">
            <button
              //onClick={sendOtp}
              // onClick={() => { verifyOtp() }}
              className="cursor-pointer w-full bg-[#000] uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]"
            >
              VERIFY
            </button> </div>
          <label className="block text-center text-[20px] mb-[20px]">{otpMessage}</label>

        </form>

      </div>
      <Footer />
    </>
  );
}

export default VerifyPhone;
