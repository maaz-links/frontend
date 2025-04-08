import  React from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import ModelImage from '/src/assets/images/model-img.jpg'
import JoinUs from '../components/common/joinus'
function Search() {
  

  return (
    <>
    <Header />
    <div className='max-w-[1200px] m-auto mt-[43px] mb-[50px] px-[15px]'>
    <div className='flex gap-x-[15px] md:gap-x-[40px]'>
<div className='selection w-[100%] md:w-[90%]'>
<select className="w-full bg-[#AEAEAE] h-[46px] p-[10px] focus:outline-0">
   <option>City/Province</option> 
</select>
</div>
<div className='filter md:w-[10%] '>
<button
         
        className="flex cursor-pointer items-center gap-2 w-full bg-[#AEAEAE] h-[46px] p-[10px] focus:outline-0"
      >
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.158691" y1="1.5" x2="21.2978" y2="1.5" stroke="black"/>
<line x1="0.158691" y1="6.5" x2="21.2978" y2="6.5" stroke="black"/>
<line x1="0.158691" y1="11.5" x2="21.2978" y2="11.5" stroke="black"/>
<ellipse cx="17.4042" cy="1.5" rx="1.66887" ry="1.5" fill="black"/>
<ellipse cx="5.16497" cy="6.5" rx="1.66887" ry="1.5" fill="black"/>
<ellipse cx="12.954" cy="11.5" rx="1.66887" ry="1.5" fill="#010101"/>
</svg>


        Filter
      </button>
</div>
    </div>
  <div className='search-results'>
<div className='grid grid-cols-2 md:grid-cols-5 gap-[15px] md:gap-x-[30px] mt-[40px] md:mt-[112px]'>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
<div className='result-box'>
<div className='result-box-img'>
<img src={ModelImage} />
</div>
<div className='result-content'>
<h4>UserName</h4>
<p>City</p>
</div>
</div>
</div>
  </div>
    </div>
    
   
    
    <Footer />
    </>
  )
}

export default Search
