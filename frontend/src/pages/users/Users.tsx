import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { getUsers, deleteUser } from "../../features/users/userThunk";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import Pagination from "../../components/common/Pagination";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";

const Users = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(
      getUsers({
        page,
        search: debouncedSearch,
        role,
      }),
    );
  }, [dispatch, page, debouncedSearch, role]);
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      toast.success("User deleted successfully");
    } catch (err: any) {
      toast.error(err);
    }
  };

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
          <button className="btn btn-primary">+ Create User</button>
        </Link>
      </div>
      <div className="d-flex gap-3 mb-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search Tasks..."
        />

        <FilterSelect
          value={role}
          onChange={setRole}
          options={[
            { label: "All roles", value: "" },
            { label: "Admin", value: "admin" },
            {
              label: "Manager",
              value: "manager",
            },
            {
              label: "User",
              value: "user",
            },
          ]}
        />
      </div>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
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
                    <Link to={`/users/edit/${user._id}`}>
                      <button className="btn btn-sm btn-warning me-2">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
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
      <Pagination page={page} totalPages={5} onPageChange={setPage} />
    </div>
  );
};

export default Users;
