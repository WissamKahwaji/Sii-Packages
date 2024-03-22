import React from "react";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { Category, SampleInfo } from "../../apis/packages/type";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

const OurProjects: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  // const RESPONSIVE = {
  //   xxl: { breakpoint: { max: 5000, min: 1536 }, items: 2 },
  //   xl: { breakpoint: { max: 1536, min: 1280 }, items: 2 },
  //   lg: { breakpoint: { max: 1280, min: 1024 }, items: 2 },
  //   md: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  //   sm: { breakpoint: { max: 768, min: 640 }, items: 1 },
  //   xs: { breakpoint: { max: 640, min: 0 }, items: 1 },
  // };

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
      <div className="flex flex-col gap-8 py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {categories &&
          categories.map((category, index) => (
            <CategorySection key={index} category={category} />
          ))}
      </div>
    </div>
  );
};

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;

  const renderCategoryContent = () => {
    if (
      category.name_en === "Websites & Online shops" ||
      category.name_ar === "المواقع والمتاجر الإلكترونية" ||
      category.name_en === "Photography and videography" ||
      category.name_ar === "التصوير الفوتوغرافي والفيديو"
    ) {
      return (
        <Carousel
          responsive={{
            xxl: { breakpoint: { max: 5000, min: 1536 }, items: 2 },
            xl: { breakpoint: { max: 1536, min: 1280 }, items: 2 },
            lg: { breakpoint: { max: 1280, min: 1024 }, items: 2 },
            md: { breakpoint: { max: 1024, min: 768 }, items: 2 },
            sm: { breakpoint: { max: 768, min: 640 }, items: 1 },
            xs: { breakpoint: { max: 640, min: 0 }, items: 1 },
          }}
          infinite
          autoPlay
          className=""
        >
          {category.samples.map((sample, idx) =>
            sample.samples.map(item => (
              <WebsiteCarouselItem key={idx} sample={item} />
            ))
          )}
        </Carousel>
      );
    } else if (
      category.name_en === "Application developing & programming" ||
      category.name_ar === "تطوير وبرمجة التطبيقات"
    ) {
      return (
        <Carousel
          responsive={{
            xxl: { breakpoint: { max: 5000, min: 1536 }, items: 2 },
            xl: { breakpoint: { max: 1536, min: 1280 }, items: 2 },
            lg: { breakpoint: { max: 1280, min: 1024 }, items: 2 },
            md: { breakpoint: { max: 1024, min: 768 }, items: 2 },
            sm: { breakpoint: { max: 768, min: 640 }, items: 1 },
            xs: { breakpoint: { max: 640, min: 0 }, items: 1 },
          }}
          infinite
          autoPlay
          className="pb-4"
        >
          {category.samples.map((sample, idx) =>
            sample.samples.map(item => (
              <AppCarouselItem key={idx} sample={item} />
            ))
          )}
        </Carousel>
      );
    } else {
      return (
        <div>
          {category.samples.map((sample, idx) => (
            <div key={idx} className="mb-8 md:mb-20">
              <ReactImageGallery
                items={sample.samples.map(item => ({
                  original: item.img,
                  thumbnail: item.img,
                  description: sample.name,
                }))}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="my-5">
      <div className="bg-slate-200 w-fit p-4 rounded-xl shadow-lg mb-3">
        <p
          style={{ direction: "ltr" }}
          className="font-header text-sm md:text-2xl text-secondary font-semibold uppercase"
        >
          {selectedLang === "en" ? category.name_en : category.name_ar}
        </p>
      </div>
      <div className="flex flex-col">{renderCategoryContent()}</div>
    </div>
  );
};

interface CarouselItemProps {
  sample: SampleInfo;
}

const WebsiteCarouselItem: React.FC<CarouselItemProps> = ({ sample }) => {
  return (
    <div className="relative overflow-hidden object-fill rounded-md border border-primary hover:shadow-lg cursor-pointer md:mx-2 h-[240px] md:h-[370px]">
      <img
        src={sample.img}
        alt={sample.link}
        className="w-full h-full object-fill transition-transform transform hover:scale-105"
        onClick={() => {
          if (sample.link) {
            window.open(sample.link, "_blank");
          }
        }}
      />
      {sample.link && (
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            Visit Website
          </span>
        </div>
      )}
    </div>
  );
};

const AppCarouselItem: React.FC<CarouselItemProps> = ({ sample }) => {
  return (
    <div className="flex flex-col object-fill rounded-md border border-primary hover:shadow-lg md:mx-2 h-[340px] md:h-[450px]">
      <img
        src={sample.img}
        alt={sample.link}
        className="w-full h-[85%] object-contain transition-transform transform hover:scale-105"
      />
      <div className="flex flex-row items-start justify-between mx-3 mt-3 mb-2">
        <div
          className="flex flex-row items-center space-x-2 md:space-x-3 cursor-pointer bg-gray-200 rounded-md p-2 hover:bg-gray-300 border border-gray-300 shadow-md"
          onClick={() => {
            if (sample.link) {
              window.open(sample.link, "_blank");
            }
          }}
        >
          <FaGooglePlay className="text-black h-5 w-5 md:h-8 md:w-8" />
          <span className="text-black text-sm md:text-lg font-semibold font-header capitalize">
            google play
          </span>
        </div>
        <div
          className="flex flex-row items-center space-x-2 md:space-x-3 cursor-pointer bg-gray-200 rounded-md py-2 px-5 md:py-2 md:px-5 hover:bg-gray-300 border border-gray-300 shadow-md"
          onClick={() => {
            if (sample.secondLink) {
              window.open(sample.secondLink, "_blank");
            }
          }}
        >
          <FaAppStoreIos className="text-black h-5 w-5 md:h-8 md:w-8" />
          <span className="text-black text-sm md:text-lg font-semibold font-header capitalize">
            app store
          </span>
        </div>
      </div>
    </div>
  );
};

export default OurProjects;
