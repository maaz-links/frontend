import React from 'react';
import Introimage from "/src/assets/images/intro.png"

function IntroBox() {
 

  return (
    <>
   
    <div className=' introduction card-box-into pt-[56px] pb-[95px] px-[30px] bg-white max-w-[1300px] m-auto mt-[28px] bg-cover bg-center' style={{ backgroundImage:`url(${Introimage})` }}>
<div className='card-intro max-w-100 md:max-w-[300px] text-center
'>
<h1 className='mb-[15px] font-[400] text-[20px]'>INTRODUCTION</h1>
<p className='text-[14px] font-[400] md:max-w-[294px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum ante et blandit efficitur. Aenean eget tempus felis. Donec imperdiet condimentum quam sit amet lacinia. In congue sapien id nisi efficitur eleifend. Proin quis dictum dui, nec condimentum lectus. Mauris vel arcu at dui finibus bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
<div className='intro-buttons flex items-center justify-between pt-[3em] gap-x-[40px]'>
<a href='/search' className='btn bg-[#D9D9D9]  p-[10px] w-full text-[20px] font-[400] leading-[130%]'>Search</a>
<a href='/sign-up' className='btn bg-[#D9D9D9] block p-[10px] w-full text-[20px] font-[400] leading-[130%]'>Sign Up </a>
</div>
</div>

    </div> 
    
      
    </>
  )
}

export default IntroBox
