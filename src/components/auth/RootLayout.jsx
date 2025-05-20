import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  
  // Root layout component
  export default function RootLayout() {
    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }
  