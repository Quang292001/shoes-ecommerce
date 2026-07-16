// Service tra cứu đơn vị hành chính Việt Nam (Tỉnh/Thành -> Xã/Phường)
// Dùng API mở miễn phí: https://provinces.open-api.vn
// Bản v2 phản ánh cấu trúc HÀNH CHÍNH 2 CẤP áp dụng từ 07/2025 (bỏ cấp quận/huyện).
// Tài liệu: https://provinces.open-api.vn/api/v2/redoc
//
// Lưu ý: đây là dịch vụ cộng đồng, miễn phí, không có SLA — nên có xử lý lỗi
// và fallback hợp lý ở phía component (xem LocationPicker/Checkout).

const BASE_URL = "https://provinces.open-api.vn/api/v2";

let provincesCache = null;
const wardsCacheByProvinceCode = new Map();

/**
 * Bỏ tiền tố "Tỉnh"/"Thành phố" và khoảng trắng thừa để so khớp tên tỉnh
 * giữa dữ liệu nội bộ (vietnamProvinces.js) và tên chính thức từ API.
 */
export function normalizeProvinceName(name) {
  return name
    .replace(/^(Tỉnh|Thành phố)\s+/i, "")
    .trim()
    .toLowerCase();
}

/**
 * Lấy danh sách toàn bộ 34 tỉnh/thành từ API (có cache trong bộ nhớ).
 * Trả về mảng: [{ code, name, division_type, codename }, ...]
 */
export async function fetchProvinces() {
  if (provincesCache) return provincesCache;

  const res = await fetch(`${BASE_URL}/p/`);
  if (!res.ok) {
    throw new Error(`Không tải được danh sách tỉnh/thành (HTTP ${res.status})`);
  }

  const data = await res.json();
  provincesCache = data;
  return data;
}

/**
 * Tìm code của tỉnh/thành trong dữ liệu API dựa theo tên (đã chuẩn hoá).
 */
export async function findProvinceCodeByName(name) {
  const provinces = await fetchProvinces();
  const target = normalizeProvinceName(name);

  const match = provinces.find(
    (p) => normalizeProvinceName(p.name) === target
  );

  return match ? match.code : null;
}

/**
 * Lấy danh sách xã/phường thuộc một tỉnh/thành theo code (có cache theo code).
 * Trả về mảng: [{ code, name, division_type, codename }, ...]
 */
export async function fetchWardsByProvinceCode(provinceCode) {
  if (wardsCacheByProvinceCode.has(provinceCode)) {
    return wardsCacheByProvinceCode.get(provinceCode);
  }

  const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
  if (!res.ok) {
    throw new Error(`Không tải được danh sách xã/phường (HTTP ${res.status})`);
  }

  const data = await res.json();
  const wards = data.wards || [];
  wardsCacheByProvinceCode.set(provinceCode, wards);
  return wards;
}

/**
 * Tiện ích gộp: từ TÊN tỉnh/thành, trả thẳng về danh sách xã/phường.
 */
export async function fetchWardsByProvinceName(provinceName) {
  const code = await findProvinceCodeByName(provinceName);
  if (!code) {
    throw new Error(`Không tìm thấy tỉnh/thành "${provinceName}" trong dữ liệu API`);
  }
  return fetchWardsByProvinceCode(code);
}