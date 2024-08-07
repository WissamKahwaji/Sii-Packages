import { useTranslation } from "react-i18next";
import { useGetAboutQuery } from "../../apis/about/queries";
import AboutItem from "../../components/about-us/AboutItem";
import ContactSection from "../../components/home/ContactSection";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import aboutImg from "../../assets/aboutImg.png";
import LoadingPage from "../loadingPage/LoadingPage";
const AboutUs = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/about-us",
      title: "About-us Page",
    });
  }, []);
  const { t } = useTranslation();
  const { data: aboutData, isLoading, isError } = useGetAboutQuery();

  if (isLoading) return <LoadingPage />;
  if (isError) return <div></div>;

  return (
    <div className="w-full bg-gray-100 pt-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold text-secondary mb-8">
          {t("about")}{" "}
          <span className="text-primary font-header">{t("us")}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-4 w-[90%] md:w-3/4 mx-auto md:mt-16 ">
          <img src={aboutImg} alt="" />
          <p className="text-sm md:text-lg text-secondary font-body leading-6 md:leading-7 max-w-[700px] mx-1 md:mx-auto text-start">
            {t("bio_sentence")}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <AboutItem
          ourVision={aboutData?.ourVision ?? ""}
          ourMission={aboutData?.ourMission ?? ""}
          ourValues={aboutData?.ourValues ?? ""}
          ourMission_ar={aboutData?.ourMission_ar ?? ""}
          ourValues_ar={aboutData?.ourValues_ar ?? ""}
          ourVision_ar={aboutData?.ourVision_ar ?? ""}
          ourGoals={aboutData?.ourGoals ?? ""}
          ourGoals_ar={aboutData?.ourGoals_ar ?? ""}
        />
      </div>
      <ContactSection />
    </div>
  );
};

export default AboutUs;
