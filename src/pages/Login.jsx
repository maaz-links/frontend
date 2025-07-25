import React, { createRef, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { RecaptchaComponent, RecaptchaVerify } from "../functions/RecaptchaVerify";
import BackgroundGrad from "@/components/common/BackgroundGrad";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken, refreshUser, setGenericModalContent, setGenericModalOpen } = useStateContext()
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  //const [recaptchaToken, setRecaptchaToken] = useState(null);
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
    // if(!RecaptchaVerify(recaptchaToken)){
    //   return;
    // }
    setSubmitting(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const response = await axiosClient.post('/api/login', payload);
      // console.log(response);
      setErrors({});
      //BAN LOGIC
      if(response.data.mustverify){
        //  toast.info('A link is sent to your email address. Click on it to verify account and complete registration',{
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //       })
              setGenericModalOpen(true);
              setGenericModalContent(
                <>
                <h1 className=" text-[45px] font-bold">Verifica email</h1>
                <p className=" my-4 ">
                  Verifica la tua mailbox, segui le istruzioni. Benvenuto!
                </p>
                <button onClick={() => setGenericModalOpen(false)} className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full">
                  Prosegui
                </button>
                </>
              )
        // alert('A link is sent to your email address. Click on it to verify account and complete registration')
        navigate(`/`);
        return;
      }

      if(response.data.banned){
        navigate(`/am-i-banned/${response.data.username}`);
        return;
      }

      //setUser(response.data.user);
      //  toast.info('Verify OTP for Successful Login',{
      //         hideProgressBar: true,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //       })
      // alert('Verify OTP for Successful Login');
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
      // console.log(response);
      
      if (response && response.status === 422) {
        setErrors(response.data.formError)
        // setMessage(response.data.message);
      }
    }
    setSubmitting(false);
  }

  const handleUser = async (ev) => {
    ev.preventDefault()
    try {
      const response = await axiosClient.get('/api/user');
      // console.log(response);
      // setUser(data.user);
      // setToken(data.token);
    } catch (err) {
      const response = err.response;
      // console.log(response);
      if (response && response.status === 422) {
        // setMessage(response.data.message);
      }
    }
    
  }

  return (
    <>
      <Header />
      <BackgroundGrad>

      <div className="max-w-[700px] bg-white mx-auto shadow-md rounded-4xl px-[20px] md:px-[20px] py-[20px] ">
        <h1 className="text-center text-[30px] md:text-[40px] my-7"><strong>Accesso</strong></h1>
        <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">


          <form onSubmit={handleSubmit}>
            <div className="mb-4 max-w-[600px] mx-auto">

              <div className="mb-7">
                <div className="block text-[20px] mb-[20px]"><strong>E-mail</strong></div>
                {/* Email Field */}
                <input
                  type="email"
                  ref={emailRef}
                  required

                  className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                  placeholder="Inserisci l'e-mail"
                />
                <ErrorText field='email' />

              </div>
              <div className="mb-7">
                <div className="block text-[20px] mb-[20px]"><strong>Password</strong></div>
                {/* Password Field */}
                <input
                  type="password"
                  ref={passwordRef}
                  required

                  className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                  placeholder="Inserisci la password"
                />
                <ErrorText field='password' />

              </div>

              <div className="text-center mx-auto">

                <div className="text-start">
                  <button type="button" onClick={() => navigate('/forgot-password')}

                    className={`py-[5px] mb-[20px] text-[16px] ${false ? 'text-gray-400 cursor-not-allowed' : 'hover:underline'
                      }`}
                  >
                    <strong>{'Password dimenticata?'}</strong>
                  </button>
                </div>
                <button type='submit'
                  disabled={submitting}
                  className={`${submitting ? 'opacity-50' : ''} cursor-pointer w-full bg-black rounded-2xl text-[20px] text-white p-[22px]`}
                >
                  <strong>{submitting ? 'Accesso in corso...' : 'Accedi'}</strong>
                </button>
              </div>

              <div className="text-center my-9">
                Nuovo utente? <strong><Link to='/sign-up'>Iscriviti gratuitamente</Link></strong>
              </div>
            </div>
          </form>

        </div>
      </div>
      
      </BackgroundGrad>
      <Footer />
    </>
  );
}

export default Login;
