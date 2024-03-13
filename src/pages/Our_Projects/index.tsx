import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { SampleInfo } from "../../apis/packages/type";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

const OurProjects = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const RESPONSIVE = {
    xxl: {
      breakpoint: { max: 5000, min: 1536 },
      items: 2,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 2,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 2,
    },
    md: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const groupedSamples: { [key: string]: SampleInfo[] } = {};
  categories?.forEach(category => {
    const categoryName =
      selectedLang === "en" ? category.name_en : category.name_ar;
    category.samples.forEach(sample => {
      if (!groupedSamples[categoryName]) {
        groupedSamples[categoryName] = [];
      }
      groupedSamples[categoryName].push(...sample.samples);
    });
  });

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="text-center mb-8">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-secondary">
          <>
            {selectedLang === "en" ? (
              <>
                {t("our")}{" "}
                <span className="text-primary font-header">
                  {t("projects")}
                </span>
              </>
            ) : (
              <>
                <span className="text-primary font-header">
                  {t("our_projects")}
                </span>
              </>
            )}
          </>
        </div>
        <p className=" md:text-lg text-secondary font-body leading-7 max-w-[700px] mx-4 md:mx-auto text-start">
          {t("services_desc")}
        </p>
      </div>
      <div className="flex flex-col gap-8 py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {Object.entries(groupedSamples).map(
          ([categoryName, samples], index) => (
            <div key={index} className="my-5">
              <div className="bg-slate-200 w-fit p-4 rounded-xl shadow-lg mb-3">
                <p
                  style={{ direction: "ltr" }}
                  className="font-header text-sm md:text-2xl text-secondary font-semibold uppercase"
                >
                  {categoryName}
                </p>
              </div>
              <div className="flex flex-col">
                {categoryName === "Websites & Online shops" ||
                categoryName === "المواقع والمتاجر الإلكترونية" ||
                categoryName === "Photography and videography" ||
                categoryName === "التصوير الفوتوغرافي والفيديو" ? (
                  <Carousel
                    responsive={RESPONSIVE}
                    infinite
                    autoPlay
                    className=""
                  >
                    {samples.map((item: SampleInfo, idx: number) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden object-fill rounded-md border border-primary hover:shadow-lg cursor-pointer md:mx-2 h-[240px] md:h-[370px]"
                        onClick={() => {
                          if (item.link) {
                            window.open(item.link, "_blank");
                          }
                        }}
                      >
                        <img
                          src={item.img}
                          alt={categoryName}
                          className="w-full h-full object-fill transition-transform transform hover:scale-105"
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
                  </Carousel>
                ) : categoryName === "Application developing & programming" ||
                  categoryName === "تطوير وبرمجة التطبيقات" ? (
                  <Carousel
                    responsive={RESPONSIVE}
                    infinite
                    autoPlay
                    className=""
                  >
                    {samples.map((item: SampleInfo, idx: number) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden object-fill  rounded-md border border-primary hover:shadow-lg md:mx-2 h-[240px] md:h-[350px]"
                      >
                        <img
                          src={item.img}
                          alt={item.link}
                          className="w-full h-full object-contain md:object-cover transition-transform transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex flex-col items-start space-y-10">
                            <div
                              className="flex flex-row items-center space-x-3  cursor-pointer"
                              onClick={() => {
                                if (item.link) {
                                  window.open(item.link, "_blank");
                                }
                              }}
                            >
                              <FaGooglePlay className="text-white h-8 w-8" />
                              <span className="text-white text-lg font-semibold font-header">
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
                              <FaAppStoreIos className="text-white h-8 w-8" />
                              <span className="text-white text-lg font-semibold font-header ">
                                app store
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* {item.link && (
                          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                              Visit Website
                            </span>
                          </div>
                        )} */}
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <>
                    <div className="">
                      {samples && (
                        <ReactImageGallery
                          items={samples.map((item: SampleInfo) => ({
                            original: item.img,
                            thumbnail: item.img,
                            description: categoryName,
                          }))}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OurProjects;
