import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

const ProtectedRoute = () => {
  const { accessToken } = useAppSelector(
    (state) => state.auth
  );

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;