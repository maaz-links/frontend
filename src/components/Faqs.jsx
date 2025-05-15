import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

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
  return (
    <>
     <h1 className="mt-[66px] text-center text-[32px] font-[400] uppercase">Faqs</h1>
    <div className=" max-w-[1246px] m-auto mt-[26px] mb-[50px] md:mb-[148px] px-[15px]">
   
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="What is Lorem Ipsum?" className='mb-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionItem>

        <AccordionItem header="Where does it come from?">
          Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
          erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae.
        </AccordionItem>

        <AccordionItem header="Why do we use it?">
          Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
          Fusce vulputate purus sed tempus feugiat.
        </AccordionItem>
      </Accordion>
    </div>
    </>
  );
}
