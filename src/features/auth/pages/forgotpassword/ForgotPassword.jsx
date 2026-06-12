import "./ForgotPassword.css";
import { useState } from "react";
import { authApi } from "../../api/authApi";
import Toast from "../../../../shared/toast/Toast";
import Navbar from "../../../../shared/layout/navbar/Navbar";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showToast("Email is required", "warning");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("Invalid email format", "warning");
      return;
    }

    try {
      await authApi.forgotPassword(email);

      showToast("Password reset link sent to your email", "success");
    } catch (error) {
      console.error(error);

      showToast(
        error.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <> 
    <Navbar />
    <div className="forgot-password-page">
      <div className="forgot-box">
        <h1>Forgot Password</h1>

        <p>Enter your email to reset password</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleForgotPassword}>Send Reset Link</button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
     </>
  );
}

export default ForgotPassword;
