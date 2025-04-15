import React, { createRef, useState } from "react";

import { useEffect, forwardRef, useImperativeHandle } from 'react';

import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";

const CreatSignup = () => {

  const usernameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const dayRef = createRef();
  const monthRef = createRef();
  const yearRef = createRef();
  const phoneRef = createRef();
  const roleRef = createRef();
  const newsletterRef = createRef();

  const { setUser, setToken } = useStateContext()
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const date_of_birth = `${yearRef.current.value || '2000'}-${monthRef.current.value.padStart(2, '0') || '01'}-${dayRef.current.value.padStart(2, '0') || '01'}`;
    const selectedRole = roleRef.current.querySelector('input[name="role"]:checked')?.value || 'Hostess';
    const payload = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordRef.current.value, // Assuming password_confirmation is the same as password
      date_of_birth,
      phone: phoneRef.current.value,
      role: selectedRole,
      newsletter: newsletterRef.current.value,
    };
    console.log(payload)
    return;
    try {
      const response = await axiosClient.post('/api/register', payload);
      console.log(response);
      //setUser(response.data.user);
      //setToken(response.data.access_token);
      console.log('registered');
      //navigate('/chat');
    } catch (err) {
      console.log(err)
      // const response = err.response;
      // console.log(response);
      // if (response && response.status === 422) {
      //   // setMessage(response.data.message);
      // }
    }
  }

  // const [formData, setFormData] = useState({
  //   username: "",
  //   day: "",
  //   month: "",
  //   year: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  //   role: "Hostess",
  //   newsletter: false,
  //   termsAccepted: false,
  // });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted", formData);
  // };

  return (
    <>
    <Header />
    <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
<h3 className="text-[32px] md:pt-[70px]">Sign Up </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[58px]  gap-x-[55px] w-full max-w-[865px]">
        <div >
          <label className="block">Name (Username)</label>
          <input type="text" name="username" ref={usernameRef} className="w-full p-2 bg-[#AEAEAE] focus:outline-0" />
        </div>
        <DateOfBirthInput/>
        {/* <div>
          <label className="block">Date of Birth</label>
          <div className="flex space-x-2">
                <input type="text" ref={dayRef} placeholder="Day" className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0" />
                <input type="text" ref={monthRef} placeholder="Month" className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0" />
                <input type="text" ref={yearRef} placeholder="Year" className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0" />
              </div>
        </div> */}
        </div>
        <div className="mt-[20px] md:mt-[58px]">
          <label className="block">Phone Number</label>
          <div className="flex gap-x-[28px]  max-w-[750px] w-full">

            <input className="bg-[#AEAEAE] w-full p-2 focus:outline-0 md:max-w-[15%] text-center" placeholder="+39" />
            <input type="text" name="phone" ref={phoneRef} className="w-full md:w-max-[80%] bg-[#AEAEAE] p-2 focus:outline-0 " />
          </div>
        </div>
        <div className="flex flex-col md:flex-row max-w-[865px] mt-[20px] md:mt-[58px]  w-full gap-x-[54px]">
        <div className="w-full">
          <label className="block">Email</label>
          <input type="email" name="email" ref={emailRef} className="w-full p-2 focus:outline-0 w-[15%] bg-[#AEAEAE] " />
        </div>
        <div className="w-full">
          <label className="block">Password</label>
          <input type="password" name="password" ref={passwordRef} className="w-full p-2 focus:outline-0 w-[15%] bg-[#AEAEAE] " />
        </div></div>
        
        <div className="mt-[20px] md:mt-[58px] mb-[0px]" ref={roleRef}>
          <label className="block mb-[13px]">I am:</label>
          <label className="block space-x-2">
            <input type="radio" name="role" value="Hostess"/>
            <span>Hostess</span>
          </label>
          <label className="block  space-x-2">
            <input type="radio" name="role" value="Model"/>
            <span>Model</span>
          </label>
        </div>
        <p className="py-[18px] mb-[0px] md:px-[20px]">Hostessforyou.com won't share your private information like phone number or email adress with anyone</p>

        <div className="mb-[0px]">
          <label className="inline-flex items-center">
            <input type="checkbox" ref={newsletterRef} name="newsletter" />
            <span className="ml-2">Newsletter</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" name="termsAccepted" required />
            <span className="ml-2">I accept the Terms & Conditions and Privacy Policy</span>
          </label>
        </div>
        <button type="submit" className="inline-block p-2 px-[20px] md:px-[70px] bg-black text-white">CREATE ACCOUNT</button>
      </form>
    </div>
    <Footer />
    </>
    
  );
};

export default CreatSignup;

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
    <div>
      <label className="block">Date of Birth</label>
      <div className="flex space-x-2">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0"
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0"
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.name}</option>
          ))}
        </select>
        
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0"
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
});
