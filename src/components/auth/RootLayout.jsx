import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { ClipLoader } from "react-spinners";

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  
  // Root layout component
  export default function RootLayout() {
    
    const { loading } = useStateContext();
      if (loading) {
        return <div>
          
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                  <ClipLoader color="#E91E63" size={50} />
                </div>
        </div>;
      }
    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }
  