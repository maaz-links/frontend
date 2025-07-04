import { useStateContext } from "../../../context/ContextProvider";

function InterestSelectionSection() {
  const { token } = useStateContext();

  const interestAreas = [
    [
      { name: "Photo Model", selected: true },
      { name: "Parlare", selected: true },
      { name: "Glamour Photo", selected: true },
      { name: "Business Event", selected: true },
    ],
    [
      { name: "Fashion Photo", selected: true },
      { name: "Wingwoman", selected: false },
      { name: "Yacht Crew", selected: false },
    ],
    [
      { name: "Wingwoman", selected: false },
      { name: "Hostess Fiere", selected: false },
      { name: "Private Event", selected: false },
    ],
  ];

  return (
    <div className="interest-section bg-white m-auto p-5 lg:p-10 flex flex-col items-center">
      <h2 className="text-[#1A2E5A] mb-4 font-bold text-2xl lg:text-[32px] leading-[38px] tracking-[-0.64px] text-center">
        You Can Choose the Areas that Interest you Most
      </h2>
      <p className="text-[#4A4A4A] text-sm leading-[20px] font-[400] text-center mb-7 lg:max-w-[600px]">
        When filling out your profile, select what interests you most and receive offers based on your preferences.
      </p>
      <div className="flex flex-col items-center w-full max-w-[90%] lg:max-w-[700px]">
        {interestAreas.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-center gap-2 mb-2.5 w-full"
          >
            {row.map((area, index) => (
              <button
                key={index}
                className={`px-3.5 py-2 rounded-[8px] text-sm leading-[20px] font-[400] flex items-center justify-center ${
                  area.selected
                    ? "bg-[#F2F2FF] text-[#8880FE]"
                    : "bg-[#F3F3F5] text-[#090909]"
                }`}
              >
                {area.name}{" "}
                {area.selected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-2"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4 6.5L2.75 8L8 13.5L14 2.5L12.75 1L8 10.5L4 6.5Z"
                      fill="#8880FE"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterestSelectionSection;