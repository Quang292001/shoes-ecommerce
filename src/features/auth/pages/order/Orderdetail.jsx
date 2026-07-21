import "./OrderDetail.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import {
  getOrderById,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
} from "../../api/OrdersApi";

const PAYMENT_LABELS = {
  cash: "Thanh toán khi nhận hàng (COD)",
  momo: "Ví MoMo",
  vnpay: "VNPay",
};

// Các bước tracking hiển thị theo thứ tự (không tính trạng thái "Đã huỷ")
const STATUS_STEPS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.SHIPPING,
  ORDER_STATUS.COMPLETED,
];

function OrderDetail() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setNotFound(false);

    getOrderById(orderId).then((data) => {
      if (cancelled) return;

      if (!data) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <section className="order-detail">
          <p className="order-detail-loading">Đang tải đơn hàng...</p>
        </section>
        <Footer />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Navbar />
        <section className="order-detail">
          <div className="order-detail-empty">
            <p>Không tìm thấy đơn hàng #{orderId}.</p>
            <Link to="/orders" className="order-detail-btn-link">
              Quay lại đơn hàng của tôi
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const currentStepIndex =
    order.status === ORDER_STATUS.CANCELLED
      ? -1
      : STATUS_STEPS.indexOf(order.status);

  return (
    <>
      <Navbar />

      <section className="order-detail">
        <div className="order-detail-breadcrumb">
          <Link to="/orders">Đơn hàng của tôi</Link>
          <i className="fa-solid fa-chevron-right"></i>
          <span>#{order.id}</span>
        </div>

        <div className="order-detail-header">
          <h1>Đơn hàng #{order.id}</h1>
          <span className={`order-status status-${order.status}`}>
            {ORDER_STATUS_LABELS[order.status]}
          </span>
        </div>

        <p className="order-detail-date">
          Đặt lúc {new Date(order.createdAt).toLocaleString("vi-VN")}
        </p>

        {order.status === ORDER_STATUS.CANCELLED ? (
          <div className="order-cancelled-notice">
            <i className="fa-solid fa-circle-xmark"></i>
            Đơn hàng này đã bị huỷ.
          </div>
        ) : (
          <div className="order-tracker">
            {STATUS_STEPS.map((step, idx) => (
              <div
                key={step}
                className={`tracker-step ${
                  idx <= currentStepIndex ? "active" : ""
                }`}
              >
                <span className="tracker-dot"></span>
                <p>{ORDER_STATUS_LABELS[step]}</p>
                {idx < STATUS_STEPS.length - 1 && (
                  <span
                    className={`tracker-line ${
                      idx < currentStepIndex ? "active" : ""
                    }`}
                  ></span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="order-detail-container">
          <div className="order-detail-left">
            <div className="order-detail-card">
              <h2>Sản phẩm ({order.items.length})</h2>

              {order.items.map((item, idx) => (
                <div className="order-product" key={item.id ?? idx}>
                  <img src={item.image} alt={item.name} />

                  <div className="order-product-info">
                    <h4>{item.name}</h4>
                    <span>
                      Size: {item.size || 42} · Màu: {item.color || "White"}
                    </span>
                    <span>SL x {item.quantity}</span>
                  </div>

                  <div className="order-product-price">
                    {(item.price * item.quantity).toLocaleString()} VNĐ
                  </div>
                </div>
              ))}
            </div>

            <div className="order-detail-card">
              <h2>Địa chỉ giao hàng</h2>
              <p className="order-detail-customer">
                <strong>{order.customer.fullName}</strong> ·{" "}
                {order.customer.phone}
              </p>
              <p className="order-detail-address">
                {order.shipping.address}, {order.shipping.ward},{" "}
                {order.shipping.province}
              </p>

              {order.shipping.location && (
                <a
                  className="order-detail-map-link"
                  href={`https://www.openstreetmap.org/?mlat=${order.shipping.location.lat}&mlon=${order.shipping.location.lng}#map=16/${order.shipping.location.lat}/${order.shipping.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-solid fa-location-dot"></i> Xem vị trí trên
                  bản đồ
                </a>
              )}
            </div>

            <div className="order-detail-card">
              <h2>Phương thức thanh toán</h2>
              <p>{PAYMENT_LABELS[order.payment] || order.payment}</p>
            </div>
          </div>

          <div className="order-detail-right">
            <div className="order-summary-card">
              <h2>Tổng cộng</h2>

              <div className="order-summary-row">
                <span>Tạm tính</span>
                <span>{order.subtotal.toLocaleString()} VNĐ</span>
              </div>

              <div className="order-summary-row">
                <span>Phí vận chuyển</span>
                <span>
                  {order.shippingFee === 0
                    ? "Miễn phí"
                    : order.shippingFee.toLocaleString() + " VNĐ"}
                </span>
              </div>

              <div className="order-summary-row">
                <span>Giảm giá</span>
                <span>-{order.discount.toLocaleString()} VNĐ</span>
              </div>

              <div className="order-summary-row total">
                <span>Tổng cộng</span>
                <span>{order.total.toLocaleString()} VNĐ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default OrderDetail;