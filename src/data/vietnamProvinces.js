// Danh sách 34 tỉnh, thành phố trực thuộc Trung ương của Việt Nam
// theo Nghị quyết sáp nhập đơn vị hành chính cấp tỉnh, có hiệu lực từ 12/06/2025
// (từ 63 tỉnh/thành rút gọn còn 34: 28 tỉnh + 6 thành phố trực thuộc TW).
//
// `lat`/`lng` là toạ độ TRUNG TÂM HÀNH CHÍNH gần đúng — dùng để định vị bản đồ
// mặc định khi người dùng chọn tỉnh/thành, KHÔNG phải ranh giới chính xác.
// Nếu cần độ chính xác cao hơn (ví dụ tính phí ship theo khu vực), nên dùng
// thêm một dịch vụ geocoding (Goong Maps, Mapbox, Google Geocoding...).

export const VIETNAM_PROVINCES = [
  { name: "Hà Nội", lat: 21.0285, lng: 105.8542 },
  { name: "Huế", lat: 16.4637, lng: 107.5909 },
  { name: "Lai Châu", lat: 22.3964, lng: 103.4702 },
  { name: "Điện Biên", lat: 21.3856, lng: 103.0169 },
  { name: "Sơn La", lat: 21.3256, lng: 103.9188 },
  { name: "Lạng Sơn", lat: 21.8537, lng: 106.761 },
  { name: "Quảng Ninh", lat: 20.95, lng: 107.079 },
  { name: "Thanh Hóa", lat: 19.8067, lng: 105.7852 },
  { name: "Nghệ An", lat: 18.6797, lng: 105.6813 },
  { name: "Hà Tĩnh", lat: 18.356, lng: 105.8877 },
  { name: "Cao Bằng", lat: 22.6667, lng: 106.25 },
  { name: "Tuyên Quang", lat: 21.8233, lng: 105.214 },
  { name: "Lào Cai", lat: 21.7168, lng: 104.8986 },
  { name: "Thái Nguyên", lat: 21.5928, lng: 105.8442 },
  { name: "Phú Thọ", lat: 21.3227, lng: 105.402 },
  { name: "Bắc Ninh", lat: 21.2731, lng: 106.1946 },
  { name: "Hưng Yên", lat: 20.8526, lng: 106.0169 },
  { name: "Hải Phòng", lat: 20.8449, lng: 106.6881 },
  { name: "Ninh Bình", lat: 20.2506, lng: 105.9744 },
  { name: "Quảng Trị", lat: 17.4684, lng: 106.6222 },
  { name: "Đà Nẵng", lat: 16.0544, lng: 108.2022 },
  { name: "Quảng Ngãi", lat: 15.1214, lng: 108.8044 },
  { name: "Gia Lai", lat: 13.783, lng: 109.2196 },
  { name: "Khánh Hòa", lat: 12.2388, lng: 109.1967 },
  { name: "Lâm Đồng", lat: 11.9404, lng: 108.4583 },
  { name: "Đắk Lắk", lat: 12.6667, lng: 108.05 },
  { name: "Thành phố Hồ Chí Minh", lat: 10.7769, lng: 106.7009 },
  { name: "Đồng Nai", lat: 10.945, lng: 106.8243 },
  { name: "Tây Ninh", lat: 10.5333, lng: 106.4167 },
  { name: "Cần Thơ", lat: 10.0452, lng: 105.7469 },
  { name: "Vĩnh Long", lat: 10.2537, lng: 105.9722 },
  { name: "Đồng Tháp", lat: 10.4938, lng: 105.6881 },
  { name: "Cà Mau", lat: 9.1769, lng: 105.1524 },
  { name: "An Giang", lat: 10.0093, lng: 105.081 },
];

export default VIETNAM_PROVINCES;