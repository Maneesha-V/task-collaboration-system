import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  deleteProject,
  getProjects,
} from "../../features/project/projectThunk";

const Projects = () => {
  const dispatch = useAppDispatch();

  const { projects, loading } = useAppSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="container">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Projects</h2>

        <Link to="/projects/create">
          <button className="btn btn-primary">
            Create Project
          </button>
        </Link>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-striped table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {projects.map((project) => (

                <tr key={project._id}>

                  <td>{project.title}</td>

                  <td>{project.description}</td>

                  <td>{project.manager?.name}</td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() =>
                        dispatch(deleteProject(project._id))
                      }
                    >
                      Delete
                    </button>

                    <Link to={`/projects/${project._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Edit
                      </button>
                    </Link>

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

export default Projects;