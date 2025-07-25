import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import AddImgIcon from "/src/assets/icons/no-pfp-icon.svg"
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";
import axiosClient from "../../axios-client";
import { ClipLoader } from "react-spinners";
import BackgroundGrad from "@/components/common/BackgroundGrad";
import { ImageErrorMessages, ImageSuccessMessages } from "./profile/sections/Photos";

const AddPhotoPart4 = () => {
  const [images, setImages] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
const [isLoading, setIsLoading] = useState(false);
  const { user,refreshUser } = useStateContext();

  const navigate = useNavigate();
  // Handle multiple image upload
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.slice(0, 1).forEach(file => {
      formData.append('images[]', file);
      formData.append('set_profile_picture', 1);
    });
    
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/api/attachments', formData);
      ImageSuccessMessages(response,toast)
      refreshUser();
      navigate('/profile')
      
      //fetchImages();
    } catch (error) {
      ImageErrorMessages(error,toast)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(user && user?.profile_picture_id){
      navigate('/profile');
    }
  },[user])

// Create a ref for the file input
const fileInputRef = React.useRef(null);

// Function to trigger file input click
const handleIconClick = () => {
  fileInputRef.current.click();
};

  return (
    <>
      <Header />
       <BackgroundGrad>
      <div className="max-w-[700px] bg-white mx-auto shadow-md rounded-4xl px-[20px] md:px-[20px] py-[20px]">
  <h1 className="text-center text-[30px] md:text-[40px] my-7"><strong>Carica le tue foto</strong></h1>
  <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">
    <label className="block text-center text-[20px] mb-[20px]">Scegli le foto migliori che ti rappresentano di più. E' obbligatorio l'inserimento di almeno una fotografia.</label>
    {/* <form> */}
    {
     isLoading ? <div className="flex justify-center items-center h-64">
          
          <div className="">
                  <ClipLoader color="#000" size={50} />
                </div>
        </div>
      :
      <div className="mb-4 max-w-[600px] mx-auto">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        <div className="mb-7 flex justify-center">
          {/* Make the icon clickable */}
          <img 
            className="py-8 w-[50%] md:w-[40%] cursor-pointer" 
            src={AddImgIcon} 
            alt="Carica immagine"
            onClick={handleIconClick}
          />
        </div>
      </div>
      // Non ora, grazie <-- If we want to make this optional
    }
    {/* </form> */}
  </div>
</div>
      
      </BackgroundGrad>
      <Footer />
    </>
  );
};

export default AddPhotoPart4;
