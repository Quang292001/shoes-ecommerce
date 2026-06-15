import React from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import "./Services.css";
import { useLanguage } from "../../../../context/LanguageContext";
function Services() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <section className="services" id="Services">
        <h1>
          {t.our} <span>{t.services}</span>
        </h1>

        <div className="services-container">
          <div className="service-card">
            <i className="fas fa-truck"></i>

            <h2>{t.fast_delivery}</h2>
            <p>{t.fd}</p>
          </div>

          <div className="service-card">
            <i className="fas fa-undo"></i>

            <h2>{t.easy_return}</h2>

            <p>{t.er}</p>
          </div>

          <div className="service-card">
            <i className="fas fa-headset"></i>

            <h2>{t.support}</h2>

            <p>{t.sp}</p>
          </div>

          <div className="service-card">
            <i className="fas fa-shield-alt"></i>

            <h2>{t.secure_payment}</h2>

            <p>{t.scp}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Services;
