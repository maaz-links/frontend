import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { ClipLoader } from "react-spinners";
import WelcomeModal from "../common/welcome-model";
import PopUpModel from "../common/popup-model";

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  
  // Root layout component
  export default function RootLayout() {
    
    const { loading,isWelcomeModel,setIsWelcomeModel,
      GenericModalOpen, setGenericModalOpen,
      GenericModalContent, setGenericModalContent,
    } = useStateContext();
      if (loading) {
        return <div>
          
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                  <ClipLoader color="black" size={50} />
                </div>
        </div>;
      }
    return (
      <>
        <ScrollToTop />
        <Outlet />
        <PopUpModel isOpen={GenericModalOpen} onClose={() => setGenericModalOpen(false)}>
          {GenericModalContent}
        </PopUpModel>
          <WelcomeModal
            isOpen={isWelcomeModel}
            onClose={() => setIsWelcomeModel(false)}
          />

      </>
    );
  }
  