import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(
    state => state.auth
  );

  const handleLogout = () => {

    dispatch(logout());

    navigate("/");

  };

  return (

    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <div className="container-fluid">

        <h4 className="mb-0">
          Dashboard
        </h4>

        <div className="d-flex align-items-center">

          <span className="me-3 fw-semibold">
            Welcome, {user?.name}
          </span>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;