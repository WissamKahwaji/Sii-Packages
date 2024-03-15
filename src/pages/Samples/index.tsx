import { IdParams } from "./type";
import { useLocation, useParams } from "react-router-dom";
import { useGetCategoryPackagesQuery } from "../../apis/packages/queries";
import { SampleInfo, Samples } from "../../apis/packages/type";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ContactSection from "../../components/home/ContactSection";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
const SamplesPage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { id } = useParams<IdParams>();
  const RESPONSIVE = {
    xxl: {
      breakpoint: { max: 5000, min: 1536 },
      items: 1,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 1,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 1,
    },
    md: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    sm: {
      breakpoint: { max: 768, min: 640 },
      items: 1,
    },
    xs: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const { state } = useLocation();
  const {
    data: category,
    isLoading,
    isError,
  } = useGetCategoryPackagesQuery(id);
  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  return (
    <div className="relative w-full bg-gray-100 pt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-semibold font-header mb-5 text-primary uppercase">
          {category?.hasSubcategories === true
            ? selectedLang === "en"
              ? state.subCategory.name_en
              : state.subCategory.name_ar
            : selectedLang === "en"
            ? category?.name_en
            : category?.name_ar}
        </h2>
      </div>
      {category?.samples.length === 0 ? (
        <div className="flex justify-center items-center my-5">
          <p className="text-center max-w-md mx-auto p-4 bg-yellow-100 text-yellow-800 rounded-md shadow-lg">
            {t("There is not any samples yet")}
          </p>
        </div>
      ) : (
        <div className=" flex flex-col gap-8 py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {category?.name_en === "Websites & Online shops" ? (
            <>
              {category?.samples.map((sample: Samples, index: number) => (
                <div key={index}>
                  <p className="font-header text-base md:text-2xl text-secondary font-semibold uppercase">
                    {selectedLang === "en" ? sample.name : sample.name_ar}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {sample.samples.map((item: SampleInfo, idx: number) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden rounded-md border border-primary hover:shadow-lg cursor-pointer"
                        onClick={() => {
                          if (item.link) {
                            window.open(item.link, "_blank");
                          }
                        }}
                      >
                        <img
                          src={item.img}
                          alt={sample.name}
                          className="w-full h-full object-cover transition-transform transform hover:scale-105"
                        />
                        {item.link && (
                          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                              Visit Website
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : category?.name_en === "Application developing & programming" ? (
            <>
              {category.samples.map((sample: Samples, index: number) => (
                <div key={index}>
                  <p className="font-header text-base md:text-2xl text-secondary font-semibold uppercase">
                    {selectedLang === "en" ? sample.name : sample.name_ar}
                  </p>
                  <div className="mt-8">
                    <Carousel
                      responsive={RESPONSIVE}
                      infinite
                      autoPlay
                      className=""
                    >
                      {sample.samples.map((item: SampleInfo, idx: number) => (
                        <div
                          key={idx}
                          className="flex flex-col object-fill rounded-md border border-primary hover:shadow-lg md:mx-2 h-[300px] md:h-[600px]"
                        >
                          <img
                            src={item.img}
                            alt={item.link}
                            className="w-full h-[90%] object-contain transition-transform transform hover:scale-105"
                          />
                          {/* <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center"></div> */}
                          {/* {item.link && (
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">
                                Visit Website
                              </span>
                            </div>
                          )} */}
                          <div className="flex flex-row items-start justify-between mx-7 md:mx-40 mt-3 mb-2">
                            <div
                              className="flex flex-row items-center space-x-3  cursor-pointer"
                              onClick={() => {
                                if (item.link) {
                                  window.open(item.link, "_blank");
                                }
                              }}
                            >
                              <FaGooglePlay className="text-black h-8 w-8" />
                              <span className="text-black text-lg font-semibold font-header">
                                google play
                              </span>
                            </div>
                            <div
                              className="flex flex-row items-center space-x-3  cursor-pointer"
                              onClick={() => {
                                if (item.secondLink) {
                                  window.open(item.link, "_blank");
                                }
                              }}
                            >
                              <FaAppStoreIos className="text-black h-8 w-8" />
                              <span className="text-black text-lg font-semibold font-header ">
                                app store
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {category?.hasSubcategories === true ? (
                <>
                  {state.subCategory.samples &&
                    state.subCategory.samples.map(
                      (sample: Samples, index: number) => (
                        <div key={index}>
                          <p className="font-header text-base md:text-2xl text-secondary font-semibold uppercase">
                            {selectedLang === "en"
                              ? sample.name
                              : sample.name_ar}
                          </p>
                          <div className="mt-8">
                            {sample.samples && (
                              <ReactImageGallery
                                items={sample.samples.map(
                                  (item: SampleInfo) => ({
                                    original: item.img,
                                    thumbnail: item.img,
                                    description: sample.name,
                                  })
                                )}
                              />
                            )}
                          </div>
                        </div>
                      )
                    )}
                </>
              ) : (
                <>
                  {category?.samples.map((sample: Samples, index: number) => (
                    <div key={index}>
                      <p className="font-header text-base md:text-2xl text-secondary font-semibold uppercase">
                        {selectedLang === "en" ? sample.name : sample.name_ar}
                      </p>
                      <div className="mt-8">
                        {sample.samples && (
                          <ReactImageGallery
                            items={sample.samples.map((item: SampleInfo) => ({
                              original: item.img,
                              thumbnail: item.img,
                              description: sample.name,
                            }))}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}{" "}
      <ContactSection />
    </div>
  );
};

export default SamplesPage;
