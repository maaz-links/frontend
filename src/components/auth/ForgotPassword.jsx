import React, { createRef, useState } from "react";
import Footer from "/src/components/common/footer";
import Header from "/src/components/common/header";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RecaptchaComponent, RecaptchaVerify } from "../../functions/RecaptchaVerify";

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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);
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
    if(!RecaptchaVerify(recaptchaToken)){
          return;
    }
    setSubmitting(true)
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
      toast.error("Error sending Link. Please wait before try again.",{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      const response = err.response;
      // // console.log(response);
      if (response && response.status === 422) {
        setErrors(response.data.formError);
      }
    }
    setSubmitting(false);
  }

  

  return (
<>
<Header />
    <div className="max-w-[700px] mx-auto rounded-4xl px-[20px] md:px-[20px] py-[20px] my-[170px]">
            <h1 className="text-center text-[38px] my-7"><strong>Forgot Password</strong></h1>
            <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">
    
    
              <form onSubmit={handleSubmit}>
                <div className="mb-4 max-w-[600px] mx-auto">
    
                  <div className="mb-15">
                    <div className="block text-[20px] mb-[20px]"><strong>Email</strong></div>
                    {/* Email Field */}
                    <input
                      type="email"
                      ref={emailRef}
                      required
    
                      className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                      placeholder="Enter Email"
                    />
                    <ErrorText field='email' />
    
                  </div>
    
                  <div className="text-center mx-auto">
    
                    <button type='submit'
                      disabled={submitting}
                      className={`${submitting ? 'opacity-50' : ''} cursor-pointer w-full bg-black rounded-2xl text-[20px] text-white p-[22px]`}
                    >
                      <strong>{submitting ? 'Sending Link...' : 'Send Link'}</strong>
                    </button>
                  </div>
    
                  <div className="text-center my-9">
                    New User? <strong><Link to='/sign-up'>Sign up for Free</Link></strong>
                  </div>
                </div>
              </form>
    
            </div>
          </div>
    <Footer />
    </>
  );
}

export default ForgotPassword;
