import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchDashbaord } from "../../features/users/userThunk";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { dashboard } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDashbaord());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2>Welcome, {user?.name} 👋</h2>
        <p className="text-muted">
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      <div className="row g-4">
        {(user?.role === "admin" || user?.role === "manager") && (
          <>
            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5>Total Users</h5>
                  <h2>{dashboard?.totUsers}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5>Projects</h5>
                  {user?.role === "manager" ? (
                    <h2>{dashboard?.totalManagerProjects}</h2>
                  ) : (
                    <h2>{dashboard?.totalProjects}</h2>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {user?.role === "manager" && (
          <>
            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5>Tasks</h5>
                  <h2>{dashboard?.totTasks}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5>Completed</h5>
                  <h2>{dashboard?.totalCompletedProjects}</h2>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {user?.role === "user" ? (
        <div className="card shadow-sm mt-5">
          <div className="card-body">
            <h4 className="mb-4">Assigned Tasks</h4>

            {dashboard?.assignedTasks?.length > 0 ? (
              dashboard.assignedTasks.map((task: any) => (
                <div
                  key={task._id}
                  className="border rounded p-3 mb-3 bg-light"
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{task.title}</h5>

                    <span
                      className={`badge ${
                        task.status === "completed"
                          ? "bg-success"
                          : task.status === "in_progress"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-muted mb-3">{task.description}</p>

                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <strong>Project:</strong> {task.project?.title}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Assigned By:</strong> {task.createdBy?.name}
                    </div>

                    <div className="col-md-6">
                      <strong>Priority:</strong>{" "}
                      <span className="badge bg-info text-dark">
                        {task.priority}
                      </span>
                    </div>

                    <div className="col-md-6">
                      <strong>Due:</strong>{" "}
                      {new Date(task.dueDate).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-4">
                No tasks assigned.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card shadow-sm mt-5">
          <div className="card-body">
            <h4>Recent Activity</h4>

            <p className="text-muted">No recent activity available.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
