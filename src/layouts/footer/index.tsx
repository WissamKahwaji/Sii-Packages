import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiInstagram,
  FiLinkedin,
  FiLink,
} from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";

import { Link } from "react-router-dom";
import logo_black from "../../assets/logo_black.png";
import { MdOutlineFacebook, MdOutlineWhatsapp } from "react-icons/md";
import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { FaSnapchat } from "react-icons/fa";
import baseUrl from "../../constants/domain";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    message: "",
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
    // Validate mobile number
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
      const response = await fetch(`${baseUrl}/about/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
          subject: `New Inquiry from ${formData.email}`,
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
      email: "",
      mobile: "",
      message: "",
    });
  };

  return (
    <footer className="bg-background text-secondary px-2 pt-12 pb-2 border-t border-primary">
      <div className="container mx-auto flex flex-wrap justify-between items-start w-full md:px-20">
        <div className="w-full  sm:w-auto mb-8 sm:mb-0 flex justify-start flex-col items-start">
          <div className="w-full sm:w-auto sm:mb-0 mb-5 md:mb-7">
            <img
              src={logo_black}
              alt="Company Logo"
              className="w-40 md:mx-auto"
            />
          </div>
          <div className="flex items-center mb-4">
            <FiMapPin className="mx-2 text-primary" />
            <span className="text-gray-700">
              {t("United Arab Emirates - Dubai")}
            </span>
          </div>
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => {
              window.location.href = `https://siimedia.net/`;
            }}
          >
            <FiLink className="mx-2 text-primary " />
            <span className="text-gray-700">www.siimedia.net</span>
          </div>
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => {
              window.location.href = `mailto:info@siimedia.net`;
            }}
          >
            <FiMail className="mx-2 text-primary " />
            <span className="text-gray-700">info@siimedia.net</span>
          </div>
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => {
              window.location.href = `tel:+971545615757`;
            }}
          >
            <FiPhone className="mx-2 text-primary" />
            <span style={{ direction: "ltr" }} className="text-gray-700">
              +971 54 561 5757
            </span>
          </div>
          <div
            className="flex items-center mb-6 cursor-pointer"
            onClick={() => {
              window.location.href = `tel:+971542998757`;
            }}
          >
            <FiPhone className="mx-2 text-primary" />
            <span style={{ direction: "ltr" }} className="text-gray-700 ">
              +971 54 299 8757
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Link to={`https://wa.me/+971542998757`} className="mx-2">
              <MdOutlineWhatsapp className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link to="https://www.facebook.com/SiiMedia.ae" className="mx-2">
              <MdOutlineFacebook className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>

            <Link to="https://www.instagram.com/siimedia/" className="mx-2">
              <FiInstagram className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/sii-media"
              className="mx-2"
            >
              <FiLinkedin className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link to="https://t.snapchat.com/O0pjBC6s" className="mx-2">
              <FaSnapchat className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link to="https://twitter.com/siimedia" className="mx-2">
              <BsTwitterX className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
          </div>
        </div>
        <div className="mb-8">
          <h4 className="pb-3 text-xl text-primary font-semibold">
            {t("packages")}
          </h4>
          <ul>
            {categories?.map((category, index) => (
              <li key={index} className="pb-3">
                <Link
                  to={`pricing/${category._id}`}
                  className="hover:text-primary"
                >
                  {selectedLang === "en" ? category.name_en : category.name_ar}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h4 className="pb-3 text-xl text-primary font-semibold">
            {t("useful_links")}
          </h4>
          <ul>
            <li className="pb-3">
              <Link to="/packages" className="hover:text-primary">
                {t("packages")}
              </Link>
            </li>
            <li className="pb-3">
              <Link to="/our-projects" className="hover:text-primary">
                {t("our_projects")}
              </Link>
            </li>
            <li className="pb-3">
              <Link to="/about-us" className="hover:text-primary">
                {t("about_us")}
              </Link>
            </li>
            <li className="pb-3">
              <Link to="/our-clients" className="hover:text-primary capitalize">
                {t("our_clients")}
              </Link>
            </li>
            <li className="pb-3">
              <Link to="/contact-us" className="hover:text-primary capitalize">
                contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:max-w-md max-w-max  ">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("your_email")}
              required
              className="w-full mb-4 p-3 rounded-lg border border-gray-400 bg-gray-200 text-gray-800 focus:outline-none focus:border-primary"
            />
            {/* <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder={t("your_mobile_number")}
              required
              className="w-full mb-4 p-3 rounded-lg border border-gray-400 bg-gray-200 text-gray-800 focus:outline-none focus:border-primary"
            /> */}
            <div className="mb-4">
              <PhoneInput
                country={"ae"}
                value={formData.mobile}
                onChange={handlePhoneChange}
                inputProps={{ required: true, autoFocus: true }}
                placeholder={t("your_mobile_number")}
                inputStyle={{
                  border: "1px solid #9CA3AF",
                  borderRadius: "0.375rem",
                  fontSize: "15px",
                  outline: "none",
                  backgroundColor: "#E5E7EB",
                  height: "45PX",
                }}
                buttonStyle={{
                  margin: 3,
                }}
              />
              {mobileError && (
                <p className="text-red-500 text-sm">{mobileError}</p>
              )}
            </div>
            <textarea
              placeholder={t("your_message")}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full h-24 p-3 rounded-lg border border-gray-400 bg-gray-200 text-gray-800 focus:outline-none focus:border-primary"
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors duration-300"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        {t("© 2024 Sii Media. All rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
