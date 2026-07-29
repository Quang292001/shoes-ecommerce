import { useState } from "react";

/**
 * Props:
 * - profile: { fullName, name, email, phone }
 * - onSave(data): callback khi lưu, trả về Promise
 */
function AccountInfoTab({ profile, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || profile?.name || "",
    phone: profile?.phone || "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }
    if (formData.phone && !/^(0|\+84)\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSave(formData);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: "Cập nhật thất bại, vui lòng thử lại." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile?.fullName || profile?.name || "",
      phone: profile?.phone || "",
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="profile-tab-panel">
        <div className="profile-tab-panel-header">
          <h3>Thông tin tài khoản</h3>
          <button
            className="address-btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa
          </button>
        </div>

        {saveSuccess && (
          <p className="profile-save-success">
            Cập nhật thông tin thành công!
          </p>
        )}

        <div className="profile-info">
          <div className="profile-info-row">
            <span>Họ tên</span>
            <strong>{formData.fullName || "Chưa cập nhật"}</strong>
          </div>
          <div className="profile-info-row">
            <span>Email</span>
            <strong>{profile?.email || "Chưa cập nhật"}</strong>
          </div>
          <div className="profile-info-row">
            <span>Số điện thoại</span>
            <strong>{formData.phone || "Chưa cập nhật"}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-tab-panel">
      <div className="profile-tab-panel-header">
        <h3>Chỉnh sửa thông tin</h3>
      </div>

      <form className="account-info-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="ai-fullName">Họ tên</label>
          <input
            id="ai-fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <span className="field-error">{errors.fullName}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="ai-email">Email</label>
          <input id="ai-email" value={profile?.email || ""} disabled />
          <span className="input-hint">
            Email không thể thay đổi trực tiếp. Liên hệ hỗ trợ nếu cần.
          </span>
        </div>

        <div className="input-group">
          <label htmlFor="ai-phone">Số điện thoại</label>
          <input
            id="ai-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <span className="field-error">{errors.phone}</span>
          )}
        </div>

        {errors.submit && (
          <span className="field-error">{errors.submit}</span>
        )}

        <div className="address-form-actions">
          <button
            type="button"
            className="address-btn-secondary"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Huỷ
          </button>
          <button
            type="submit"
            className="address-btn-primary"
            disabled={isSaving}
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountInfoTab;