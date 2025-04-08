import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

function VerifyPhone() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // Simulate sending OTP
  const sendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      alert("OTP sent to " + phone);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  // Simulate OTP verification
  const verifyOtp = () => {
    if (otp === "1234") {
      setVerified(true);
      alert("Phone number verified successfully!");
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <>
    <Header />
    <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Verify your Phone Number</h1>
      <div className="max-w-[971px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
       

        {!verified ? (
          <>
            {/* Phone Number Input */}
            <div className="mb-4">
              <label className="block text-center text-[20px] mb-[20px]">Enter the verification code that we sent to: +39 333 333 3333</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
                className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
              />
            </div>

            {!otpSent ? (
                <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[45px]">
              <button
                onClick={sendOtp}
                className="cursor-pointer w-full bg-[#000] uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]"
              >
                VERIFY
              </button> </div>
            ) : (
              <>
                {/* OTP Input */}
                <div className="mb-4 mt-4">
                  <label className="block text-[20px] mb-[20px]">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
                    className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
                  />
                </div>

                <button
                  onClick={verifyOtp}
                  className="cursor-pointer w-full bg-[#000] uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]"
                >
                 VERIFY
                </button>
              </>
            )}
          </>
        ) : (
          <p className="text-center text-green-600 font-semibold">
            ✅ Phone number verified successfully!
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default VerifyPhone;
