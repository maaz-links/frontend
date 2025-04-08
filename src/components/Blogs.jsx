import React from 'react';
import '/src/assets/styles/blogs.css'
import ModelImage from '/src/assets/images/model-img.jpg'


function Blogs () {
   
return (
<>
<div className="pt-[62px] pb-[45px] px-[15px] border-y-1">
<h1 className="text-center text-[32px] uppercase font-[400]">BLOG</h1>
<div className='howto-boxs md:max-w-[950px] m-auto mt-[7px]'>
<div className="grid grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-x-[40px]">
<div className='blog-box text-center bg-[#fff] hover:bg-[#8B8B8B]'>
<div className='blog-inner'>
<a href='#'>
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px]'>Blog1</h3>
</a>

</div>

</div>
<div className='blog-box text-center bg-[#fff] hover:bg-[#8B8B8B]'>
<div className='blog-inner'>
<a href='#'>
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px]'>Blog1</h3>
</a>

</div>
</div>
<div className='blog-box text-center bg-[#fff] hover:bg-[#8B8B8B]'>
<div className='blog-inner'>
<a href='#'>
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px]'>Blog1</h3>
</a>

</div>
</div>
<div className='blog-box text-center bg-[#fff] hover:bg-[#8B8B8B]'>
<div className='blog-inner'>
<a href='#'>
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px]'>Blog1</h3>
</a>

</div>
</div>
</div>
</div>

</div>

</>

)


}
export default Blogs