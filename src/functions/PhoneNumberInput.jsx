import React from 'react';
import { allCountries } from 'country-telephone-data';

const PhoneNumberInput = ({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  errorField = <></>
}) => {

    function getCountryDisplayName(name) {
        return name.replace(/\s*\(.*?\)/, '');
      }
      
  return (
    
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-2/5 h-15 text-sm px-3 sm:text-xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
        >
          {allCountries.map((country) => (
            <option key={country.iso2} value={country.dialCode}>
              {getCountryDisplayName(country.name)} (+{country.dialCode})
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-3/5 h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl"
          placeholder="Enter Phone Number"
        />
      </div>
      
  );
};

export default PhoneNumberInput;