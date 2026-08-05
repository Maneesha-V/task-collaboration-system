import { useAppSelector } from "../../hooks/useAppSelector";

const Dashboard = () => {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2>Welcome, {user?.name} 👋</h2>
        <p className="text-muted">
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>Projects</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>Tasks</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>Completed</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm mt-5">
        <div className="card-body">
          <h4>Recent Activity</h4>

          <p className="text-muted">
            No recent activity available.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;