import React, { useState } from "react";
import Header from '/src/components/common/header';
import Footer from '/src/components/common/footer';
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept Privacy Policy and the Terms & Condition";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosClient.post('/api/contact-form', formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "", termsAccepted: false });
      setErrors({});
      //alert('Thank you! Your request has been submitted successfully.')
      toast.success('Thank you! Your request has been submitted successfully.',{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Laravel validation errors
        setErrors(error.response.data.errors);
      } else {
        // Network or server errors
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">HELP & CONTACT</h1>
      <div className="max-w-[1090px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
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
          {/* Name Field */}
          <div>
            <label className="block text-[20px] uppercase">NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] h-[45px] p-[10px] focus:outline-0"
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
              className="w-full bg-[#F5F5F5] h-[45px] p-[10px] focus:outline-0"
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
              className="w-full bg-[#F5F5F5] h-[266px] p-[10px] focus:outline-0"
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
              className="mr-2 bg-[#F5F5F5]"
            />
            <label className="text-[20px]">
              I accept the <Link to="/privacy">Privacy Policy</Link> and the <Link to="/terms">Terms & Condition</Link>
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

          {/* Submit Button */}
          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer w-full bg-[#E91E63] uppercase text-[20px] text-white p-[12px] hover:bg-[#F8BBD0] ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;