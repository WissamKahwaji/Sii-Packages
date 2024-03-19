import logo_black from "../../assets/logo_black.png";
import { Link, useLocation } from "react-router-dom";
import LanguageButton from "../../components/ui/LanguageButton";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { MdWhatsapp } from "react-icons/md";
import { useState } from "react";
import { AiOutlineCloseSquare, AiOutlineMenu } from "react-icons/ai";
import { FaEnvelope, FaPhoneAlt, FaSnapchat } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;
  const socialMediaIcons = [
    {
      icon: <FiMail className="h-6 w-6" />,
      link: "mailto:info@siimedia.net",
    },
    {
      icon: <FiPhone className="h-6 w-6" />,
      link: "tel:+971545615757",
    },
    {
      icon: <MdWhatsapp className="h-6 w-6" />,
      link: "https://wa.me/+971542998757",
    },
  ];
  const socialMediaIcons2 = [
    {
      icon: <FiFacebook className="h-6 w-6" />,
      link: "https://www.facebook.com/SiiMedia.ae",
    },
    {
      icon: <FiInstagram className="h-6 w-6" />,
      link: "https://www.instagram.com/siimedia/",
    },
    {
      icon: <FiLinkedin className="h-6 w-6" />,
      link: "https://www.linkedin.com/company/sii-media",
    },
    {
      icon: <FaSnapchat className="h-6 w-6" />,
      link: "https://t.snapchat.com/O0pjBC6s",
    },
    {
      icon: <BsTwitterX className="h-6 w-6" />,
      link: "https://twitter.com/siimedia",
    },
  ];

  const navItems = [
    { title: "packages", path: "/packages" },
    { title: "our_projects", path: "/our-projects" },
    { title: "about_us", path: "/about-us" },
    { title: "our_clients", path: "/our-clients" },
    { title: "contact_us", path: "/contact-us" },
  ];

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <header className="fixed left-0 top-0 z-[1001] w-full bg-seconBackground border-b border-border shadow-sm">
      <nav className="flex flex-row md:flex-row items-center justify-between px-3 md:py-2 py-2 lg:px-8 lg:py-4 md:px-16  lg:justify-between  lg:items-center  w-full">
        <div className=" flex items-center justify-between w-full lg:w-auto md:w-auto lg:justify-start gap-x-8 md:space-x-0 md:justify-center">
          <div className="text-2xl md:text-4xl font-bold text-primary">
            <a href="/">
              <img
                src={logo_black}
                alt=""
                className="h-auto w-24 sm:h-auto sm:w-24 md:h-auto md:w-24 lg:h-auto lg:w-36 object-cover "
              />
            </a>
          </div>
          <button
            onClick={toggleDrawer}
            className="md:hidden  text-primary hover:text-secondary transition duration-300 text-2xl focus:outline-none"
          >
            <AiOutlineMenu />
          </button>
        </div>
        {showDrawer && (
          <div className="md:hidden fixed inset-0 bg-transparent bg-opacity-90 flex flex-row w-full backdrop-filter backdrop-blur-sm">
            <div className=" bg-primary bg-opacity-80 z-[1002] transition  duration-300 transform translate-x-0 w-[75%]">
              <div className="flex flex-col items-start mx-2 space-y-4 py-8">
                <div className="mb-5">
                  <LanguageButton />
                </div>
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    className="text-white hover:text-hoverColor transition duration-300 text-lg border-b-2 w-full border-b-hoverColor/50"
                  >
                    {t(`${item.title}`)}
                  </a>
                ))}
                <div className="flex flex-col space-y-4">
                  <div
                    className="flex flex-row items-center  text-white cursor-pointer"
                    onClick={() => {
                      window.location.href = `mailto:info@siimedia.net`;
                    }}
                  >
                    <FaEnvelope />
                    <span className="mx-2 text-lg">info@siimedia.net</span>
                  </div>
                  <div
                    className="flex flex-row items-center  text-white cursor-pointer"
                    onClick={() => {
                      window.location.href = `tel:+971545615757`;
                    }}
                  >
                    <FaPhoneAlt />
                    <span style={{ direction: "ltr" }} className="mx-2 text-lg">
                      +971 54 561 5757
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-4 pt-1">
                    <div className="flex flex-row gap-x-4">
                      {socialMediaIcons.map((socialMedia, index) => (
                        <Link
                          key={index}
                          to={socialMedia.link ?? ""}
                          className="flex items-center text-white hover:text-hoverColor transition duration-300"
                        >
                          {socialMedia.icon}
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-row gap-x-4 ">
                      {socialMediaIcons2.map((socialMedia, index) => (
                        <Link
                          key={index}
                          to={socialMedia.link ?? ""}
                          className="flex items-center text-white hover:text-hoverColor transition duration-300"
                        >
                          {socialMedia.icon}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[60px] w-[15%] bg-transparent flex justify-center items-center mx-3 mt-3">
              <button
                onClick={toggleDrawer}
                className="text-white text-lg focus:outline-none"
              >
                <AiOutlineCloseSquare className="text-6xl text-secondary" />
              </button>
            </div>
          </div>
        )}
        <div className="hidden md:flex flex-col items-end  ">
          <div className="flex flex-row   items-end">
            <div className="flex flex-row  mx-2 mt-4">
              {socialMediaIcons.map((socialMedia, index) => (
                <Link
                  key={index}
                  to={socialMedia.link ?? ""}
                  className="flex items-center mx-1 text-secondary hover:text-primary transition duration-300"
                >
                  {socialMedia.icon}
                </Link>
              ))}
            </div>
            <LanguageButton />
          </div>
          <div className="flex flex-row space-x-2 mt-4">
            {navItems.map((item, index) => (
              <div key={index}>
                <Link to={item.path}>
                  <p
                    className={`capitalize font-header mx-2 text-xs md:text-base text-primary hover:text-secondary font-semibold transition duration-300 ${
                      item.path === currentPath
                        ? "border-b-2 border-secondary"
                        : ""
                    }`}
                  >
                    {t(`${item.title}`)}
                  </p>
                </Link>
              </div>
            ))}
            {/* <Link to={`our-projects`}>
              <p className="capitalize font-header mx-2 text-xs md:text-base text-primary hover:text-secondary font-semibold">
                {t("our_projects")}
              </p>
            </Link>
            <Link to={`about-us`}>
              <p className="capitalize font-header text-xs md:text-base text-primary hover:text-secondary font-semibold">
                {t("about_us")}
              </p>
            </Link> */}
          </div>
          {/* <div
            className="flex items-center cursor-pointer mt-2"
            onClick={() => {
              window.location.href = `mailto:info@siimedia.net`;
            }}
          >
            <span className="text-gray-700">info@siimedia.net</span>{" "}
            <FiMail className="ml-2 text-primary " />
          </div>{" "}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.location.href = `tel:+971545615757`;
            }}
          >
            <span className="text-gray-700">+971 54 561 5757</span>
            <FiPhone className="ml-2 text-primary" />
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
