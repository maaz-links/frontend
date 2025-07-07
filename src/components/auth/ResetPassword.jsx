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
  const confirmPasswordRef = createRef()
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
    //throw new Error('Missing required reset parameters');
    //navigate('/');
    //navigate('/404');
        //return <></>;
  }

  //const backendLink = `${id}?expires=${expires}&hash=${hash}&signature=${signature}`;

  //console.log(token,email);

  const handleSubmit = async (ev) => {

    ev.preventDefault()
    setSubmitting(true);
    const payload = {
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
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


    <div className="max-w-[700px] mx-auto rounded-4xl px-[20px] md:px-[20px] py-[20px] my-[170px]">
            <h1 className="text-center text-[38px] my-7"><strong>Reset Password</strong></h1>
            <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">
    
    
              <form onSubmit={handleSubmit}>
                <div className="mb-4 max-w-[600px] mx-auto">
                  
                  <div className="mb-7">
                    <div className="block text-[20px] mb-[20px]"><strong>New Password</strong></div>
                    {/* Password Field */}
                    <input
                      type="password"
                      ref={passwordRef}
                      required
    
                      className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                      placeholder="Enter New Password"
                    />
                    <ErrorText field='password' />
    
                  </div>
                  <div className="mb-15">
                    <div className="block text-[20px] mb-[20px]"><strong>Confirm New Password</strong></div>
                    {/* Password Field */}
                    <input
                      type="password"
                      ref={confirmPasswordRef}
                      required
    
                      className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                      placeholder=""
                    />
                    <ErrorText field='password_confirmation' />
    
                  </div>
    
                  <div className="text-center mx-auto">
    
                    <button type='submit'
                      disabled={submitting}
                      className={`${submitting ? 'opacity-50' : ''} cursor-pointer w-full bg-black rounded-2xl text-[20px] text-white p-[22px]`}
                    >
                      <strong>{submitting ? 'Submitting...' : 'Submit'}</strong>
                    </button>
                  </div>
    
                  <div className="text-center my-9">
                    New User? <strong><Link to='/signup'>Sign up for Free</Link></strong>
                  </div>
                </div>
              </form>
    
            </div>
          </div>
    <Footer />
    </>
  );
}

export default ResetPassword;
