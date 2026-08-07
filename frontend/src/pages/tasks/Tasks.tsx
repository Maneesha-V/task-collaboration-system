import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  deleteTask,
  getTasks,
} from "../../features/task/taskThunk";
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import Pagination from "../../components/common/Pagination";
import { toast } from "react-toastify";

const Tasks = () => {

  const dispatch = useAppDispatch();

  const {
    tasks,
    loading,
  } = useAppSelector(
    state => state.tasks
  );

  console.log("tasks",tasks);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  
useEffect(() => {
  dispatch(
    getTasks({
      page,
      search: debouncedSearch,
      status,
    })
  );
}, [
  dispatch,
  page,
  debouncedSearch,
  status,
]);
  const handleDelete = async (id: string) => {
    try{
      await dispatch(deleteTask(id)).unwrap();
      toast.success("Task deleted successfully");
    } catch(err: any){
      toast.error((err));   
    }
  }
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

<div className="d-flex gap-3 mb-3">

  <SearchInput
    value={search}
    onChange={setSearch}
    placeholder="Search Tasks..."
  />

  <FilterSelect
    value={status}
    onChange={setStatus}
    options={[
      { label: "All Status", value: "" },
      { label: "Todo", value: "todo" },
      {
        label: "In Progress",
        value: "in_progress",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ]}
  />

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
                      onClick={() => handleDelete(task._id)}
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
<Pagination
  page={page}
  totalPages={5}
  onPageChange={setPage}
/>

    </div>

  );

};

export default Tasks;