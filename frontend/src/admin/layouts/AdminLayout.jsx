import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar show={show} handleClose={() => setShow(false)} />

      <div className="admin-main">
        <TopNavbar handleShow={() => setShow(true)} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
