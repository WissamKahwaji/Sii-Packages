import BioSection from "../../components/home/BioSection";
import OurServices from "../../components/home/OurServices";
import ContactSection from "../../components/home/ContactSection";
import { useRef } from "react";
import AboutSection from "../../components/home/AboutSection";

const Home = () => {
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
