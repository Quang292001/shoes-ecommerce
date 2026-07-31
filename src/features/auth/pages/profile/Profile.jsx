import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import { useLanguage } from "../../../../context/LanguageContext";
import AccountInfoTab from "../../../../shared/components/Information/Accountinfotab";
import ChangePasswordTab from "../../../../shared/components/Information/ChangePasswordTab";
import AddressBookTab from "../../../../shared/components/Information/AddressBookTab";
import { getOrders } from "../../../../features/auth/api/OrdersApi";
import profileData from "../../../../data/profile";
const TABS = {
  INFO: "info",
  PASSWORD: "password",
  ADDRESSES: "addresses",
};
 
function Profile() {
  const { t } = useLanguage();
  const navigate = useNavigate();
 
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadError, setLoadError] = useState(""); // lỗi mạng/server, khác với "chưa đăng nhập"
 
  const [activeTab, setActiveTab] = useState(TABS.INFO);
  const [orderCount, setOrderCount] = useState(null);
 
  // const loadProfile = async () => {
  //   setIsLoading(true);
  //   setLoadError("");
 
  //   const token = tokenStorage.getAccessToken();
 
  //   // Chưa từng đăng nhập -> không có token, không tính là lỗi
  //   if (!token) {
  //     setIsLoggedIn(false);
  //     setIsLoading(false);
  //     return;
  //   }
 
  //   try {
  //     const result = await authApi.getProfile();
  //     setProfile(result);
  //     setIsLoggedIn(true);
  //   } catch (error) {
  //     // Chỉ coi là "phiên đăng nhập hết hạn" khi server trả 401/403.
  //     // Các lỗi khác (mất mạng, server lỗi tạm thời...) KHÔNG nên xoá token
  //     // và đăng xuất người dùng oan — chỉ báo lỗi và cho thử lại.
  //     const status = error?.response?.status ?? error?.status;
 
  //     if (status === 401 || status === 403) {
  //       tokenStorage.clear();
  //       setIsLoggedIn(false);
  //     } else {
  //       console.error(error);
  //       setLoadError(
  //         "Không tải được thông tin tài khoản. Vui lòng kiểm tra kết nối và thử lại."
  //       );
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
 const loadProfile = () => {
  setProfile(profileData);
  setIsLoggedIn(true);
  setIsLoading(false);
};
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   getOrders()
  //     .then((orders) => setOrderCount(orders.length))
  //     .catch(() => setOrderCount(null));
  // }, [isLoggedIn]);
  useEffect(() => {
  if (!isLoggedIn) return;

  setOrderCount(3);
}, [isLoggedIn]);
 
  const handleLogout = async () => {
    try {
      // TODO: nếu backend có endpoint logout để thu hồi token/session, gọi ở đây:
      // await authApi.logout();
    } finally {
      tokenStorage.clear();
      navigate("/home", { replace: true });
    }
  };
 
  const handleSaveInfo = async (data) => {
    // TODO: đảm bảo authApi.updateProfile đã được implement ở backend,
    // trả về profile mới sau khi cập nhật.
    const updated = await authApi.updateProfile(data);
    setProfile((prev) => ({ ...prev, ...updated }));
  };
 
  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    // TODO: đảm bảo authApi.changePassword đã được implement ở backend.
    // Nên throw Error với message rõ ràng khi mật khẩu hiện tại sai, ví dụ:
    // throw new Error("Mật khẩu hiện tại không đúng");
    await authApi.changePassword({ currentPassword, newPassword });
  };
 
  // ---- Loading ----
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-card">
            <p className="profile-loading">{t.Loading}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
 
  // ---- Lỗi mạng/server (còn token, chỉ chưa tải được) ----
  if (loadError) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-card login-required">
            <div className="profile-avatar">
              <i className="fas fa-triangle-exclamation"></i>
            </div>
            <h2>Đã có lỗi xảy ra</h2>
            <p>{loadError}</p>
            <div className="login-actions">
              <button className="login-btn" onClick={loadProfile}>
                Thử lại
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
 
  // ---- Chưa đăng nhập ----
  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-card login-required">
            <div className="profile-avatar">
              <i className="fas fa-user-lock"></i>
            </div>
            <h2>{t.Please_Login}</h2>
            <p>{t.Login_first}</p>
            <div className="login-actions">
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                {t.Login}
              </button>
              <button
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                {t.Register}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
 
  const displayName = profile?.fullName || profile?.name;
  const email = profile?.email || "No email";
 
  return (
    <>
      <Navbar />
 
      <div className="profile-page">
        <div className="profile-hero">
          <h1>
            <span>{t.Profile}</span>
          </h1>
          <p>{t.title_information}</p>
        </div>
 
        <div className="profile-content">
          {/* Sidebar */}
          <div className="profile-card">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h2>{displayName}</h2>
            <p className="profile-email">{email}</p>
 
            <div className="profile-nav">
              <button
                className={activeTab === TABS.INFO ? "active" : ""}
                onClick={() => setActiveTab(TABS.INFO)}
              >
                <i className="fas fa-id-card"></i> Thông tin tài khoản
              </button>
              <button
                className={activeTab === TABS.PASSWORD ? "active" : ""}
                onClick={() => setActiveTab(TABS.PASSWORD)}
              >
                <i className="fas fa-lock"></i> Đổi mật khẩu
              </button>
              <button
                className={activeTab === TABS.ADDRESSES ? "active" : ""}
                onClick={() => setActiveTab(TABS.ADDRESSES)}
              >
                <i className="fas fa-location-dot"></i> Sổ địa chỉ
              </button>
 
              <div className="profile-nav-divider"></div>
 
              <button onClick={() => navigate("/cart")}>
                <i className="fas fa-shopping-cart"></i> {t.Cart}
              </button>
              <button onClick={() => navigate("/orders")}>
                <i className="fas fa-box"></i> {t.Orders}
                {orderCount !== null && (
                  <span className="profile-nav-badge">{orderCount}</span>
                )}
              </button>
              <button disabled>
                <i className="fas fa-heart"></i> {t.Wishlist}
                <span className="profile-nav-soon">Sắp ra mắt</span>
              </button>
            </div>
 
            <button className="logout-btn" onClick={handleLogout}>
              {t.Logout}
            </button>
          </div>
 
          {/* Tab content */}
          <div className="profile-main">
            {activeTab === TABS.INFO && (
              <AccountInfoTab profile={profile} onSave={handleSaveInfo} />
            )}
            {activeTab === TABS.PASSWORD && (
              <ChangePasswordTab onSubmit={handleChangePassword} />
            )}
            {activeTab === TABS.ADDRESSES && <AddressBookTab />}
          </div>
        </div>
      </div>
 
      <Footer />
    </>
  );
}
 
export default Profile;