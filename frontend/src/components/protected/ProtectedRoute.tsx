import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import Spinner from "../common/Spinner";

const ProtectedRoute = () => {
  const { accessToken, authChecked } = useAppSelector(
    (state) => state.auth
  );
  if (!authChecked) {
    return <Spinner />
  }

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;