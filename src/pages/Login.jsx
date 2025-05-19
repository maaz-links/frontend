import React, { createRef, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken, refreshUser } = useStateContext()
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setSubmitting(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const response = await axiosClient.post('/api/login', payload);
      console.log(response);
      setErrors({});
      //BAN LOGIC
      if(response.data.mustverify){
        alert('A link is sent to your email address. Click on it to verify account and complete registration')
        navigate(`/`);
        return;
      }

      if(response.data.banned){
        navigate(`/am-i-banned/${response.data.username}`);
        return;
      }

      //setUser(response.data.user);
      alert('Verify OTP for Successful Login');
      sessionStorage.setItem('hostess_otp_email', payload.email);
      sessionStorage.setItem('hostess_otp_phone', response.data.phone);
      sessionStorage.setItem('hostess_otp_message', response.data.message);
      //setToken(response.data.access_token);
      navigate('/verify-phone');
      // <Navigate to="/verify-phone" replace />
      // console.log('here');
      // window.location.href('/verify-phone');
      // refreshUser();
      // console.log('here');
      // window.location.href('/profile');
    } catch (err) {
      const response = err.response;
      console.log(response);
      
      if (response && response.status === 422) {
        setErrors(response.data.formError)
        // setMessage(response.data.message);
      }
    }
  }

  const handleUser = async (ev) => {
    ev.preventDefault()
    try {
      const response = await axiosClient.get('/api/user');
      console.log(response);
      // setUser(data.user);
      // setToken(data.token);
    } catch (err) {
      const response = err.response;
      console.log(response);
      if (response && response.status === 422) {
        // setMessage(response.data.message);
      }
    }finally {
      setSubmitting(false);
    }
    
  }

  return (
<>
<Header />
<h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Login</h1>
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
            <ErrorText field='email'/>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-[20px] uppercase">Password</label>
            <input
              type="password"
              //value={password}
              //onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
              required
              className="w-full bg-[#F5F5F5] h-[45px] p-[10px] focus:outline-0"
              placeholder="Enter your password"
            />
            <ErrorText field='password'/>
          </div>

          {/* Login Button */}
          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
          <button type="submit" disabled={submitting} className={`cursor-pointer w-full bg-[#E91E63] uppercase text-[20px] text-white p-[12px] hover:bg-[#F8BBD0] ${submitting ? 'opacity-50' : ''}`}>
         {submitting ? 'Logging in...' : 'Login'}
        </button>
        </div>
        </form>
        {/* <button onClick={handleUser}>check</button> */}
        {/* Forgot Password & Signup Links */}
        <div className="mt-[30px] text-center">
          <Link 
          to='/forgot-password' 
          
          className="px-[25px] py-[5px] bg-[#F5F5F5] hover:underline text-[16px]">Forgot password?</Link>
          <p className="text-sm mt-2">
            Don't have an account? <a href="/sign-up" className="hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Login;
