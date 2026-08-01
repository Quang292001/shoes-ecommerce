import "./Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "/src/context/CartContext";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import LocationPicker from "../../../../shared/components/LocationPicker/LocationPicker";
import { VIETNAM_PROVINCES } from "../../../../data/vietnamProvinces";
import { fetchWardsByProvinceName } from "../../../../services/VietnamAdministrativeApi";
import { createOrder } from "../../api/OrdersApi";

// Vị trí mặc định khi chưa chọn tỉnh/thành (TP. Hồ Chí Minh)
const DEFAULT_MAP_CENTER = { lat: 10.7769, lng: 106.7009 };

// Danh sách voucher demo — thực tế nên gọi API để kiểm tra mã hợp lệ
const VOUCHERS = {
  GIAM10: { type: "percent", value: 10 },
  GIAM50K: { type: "fixed", value: 50000 },
};

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [placedOrder, setPlacedOrder] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    ward: "",
    address: "",
    payment: "cash",
  });

  const [mapPosition, setMapPosition] = useState(null);

  const selectedProvince = VIETNAM_PROVINCES.find(
    (p) => p.name === formData.province,
  );
  const mapCenter = selectedProvince
    ? { lat: selectedProvince.lat, lng: selectedProvince.lng }
    : DEFAULT_MAP_CENTER;

  // Danh sách xã/phường của tỉnh/thành đang chọn, tải từ API
  const [wards, setWards] = useState([]);
  const [isLoadingWards, setIsLoadingWards] = useState(false);
  const [wardsError, setWardsError] = useState("");

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
          setWardsError(
            "Không tải được danh sách xã/phường. Bạn có thể nhập tay ở ô địa chỉ.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingWards(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData.province]);

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");

  const shippingFee = totalPrice >= 1000000 ? 0 : 20000;

  const discount = appliedVoucher
    ? appliedVoucher.type === "percent"
      ? Math.round((totalPrice * appliedVoucher.value) / 100)
      : appliedVoucher.value
    : 0;

  const finalTotal = Math.max(totalPrice + shippingFee - discount, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Đổi tỉnh/thành thì bỏ ghim cũ và xã/phường đã chọn (thuộc tỉnh cũ)
    if (name === "province") {
      setMapPosition(null);
      setFormData((prev) => ({ ...prev, ward: "" }));
    }

    // Xoá lỗi của field khi người dùng bắt đầu sửa lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
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
      newErrors.address = "Vui lòng nhập địa chỉ giao hàng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyVoucher = () => {
    const code = voucherInput.trim().toUpperCase();

    if (!code) {
      setVoucherError("Vui lòng nhập mã giảm giá");
      return;
    }

    const voucher = VOUCHERS[code];

    if (!voucher) {
      setVoucherError("Mã giảm giá không hợp lệ hoặc đã hết hạn");
      setAppliedVoucher(null);
      return;
    }

    setAppliedVoucher(voucher);
    setVoucherError("");
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherInput("");
    setVoucherError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;
    if (!validate()) return;

    setStep(2);
    setIsSubmitting(true);

    try {
      const order = await createOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          province: formData.province,
          ward: formData.ward,
          address: formData.address,
          location: mapPosition, // { lat, lng } - null nếu chưa ghim trên bản đồ
        },
        payment: formData.payment,
        items: cartItems,
        subtotal: totalPrice,
        shippingFee,
        discount,
        total: finalTotal,
      });

      // Nếu CartContext của bạn có sẵn hàm clearCart, gọi để dọn giỏ hàng
      // sau khi đặt hàng thành công. Nếu chưa có, bạn cần tự thêm hàm này
      // vào CartContext (thường chỉ là setCartItems([])).
      if (typeof clearCart === "function") {
        clearCart();
      }

      setPlacedOrder(order);
      setStep(3);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: "Đặt hàng thất bại, vui lòng thử lại.",
      }));
      setStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Giỏ hàng trống — không cho tiến hành thanh toán
  if (cartItems.length === 0 && step !== 3) {
    return (
      <>
        <Navbar />
        <section className="checkout">
          <h1>
            Check<span>out</span>
          </h1>
          <div className="checkout-empty">
            <p>Giỏ hàng của bạn đang trống.</p>
            <Link to="/products" className="checkout-btn checkout-btn-link">
              Tiếp tục mua sắm
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Bước 3 — đặt hàng thành công
  if (step === 3) {
    return (
      <>
        <Navbar />
        <section className="checkout">
          <h1>
            Check<span>out</span>
          </h1>

          <div className="checkout-progress">
            <div className="step active">
              <span>1</span>
              Shipping
            </div>
            <div className="line"></div>
            <div className="step active">
              <span>2</span>
              Payment
            </div>
            <div className="line"></div>
            <div className="step active">
              <span>3</span>
              Success
            </div>
          </div>

          <div className="checkout-success">
            <i className="fa-solid fa-circle-check"></i>
            <h2>Đặt hàng thành công!</h2>
            <p>
              Cảm ơn {formData.fullName}, chúng tôi đã nhận được đơn hàng{" "}
              {placedOrder && <strong>#{placedOrder.id}</strong>} và sẽ liên hệ
              qua số {formData.phone} để xác nhận.
            </p>
            <div className="checkout-success-actions">
              {placedOrder && (
                <Link
                  to={`/orders/${placedOrder.id}`}
                  className="checkout-btn checkout-btn-link"
                >
                  Xem chi tiết đơn hàng
                </Link>
              )}
              <Link
                to="/orders"
                className="checkout-btn checkout-btn-link checkout-btn-outline"
              >
                Tất cả đơn hàng của tôi
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="checkout">
        <h1>
          Check<span>out</span>
        </h1>
        <div className="checkout-breadcrumb">
          <span>Home</span>

          <i className="fa-solid fa-chevron-right"></i>

          <span>Cart</span>

          <i className="fa-solid fa-chevron-right"></i>

          <span>Checkout</span>
        </div>

        <div className="checkout-progress">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
            Shipping
          </div>

          <div className="line"></div>

          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <span>2</span>
            Payment
          </div>

          <div className="line"></div>

          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <span>3</span>
            Success
          </div>
        </div>
        <div className="checkout-container">
          <div className="checkout-left">
            <div className="checkout-card">
              <h2>Shipping Information</h2>

              <form
                id="checkout-form"
                className="checkout-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <span className="field-error">{errors.fullName}</span>
                  )}
                </div>
                <div className="two-column">
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span className="field-error">{errors.email}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>

                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <span className="field-error">{errors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="province">Tỉnh / Thành phố</label>

                  <select
                    id="province"
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
                  <label htmlFor="ward">Xã / Phường</label>

                  <select
                    id="ward"
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
                  {errors.ward && (
                    <span className="field-error">{errors.ward}</span>
                  )}
                  {wardsError && (
                    <span className="field-error">{wardsError}</span>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="address">Địa chỉ cụ thể</label>

                  <textarea
                    id="address"
                    name="address"
                    placeholder="Số nhà, tên đường, phường/xã..."
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

                {errors.submit && (
                  <span className="field-error">{errors.submit}</span>
                )}
              </form>
            </div>
            <div className="checkout-card">
              <h2>Delivery Information</h2>
              <label className="shipping-option active">
                <input type="radio" name="shipping" checked readOnly />
                <div className="shipping-info">
                  <h4>🚚 Giao hàng tận nơi</h4>

                  <p>Nhận hàng trong 2 - 4 ngày</p>
                </div>

                <span className="shipping-price">
                  {shippingFee === 0
                    ? "Miễn phí"
                    : shippingFee.toLocaleString() + "đ"}
                </span>
              </label>
            </div>
            <div className="checkout-card">
              <h2>Phương thức thanh toán</h2>

              <label className="payment-option active">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.payment === "cash"}
                  value="cash"
                  onChange={handleChange}
                />

                <div className="payment-info">
                  <h4>Thanh toán khi nhận hàng</h4>

                  <p>COD</p>
                </div>
              </label>

              <label className="payment-option payment-option-disabled">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={formData.payment === "momo"}
                  onChange={handleChange}
                  disabled
                />

                <div className="payment-info">
                  <h4>Ví MoMo</h4>

                  <p>Sắp ra mắt</p>
                </div>
              </label>

              <label className="payment-option payment-option-disabled">
                <input
                  type="radio"
                  name="payment"
                  value="vnpay"
                  checked={formData.payment === "vnpay"}
                  onChange={handleChange}
                  disabled
                />

                <div className="payment-info">
                  <h4>VNPay</h4>

                  <p>Sắp ra mắt</p>
                </div>
              </label>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="checkout-right">
            <h2>Order Summary</h2>

            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <h3>Thông tin đơn hàng</h3>

                  <p>{cartItems.length} sản phẩm</p>
                </div>

                <i className="fa-solid fa-bag-shopping"></i>
              </div>

              {cartItems.map((item) => (
                <div className="summary-product" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="summary-content">
                    <div className="summary-top">
                      <h4>{item.name}</h4>

                      <span className="product-size">
                        Size: {item.size || 42}
                      </span>
                    </div>

                    <div className="summary-middle">
                      <span>Color: {item.color || "White"}</span>

                      <span>SL x {item.quantity}</span>
                    </div>

                    <div className="summary-bottom">
                      {(item.price * item.quantity).toLocaleString()} VNĐ
                    </div>
                  </div>
                </div>
              ))}
              <hr />

              <div className="summary-row">
                <span>Tạm tính</span>

                <span>{totalPrice.toLocaleString()} VNĐ</span>
              </div>

              <div className="summary-row">
                <span>Phí vận chuyển</span>

                <span>
                  {shippingFee === 0
                    ? "Miễn phí"
                    : shippingFee.toLocaleString() + " VNĐ"}
                </span>
              </div>

              <div className="summary-row">
                <span>Giảm giá</span>

                <span>-{discount.toLocaleString()} VNĐ</span>
              </div>

              <div className="summary-row total">
                <span>Tổng cộng</span>

                <span>{finalTotal.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="voucher-box">
              <h3 className="ticket-sale">
                <i className="fa-solid fa-ticket"></i>
                Mã giảm giá
              </h3>

              {appliedVoucher ? (
                <div className="voucher-applied">
                  <span>
                    Đã áp dụng mã <strong>{voucherInput.toUpperCase()}</strong>
                  </span>
                  <button type="button" onClick={handleRemoveVoucher}>
                    Bỏ mã
                  </button>
                </div>
              ) : (
                <div className="voucher-input">
                  <input
                    placeholder="Nhập mã giảm giá"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                  />

                  <button type="button" onClick={handleApplyVoucher}>
                    Áp dụng
                  </button>
                </div>
              )}
              {voucherError && (
                <span className="field-error">{voucherError}</span>
              )}
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="checkout-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;
