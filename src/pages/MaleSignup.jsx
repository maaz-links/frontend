import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const MaleSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    day: "",
    month: "",
    year: "",
    phone: "",
    email: "",
    password: "",
    role: "Hostess",
    newsletter: false,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <>
    <Header />
    <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
<h3 className="text-[32px] md:pt-[70px]">Sign Up </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[58px]  gap-x-[55px] w-full max-w-[865px]">
        <div >
          <label className="block">Name (Username)</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 bg-[#AEAEAE] focus:outline-0" />
        </div>
        <div>
          <label className="block">Date of Birth</label>
          <div className="flex space-x-2">
            <input type="text" name="day" placeholder="Day" value={formData.day} onChange={handleChange} className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0" />
            <input type="text" name="month" placeholder="Month" value={formData.month} onChange={handleChange} className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0" />
            <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-1/3 p-2 bg-[#AEAEAE] focus:outline-0" />
          </div>
        </div>
        </div>
        <div className="mt-[20px] md:mt-[58px]">
          <label className="block">Phone Number</label>
          <div className="flex gap-x-[28px]  max-w-[750px] w-full">

            <input className="bg-[#AEAEAE] w-full p-2 focus:outline-0 md:max-w-[15%] text-center" placeholder="+39" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full md:w-max-[80%] bg-[#AEAEAE] p-2 focus:outline-0 " />
          </div>
        </div>
        <div className="flex flex-col md:flex-row max-w-[865px] mt-[20px] md:mt-[58px]  w-full gap-x-[54px]">
        <div className="w-full">
          <label className="block">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 focus:outline-0 w-[15%] bg-[#AEAEAE] " />
        </div>
        <div className="w-full">
          <label className="block">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 focus:outline-0 w-[15%] bg-[#AEAEAE] " />
        </div></div>
        
        <p className="py-[18px] mb-[0px] md:px-[20px]">Hostessforyou.com won’t share your private information like phone number or email adress with anyone</p>

        <div className="mb-[0px]">
          <label className="inline-flex items-center">
            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
            <span className="ml-2">Newsletter</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
            <span className="ml-2">I accept the Terms & Conditions and Privacy Policy</span>
          </label>
        </div>
        <button type="submit" className="inline-block p-2 px-[20px] md:px-[70px] bg-black text-white  hover:bg-[#8B8B8B]">CREATE ACCOUNT</button>
      </form>
    </div>
    <Footer />
    </>
    
  );
};

export default MaleSignup;
