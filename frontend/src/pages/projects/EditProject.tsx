import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { getUsers } from "../../features/users/userThunk";
import { getProject, updateProject } from "../../features/project/projectThunk";

const EditProject = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { project } = useAppSelector(
    (state) => state.projects
  );

  const { users } = useAppSelector(
    (state) => state.users
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    manager: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getProject(id));
    }

    dispatch(getUsers());
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        description: project.description,
        manager: project.manager._id,
      });
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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

    await dispatch(
      updateProject({
        id: id!,
        data: form,
      })
    );

    navigate("/projects");
  };

return (
  <div className="container">

    <div className="card shadow mx-auto" style={{ maxWidth: 700 }}>

      <div className="card-body">

        <h3 className="mb-4">
          Edit Project
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Project Title
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
              Manager
            </label>

            <select
              className="form-select"
              name="manager"
              value={form.manager}
              onChange={handleChange}
            >

              {users
                .filter(user => user.role === "manager")
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

          <button className="btn btn-success">
            Update Project
          </button>

        </form>

      </div>

    </div>

  </div>
);
};

export default EditProject;