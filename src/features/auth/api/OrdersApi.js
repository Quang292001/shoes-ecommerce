// Service quản lý đơn hàng.
//
// HIỆN TẠI: dùng localStorage để lưu tạm, giúp bạn test được ngay luồng
// "đặt hàng -> xem danh sách đơn -> xem chi tiết đơn" mà không cần backend.
//
// KHI CÓ BACKEND THẬT: chỉ cần sửa nội dung bên trong 3 hàm export
// (createOrder, getOrders, getOrderById) để gọi fetch() tới API thật —
// phần còn lại của ứng dụng (Checkout, Orders, OrderDetail) không cần đổi gì
// vì chúng chỉ phụ thuộc vào interface (tên hàm + dữ liệu trả về) của file này.

const STORAGE_KEY = "myshop_orders";

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPING: "shipping",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Chờ xác nhận",
  [ORDER_STATUS.CONFIRMED]: "Đã xác nhận",
  [ORDER_STATUS.SHIPPING]: "Đang giao",
  [ORDER_STATUS.COMPLETED]: "Hoàn thành",
  [ORDER_STATUS.CANCELLED]: "Đã huỷ",
};

function readOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function generateOrderCode() {
  const date = new Date();
  const y = String(date.getFullYear()).slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DH${y}${m}${d}${rand}`;
}

/**
 * Tạo đơn hàng mới.
 * orderData: { customer, shipping, payment, items, subtotal, shippingFee, discount, total }
 */
export async function createOrder(orderData) {
  // TODO: thay bằng gọi API thật, ví dụ:
  // const res = await fetch("/api/orders", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(orderData),
  // });
  // if (!res.ok) throw new Error("Đặt hàng thất bại");
  // return res.json();

  const orders = readOrders();
  const newOrder = {
    id: generateOrderCode(),
    createdAt: new Date().toISOString(),
    status: ORDER_STATUS.PENDING,
    ...orderData,
  };
  orders.unshift(newOrder);
  writeOrders(orders);
  return newOrder;
}

/**
 * Lấy danh sách đơn hàng (của khách hàng hiện tại).
 */
export async function getOrders() {
  // TODO: thay bằng: const res = await fetch("/api/orders"); return res.json();
  return readOrders();
}

/**
 * Lấy chi tiết một đơn hàng theo mã đơn.
 */
export async function getOrderById(orderId) {
  // TODO: thay bằng: const res = await fetch(`/api/orders/${orderId}`); return res.json();
  const orders = readOrders();
  return orders.find((o) => o.id === orderId) || null;
}