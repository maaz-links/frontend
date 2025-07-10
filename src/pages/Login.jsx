"use client";

import { createRef, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { RecaptchaVerify } from "../functions/RecaptchaVerify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = createRef();
  const passwordRef = createRef();
  const {
    setUser,
    setToken,
    refreshUser,
    setGenericModalContent,
    setGenericModalOpen,
  } = useStateContext();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };

  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!RecaptchaVerify(recaptchaToken)) {
      return;
    }
    setSubmitting(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosClient.post("/api/login", payload);
      // console.log(response);
      setErrors({});
      //BAN LOGIC
      if (response.data.mustverify) {
        //  toast.info('A link is sent to your email address. Click on it to verify account and complete registration',{
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //       })
        setGenericModalOpen(true);
        setGenericModalContent(
          <>
            <h1 className=" text-[45px] font-bold">Verify your email</h1>
            <p className=" my-4 ">
              Check your mailbox, follow the instructions, and confirm account!
            </p>
            <button
              onClick={() => setGenericModalOpen(false)}
              className="bg-black text-white max-w-[300px] rounded-xl px-6 py-3 hover:bg-gray-800 transition w-full"
            >
              Got It
            </button>
          </>
        );
        // alert('A link is sent to your email address. Click on it to verify account and complete registration')
        navigate(`/`);
        return;
      }
      if (response.data.banned) {
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
      sessionStorage.setItem("hostess_otp_email", payload.email);
      sessionStorage.setItem("hostess_otp_phone", response.data.phone);
      sessionStorage.setItem("hostess_otp_message", response.data.message);
      //setToken(response.data.access_token);
      navigate("/verify-phone");
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
        setErrors(response.data.formError);
        // setMessage(response.data.message);
      }
    }
    setSubmitting(false);
  };

  const handleUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axiosClient.get("/api/user");
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
  };

  return (
    <>
      <Header />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ background: "#F2F2FF" }}>
          {/* Vector 84 - First blur layer */}
          <div
            className="absolute"
            style={{
              width: "646.43px",
              height: "750.54px",
              left: "82.81px",
              top: "426.17px",
              background: "#EA5FFF",
              filter: "blur(166.551px)",
              transform: "matrix(-0.76, 0.65, 0.65, 0.76, 0, 0)",
            }}
          />
          {/* Ellipse 408 - First radial gradient */}
          <div
            className="absolute"
            style={{
              width: "917.65px",
              height: "450.26px",
              left: "977px",
              top: "605px",
              background:
                "radial-gradient(50% 50% at 50% 50%, #3144EF 71.39%, #3D0DFF 81.49%)",
              filter: "blur(148.176px)",
              transform: "rotate(4.1deg)",
            }}
          />
          {/* Group 1000006474 with opacity 0.4 */}
          <div
            className="absolute"
            style={{
              width: "2376.99px",
              height: "1948.47px",
              left: "-683px",
              top: "-211px",
              opacity: 0.4,
              transform: "matrix(-0.77, 0.64, 0.64, 0.77, 0, 0)",
            }}
          >
            {/* Group 427319419 */}
            <div
              className="absolute"
              style={{
                width: "856.85px",
                height: "1032.86px",
                left: "calc(50% - 856.85px/2 + 137.36px)",
                top: "calc(50% - 1032.86px/2 + 99.76px)",
                transform: "matrix(-0.45, 0.89, 0.89, 0.45, 0, 0)",
              }}
            >
              {/* Vector 84 inside group */}
              <div
                className="absolute"
                style={{
                  width: "834.34px",
                  height: "1013.62px",
                  left: "428.94px",
                  top: "78.39px",
                  background: "#EA5FFF",
                  filter: "blur(129.968px)",
                  transform: "matrix(-0.45, 0.89, 0.89, 0.45, 0, 0)",
                }}
              />
              {/* Vector 85 inside group */}
              <div
                className="absolute"
                style={{
                  width: "834.34px",
                  height: "1013.62px",
                  left: "456.28px",
                  top: "67.05px",
                  background: "#A6A7FF",
                  filter: "blur(129.968px)",
                  transform: "matrix(-0.45, 0.89, 0.89, 0.45, 0, 0)",
                }}
              />
            </div>
            {/* Group 427319420 with opacity 0.3 */}
            <div
              className="absolute"
              style={{
                width: "856.85px",
                height: "1032.86px",
                left: "calc(50% - 856.85px/2 - 248.18px)",
                top: "calc(50% - 1032.86px/2 + 1293.09px)",
                opacity: 0.3,
                transform: "matrix(0.42, -0.91, -0.91, -0.42, 0, 0)",
              }}
            >
              {/* Vector 84 in second group */}
              <div
                className="absolute"
                style={{
                  width: "834.34px",
                  height: "1013.62px",
                  left: "70.34px",
                  top: "1259.79px",
                  background: "#EA5FFF",
                  filter: "blur(129.968px)",
                  transform: "matrix(0.42, -0.91, -0.91, -0.42, 0, 0)",
                }}
              />
              {/* Vector 85 in second group */}
              <div
                className="absolute"
                style={{
                  width: "834.34px",
                  height: "1013.62px",
                  left: "43.39px",
                  top: "1272.06px",
                  background: "#A6A7FF",
                  filter: "blur(129.968px)",
                  transform: "matrix(0.42, -0.91, -0.91, -0.42, 0, 0)",
                }}
              />
            </div>
          </div>
          {/* Second Ellipse 408 */}
          <div
            className="absolute"
            style={{
              width: "776.01px",
              height: "380.76px",
              left: "893px",
              top: "374.19px",
              background:
                "radial-gradient(50% 50% at 50% 50%, #3144EF 71.39%, #3D0DFF 81.49%)",
              filter: "blur(109.676px)",
              transform: "rotate(-18.42deg)",
            }}
          />
          {/* Hidden ellipses (visibility: hidden) */}
          <div
            className="absolute"
            style={{
              visibility: "hidden",
              width: "393.11px",
              height: "197.46px",
              left: "1137.39px",
              top: "568.58px",
              background: "#FFFFFF",
              transform: "rotate(-3.63deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              visibility: "hidden",
              width: "224.53px",
              height: "112.78px",
              left: "1352.21px",
              top: "669.1px",
              background: "#FFFFFF",
              transform: "rotate(-3.63deg)",
            }}
          />
          {/* Third Ellipse 408 with opacity 0.3 */}
          <div
            className="absolute"
            style={{
              width: "776.01px",
              height: "380.76px",
              left: "140.97px",
              top: "1830.04px",
              opacity: 0.3,
              background:
                "radial-gradient(50% 50% at 50% 50%, #3144EF 71.39%, #3D0DFF 81.49%)",
              filter: "blur(109.676px)",
              transform: "rotate(159.62deg)",
            }}
          />
          {/* More hidden ellipses */}
          <div
            className="absolute"
            style={{
              visibility: "hidden",
              width: "393.11px",
              height: "197.46px",
              left: "347.16px",
              top: "2024.74px",
              background: "#FFFFFF",
              transform: "rotate(174.42deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              visibility: "hidden",
              width: "224.53px",
              height: "112.78px",
              left: "305.43px",
              top: "2026.55px",
              background: "#FFFFFF",
              transform: "rotate(174.42deg)",
            }}
          />
          {/* Chart section */}
          <div
            className="absolute"
            style={{
              width: "836.5px",
              height: "643.46px",
              left: "798.16px",
              top: "159.04px",
              transform: "rotate(0.44deg)",
            }}
          >
            {/* Ellipse 797 (Stroke) elements */}
            <div
              className="absolute"
              style={{
                left: "95.64%",
                right: "-3.77%",
                top: "38.83%",
                bottom: "50.6%",
                background: "#FFFFFF",
                filter: "blur(32.1731px)",
                transform: "rotate(0.44deg)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "32.28%",
                right: "57.72%",
                top: "43.51%",
                bottom: "43.57%",
                background: "#FFFFFF",
                opacity: 0.7,
                filter: "blur(32.1731px)",
                transform: "rotate(0.44deg)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                left: "36.45%",
                right: "62.35%",
                top: "49.28%",
                bottom: "49.17%",
                background: "#FFFFFF",
                transform: "matrix(-1, -0.01, -0.01, 1, 0, 0)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                left: "99.25%",
                right: "-0.45%",
                top: "42.91%",
                bottom: "55.54%",
                background: "#FFFFFF",
                transform: "matrix(-1, -0.01, -0.01, 1, 0, 0)",
              }}
            />
          </div>
          {/* Ellipse 29665 - Large white blur */}
          <div
            className="absolute"
            style={{
              width: "617px",
              height: "586px",
              left: "788px",
              top: "666px",
              background: "#fff",
              filter: "blur(100px)",
            }}
          />
        </div>
      <div className="max-w-[700px]  mx-auto rounded-4xl px-[20px] md:px-[20px] py-[20px] my-[170px]">

        {/* <div className="absolute bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[526px]  rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] px-[40px] py-[40px]"> */}
          <h1 className="text-center text-[38px] my-7">
            <strong>Log In</strong>
          </h1>

          <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 max-w-[600px] mx-auto">
                <div className="mb-7">
                  <div className="block text-[20px] mb-[20px]">
                    <strong>Email</strong>
                  </div>
                  {/* Email Field */}
                  <input
                    type="email"
                    ref={emailRef}
                    required
                    className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                    placeholder="Enter Email"
                  />
                  <ErrorText field="email" />
                </div>
                <div className="mb-7">
                  <div className="block text-[20px] mb-[20px]">
                    <strong>Password</strong>
                  </div>
                  {/* Password Field */}
                  <input
                    type="password"
                    ref={passwordRef}
                    required
                    className="w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
                    placeholder="Enter Password"
                  />
                  <ErrorText field="password" />
                </div>

                <div className="text-center mx-auto">
                  <div className="text-start">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className={`py-[5px] mb-[20px] text-[16px] ${
                        false
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:underline"
                      }`}
                    >
                      <strong>{"Forgot Password?"}</strong>
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${
                      submitting ? "opacity-50" : ""
                    } cursor-pointer w-full bg-black rounded-2xl text-[20px] text-white p-[22px]`}
                  >
                    <strong>{submitting ? "Logging in..." : "Log In"}</strong>
                  </button>
                </div>

                <div className="text-center my-9">
                  New User?{" "}
                  <strong>
                    <Link to="/sign-up">Sign up for Free</Link>
                  </strong>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
