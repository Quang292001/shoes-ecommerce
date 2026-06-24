import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import Toast from "../../../../shared/toast/Toast";
import { useLanguage } from "../../../../context/LanguageContext";
function ResetPassword() {
  const {t}=useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = decodeURIComponent(searchParams.get("token"));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "warning");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5143/api/identity/reset-password",
        {
          email,
          token,
          newPassword,
          confirmPassword,
        },
      );

      showToast(t.Password_reset_successful, "success");
      console.log(response.data);
        navigate("/");
    } catch (error) {
      console.error(error);
      showToast(t.Reset_password_failed, "error");
    }
  };

  return (
    <>  <Navbar />   
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword}>
        <h1>{t.Reset_Password}</h1>

        <input
          type="password"
          placeholder={t.New_Password}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder={t.Confirm_Password}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">{t.Reset_Password}</button>
      </form>
    </div>
     </>
  );
}

export default ResetPassword;
