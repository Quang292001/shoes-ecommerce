import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/authApi";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import { useLanguage } from "../../../../context/LanguageContext";

function Profile() {

  const {t}=useLanguage();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);

        // kiểm tra token
        const token = tokenStorage.getAccessToken();

        // chưa login
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        // có token -> gọi API
        const result = await authApi.getProfile();

        setProfile(result);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);

        // token lỗi / hết hạn
        setIsLoggedIn(false);
        tokenStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    tokenStorage.clear();
    navigate("/home", { replace: true });
  };

  // loading
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

  // chưa đăng nhập
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

            <p>
              {t.Login_first}
            </p>

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
          <div className="profile-card">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>

            <h2>{displayName}</h2>

            <p className="profile-email">{email}</p>

            <div className="profile-info">
              <div className="profile-info-row">
                <span>{t.Full_name}</span>
                <strong>{displayName}</strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>{email}</strong>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              {t.Logout}
            </button>
          </div>

          <div className="profile-summary">
            <div className="summary-box">
              <i className="fas fa-shopping-cart"></i>

              <h3>{t.Cart}</h3>

              <p>{t.your_products}</p>

              <button onClick={() => navigate("/cart")}>
                {t.Go_to_Cart}
              </button>
            </div>

            <div className="summary-box">
              <i className="fas fa-box"></i>

              <h3>{t.Orders}</h3>

              <p>{t.Your_order_history}</p>

              <button disabled>Coming Soon</button>
            </div>

            <div className="summary-box">
              <i className="fas fa-heart"></i>

              <h3>{t.Wishlist}</h3>

              <p>{t.products_you_love}</p>

              <button disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;