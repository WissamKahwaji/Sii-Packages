import React from "react";
import { Package } from "../../apis/packages/type";
import { formatPrice } from "../../utils";
import { useTranslation } from "react-i18next";

interface PackageCardProps {
  item: Package;

  setShowModal: React.MouseEventHandler<HTMLButtonElement> | undefined;
  index: number;
}

const PackageCard: React.FC<PackageCardProps> = ({
  item,
  setShowModal,
  index,
}) => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  return (
    <div
      key={index}
      className="relative mt-6 rounded-lg mx-4 h-full bg-white shadow-lg transform transition-transform hover:scale-105 ease-in-out duration-700 border border-gray-300 hover:border-primary"
    >
      {item.isPopular && (
        <div className="absolute capitalize top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary px-7 py-1 text-sm font-semibold tracking-wide text-white rounded-full shadow-md">
          {t("most_popular")}
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl h-[30px] text-center font-semibold font-header text-secondary mb-8 md:mb-2">
          {selectedLang === "en" ? item.title_en : item.title_ar}
        </h3>
        <div className="h-4">
          <p className="text-base md:text-lg text-gray-500 text-center font-body capitalize">
            {selectedLang === "en" ? item.subTitle_en : item.subTitle_ar}
          </p>
        </div>
        {item.price && (
          <div className="mt-6 w-full   bg-slate-50   rounded-lg p-6 ">
            {selectedLang === "en" ? (
              <p className="text-xl text-center font-semibold text-gray-900 ">
                {item.priceTitle_en && (
                  <span className="text-secondary text-sm">
                    {item.priceTitle_en}
                  </span>
                )}
                <span className="m-1 text-3xl font-bold font-body text-primary">
                  {item.price && formatPrice(item.price)}
                </span>{" "}
                <span className="text-secondary">{t("AED")}</span>
                {item.isMonthly && (
                  <span className="text-secondary text-sm">
                    /{t("monthly")}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-xl text-center font-semibold text-gray-900 ">
                {item.priceTitle_ar && (
                  <span className="text-secondary text-sm">
                    {item.priceTitle_ar}
                  </span>
                )}
                <span className="m-1 text-3xl font-bold font-body text-primary">
                  {item.price && formatPrice(item.price)}
                </span>{" "}
                <span className="text-secondary">{t("AED")}</span>
                {item.isMonthly && (
                  <span className="text-secondary text-sm">
                    /{t("monthly")}
                  </span>
                )}
              </p>
            )}
          </div>
        )}
        <button
          onClick={setShowModal}
          className="mt-6 w-full border-secondary bg-gray-50 border border-gray-300   p-6 hover:border-primary hover:bg-secondary transition-colors duration-300"
        >
          <p className="text-xl font-semibold   text-secondPrimary">
            {t("choose_the_package")}
          </p>
        </button>
        <ul className="mt-6 space-y-4">
          {item.features &&
            item.features.map((feature, index) =>
              selectedLang === "en" ? (
                <>
                  <li
                    key={index}
                    className="flex flex-row justify-start items-center text-sm leading-6 text-gray-700"
                  >
                    <svg
                      viewBox="0 0 665.8 1000"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="shrink-0 h-5 w-5 fill-current text-primary"
                    >
                      <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
                    </svg>
                    <span className=" ml-3 font-body text-gray-800">
                      {selectedLang === "en"
                        ? feature.title_en
                        : feature.tital_ar}
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li
                    key={index}
                    className="flex flex-row justify-end  items-center text-sm leading-6 text-gray-700"
                  >
                    <span className="text-xs md:text-base ml-3 text-end font-body text-gray-800">
                      {selectedLang === "en"
                        ? feature.title_en
                        : feature.tital_ar}
                    </span>
                    <svg
                      viewBox="0 0 665.8 1000"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="shrink-0 h-5 w-5 fill-current text-green-500"
                    >
                      <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
                    </svg>
                  </li>
                </>
              )
            )}
        </ul>
      </div>
    </div>
  );
};

export default PackageCard;
