import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateUser from "../pages/users/CreateUser";
import Users from "../pages/users/Users";
import EditUser from "../pages/users/EditUser";
import Projects from "../pages/projects/Projects";
import EditProject from "../pages/projects/EditProject";
import CreateProject from "../pages/projects/CreateProject";
import Tasks from "../pages/tasks/Tasks";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />

            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<EditProject />} />
            <Route path="/projects/create" element={<CreateProject />} />

            <Route path="/tasks" element={<Tasks />} />

            <Route path="/tasks/create" element={<CreateTask />} />

            <Route path="/tasks/edit/:id" element={<EditTask />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
