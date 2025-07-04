import React, { createRef, useState } from "react";
import Footer from "/src/components/common/footer";
import Header from "/src/components/common/header";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  //const emailRef = createRef()
  const passwordRef = createRef()
  const location = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
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

  const params = new URLSearchParams(location.search);
  //console.log(location.search);
  const token = params.get('token');
  const email = params.get('email');

  if (!token || !email) {
    throw new Error('Missing required reset parameters');
  }

  //const backendLink = `${id}?expires=${expires}&hash=${hash}&signature=${signature}`;

  //console.log(token,email);

  const handleSubmit = async (ev) => {

    ev.preventDefault()
    setSubmitting(true);
    const payload = {
      password: passwordRef.current.value,
      password_confirmation: passwordRef.current.value,
      email: email,
      token: token,
    }
    try {
      const response = await axiosClient.post('/api/reset-password', payload);
      // console.log(response);
      setErrors({});
      // alert(response.data.message)
      toast.success(response.data.message,{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      // setUser(response.data.user);
      // setToken(response.data.access_token);
      // console.log('here');
      navigate('/login');
      //navigate('/chat');
    } catch (err) {
      const response = err.response;
      // console.log(response);
      if (response && response.status === 422) {
       setErrors(response.data.formError);
      }
    }
    setSubmitting(false);
  }

  

  return (
<>
<Header />
<h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Reset Password</h1>
    <div className="max-w-[971px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
      <div className="">

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-[40px]">
            <label className="block text-[20px] uppercase">New Password</label>
            <input
              type="password"
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              ref={passwordRef}
              required
              className="w-full bg-[#F5F5F5] h-[45px] p-[10px] focus:outline-0"
              placeholder="Enter your new password"
            />
            <ErrorText field="password"/>
          </div>


          {/* Login Button */}
          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
          <button type="submit" disabled={submitting} className={`cursor-pointer w-full bg-[#E91E63] uppercase text-[20px] text-white p-[12px] hover:bg-[#F8BBD0] ${submitting ? 'opacity-50' : ''}`}>
         {submitting ? 'Submitting...' : 'Submit'}
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

export default ResetPassword;
