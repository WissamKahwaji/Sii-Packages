import { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const LanguageButton = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);
  const changeLanguage = (lng: string) => {
    console.log("asda");
    i18n.changeLanguage(lng);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const langList = ["en", "ar"];
  return (
    <div className="relative flex flex-col items-center  rounded-lg">
      <button
        className="bg-secondary text-xs md:text-sm text-white capitalize px-4 py-2 md:px-3 md:py-1  w-full h-full flex items-center justify-between font-serif  rounded-lg tracking-wider border-transparent active:border-white duration-300 active:text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {lang}
        {!isOpen ? (
          <AiOutlineCaretDown className="h-3" />
        ) : (
          <AiOutlineCaretUp className="h-3" />
        )}
      </button>
      {isOpen && (
        <div className="bg-secondary absolute text-white w-full top-9 md:top-8 rounded-lg flex flex-col items-center  p-1  ">
          {langList.map((lang, index) => (
            <div
              key={index}
              className="w-full flex hover:bg-primary justify-center rounded-r-lg border-l-transparent hover:border-l-white border-l-2 cursor-pointer "
              onClick={() => {
                setLang(lang);
                changeLanguage(lang);
                setIsOpen(prev => !prev);
              }}
            >
              <h3 className="capitalize my-1 font-body text-sm md:text-base ">
                {t(lang)}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
