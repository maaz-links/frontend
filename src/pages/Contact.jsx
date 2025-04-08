import React, { useState } from "react";
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { Outlet, Link } from "react-router-dom"
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept Privacy Policy and the Terms & Condition";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", message: "", termsAccepted: false });
    setErrors({});
  };

  return (
    <>
    <Header />
    <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">HELP & CONTACT</h1>
    <div className="max-w-[1090px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
     
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Field */}
        <div>
          <label className="block text-[20px] uppercase">NAME (USERNAME)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
            placeholder=""
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-[20px] uppercase">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
            placeholder=""
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-[20px] uppercase">REQUEST</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#AEAEAE] h-[266px] p-[10px] focus:outline-0"
            placeholder=""
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mr-2 bg-[#AEAEAE]"
          />
          <label className="text-[20px]">
          I accept the <Link to="/privacy">Privacy Policy</Link> and the <Link to="/terms">Terms & Condition </Link> of the website
          </label>
        </div>
        {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

        {/* Submit Button */}
        <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
        <button type="submit" className="cursor-pointer w-full bg-[#000] uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]">
          Send Request
        </button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default Contact;
