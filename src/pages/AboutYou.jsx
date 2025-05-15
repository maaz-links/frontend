import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
const AboutYou = () => {
    const [country, setCountry] = useState("Italy");
    const [province, setProvince] = useState("Rome");
return (
<>
<Header />

<div className="max-w-[1300px] mx-auto mt-[64px] mb-[50px] md:mb-[150px] px-[15px]">
<h3 className="text-[32px] md:pt-[70px]">About </h3>
{/* Country & Province Selection */}
<div className="mt-[44px] grid grid-cols-1 gap-4 md:gap-[40px] max-w-[865px]">
                    <div>
                      <label className="mt-[20px] md:mt-[40px] font-[400] text-[16px]">Country</label>
                      <select 
                        className="w-full p-[15px] mt-2 bg-[#F5F5F5] focus:outline-0"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                    <div>
                      <label className="mt-[20px] md:mt-[40px] font-[400] text-[16px]">Province</label>
                      <select 
                        className="w-full p-[15px] mt-2 bg-[#F5F5F5] focus:outline-0"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                      >
                        <option value="Rome">Rome</option>
                        <option value="Milan">Milan</option>
                        <option value="Naples">Naples</option>
                      </select>
                    </div>
                  </div>
<h3 className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Available for:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px]  max-w-[600px]">
          {["photo model", "fashion pics", "travel & weekend", "dinners", "host hostess", "parties", "fake girlfriend", "talk", "shopping", "glamour pics", "company" , "nsfw pics","events","example 1","example 2","example 3"].map((item) => (
            <span key={item} className="bg-[#F5F5F5] px-3 py-1  text-[11px] text-center min-w-[139px]">{item}</span>
          ))}
        </div>

        {/* Personality & Hobbies */}
        <h3 className="mt-[20px] md:mt-[55px] font-[400] text-[16px]">Personality and Hobbies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[11px] mt-[6px] max-w-[600px]">
          {Array.from({ length: 16 }, (_, i) => `Example ${i + 4}`).map((hobby) => (
            <span key={hobby} className="bg-[#F5F5F5] px-3 py-1  text-[11px] text-center min-w-[139px]">{hobby}</span>
          ))}
        </div>
        <div className="flex mt-[50px] md:mt-[91px] ">
        <button className="max-w-[500px] text-[20px] w-full  bg-[#E91E63] text-white px-6 py-2 cursor-pointer uppercase hover:bg-[#F8BBD0] ">Next</button>
       
       
      </div>
        
</div>
<Footer />
</>


)



    
}
export default AboutYou