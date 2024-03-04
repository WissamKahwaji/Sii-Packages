import { useTranslation } from "react-i18next";

export type AboutProps = {
  ourVision: string;
  ourMission: string;
  ourValues: string;
  ourVision_ar: string;
  ourMission_ar: string;
  ourValues_ar: string;
};

const AboutItem = (props: AboutProps) => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto  w-full md:w-3/4">
      <div className="lg:border-r-2 border-primary flex flex-col py-6 md:px-7 justify-start items-center   transition duration-300 ease-in-out transform hover:-translate-y-1">
        <p className="text-secondary font-bold font-header text-lg mb-5">
          {t("our_vision")}
        </p>
        <p className="text-gray-900 font-body text-lg text-start mx-2 md:mx-0">
          {selectedLang == "en" ? props.ourVision : props.ourVision_ar}
        </p>
      </div>
      <div className="lg:border-r-2 border-primary flex flex-col py-6 md:px-7 justify-start items-center   transition duration-300 ease-in-out transform hover:-translate-y-1">
        <p className="text-secondary font-bold font-header text-lg mb-5">
          {t("our_mission")}
        </p>
        <p className="text-gray-900 font-body text-lg text-start mx-2 md:mx-0">
          {selectedLang == "en" ? props.ourMission : props.ourMission_ar}
        </p>
      </div>
      <div className="lg:border-r-2 border-primary flex flex-col py-6 md:px-7 justify-start items-center   transition duration-300 ease-in-out transform hover:-translate-y-1">
        <p className="text-secondary font-bold font-header text-lg mb-5">
          {t("our_values")}
        </p>
        <p className="text-gray-900 font-body text-lg text-start mx-2 md:mx-0">
          {selectedLang == "en" ? props.ourValues : props.ourValues_ar}
        </p>
      </div>
    </div>
  );
};

export default AboutItem;
