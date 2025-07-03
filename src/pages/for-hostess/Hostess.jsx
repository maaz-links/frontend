import Header from "/src/components/common/header";
import "/src/App.css";
import Footer from "/src/components/common/footer";
import Hero from "./sections/Hero";
import WhyUsSection from "./sections/WhyUs";
//
function Hostess() {
  return (
    <>
      <Header />

      <Hero />
      <WhyUsSection />

      <Footer />
    </>
  );
}

export default Hostess;
