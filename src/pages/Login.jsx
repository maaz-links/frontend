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
  const { setUser, setToken } = useStateContext()
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const response = await axiosClient.post('/api/login', payload);
      console.log(response);
      setErrors({});
      setUser(response.data.user);
      setToken(response.data.access_token);
      console.log('here');
      //navigate('/chat');
    } catch (err) {
      const response = err.response;
      console.log(response);
      setErrors(response.data.formError)
      if (response && response.status === 422) {
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
              className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
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
              className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
              placeholder="Enter your password"
            />
            <ErrorText field='password'/>
          </div>

          {/* Login Button */}
          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
        <button type="submit" className="cursor-pointer w-full bg-[#000] uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]">
         Login
        </button>
        </div>
        </form>
        <button onClick={handleUser}>check</button>
        {/* Forgot Password & Signup Links */}
        <div className="mt-[30px] text-center">
          <Link to='/forgot-password' className="px-[25px] py-[5px] bg-[#CFA0A0] hover:underline text-[16px]">Forgot password?</Link>
          <p className="text-sm mt-2">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Login;
