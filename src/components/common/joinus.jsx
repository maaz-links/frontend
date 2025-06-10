import React from 'react';
import { Link } from 'react-router-dom';




function JoinUs() {
   
return (
<>
<div className="mb-[50px] md:mb-[114px] px-[15px] border-t-1 ">
<h1 className="text-center text-[32px] uppercase font-[400] pt-[50px] md:pt-[81px]">JOIN US NOW FOR FREE</h1>
<p className='text-center text-[16px]'>
  Step into the world of elegance and opportunity. Whether you're a model, hostess, or brand, joining us is your first move toward meaningful connections and standout moments.
</p>
<div className='text-center mt-[40px]'>
<Link to='/sign-up' className='bg-[#E91E63] text-[20px] text-[#fff] p-[10px] px-[70px] hover:bg-[#F8BBD0] '>SIGN UP FOR FREE</Link>
</div>
</div>

</>

)


}
export default JoinUs