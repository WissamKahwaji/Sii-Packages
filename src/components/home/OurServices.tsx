import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Lottie from "lottie-react";
import serviceAnimation from "../../assets/our_services3.json";
import LoadingPage from "../../pages/loadingPage/LoadingPage";

const OurServices = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleBrief = (
    categoryId: string,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  if (isLoading) return <LoadingPage />;
  if (isError) return <div></div>;
  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-secondary">
          <>
            {selectedLang === "en" ? (
              <>
                {t("our")}{" "}
                <span className="text-primary font-header">
                  {t("services")}
                </span>
              </>
            ) : (
              <>
                <span className="text-primary font-header">
                  {t("our_services")}
                </span>
              </>
            )}
          </>
        </div>
        <p className=" md:flex  text-secondary font-body leading-7 max-w-[700px]   text-start  text-sm md:text-lg mx-5 md:mx-auto">
          {t("services_desc")}
        </p>
      </div>
      <div className="">
        <Lottie
          animationData={serviceAnimation}
          className="w-full h-[300px] md:h-[400px] mb-12"
        />
      </div>
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-y-3"
        >
          {categories &&
            categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative max-w-md rounded h-auto pb-6 bg-transparent border-2 border-primary hover:border-secondary shadow-lg  mx-4 mb-8 md:mb-8 hover:shadow-xl transform transition duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex flex-col items-center justify-start p-3 h-full w-full">
                    <div className="font-bold font-header flex  text-gray-900 text-base md:text-xl mb-5">
                      {selectedLang === "en"
                        ? category.name_en
                        : category.name_ar}
                    </div>
                    <div className="text-gray-600 whitespace-pre-wrap text-start font-serif text-sm">
                      {expandedDescriptions[category._id!] ||
                      !category.description_en
                        ? selectedLang === "en"
                          ? category.description_en
                          : category.description_ar
                        : selectedLang === "en"
                        ? category.description_en.slice(0, 87)
                        : category.description_ar.slice(0, 87)}
                      {category.description_en &&
                        category.description_en.length > 100 && (
                          <span
                            className="mx-2 cursor-pointer text-primary"
                            onClick={event => toggleBrief(category._id!, event)}
                          >
                            {expandedDescriptions[category._id!]
                              ? t("show_less")
                              : t("show_more")}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
                <Link
                  to={`pricing/${category._id}`}
                  className="absolute bottom-0 left-0 translate-y-4 translate-x-1/2 w-1/2 bg-primary text-secondary font-mono text-center py-2 rounded-lg border border-secondary shadow-lg hover:text-primary hover:bg-secondary hover:border-secondary hover:shadow-xl"
                >
                  {t("discover_packages")}
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
