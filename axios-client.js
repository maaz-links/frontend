import axios from "axios";
//import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  //withCredentials: true,
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log(error)
  
  const {response} = error;

  //console.log(response.data.reload)
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    if(!response.data.noreload)
    {
      window.location.reload();
    }
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

// export async function getCSRF(){
//   await axiosClient.get('sanctum/csrf-cookie');
// }

export default axiosClient;
