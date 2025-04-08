import { useState } from 'react'
import Header from './components/common/header'
import './App.css'
import IntroBox from './components/IntroBox'
import Models from './components/Models'
import Blogs from './components/blogs'
import Faqs from './components/Faqs'
import Footer from './components/common/footer'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Privacy from "./pages/Privacy";
import Payments from './pages/payments'
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
function App() {

  return (
    <>
   
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} /> 
          <Route path="/privacy" element={<Privacy />} /> 
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/how-to" element={<HowTo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hostess" element={<Hostess />} />
          <Route path="/female-home" element={<HomeFemale />} />
          <Route path="/male-home" element={<HomeMale />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-you" element={<AboutYou />} />
          <Route path="/creat-signup" element={<CreatSignup />} />
          <Route path="/male-signup" element={<MaleSignup />} />
          <Route path="/addphoto-signup" element={<AddPhoto />} />
          <Route path="/addphoto-signup-part4" element={<AddPhotoPart4 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/male-chat" element={<MaleChat />} />
          <Route path="/last-views" element={<LastViews />} />
          <Route path="/search-female" element={<SearchFemale />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile-male" element={<UserProfileMale />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/payment-method" element={<PaymenMethod />} />
      </Routes>
  
   
    </>
  )
}

export default App
