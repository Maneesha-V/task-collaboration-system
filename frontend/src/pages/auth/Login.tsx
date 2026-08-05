import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { login } from "../../features/auth/authThunk";
import type { LoginRequest } from "../../features/auth/authTypes";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div
        className="card shadow p-4"
        style={{ width: "400px" }}
      >

        <h2 className="text-center mb-4">
          Task Collaboration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email")}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password")}
            />

          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;