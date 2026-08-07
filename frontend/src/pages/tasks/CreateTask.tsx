import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { fetchProjects } from "../../features/project/projectThunk";
import { fetchUsers } from "../../features/users/userThunk";
import { createTask } from "../../features/task/taskThunk";
import { toast } from "react-toastify";

const CreateTask = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { projects } = useAppSelector((state) => state.projects);

  const { users } = useAppSelector((state) => state.users);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    project: "",
    assignedTo: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());

    dispatch(fetchProjects());
  }, [dispatch, users]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        createTask({
          ...form,
          dueDate: new Date(form.dueDate).toISOString(),
        }),
      ).unwrap();
      toast.success("Task created successfully");
      navigate("/tasks");
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card shadow mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <h3 className="mb-4">Create Task</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>

              <input
                className="form-control"
                name="title"
                placeholder="Task Title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                rows={4}
                name="description"
                placeholder="Task Description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Due Date</label>

              <input
                type="datetime-local"
                className="form-control"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Priority</label>

              <select
                className="form-select"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>

                <option value="medium">Medium</option>

                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Project</label>

              <select
                className="form-select"
                name="project"
                value={form.project}
                onChange={handleChange}
              >
                <option value="">Select Project</option>

                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Assign User</label>

              <select
                className="form-select"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
              >
                <option value="">Select User</option>

                {users
                  .filter((user) => user.role === "user")
                  .map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
