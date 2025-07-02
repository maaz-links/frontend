import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <strong>{header}</strong>
        <div className={`ml-auto p-3 md:p-4 rounded-full shadow transition-all duration-200 ${
          isEnter ? "bg-black text-white" : ""
        }`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L10 10L19 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </>
    )}
    className={({ isEnter }) => `border-[2px] rounded-[35px] p-[5%] mb-[15px] md:mb-[30px] text-[18px] md:text-[24px] ${
      isEnter ? "border-black" : "border-gray-200"
    } transition-colors duration-200`}
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full items-center text-left transition-colors duration-200 ${
          isEnter ? "" : ""
        }`
    }}
    contentProps={{
      className: "transition-height mt-5 duration-200 ease-out"
    }}
    panelProps={{ className: "flex text-gray-400 w-full items-center text-left" }}
  />
);

const FAQ_DATA = [
  {
    question: "What is Webflow and why is it the best website builder?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "What is your favorite template from BRIX Templates?",
    answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "How do you clone a Webflow Template from the Showcase?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    question: "Why is BRIX Templates the best Webflow agency out there?",
    answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

export default function Faqs({ faqs = FAQ_DATA }) {
  // Return null if no FAQs
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl md:text-4xl font-medium uppercase mb-12 md:mb-16">
          FAQs
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Accordion transition transitionTimeout={200}>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} header={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}