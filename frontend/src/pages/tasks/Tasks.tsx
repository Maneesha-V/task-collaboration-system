import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  deleteTask,
  getTasks,
} from "../../features/task/taskThunk";

const Tasks = () => {

  const dispatch = useAppDispatch();

  const {
    tasks,
    loading,
  } = useAppSelector(
    state => state.tasks
  );

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (

    <div className="container">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Tasks</h2>

        <Link to="/tasks/create">
          <button className="btn btn-primary">
            + Create Task
          </button>
        </Link>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Title</th>
                <th>Project</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {tasks.map(task => (

                <tr key={task._id}>

                  <td>{task.title}</td>

                  <td>
                    {task.project?.title}
                  </td>

                  <td>
                    {task.assignedTo?.name}
                  </td>

                  <td>

                    <span
                      className={`badge ${
                        task.status === "completed"
                          ? "bg-success"
                          : task.status === "in_progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td>

                    <Link
                      to={`/tasks/edit/${task._id}`}
                    >
                      <button className="btn btn-sm btn-warning me-2">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        dispatch(deleteTask(task._id))
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default Tasks;