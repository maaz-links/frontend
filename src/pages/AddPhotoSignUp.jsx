import { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const AddPhoto = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center mt-[50px] mb-[50px] md:mt-[82px] md:mb-[127px]">
      <h2 className="text-[36px] font-[400] mb-[17px]">Photo</h2>
      <p className="text-[20px] mb-[25px]">Upload at least one pic to activate your profile</p>

      <label 
        className="w-full max-w-[814px] h-40 bg-[#F5F5F5] flex items-center justify-center cursor-pointer"
      >
        {image ? (
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[20px]">Click here and add your pics</span>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>

      <button className="mt-6 md:mt-[82px] px-6 md:px-[60px] py-2 bg-[#E91E63] text-white text-[20px] font-[400] cursor-pointer  hover:bg-[#F8BBD0]">
        GO TO YOUR PROFILE 
      </button>
    </div>
    <Footer />
    </>
  );
};

export default AddPhoto;
