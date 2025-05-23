import React, { createRef, useState } from "react";
import Footer from "/src/components/common/footer";
import Header from "/src/components/common/header";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const emailRef = createRef()
  // const passwordRef = createRef()
  // const { setUser, setToken } = useStateContext()
  // // const handleSubmit = (e) => {
  // //   e.preventDefault();
  // //   console.log("Email:", email);
  // //   console.log("Password:", password);
  // // };
  const navigate = useNavigate();

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

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
    }
    try {
      const response = await axiosClient.post('/api/forgot-password', payload);
      // console.log(response);
      // alert(response.data.message);
      toast.info(response.data.message,{
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                    })
      setErrors({});
      // setUser(response.data.user);
      // setToken(response.data.access_token);
      // console.log('here');
      //navigate('/chat');
    } catch (err) {
      const response = err.response;
      // console.log(response);
      if (response && response.status === 422) {
        setErrors(response.data.formError);
      }
    }
  }

  

  return (
<>
<Header />
<h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Forgot Password</h1>
    <div className="max-w-[971px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
      <div className="">

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-[40px]">
            <label className="block text-[20px] uppercase">Email</label>
            <input
              type="email"
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              required
              className="w-full bg-[#F5F5F5] h-[45px] p-[10px] focus:outline-0"
              placeholder="Enter your email"
            />
            <ErrorText field="email"/>
          </div>


          {/* Login Button */}
          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
        <button type="submit" className="cursor-pointer w-full bg-[#E91E63] uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]">
         Send Link
        </button>
        </div>
        </form>
        {/*Signup Links */}
        <div className="mt-[30px] text-center">
          <p className="text-sm mt-2">
            Don't have an account? <Link to="/sign-up" className="hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ForgotPassword;
