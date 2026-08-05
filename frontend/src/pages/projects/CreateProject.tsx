import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { getUsers } from "../../features/users/userThunk";
import { createProject } from "../../features/project/projectThunk";

const CreateProject = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users } = useAppSelector(
    (state) => state.users
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    manager: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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

    await dispatch(createProject(form));

    navigate("/projects");
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

            <div className="mb-4">

              <label className="form-label">
                Manager
              </label>

              <select
                className="form-select"
                name="manager"
                value={form.manager}
                onChange={handleChange}
              >
                <option value="">
                  Select Manager
                </option>

                {users
                  .filter(
                    (user) =>
                      user.role === "manager"
                  )
                  .map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.name}
                    </option>
                  ))}
              </select>

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