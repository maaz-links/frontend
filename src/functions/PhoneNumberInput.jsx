import React from 'react';
import { allCountries } from 'country-telephone-data';

const PhoneNumberInput = ({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  bodyClass = "flex gap-2", 
    fieldClass = "h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl" ,
  errorField = <></>
}) => {

    function getCountryDisplayName(name) {
        return name.replace(/\s*\(.*?\)/, '');
      }
      
  return (
    
      <div className={bodyClass}>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className={`w-2/5 ${fieldClass}`}
        >
          <option value=''>Country Code</option>
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
          className={`w-3/5 ${fieldClass}`}
          placeholder="Inserisci telefono"
        />
      </div>
      
  );
};

export default PhoneNumberInput;