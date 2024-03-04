import logo_black from "../../assets/logo_black.png";
import { Link } from "react-router-dom";
import LanguageButton from "../../components/ui/LanguageButton";
import { FiMail, FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { MdWhatsapp } from "react-icons/md";

const Navbar = () => {
  const { t } = useTranslation();

  const socialMediaIcons = [
    {
      icon: <FiMail className="md:h-6 md:w-6" />,
      link: "mailto:info@siimedia.net",
    },
    {
      icon: <FiPhone className="md:h-6 md:w-6" />,
      link: "tel:+971545615757",
    },
    {
      icon: <MdWhatsapp className="md:h-6 md:w-6" />,
      link: "https://wa.me/+971542998757",
    },
    // {
    //   icon: <FaFacebook className="h-6 w-6" />,
    //   link: "https://www.facebook.com/SiiMedia.ae",
    // },
    // {
    //   icon: <FaInstagram className="h-6 w-6" />,
    //   link: "https://www.instagram.com/siimedia/",
    // },
  ];
  return (
    <header className="fixed left-0 top-0 z-[1001] w-full bg-seconBackground border-b border-border shadow-sm">
      <nav className="flex flex-row md:flex-row items-center justify-between px-3 md:py-2 py-2 lg:px-8 lg:py-4 md:px-16  lg:justify-between  lg:items-center  w-full">
        <div className="">
          <a href="/">
            <img
              src={logo_black}
              alt=""
              className="h-auto w-20 sm:h-auto sm:w-20 md:h-auto md:w-24 lg:h-auto lg:w-36 object-cover "
            />
          </a>
        </div>
        <div className="flex flex-col items-end  ">
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
            <Link to={`our-projects`}>
              <p className="capitalize font-header mx-2 text-xs md:text-base text-primary hover:text-secondary font-semibold">
                {t("our_projects")}
              </p>
            </Link>
            <Link to={`about-us`}>
              <p className="capitalize font-header text-xs md:text-base text-primary hover:text-secondary font-semibold">
                {t("about_us")}
              </p>
            </Link>
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
