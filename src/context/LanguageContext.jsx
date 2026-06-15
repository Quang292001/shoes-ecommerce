import { createContext, useContext, useState } from "react";
import en from "../locales/en.json";
import vi from "../locales/vi.json";
const LanguageContext = createContext();

const translations = {
  en,
  vi
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("vi");

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () =>
  useContext(LanguageContext);