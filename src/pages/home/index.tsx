import BioSection from "../../components/home/BioSection";
import OurServices from "../../components/home/OurServices";
import ContactSection from "../../components/home/ContactSection";
import { useEffect, useRef } from "react";
import AboutSection from "../../components/home/AboutSection";
import ReactGA from "react-ga4";
const Home = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
  }, []);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <BioSection scrollToContact={scrollToContact} />
      <AboutSection />
      <OurServices />
      <div ref={contactSectionRef}>
        <ContactSection />
      </div>
    </div>
  );
};

export default Home;
