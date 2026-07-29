import { useEffect, useState } from "react";

import AddressForm from "./AddressForm";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../../shared/api/Addressbookapi";

function AddressBookTab() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formMode, setFormMode] = useState(null); // null | "add" | address.id đang sửa
  const [error, setError] = useState("");

  const loadAddresses = () => {
    setIsLoading(true);
    getAddresses()
      .then(setAddresses)
      .catch(() => setError("Không tải được sổ địa chỉ."))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const editingAddress =
    formMode && formMode !== "add"
      ? addresses.find((a) => a.id === formMode)
      : null;

  const handleSave = async (data) => {
    if (formMode === "add") {
      await addAddress(data);
    } else {
      await updateAddress(formMode, data);
    }
    setFormMode(null);
    loadAddresses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá địa chỉ này?")) return;
    await deleteAddress(id);
    loadAddresses();
  };

  const handleSetDefault = async (id) => {
    await setDefaultAddress(id);
    loadAddresses();
  };

  if (formMode) {
    return (
      <div className="profile-tab-panel">
        <div className="profile-tab-panel-header">
          <h3>{formMode === "add" ? "Thêm địa chỉ mới" : "Sửa địa chỉ"}</h3>
        </div>
        <AddressForm
          initialData={editingAddress}
          onSave={handleSave}
          onCancel={() => setFormMode(null)}
        />
      </div>
    );
  }

  return (
    <div className="profile-tab-panel">
      <div className="profile-tab-panel-header">
        <h3>Sổ địa chỉ</h3>
        <button
          className="address-btn-primary"
          onClick={() => setFormMode("add")}
        >
          + Thêm địa chỉ
        </button>
      </div>

      {isLoading ? (
        <p className="profile-tab-loading">Đang tải...</p>
      ) : error ? (
        <p className="field-error">{error}</p>
      ) : addresses.length === 0 ? (
        <div className="address-empty">
          <p>Bạn chưa lưu địa chỉ nào.</p>
        </div>
      ) : (
        <div className="address-list">
          {addresses.map((addr) => (
            <div className="address-card" key={addr.id}>
              {addr.isDefault && (
                <span className="address-default-badge">Mặc định</span>
              )}

              <h4>
                {addr.fullName} <span className="address-label">· {addr.label}</span>
              </h4>
              <p className="address-phone">{addr.phone}</p>
              <p className="address-full">
                {addr.address}, {addr.ward}, {addr.province}
              </p>

              <div className="address-card-actions">
                <button onClick={() => setFormMode(addr.id)}>Sửa</button>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)}>
                    Đặt làm mặc định
                  </button>
                )}
                <button
                  className="address-btn-danger"
                  onClick={() => handleDelete(addr.id)}
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressBookTab;