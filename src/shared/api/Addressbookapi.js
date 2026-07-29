// Service quản lý "Sổ địa chỉ" của người dùng.
//
// HIỆN TẠI: dùng localStorage để lưu tạm, giúp test ngay UI mà không cần backend.
// KHI CÓ BACKEND THẬT: chỉ cần sửa nội dung bên trong các hàm export dưới đây
// để gọi API thật (xem chú thích TODO trong từng hàm).

const STORAGE_KEY = "myshop_addresses";

function readAddresses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAddresses(addresses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

function generateId() {
  return `addr_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

/**
 * Lấy toàn bộ địa chỉ đã lưu của người dùng hiện tại.
 */
export async function getAddresses() {
  // TODO: thay bằng: const res = await fetch("/api/addresses"); return res.json();
  return readAddresses();
}

/**
 * Thêm địa chỉ mới.
 * data: { label, fullName, phone, province, ward, address, location, isDefault }
 */
export async function addAddress(data) {
  // TODO: thay bằng: const res = await fetch("/api/addresses", { method: "POST", body: JSON.stringify(data) }); return res.json();
  const addresses = readAddresses();
  const newAddress = { id: generateId(), ...data };

  // Nếu đây là địa chỉ đầu tiên, hoặc người dùng chọn "đặt làm mặc định",
  // thì bỏ mặc định ở các địa chỉ còn lại.
  if (newAddress.isDefault || addresses.length === 0) {
    addresses.forEach((a) => (a.isDefault = false));
    newAddress.isDefault = true;
  }

  addresses.push(newAddress);
  writeAddresses(addresses);
  return newAddress;
}

/**
 * Cập nhật một địa chỉ đã có.
 */
export async function updateAddress(id, data) {
  // TODO: thay bằng: await fetch(`/api/addresses/${id}`, { method: "PUT", body: JSON.stringify(data) });
  const addresses = readAddresses();
  const index = addresses.findIndex((a) => a.id === id);
  if (index === -1) throw new Error("Không tìm thấy địa chỉ");

  if (data.isDefault) {
    addresses.forEach((a) => (a.isDefault = false));
  }

  addresses[index] = { ...addresses[index], ...data, id };
  writeAddresses(addresses);
  return addresses[index];
}

/**
 * Xoá một địa chỉ. Nếu địa chỉ bị xoá là mặc định và vẫn còn địa chỉ khác,
 * tự động gán địa chỉ đầu tiên còn lại làm mặc định.
 */
export async function deleteAddress(id) {
  // TODO: thay bằng: await fetch(`/api/addresses/${id}`, { method: "DELETE" });
  let addresses = readAddresses();
  const wasDefault = addresses.find((a) => a.id === id)?.isDefault;

  addresses = addresses.filter((a) => a.id !== id);

  if (wasDefault && addresses.length > 0) {
    addresses[0].isDefault = true;
  }

  writeAddresses(addresses);
  return true;
}

/**
 * Đặt một địa chỉ làm mặc định.
 */
export async function setDefaultAddress(id) {
  const addresses = readAddresses();
  addresses.forEach((a) => (a.isDefault = a.id === id));
  writeAddresses(addresses);
  return addresses.find((a) => a.id === id) || null;
}