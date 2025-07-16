import Header from "/src/components/common/header";
import "/src/App.css";
import Footer from "/src/components/common/footer";
import Hero from "./sections/Hero";
import WhyUsSection from "./sections/WhyUs";
import InterestSelectionSection from "./sections/InterestSelection";
import HowToStart from "./sections/how-to-start";
import JoinHostess from "./sections/Join-hostess";
import GetStartedBanner from "../home/GetStartedBanner";
function Hostess() {
  return (
    <>
      <Header />

      <Hero />
      <WhyUsSection />
      <InterestSelectionSection />
      <HowToStart />
      <div className="mb-15">
      <GetStartedBanner 
      heading="Join HostessForYou"
      content="A job you can do in your free time that allows you to meet new people and visit new places. Accompany clients and offer your company in exchange for a fee agreed directly with them."
      btnText="Create Your Profile For Free"
      />
      </div>
      {/* <JoinHostess /> */}
      <Footer />
    </>
  );
}

export default Hostess;
