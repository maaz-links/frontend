import  React, { useEffect, useState } from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { Outlet, Link } from "react-router-dom";
import axiosClient from '../../axios-client';

function StaticPage({slug}) {
  
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  useEffect(() => {
      const fetchPageData = async () => {
          try {
              var url = '';
              if (slug == 'terms') {
                  url = 'my-terms'
                  setTitle('Terms and Conditions')
              } 
              else if(slug == 'privacy'){
                  url = 'my-privacy'
                  setTitle('Privacy Policy')
              } 
              else if(slug == 'cookies'){
                url = 'my-cookies'
                setTitle('Cookies Info')
              } 
              else if(slug == 'payments'){
                url = 'my-credits'
                setTitle('Credits And Payment')
              } 
              else {
                  return
              }
              const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/${url}`);
              setText(response.data.page.content);

          } catch (error) {
              console.error('Error fetching data:', error);
              // Optionally, handle the error state
          }
      };

      fetchPageData();  // Call the function to fetch the data
  }, [slug])

  return (
    <>
    <Header />
    <div className='max-w-[1200px] m-auto mt-[50px] mb-[50px] md:mt-[126px] md:mb-[144px]'>
    <h1 className="text-center text-[32px] font-[400] uppercase">{title}</h1>
  <div className='terms-text text-center text-[24px] mt-[50px]'>
  <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>
  <div className='text-center mt-[110px]'>
<Link to='/contact' className='bg-[#E91E63] text-[20px] text-[#fff] p-[10px] px-[70px] hover:bg-[#F8BBD0] '>HELP & CONTACT</Link>
</div>
    </div>
    <Footer />
    </>
  )
}

export default StaticPage
