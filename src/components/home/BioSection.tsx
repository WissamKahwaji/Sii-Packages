import React from "react";
import logo from "../../assets/sii_logo.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface BioSectionProps {
  scrollToContact: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
const BioSection: React.FC<BioSectionProps> = ({ scrollToContact }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-100 w-full">
      <div className="max-w-[1400px] w-[89%] m-auto grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
        <div className="mt-20 md:mt-0 text-center md:text-start">
          <h2 className="text-secondary text-2xl font-bold font-header drop-shadow-lg capitalize">
            {t("welcom_to")}
          </h2>
          <h1 className="capitalize text-primary font-semibold font-header text-4xl drop-shadow-lg mb-3 ">
            Sii advertising & media
          </h1>
          <p className="text-secondary font-body text-start text-sm md:text-base mx-1 md:mx-0">
            {t("bio_sentence")}
          </p>
          <div className="flex gap-4 lg:gap-4 mt-6 justify-center md:justify-start">
            <Link
              to={`/our-projects`}
              className="uppercase duration-500 hover:bg-secondary/80 py-3 px-6 rounded text-white shadow-lg drop-shadow bg-primary"
            >
              {t("our_projects")}
            </Link>
            <a
              href="/"
              className="uppercase duration-500 hover:bg-secondary/80 py-3 px-6 rounded text-white shadow-lg drop-shadow bg-primary"
              onClick={e => {
                e.preventDefault();
                scrollToContact(e);
              }}
            >
              {t("get_in_touch")}
            </a>
          </div>
        </div>
        <div className=" w-full hidden md:relative md:flex">
          <img
            src={logo}
            alt="logo"
            className="w-full lg:h-[550px] h-[450px] object-cover "
          />
        </div>
      </div>
    </section>
  );
};

export default BioSection;
