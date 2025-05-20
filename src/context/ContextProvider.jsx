import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios-client";

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
        setUser(response.data);
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
  
  // const [countryOptions, setCountryOptions] = useState([]);
  // const [provinceOptions, setProvinceOptions] = useState([]);
  //const [refreshUser, setRefreshUser] = useState([]);


  async function getMiscData() {
    const response2 = await axiosClient.get('/api/miscdata');
    setOptionsInterest(response2.data.interests);
    setOptionsAvailableFor(response2.data.available_for);
    setLanguageOptions(response2.data.spoken_languages);
    setProfileCosts(response2.data.profile_costs);
    
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
  }, [token]);

  const refreshUser = () => {
    getUserData();
  };

  const getProvinceName = (province_id,country_id = null) => {
  for (const country of countries) {
    const province = country.provinces.find(p => p.id == province_id);
    if (province) {
      return province.name;
    }
  }
  return 'Not found';

  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      loading, // Expose loading state
      refreshUser,
      optionsInterest, setOptionsInterest,
      optionsAvailableFor, setOptionsAvailableFor,
      languageOptions, setLanguageOptions,
      refreshUser,// setRefreshUser,
      countries,
      getProvinceName,
      profileCosts
      // ... other values
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);