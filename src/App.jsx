import { useState } from 'react'
import Header from './components/common/header'
import './App.css'
import IntroBox from './components/IntroBox'
import Models from './components/Models'
import Blogs from './components/Blogs'
import Faqs from './components/Faqs'
import Footer from './components/common/footer'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Privacy from "./pages/Privacy";
import Payments from './pages/Payments'
import HowTo from './pages/HowTo'
import Search from './pages/Search'
import Login from './pages/Login'
import Hostess from './pages/Hostess'
import HomeFemale from './pages/HomeFemale'
import HomeMale from './pages/HomeMale'
import VerifyPhone from './pages/VerifyPhone'
//import SignUp from './pages/SignUp'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'
import AboutYou from './pages/AboutYou'
import SignUp from './pages/CreatSignup'
// import MaleSignup from './pages/MaleSignup'
import AddPhoto from './pages/AddPhotoSignUp'
import AddPhotoPart4 from './pages/AddPhotoPart4'
import Chat from './pages/Chat'
import MaleChat from './pages/MaleChat'
import LastNews from './pages/LastViews'
import LastViews from './pages/LastViews'
import SearchFemale from './pages/SearchFemale'
import UserProfile from './pages/UserProfile'
import UserProfileMale from './pages/UserProfileMale'
import Shop from './pages/Shop'
import PaymenMethod from './pages/PaymentMethod'
import DefaultLayout, { ProfileCompleteGuard, ShopForMale } from './components/auth/DefaultLayout'
import GuestLayout from './components/auth/GuestLayout'
import VerifyEmail from './components/auth/VerifyEmail'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import AuthLayout from './components/auth/DefaultLayout'
import PurchaseHistory from './pages/Purchase-history'
import PaypalSuccessPayment from './pages/PaypalSuccessPayment'
import PaypalCancelPayment from './pages/PaypalCancelPayment'
import BannedNotice from './pages/BannedNotice'
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
 

  

   
    // { path: "/login", element: <Login /> },
    { path: "/how-to", element: <HowTo /> },
    { path: "/hostess", element: <Hostess /> },
    // { path: "/female-home", element: <HomeFemale /> },
    // { path: "/male-home", element: <HomeMale /> },
    // { path: "/about-you", element: <AboutYou /> },
   
    
    { path: "/", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/terms", element: <Terms /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/cookies", element: <Cookies /> },
    { path: "/payments", element: <Payments /> },
    { path: "/search", element: <Search /> },
    { path: "/user-profile/:username", element: <UserProfile /> },
    // { path: "/about-you", element: <AboutYou /> }, IMPORTANT IN FUTURE
    // { path: "/male-signup", element: <MaleSignup /> },
    // { path: "/addphoto-signup", element: <AddPhoto /> },
    // { path: "/addphoto-signup-part4", element: <AddPhotoPart4 /> },

    // { path: "/male-chat", element: <MaleChat /> },
    
    // { path: "/search-female", element: <SearchFemale /> },
    
    // { path: "/user-profile-male", element: <UserProfileMale /> },
   

    {
      path: '/',
      element: <GuestLayout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/sign-up", element: <SignUp /> },
        //{ path: "/create-signup", element: <CreatSignup /> },
        { path: "/verify-email", element: <VerifyEmail /> },
        { path: "/verify-phone", element: <VerifyPhone /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "am-i-banned/:username", element: <BannedNotice /> }
      ]
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: "/addphoto-signup", element: <AddPhotoPart4 /> },
        {
          path: '/',
          element: <ProfileCompleteGuard />,
          children: [
            { path: "/chat", element: <Chat /> },
            { path: "/profile", element: <Profile /> },
            
            { path: "/last-views", element: <LastViews /> },
            { path: "/reviews", element: <Reviews /> },
            {
              path: '/',
              element: <ShopForMale />,
              children: [
                { path: "/shop", element: <Shop /> },
                { path:"/payment-method/:shopId", element: <PaymenMethod /> },
                { path:"/paypal/success", element: <PaypalSuccessPayment /> },
                { path:"/paypal/cancel", element: <PaypalCancelPayment /> },
                { path: "/purchase-history", element: <PurchaseHistory /> },
              ]
            },
            
          ]
        },
      ]
    },
    
   
]);

export default App
