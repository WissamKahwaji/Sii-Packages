import { useState } from "react";
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
  const [showFullBriefVision, setShowFullBriefVision] = useState(false);
  const [showFullBriefMission, setShowFullBriefMission] = useState(false);
  const [showFullBriefValues, setShowFullBriefValues] = useState(false);

  const toggleBriefVision = () => {
    setShowFullBriefVision(!showFullBriefVision);
  };
  const toggleBriefMission = () => {
    setShowFullBriefMission(!showFullBriefMission);
  };
  const toggleBriefValues = () => {
    setShowFullBriefValues(!showFullBriefValues);
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-auto  w-full md:w-3/4">
      <div className="lg:border-r-2 border-primary flex flex-col py-6 md:px-7 justify-start items-center   transition duration-300 ease-in-out transform hover:-translate-y-1">
        <p className="text-secondary font-bold font-header text-lg mb-5">
          {t("our_vision")}
        </p>
        <div className="text-gray-900 font-body text-lg text-start mx-2 md:mx-0">
          {selectedLang == "en"
            ? showFullBriefVision
              ? props.ourVision
              : props.ourVision.slice(0, 100)
            : showFullBriefVision
            ? props.ourVision_ar
            : props.ourVision_ar.slice(0, 100)}
          {props.ourVision && props.ourVision.length > 100 && (
            <span
              className="cursor-pointer text-primary"
              onClick={toggleBriefVision}
            >
              {showFullBriefVision ? t("show_less") : t("show_more")}
            </span>
          )}
        </div>
      </div>
      <div className="lg:border-r-2 border-primary flex flex-col py-6 md:px-7 justify-start items-center   transition duration-300 ease-in-out transform hover:-translate-y-1">
        <p className="text-secondary font-bold font-header text-lg mb-5">
          {t("our_mission")}
        </p>
        <div className="text-gray-900 font-body text-lg text-start mx-2 md:mx-0">
          {selectedLang == "en"
            ? showFullBriefMission
              ? props.ourMission
              : props.ourMission.slice(0, 100)
            : showFullBriefMission
            ? props.ourMission_ar
            : props.ourMission_ar.slice(0, 100)}
          {props.ourMission && props.ourMission.length > 100 && (
            <span
              className="cursor-pointer text-primary"
              onClick={toggleBriefMission}
            >
              {showFullBriefMission ? t("show_less") : t("show_more")}
            </span>
          )}
        </div>
      </div>
      <div className="lg:border-r-2 border-primary flex flex-col py-6 md:px-7 justify-start items-center   transition duration-300 ease-in-out transform hover:-translate-y-1">
        <p className="text-secondary font-bold font-header text-lg mb-5">
          {t("our_values")}
        </p>
        <div className="text-gray-900 font-body text-lg text-start mx-2 md:mx-0">
          {selectedLang == "en"
            ? showFullBriefValues
              ? props.ourValues
              : props.ourValues.slice(0, 100)
            : showFullBriefValues
            ? props.ourValues_ar
            : props.ourValues_ar.slice(0, 100)}
          {props.ourValues && props.ourValues.length > 100 && (
            <span
              className="cursor-pointer text-primary"
              onClick={toggleBriefValues}
            >
              {showFullBriefValues ? t("show_less") : t("show_more")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
