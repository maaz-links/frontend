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
      heading="Iscriviti a HostessForYou"
      content="Un’opportunità pensata per chi desidera valorizzare il proprio tempo, creare connessioni e vivere esperienze nuove, con libertà, stile e pieno controllo sulle condizioni."
      btnText="Crea il tuo profilo: è gratis!"
      />
      </div>
      {/* <JoinHostess /> */}
      <Footer />
    </>
  );
}

export default Hostess;
