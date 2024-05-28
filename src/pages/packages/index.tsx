import { useEffect } from "react";
import OurServices from "../../components/home/OurServices";
import ReactGA from "react-ga4";

const OurPackages = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/packages",
      title: "packages Page",
    });
  }, []);
  return (
    <div>
      <OurServices />
    </div>
  );
};

export default OurPackages;
