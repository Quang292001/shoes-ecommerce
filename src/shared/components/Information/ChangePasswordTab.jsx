import { useState } from "react";

/**
 * Props:
 * - onSubmit({ currentPassword, newPassword }): callback, trả về Promise.
 *   Nên throw lỗi với message rõ ràng (ví dụ "Mật khẩu hiện tại không đúng")
 *   để hiển thị lại cho người dùng.
 */
function ChangePasswordTab({ onSubmit }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu mới cần ít nhất 8 ký tự";
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSubmit({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({
        submit: err?.message || "Đổi mật khẩu thất bại, vui lòng thử lại.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-tab-panel">
      <div className="profile-tab-panel-header">
        <h3>Đổi mật khẩu</h3>
      </div>

      {success && (
        <p className="profile-save-success">Đổi mật khẩu thành công!</p>
      )}

      <form className="account-info-form" onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <label htmlFor="cp-current">Mật khẩu hiện tại</label>
          <input
            id="cp-current"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            aria-invalid={!!errors.currentPassword}
          />
          {errors.currentPassword && (
            <span className="field-error">{errors.currentPassword}</span>
          )}
        </div>

        <div className="two-column">
          <div className="input-group">
            <label htmlFor="cp-new">Mật khẩu mới</label>
            <input
              id="cp-new"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              aria-invalid={!!errors.newPassword}
            />
            {errors.newPassword && (
              <span className="field-error">{errors.newPassword}</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="cp-confirm">Xác nhận mật khẩu mới</label>
            <input
              id="cp-confirm"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        {errors.submit && (
          <span className="field-error">{errors.submit}</span>
        )}

        <button
          type="submit"
          className="address-btn-primary"
          disabled={isSaving}
        >
          {isSaving ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordTab;