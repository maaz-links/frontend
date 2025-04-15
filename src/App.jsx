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
import SignUp from './pages/SignUp'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'
import AboutYou from './pages/AboutYou'
import CreatSignup from './pages/CreatSignup'
import MaleSignup from './pages/MaleSignup'
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
import DefaultLayout from './components/auth/DefaultLayout'
import GuestLayout from './components/auth/GuestLayout'
import VerifyEmail from './components/auth/VerifyEmail'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
 

  

    { path: "/", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/terms", element: <Terms /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/cookies", element: <Cookies /> },
    { path: "/payments", element: <Payments /> },
    { path: "/how-to", element: <HowTo /> },
    { path: "/search", element: <Search /> },
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        { path: "/login", element: <Login /> },
    { path: "/creat-signup", element: <CreatSignup /> },
    { path:"/verify-email", element:<VerifyEmail />},
    { path: "forgot-password", element:<ForgotPassword/>},
    { path: "reset-password", element:<ResetPassword/>}
      ]
    },
    // { path: "/login", element: <Login /> },
    { path: "/hostess", element: <Hostess /> },
    { path: "/female-home", element: <HomeFemale /> },
    { path: "/male-home", element: <HomeMale /> },
    { path: "/verify-phone", element: <VerifyPhone /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/reviews", element: <Reviews /> },
   
    { path: "/about-you", element: <AboutYou /> },
    { path: "/male-signup", element: <MaleSignup /> },
    { path: "/addphoto-signup", element: <AddPhoto /> },
    { path: "/addphoto-signup-part4", element: <AddPhotoPart4 /> },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: "/chat", element: <Chat /> },
        { path: "/profile", element: <Profile /> },
      ]
    },
    { path: "/male-chat", element: <MaleChat /> },
    { path: "/last-views", element: <LastViews /> },
    { path: "/search-female", element: <SearchFemale /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/user-profile-male", element: <UserProfileMale /> },
    { path: "/shop", element: <Shop /> },
    { path: "/payment-method", element: <PaymenMethod /> },
   
]);

export default App
