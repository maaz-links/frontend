import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios-client";

const StateContext = createContext({
  user: null,
  token: null,
  //notification: null,
  setUser: () => { },
  setToken: () => { },
  //setNotification: () => {}
})

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  //const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      console.log('ok');
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const [optionsInterest, setOptionsInterest] = useState([]);
  const [optionsAvailableFor, setOptionsAvailableFor] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  //const [refreshUser, setRefreshUser] = useState([]);

  async function getUserData() {
    if (token) {
      const response = await axiosClient.get('/api/user');
      setUser(response.data)
      console.log('user in context',response.data)
    }
    // const response2 = await axiosClient.get('/api/miscdata');
    // setOptionsInterest(response2.data.interests);
    // setOptionsAvailableFor(response2.data.available_for);
    // setLanguageOptions(response2.data.spoken_languages);
  }

  async function getMiscData() {
    const response2 = await axiosClient.get('/api/miscdata');
    setOptionsInterest(response2.data.interests);
    setOptionsAvailableFor(response2.data.available_for);
    setLanguageOptions(response2.data.spoken_languages);
  }

  useEffect(() => {
    getMiscData()
    getUserData()
  }, [])

  const refreshUser = () => {
    getUserData();
  };

  // useEffect(() => {
  //   getUserData()
  // }, [refreshUser])



  // const setNotification = message => {
  //   _setNotification(message);

  //   setTimeout(() => {
  //     _setNotification('')
  //   }, 5000)
  // }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      optionsInterest, setOptionsInterest,
      optionsAvailableFor, setOptionsAvailableFor,
      languageOptions, setLanguageOptions,
      refreshUser,// setRefreshUser,
      // notification,
      // setNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
