import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return children;
};