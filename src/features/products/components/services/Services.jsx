import React from "react";
import "./Services.css";
function Services() {
  return (
    <div className="services" id="Services">
      <h1>
        our<span> Services</span>
      </h1>
      <div className="services-cards">
        <div className="services-box">
          <i className="fa-solid fa-truck-fast"></i>
          <h3>Fast Delivery</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            voluptate.
          </p>
        </div>
        <div className="services-box">
          <i className="fa-solid fa-rotate-left"></i>
          <h3>10 Days Replacement</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            voluptate.
          </p>
        </div>
        <div className="services-box">
          <i className="fa-solid fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            voluptate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
