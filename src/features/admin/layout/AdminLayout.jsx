import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-logo" onClick={() => navigate("/admin")}>
            <div className="admin-logo-icon">
              <i className="fa-solid fa-shoe-prints"></i>
            </div>

            <div className="admin-logo-text">
              <h1>Shoes Admin</h1>
              <p>Management Panel</p>
            </div>
          </div>

          <div className="admin-nav">
            <NavLink to="/admin" end>
              <i className="fa-solid fa-chart-line"></i>
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/products">
              <i className="fa-solid fa-box"></i>
              <span>Products</span>
            </NavLink>

            <NavLink to="/admin/categories">
              <i className="fa-solid fa-tags"></i>
              <span>Categories</span>
            </NavLink>

            <NavLink to="/admin/orders">
              <i className="fa-solid fa-receipt"></i>
              <span>Orders</span>
            </NavLink>

            <NavLink to="/admin/customers">
              <i className="fa-solid fa-users"></i>
              <span>Customers</span>
            </NavLink>
          </div>
        </div>

        <div className="admin-sidebar-bottom">
          <div className="admin-user-card">
            <div className="admin-user-avatar">A</div>

            <div>
              <h3>Admin</h3>
              <p>System manager</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div className="admin-header-title">
            <h2>Admin Panel</h2>
            <span>Manage ecommerce system</span>
          </div>

          <div className="admin-header-actions">
            <div className="admin-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search..." />
            </div>

            <button
              className="admin-view-store-btn"
              type="button"
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-store"></i>
              View Store
            </button>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;