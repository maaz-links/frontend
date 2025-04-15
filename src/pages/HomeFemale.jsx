import React from 'react'
import Header from '/src/components/common/header'
import '/src/App.css'
import IntroBox from '/src/components/IntroBox'
import Models from '/src/components/Models'
import How_To from '/src/components/How_To'
import Blogs from '/src/components/Blogs'
import Faqs from '/src/components/Faqs'
import Footer from '/src/components/common/footer'
import FemaleHowTo from '../components/FemaleHowTo'


function HomeFemale() {

  return (
    <>
   
     
    <Header />
   <IntroBox />
   <Models />
    <FemaleHowTo />
    <Blogs />
   <Faqs />
   <Footer />
    </>
  )
}

export default HomeFemale
