import  React from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { Outlet, Link } from "react-router-dom";

function Payments() {
  

  return (
    <>
    <Header />
    <div className='max-w-[1200px] m-auto mt-[50px] mb-[50px] md:mt-[126px] md:mb-[144px]'>
    <h1 className="text-center text-[32px] font-[400] uppercase">CREDITS & PAYMENT</h1>
  <div className='terms-text text-center text-[24px] mt-[50px]'>
<p>
payments
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consectetur neque. Ut metus ex, pretium et massa id, molestie luctus dui. Donec sed interdum erat. Nullam pellentesque turpis id euismod molestie. Integer porttitor pretium gravida.
 Sed nisi urna, scelerisque eget leo facilisis, vehicula dictum quam. Curabitur in efficitur sapien, quis posuere tortor. Sed non justo orci. Etiam id quam quis dui consequat malesuada eu ac nunc. Etiam sed nibh sed elit accumsan fermentum ac vel enim. Sed pretium fermentum eros, non 
bibendum ipsum condimentum et. Orci varius natoque penatibus et
 magnis dis parturient montes
, nascetur ridiculus mus.
Curabitur sit amet maximus neque, in imperdiet velit. 
Vestibulum facilisis nulla orci, vel mollis ante elementum sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque porttitor laoreet mi, vitae vulputate dui mollis id. Morbi vitae elit dui. Praesent lacus ante, sagittis ut sodales nec, feugiat sit amet dolor. Aliquam neque tellus, pellentesque a tellus et, sagittis sollicitudin elit.
Donec rutrum fermentum orci, at ullamcorper 
ligula varius id. Proin placerat tortor erat, at luctus risus tincidunt sed. Nunc at lorem vel lorem blandit commodo in vitae elit. Nam dapibus elit ac metus molestie volutpat. Cras consectetur tortor lobortis, faucibus ligula a, eleifend 
neque. Maecenas lobortis eu tortor nec scelerisque. Pellentesque quis rhoncus felis. 
Proin vehicula luctus massa ac auctor. Aenean consequat odio in eros lacinia, nec auctor arcu molestie. Aliquam non leo justo. Suspendisse ullamcorper, est ac pharetra bibendum, eros nulla lobortis urna, vel interdum lacus magna nec sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus leo erat, sit amet tempus dui bibendum 
non. Vivamus ac rutrum ante. 
Nunc id lectus at tortor placerat pretium.
</p>
  </div>
  <div className='text-center mt-[110px]'>
<Link to='/contact' className='bg-[#000] text-[20px] text-[#fff] p-[10px] px-[70px] hover:bg-[#8B8B8B] '>HELP & CONTACT</Link>
</div>
    </div>
    <Footer />
    </>
  )
}

export default Payments
