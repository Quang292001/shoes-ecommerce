import { useState, useEffect } from "react";

import LocationPicker from "../LocationPicker/LocationPicker";
import { VIETNAM_PROVINCES } from "../../../data/vietnamProvinces";
import { fetchWardsByProvinceName } from "../../../services/VietnamAdministrativeApi";

const DEFAULT_MAP_CENTER = { lat: 10.7769, lng: 106.7009 };

const EMPTY_ADDRESS = {
  label: "Nhà riêng",
  fullName: "",
  phone: "",
  province: "",
  ward: "",
  address: "",
  isDefault: false,
};

/**
 * Form thêm/sửa một địa chỉ trong sổ địa chỉ.
 *
 * Props:
 * - initialData: địa chỉ đang sửa (null nếu đang thêm mới)
 * - onSave(data): callback khi bấm Lưu, data khớp interface addressBookApi
 * - onCancel(): callback khi huỷ
 */
function AddressForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(initialData || EMPTY_ADDRESS);
  const [mapPosition, setMapPosition] = useState(initialData?.location || null);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [wards, setWards] = useState([]);
  const [isLoadingWards, setIsLoadingWards] = useState(false);
  const [wardsError, setWardsError] = useState("");

  const selectedProvince = VIETNAM_PROVINCES.find(
    (p) => p.name === formData.province,
  );
  const mapCenter = selectedProvince
    ? { lat: selectedProvince.lat, lng: selectedProvince.lng }
    : DEFAULT_MAP_CENTER;

  useEffect(() => {
    if (!formData.province) {
      setWards([]);
      return;
    }

    let cancelled = false;
    setIsLoadingWards(true);
    setWardsError("");

    fetchWardsByProvinceName(formData.province)
      .then((data) => {
        if (!cancelled) setWards(data);
      })
      .catch(() => {
        if (!cancelled) {
          setWards([]);
          setWardsError("Không tải được danh sách xã/phường.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingWards(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.province]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "province") {
      setFormData((prev) => ({ ...prev, ward: "" }));
      setMapPosition(null);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên người nhận";
    }
    if (!/^(0|\+84)\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.province) {
      newErrors.province = "Vui lòng chọn tỉnh/thành phố";
    }
    if (!formData.ward) {
      newErrors.ward = "Vui lòng chọn xã/phường";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ cụ thể";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSave({ ...formData, location: mapPosition });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <div className="two-column">
        <div className="input-group">
          <label htmlFor="af-fullName">Họ tên người nhận</label>
          <input
            id="af-fullName"
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
          <label htmlFor="af-phone">Số điện thoại</label>
          <input
            id="af-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="af-label">Loại địa chỉ</label>
        <select
          id="af-label"
          name="label"
          value={formData.label}
          onChange={handleChange}
        >
          <option value="Nhà riêng">Nhà riêng</option>
          <option value="Công ty">Công ty</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="af-province">Tỉnh / Thành phố</label>
        <select
          id="af-province"
          name="province"
          value={formData.province}
          onChange={handleChange}
          aria-invalid={!!errors.province}
        >
          <option value="">-- Chọn tỉnh/thành phố --</option>
          {VIETNAM_PROVINCES.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.province && (
          <span className="field-error">{errors.province}</span>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="af-ward">Xã / Phường</label>
        <select
          id="af-ward"
          name="ward"
          value={formData.ward}
          onChange={handleChange}
          disabled={!formData.province || isLoadingWards}
          aria-invalid={!!errors.ward}
        >
          <option value="">
            {!formData.province
              ? "-- Chọn tỉnh/thành trước --"
              : isLoadingWards
              ? "Đang tải danh sách..."
              : "-- Chọn xã/phường --"}
          </option>
          {wards.map((w) => (
            <option key={w.code} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
        {errors.ward && <span className="field-error">{errors.ward}</span>}
        {wardsError && <span className="field-error">{wardsError}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="af-address">Địa chỉ cụ thể</label>
        <textarea
          id="af-address"
          name="address"
          placeholder="Số nhà, tên đường..."
          value={formData.address}
          onChange={handleChange}
          aria-invalid={!!errors.address}
        ></textarea>
        {errors.address && (
          <span className="field-error">{errors.address}</span>
        )}
      </div>

      <LocationPicker
        center={mapCenter}
        selectedPosition={mapPosition}
        onLocationSelect={setMapPosition}
      />

      <label className="address-form-checkbox">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />
        Đặt làm địa chỉ mặc định
      </label>

      <div className="address-form-actions">
        <button
          type="button"
          className="address-btn-secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          Huỷ
        </button>
        <button
          type="submit"
          className="address-btn-primary"
          disabled={isSaving}
        >
          {isSaving ? "Đang lưu..." : "Lưu địa chỉ"}
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
