import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { toast } from "react-toastify";

function SignUp() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  //constnavigate =
  const handleNext = () => {
    if (selectedOption) {
      //alert(`You selected: ${selectedOption}`);
      window.location.href = '/create-signup'
    } else {
      toast.info('Please select an option before proceeding.')
      // alert("Please select an option before proceeding.");
    }
  };

  return (
    <>
    <Header />
    <h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">CHOOSE A PROFILE</h1>
    <div className="max-w-[971px] mx-auto mt-[50px] md:mt-[100px] px-[15px] mb-[50px] md:mb-[121px]">
      {/* Selection Options */}
      <div className="flex flex-col md:flex-row  gap-[30px] md:gap-[150px] mb-6">
        {/* Option 1 */}
        <div
          className={`relative w-full md:w-[50%] h-[171px]  flex items-center justify-center bg-[#F5F5F5]  cursor-pointer 
          ${selectedOption === "hostess" ? "border-4 border-black" : ""}`}
          onClick={() => handleSelect("hostess")}
        >
          <p className="text-[#424242] text-center text-[22px]">I am an hostess or model</p>
          <span
            className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-black 
            ${selectedOption === "hostess" ? "bg-[#E91E63]" : "bg-white"}`}
          ></span>
        </div>

        {/* Option 2 */}
        <div
          className={`relative w-full md:w-[50%] h-[171px] flex items-center justify-center bg-[#F5F5F5]  cursor-pointer 
          ${selectedOption === "looking" ? "border-4 border-black" : ""}`}
          onClick={() => handleSelect("looking")}
        >
          <p className="text-[#424242] text-center text-[22px]">I am looking for an hostess or model</p>
          <span
            className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-black 
            ${selectedOption === "looking" ? "bg-[#E91E63]" : "bg-white"}`}
          ></span>
        </div>
      </div>

      {/* Next Button */}
      <div className="ext-center max-w-[200px] mx-auto mt-[30px] md:mt-[70px]">
      <button
        className="cursor-pointer w-full bg-[#E91E63] uppercase text-[20px] text-white p-[12px]  hover:bg-[#F8BBD0]"
        onClick={handleNext}
      >
        NEXT
      </button>
      </div>
      </div>
 <Footer />
    </>
  );
}

export default SignUp;
