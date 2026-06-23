import React from "react";
import "./Services.css";
import { useLanguage } from "../../../../context/LanguageContext";
function Services() {
  const {t}=useLanguage();
  return (
    <div className="services" id="Services">
      <h1>
        {t.our}<span> {t.services}</span>
      </h1>
      <div className="services-cards">
        <div className="services-box">
          <i className="fa-solid fa-truck-fast"></i>
          <h3>{t.fast_delivery}</h3>
          <p>
            {t.sv1}
          </p>
        </div>
        <div className="services-box">
          <i className="fa-solid fa-rotate-left"></i>
          <h3>{t.replacement}</h3>
          <p>
            {t.sv2}
          </p>
        </div>
        <div className="services-box">
          <i className="fa-solid fa-headset"></i>
          <h3>{t.support}</h3>
          <p>
            {t.sv3}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
