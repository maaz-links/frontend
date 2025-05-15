import { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { FaTrash } from "react-icons/fa"; // Trash icon import
import { ProfilePhotoTab } from "./Profile";

const AddPhotoPart4 = () => {
  const [images, setImages] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  // Handle multiple image upload
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file: file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Set a profile picture
  const handleProfileSelect = (imageId) => {
    setProfilePic(imageId);
  };

  // Delete image
  const handleDeleteImage = (imageId) => {
    setImages(images.filter((img) => img.id !== imageId));
    if (profilePic === imageId) setProfilePic(null);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-[50px] mb-[50px] md:mt-[82px] md:mb-[127px] px-[15px]">
        <h2 className="text-[36px] font-[400] mb-[17px]">Photo</h2>
        <p className="text-[20px] mb-[25px] md:mb-[39px]">Upload at least one pic to activate your profile</p>
        <div className="w-full md:w-[50%]">
        <ProfilePhotoTab/>
        </div>
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
      </div>
      <Footer />
    </>
  );
};

export default AddPhotoPart4;
