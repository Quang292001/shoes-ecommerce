import "./Register.css";
import { useState } from "react";
import axios from "axios";
import React from "react";

import shoes from "../../assets/image/logshoes.png";
import bg from "../../assets/image/loging_bg.png";

function Register() {
  const handleRegister = async () => {
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5143/api/identity/register",
        formData,
      );

      console.log(res.data);
      alert("Register success");
    } catch (error) {
      console.log(error.response.data);
    }
    try {
      const res = await axios.post(
        "http://localhost:5143/api/identity/register",
        formData,
      );

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  return (
    <div
      className="register"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* LEFT */}
      <div className="register-left">
        <img src={shoes} alt="shoe" />
      </div>

      {/* RIGHT */}
      <div className="register-right">
        <div className="register-box">
          <h1>Create Account</h1>

          {/* USERNAME */}
          <div className="input-group">
            <label>User Name</label>

            <div className="input-box">
              <i className="fa-solid fa-user"></i>

              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>

            <div className="input-box">
              <i className="fa-solid fa-envelope"></i>

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <label>Confirm Password</label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input type="password" placeholder="Confirm Password" />
            </div>
          </div>

          <button className="register-btn" onClick={handleRegister}>
            Register
          </button>
          {/* SOCIAL */}
          <div className="social-register">
            <div className="social-icon">
              <i className="fa-brands fa-google"></i>
            </div>

            <div className="social-icon">
              <i className="fa-brands fa-facebook-f"></i>
            </div>

            <div className="social-icon">
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
