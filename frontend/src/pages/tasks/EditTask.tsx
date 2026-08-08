import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";


import { fetchProjects } from "../../features/project/projectThunk";
import { fetchUsers } from "../../features/users/userThunk";
import { getTask, updateTask } from "../../features/task/taskThunk";
import { toast } from "react-toastify";

const EditTask = () => {

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { task } = useAppSelector(
    state => state.tasks
  );

  const { users } = useAppSelector(
    state => state.users
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    assignedTo: "",
  });

  useEffect(() => {

    dispatch(getTask(id!));

    dispatch(fetchProjects());

    dispatch(fetchUsers());

  }, [dispatch, id]);

  useEffect(() => {

    if (task) {

      setForm({

        title: task.title,

        description: task.description,

        status: task.status,

        assignedTo: task.assignedTo._id,

      });

    }

  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();
    try {
    await dispatch(

      updateTask({

        id: id!,

        data: form,

      })

    ).unwrap();
    toast.success("Task updated successfully");
    navigate("/tasks");
  } catch(err: any){
    toast.error((err));
    
  }
  };

 return (
  <div className="container">

    <div
      className="card shadow mx-auto"
      style={{ maxWidth: "700px" }}
    >

      <div className="card-body">

        <h3 className="mb-4">
          Edit Task
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Title
            </label>

            <input
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="todo">
                Todo
              </option>

              <option value="in_progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>

            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">
              Assign User
            </label>

            <select
              className="form-select"
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
            >

              {users
                .filter(user => user?.role === "user")
                .map(user => (

                  <option
                    key={user._id}
                    value={user._id}
                  >
                    {user.name}
                  </option>

                ))}

            </select>
          </div>

          <div className="text-end">
            <button
              type="submit"
              className="btn btn-success"
            >
              Update Task
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>
);

};

export default EditTask;