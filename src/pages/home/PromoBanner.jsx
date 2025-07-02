import React from "react";

const PromoBanner = () => {
  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative overflow-visible bg-gradient-to-br from-[#E8E0FF] via-[#D1B2FF] to-[#C4A8FF] rounded-[2rem] px-8 py-12 md:py-16 flex flex-col md:flex-row items-center shadow-xl">
          
          {/* Left Text */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Are You a Hostess or Model?
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              HostessForYou invites you into a world of elegance, freedom, and meaningful encounters. As a hostess or companion, you embody sophistication and charm, attending elite events, forming genuine connections, and embracing a lifestyle beyond the ordinary.
            </p>
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition">
              Create your profile for free
            </button>
          </div>

          {/* Right Image — Overflowing */}
          <div className="w-full md:w-1/2 relative">
            <img
              src="/src/assets/images/hostess.png"
              alt="Hostess or Model"
              className="absolute bottom-[-4rem] right-[-3rem] w-[280px] md:w-[320px] lg:w-[370px] object-cover z-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
