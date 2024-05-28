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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import linkIcon from "../../assets/external-link.png";
import ReactGA from "react-ga4";

const Pricing: React.FC = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/packages/pricing/:id",
      title: "pricing Page",
    });
  }, []);
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
  const handleClickOnPackage = (name: string, index: number) => {
    ReactGA.event({
      category: `${name} choosen package`,
      action: "Click",
      label: name,
    });
    setShowModal(index);
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

  const [mobileError, setMobileError] = useState("");
  const handlePhoneChange = (mobile: string) => {
    setFormData(prevData => ({
      ...prevData,
      mobile,
    }));
    setMobileError("");
  };

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
    if (
      !formData.mobile ||
      !/^\+?\d+$/.test(formData.mobile) ||
      formData.mobile.length <= 10
    ) {
      setMobileError("Invalid mobile number");
      return;
    }
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
    window.scrollTo(0, 0);

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
        <p className="text-lg md:text-2xl text-secondary font-body leading-7 max-w-[700px] mx-auto transform  animate-wiggle">
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
                        setShowModal={() =>
                          handleClickOnPackage(item.title_en, index)
                        }
                      />
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
                    setShowModal={() =>
                      handleClickOnPackage(item.title_en, index)
                    }
                  />
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
                {/* <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                /> */}
                <PhoneInput
                  country={"ae"}
                  value={formData.mobile}
                  onChange={handlePhoneChange}
                  inputProps={{ required: true, autoFocus: true }}
                  placeholder={t("your_mobile_number")}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid  #D1D5DB",
                    borderRadius: "0.375rem",
                    fontSize: "15px",
                    outline: "none",
                    backgroundColor: "transparent",
                    direction: "ltr",
                  }}
                  containerStyle={{ direction: "ltr" }}
                  buttonStyle={{
                    margin: 3,
                    direction: "ltr",
                  }}
                />
                {mobileError && (
                  <p className="text-red-500 text-sm">{mobileError}</p>
                )}
              </div>

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
            onClick={() => navigate(`samples/${activeTab?._id}`)}
            className="bg-transparent shadow-lg border border-secondary font-header font-bold w-3/4 md:w-3/6 text-gray-900 py-4 px-6 rounded-lg hover:border-primary transform transition-transform hover:scale-105 duration-300 delay-100 animate-pulse"
          >
            {t("show_samples")}
          </button>
        </div>
      ) : (
        <></>
      )}
      {category?.landingLing && (
        <div className="flex justify-center ">
          <a
            href={category.landingLing}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-transparent border border-primary text-primary font-semibold mb-4 px-6 py-3 rounded-lg hover:bg-primary-dark hover:border-primary transform transition duration-300 hover:scale-105  animate-shake"
          >
            <span className="mr-2">{t("view_more_about_this_service")}</span>
            <img src={linkIcon} alt="link" className="w-5 h-6" />
          </a>
        </div>
      )}
      <div ref={contactSectionRef}>
        <ContactSection />
      </div>
    </div>
  );
};

export default Pricing;
