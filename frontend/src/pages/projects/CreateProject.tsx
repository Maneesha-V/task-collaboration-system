import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { fetchUsers } from "../../features/users/userThunk";
import { createProject } from "../../features/project/projectThunk";
import { toast } from "react-toastify";

const CreateProject = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(
    (state) => state.auth
  )
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    manager: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

    useEffect(() => {
  if (user?.role === "manager") {
    setForm(prev => ({
      ...prev,
      manager: user.id, 
    }));
  }
}, [user]);

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
  await dispatch(createProject(form)).unwrap();

  toast.success("Project created successfully");

  navigate("/projects");
} catch (err: any) {
  toast.error(err);
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
            Create Project
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Project Title
              </label>

              <input
                className="form-control"
                name="title"
                placeholder="Enter project title"
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
                placeholder="Enter project description"
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
    <option value="active">
      Active
    </option>

    <option value="completed">
      Completed
    </option>

    <option value="on_hold">
      On Hold
    </option>
  </select>
</div>
            <div className="mb-4">

              <label className="form-label">
                Manager
              </label>
<input
  className="form-control"
  value={user?.name || ""}
  readOnly
/>


            </div>

            <div className="d-flex justify-content-end">

              <button
                type="submit"
                className="btn btn-primary"
              >
                Create Project
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateProject;