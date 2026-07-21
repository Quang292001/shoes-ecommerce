import "./Orders.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import { getOrders, ORDER_STATUS_LABELS } from "../../api/OrdersApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    getOrders().then((data) => {
      if (!cancelled) {
        setOrders(data);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <>
      <Navbar />

      <section className="orders-page">
        <h1>
          Đơn hàng <span>của tôi</span>
        </h1>

        <div className="orders-filter">
          <button
            className={statusFilter === "all" ? "active" : ""}
            onClick={() => setStatusFilter("all")}
          >
            Tất cả
          </button>

          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={statusFilter === key ? "active" : ""}
              onClick={() => setStatusFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="orders-loading">Đang tải đơn hàng...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <p>
              {statusFilter === "all"
                ? "Bạn chưa có đơn hàng nào."
                : "Không có đơn hàng nào ở trạng thái này."}
            </p>
            <Link to="/products" className="orders-btn-link">
              Bắt đầu mua sắm
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <Link
                to={`/orders/${order.id}`}
                className="order-card"
                key={order.id}
              >
                <div className="order-card-header">
                  <div>
                    <h3>Đơn hàng #{order.id}</h3>
                    <p>{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                  </div>

                  <span className={`order-status status-${order.status}`}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>

                <div className="order-card-items">
                  {order.items.slice(0, 4).map((item, idx) => (
                    <img
                      key={item.id ?? idx}
                      src={item.image}
                      alt={item.name}
                    />
                  ))}
                  {order.items.length > 4 && (
                    <span className="order-card-more">
                      +{order.items.length - 4}
                    </span>
                  )}
                </div>

                <div className="order-card-footer">
                  <span>{order.items.length} sản phẩm</span>
                  <span className="order-card-total">
                    {order.total.toLocaleString()} VNĐ
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Orders;