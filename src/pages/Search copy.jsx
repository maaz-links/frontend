import React, { useEffect, useState } from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import ModelImage from '/src/assets/images/model-img.jpg'
import JoinUs from '../components/common/joinus'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../../axios-client'
function Search() {

  const {user, token} = useStateContext();
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
  const url = token ? '/api/search' : '/api/search-guest';
  axiosClient.post(url)
  .then(response => {
    // Handle successful response
    setEntities(response.data);
    console.log(url, response.data);
    
  })
  .catch(error => {
      console.error('Error response:', error);
  })
  .finally(() => {
    console.log('Request completed');
  });
  
  }, [])
  
  useEffect(() => {
    axiosClient.get('/api/provinces')
    .then(response => {
      // Handle successful response
      setProvinces(response.data);
      console.log('province', response.data);
      
    })
    .catch(error => {
        console.error('Error response:', error);
    })
    .finally(() => {
      console.log('Request completed');
    });
  }, [])

  const [entities, setEntities] = useState([]);

  return (
    <>
      <Header />
      <div className='max-w-[1200px] m-auto mt-[43px] mb-[50px] px-[15px]'>
        <div className='flex gap-x-[15px] md:gap-x-[40px]'>
          <div className='selection w-[100%] md:w-[90%]'>
            <select className="w-full bg-[#AEAEAE] h-[46px] p-[10px] focus:outline-0">
              <option>City/Province</option>
            </select>
          </div>
          <div className='filter md:w-[10%] '>
            <button

              className="flex cursor-pointer items-center gap-2 w-full bg-[#AEAEAE] h-[46px] p-[10px] focus:outline-0"
            >
              <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.158691" y1="1.5" x2="21.2978" y2="1.5" stroke="black" />
                <line x1="0.158691" y1="6.5" x2="21.2978" y2="6.5" stroke="black" />
                <line x1="0.158691" y1="11.5" x2="21.2978" y2="11.5" stroke="black" />
                <ellipse cx="17.4042" cy="1.5" rx="1.66887" ry="1.5" fill="black" />
                <ellipse cx="5.16497" cy="6.5" rx="1.66887" ry="1.5" fill="black" />
                <ellipse cx="12.954" cy="11.5" rx="1.66887" ry="1.5" fill="#010101" />
              </svg>


              Filter
            </button>
          </div>
        </div>
        <div className='search-results'>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-[15px] md:gap-x-[30px] mt-[40px] md:mt-[112px]'>
          {entities.map((entity) => (
  <a href={`/user-profile/${entity.name}`} key={entity.id}>
    <div className='result-box'>
    {/* <div className="w-[130px] h-[130px] bg-[#AEAEAE]">
              {user.profile_picture_id && <img className={`w-full h-full object-cover`} src={`${import.meta.env.VITE_API_BASE_URL}/api/attachments/${user.profile_picture_id}`}></img>}
            </div> */}
      <div className='result-box-img' style={{height: '40vh'}}>
        <img className={`w-full h-full object-cover`} src={`${import.meta.env.VITE_API_BASE_URL}/api/attachments/${entity.profile_picture_id}`} />
      </div>
      <div className='result-content'>
        <h4>{entity.name}</h4>
        <p>{entity.profile?.province_name}</p>
      </div>
    </div>
  </a>
))}
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
            <a href="/user-profile"><div className='result-box'>
              <div className='result-box-img'>
                <img src={ModelImage} />
              </div>
              <div className='result-content'>
                <h4>UserName</h4>
                <p>City</p>
              </div>
            </div></a>
          </div>
        </div>
      </div>



      <Footer />
    </>
  )
}

export default Search
