import React, { createRef, useRef, useState } from "react";

import { useEffect, forwardRef, useImperativeHandle } from 'react';

import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants";

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
      alert("Please select an option before proceeding.");
    }
  };

  if(next){
    return <CreatSignup myRole={myRole} />
  }

  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">CHOOSE A PROFILE</h1>
      <div className="max-w-[971px] mx-auto mt-[50px] md:mt-[100px] px-[15px] mb-[50px] md:mb-[121px]">
        {/* Selection Options */}
        <div className="flex flex-col md:flex-row  gap-[30px] md:gap-[150px] mb-6">
          {/* Option 1 */}
          <div
            className={`relative w-full md:w-[50%] h-[171px]  flex items-center justify-center bg-[#F5F5F5]  cursor-pointer  border-4
          ${myRole === ROLES.HOSTESS ? "border-[#E91E63]" : "border-[#FFFFFF]"}`}
            onClick={() => handleSelect(ROLES.HOSTESS)}
          >
            <p className="text-[#424242] text-center text-[22px]">I am an hostess or model</p>
            <span
              className={`absolute top-2 right-2 w-4 h-4 rounded-full
            ${myRole === ROLES.HOSTESS ? "bg-[#E91E63]" : "bg-white"}`}
            ></span>
          </div>

          {/* Option 2 */}
          <div
            className={`relative w-full md:w-[50%] h-[171px] flex items-center justify-center bg-[#F5F5F5]  cursor-pointer border-4
          ${myRole === ROLES.KING ? "border-[#E91E63]" : "border-[#FFFFFF]"}`}
            onClick={() => handleSelect(ROLES.KING)}
          >
            <p className="text-[#424242] text-center text-[22px]">I am looking for an hostess or model</p>
            <span
              className={`absolute top-2 right-2 w-4 h-4 rounded-full 
            ${myRole === ROLES.KING ? "bg-[#E91E63]" : "bg-white"}`}
            ></span>
          </div>
        </div>

        {/* Next Button */}
        <div className="ext-center max-w-[200px] mx-auto mt-[30px] md:mt-[70px]">
          <button
            className="cursor-pointer w-full bg-[#E91E63] uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]"
            onClick={handleNext}
          >
            NEXT
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

const CreatSignup = ({myRole}) => {

  const usernameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
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

  const { setUser, setToken } = useStateContext()
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setSubmitting(true);
    //const date_of_birth = dobRef.current.getDate();
    //const date_of_birth = `${yearRef.current.value || '2000'}-${monthRef.current.value.padStart(2, '0') || '01'}-${dayRef.current.value.padStart(2, '0') || '01'}`;
    const isModel = modelRef?.current?.querySelector('input[name="isModel"]:checked')?.value === '1' ? true : false;
    const payload = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordRef.current.value, // Assuming password_confirmation is the same as password
      dob: dobRef.current.getDate().formatted,
      phone: (CCodeRef.current.value + phoneRef.current.value),
      role: myRole,
      isModel: isModel,
      newsletter: newsletterRef.current.checked,
    };
    // console.log(payload)
    //return;
    try {
      const response = await axiosClient.post('/api/register', payload);
      setErrors({})
      // console.log(response);
      alert('A link is sent to your email address. Click on it to verify account and complete registration')
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
      console.log(err)
      setErrors(err.response.data.formError)
      console.log(err.response.data.formError)
      // const response = err.response;
      // console.log(response);
      // if (response && response.status === 422) {
      //   // setMessage(response.data.message);
      // }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
        <h3 className="text-[32px] md:pt-[70px]">Sign Up </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-[58px]  gap-x-[55px] w-full max-w-[865px]">
            <div >
              <label className="block">Name (Username)</label>
              <input type="text" name="username" ref={usernameRef} className="w-full p-2 bg-[#F5F5F5] focus:outline-0" />
              <ErrorText field='name' />
            </div>
            <div>
              <label className="block">Date of Birth</label>
              <DateOfBirthInput ref={dobRef} />
              <ErrorText field='dob' />
            </div>
            {/* {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>} */}
            {/* <div>
          <label className="block">Date of Birth</label>
          <div className="flex space-x-2">
                <input type="text" ref={dayRef} placeholder="Day" className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0" />
                <input type="text" ref={monthRef} placeholder="Month" className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0" />
                <input type="text" ref={yearRef} placeholder="Year" className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0" />
              </div>
        </div> */}
          </div>
          <div className="mt-[20px] md:mt-[58px]">
            <label className="block">Phone Number</label>
            <div className="flex gap-x-[28px]  max-w-[750px] w-full">
              <input ref={CCodeRef} className="bg-[#F5F5F5] w-full p-2 focus:outline-0 md:max-w-[15%] text-center" placeholder="+39" />
              <input type="text" name="phone" ref={phoneRef} className="w-full md:w-max-[80%] bg-[#F5F5F5] p-2 focus:outline-0 " />
            </div>
            <ErrorText field='phone' />
          </div>
          <div className="flex flex-col md:flex-row max-w-[865px] mt-[20px] md:mt-[58px]  w-full gap-x-[54px]">
            <div className="w-full">
              <label className="block">Email</label>
              <input type="email" name="email" ref={emailRef} className="w-full p-2 focus:outline-0 bg-[#F5F5F5] " />
              <ErrorText field='email' />
            </div>
            <div className="w-full">
              <label className="block">Password</label>
              <input type="password" name="password" ref={passwordRef} className="w-full p-2 focus:outline-0 bg-[#F5F5F5] " />
              <ErrorText field='password' />
            </div>
          </div>

          {myRole == ROLES.HOSTESS &&
          <div className="mt-[20px] md:mt-[58px] mb-[0px]" ref={modelRef}>
            <label className="block mb-[13px]">I am:</label>
            <label className="block space-x-2">
              <input type="radio" name="isModel" value="0" />
              <span>Hostess</span>
            </label>
            <label className="block  space-x-2">
              <input type="radio" name="isModel" value="1" />
              <span>Model</span>
            </label>
          </div>
          }
          <p className="py-[18px] mb-[0px] md:px-[20px]">Hostessforyou.com won't share your private information like phone number or email adress with anyone</p>

          <div className="mb-[0px]">
            <label className="inline-flex items-center">
              <input type="checkbox" value="newsletter" ref={newsletterRef} name="newsletter" />
              <span className="ml-2">Newsletter</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" name="termsAccepted" required />
              <span className="ml-2">I accept the Terms & Conditions and Privacy Policy</span>
            </label>
          </div>
          <button type="submit" disabled={submitting} className={`inline-block p-2 px-[20px] md:px-[70px] bg-[#E91E63] text-white hover:bg-[#F8BBD0] ${submitting ? 'opacity-50' : ''}`}>{submitting ? 'REGISTERING...' : 'CREATE ACCOUNT'}</button>
        </form>
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
        onChange={(e) => setDay(e.target.value)}
        className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0"
      >
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0"
      >
        <option className="" value="">Month</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>{m.name}</option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-1/3 p-2 bg-[#F5F5F5] focus:outline-0"
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
});
