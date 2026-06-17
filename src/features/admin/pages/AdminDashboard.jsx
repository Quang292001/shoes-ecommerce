import { useNavigate } from "react-router-dom";
import "../layout/AdminLayout.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your ecommerce admin system</p>
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <h3>Products</h3>
          <p>Create, update, delete and manage catalog products.</p>

          <button type="button" onClick={() => navigate("/admin/products")}>
            Manage Products
          </button>
        </div>

        <div className="admin-dashboard-card">
          <h3>Orders</h3>
          <p>View and process customer orders.</p>

          <button type="button" disabled>
            Coming Soon
          </button>
        </div>

        <div className="admin-dashboard-card">
          <h3>Customers</h3>
          <p>View registered customers.</p>

          <button type="button" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;