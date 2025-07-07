import { useEffect, useRef, useState, useCallback } from "react";
import Header from "/src/components/common/header";
import Footer from "/src/components/common/footer";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { getAttachmentURL } from "../functions/Common";
import { ClipLoader } from "react-spinners"; // Import spinner
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const { user, token, getProvinceName } = useStateContext();
  const [entities, setEntities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
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
    province_id: searchParams.get("province") || "",
    verified_profile: searchParams.get("verified") === "true",
    top_profile: searchParams.get("top") === "true",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchFirstData = async () => {
      try {
        setLoading(true);
        const url = token ? "/api/search" : "/api/search-guest";

        // Convert filters to API params
        const apiParams = {
          province_id: filters.province_id || undefined,
          verified_profile: filters.verified_profile || undefined,
          top_profile: filters.top_profile || undefined,
          page: 1, // Always start with page 1 when filters change
          per_page: perPage, // Number of items per page
        };

        const [searchRes, provincesRes] = await Promise.all([
          axiosClient.post(url, apiParams),
          axiosClient.get("/api/provinces"),
        ]);
        // console.log(searchRes.data);
        setEntities(searchRes.data.data);
        setProvinces(provincesRes.data);
        setHasMore(searchRes.data.current_page < searchRes.data.last_page);
        setPage(2); // Next page to load
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchFirstData();

    // Update URL with current filters
    const params = {};
    if (filters.province_id) params.province = filters.province_id;
    if (filters.verified_profile) params.verified = "true";
    if (filters.top_profile) params.top = "true";

    setSearchParams(params);
  }, [token, filters]);

  // Infinite scroll loader
  const lastEntityRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadMoreData = async () => {
    if (!hasMore) return;

    try {
      setLoading(true);
      const url = token ? "/api/search" : "/api/search-guest";

      const apiParams = {
        province_id: filters.province_id || undefined,
        verified_profile: filters.verified_profile || undefined,
        top_profile: filters.top_profile || undefined,
        page: page,
        per_page: perPage,
      };

      const searchRes = await axiosClient.post(url, apiParams);
      // console.log(searchRes.data);
      setEntities((prev) => [...prev, ...searchRes.data.data]);
      setHasMore(searchRes.data.current_page < searchRes.data.last_page);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      province_id: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle click outside filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="text-center pt-6 pb-3 bg-white">
        <h1 className="text-4xl md:text-[45px] font-bold text-gray-900  leading-tight max-w-4xl mx-auto px-4">
          Find your hostess, wingwoman
          <br />
          or sugarbaby near you
        </h1>
      </div>

      <div className="max-w-[1200px] m-auto mt-[20px] mb-[50px] px-[15px]">
        {/* Search Controls */}
        <div className="flex gap-x-[15px] md:gap-x-[20px] mb-8 justify-center max-w-2xl mx-auto">
          <div className="selection flex-1">
            <select
              className="w-full bg-white border border-gray-400 py-4 rounded-xl px-4  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.province_id}
              onChange={handleProvinceChange}
            >
              <option value="">City/Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex cursor-pointer items-center gap-2 text-[14px] font-extrabold  border bg-white leading-[100%] rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
              >
                <path
                  d="M6.125 9.5625H24.875M9.73125 15.5H21.2687M13.3375 21.4375H17.6625"
                  stroke="black"
                  stroke-width="1.875"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Filter
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white z-50 rounded-lg shadow-lg border border-gray-200  p-4">
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="verified_profile"
                      checked={filters.verified_profile}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-600 rounded  focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Verified Profile</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="top_profile"
                      checked={filters.top_profile}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-600 rounded  focus:ring-blue-500"
                    />

                    <span className="text-gray-700">Top Profile</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="search-results relative">
          {initialLoad && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <ClipLoader color="#E91E63" size={50} />
            </div>
          )}

          {entities.length === 0 && !initialLoad ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-medium text-gray-600 mb-2">
                No profiles found
              </h3>
              <p className="text-gray-500">
                {filters.province_id ||
                filters.verified_profile ||
                filters.top_profile
                  ? "Try adjusting your search filters"
                  : "There are currently no profiles available"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 ">
              {entities.map((entity, index) => (
                <Link
                  to={`/user-profile/${entity.name}`}
                  key={`${entity.id}-${index}`}
                  ref={index === entities.length - 1 ? lastEntityRef : null}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 group cursor-pointer">
                    {/* Background Image */}
                    <div className="aspect-[3/4] bg-gray-100">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          getAttachmentURL(entity.profile_picture_id) ||
                          "/placeholder.svg"
                        }
                        alt={entity.name}
                      />
                    </div>

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Profile Tags - Top */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
                      {entity.profile?.verified_profile && (
                        <span className="bg-black backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                          Hostess
                        </span>
                      )}
                      {entity.profile?.top_profile && (
                        <span className="bg-black backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                          Wingwoman
                        </span>
                      )}
                      {!entity.profile?.verified_profile &&
                        !entity.profile?.top_profile && (
                          <span className="bg-black backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                            Sugarbaby
                          </span>
                        )}
                    </div>

                    {/* Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                      <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-semibold text-lg">{entity.name}</h3>
                        <span className="text-[#76FF5B] text-xl">•</span>
                        <span className="text-sm opacity-90">(34years)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm opacity-90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="19"
                          viewBox="0 0 16 19"
                          fill="none"
                        >
                          <path
                            d="M6.42917 17.7533C6.93417 18.1699 7.46083 18.5508 8 18.9224C8.54033 18.5557 9.06444 18.1656 9.57083 17.7533C10.415 17.0601 11.2095 16.3085 11.9483 15.5041C13.6517 13.6416 15.5 10.9416 15.5 7.91077C15.5 6.92585 15.306 5.95058 14.9291 5.04064C14.5522 4.1307 13.9997 3.30391 13.3033 2.60747C12.6069 1.91103 11.7801 1.35858 10.8701 0.98167C9.96018 0.60476 8.98491 0.410767 8 0.410767C7.01509 0.410767 6.03982 0.60476 5.12987 0.98167C4.21993 1.35858 3.39314 1.91103 2.6967 2.60747C2.00026 3.30391 1.44781 4.1307 1.0709 5.04064C0.693993 5.95058 0.5 6.92585 0.5 7.91077C0.5 10.9416 2.34833 13.6408 4.05167 15.5041C4.79052 16.3088 5.58497 17.0598 6.42917 17.7533ZM8 10.6191C7.28171 10.6191 6.59283 10.3338 6.08492 9.82585C5.57701 9.31794 5.29167 8.62906 5.29167 7.91077C5.29167 7.19247 5.57701 6.5036 6.08492 5.99569C6.59283 5.48777 7.28171 5.20243 8 5.20243C8.71829 5.20243 9.40717 5.48777 9.91508 5.99569C10.423 6.5036 10.7083 7.19247 10.7083 7.91077C10.7083 8.62906 10.423 9.31794 9.91508 9.82585C9.40717 10.3338 8.71829 10.6191 8 10.6191Z"
                            fill="white"
                          />
                        </svg>
                        <span>
                          {getProvinceName(entity?.profile?.province_id)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {loading && !initialLoad && (
            <div className="flex justify-center my-8">
              <ClipLoader color="#E91E63" size={30} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Search;
