import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  deleteProject,
  getProjects,
} from "../../features/project/projectThunk";
import Pagination from "../../components/common/Pagination";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";

const Projects = () => {
  const dispatch = useAppDispatch();

  const { projects, loading } = useAppSelector(
    (state) => state.projects
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);


  useEffect(()=>{
    dispatch(getProjects({
      search: debouncedSearch,
      status,
      page
    }))
  }, [
    dispatch,
    page,
    debouncedSearch,
    status
  ])
  const handleDelete = async (id: string) => {
    try{
      await dispatch(deleteProject(id)).unwrap();
      toast.success("Project deleted successfully");
    } catch(err: any){
      toast.error((err));   
    }
  }
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
<div className="d-flex gap-3 mb-3">

  <SearchInput
    value={search}
    onChange={setSearch}
    placeholder="Search Tasks..."
  />

  <FilterSelect
    value={status}
    onChange={setStatus}
    options={[
      { label: "All Status", value: "" },
      { label: "Active", value: "active" },
      {
        label: "Completed",
        value: "completed",
      },
      {
        label: "On Hold",
        value: "on_hold",
      },
    ]}
  />

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
                      onClick={()=>handleDelete(project._id)}
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
<Pagination
  page={page}
  totalPages={5}
  onPageChange={setPage}
/>

    </div>
  );
};

export default Projects;