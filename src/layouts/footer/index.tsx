import React, { useState } from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import logo_black from "../../assets/logo_black.png";
import { MdOutlineFacebook, MdOutlineWhatsapp } from "react-icons/md";
import { useGetCategoriesQuery } from "../../apis/packages/queries";
import { FaSnapchat } from "react-icons/fa";
import baseUrl from "../../constants/domain";

const Footer: React.FC = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [formData, setFormData] = useState({
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
      <div className="container mx-auto flex flex-wrap justify-between items-center w-full md:px-20">
        <div className="w-full  sm:w-auto mb-8 sm:mb-0 flex justify-start flex-col items-start">
          <div className="w-full sm:w-auto sm:mb-0 md:mb-5">
            <img src={logo_black} alt="Company Logo" className="w-40 mx-auto" />
          </div>
          <div className="flex items-center mb-4">
            <FiMapPin className="mr-2 text-primary" />
            <span className="text-gray-700"> United Arab Emirates - Dubai</span>
          </div>
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => {
              window.location.href = `mailto:info@siimedia.net`;
            }}
          >
            <FiMail className="mr-2 text-primary " />
            <span className="text-gray-700">info@siimedia.net</span>
          </div>
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => {
              window.location.href = `tel:+971545615757`;
            }}
          >
            <FiPhone className="mr-2 text-primary" />
            <span className="text-gray-700">+971 54 561 5757</span>
          </div>
          <div
            className="flex items-center mb-6 cursor-pointer"
            onClick={() => {
              window.location.href = `tel:+971542998757`;
            }}
          >
            <FiPhone className="mr-2 text-primary" />
            <span className="text-gray-700">+971 54 299 8757</span>
          </div>
          <div className="flex items-center mb-4">
            <Link to={`https://wa.me/+971542998757`} className="mr-4">
              <MdOutlineWhatsapp className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link to="https://www.facebook.com/SiiMedia.ae" className="mr-4">
              <MdOutlineFacebook className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>

            <Link to="https://www.instagram.com/siimedia/" className="mr-4">
              <FiInstagram className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/sii-media"
              className="mr-4"
            >
              <FiLinkedin className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link to="https://t.snapchat.com/O0pjBC6s" className="mr-4">
              <FaSnapchat className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
            <Link to="https://twitter.com/siimedia" className="mr-4">
              <FiTwitter className="text-2xl text-primary hover:text-secondary transition-colors duration-300" />
            </Link>
          </div>
        </div>
        <div className="mb-8">
          <h4 className="pb-3 text-xl text-primary font-semibold">Packages</h4>
          <ul>
            {categories?.map((category, index) => (
              <li key={index} className="pb-3">
                <Link
                  to={`pricing/${category._id}`}
                  className="hover:text-hoverColor"
                >
                  {category.name_en}
                </Link>
              </li>
            ))}
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
              placeholder="Your Email"
              required
              className="w-full mb-4 p-3 rounded-lg border border-gray-400 bg-gray-200 text-gray-800 focus:outline-none focus:border-primary"
            />
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Your Mobile number"
              required
              className="w-full mb-4 p-3 rounded-lg border border-gray-400 bg-gray-200 text-gray-800 focus:outline-none focus:border-primary"
            />
            <textarea
              placeholder="Your Message"
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
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sii Media. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
