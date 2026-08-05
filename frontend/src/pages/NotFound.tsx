import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div className="text-center">

        <h1
          className="display-1 fw-bold text-danger"
        >
          404
        </h1>

        <h3 className="mb-3">
          Page Not Found
        </h3>

        <p className="text-muted mb-4">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          className="btn btn-primary"
        >
          Go to Dashboard
        </Link>

      </div>

    </div>
  );
};

export default NotFound;