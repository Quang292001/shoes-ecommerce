import React from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import "./About.css";
import {useNavigate} from "react-router-dom";
import aboutImage from "../../../../assets/image/bg1.png";
import Footer from "../../../../shared/layout/footer/Footer";

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="about" id="About">
        <h1>
          About <span>Us</span>
        </h1>

        <div className="about-main">
          <div className="about-image">
            <img src={aboutImage} alt="About Shoes" />
          </div>

          <div className="about-text">
            <h2>Why Choose Us?</h2>

            <p>
              Welcome to Shoes Store, your destination for stylish and
              comfortable footwear. We provide high-quality shoes designed for
              everyday comfort, sports performance, and modern fashion.
            </p>

            <p>
              Our mission is to bring confidence and comfort to every step you
              take. From casual sneakers to running shoes, we carefully select
              products that combine durability, quality, and trendy design.
            </p>

            <p>
              We believe shoes are more than fashion — they are part of your
              lifestyle. Thank you for choosing our store.
            </p>

            <button
              onClick={() => {
                navigate("/products");
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default About;
