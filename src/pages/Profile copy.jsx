import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { FaTrash } from "react-icons/fa"; // Trash icon import
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [visibility, setVisibility] = useState("Private");
  const [notification, setNotification] = useState("Email");
  const [travel, setTravel] = useState("No");
  const [country, setCountry] = useState("Italy");
  const [province, setProvince] = useState("Rome");
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
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);
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
    <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
    <div className="flex flex-col md:flex-row  gap-[25px] mb-6">
     <div className="w-full md:w-[10%]"> {/* Tab Navigation */}
     <div className="w-[130px] h-[130px] bg-[#AEAEAE]"></div>
        <div className="mt-4 text-c space-x-6 border-b">
          {["Photo", "Profile", "Personal Data"].map((tab) => (
            <button
              key={tab}
              className={`pb-1 font-[700] block transition duration-200 ${
                activeTab === tab ? "text-black " : "border-transparent text-black-500 font-medium"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
</div>
<div className="w-full md:w-[90%]">
<div className="flex items-center">
        
          <div className="ml-4">
            <h2 className="text-[24px]">USER</h2>
            <p className="text-[#000] italic">Profile Status: <span className="font-semibold">ACTIVE</span></p>
          </div>
        </div>
        <div className="">
        

       
        {/* Active Tab Content */}
        <div className="mt-6">
          {activeTab === "Photo" && (
            <div>
            <p className="text-[20px] mb-[25px] md:mb-[39px] border-b">Photo</p>
              {/* Image Gallery */}
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[865px] w-full px-[15px] mb-[50px] md:mb-[144px] mx-auto justify-center">
          {images.map((img) => (
            <div key={img.id} className="relative flex flex-col items-center">
              <img src={img.id} alt="Uploaded" className="w-full h-full object-cover border border-gray-300" />
              
              {/* Profile Picture Selection */}
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
                {/* Delete Button with Visible Trash Icon */}
                </div>
              <button 
                onClick={() => handleDeleteImage(img.id)} 
                className="right-2  text-[#AEAEAE] p-2"
              >
                <FaTrash className="text-lg" />
              </button>
              </div>

              
            </div>
          ))}
        </div>
        {/* Image Upload Box */}
        <label className="w-full max-w-[814px] h-40 bg-[#AEAEAE]  flex items-center justify-center cursor-pointer mb-6 mx-auto">
          <span className="text-[20px]">Click here and add your pics</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
            </div>
          )}

          {activeTab === "Profile" && (
            <>
            <h3 className="text-[16px] font-[700] border-b">Profile</h3>
                 {/* About Me */}
        <h3 className="mt-6 font-[400] ">Something about me *</h3>
        <textarea className="w-full max-w-[888px]  p-2 mt-2  bg-[#AEAEAEAE] h-[99px] p-[10px] px-[20px] text-[#000] focus:outline-0"  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie sapien eu ex congue tincidunt...."></textarea>

        {/* Available For */}
        <h3 className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Available for:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px]  max-w-[600px]">
          {["photo model", "fashion pics", "travel & weekend", "dinners", "host hostess", "parties", "fake girlfriend", "talk", "shopping", "glamour pics", "company" , "nsfw pics","events","example 1","example 2","example 3"].map((item) => (
            <span key={item} className="bg-[#AEAEAE] px-3 py-1  text-[11px] text-center min-w-[139px]">{item}</span>
          ))}
        </div>

        {/* Personality & Hobbies */}
        <h3 className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Personality and Hobbies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px] max-w-[600px]">
          {Array.from({ length: 16 }, (_, i) => `Example ${i + 4}`).map((hobby) => (
            <span key={hobby} className="bg-[#AEAEAE] px-3 py-1  text-[11px] text-center min-w-[139px]">{hobby}</span>
          ))}
        </div>

        {/* Country & Province Selection */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:gap-[65px] max-w-[865px]">
                    <div>
                      <label className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Country</label>
                      <select 
                        className="w-full p-[15px] mt-2 bg-[#AEAEAE] focus:outline-0"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                    <div>
                      <label className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Province</label>
                      <select 
                        className="w-full p-[15px] mt-2 bg-[#AEAEAE] focus:outline-0"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        <option value="Rome">Rome</option>
                        <option value="Milan">Milan</option>
                        <option value="Naples">Naples</option>
                      </select>
                    </div>
                  </div>

        {/* Languages */}
        <h3 className="mt-[20px] md:mt-[27px] font-[400] text-[16px]">Spoken Languages</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 max-w-[865px] md:flex-row gap-[20px] mt-[19px]">
          {["Deutsch", "English", "Italian", "Espanol", "Français"].map((lang) => (
            <span key={lang} className="bg-[#AEAEAE] px-3 py-1  text-[16px] w-full md:w-[155px] text-center">{lang}</span>
          ))}
        </div>

        {/* Height, Nationality, etc. */}
        <div className="mt-[30px] grid grid-cols-2 gap-x-[21px] gap-y-[11px] max-w-[865px]">
          {["Height (cm) *", "Nationality", "Shoe Size *", "Eye Color *", "Dress Size *", "Weight *","Telegram *"].map((field) => (
            
            <div key={field} className="flex flex-col">
                        <label className="font-[400] text-[16px] mb-1">{field}</label>
                        <input
                          className="w-full p-[15px] bg-[#AEAEAE] focus:outline-0"
                         
                        />
                      </div>
          ))}
          <div className="flex flex-col"><h3 className="font-[400] text-[16px] mb-1">Available to travel or tours</h3>
                  <div className="flex items-center   gap-x-[20px] p-[15px]">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="travel"
                          value={option}
                          checked={travel === option}
                          onChange={() => setTravel(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div></div>
          
        </div>

      {/* Visibility Section */}
      <div className="mt-[50px] md:mt-[98px]]">
       <h3 className="text-[16px] font-[700] border-b">Visibility</h3>
                  <div className="flex flex-col md:flex-row  mt-[20px] md:place-content-between max-w-[865px]">
                  <label className="text-[16px] font-[700] md:w-[30%]">Visibility of the profile:</label>
                  <div className="flex md:w-[70%] place-content-between">
                    {["Normal", "Private", "Pause / In Tour"].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="visibility"
                          value={option}
                          checked={visibility === option}
                          onChange={() => setVisibility(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                    </div>
                  </div>
                  <p className="mt-[20px] md:mt-[50px] text-[16px]">
                    <strong>Private:</strong> Profile is visible to logged-in users only. <br />
                    <strong>Tour:</strong> Profile is hidden except for users you already talked to.
                  </p>


        {/* Notification Preferences */}
        <div className="flex flex-col md:flex-row mt-[40px] md:mt-[80px] gap-x-[10px] md:gap-x-[31px] max-w-[700px]">
        <h3 className="font-semibold md:w-[30%]">Notification preferences:</h3>
                  <div className="flex md:w-[50%] place-content-between ">
                    {["Email", "Email + SMS"].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="notification"
                          value={option}
                          checked={notification === option}
                          onChange={() => setNotification(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center mt-[50px] md:mt-[128px] ">
        <button className="max-w-[500px] text-[20px] w-full m-auto bg-black text-white px-6 py-2 cursor-pointer hover:bg-[#8B8B8B] ">SAVE</button>
       
       
      </div>
      <div className="mt-[50px]">
        <h3 className="text-[20px] border-b">Delete Account</h3>
    <div className="flex flex-col items-center">
    <button className="mt-2 border max-w-[222px] text-[20px] w-full m-auto bg-black text-white border-black mt-[70px] px-6 py-2 cursor-pointer">DELETE ACCOUNT</button>
    </div>    
      </div>
            </>
          )}

          {activeTab === "Personal Data" && (
            <>
                  <h3 className="mt-6 font-[700] text-[16px] border-b mb-[54px]">Account details</h3>
                  <div className="grid grid-cols-1 gap-4 max-w-[775px]">
                  <div><label>Phone number</label>
                    <input className="w-full bg-[#AEAEAE] p-[10px] focus:outline-0" placeholder="+39 333 333 3333" /></div>
                  <div>
                    <label>Email</label>
                    <input className="w-full bg-[#AEAEAE] p-[10px] focus:outline-0" placeholder="Email" /> </div>
                    <div>
                    <label>Date of birth</label>
                    <input className="w-full bg-[#AEAEAE] p-[10px] focus:outline-0" placeholder="Date of birth" /> 
                    </div>
                  </div>
                  <h3 className="mt-6 md:mt-[86px] font-[700] text-[16px] border-b mb-[54px]">Change Password</h3>
                  <div className="grid grid-cols-2 gap-4 gap-x-[55px] max-w-[775px]">
                  <div>
                    <label>Current Password</label>
                    <input className=" w-full bg-[#AEAEAE] p-[10px] focus:outline-0" placeholder="" type="password" />

                  </div>
                  <div>
                  <label>New Password</label>
                  <input className="w-full bg-[#AEAEAE] p-[10px] focus:outline-0" placeholder="" type="password" />

                  </div>
                  <div>
                  <label>Confirm Password</label>
                  <input className="w-full bg-[#AEAEAE] p-[10px] focus:outline-0" placeholder="" type="password" />

                  </div>
                  </div>
                  <div className="flex mt-[50px] md:mt-[91px] ">
        <button className="max-w-[500px] text-[20px] w-full  bg-black text-white px-6 py-2 cursor-pointer hover:bg-[#8B8B8B] ">SAVE</button>
       
       
      </div>
                </>
          )}
        </div>
      </div>
       
</div>
    </div>
      
      

     
    </div>
    <Footer />
    </>
  );
};

export default Profile;
