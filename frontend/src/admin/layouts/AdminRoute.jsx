import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
   const token = localStorage.getItem("adminToken");
  const admin = JSON.parse(localStorage.getItem("admin"));

 if (!token || !admin || admin.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default AdminRoute;


