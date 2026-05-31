import "./Login.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { authApi } from "../../api/authApi";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";

import shoes from "../../../../assets/image/logshoes.png";
import bg from "../../../../assets/image/loging_bg.png";
import googleIcon from "../../../../assets/image/google.png";
import facebookIcon from "../../../../assets/image/facebook.png";
import twitterIcon from "../../../../assets/image/twitter.png";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      alert("Password is required");
      return;
    }

    try {
      const result = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      const accessToken = result.accessToken || result.token;

      if (!accessToken) {
        alert("Login response does not contain access token");
        return;
      }

      tokenStorage.setAccessToken(accessToken);

      const redirectPath = location.state?.from?.pathname || "/home";

      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-left">
        <img src={shoes} alt="shoe" />
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1>Welcome Back!</h1>

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

          <p className="forgot-password">Forget Password ?</p>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>

          <div className="social-login">
            <a className="social-icon">
              <img src={googleIcon} alt="Google" />
            </a>

            <a className="social-icon">
              <img src={facebookIcon} alt="Facebook" />
            </a>

            <a className="social-icon">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;