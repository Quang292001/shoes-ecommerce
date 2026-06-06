import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import Toast from "../../../../shared/toast/Toast";
function ResetPassword() {
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

      showToast("Password reset successful", "success");
      console.log(response.data);
        navigate("/");
    } catch (error) {
      console.error(error);
      showToast("Reset password failed", "error");
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword}>
        <h1>Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
