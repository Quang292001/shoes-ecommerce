import "./Login.css";
import shoes from "../../assets/image/logshoes.png";
import bg from "../../assets/image/loging_bg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  navigate("/home");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5143/api/identity/login",
        formData,
      );

      console.log(res.data);

      alert("Login success");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      {/* LEFT */}
      <div className="login-left">
        <img src={shoes} alt="shoe" />
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-box">
          <h1>Welcome Back!</h1>

          {/* USERNAME */}
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

          <p className="forgot-password">Forget Password ?</p>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {/* SOCIAL */}
          <div className="social-login">
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

export default Login;
