import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

const Sidebar = () => {

  const { user } = useAppSelector(
    state => state.auth
  );

  return (
    <aside
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >

      <h3 className="text-center mb-4">
        Task Manager
      </h3>


      <nav className="nav flex-column">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link text-white mb-2 ${
              isActive ? "bg-primary rounded" : ""
            }`
          }
        >
          📊 Dashboard
        </NavLink>


        {/* Admin only */}
        {user?.role === "admin" && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `nav-link text-white mb-2 ${
                isActive ? "bg-primary rounded" : ""
              }`
            }
          >
            👥 Users
          </NavLink>
        )}


        {/* Manager only */}
        {user?.role === "manager" && (
          <>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `nav-link text-white mb-2 ${
                  isActive ? "bg-primary rounded" : ""
                }`
              }
            >
              📁 Projects
            </NavLink>


            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `nav-link text-white mb-2 ${
                  isActive ? "bg-primary rounded" : ""
                }`
              }
            >
              ✅ Tasks
            </NavLink>

          </>
        )}

      </nav>

    </aside>
  );
};

export default Sidebar;