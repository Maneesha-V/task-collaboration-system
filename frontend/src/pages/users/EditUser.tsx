import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getUser, updateUser } from "../../features/users/userThunk";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toast } from "react-toastify";

const EditUser = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });
const { user } = useAppSelector(
  (state) => state.users
);
  useEffect(() => {
  if (id) {
    dispatch(getUser(id));
  }
}, [dispatch, id]);

useEffect(() => {
  if (user) {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
}, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
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
      updateUser({
        id: id!,
        data: form,
      })
    ).unwrap();
    toast.success("User updated successfully");
    navigate("/users");
  } catch(err: any){
    console.log(err);
    
    toast.error(err)
  }
  };

return (
  <div className="container">

    <div
      className="card shadow mx-auto"
      style={{ maxWidth: "600px" }}
    >

      <div className="card-body">

        <h3 className="mb-4">
          Edit User
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Name
            </label>

            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Role
            </label>

            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">
                User
              </option>

              <option value="manager">
                Manager
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          <div className="text-end">

            <button
              type="submit"
              className="btn btn-success"
            >
              Update User
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
);

};

export default EditUser;