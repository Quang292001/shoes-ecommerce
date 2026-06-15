import "./LanguageSwitcher.css";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  const {
    language,
    setLanguage,
  } = useLanguage();

  const languages = [
    {
      name: "English",
      flag: "https://flagcdn.com/w40/us.png",
      code: "en",
    },

    {
      name: "Tiếng Việt",
      flag: "https://flagcdn.com/w40/vn.png",
      code: "vi",
    },
  ];

  const currentLanguage =
    languages.find(
      (lang) => lang.code === language,
    );

  const handleSelectLanguage = (lang) => {
    setLanguage(lang.code);

    setOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        className="language-btn"
        onClick={() => setOpen(!open)}
      >
        <img
          src={currentLanguage.flag}
          alt=""
        />

        <span>
          {currentLanguage.name}
        </span>

        <i className="fa-solid fa-chevron-down"></i>
      </button>

      {open && (
        <div className="language-dropdown">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="language-item"
              onClick={() =>
                handleSelectLanguage(lang)
              }
            >
              <img
                src={lang.flag}
                alt=""
              />

              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;