import React, { useState } from "react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import mobileImage from "/src/assets/images/contact-bg-mobile.png";
import desktopImage from "/src/assets/images/contact-bg-desktop.png";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import {
  RecaptchaComponent,
  RecaptchaVerify,
} from "../functions/RecaptchaVerify";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!RecaptchaVerify(recaptchaToken)) {
      return;
    }
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Client-side validation
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted =
        "You must accept Privacy Policy and the Terms & Conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosClient.post("/api/contact-form", formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "", termsAccepted: false });
      setErrors({});
      toast.success(
        "Thank you! Your request has been submitted successfully.",
        {
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ submit: "Failed to submit form. Please try again later." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div
        className=" flex items-center mt-24 mb-8  
bg-image justify-center 2xl:mx-auto mx-2 rounded-2xl bg-gray-200  max-w-[1300px] m-auto"
        style={{
          "--mobile-bg": `url(${mobileImage})`,
          "--desktop-bg": `url(${desktopImage})`,
        }}
      >
        <div className="text-white  w-full md:p-10 font-[400]  flex flex-col md:flex-row md:items-center justify-around ">
          <div className="p-5 w-[295px] md:w-[486px]">
            <h1 className="text-[32px] md:text-[58px] font-bold mb-4 leading-[60px]">
              Do You Have Any Question?
            </h1>
            <p className="text-[20px] font-[400] leading-[30px] text-[#FFFFFF] mb-6">
              Discover a new way to connect:{" "}
              <strong>
                {" "}
                elegance, support, and meaningful companionship - on your terms
              </strong>
            </p>
          </div>
          <div className="md:w-1/2 p-5 ">
            {submitSuccess && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                Thank you! Your request has been submitted successfully.
              </div>
            )}
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {errors.submit}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-[400] mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full p-4 rounded-xl border border-white text-white placeholder-gray-300"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-[400] mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full p-4 rounded-xl border border-white text-white placeholder-gray-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-[400] mb-1">Request</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Request"
                  className="w-full p-4 rounded-xl border border-white text-white placeholder-gray-300 h-24"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
              <div className="flex items-center  text-white  py-2 rounded-xl">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2 w-5 h-5 appearance-none border-2 border-white rounded focus:outline-none checked:bg-transparent checked:border-white"
                />
                <label className="text-sm">
                  I accept the Privacy Policy and the Terms & Conditions
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
              )}
              <RecaptchaComponent TokenSetter={setRecaptchaToken} />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`md:py-5 w-full md:w-60 bg-white text-black text-[16px]  p-2 rounded-xl font-[400] hover:bg-gray-100 ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .bg-image {
          /* background-image: url('/src/assets/images/welcome-image-desktop.jpg'); */
          background-image: var(--desktop-bg);
          background-size: cover;
          background-position: top;
          background-repeat: no-repeat;
          background-color: silver;
        }

        @media (max-width: 767px) {
          .bg-image {
            background-image: var(--mobile-bg);
          }
        }

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
          color: #fff;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default ContactUs;
