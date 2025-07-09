"use client"

import { useEffect, useState } from "react"
import { useStateContext } from "../../context/ContextProvider"

function FilterPanel({ isOpen, onClose, filters, setFilters }) {

  const {languageOptions} = useStateContext()
  const [localFilters, setLocalFilters] = useState(filters)

  const priceOptions = [
    { label: "Up to 50 coins", value: 50 },
    { label: "Up to 100 coins", value: 100 },
    { label: "Up to 200 coins", value: 200 },
    { label: "Any price", value: "" }
  ]

  const handlePriceChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10)
    setLocalFilters(prev => ({
      ...prev,
      cost: value
    }))
  }

  const handleApplyFilters = () => {
    setFilters(localFilters)
    onClose()
  }

  const handleTypeToggle = (type) => {
    setLocalFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleAgeChange = (type, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [type]: parseInt(value, 10),  // Convert string to number
    }))
  }

  const handleLanguageChange = (e) => {
    const selectedLanguageId = e.target.value
    setLocalFilters((prev) => ({
      ...prev,
      language: selectedLanguageId === "" ? "" : selectedLanguageId,
    }))
  }


  useEffect(() => {
    setLocalFilters(filters);

  }, [filters]);


  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50  transition-opacity" onClick={onClose} />}

      {/* Filter Panel */}
      <div
        className={`fixed top-0 right-0 h-full rounded-3xl p-2 md:p-4 xl:p-8 w-[80%] md:w-[484px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <h3 className="text-[45px] font-[400]  text-gray-900 mb-6">Filter</h3>

          {/* Type Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Type</h4>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleTypeToggle("verified_profile")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  localFilters.verified_profile ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Verified Profile
              </button>
              <button
                onClick={() => handleTypeToggle("top_profile")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  localFilters.top_profile ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Top Profile
              </button>
              {/* <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                Sugarbaby
              </button> */}
            </div>
          </div>

           {/* Min Age Section */}
           <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Minimum Age</h4>
            <div className="px-2">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>18</span>
                <span>45</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="18"
                  max="45"
                  value={localFilters.minage}
                  onChange={(e) => handleAgeChange("minage", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center mt-2 text-sm">
                  Selected: {localFilters.minage}
                </div>
              </div>
            </div>
          </div>

          {/* Max Age Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Maximum Age</h4>
            <div className="px-2">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>18</span>
                <span>45</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="18"
                  max="45"
                  value={localFilters.maxage}
                  onChange={(e) => handleAgeChange("maxage", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center mt-2 text-sm">
                  Selected: {localFilters.maxage}
                </div>
              </div>
            </div>
          </div>

          {/* Sort by Section */}
          {/* <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Sort by</h4>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Popular</option>
              <option>Newest</option>
              <option>Rating</option>
              <option>Price</option>
            </select>
          </div> */}

          {/* Unlock Price Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Unlock Price</h4>
            <select
              value={localFilters.cost ?? ""}
              onChange={handlePriceChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priceOptions.map((option) => (
                <option key={option.value ?? "any"} value={option.value ?? ""}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language Section */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Language</h4>
            <select
              value={localFilters.language || ""}
              onChange={handleLanguageChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any language</option>
              {languageOptions?.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleApplyFilters}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}

export default FilterPanel
