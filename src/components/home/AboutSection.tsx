import { useTranslation } from "react-i18next";
import { useGetAboutQuery } from "../../apis/about/queries";
import AboutItem from "../about-us/AboutItem";

const AboutSection = () => {
  const { data: aboutData, isLoading, isError } = useGetAboutQuery();
  const { t } = useTranslation();
  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  return (
    <section className="bg-gray-100 md:block w-full py-8">
      <div className="text-center">
        <div className="sm:text-3xl hidden text-2xl font-bold text-secondary mb-8">
          {t("about")}{" "}
          <span className="text-primary font-header">{t("us")}</span>
        </div>
        <AboutItem
          ourVision={aboutData?.ourVision ?? ""}
          ourMission={aboutData?.ourMission ?? ""}
          ourValues={aboutData?.ourValues ?? ""}
          ourVision_ar={aboutData?.ourVision_ar ?? ""}
          ourMission_ar={aboutData?.ourMission_ar ?? ""}
          ourValues_ar={aboutData?.ourValues_ar ?? ""}
          ourGoals={aboutData?.ourGoals ?? ""}
          ourGoals_ar={aboutData?.ourGoals_ar ?? ""}
        />
      </div>
    </section>
  );
};

export default AboutSection;
