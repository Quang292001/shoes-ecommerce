import "./Register.css";
import { useState } from "react";
import { authApi } from "../../api/authApi";
import Toast from "../../../../shared/toast/Toast";
import shoes from "../../../../assets/image/logshoes.png";
import bg from "../../../../assets/image/loging_bg.png";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (!formData.fullName.trim()) {
      showToast("Full name is required", "warning");
      return;
    }

    if (!formData.email.trim()) {
      showToast("Email is required", "warning");
      return;
    }

    if (formData.password.length < 8) {
      showToast("Password must be at least 8 characters", "warning");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Confirm password does not match", "warning");
      return;
    }

    try {
      await authApi.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      showToast("Register success", "success");
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || "Register failed", "error");
    }
  };

  return (
    <div
      className="register"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="register-left">
        <img src={shoes} alt="shoe" />
      </div>

      <div className="register-right">
        <div className="register-box">
          <h1>Create Account</h1>

          <div className="input-group">
            <label>User Name</label>

            <div className="input-box">
              <i className="fa-solid fa-user"></i>

              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    fullName: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>

            <div className="input-box">
              <i className="fa-solid fa-envelope"></i>

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    password: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    confirmPassword: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <button className="register-btn" onClick={handleRegister}>
            Register
          </button>

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

export default RegisterPage;