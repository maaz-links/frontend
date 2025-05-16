import React, { useEffect, useState } from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import ModelImage from '/src/assets/images/model-img.jpg'
import JoinUs from '../components/common/joinus'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../../axios-client'
import { getAttachmentURL } from '../functions/Common'
function Search() {

  const {user, token,getProvinceName} = useStateContext();
  const [entities, setEntities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [filters, setFilters] = useState({
    verified_profile: false,
    top_profile: false
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = token ? '/api/search' : '/api/search-guest';
        const [searchRes, provincesRes] = await Promise.all([
          axiosClient.post(url),
          axiosClient.get('/api/provinces')
        ]);
        
        setEntities(searchRes.data);
        setProvinces(provincesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  // Handle filter submission
  const handleFilter = async () => {
    try {
      const url = token ? '/api/search' : '/api/search-guest';
      const params = {
        province_id: selectedProvince,
        ...filters
      };
      console.log(params);
      const response = await axiosClient.post(url, params);
      console.log(response);
      setEntities(response.data);
    } catch (error) {
      console.error('Error filtering:', error);
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };


  return (
    <>
      <Header />
      <div className='max-w-[1200px] m-auto mt-[43px] mb-[50px] px-[15px]'>
      <div className='flex gap-x-[15px] md:gap-x-[40px] mb-4'>
        <div className='selection w-[100%] md:w-[90%]'>
          <select 
            className="w-full bg-[#F5F5F5] h-[46px] p-[10px] focus:outline-0"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">City/Province</option>
            {provinces.map(province => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className='filter md:w-[10%]'>
          <button
            onClick={handleFilter}
            className="flex cursor-pointer items-center gap-2 w-full bg-[#F5F5F5] h-[46px] p-[10px] focus:outline-0"
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

      {/* Checkboxes */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="verified_profile"
            checked={filters.verified_profile}
            onChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          Verified Profile
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="top_profile"
            checked={filters.top_profile}
            onChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          Top Profile
        </label>
      </div>
        <div className='search-results'>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-[15px] md:gap-x-[30px] mt-[40px] md:mt-[112px]'>
          {entities.map((entity) => (
  <a href={`/user-profile/${entity.name}`} key={entity.id}>
    <div className='result-box'>
    {entity.profile.verified_profile ? <div className={`absolute top-0 end-0 text-[#E91E63] bg-[#F5F5F5]`}><strong>Verified</strong></div> : <></>}
    {entity.profile.top_profile ? <div className={`absolute top-0 start-0 text-yellow-500 bg-[#F5F5F5]`}><strong>Top Profile</strong></div> : <></>}
    {/* <div className="w-[130px] h-[130px] bg-[#F5F5F5]">
              
            </div> */}
      <div className='result-box-img aspect-2/3'
      //  style={{height: '40vh'}}
       >
        <img className={`w-full h-full object-cover`} src={getAttachmentURL(entity.profile_picture_id)} />
        
      </div>
      <div className='result-content'>
        <h4>{entity.name}</h4>
        <p>{getProvinceName(entity?.profile?.province_id)}</p>
      </div>
    </div>
  </a>
))}
            {/* <a href="/user-profile"><div className='result-box'>
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
            </div></a> */}
          </div>
        </div>
      </div>



      <Footer />
    </>
  )
}

export default Search
