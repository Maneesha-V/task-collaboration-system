import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { fetchUsers } from "../../features/users/userThunk";
import { getProject, updateProject } from "../../features/project/projectThunk";
import { toast } from "react-toastify";

const EditProject = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { project } = useAppSelector(
    (state) => state.projects
  );
  const { user } = useAppSelector(
    (state) => state.auth
  )
  
  console.log(user);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    manager: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getProject(id));
    }

    dispatch(fetchUsers());
  }, [dispatch, id]);

  useEffect(() => {
  if (user?.role === "manager") {
    setForm(prev => ({
      ...prev,
      manager: user.id, 
    }));
  }
}, [user]);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        description: project.description,
        status: project.status,
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
    try {
    await dispatch(
      updateProject({
        id: id!,
        data: form,
      })
    ).unwrap();
    toast.success("Project updated successfully");
    navigate("/projects");
  } catch(err: any){
    toast.error(err)
  }
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

          <div className="mb-3">

            <label className="form-label">
              Manager
            </label>

<input
  className="form-control"
  value={user?.name || ""}
  readOnly
/>

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