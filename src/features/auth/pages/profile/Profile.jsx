import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/authApi";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await authApi.getProfile();

        setProfile(result);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error.response?.data?.message || "Failed to load profile",
        );
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

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-card">
            <p className="profile-loading">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-card">
            <p className="profile-error">{errorMessage}</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-card">
            <p className="profile-error">No profile data</p>
          </div>
        </div>
      </>
    );
  }

  const displayName = profile.fullName || profile.name;
  const email = profile.email || "No email";

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-hero">
          <h1>
            My <span>Profile</span>
          </h1>
          <p>Manage your account information and shopping activity.</p>
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
                <span>Full name</span>
                <strong>{displayName}</strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>{email}</strong>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="profile-summary">
            <div className="summary-box">
              <i className="fas fa-shopping-cart"></i>
              <h3>Cart</h3>
              <p>View your selected products.</p>
              <button onClick={() => navigate("/cart")}>Go to Cart</button>
            </div>

            <div className="summary-box">
              <i className="fas fa-box"></i>
              <h3>Orders</h3>
              <p>Your order history will appear here.</p>
              <button disabled>Coming Soon</button>
            </div>

            <div className="summary-box">
              <i className="fas fa-heart"></i>
              <h3>Wishlist</h3>
              <p>Save products you love.</p>
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