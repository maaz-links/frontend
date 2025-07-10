"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Header from "/src/components/common/header";
import Footer from "/src/components/common/footer";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";
import { getAge, getAttachmentURL } from "../functions/Common";
import { ClipLoader } from "react-spinners"; // Import spinner
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FilterPanel from "./search/FilterPanel";
import { ROLES } from "../../constants";

export function FilterDisplay({
  name = "Name",
  value = "Value",
  onCross = () => console.log("empty"),
}) {
  return (
    <div className="rounded-4xl flex items-center text-nowrap bg-gray-200 px-4 py-2 text-[15px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="inline rounded-full p-1  hover:bg-gray-300 me-3"
        onClick={onCross}
      >
        <path d="M2.146 2.146a.5.5 0 0 1 .708 0L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854a.5.5 0 0 1 0-.708z" />
      </svg>
      {name}: {value}
    </div>
  );
}

function Search() {
  const { user, token, getProvinceName, languageOptions } = useStateContext();
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
  const observer = useRef();
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const filterRef = useRef(); // Declare filterRef variable

  const [filters, setFilters] = useState({
    province_id: searchParams.get("province") || "",
    verified_profile: searchParams.get("verified") === "true",
    top_profile: searchParams.get("top") === "true",
    hostess: searchParams.get("hostess") === "true",
    sugarbaby: searchParams.get("sugarbaby") === "true",
    wingwoman: searchParams.get("wingwoman") === "true",

    minage: searchParams.get("minage") || "",
    maxage: searchParams.get("maxage") || "",
    language: searchParams.get("language") || "",
    cost: searchParams.get("cost") || "",
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
          hostess: filters.hostess || undefined,
          sugarbaby: filters.sugarbaby || undefined,
          wingwoman: filters.wingwoman || undefined,

          minage: filters.minage || undefined,
          maxage: filters.maxage || undefined,
          language: filters.language || undefined,
          cost: filters.cost || undefined,
          page: 1, // Always start with page 1 when filters change
          per_page: perPage, // Number of items per page
        };

        const [searchRes, provincesRes] = await Promise.all([
          axiosClient.post(url, apiParams),
          axiosClient.get("/api/provinces"),
        ]);
        console.log(searchRes.data);
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
    if (filters.hostess) params.hostess = "true";
    if (filters.sugarbaby) params.sugarbaby = "true";
    if (filters.wingwoman) params.wingwoman = "true";

    if (filters.maxage) params.maxage = filters.maxage;
    if (filters.minage) params.minage = filters.minage;
    if (filters.language) params.language = filters.language;
    if (filters.cost) params.cost = filters.cost;

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
        hostess: filters.hostess || undefined,
        sugarbaby: filters.sugarbaby || undefined,
        wingwoman: filters.wingwoman || undefined,

        minage: filters.minage || undefined,
        maxage: filters.maxage || undefined,
        language: filters.language || undefined,
        cost: filters.cost || undefined,
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

  function getLanguageNameById(id) {
    //console.log(languageOptions)
    const lang = languageOptions.find((l) => l.id == id);
    return lang ? lang.name : "Unknown";
  }

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
              className="appearance-none w-full bg-white border border-gray-400 py-4 rounded-xl px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="filter relative">
            <button
              onClick={() => setShowFilterPanel(true)}
              //className="flex cursor-pointer items-center gap-2 text-[14px] font-extrabold  border bg-white leading-[100%] rounded-xl px-4 py-3 focus:outline-none text-gray-700 hover:bg-black  hover:text-white  transition-all duration-300 ease-in-out"
              className="group flex cursor-pointer items-center gap-2 text-[14px] font-extrabold border hover:bg-black hover:text-white bg-white leading-[100%] rounded-xl px-4 py-3 text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none" className="black"
              >
                <path
                  d="M6.125 9.5625H24.875M9.73125 15.5H21.2687M13.3375 21.4375H17.6625"
                  stroke="currentColor"
                  className="stroke-black group-hover:stroke-white"
                  strokeWidth="1.875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full flex-wrap  gap-2">
          {filters.verified_profile && (
            <FilterDisplay
              name="Verified Profile"
              value="True"
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  verified_profile: false,
                }))
              }
            />
          )}

          {filters.top_profile && (
            <FilterDisplay
              name="Top Profile"
              value="True"
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  top_profile: false,
                }))
              }
            />
          )}

          {filters.hostess && (
            <FilterDisplay
              name="Hostess"
              value="True"
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  hostess: false,
                }))
              }
            />
          )}
          {filters.wingwoman && (
            <FilterDisplay
              name="Wingwoman"
              value="True"
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  wingwoman: false,
                }))
              }
            />
          )}
          {filters.sugarbaby && (
            <FilterDisplay
              name="Sugarbaby"
              value="True"
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  sugarbaby: false,
                }))
              }
            />
          )}

          {filters.minage && (
            <FilterDisplay
              name="Min Age"
              value={filters.minage}
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  minage: "",
                }))
              }
            />
          )}

          {filters.maxage && (
            <FilterDisplay
              name="Max Age"
              value={filters.maxage}
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  maxage: "",
                }))
              }
            />
          )}

          {filters.language && (
            <FilterDisplay
              name="Language"
              value={getLanguageNameById(filters.language)}
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  language: "",
                }))
              }
            />
          )}
          {filters.cost && (
            <FilterDisplay
              name="Cost"
              value={`${filters.cost} credits`}
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  cost: "",
                }))
              }
            />
          )}

          {(filters.verified_profile ||
            filters.top_profile ||
            filters.minage ||
            filters.maxage ||
            filters.language ||
            filters.cost ||
            filters.wingwoman ||
            filters.hostess ||
            filters.sugarbaby) && (
            <FilterDisplay
              name="Clear"
              value="All"
              onCross={() =>
                setFilters((prev) => ({
                  ...prev,
                  province_id: "",
                  verified_profile: false,
                  top_profile: false,
                  wingwoman: false,
                  hostess: false,
                  sugarbaby: false,
                  minage: "",
                  maxage: "",
                  language: "",
                  cost: "",
                }))
              }
            />
          )}
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
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="mt-8">
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
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={entity.name}
                        />
                      </div>
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      {/* Profile Tags - Top */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
                        {entity.role == ROLES.HOSTESS &&
                          entity.profile.profile_types.map((type) => (
                            <span
                              key={type.id}
                              className="bg-black hover:bg-[#8880FE] backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium"
                            >
                              {type.name}
                            </span>
                          ))}
                      </div>
                      {/* Content - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                        <div className="flex items-center gap-1 mb-1">
                          <h3 className="font-semibold text-lg">
                            {entity.name}
                          </h3>
                          {entity.is_online == "online" && (
                            <span className="text-[#76FF5B] text-xl">•</span>
                          )}
                          <span className="text-sm opacity-90">
                            ({getAge(entity.dob)} years)
                          </span>
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
            </div>
          )}

          {loading && !initialLoad && (
            <div className="flex justify-center my-8">
              <ClipLoader color="#E91E63" size={30} />
            </div>
          )}
        </div>
      </div>
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        setFilters={setFilters}
      />
      <Footer />
    </>
  );
}

export default Search;
