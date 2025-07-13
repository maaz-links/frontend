const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50  backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative rounded-3xl p-12 max-w-[96%] md:max-w-[900px] w-full  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/src/assets/images/welcom-model-bg.png")`,
        }}
      >
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-5 right-6 text-white hover:text-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}

        {/* Content */}
        <div className="w-full md:w-[65%]  pb-16 pt-5 px-7 flex flex-col items-start ">
          <h2 className="text-3xl font-bold text-black mb-6">
            Welcome to Hostess for You!
          </h2>

          <p className="text-black text-opacity-90 mb-3 text-lg">
            Your email has been successfully verified. Finish setting up your
            profile and begin engaging with others.
          </p>

          <button
            className={` py-4 px-8 rounded-2xl font-semibold text-lg transition-all ${"bg-black text-white hover:bg-[#8880FE] active:scale-95"}`}
          >
            fill out your profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
