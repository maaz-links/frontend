import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import AddImgIcon from "/src/assets/icons/no-pfp-icon.svg"
import { FaTrash } from "react-icons/fa"; // Trash icon import
import { ProfilePhotoTab } from "./Profile";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";
import axiosClient from "../../axios-client";
import { ClipLoader } from "react-spinners";
import BackgroundGrad from "@/components/common/BackgroundGrad";

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
    files.forEach(file => {
      formData.append('images[]', file);
      formData.append('profile_picture', true);
    });
    
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/api/attachments', formData);
      refreshUser();
      navigate('/profile')
      
      //fetchImages();
    } catch (error) {
      if(error.response?.data?.message){
          toast.error(error.response.data.message,{
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          })
      }
      else{
        toast.error("Error Uploading Image. Try Uploading image of smaller size.",{
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
      console.error('Error uploading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

// Create a ref for the file input
const fileInputRef = React.useRef(null);

// Function to trigger file input click
const handleIconClick = () => {
  fileInputRef.current.click();
};

  return (
    <>
      <Header />
      {/* <div className="flex flex-col items-center justify-center mt-[50px] mb-[50px] md:mt-[82px] md:mb-[127px] px-[15px]"> */}
        {/* <h2 className="text-[36px] font-[400] mb-[17px]">Photo</h2>
        <p className="text-[20px] mb-[25px] md:mb-[39px]">Upload at least one pic to activate your profile</p>
        <div className="w-full md:w-[50%]">
        <ProfilePhotoTab/>
        </div> */}
 {/* Image Gallery */}
 {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1080px] w-full px-[15px] mb-[50px] md:mb-[144px]">
          {images.map((img) => (
            <div key={img.id} className="relative flex flex-col items-center">
              <img src={img.id} alt="Uploaded" className="w-full h-full object-cover border border-gray-300" />
              
             
              <div className="flex items-center place-content-between mt-1 w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="profilePic"
                  checked={profilePic === img.id}
                  onChange={() => handleProfileSelect(img.id)}
                  className="mr-2"
                />
                <span className="text-xs">Profile picture</span>
            
                </div>
              <button 
                onClick={() => handleDeleteImage(img.id)} 
                className="right-2  text-[#F5F5F5] p-2"
              >
                <FaTrash className="text-lg" />
              </button>
              </div>

              
            </div>
          ))}
        </div> */}
        {/* Image Upload Box */}
        {/* <label className="w-full max-w-[814px] h-40 bg-[#F5F5F5] md:mx-[15px] flex items-center justify-center cursor-pointer mb-6">
          <span className="text-[20px]">Click here and add your pics</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
        </label> */}

       
{/* 
        <button className="mt-6 md:mt-[82px] px-6 md:px-[60px] py-2 bg-[#E91E63] text-white text-[20px] font-[400] cursor-pointer hover:bg-[#F8BBD0]">
          GO TO YOUR PROFILE 
        </button> */}
      {/* </div> */}
       <BackgroundGrad>
      <div className="max-w-[700px] bg-white mx-auto shadow-md rounded-4xl px-[20px] md:px-[20px] py-[20px]">
  <h1 className="text-center text-[38px] my-7"><strong>Load Your Photo</strong></h1>
  <div className="max-w-[970px] mx-auto mt-[10px] px-[15px]">
    <label className="block text-center text-[20px] mb-[20px]">A good photo is essential, select and upload your best shot! It is mandatory to activate the Profile</label>
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
          multiple // remove this if you only want single file upload
        />
        
        <div className="mb-7 flex justify-center">
          {/* Make the icon clickable */}
          <img 
            className="py-8 w-[50%] md:w-[40%] cursor-pointer" 
            src={AddImgIcon} 
            alt="Upload image"
            onClick={handleIconClick}
          />
        </div>
      </div>
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
