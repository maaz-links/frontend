"use client"

import { useState } from "react"

function FilterPanel({ isOpen, onClose, filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters)

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

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50  transition-opacity" onClick={onClose} />}

      {/* Filter Panel */}
      <div
        className={`fixed top-0 right-0 h-full rounded-3xl w-[80%] md:w-[484px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter</h3>

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
                Hostess
              </button>
              <button
                onClick={() => handleTypeToggle("top_profile")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  localFilters.top_profile ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Wingwoman
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                Sugarbaby
              </button>
            </div>
          </div>

          {/* Age Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Age</h4>
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
                  defaultValue="30"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Sort by Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Sort by</h4>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Popular</option>
              <option>Newest</option>
              <option>Rating</option>
              <option>Price</option>
            </select>
          </div>

          {/* Unlock Price Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Unlock Price</h4>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Up to 50 coins</option>
              <option>Up to 100 coins</option>
              <option>Up to 200 coins</option>
              <option>Any price</option>
            </select>
          </div>

          {/* Language Section */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Language</h4>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
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
