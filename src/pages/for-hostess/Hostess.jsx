import Header from "/src/components/common/header";
import "/src/App.css";
import Footer from "/src/components/common/footer";
import Hero from "./sections/Hero";
import WhyUsSection from "./sections/WhyUs";
import InterestSelectionSection from "./sections/InterestSelection";
function Hostess() {
  return (
    <>
      <Header />

      <Hero />
      <WhyUsSection />
      <InterestSelectionSection />
      <Footer />
    </>
  );
}

export default Hostess;
