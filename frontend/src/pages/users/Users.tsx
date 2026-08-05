import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  getUsers,
  deleteUser,
} from "../../features/users/userThunk";

const Users = () => {

  const dispatch = useAppDispatch();

  const {
    users,
    loading,
  } = useAppSelector(
    state => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (

    <div className="container">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Users</h2>

        <Link to="/users/create">
          <button className="btn btn-primary">
            + Create User
          </button>
        </Link>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user._id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "bg-danger"
                          : user.role === "manager"
                          ? "bg-warning text-dark"
                          : "bg-primary"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td>

                    <Link
                      to={`/users/edit/${user._id}`}
                    >
                      <button className="btn btn-sm btn-warning me-2">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        dispatch(deleteUser(user._id))
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

export default Users;