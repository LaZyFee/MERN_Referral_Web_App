import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/useAuthStore";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
