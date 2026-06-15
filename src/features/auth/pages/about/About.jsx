import React from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import "./About.css";
import { useNavigate } from "react-router-dom";
import aboutImage from "../../../../assets/image/bg1.png";
import Footer from "../../../../shared/layout/footer/Footer";
import { useLanguage } from "../../../../context/LanguageContext";
function About() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <section className="about" id="About">
        <h1>
          {t.about} <span>{t.us}</span>
        </h1>

        <div className="about-main">
          <div className="about-image">
            <img src={aboutImage} alt="About Shoes" />
          </div>
          <div className="about-text">
            <h2>{t.why_choose_us}</h2>
            <p>{t.about1}</p>
            <p>{t.about2}</p>
            <p>{t.about3}</p>
            <button
              onClick={() => {
                navigate("/products");
              }}
            >
              {t.shop_now}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
