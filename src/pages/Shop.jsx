import React, { useState } from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import ModelImage from '/src/assets/images/model-img.jpg'
import { Link } from "react-router-dom";

function Shop() {
  

  return (
<>
<Header />
<h1 className="text-center text-[32px] font-[400] uppercase mt-[50px] md:mt-[121px]">Shop</h1>
    <div className="max-w-[1180px] mx-auto mt-[50px] px-[15px] mb-[50px] md:mb-[121px]">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[15px] md:gap-x-[40px]">
<div className='blog-box text-center'>
<div className='blog-inner'>
<Link to="/payment-method">
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
</Link>

</div>

</div>
<div className='blog-box text-center'>
<div className='blog-inner'>
<Link to="/payment-method">
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
</Link>

</div>
</div>
<div className='blog-box text-center'>
<div className='blog-inner'>
<Link to="/payment-method">
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
</Link>

</div>
</div>
<div className='blog-box text-center'>
<div className='blog-inner'>
<Link to="/payment-method">
<div className='blog-img'>
<img src={ModelImage} />
</div>
<h3 className='uppercase font-[400] text-[16] py-[12px] bg-black mt-[20px] text-white hover:bg-[#8B8B8B]'>Shop</h3>
</Link>

</div>
</div>
</div>
    </div>
    <Footer />
    </>
  );
}

export default Shop;
