import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { FaTrash } from "react-icons/fa";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [rerender, setRerender] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  // useEffect(() => {
  //     if(Object.keys(user).length !== 0){
  //      setName(user.name)
  //     }
    
  // }, [user]);
  
  // useEffect(() => {
  //   async function getUserdata() {
  //     const response = await axiosClient.get('/api/user');
  //     setUser(response.data);
  //   }
  //   getUserdata();
  // }, [rerender, setUser]);

  return (
    <>
    
      <Header />
      {user ? ( // Only render content if user exists
      <div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
        <div className="flex flex-col md:flex-row gap-[25px] mb-6">
          <div className="w-full md:w-[10%]">
            <div className="w-[130px] h-[130px] bg-[#F5F5F5]">
              {user.profile_picture_id && <img className={`w-full h-full object-cover`} src={getAttachmentURL(user.profile_picture_id)}></img>}
            </div>
            <div className="mt-4 text-c space-x-6 border-b">
              {["Photo", "Profile", "Personal Data"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-1 font-[700] block transition duration-200 ${
                    activeTab === tab ? "text-[#424242]" : "border-transparent text-black-500 font-medium"
                  }`}
                  onClick={() => navigate(`/profile?tab=${tab}`)//setActiveTab(tab)

                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-[90%]">
            <div className="flex items-center">
              <div className="ml-4">
                <h2 className="text-[24px]">{user.name || 'USER'}</h2>
                {/* <p className="text-[#424242] italic">Profile Status: <span className="font-semibold">ACTIVE</span></p> */}
                <p></p>
              </div>
            </div>
            
            <div className="mt-6">
              {activeTab === "Photo" && <ProfilePhotoTab />}
              {activeTab === "Profile" && <ProfileInfoTab />}
              {activeTab === "Personal Data" && <PersonalDataTab />}
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>Loading user data...</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;

export const ProfilePhotoTab = () => {
  const [images, setImages] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user,refreshUser } = useStateContext();
  const location = useLocation();
  const navigate = useNavigate();
  // Fetch existing images on component mount
  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/api/attachments');
      // console.log(response);
      const fetchedImages = response.data.map(img => ({
        id: img.id,
        url: getAttachmentURL(img.id),
        //isProfilePic: img.is_profile_picture
      }));
      
      setImages(fetchedImages);
      
      // const profilePicObj = fetchedImages.find(img => img.isProfilePic);
      // if (profilePicObj) {
      //   setProfilePic(profilePicObj.id);
      // }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    
    
    fetchImages();
  }, []);

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images[]', file);
    });
    
    // if (profilePic) {
    //   formData.append('profile_pic_id', profilePic);
    // }

    try {
      setIsLoading(true);
      const response = await axiosClient.post('/api/attachments', formData);
     
      fetchImages();
      // const newImages = response.data.map(img => ({
      //   id: img.id,
      //   url: img.url,
      //   isProfilePic: img.is_profile_picture
      // }));

      // setImages(prev => [...prev, ...newImages]);
      
      // const newProfilePic = newImages.find(img => img.isProfilePic)?.id || profilePic;
      // setProfilePic(newProfilePic);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSelect = async (imageId) => {
    try {
      await axiosClient.post(`/api/attachments/${imageId}/set-profile-picture`, {});
      //alert("Profile Picture Updated");
      toast.success("Profile Picture Updated",{
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                        })
      if(location.pathname == '/addphoto-signup'){
        //console.log('what?')
        navigate('/profile');
      };
      refreshUser();
      // setProfilePic(imageId);
      
      // Update local state to reflect the change
      // setImages(images.map(img => ({
      //   ...img,
      //   isProfilePic: img.id === imageId
      // })));
    } catch (error) {
      console.error('Error setting profile picture:', error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if(user.profile_picture_id == imageId){
      //alert('Cant delete pfp')
      toast.error("Cannot Delete Profile Picture",{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      return
    }
    try {
      await axiosClient.delete(`/api/attachments/${imageId}`);
      fetchImages();
      // setImages(images.filter(img => img.id !== imageId));
      // if (profilePic === imageId) {
      //   setProfilePic(null);
      // }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <ClipLoader color="#E91E63" size={50} />
            </div>
    </div>;
  }

  return (
    <div >
      <p className="text-[20px] mb-[25px] md:mb-[39px] border-b">Photo</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[865px] w-full px-[15px] mb-[50px] md:mb-[144px] mx-auto justify-center">
        {images.map((img) => (
          <div key={img.id} className="relative flex flex-col items-center">
            <img 
              src={img.url} 
              alt="Uploaded" 
              className="w-full h-full object-cover border border-gray-300" 
            />
            <div className="flex items-center place-content-between mt-1 w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="profilePic"
                  checked={user.profile_picture_id === img.id}
                  onChange={() => handleProfileSelect(img.id)}
                  className="mr-2"
                />
                <span className="text-xs">Profile picture</span>
              </div>
              <button 
                onClick={() => handleDeleteImage(img.id)} 
                className="right-2 text-[#E91E63] p-2"
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <label className="w-full max-w-[814px] h-40 bg-[#F5F5F5] flex items-center justify-center cursor-pointer mb-6 mx-auto">
        <span className="text-[20px]">Click here and add your pics</span>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={handleImageChange} 
          disabled={isLoading}
        />
      </label>
    </div>
  );
};

export const ProfileInfoTab = () => {

  const { setUser,user, refreshUser, optionsInterest,optionsAvailableFor,languageOptions, countries } = useStateContext();

  const [description, setDescription] = useState('');
  //const [optionsInterest, setOptionsInterest] = useState([]);
  //const [optionsAvailableFor, setOptionsAvailableFor] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedAvailableForIds, setSelectedAvailableForIds] = useState([]);
  //const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguageIds, setSelectedLanguageIds] = useState([]);
  const [travel, setTravel] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [notification, setNotification] = useState(0);
  const [country, setCountry] = useState("Italy");
  const [province, setProvince] = useState("Rome");
  const [nationality, setNationality] = useState("Italian");

  //const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  
  // State for selections
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  

  
  
  // Set user's current country and province when both user data and countries are loaded
  useEffect(() => {
    if (Object.keys(user).length !== 0 && countries.length > 0) {
      console.log('initializing profile data');
      // ... your existing user data setting code ...
      
      // Set country and province from user profile
      if (user.profile.country_id) {
        setSelectedCountry(user.profile.country_id);
        
        // Find the country in our loaded data to get its provinces
        const userCountry = countries.find(c => c.id === user.profile.country_id);
        if (userCountry) {
          setProvinces(userCountry.provinces);
          
          // Only set province if it exists in the country's provinces
          if (user.profile.province_id && userCountry.provinces.some(p => p.id === user.profile.province_id)) {
            setSelectedProvince(user.profile.province_id);
          }
        }
      }
    }
  }, [user, countries]);
  
  // Handle country change
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    // console.log(countryId,countries);
    // Find the selected country and update provinces
    const selectedCountryData = countries.find(c => c.id == countryId);
    // console.log(selectedCountryData);
    if (selectedCountryData) {
      setProvinces(selectedCountryData.provinces);
      setSelectedProvince(selectedCountryData.provinces.length > 0 ? selectedCountryData.provinces[0].id : null);
    } else {
      setProvinces([]);
      setSelectedProvince(null);
    }
  };

  
  // const [formData, setFormData] = useState({
  //   height: "",
  //   shoeSize: "",
  //   eyeColor: "",
  //   dressSize: "",
  //   weight: "",
  //   telegram: "",
  // });
  const [formData, setFormData] = useState({
    height: "",
    shoeSize: "",
    eyeColor: "",
    dressSize: "",
    weight: "",
    telegram: "",
  });

  useEffect(() => {
    //async 
    function getUserdata() {
      // const response = await axiosClient.get('/api/user');
      // console.log(response);
      if(Object.keys(user).length !== 0){
        console.log('initializing profile data');
        setDescription(user.profile.description || '');
        setSelectedIds(user.profile.personal_interests);
        setSelectedAvailableForIds(user.profile.available_services);
        setSelectedLanguageIds(user.profile.my_languages);
        setFormData({
          height: user.profile.height,
          shoeSize: user.profile.shoe_size,
          eyeColor: user.profile.eye_color,
          dressSize: user.profile.dress_size,
          weight: user.profile.weight,
          telegram: user.profile.telegram || '',
        });
        setTravel(user.profile.travel_available)
        setVisibility(user.profile.visibility_status)
        setNotification(user.profile.notification_pref)
        setCountry(user.profile.country)
        setProvince(user.profile.province)
        setNationality(user.profile.nationality)

        setSelectedCountry(user.profile.country_id)
        setSelectedProvince(user.profile.province_id)
        // console.log('selectedUser')
      }
    }
    
    getUserdata();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleOption = (item) => {
    setSelectedIds(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleOptionAvailableFor = (item) => {
    setSelectedAvailableForIds(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleLanguage = (id) => {
    setSelectedLanguageIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  async function submitData() {
    const payload = {
      description: description,
      option_ids: selectedIds,
      option_available_for_ids: selectedAvailableForIds,
      option_language_ids: selectedLanguageIds,
      other_data: formData,
      travel_available: travel,
      notification_pref: notification,
      visibility_status: visibility,
      nationality: nationality,
      province: province,
      country: country,
      selectedCountry: selectedCountry,
      selectedProvince: selectedProvince,
    };
    
    try {
      const response = await axiosClient.post('/api/update-profile', payload);
      //alert('Profile Updated');
      toast.success("Profile Updated",{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      //setRerender(rerender + 1);
      refreshUser();
    } catch (err) {
      //alert(`Error Updating Profile: Make sure all entered data is valid`)
      toast.error("Error Updating Profile: Make sure all entered data is valid",{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      console.error(err.response);
    }
  }

  const handleDelete = async () => {
    
    try {
      const response = await axiosClient.post('/api/send-cancellation-request')
      if (response.data?.message) {
        toast.success(response.data.message,{
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
        // Optionally redirect or update UI
        // console.log('we re out')
                // setUser(null)
                // setToken(null)
                // navigate('/login');
      } else {
        toast.info("Cancellation Request Sent",{
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
    } catch (error) {
      console.error('Error cancelling account:', error);
      toast.error("Error Sending Request. Try again later.",{
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  };

  return (
    <>
      <h3 className="text-[16px] font-[700] border-b">Profile</h3>
      <h3 className="mt-6 font-[400]">Something about me *</h3>
      <textarea
        className="w-full max-w-[888px] p-2 mt-2 bg-[#F5F5F5] h-[99px] px-[20px] text-[#424242] focus:outline-0"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie sapien eu ex congue tincidunt...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {user.role === ROLES.HOSTESS &&
      <>
      <h3 className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Available for:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px] max-w-[600px]">
        {optionsAvailableFor.map(({ id, name }) => {
          const isSelected = selectedAvailableForIds.includes(id);
          return (
            <span
              key={id}
              onClick={() => toggleOptionAvailableFor(id)}
              className={`cursor-pointer px-3 py-1 text-[11px] text-center min-w-[139px] rounded transition-colors
                ${isSelected ? "bg-[#E91E63] text-white" : "bg-[#F5F5F5] text-black"}
              `}
            >
              {name}
            </span>
          );
        })}
      </div>

      <h3 className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Personality and Hobbies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px] max-w-[600px]">
        {optionsInterest.map(({ id, name }) => {
          const isSelected = selectedIds.includes(id);
          return (
            <span
              key={id}
              onClick={() => toggleOption(id)}
              className={`cursor-pointer px-3 py-1 text-[11px] text-center min-w-[139px] rounded transition-colors
                ${isSelected ? "bg-[#E91E63] text-white" : "bg-[#F5F5F5] text-black"}
              `}
            >
              {name}
            </span>
          );
        })}
      </div>
      </>
      }

      {/* <div className="mt-6 grid grid-cols-2 gap-4 md:gap-[65px] max-w-[865px]">
        <div>
          <label className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Country</label>
          <select 
            className="w-full p-[15px] mt-2 bg-[#F5F5F5] focus:outline-0"
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
            className="w-full p-[15px] mt-2 bg-[#F5F5F5] focus:outline-0"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="Rome">Rome</option>
            <option value="Milan">Milan</option>
            <option value="Naples">Naples</option>
          </select>
        </div>
      </div> */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:gap-[65px] max-w-[865px]">
        <div>
          <label className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Country</label>
          <select 
            id="country"
            className="w-full p-[15px] mt-2 bg-[#F5F5F5] focus:outline-0"
            value={selectedCountry || ''}
            onChange={handleCountryChange}
          >
            {/* <option value="">Select Country</option> */}
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Province</label>
          <select 
            id="province"
            className="w-full p-[15px] mt-2 bg-[#F5F5F5] focus:outline-0"
            value={selectedProvince || ''}
            onChange={(e) => setSelectedProvince(e.target.value)}
            disabled={!selectedCountry}
          >
            {/* <option value="">Select Province</option> */}
            {provinces.map(province => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3 className="mt-[20px] md:mt-[27px] font-[400] text-[16px]">Spoken Languages</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px] max-w-[600px]">
        {languageOptions.map(({ id, name }) => {
          const isSelected = selectedLanguageIds.includes(id);
          return (
            <span
              key={id}
              onClick={() => toggleLanguage(id)}
              className={`cursor-pointer px-3 py-1 text-[11px] text-center min-w-[139px] rounded transition-colors
                ${isSelected ? "bg-[#E91E63] text-white" : "bg-[#F5F5F5] text-black"}
              `}
            >
              {name}
            </span>
          );
        })}
      </div>

      <div className="mt-[30px] grid grid-cols-2 gap-x-[21px] gap-y-[11px] max-w-[865px]">
        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Height (cm) *</label>
          <input
            type='number'
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Nationality</label>
          <select
            name="nationality"
            value={nationality}
            onChange={(e)=>setNationality(e.target.value)}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          >
            <option value="Italian">Italian</option>
            <option value="French">French</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Shoe Size *</label>
          <input
            type='number'
            name="shoeSize"
            value={formData.shoeSize}
            onChange={handleChange}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Eye Color *</label>
          <select
            name="eyeColor"
            value={formData.eyeColor}
            onChange={handleChange}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          >
            <option value="brown">Brown</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="hazel">Hazel</option>
            <option value="gray">Gray</option>
          </select>
        </div>

        {user.role === ROLES.HOSTESS &&
        <>

        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Dress Size*</label>
          <select
            name="dressSize"
            value={formData.dressSize}
            onChange={handleChange}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          >
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="S">Small</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Weight *</label>
          <input
            type='number'
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-[400] text-[16px] mb-1">Telegram</label>
          <input
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            className="w-full p-[15px] bg-[#F5F5F5] focus:outline-0"
          />
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-[400] text-[16px] mb-1">Available to travel or tours</h3>
          <div className="flex items-center gap-x-[20px] p-[15px]">
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 }
            ].map((option) => (
              <label key={option.label} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="travel"
                  value={option.value}
                  checked={travel === option.value}
                  onChange={() => setTravel(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

      </>}
      
      </div>

      

      <div className="mt-[50px] md:mt-[98px]]">
        <h3 className="text-[16px] font-[700] border-b">Visibility</h3>
        <div className="flex flex-col md:flex-row mt-[20px] md:place-content-between max-w-[865px]">
          <label className="text-[16px] font-[700] md:w-[30%]">Visibility of the profile:</label>
          <div className="flex md:w-[70%] place-content-between">
            {[
              { label: "Normal", value: 0 },
              { label: "Private", value: 1 },
              { label: "Pause / In Tour", value: 2 }
            ].map((option) => (
              <label key={option.label} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="visibility"
                  value={option.value}
                  checked={visibility === option.value}
                  onChange={() => setVisibility(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <p className="mt-[20px] md:mt-[50px] text-[16px]">
          <strong>Private:</strong> Profile is visible to logged-in users only. <br />
          <strong>Tour:</strong> Profile is hidden except for users you already talked to.
        </p>

        <div className="flex flex-col md:flex-row mt-[40px] md:mt-[80px] gap-x-[10px] md:gap-x-[31px] max-w-[700px]">
          <h3 className="font-semibold md:w-[30%]">Notification preferences:</h3>
          <div className="flex md:w-[50%] place-content-between">
            {[
              { label: "Email", value: 0 },
              { label: "Email + SMS", value: 1 }
            ].map((option) => (
              <label key={option.label} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="notification"
                  value={option.value}
                  checked={notification === option.value}
                  onChange={() => setNotification(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[50px] md:mt-[128px]">
        <button onClick={submitData} className="max-w-[500px] text-[20px] w-full m-auto bg-[#E91E63] text-white px-6 py-2 cursor-pointer hover:bg-[#F8BBD0]">SAVE</button>
      </div>
      
      <div className="mt-[50px]">
        <h3 className="text-[20px] border-b">Cancel Account</h3>
        <div className="flex flex-col items-center">
          <button onClick={handleDelete} className="border max-w-[500px] text-[20px] w-full m-auto bg-[#E91E63] hover:bg-[#F8BBD0] text-white mt-[70px] px-6 py-2 cursor-pointer">SEND CANCELLATION REQUEST</button>
        </div>    
      </div>
    </>
  );
};

import { ErrorText, getAttachmentURL } from "../functions/Common";
import { ROLES } from "../../constants";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
export const PersonalDataTab = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const {user} = useStateContext();
  const [errors, setErrors] = useState({});
  // const ErrorText = ({ field }) => {
  //   return (
  //     <>
  //       {errors[field]?.map((error, index) => (
  //         <p key={index} className="text-red-500 text-sm">
  //           {error}
  //         </p>
  //       ))}
  //     </>
  //   );
  // };
  useEffect(() => {
    async function getUserdata() {
      // const response = await axiosClient.get('/api/user');
      // console.log(response);
      setPhone(user.phone)
      setEmail(user.email)
      setDOB(user.dob)
       
    }
    
    getUserdata();
  }, []);

  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //setSuccess(false);

    try {
      const response = await axiosClient.post('/api/change-password', formData);
      if (response.data.success) {
        //alert('Password Changed Successfully')
        toast.success("Password Changed Successfully",{
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
        setErrors({});
        setFormData({
          current_password: '',
          password: '',
          password_confirmation: ''
        });
      }
    } catch (error) {
      setErrors(error.response.data.formError);
      // console.log(error.response.data.formError);
      // if (error.response && error.response.data.errors) {
      //   setErrors(error.response.data.errors);
      // } else {
      //   console.error('Error changing password:', error);
      // }
    }
  };
  return (
    <>
      <h3 className="mt-6 font-[700] text-[16px] border-b mb-[54px]">Account details</h3>
      <div className="grid grid-cols-1 gap-4 max-w-[775px]">
        <div>
          <label>Phone number</label>
          <input value={phone} className="w-full bg-[#F5F5F5] p-[10px] focus:outline-0" placeholder="+39 333 333 3333" disabled/>
        </div>
        <div>
          <label>Email</label>
          <input value={email} className="w-full bg-[#F5F5F5] p-[10px] focus:outline-0" placeholder="Email" disabled/> 
        </div>
        <div>
          <label>Date of birth</label>
          <input value={DOB} className="w-full bg-[#F5F5F5] p-[10px] focus:outline-0" placeholder="Date of birth" disabled/> 
        </div>
      </div>
      
      <h3 className="mt-6 md:mt-[86px] font-[700] text-[16px] border-b mb-[54px]">Change Password</h3>
      <form onSubmit={handleSubmit} >
      <div className="grid grid-cols-2 gap-4 gap-x-[55px] max-w-[775px]">
      <div>
        <label>Current Password</label>
        <input
          name="current_password"
          className="w-full bg-[#F5F5F5] p-[10px] focus:outline-0"
          type="password"
          value={formData.current_password}
          onChange={handleChange}
        />
        <ErrorText errors={errors} field='current_password'/>
      </div>
      <div>
        <label>New Password</label>
        <input
          name="password"
          className="w-full bg-[#F5F5F5] p-[10px] focus:outline-0"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <ErrorText errors={errors} field='password'/>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          name="password_confirmation"
          className="w-full bg-[#F5F5F5] p-[10px] focus:outline-0"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
      </div>
      </div>
      
      <div className="flex mt-[50px] md:mt-[91px]">
        <button className="max-w-[500px] text-[20px] w-full bg-[#E91E63] text-white px-6 py-2 cursor-pointer hover:bg-[#F8BBD0]">SAVE</button>
      </div>
      </form>
    </>
  );
};
