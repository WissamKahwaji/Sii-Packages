import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OurProjectSec = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-secondary">
          {selectedLang === "en" ? (
            <>
              {t("our")}{" "}
              <span className="text-primary font-header">{t("projects")}</span>
            </>
          ) : (
            <>
              <span className="text-primary font-header">
                {t("our_projects")}
              </span>
            </>
          )}
        </div>
        <p className="md:text-lg text-secondary font-body leading-7 max-w-[700px] mx-4 md:mx-auto text-start">
          {t("services_desc")}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 md:gap-x-4">
          {categories &&
            categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() =>
                  navigate(`/our-projects/${category._id}/samples/`)
                }
                className="flex flex-col justify-start items-center bg-slate-200 w-full p-4 rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 mb-3"
              >
                <p className="font-header text-sm md:text-base text-secondary font-semibold uppercase mb-3">
                  {selectedLang === "en" ? category.name_en : category.name_ar}
                </p>
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.293 5.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 8.586l3.293-3.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-primary">
                    {t("click_to_view_samples")}
                  </span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OurProjectSec;
