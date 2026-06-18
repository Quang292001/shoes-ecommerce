import { Navigate, useLocation } from "react-router-dom";
import { tokenStorage } from "../shared/auth/tokenStorage";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length > 0) {
    const role = tokenStorage.getRole();

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;