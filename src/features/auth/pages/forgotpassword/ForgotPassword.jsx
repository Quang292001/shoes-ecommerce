import "./ForgotPassword.css";
import { useState } from "react";
import { authApi } from "../../api/authApi";
import Toast from "../../../../shared/toast/Toast";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { useLanguage } from "../../../../context/LanguageContext";
function ForgotPassword() {
  const {t}=useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showToast(t.Email_required, "warning");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast(t.enter_email_address, "warning");
      return;
    }

    try {
      await authApi.forgotPassword(email);

      showToast(t.Password_reset, "success");
    } catch (error) {
      console.error(error);

      showToast(
        error.response?.data?.message || t.Something_went_wrong,
        "error",
      );
    }
  };

  return (
    <> 
    <Navbar />
    <div className="forgot-password-page">
      <div className="forgot-box">
        <h1>{t.Forget_Password}</h1>

        <p>{t.Enter_reset_password}</p>

        <input
          type="email"
          placeholder={t.Enter_your_email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleForgotPassword}>{t.Send_Reset_Link}</button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
     </>
  );
}

export default ForgotPassword;
