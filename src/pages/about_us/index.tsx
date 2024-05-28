import { useTranslation } from "react-i18next";
import { useGetAboutQuery } from "../../apis/about/queries";
import AboutItem from "../../components/about-us/AboutItem";
import ContactSection from "../../components/home/ContactSection";
import ReactGA from "react-ga4";
import { useEffect } from "react";
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

  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  return (
    <div className="w-full bg-gray-100 pt-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold text-secondary mb-8">
          {t("about")}{" "}
          <span className="text-primary font-header">{t("us")}</span>
        </div>
        <p className="text-sm md:text-lg text-secondary font-body leading-6 md:leading-7 max-w-[700px] mx-1 md:mx-auto text-start">
          {t("bio_sentence")}
        </p>
      </div>
      <div className="mb-4">
        <AboutItem
          ourVision={aboutData?.ourVision ?? ""}
          ourMission={aboutData?.ourMission ?? ""}
          ourValues={aboutData?.ourValues ?? ""}
          ourMission_ar={aboutData?.ourMission_ar ?? ""}
          ourValues_ar={aboutData?.ourValues_ar ?? ""}
          ourVision_ar={aboutData?.ourVision_ar ?? ""}
        />
      </div>
      <ContactSection />
    </div>
  );
};

export default AboutUs;
