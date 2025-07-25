import { useStateContext } from "../../../context/ContextProvider";

function InterestSelectionSection() {
  const { token } = useStateContext();

  // const interestAreas = [
  //   [
  //     { name: "Photo Model", selected: true },
  //     { name: "Parlare", selected: true },
  //     { name: "Glamour Photo", selected: true },
  //     { name: "Business Event", selected: true },
  //   ],
  //   [
  //     { name: "Fashion Photo", selected: true },
  //     { name: "Wingwoman", selected: false },
  //     { name: "Yacht Crew", selected: false },
  //     { name: "Hostess Fiere", selected: false },
  //     { name: "Wingwoman", selected: false },

  //   ],
  //   [
  //     { name: "Yacht Crew", selected: false },
  //     { name: "Hostess Fiere", selected: false },
  //     { name: "Hostess Fiere", selected: false },
  //     { name: "Private Event", selected: false },
  //   ],
  // ];

  const interestAreas = [
    [
      { name: "Cene e serate", selected: true },
      { name: "Viaggi", selected: true },
      { name: "Intrattenimento", selected: true },
      { name: "Guida turistica", selected: true },
    ],
    [
      { name: "Personal shopper", selected: true },
      { name: "Finta fidanzata", selected: false },
    ],
  ];

  return (
    <div className="interest-section bg-white m-auto p-5 lg:p-10 flex flex-col items-center">
      <div className="md:p-[8px] flex flex-col items-center md:max-w-[731px]">
      <h2 className="text-[#090909] mb-4 font-bold text-[32px] lg:text-[45px] lg:leading-[130%] leading-[38px] tracking-[-6%] text-center px-4">
      Scegli tu le aree che ti interessano di più
      </h2>
      <p className="text-[#4A4A4A] text-sm leading-[20px] font-[400] text-center mb-7 lg:max-w-[600px]">
      Durante la compilazione del profilo, scegli ciò che ti interessa: riceverai solo proposte in linea con le tue preferenze.
      </p>
      </div>
      <div className="flex flex-col items-center w-full md:max-w-[90%] ">
        {interestAreas.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-center gap-2 mb-2.5 w-full"
          >
            {row.map((area, index) => (
              <button
                key={index}
                className={` md:p-3  p-2 rounded-[8px] roundness-xl text-[18px] leading-[24px] font-[400] flex items-center justify-center ${
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