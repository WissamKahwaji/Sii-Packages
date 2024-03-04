import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OurServices = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  if (isLoading) return <div></div>;
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
        <p className="text-lg text-secondary font-body leading-7 max-w-[700px] mx-auto text-start">
          {t("services_desc")}
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3"
        >
          {categories &&
            categories.map((category, index) => (
              <Link to={`pricing/${category._id}`}>
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="max-w-md rounded h-full overflow-hidden bg-transparent border-2 border-secondary hover:border-primary shadow-lg  mx-4 mb-8 hover:shadow-xl transform transition duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-start p-3 h-full w-full">
                    <div className="font-bold font-header flex  text-gray-900 text-xl mb-5">
                      {selectedLang === "en"
                        ? category.name_en
                        : category.name_ar}
                    </div>
                    <p className="text-gray-700 text-base">
                      {selectedLang === "en"
                        ? category.description_en
                        : category.description_ar}
                    </p>
                  </div>
                  {/* <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {service.icon}
                  </span>
                </div> */}
                </motion.div>
              </Link>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
