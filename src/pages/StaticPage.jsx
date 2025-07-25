import  React, { useEffect, useState } from 'react'
import Header from '/src/components/common/header'
import Footer from '/src/components/common/footer'
import { Outlet, Link } from "react-router-dom";
import axiosClient from '../../axios-client';
import { ClipLoader } from 'react-spinners';

function StaticPage({slug}) {
  
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [initialLoad, setInitialLoad] = useState(false);
  useEffect(() => {
      const fetchPageData = async () => {
          try {
            setInitialLoad(true)
              var url = '';
              if (slug == 'terms') {
                  url = 'my-terms'
                  setTitle('Termini e Condizioni')
              } 
              else if(slug == 'privacy'){
                  url = 'my-privacy'
                  setTitle('Privacy Policy')
              } 
              else if(slug == 'cookies'){
                url = 'my-cookies'
                setTitle('Informazioni sui Cookie')
              } 
              else if(slug == 'payments'){
                url = 'my-credits'
                setTitle('Crediti e Pagamenti')
              } 
              else {
                  return
              }
              const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/${url}`);
              setText(response.data.page.content);

          } catch (error) {
              console.error('Error fetching data:', error);
              // Optionally, handle the error state
          } finally {
            setInitialLoad(false); // Always stop loading
          }
      };

      fetchPageData();  // Call the function to fetch the data
  }, [slug])

  return (
    <>
    <Header />
    <div className='max-w-[1200px] m-auto mt-[50px] mb-[50px] md:mt-[126px] md:mb-[144px] px-[25px]'>
    {initialLoad && (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
        <ClipLoader color="black" size={50} />
      </div>
    )}
    <h1 className="text-[36px]"><strong>{title}</strong></h1>
    {text && !initialLoad && <div className='terms-text text-[15px] mt-[20px]'>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>}
    </div>
    <Footer />
    </>
  )
}

export default StaticPage
