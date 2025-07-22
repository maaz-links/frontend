import { createContext, useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { initializeEcho } from "../../echo";
import PopUpModel from "../components/common/popup-model";
import WelcomeModal from "../components/common/welcome-model";

const StateContext = createContext({
  user: null,
  token: null,
  loading: true, // Add loading state
  setUser: () => {},
  setToken: () => {},
  refreshUser: () => {},
  // ... other values
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null instead of {}
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [loading, setLoading] = useState(true); // Track loading state
  // ... other state declarations

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
      // initializeEcho();
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      setUser(null); // Clear user when token is removed
    }
  };

  async function getUserData() {
    try {
      setLoading(true);
      if (token) {
        const response = await axiosClient.get('/api/user');
        console.log(response.data)
        setUser(response.data);
        checkUnreadMessages();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setToken(null); // Clear token on error
    } finally {
      setLoading(false);
    }
  }

  const [optionsInterest, setOptionsInterest] = useState([]);
  const [optionsAvailableFor, setOptionsAvailableFor] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [profileCosts, setProfileCosts] = useState([]);
  const [nationalitiesList, setNationalitiesList] = useState([]);
  const [eyeColorList, setEyeColorList] = useState([]);
  const [profileTypeList, setProfileTypeList] = useState([]);

  const [GenericModalOpen, setGenericModalOpen] = useState(false);
  const [GenericModalContent, setGenericModalContent] = useState(<></>);
  const [isWelcomeModel, setIsWelcomeModel] = useState(false);

  const SocialLinks = [
    { label: 'Whatsapp', name: 'whatsapp', baseUrl: 'https://wa.me/' },
    { label: 'Facebook', name: 'facebook', baseUrl: 'https://facebook.com/' },
    { label: 'Instagram', name: 'instagram', baseUrl: 'https://instagram.com/' },
    { label: 'Telegram', name: 'telegram', baseUrl: 'https://t.me/' },
    { label: 'Tiktok', name: 'tiktok', baseUrl: 'https://tiktok.com/@' },
    { label: 'Onlyfans', name: 'onlyfans', baseUrl: 'https://onlyfans.com/' },
    { label: 'Personal Website', name: 'personal_website', baseUrl: '' },
  ];

  // const [countryOptions, setCountryOptions] = useState([]);
  // const [provinceOptions, setProvinceOptions] = useState([]);
  //const [refreshUser, setRefreshUser] = useState([]);
  const heartbeatInterval = useRef(null); // Store interval reference

  async function getMiscData() {
    const response2 = await axiosClient.get('/api/miscdata');
    setOptionsInterest(response2.data.interests);
    setOptionsAvailableFor(response2.data.available_for);
    setLanguageOptions(response2.data.spoken_languages);
    setProfileCosts(response2.data.profile_costs);
    setNationalitiesList(response2.data.nationalities);
    //console.log(response2.data.nationalities);
    setEyeColorList(response2.data.eye_colors);
    setProfileTypeList(response2.data.profile_types);
    //console.log(response2.data.eye_colors);
  }

  // Fetch countries on component mount
  useEffect(() => {
    axiosClient.get('/api/countries') // This endpoint should return countries with nested provinces
      .then(response => {
        setCountries(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    getMiscData();
  }, []);

  useEffect(() => {
    getUserData();
    initializeEcho();
  }, [token]);

  const refreshUser = () => {
    getUserData();
  };

  async function heartbeatCall() {
    try{
      if (token) {
        const response = await axiosClient.post('/api/heartbeat');
        console.log('hb',response.data)
      }
    }
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    const startHeartbeat = () => {
      // Clear any existing interval
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
      
      // Call immediately
      heartbeatCall();
      
      // Set up interval
      heartbeatInterval.current = setInterval(heartbeatCall, 90000); // 90 seconds
    };

    const stopHeartbeat = () => {
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
        heartbeatInterval.current = null;
      }
    };

    if (token) {
      startHeartbeat();
    } else {
      stopHeartbeat();
    }

    // Cleanup on unmount or token change
    return () => {
      stopHeartbeat();
    };
  }, [token]); // Re-run when token changes

  const [unreadCount, setUnreadCount] = useState(0);
  const checkUnreadMessages = async () => {
    try {
      if (token) {
        const response = await axiosClient.get('/api/unread-messages-count');
        console.log(response.data);
        setUnreadCount(response.data);
      }
    } catch (error) {
      console.error('Error fetching unreadmsg:', error);
    }
  }

  const getProvinceName = (province_id,country_id = null) => {
  for (const country of countries) {
    const province = country.provinces.find(p => p.id == province_id);
    if (province) {
      return province.name;
    }
  }
  return 'Unknown';

  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      loading, // Expose loading state
      optionsInterest,
      optionsAvailableFor,
      languageOptions,
      nationalitiesList,
      eyeColorList,
      refreshUser,// setRefreshUser,
      countries,
      getProvinceName,
      profileCosts,
      unreadCount,checkUnreadMessages,
      profileTypeList,
      // ... other values
      GenericModalOpen, setGenericModalOpen,
      GenericModalContent, setGenericModalContent,
      isWelcomeModel,setIsWelcomeModel,
      SocialLinks,

    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);