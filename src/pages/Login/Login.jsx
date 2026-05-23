import "./Login.css";
import shoes from "../../assets/image/logshoes.png";

function Login() {
  return (
    <div className="login">
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
            <label>User Name</label>

            <div className="input-box">
              <i className="fa-solid fa-user"></i>

              <input type="text" placeholder="User Name" />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input type="password" placeholder="Password" />
            </div>
          </div>

          <p className="forgot-password">Forget Password ?</p>

          <button className="login-btn">Login</button>

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
