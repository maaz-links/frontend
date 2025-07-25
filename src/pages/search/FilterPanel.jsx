"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { DualRangeSlider } from "@/components/common/DualRangeSlider";
import { ROLES } from "../../../constants";

function FilterPanel({ isOpen, onClose, filters, setFilters }) {
  const { languageOptions, user } = useStateContext();
  const [localFilters, setLocalFilters] = useState(filters);

  const priceOptions = [
    { label: "Fino a 50 monete", value: 50 },
    { label: "Fino a 100 monete", value: 100 },
    { label: "Fino a 200 monete", value: 200 },
    { label: "Qualsiasi prezzo", value: "" },
  ];

  const sortOptions = [
    { label: "Predefinito", value: "" },
    { label: "Popolare", value: "popular" },
    { label: "Più recente", value: "newest" },
    { label: "Valutazione", value: "rating" },
  ];

  const handlePriceChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    setLocalFilters((prev) => ({
      ...prev,
      cost: value,
    }));
  };

  const handleSortChange = (e) => {
    setLocalFilters(prev => ({
      ...prev,
      sort: e.target.value
    }))
  }


  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleTypeToggle = (type) => {
    setLocalFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleAgeChange = (values) => {
    setLocalFilters((prev) => ({
      ...prev,
      minage: values[0],
      maxage: values[1],
    }));
  };

  const handleLanguageChange = (e) => {
    const selectedLanguageId = e.target.value;
    setLocalFilters((prev) => ({
      ...prev,
      language: selectedLanguageId === "" ? "" : selectedLanguageId,
    }));
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-50 z-50  transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div
        className={`fixed top-0 right-0 h-full md:rounded-3xl p-2 md:p-4 xl:p-8 w-full md:w-[484px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          className="fixed right-6 top-6 md:hidden"
          onClick={onClose}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.5627 4.72344C20.6371 4.64906 20.6961 4.56076 20.7364 4.46358C20.7766 4.36639 20.7973 4.26223 20.7973 4.15704C20.7973 4.05185 20.7766 3.94769 20.7364 3.85051C20.6961 3.75333 20.6371 3.66502 20.5627 3.59064C20.4883 3.51626 20.4 3.45726 20.3029 3.41701C20.2057 3.37675 20.1015 3.35603 19.9963 3.35603C19.8911 3.35603 19.787 3.37675 19.6898 3.41701C19.5926 3.45726 19.5043 3.51626 19.4299 3.59064L11.9963 11.0258L4.56272 3.59064C4.48834 3.51626 4.40004 3.45726 4.30286 3.41701C4.20567 3.37675 4.10151 3.35603 3.99632 3.35603C3.89113 3.35603 3.78697 3.37675 3.68979 3.41701C3.59261 3.45726 3.5043 3.51626 3.42992 3.59064C3.35554 3.66502 3.29654 3.75333 3.25629 3.85051C3.21603 3.94769 3.19531 4.05185 3.19531 4.15704C3.19531 4.26223 3.21603 4.36639 3.25629 4.46358C3.29654 4.56076 3.35554 4.64906 3.42992 4.72344L10.8651 12.157L3.42992 19.5906C3.2797 19.7409 3.19531 19.9446 3.19531 20.157C3.19531 20.3695 3.2797 20.5732 3.42992 20.7234C3.58014 20.8737 3.78388 20.9581 3.99632 20.9581C4.20876 20.9581 4.4125 20.8737 4.56272 20.7234L11.9963 13.2882L19.4299 20.7234C19.5801 20.8737 19.7839 20.9581 19.9963 20.9581C20.2088 20.9581 20.4125 20.8737 20.5627 20.7234C20.7129 20.5732 20.7973 20.3695 20.7973 20.157C20.7973 19.9446 20.7129 19.7409 20.5627 19.5906L13.1275 12.157L20.5627 4.72344Z"
            fill="#090909"
          />
        </svg>

        <div className="p-6 h-full overflow-y-auto">
          <h3 className="text-[45px] font-bold  text-black mb-6">Affina ricerca</h3>

          {/* Type Section */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-black mb-3">Tipologia</h4>
            <div className="flex gap-2 flex-wrap">
              {user?.role != ROLES.HOSTESS && (
                <>
                  <button
                    onClick={() => handleTypeToggle("hostess")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      localFilters.hostess
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    Hostess
                  </button>
                  <button
                    onClick={() => handleTypeToggle("wingwoman")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      localFilters.wingwoman
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    Wingwoman
                  </button>
                  <button
                    onClick={() => handleTypeToggle("sugarbaby")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      localFilters.sugarbaby
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                  >
                    Sugarbaby
                  </button>
                </>
              )}

              <button
                onClick={() => handleTypeToggle("verified_profile")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  localFilters.verified_profile
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                Profilo verificato
              </button>
              <button
                onClick={() => handleTypeToggle("top_profile")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  localFilters.top_profile
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                Profilo superiore
              </button>
            </div>
          </div>

          {/* Age Section */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-black mb-3">Età</h4>
            <div className="px-2">
              <div className="flex justify-between text-sm font-bold text-black mb-2">
                <span>18</span>
                <span>45</span>
              </div>
              <DualRangeSlider
                label={(value) => <span>{value}</span>}
                value={[localFilters.minage, localFilters.maxage]}
                onValueChange={handleAgeChange}
                min={18}
                max={45}
                step={1}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>From {localFilters.minage}</span>
                <span>To {localFilters.maxage}</span>
              </div>
            </div>
          </div>

          {/* Sort by Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Risultati ordinati per</h4>
        <select
          value={localFilters.sort ?? ""}
          onChange={handleSortChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

          {user?.role != ROLES.HOSTESS && (
            <>
              {/* Unlock Price Section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-black mb-3">
                Crediti per sblocco
                </h4>
                <select
                  value={localFilters.cost ?? ""}
                  onChange={handlePriceChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priceOptions.map((option) => (
                    <option
                      key={option.value ?? "any"}
                      value={option.value ?? ""}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Language Section */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-black mb-3">Lingua</h4>
            <select
              value={localFilters.language || ""}
              onChange={handleLanguageChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Qualsiasi lingua</option>
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
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-[#8880FE] transition-colors"
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
  );
}

export default FilterPanel;
