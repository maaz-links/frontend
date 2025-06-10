import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
       
      </>
    )}
    className="mb-[30px]"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full text-[18px] p-4 bg-[#F8BBD0] shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-left cursor-pointer ${
          isEnter && "bg-white-200"
        }`
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out"
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default function Faqs() {

  const [faqs, setFaqs] = useState(
    [
     
    ]);
  useEffect(() => {
    axiosClient.get('/api/my-faqs')
      .then(response => setFaqs(response.data.faqs))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    {faqs.length != 0 && <div>
     <h1 className="mt-[66px] text-center text-[32px] font-[400] uppercase">Faqs</h1>
    <div className=" max-w-[1246px] m-auto mt-[26px] mb-[50px] md:mb-[148px] px-[15px]">
   
      
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={200}>
      {faqs.map(faq => (
            <div key={faq.id}>
              <AccordionItem header={`${faq.question}`} className='mb-[30px]'>
              {faq.answer}
        </AccordionItem>

            </div>
            
      ))}
      </Accordion>
    </div>
    </div>}
    </>
  );
}
