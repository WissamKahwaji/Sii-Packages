import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryPackagesQuery } from "../../apis/packages/queries";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ContactSection from "../../components/home/ContactSection";
import { IdParams } from "./type";
import baseUrl from "../../constants/domain";
import { useTranslation } from "react-i18next";
import PackageCard from "../../components/pricing/PackageCard";
const Pricing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { id } = useParams<IdParams>();

  const [showModal, setShowModal] = useState<number | null>(null);
  const dotListClass = "absolute top-0  transform  h-10";
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const RESPONSIVE = {
    xxl: {
      breakpoint: { max: 5000, min: 1536 },
      items: 3,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 3,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    mobile: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${baseUrl}/about/request-package`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.firstName + " " + formData.lastName,
          companyName: formData.companyName,
          mobile: formData.mobile,
          subject: `New Inquiry for package from ${formData.firstName} ${formData.lastName}`,
          choosenPackage: `${category?.name_en} ${
            category?.packages[showModal!]?.title_en
          }`,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        alert("Your Inquiry sent successfully!");
      } else {
        console.error("Failed to send email");
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send request. Please try again.");
    }
    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      mobile: "",
    });
    setShowModal(null);
  };

  // const location = useLocation();
  // const { id } = location.state;
  const navigate = useNavigate();
  const {
    data: category,
    isLoading,
    isError,
  } = useGetCategoryPackagesQuery(id);

  const [activeTab, setActiveTab] = useState(category?.subcategories[0]);
  useEffect(() => {
    // Set active tab to the first subcategory when data is loaded
    if (
      category &&
      category.subcategories &&
      category.subcategories.length > 0
    ) {
      setActiveTab(category.subcategories[0]);
    }
  }, [category]);
  if (isLoading) return <div></div>;
  if (isError) return <div></div>;

  return (
    <div className="relative w-full bg-gray-100 pt-8">
      <div className="text-center  mx-5 md:mx-0">
        <h2 className="text-3xl sm:text-4xl font-semibold font-header mb-5 text-primary">
          {selectedLang === "en" ? category?.name_en : category?.name_ar}
        </h2>
        {category?.bio_en && (
          <div>
            <a
              href="#"
              className="block text-base md:text-2xl text-secondary font-body leading-7 mb-5 max-w-[700px] mx-auto bg-white border border-primary rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-400 hover:shadow-lg"
              onClick={e => {
                e.preventDefault();
                scrollToContact();
              }}
            >
              {selectedLang === "en" ? category.bio_en : category.bio_ar}
            </a>
          </div>
        )}
        <p className="text-lg md:text-2xl text-secondary font-body leading-7 max-w-[700px] mx-auto">
          {t("pick_your_perfect_plan")}
        </p>
      </div>
      {category?.hasSubcategories === true ? (
        <>
          <div className="mx-4 my-2 sm:mx-10 sm:my-4 md:mx-20 md:my-6 lg:mx-32 lg:my-8 xl:mx-40 xl:my-10">
            <div className="flex border-b">
              {category.subcategories.map(category => (
                <div
                  key={category._id}
                  className={`flex-grow p-4 cursor-pointer text-center font-serif text-sm md:text-lg uppercase  hover:bg-gray-100 ${
                    activeTab?._id === category._id
                      ? "border-b-2 border-primary text-primary"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  {selectedLang === "en" ? category.name_en : category.name_ar}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="mt-4 md:mx-1">
                {activeTab && activeTab?.packages.length > 0 ? (
                  <Carousel
                    responsive={RESPONSIVE}
                    infinite
                    showDots
                    dotListClass={dotListClass}
                    className="md:mx-10 md:pb-14 pt-16 pb-16 mx-3  relative"
                  >
                    {activeTab?.packages.map((item, index) => (
                      <PackageCard
                        index={index}
                        item={item}
                        setShowModal={() => setShowModal(index)}
                      />
                      // <div
                      //   key={index}
                      //   className="relative mt-6 rounded-lg mx-4 h-full bg-white shadow-lg transform transition-transform hover:scale-105 ease-in-out duration-700 border border-gray-300 hover:border-primary"
                      // >
                      //   {item.isPopular && (
                      //     <div className="absolute capitalize top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary px-7 py-1 text-sm font-semibold tracking-wide text-white rounded-full shadow-md">
                      //       {t("most_popular")}
                      //     </div>
                      //   )}
                      //   <div className="p-8">
                      //     <h3 className="text-xl h-[30px] text-center font-semibold font-header text-secondary mb-8 md:mb-2">
                      //       {selectedLang === "en"
                      //         ? item.title_en
                      //         : item.title_ar}
                      //     </h3>
                      //     <div className="h-4">
                      //       <p className="text-lg text-gray-500 text-center font-body capitalize">
                      //         {selectedLang === "en"
                      //           ? item.subTitle_en
                      //           : item.subTitle_ar}
                      //       </p>
                      //     </div>
                      //     <div className="mt-6 w-full   bg-slate-50   rounded-lg p-6 ">
                      //       <p className="text-xl text-center font-semibold text-gray-900">
                      //         <span className="text-secondary">{t("AED")}</span>
                      //         <span className="m-1 text-3xl font-bold font-body text-primary">
                      //           {formatPrice(item.price)}
                      //         </span>
                      //         {item.isMonthly && (
                      //           <span className="text-secondary text-sm">
                      //             /{t("monthly")}
                      //           </span>
                      //         )}
                      //       </p>
                      //     </div>
                      //     <button
                      //       onClick={() => setShowModal(index)}
                      //       className="mt-6 w-full border-secondary bg-slate-100 border border-gray-300   p-6 hover:border-primary hover:bg-gray-200 transition-colors duration-300"
                      //     >
                      //       <p className="text-xl font-semibold text-primary">
                      //         {t("choose_the_package")}
                      //       </p>
                      //     </button>
                      //     <ul className="mt-6 space-y-4">
                      //       {item.features &&
                      //         item.features.map((feature, index) =>
                      //           selectedLang === "en" ? (
                      //             <>
                      //               <li
                      //                 key={index}
                      //                 className="flex flex-row justify-start items-center text-sm leading-6 text-gray-700"
                      //               >
                      //                 <svg
                      //                   viewBox="0 0 665.8 1000"
                      //                   fill="currentColor"
                      //                   height="1em"
                      //                   width="1em"
                      //                   className="shrink-0 h-5 w-5 fill-current text-green-500"
                      //                 >
                      //                   <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
                      //                 </svg>
                      //                 <span className=" ml-3 font-body text-gray-800">
                      //                   {selectedLang === "en"
                      //                     ? feature.title_en
                      //                     : feature.tital_ar}
                      //                 </span>
                      //               </li>
                      //             </>
                      //           ) : (
                      //             <>
                      //               <li
                      //                 key={index}
                      //                 className="flex flex-row justify-end  items-center text-sm leading-6 text-gray-700"
                      //               >
                      //                 <span className="text-xs md:text-base ml-3 text-end font-body text-gray-800">
                      //                   {selectedLang === "en"
                      //                     ? feature.title_en
                      //                     : feature.tital_ar}
                      //                 </span>
                      //                 <svg
                      //                   viewBox="0 0 665.8 1000"
                      //                   fill="currentColor"
                      //                   height="1em"
                      //                   width="1em"
                      //                   className="shrink-0 h-5 w-5 fill-current text-green-500"
                      //                 >
                      //                   <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
                      //                 </svg>
                      //               </li>
                      //             </>
                      //           )
                      //         )}
                      //     </ul>
                      //   </div>
                      // </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="flex justify-center items-center my-5">
                    <p className="text-center max-w-md mx-auto p-4 bg-yellow-100 text-yellow-800 rounded-md shadow-lg">
                      {t("no_packages")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {category?.packages.length === 0 ? (
            <div className="flex justify-center items-center my-5">
              <p className="text-center max-w-md mx-auto p-4 bg-yellow-100 text-yellow-800 rounded-md shadow-lg">
                {t("no_packages")}
              </p>
            </div>
          ) : (
            // <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            // </div>

            <div className="mt-4 md:mx-20">
              <Carousel
                responsive={RESPONSIVE}
                infinite
                showDots
                dotListClass={dotListClass}
                className="md:mx-10 md:pb-20 pt-16 pb-16 mx-3  relative"
              >
                {category?.packages.map((item, index) => (
                  <PackageCard
                    index={index}
                    item={item}
                    setShowModal={() => setShowModal(index)}
                  />
                  // <div
                  //   key={index}
                  //   className="relative mt-6 rounded-lg mx-4 h-full bg-white shadow-lg transform transition-transform hover:scale-105 ease-in-out duration-700 border border-gray-300 hover:border-primary"
                  // >
                  //   {item.isPopular && (
                  //     <div className="absolute capitalize top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary px-7 py-1 text-sm font-semibold tracking-wide text-white rounded-full shadow-md">
                  //       {t("most_popular")}
                  //     </div>
                  //   )}
                  //   <div className="p-8">
                  //     <h3 className="text-xl h-[30px] text-center font-semibold font-header text-secondary mb-8 md:mb-2">
                  //       {selectedLang === "en" ? item.title_en : item.title_ar}
                  //     </h3>
                  //     <div className="h-4">
                  //       <p className="text-lg text-gray-500 text-center font-body capitalize">
                  //         {selectedLang === "en"
                  //           ? item.subTitle_en
                  //           : item.subTitle_ar}
                  //       </p>
                  //     </div>
                  //     <div className="mt-6 w-full   bg-slate-50   rounded-lg p-6 ">
                  //       <p className="text-xl text-center font-semibold text-gray-900">
                  //         <span className="text-secondary">{t("AED")}</span>
                  //         <span className="m-1 text-3xl font-bold font-body text-primary">
                  //           {formatPrice(item.price)}
                  //         </span>
                  //         {item.isMonthly && (
                  //           <span className="text-secondary text-sm">
                  //             /{t("monthly")}
                  //           </span>
                  //         )}
                  //       </p>
                  //     </div>
                  //     <button
                  //       onClick={() => setShowModal(index)}
                  //       className="mt-6 w-full border-secondary bg-slate-100 border border-gray-300   p-6 hover:border-primary hover:bg-gray-200 transition-colors duration-300"
                  //     >
                  //       <p className="text-xl font-semibold text-primary">
                  //         {t("choose_the_package")}
                  //       </p>
                  //     </button>
                  //     <ul className="mt-6 space-y-4">
                  //       {item.features &&
                  //         item.features.map((feature, index) =>
                  //           selectedLang === "en" ? (
                  //             <>
                  //               <li
                  //                 key={index}
                  //                 className="flex flex-row justify-start items-center text-sm leading-6 text-gray-700"
                  //               >
                  //                 <svg
                  //                   viewBox="0 0 665.8 1000"
                  //                   fill="currentColor"
                  //                   height="1em"
                  //                   width="1em"
                  //                   className="shrink-0 h-5 w-5 fill-current text-green-500"
                  //                 >
                  //                   <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
                  //                 </svg>
                  //                 <span className=" ml-3 font-body text-gray-800">
                  //                   {selectedLang === "en"
                  //                     ? feature.title_en
                  //                     : feature.tital_ar}
                  //                 </span>
                  //               </li>
                  //             </>
                  //           ) : (
                  //             <>
                  //               <li
                  //                 key={index}
                  //                 className="flex flex-row justify-end  items-center text-sm leading-6 text-gray-700"
                  //               >
                  //                 <span className="text-xs md:text-base ml-3 text-end font-body text-gray-800">
                  //                   {selectedLang === "en"
                  //                     ? feature.title_en
                  //                     : feature.tital_ar}
                  //                 </span>
                  //                 <svg
                  //                   viewBox="0 0 665.8 1000"
                  //                   fill="currentColor"
                  //                   height="1em"
                  //                   width="1em"
                  //                   className="shrink-0 h-5 w-5 fill-current text-green-500"
                  //                 >
                  //                   <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
                  //                 </svg>
                  //               </li>
                  //             </>
                  //           )
                  //         )}
                  //     </ul>
                  //   </div>
                  // </div>
                ))}
              </Carousel>
            </div>
          )}
        </>
      )}

      {showModal !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96 mt-20">
            <h2 className="text-lg font-semibold mb-4 font-header text-secondary">
              {category?.hasSubcategories === true
                ? selectedLang === "en"
                  ? activeTab?.packages[showModal].title_en
                  : activeTab?.packages[showModal].title_ar
                : selectedLang === "en"
                ? category?.packages[showModal]?.title_en
                : category?.packages[showModal]?.title_ar}
            </h2>
            <h2 className="text-lg font-semibold mb-4 font-header text-primary">
              {category?.hasSubcategories === true
                ? activeTab?.packages[showModal].price
                : category?.packages[showModal]?.price}
              <span>{t("AED")}</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex ">
                <div className="mb-4 mx-2">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-semibold"
                  >
                    {t("first_name")}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-semibold"
                  >
                    {t("last_name")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 font-semibold"
                >
                  {t("company_name")}
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold"
                >
                  {t("your_email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold"
                >
                  {t("your_mobile_number")}
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* Additional form fields (email, mobile number, etc.) */}
              {/* Submit and cancel buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mx-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  onClick={() => setShowModal(null)}
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {category?.samples && category?.samples.length > 0 ? (
        <div className="text-center my-6">
          <button
            onClick={() =>
              navigate(`samples/${category?._id}`, {
                state: { subCategory: activeTab },
              })
            }
            className="bg-transparent shadow-lg border border-secondary font-header font-bold w-3/4 md:w-3/6 text-gray-900 py-4 px-6 rounded-lg hover:border-primary transform transition-transform hover:scale-105 duration-300 delay-100 hover:animate-pulse"
          >
            {t("show_samples")}
          </button>
        </div>
      ) : (
        <></>
      )}
      <div ref={contactSectionRef}>
        <ContactSection />
      </div>
    </div>
  );
};

export default Pricing;
