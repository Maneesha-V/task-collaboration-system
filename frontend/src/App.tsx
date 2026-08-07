import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { refreshToken } from "./features/auth/authThunk";

function App() {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
  dispatch(refreshToken());
}, []);

  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;