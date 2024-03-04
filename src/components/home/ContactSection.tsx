import React, { useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaLinkedin,
  FaPhone,
  FaSnapchatSquare,
  FaTiktok,
  FaTwitterSquare,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import baseUrl from "../../constants/domain";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    mobile: "",
    message: "",
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
      const response = await fetch(`${baseUrl}/about/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.firstName + " " + formData.lastName,
          companyName: formData.companyName,
          mobile: formData.mobile,
          message: formData.message,
          subject: `New Inquiry from ${formData.firstName} ${formData.lastName}`,
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
      message: "",
    });
  };

  return (
    <div className="py-1 md:p-16 w-full bg-secondary/20">
      <div className="w-[98%] m-auto max-w-[1400px]">
        <div className="grid grid-cols-1 pb-8 text-center pt-4">
          <h3 className="mb-4 md:text-2xl text-xl font-bold font-header text-primary capitalize">
            {t("get_in_touch")}!
          </h3>
          <p className="text-secondary max-w-xl mx-auto font-body font-semibold">
            {t("get_in_touch_subtitle")}
          </p>
        </div>
        <div className="grid grid-flow-row md:grid-cols-2 mx-4 md:mx-20 my-10">
          <div className="flex flex-col gap-8 bg-gray-background md:px-4">
            <div>
              <p className="mb-6 text-2xl font-semibold font-header capitalize text-primary">
                {t("location")}
              </p>
              <p className="font-semibold font-body text-gray-500 text-sm lg:text-lg  ">
                {t("United Arab Emirates - Dubai")}
              </p>
            </div>
            <div>
              <p className="mb-6 text-2xl font-semibold font-header capitalize text-primary">
                {t("contact_info")}
              </p>
              <ul className="flex flex-col justify-center gap-4">
                <li>
                  <p
                    className="flex items-center gap-2  font-semibold cursor-pointer w-max"
                    onClick={() => {
                      window.location.href = `mailto:info@siimedia.net`;
                    }}
                  >
                    <MdEmail />
                    <span>info@siimedia.net</span>
                  </p>
                </li>

                <li>
                  <p
                    className=" flex items-center gap-2 font-semibold cursor-pointer w-max"
                    onClick={() => {
                      window.location.href = `tel:+971545615757`;
                    }}
                  >
                    <FaPhone />
                    <span style={{ direction: "ltr" }}>+971 54 561 5757</span>
                  </p>
                </li>
                <li>
                  <p
                    className="flex items-center gap-2 font-semibold cursor-pointer w-max"
                    onClick={() => {
                      window.location.href = `tel:+971542998757`;
                    }}
                  >
                    <FaPhone />
                    <span style={{ direction: "ltr" }}>+971 54 299 8757</span>
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-6 text-2xl font-semibold font-header capitalize text-primary">
                {t("social media")}
              </p>
              <ul className="mb-2 flex gap-2">
                <li>
                  <Link to={`https://wa.me/+971542998757`} target="_blank">
                    <FaWhatsappSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.facebook.com/SiiMedia.ae"
                    target="_blank"
                  >
                    <FaFacebookSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/siimedia/"
                    target="_blank"
                  >
                    <FaInstagramSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.linkedin.com/company/sii-media"
                    target="_blank"
                  >
                    <FaLinkedin className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>
              </ul>
              <ul className="mb-2 flex gap-2">
                <li>
                  <Link to="https://t.snapchat.com/O0pjBC6s" target="_blank">
                    <FaSnapchatSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>{" "}
                <li>
                  <Link to="https://twitter.com/siimedia" target="_blank">
                    <FaTwitterSquare className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.tiktok.com/@siimedia" target="_blank">
                    <FaTiktok className="h-8 w-8 text-gray-500 hover:text-primary transition-transform hover:scale-105 md:h-12 md:w-12" />
                  </Link>
                </li>
              </ul>
              <ul className="flex gap-2"></ul>
            </div>
          </div>
          <div className="border border-primary mt-4 md:mt-0 p-4 md:p-6 lg:p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4 font-header text-secondary">
              {t("contact_us")}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-12 lg:gap-5">
                <div className="lg:col-span-6 mb-5">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t("first_name")}
                    required
                    className="w-full p-2 border border-gray-600 rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
                  />
                </div>
                <div className="lg:col-span-6 mb-5">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t("last_name")}
                    required
                    className="w-full p-2 border border-gray-600 rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-12 lg:gap-5">
                <div className="lg:col-span-6 mb-5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("your_email")}
                    required
                    className="w-full p-2 border border-gray-600 rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
                  />
                </div>
                <div className="lg:col-span-6 mb-5">
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder={t("your_mobile_number")}
                    required
                    className="w-full p-2 border border-gray-600 rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 mb-5">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={t("company_name")}
                  className="w-full p-2 border border-gray-600 rounded h-10 outline-none bg-transparent focus:border-primary text-[15px]"
                />
              </div>
              <div className="lg:col-span-6 mb-5">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded h-28 outline-primary bg-transparent focus:border-primary text-[15px]"
                  placeholder={t("your_message")}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-secondary w-full text-white py-3 px-5 rounded-md hover:bg-primary transition-colors duration-300"
              >
                {t("send_message")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
