import "./ForgotPassword.css";
import { useState } from "react";
import { authApi } from "../../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Invalid email format");
      return;
    }

    try {
      await authApi.forgotPassword(email);

      setMessage(
        "Password reset link sent to your email"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-box">
        <h1>Forgot Password</h1>

        <p>
          Enter your email to reset password
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button onClick={handleForgotPassword}>
          Send Reset Link
        </button>

        {message && (
          <div className="message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;