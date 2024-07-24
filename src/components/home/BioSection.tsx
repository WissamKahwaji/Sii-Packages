import React from "react";
import logo from "../../assets/logo_sii_new_2.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface BioSectionProps {
  scrollToContact: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
const BioSection: React.FC<BioSectionProps> = ({ scrollToContact }) => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
      },
    },
  };
  return (
    <section className="bg-gray-100 w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] w-[89%] m-auto grid md:grid-cols-2 grid-cols-1 gap-10 items-center"
      >
        <div className="mt-20 md:mt-0 text-center md:text-start">
          <h2 className="text-secondary text-2xl font-bold font-header drop-shadow-lg capitalize">
            {t("welcom_to")}
          </h2>
          <h1 className="capitalize text-primary font-semibold font-header text-4xl drop-shadow-sm mb-3 ">
            Sii advertising & media
          </h1>
          <p className="text-secondary font-body text-start text-sm md:text-base mx-1 md:mx-0">
            {t("bio_sentence")}
          </p>
          <div className="flex gap-4 lg:gap-4 mt-6 justify-center md:justify-start">
            <Link
              to={`/our-projects`}
              className="uppercase duration-500 hover:bg-secondary/80 py-3 px-6 rounded text-secondary shadow-lg drop-shadow bg-primary transform  animate-pulse"
            >
              {t("our_projects")}
            </Link>
            <a
              href="/"
              className="uppercase duration-500 hover:bg-secondary/80 py-3 px-6 rounded text-secondary shadow-lg drop-shadow bg-primary  transform  animate-pulse"
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
            className="w-full lg:h-[550px] h-[450px] object-contain "
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BioSection;
