import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStateContext } from "@/context/ContextProvider";
import axiosClient from "../../../../axios-client";
import {ROLES} from "../../../../constants";
import { toast } from "react-toastify";

const CompleteProfileModal = ({ isOpen, onClose }) => {
  const { setUser, user, refreshUser, optionsInterest, optionsAvailableFor, profileTypeList, languageOptions, countries, nationalitiesList, eyeColorList, SocialLinks } = useStateContext();

  const initialFormData = {
    about: "",
    nationality: "",
    languages: [],
    height: "",
    shoeSize: "",
    eyeColor: "",
    dressSize: "",
    weight: "",
    profileType: [],
    interests: [],
    availableFor: [],
    travel: "",
    visibility: 0,
    notification: 0,
    country: "",
    province: "",
    ...Object.fromEntries(SocialLinks.map(({ name }) => [name, ""])) // ✅ Add social fields
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const [provinces, setProvinces] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  // Initialize form data from user profile
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setFormData({
        about: user.profile.description || '',
        nationality: user.profile.nationality || '',
        languages: user.profile.my_languages || [],
        height: user.profile.height || '',
        shoeSize: user.profile.shoe_size || '',
        eyeColor: user.profile.eye_color || '',
        dressSize: user.profile.dress_size || '',
        weight: user.profile.weight || '',
        
        profileType: user.profile.my_profile_types || [],
        interests: user.profile.personal_interests || [],
        availableFor: user.profile.available_services || [],
        //travel: user.profile.travel_available ,//|| '',
        travel: (user.profile.travel_available !== null) ? user.profile.travel_available : '',
        visibility: user.profile.visibility_status || 0,
        notification: user.profile.notification_pref || 0,
        country: user.profile.country_id || '',
        province: user.profile.province_id || '',
        ...Object.fromEntries(SocialLinks.map(({ name }) => [name, user.profile?.[name] || '']))
      });

      // Set country and provinces if available
      if (user.profile.country_id && countries.length > 0) {
        setSelectedCountry(user.profile.country_id);
        const userCountry = countries.find(c => c.id === user.profile.country_id);
        if (userCountry) {
          setProvinces(userCountry.provinces);
          setSelectedProvince(user.profile.province_id || '');
        }
      }
    }
  }, [user, countries,isOpen]);

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    const selectedCountryData = countries.find(c => c.id == countryId);
    if (selectedCountryData) {
      setProvinces(selectedCountryData.provinces);
      setSelectedProvince(selectedCountryData.provinces.length > 0 ? selectedCountryData.provinces[0].id : '');
      setFormData(prev => ({
        ...prev,
        country: selectedCountryData.name,
        province: selectedCountryData.provinces.length > 0 ? selectedCountryData.provinces[0].name : ''
      }));
    } else {
      setProvinces([]);
      setSelectedProvince('');
    }
  };

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    const selectedProvinceData = provinces.find(p => p.id == provinceId);
    if (selectedProvinceData) {
      setFormData(prev => ({
        ...prev,
        province: selectedProvinceData.name
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleProfileTypeChange = (typeId) => {
    setFormData(prev => {
      const profileType = prev.profileType.includes(typeId)
        ? prev.profileType.filter(i => i !== typeId)
        : [...prev.profileType, typeId];
      return { ...prev, profileType };
    });
  };

  const handleInterestChange = (interestId) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests };
    });
  };

  const handleAvailableForChange = (serviceId) => {
    setFormData(prev => {
      const availableFor = prev.availableFor.includes(serviceId)
        ? prev.availableFor.filter(i => i !== serviceId)
        : [...prev.availableFor, serviceId];
      return { ...prev, availableFor };
    });
  };

  const handleLanguageChange = (languageId) => {
    setFormData(prev => {
      const languages = prev.languages.includes(languageId)
        ? prev.languages.filter(i => i !== languageId)
        : [...prev.languages, languageId];
      return { ...prev, languages };
    });
  };

  const handleSave = async () => {
    const payload = {
      description: formData.about,
      option_profile_types: formData.profileType,
      option_ids: formData.interests,
      option_available_for_ids: formData.availableFor,
      option_language_ids: formData.languages,
      //other_data: {
      height: formData.height,
      shoeSize: formData.shoeSize,
      eyeColor: formData.eyeColor,
      dressSize: formData.dressSize,
      weight: formData.weight,
      //telegram: formData.telegram,
      
      //},
      travel_available: formData.travel,
      notification_pref: formData.notification,
      visibility_status: formData.visibility,
      nationality: formData.nationality,
      country: formData.country,
      province: formData.province,
      selectedCountry: selectedCountry,
      selectedProvince: selectedProvince,
      ...Object.fromEntries(SocialLinks.map(({ name }) => [name, formData?.[name] || '']))
    };

    try {
      await axiosClient.post('/api/update-profile', payload);
      toast.success("Profile Updated", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      refreshUser();
      onClose();
    } catch (err) {
      toast.error("Error Updating Profile: Make sure all entered data is valid", {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error(err.response);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 shadow-2xl backdrop-blur bg-black/40" />

      {/* Modal */}
      <ScrollArea className="relative w-full max-w-[506px] mx-2 overflow-y-auto h-full scrollbar-hide">
        <div className="bg-white relative rounded-[30px] shadow-[0px_28px_34.7px_rgba(0,0,0,0.05)] my-5 px-4 py-10 md:p-[50px_40px]">
          {/* Close Button */}
<button
            onClick={onClose}
            className="absolute end-5 top-5 w-6 h-6 flex items-center justify-center text-black hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          {/* Content */}
          <div className="flex flex-col items-center gap-[26px]">
          
            <div className="text-center">
              <h2 className="text-[32px] px-2 md:text-[32px] leading-[128%] font-bold tracking-[-0.06em] text-[#090909]">
                Complete Your Profile
              </h2>
            </div>

            <div className="w-full max-w-[420px] p-1 flex flex-col gap-[18px] overflow-y-auto">
              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  About you
                </label>
                <textarea
                  value={formData.about}
                  placeholder="Write about yourself..."
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  className="w-full h-[117px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  maxLength={1000}
                ></textarea>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Nationality
                </label>
                <select
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  className="w-full h-[55px] px-[22px]  py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                >
                  {!formData.nationality && <option value=''>
                      Select Nationality
                    </option>}
                  {nationalitiesList.map((nationality) => (
                    <option key={nationality} value={nationality}>
                      {nationality}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                >
                  {!selectedCountry && <option value=''>
                      Select Country
                    </option>}
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Province
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  disabled={!selectedCountry}
                  className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                >
                  {!selectedCountry && <option value=''>
                      Select Province
                    </option>}
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Spoken Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map(({ id, name }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleLanguageChange(id)}
                      className={`px-2 py-2 md:px-4 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        formData.languages.includes(id)
                          ? "bg-black  text-white"
                          : "bg-[#F3F3F5]   text-[#090909]"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              
              {user.role === ROLES.HOSTESS && (
                <>
                <div className="flex flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      I am a
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {profileTypeList.map(({ id, name }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handleProfileTypeChange(id)}
                          className={`px-2 py-2 md:px-4 rounded-full text-xs md:text-sm font-medium transition-colors ${
                            formData.profileType.includes(id)
                             ? "bg-black  text-white"
                              : "bg-[#F3F3F5]   text-[#090909]"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

              <div className="flex flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Personality and interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {optionsInterest.map(({ id, name }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handleInterestChange(id)}
                          className={`px-2 py-2 md:px-4 rounded-full text-xs md:text-sm font-medium transition-colors ${
                            formData.interests.includes(id)
                              ? "bg-black  text-white"
                              : "bg-[#F3F3F5]   text-[#090909]"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Available for
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {optionsAvailableFor.map(({ id, name }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handleAvailableForChange(id)}
                          className={`px-2 py-2 md:px-4 rounded-full text-xs md:text-sm font-medium transition-colors ${
                            formData.availableFor.includes(id)
                               ? "bg-[#8880FE]  text-white"
                              : "bg-[#F3F3F5]   text-[#090909]"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  </>
                )}
              <div className="flex justify-between gap-2">
                <div className="flex w-full flex-col gap-3">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Height (cm)
                  </label>
                  <select
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  >
                    {!formData.height && <option value=''>
                      N/A
                    </option>}
                    {/* 140 to 200 */}
                    {[...Array(200-140+1)].map((_, i) => (
                      <option key={i + 140} value={i + 140}>
                        {i + 140}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex w-full flex-col gap-3">
                  <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                    Shoe size
                  </label>
                  <select
                    value={formData.shoeSize}
                    onChange={(e) => handleInputChange("shoeSize", e.target.value)}
                    className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                  >
                    {!formData.shoeSize && <option value=''>
                      N/A
                    </option>}
                     {/* 32 to 44 */}
                    {[...Array(44-32+1)].map((_, i) => (
                      <option key={i + 32} value={i + 32}>
                        {i + 32}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Eye Color
                    </label>
                    <select
                      value={formData.eyeColor}
                      onChange={(e) => handleInputChange("eyeColor", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    >
                      {!formData.eyeColor && <option value=''>
                      Not Selected
                      </option>}
                      {eyeColorList.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>

              {user.role === ROLES.HOSTESS && (
                <>
                  

                  <div className="flex justify-between gap-2">
                  {/* <div className="flex w-full flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Dress Size
                    </label>
                    <select
                      value={formData.dressSize}
                      onChange={(e) => handleInputChange("dressSize", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    >
                      {!formData.dressSize && <option value=''>
                        N/A
                      </option>}
                      <option value="M">Medium</option>
                      <option value="L">Large</option>
                      <option value="S">Small</option>
                    </select>
                  </div> */}
                  <div className="flex w-full flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Dress size
                    </label>
                    <select
                      value={formData.dressSize}
                      onChange={(e) => handleInputChange("dressSize", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    >
                      {!formData.dressSize && <option value=''>
                        N/A
                      </option>}
                      {/* 32 to 54 even numbers */}
                      
                      {Array.from({ length: (54 - 32) / 2 + 1 }, (_, i) => {
                        const val = 32 + i * 2;
                        return (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex w-full flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Weight (kg)
                    </label>
                    {/* 50 to 120 */}
                    <select
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    >
                      {!formData.weight && <option value=''>
                      N/A
                      </option>}
                      {[...Array(120-50+1)].map((_, i) => (
                        <option key={i + 50} value={i + 50}>
                          {i + 50}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>


                  {/* <div className="flex flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Telegram
                    </label>
                    <input
                      placeholder="Enter telegram"
                      type="text"
                      value={formData.telegram}
                      onChange={(e) => handleInputChange("telegram", e.target.value)}
                      maxLength={50}
                      className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                    />
                  </div> */}
                  {SocialLinks.map(({ name, label }) => (
                    <div key={name} className="flex flex-col gap-3">
                      <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                        {label}
                      </label>
                      <input
                        placeholder={`Enter ${label}`}
                        type="text"
                        value={formData[name] || ''}
                        onChange={(e) => handleInputChange(name, e.target.value)}
                        maxLength={50}
                        className="w-full h-[55px] px-[22px] py-[17px] border border-[rgba(12,16,56,0.22)] rounded-xl backdrop-blur-[12.5px] text-base font-medium tracking-[-0.03em] text-[#090909] focus:outline-none focus:ring focus:ring-black/60 focus:border-transparent"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-3">
                    <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                      Available to travel or tours
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Yes", value: 1 },
                        { label: "No", value: 0 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={formData.travel === option.value}
                            onChange={() => handleInputChange("travel", option.value)}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Visibility of the profile
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: "Normal", value: 0 },
                    { label: "Private", value: 1 },
                    { label: "Pause / In Tour", value: 2 }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={formData.visibility === option.value}
                        onChange={() => handleInputChange("visibility", option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Private:</strong> Profile is visible to logged-in users only.<br />
                  <strong>Tour:</strong> Profile is hidden except for users you already talked to.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-base font-bold tracking-[-0.03em] text-[#090909]">
                  Notification preferences
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Email", value: 0, gridspan:"" },
                    { label: "Email + SMS", value: 1, gridspan:"col-span-2" }
                  ].map((option) => (
                    <label key={option.value} className={`flex items-center gap-2 ${option.gridspan}`}>
                      <input
                        type="radio"
                        checked={formData.notification === option.value}
                        onChange={() => handleInputChange("notification", option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full max-w-[426px] h-[60px] bg-[#090909] hover:bg-[#8880FE] rounded-xl flex items-center justify-center text-base font-bold tracking-[-0.03em] text-white transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CompleteProfileModal;
