import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
<>
<Header />
<h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Login</h1>
    <div className="max-w-[971px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
      <div className="">

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-[40px]">
            <label className="block text-[20px] uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-[20px] uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#AEAEAE] h-[45px] p-[10px] focus:outline-0"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <div className="text-center max-w-[400px] mx-auto mt-[30px] md:mt-[70px]">
        <button type="submit" className="cursor-pointer w-full bg-[#000] uppercase text-[20px] text-white p-[12px]  hover:bg-[#8B8B8B]">
         Login
        </button>
        </div>
        </form>

        {/* Forgot Password & Signup Links */}
        <div className="mt-[30px] text-center">
          <a href="#" className="px-[25px] py-[5px] bg-[#CFA0A0] hover:underline text-[16px]">Forgot password?</a>
          <p className="text-sm mt-2">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Login;
