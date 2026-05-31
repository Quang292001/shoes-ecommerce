import { Navigate, useLocation } from "react-router-dom";
import { tokenStorage } from "../shared/auth/tokenStorage";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;