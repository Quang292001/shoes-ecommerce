import { useEffect, useState } from "react";

import "./AdminProfile.css";
import { authApi } from "../../../auth/api/authApi";

function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await authApi.getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-profile">
      <div className="profile-card">
        <div className="avatar">
          <i className="fa-solid fa-user"></i>
        </div>

        <h2>{profile?.fullName}</h2>
        <span className="role">
          {profile?.role || "Administrator"}
        </span>

        <div className="info">
          <div className="info-item">
            <label>Email</label>
            <p>{profile?.email}</p>
          </div>

          <div className="info-item">
            <label>User ID</label>
            <p>{profile?.id}</p>
          </div>

          <div className="info-item">
            <label>Role</label>
            <p>{profile?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;