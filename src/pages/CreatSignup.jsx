import React, { createRef, useRef, useState } from "react";

import { useEffect, forwardRef, useImperativeHandle } from 'react';

import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../../constants";
import { toast } from "react-toastify";
import { RecaptchaComponent, RecaptchaVerify } from "../functions/RecaptchaVerify";
import femaleIcon from "../assets/icons/female-symbol.svg";
import femaleIconWhite from "../assets/icons/female-symbol-white.svg";
import maleIcon from "../assets/icons/male-symbol.svg";
import maleIconWhite from "../assets/icons/male-symbol-white.svg";

const SignUp = () => {
  //const [selectedOption, setSelectedOption] = useState(null);
  const [myRole, setMyRole] = useState(null);
  const [next, setNext] = useState(null);
  const handleSelect = (option) => {
    //setSelectedOption(option);
    setMyRole(option);
  };
  //constnavigate =
  const handleNext = () => {
    if (myRole) {
      //alert(`You selected: ${myRole}`);
      setNext(1);
      //window.location.href = '/create-signup'
    } else {
      toast.info('Please select an option before proceeding.',{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      // alert("Please select an option before proceeding.");
    }
  };

  if(next){
    return <CreatSignup myRole={myRole} />
  }

  return (
    <>
      <Header />
      <div className="max-w-[700px] mx-auto rounded-4xl px-[20px] md:px-[20px] py-[20px] my-[170px] ">
      <h1 className="text-center text-[40px] font-[400] mt-[20px]"><strong>Create your Profile</strong></h1>
      <h2 className="text-center text-[22px] mb-[50px] font-[400] mt-[20px]">Choose a Profile</h2>
      <div className="max-w-[971px] mx-auto px-[15px] mb-[50px]">
        {/* Selection Options */}
        <div className="flex flex-col md:flex-row gap-[30px] mb-6">
          {/* Option 1 */}
          <div
            className={`relative mx-auto rounded-4xl w-[50%] aspect-square p-5 flex flex-wrap items-center justify-center cursor-pointer 
          ${myRole === ROLES.HOSTESS ? "bg-[#8880FE] text-white" : "bg-[#F3F3F5] text-black"}`}
            onClick={() => handleSelect(ROLES.HOSTESS)}
          >
            <img
              className="w-[40%]"
              src={myRole === ROLES.HOSTESS ? femaleIconWhite : femaleIcon}
              alt="Hostess Icon"
            />
            <p className="text-center text-[15px] sm:text-[22px]"><strong>I am an hostess or model</strong></p>
            {/* <span
              className={`absolute top-2 right-2 w-4 h-4 rounded-fulll
            ${myRole === ROLES.HOSTESS ? "bg-[#E91E63]" : "bg-white"}`}
            ></span> */}
          </div>

          {/* Option 2 */}
          <div
            className={`relative mx-auto rounded-4xl w-[50%] aspect-square p-5 flex flex-wrap items-center justify-center cursor-pointer 
          ${myRole === ROLES.KING ? "bg-[#8880FE] text-white" : "bg-[#F3F3F5] text-black"}`}
            onClick={() => handleSelect(ROLES.KING)}
          >
            <img
              className="w-[40%]"
              src={myRole === ROLES.KING ? maleIconWhite : maleIcon}
              alt="King Icon"
            />
            <p className="text-center text-[15px] sm:text-[22px]"><strong>I am looking for an hostess or model</strong></p>
            {/* <span
              className={`absolute top-2 right-2 w-4 h-4 rounded-fulll
            ${myRole === ROLES.HOSTESS ? "bg-[#E91E63]" : "bg-white"}`}
            ></span> */}
          </div>
        </div>

        {/* Next Button */}
        <div className="ext-center max-w-[200px] mx-auto mt-[30px] md:mt-[70px]">
          <button
            className="cursor-pointer w-full bg-black text-[20px] text-white p-[12px] rounded-4xl"
            onClick={handleNext}
          >
            <strong>NEXT</strong>
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

const CreatSignup = ({myRole}) => {

  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) // Remove if already selected
        : [...prev, id] // Add if not selected
    );
  };

  const usernameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();
  // const dayRef = createRef();
  // const monthRef = createRef();
  // const yearRef = createRef();
  const dobRef = useRef();
  const phoneRef = createRef();
  const CCodeRef = createRef();
  const modelRef = createRef();
  const newsletterRef = createRef();

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

  const { setUser, setToken,setGenericModalOpen,setGenericModalContent,profileTypeList } = useStateContext();
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if(!RecaptchaVerify(recaptchaToken)){
          return;
    }
    setSubmitting(true);
    //const date_of_birth = dobRef.current.getDate();
    //const date_of_birth = `${yearRef.current.value || '2000'}-${monthRef.current.value.padStart(2, '0') || '01'}-${dayRef.current.value.padStart(2, '0') || '01'}`;
    const isModel = modelRef?.current?.querySelector('input[name="isModel"]:checked')?.value === '1' ? true : false;
    const payload = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value, // Assuming password_confirmation is the same as password
      dob: dobRef.current.getDate().formatted,
      //phone: (CCodeRef.current.value + phoneRef.current.value),
      phone: phoneRef.current.value,
      role: myRole,
      isModel: isModel,
      profileTypes: selectedIds,
      newsletter: 0,
    };
    // console.log(payload)
    //return;
    try {
      const response = await axiosClient.post('/api/register', payload);
      setErrors({})
      // console.log(response);
      // alert('A link is sent to your email address. Click on it to verify account and complete registration')
      // toast.info('A link is sent to your email address. Click on it to verify account and complete registration.',{
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      // })
      setGenericModalOpen(true);
              setGenericModalContent(
                <>
                <h1 className=" text-[45px] font-bold">Verify your email</h1>
                <p className=" my-4 ">
                  Check your mailbox, follow the instructions, and confirm account!
                </p>
                <button onClick={() => setGenericModalOpen(false)} className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full">
                  Got It
                </button>
                </>
              )
      navigate('/');
      // //WITHOUT EMAIL VERIF
      // alert("Account Successfully created")
      
      // // setUser(response.data.user);
      // //setToken(response.data.access_token);

      // console.log('registered');
      // sessionStorage.setItem('hostess_otp_email', payload.email);
      // sessionStorage.setItem('hostess_otp_phone', response.data.phone);
      // sessionStorage.setItem('hostess_otp_message', response.data.message);
      // //setToken(response.data.access_token);
      // navigate('/verify-phone');
      // //navigate('/chat');
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(err.response.data.formError)
      }
    }
    setSubmitting(false);
  }

  return (
    <>
      <Header />
      
      <div className="max-w-[700px] mx-auto rounded-4xl px-[20px] md:px-[20px] py-[20px] my-[170px]">
        <h1 className="text-center text-[38px] my-7"><strong>Free Registration</strong></h1>
        <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">


          <form onSubmit={handleSubmit}>
            <div className="mb-4 max-w-[600px] mx-auto">

              <div className="mb-7">
                  <div className="block text-[20px] mb-[20px]"><strong>Name (or Nickname)</strong></div>
                  {/* Name Field */}
                  <input
                    type="name"
                    ref={usernameRef}
                    required

                    className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                    placeholder="Enter Username"
                  />
                  <ErrorText field='name' />
           
              </div>
              <div className="mb-7">
            <div className="block text-[20px] mb-[20px]"><strong>Date of Birth</strong></div>
              <DateOfBirthInput ref={dobRef} />
              <ErrorText field='dob' />
            </div>
              <div className="mb-7">
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
              <div className="mb-7">
                <div className="block text-[20px] mb-[20px]"><strong>Mobile Phone</strong></div>
                {/* Phone Field */}
                <input
                  type="phone"
                  ref={phoneRef}
                  required

                  className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                  placeholder="Enter Phone Number"
                />
                <ErrorText field='phone' />

              </div>
              <div className="mb-7">
                <div className="block text-[20px] mb-[20px]"><strong>Password</strong></div>
                {/* Password Field */}
                <input
                  type="password"
                  ref={passwordRef}
                  required

                  className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                  placeholder="Enter Password"
                />
                <ErrorText field='password' />

              </div>
              <div className="mb-7">
                <div className="block text-[20px] mb-[20px]"><strong>Confirm Password</strong></div>
                {/* Confirm Password Field */}
                <input
                  type="password"
                  ref={confirmPasswordRef}
                  required
                  className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                  placeholder="Enter Password"
                />
                <ErrorText field='password_confirmation' />

              </div>
              
              {myRole == ROLES.HOSTESS && <>
                <div className="block text-[20px] mb-[20px]"><strong>I am a</strong></div>
                <div className="flex flex-wrap">
                  {profileTypeList.map((type) => (
                    <div key={type.id} className="inline-flex items-center mr-5 mb-3">
                      <input
                        type="checkbox"
                        id={`profile-type-${type.id}`}
                        checked={selectedIds.includes(type.id)}
                        onChange={() => handleCheckboxChange(type.id)}
                        className="mr-2 w-[25px] aspect-square appearance-none bg-gray-300 rounded focus:outline-none csshecked:bg-blue-500"
                      />
                      <label htmlFor={`profile-type-${type.id}`} className="ml-2">
                        {type.name}
                      </label>
                    </div>
                  ))}
                </div>
              </>}
                
              <div className="text-center mx-auto">

                <div className="text-center my-8">
                Hostessforyou.com won't share your private information like phone number or email address with anyone
                </div>
                <div className="text-center my-8">
                  <div className="inline-flex items-center ">
                    <input type="checkbox" name="termsAccepted" required className="mr-2 w-[25px] aspect-square appearance-none bg-gray-300 rounded focus:outline-none" />
                    <span className="ml-2">I accept the <Link to="/terms"><strong>Terms & Conditions</strong></Link> and <Link to="/privacy"><strong>Privacy Policy</strong></Link></span>
                  </div>
                </div>
                {/* <div className="text-start">
                  <button type="button" onClick={() => navigate('/forgot-password')}

                    className={`py-[5px] mb-[20px] text-[16px] ${false ? 'text-gray-400 cursor-not-allowed' : 'hover:underline'
                      }`}
                  >
                    <strong>{'Forgot Password?'}</strong>
                  </button>
                </div> */}
                <button type='submit'
                  disabled={submitting}
                  className={`${submitting ? 'opacity-50' : ''} cursor-pointer w-full bg-black rounded-2xl text-[20px] text-white p-[22px]`}
                >
                  <strong>{submitting ? 'Registering...' : 'Create Account'}</strong>
                </button>
              </div>
              <div className="text-center my-9">
                              Have an account? <strong><Link to='/login'>Sign in</Link></strong>
                            </div>

                      <style jsx>{`
                input[type="checkbox"] {
                  appearance: none;
                  position: relative;
                }
                input[type="checkbox"]:checked::after {
                  content: "✔";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: #000;
                  font-size: 14px;
                }
              `}</style>
            </div>
          </form>

        </div>
      </div>
      <Footer />
    </>

  );
};

export default SignUp;

const DateOfBirthInput = forwardRef((props, ref) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState(31);

  // Months data
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];

  // Generate days based on current month and year
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    return dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
  });

  // Generate years (from current year - 100 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => `${currentYear - i}`);

  // Update days in month when month or year changes
  useEffect(() => {
    if (month && year) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      let days = 31;

      if (month === '04' || month === '06' || month === '09' || month === '11') {
        days = 30;
      } else if (month === '02') {
        days = isLeapYear ? 29 : 28;
      }

      setDaysInMonth(days);

      // Reset day if it's now invalid for the new month
      if (day && parseInt(day) > days) {
        setDay('');
      }
    }
  }, [month, year, day]);

  // Expose the date value via ref
  useImperativeHandle(ref, () => ({
    getDate: () => {
      if (day && month && year) {
        return {
          day,
          month,
          year,
          formatted: `${year}-${month}-${day}`,
          isValid: true
        };
      }
      return {
        day: '',
        month: '',
        year: '',
        formatted: '',
        isValid: false
      };
    }
  }));

  return (

    <div className="flex space-x-2">
      <select
        value={day}
        onChange={(e) => {setDay(e.target.value);}}
        className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
      >
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
      >
        <option className="" value="">Month</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>{m.name}</option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        //className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0"
        className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
});
