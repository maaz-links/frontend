import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import VerifyPhone from "./pages/VerifyPhone";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import SignUp from "./pages/CreatSignup";
import AddPhotoPart4 from "./pages/AddPhotoPart4";
import Chat from "./pages/Chat";
import LastViews from "./pages/LastViews";
import UserProfile from "./pages/UserProfile";
import Shop from "./pages/Shop";
import PaymenMethod from "./pages/PaymentMethod";
import {
  ProfileCompleteGuard,
  ProfileCompleteGuard2,
  ShopForMale,
} from "./components/auth/DefaultLayout";
import GuestLayout from "./components/auth/GuestLayout";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import AuthLayout from "./components/auth/DefaultLayout";
import PurchaseHistory from "./pages/Purchase-history";
import PaypalSuccessPayment from "./pages/PaypalSuccessPayment";
import PaypalCancelPayment from "./pages/PaypalCancelPayment";
import BannedNotice from "./pages/BannedNotice";
import StaticPage from "./pages/StaticPage";
import RootLayout from "./components/auth/RootLayout";
import { TimeProvider } from "./context/TimeContext";
import ErrorPage from "./pages/ErrorPage";
import SecretLogin from "./components/auth/SecretLogin";

import Hostess from "./pages/for-hostess/Hostess";
import ContactUs from "./pages/help";
import ProfilePage from "./pages/profile/profile.jsx";


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/secret-login", element: <SecretLogin /> },

      { path: "/", element: <Home /> },
      // new pages
      { path: "/hostess", element: <Hostess /> },
      { path: "/help", element: <ContactUs /> },
      


      { path: "/cookies", element: <StaticPage slug="cookies" /> },
      { path: "/terms", element: <StaticPage slug="terms" /> },
      { path: "/privacy", element: <StaticPage slug="privacy" /> },
      { path: "/payments", element: <StaticPage slug="payments" /> },
      // {
      //   path: '/',
      //   element: <ProfileCompleteGuard2 />,
      //   children: [
      { path: "/search", element: <Search /> },
      { path: "/user-profile/:username", element: <UserProfile /> },
      //   ]
      // },
      {
        path: "/",
        element: <GuestLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/sign-up", element: <SignUp /> },
          { path: "/verify-email", element: <VerifyEmail /> },
          { path: "/verify-phone", element: <VerifyPhone /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
          { path: "/reset-password", element: <ResetPassword /> },
          { path: "/am-i-banned/:username", element: <BannedNotice /> },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: "/addphoto-signup", element: <AddPhotoPart4 /> },
          {
            path: "/",
            element: <ProfileCompleteGuard />,
            children: [
              {
                path: "/chat",
                element: (
                  <TimeProvider>
                    <Chat />
                  </TimeProvider>
                ),
              },
              { path: "/profile", element: <ProfilePage /> },
              
              // { path: "/last-views", element: <LastViews /> },
              { path: "/reviews", element: <Reviews /> },
              {
                path: "/",
                element: <ShopForMale />,
                children: [
                  { path: "/shop", element: <Shop /> },
                  {
                    path: "/payment-method/:shopId",
                    element: <PaymenMethod />,
                  },
                  {
                    path: "/paypal/success",
                    element: <PaypalSuccessPayment />,
                  },
                  { path: "/paypal/cancel", element: <PaypalCancelPayment /> },
                  //{ path: "/purchase-history", element: <PurchaseHistory /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  }, //Root layout
]);

export default App;
