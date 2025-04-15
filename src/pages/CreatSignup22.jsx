import React, { createRef, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";

const CreatSignup = () => {
  // Refs for each input field
  const usernameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const dayRef = createRef();
  const monthRef = createRef();
  const yearRef = createRef();
  const phoneNumberRef = createRef();
  const phoneCountryCodeRef = createRef();
  const roleRef = createRef();
  const newsletterRef = createRef();

  const { setUser, setToken } = useStateContext();

  // Get the current year for the year dropdown options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);

  // Day options: 1 to 31 (can be adjusted based on month)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Month options: January to December
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // Get the selected day, month, and year
    const date_of_birth = `${yearRef.current.value || "2000"}-${(monthRef.current.selectedIndex + 1).toString().padStart(2, "0") || "01"}-${dayRef.current.value.padStart(2, "0") || "01"}`;

    // Getting the selected role from the radio inputs
    const selectedRole =
      roleRef.current.querySelector('input[name="role"]:checked')?.value || "Hostess";

    // Constructing the phone number by combining the country code and the phone number
    const countryCode = phoneCountryCodeRef.current.value || "+39"; // Default to '+39'
    const phoneNumber = phoneNumberRef.current.value || ""; // Phone number input value
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    // Preparing the payload with all input values, using refs for access
    const payload = {
      name: usernameRef.current.value || "",
      email: emailRef.current.value || "",
      password: passwordRef.current.value || "",
      password_confirmation: passwordRef.current.value || "",
      date_of_birth,
      phone: fullPhoneNumber, // Use the combined phone number
      role: selectedRole,
      newsletter: newsletterRef.current.checked || false, // Checkbox value
    };

    // Log the payload (you can remove this in production)
    console.log(payload);

    // Sending the form data to the backend
    try {
      const response = await axiosClient.post("/api/register", payload);
      console.log(response);
      // setUser(response.data.user);
      // setToken(response.data.access_token);
      console.log("registered");
      // navigate('/chat');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
        <h3 className="text-[32px] md:pt-[70px]">Sign Up</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-[58px] gap-x-[55px] w-full max-w-[865px]">
            <div>
              <label className="block">Name (Username)</label>
              <input
                type="text"
                name="username"
                ref={usernameRef}
                className="w-full p-2 bg-[#AEAEAE] focus:outline-0"
              />
            </div>
            <div>
              <label className="block">Date of Birth</label>
              <div className="flex space-x-2">
                <select
                  ref={dayRef}
                  className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0"
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  ref={monthRef}
                  className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0"
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  ref={yearRef}
                  className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0"
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-[20px] md:mt-[58px]">
            <label className="block">Phone Number</label>
            <div className="flex gap-x-[28px] max-w-[750px] w-full">
              <input
                ref={phoneCountryCodeRef}
                className="bg-[#AEAEAE] w-full p-2 focus:outline-0 md:max-w-[15%] text-center"
                placeholder="+39"
              />
              <input
                type="text"
                name="phone"
                ref={phoneNumberRef}
                className="w-full md:w-max-[80%] bg-[#AEAEAE] p-2 focus:outline-0"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-w-[865px] mt-[20px] md:mt-[58px] w-full gap-x-[54px]">
            <div className="w-full">
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="w-full p-2 focus:outline-0 w-[15%] bg-[#AEAEAE]"
              />
            </div>
            <div className="w-full">
              <label className="block">Password</label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                className="w-full p-2 focus:outline-0 w-[15%] bg-[#AEAEAE]"
              />
            </div>
          </div>

          <div className="mt-[20px] md:mt-[58px] mb-[0px]" ref={roleRef}>
            <label className="block mb-[13px]">I am:</label>
            <label className="block space-x-2">
              <input type="radio" name="role" value="Hostess" />
              <span>Hostess</span>
            </label>
            <label className="block space-x-2">
              <input type="radio" name="role" value="Model" />
              <span>Model</span>
            </label>
          </div>

          <p className="py-[18px] mb-[0px] md:px-[20px]">
            Hostessforyou.com won't share your private information like phone number or email address with anyone
          </p>

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

          <button type="submit" className="inline-block p-2 px-[20px] md:px-[70px] bg-black text-white">
            CREATE ACCOUNT
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatSignup;
