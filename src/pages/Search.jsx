import React, { useEffect, useRef, useState, useCallback } from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../../axios-client'
import { getAttachmentURL } from '../functions/Common'
import { ClipLoader } from 'react-spinners' // Import spinner
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

function Search() {
  const {user, token, getProvinceName} = useStateContext();
  const [entities, setEntities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const perPage = 50; // How many items per api call bcz pagination.
  // Dependent on whether last loaded item of previous api call is visible in viewport.
  // Avoid using smaller values to prevent duplication in results.

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const observer = useRef();
  
  const [filters, setFilters] = useState({
    province_id: searchParams.get('province') || '',
    verified_profile: searchParams.get('verified') === 'true',
    top_profile: searchParams.get('top') === 'true'
  });

  // Fetch initial data
  useEffect(() => {
    const fetchFirstData = async () => {
      try {
        setLoading(true);
        const url = token ? '/api/search' : '/api/search-guest';
        
        // Convert filters to API params
        const apiParams = {
          province_id: filters.province_id || undefined,
          verified_profile: filters.verified_profile || undefined,
          top_profile: filters.top_profile || undefined,
          page: 1, // Always start with page 1 when filters change
          per_page: perPage // Number of items per page
        };
        
        const [searchRes, provincesRes] = await Promise.all([
          axiosClient.post(url, apiParams),
          axiosClient.get('/api/provinces')
        ]);
        // console.log(searchRes.data);
        setEntities(searchRes.data.data);
        setProvinces(provincesRes.data);
        setHasMore(searchRes.data.current_page < searchRes.data.last_page);
        setPage(2); // Next page to load
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchFirstData();
    
    // Update URL with current filters
    const params = {};
    if (filters.province_id) params.province = filters.province_id;
    if (filters.verified_profile) params.verified = 'true';
    if (filters.top_profile) params.top = 'true';
    
    setSearchParams(params);
    
  }, [token, filters]);

  // Infinite scroll loader
  const lastEntityRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMoreData = async () => {
    if (!hasMore) return;
    
    try {
      setLoading(true);
      const url = token ? '/api/search' : '/api/search-guest';
      
      const apiParams = {
        province_id: filters.province_id || undefined,
        verified_profile: filters.verified_profile || undefined,
        top_profile: filters.top_profile || undefined,
        page: page,
        per_page: perPage
      };
      
      const searchRes = await axiosClient.post(url, apiParams);
      // console.log(searchRes.data);
      setEntities(prev => [...prev, ...searchRes.data.data]);
      setHasMore(searchRes.data.current_page < searchRes.data.last_page);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceChange = (e) => {
    setFilters(prev => ({
      ...prev,
      province_id: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle click outside filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header />
      <div className='max-w-[1200px] m-auto mt-[43px] mb-[50px] px-[15px]'>
        <div className='flex gap-x-[15px] md:gap-x-[40px] mb-4'>
          <div className='selection w-[100%] md:w-[90%]'>
            <select 
              className="w-full bg-[#F5F5F5] h-[46px] p-[10px] focus:outline-0"
              value={filters.province_id}
              onChange={handleProvinceChange}
            >
              <option value="">City/Province</option>
              {provinces.map(province => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className='filter md:w-[10%] relative' ref={filterRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
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
            
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-4">
                <div className="flex flex-col gap-2">
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
              </div>
            )}
          </div>
        </div>

        <div className='search-results relative'>
          {initialLoad && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <ClipLoader color="#E91E63" size={50} />
            </div>
          )}
          
          {entities.length === 0 && !initialLoad ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium text-gray-600">No profiles found</h3>
              <p className="text-gray-500 mt-2">
                {filters.province_id || filters.verified_profile || filters.top_profile
                  ? "Try adjusting your search filters"
                  : "There are currently no profiles available"}
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-5 gap-[15px] md:gap-x-[30px] mt-[40px] md:mt-[112px]'>
              {entities.map((entity, index) => (
                <Link 
                  to={`/user-profile/${entity.name}`} 
                  key={`${entity.id}-${index}`}

                  //Put ref on last entity of currently loaded data
                  ref={index === entities.length - 1 ? lastEntityRef : null}
                >
                  <div className='result-box'>
                    {/* {entity.profile.verified_profile ? <div className={`absolute top-0 end-0 text-[#E91E63] bg-[#F5F5F5]`}><strong>Verified</strong></div> : <></>} */}
                    {/* {entity.profile.top_profile ? <div className={`absolute top-0 start-0 text-yellow-500 bg-[#F5F5F5]`}><strong>Top Profile</strong></div> : <></>} */}
                    <div className='result-box-img aspect-2/3'>
                      <img className={`w-full h-full object-cover`} src={getAttachmentURL(entity.profile_picture_id)} />
                    </div>
                    <div className='result-content'>
                      <h4>{entity.name}</h4>
                      <p>{getProvinceName(entity?.profile?.province_id)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {loading && !initialLoad && (
            <div className="flex justify-center my-4">
              <ClipLoader color="#E91E63" size={30} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Search